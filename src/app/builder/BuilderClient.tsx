'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Search,
  Plus,
  Save,
  Share2,
  Clock,
  Trash2,
  AlertCircle,
  Loader2,
  FolderOpen,
  X,
  Check,
  FileText,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Sparkles,
  Crown,
  Edit3,
  LayoutGrid,
  List,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container, Card, Input, Button, Select } from '@/components/ui';
import { VisualFlowItem } from '@/components/flows/VisualFlowItem';
import { ShareFlowModal } from '@/components/flows/ShareFlowModal';
import { createClient } from '@/lib/supabase/client';
import { getProxiedImageUrl } from '@/lib/images';
import type { FlowStyle, Difficulty, PoseType, PoseSide, Flow, Profile } from '@/types';

const ZOOM_LEVELS = [50, 75, 100, 125, 150, 200] as const;
type ZoomPercent = typeof ZOOM_LEVELS[number];

interface PoseFromDB {
  id: string;
  slug: string;
  english_name: string;
  sanskrit_name: string | null;
  pose_type: PoseType;
  difficulty: Difficulty;
  short_description: string | null;
  image_url: string | null;
  duration_hint_seconds: number | null;
}

interface FlowItem {
  id: string;
  poseId: string;
  poseSlug: string;
  poseName: string;
  poseImage: string | null;
  durationSeconds: number;
  side: PoseSide;
  notes: string;
}

interface SavedFlow extends Flow {
  items: {
    id: string;
    pose_id: string;
    position: number;
    duration_seconds: number;
    side: PoseSide;
    notes: string | null;
    pose: PoseFromDB;
  }[];
}

const flowStyleOptions = [
  { value: 'vinyasa', label: 'Vinyasa' },
  { value: 'hatha', label: 'Hatha' },
  { value: 'yin', label: 'Yin' },
  { value: 'restorative', label: 'Restorative' },
  { value: 'power', label: 'Power' },
  { value: 'gentle', label: 'Gentle' },
  { value: 'custom', label: 'Custom' },
];

const difficultyOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const poseTypeFilterOptions = [
  { value: '', label: 'All Types' },
  { value: 'standing', label: 'Standing' },
  { value: 'seated', label: 'Seated' },
  { value: 'prone', label: 'Prone' },
  { value: 'supine', label: 'Supine' },
  { value: 'inversion', label: 'Inversion' },
  { value: 'arm_balance', label: 'Arm Balance' },
  { value: 'twist', label: 'Twist' },
  { value: 'backbend', label: 'Backbend' },
  { value: 'forward_fold', label: 'Forward Fold' },
  { value: 'hip_opening', label: 'Hip Opening' },
  { value: 'balancing', label: 'Balancing' },
  { value: 'restorative', label: 'Restorative' },
  { value: 'kneeling', label: 'Kneeling' },
];

// Props from server component
interface BuilderClientProps {
  initialUser: {
    id: string;
    email: string;
  } | null;
  initialProfile: Profile | null;
  initialFlows: SavedFlow[];
}

// Loading fallback component for Suspense
function BuilderLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-14 md:pt-16">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-neutral-600">Loading builder...</p>
        </div>
      </main>
    </div>
  );
}

// Wrapper component that provides Suspense boundary
export default function BuilderClient({ initialUser, initialProfile, initialFlows }: BuilderClientProps) {
  return (
    <Suspense fallback={<BuilderLoading />}>
      <BuilderContent
        initialUser={initialUser}
        initialProfile={initialProfile}
        initialFlows={initialFlows}
      />
    </Suspense>
  );
}

function BuilderContent({ initialUser, initialProfile, initialFlows }: BuilderClientProps) {
  const searchParams = useSearchParams();

  // Auth state - initialized from server props
  const [user, setUser] = useState<{ id: string; email: string } | null>(initialUser);
  const [isProUser, setIsProUser] = useState(initialProfile?.subscription_tier === 'paid');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Poses from database
  const [poses, setPoses] = useState<PoseFromDB[]>([]);
  const [isPosesLoading, setIsPosesLoading] = useState(true);

  // User's saved flows - initialized from server props
  const [savedFlows, setSavedFlows] = useState<SavedFlow[]>(initialFlows);
  const [isFlowsLoading, setIsFlowsLoading] = useState(false);

  // Current flow state
  const [currentFlowId, setCurrentFlowId] = useState<string | null>(null);
  const [flowTitle, setFlowTitle] = useState('');
  const [flowStyle, setFlowStyle] = useState<FlowStyle>('vinyasa');
  const [flowLevel, setFlowLevel] = useState<Difficulty>('beginner');
  const [targetDuration, setTargetDuration] = useState(60);
  const [items, setItems] = useState<FlowItem[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PoseType | ''>('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSaveFirstWarning, setShowSaveFirstWarning] = useState(false);
  const [isCreatingShare, setIsCreatingShare] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [zoomPercent, setZoomPercent] = useState<ZoomPercent>(100);
  const [activeTab, setActiveTab] = useState<'build' | 'my-flows'>('build');
  const [showMobilePoseLibrary, setShowMobilePoseLibrary] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [addedPoseToast, setAddedPoseToast] = useState<string | null>(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Zoom helpers
  const canZoomOut = zoomPercent > ZOOM_LEVELS[0];
  const canZoomIn = zoomPercent < ZOOM_LEVELS[ZOOM_LEVELS.length - 1];

  const zoomIn = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoomPercent);
    if (currentIndex < ZOOM_LEVELS.length - 1) {
      setZoomPercent(ZOOM_LEVELS[currentIndex + 1]);
    }
  };

  const zoomOut = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoomPercent);
    if (currentIndex > 0) {
      setZoomPercent(ZOOM_LEVELS[currentIndex - 1]);
    }
  };

  // Get grid columns based on zoom and screen size
  const getGridCols = () => {
    // Mobile grid based on zoom
    if (isMobile) {
      switch (zoomPercent) {
        case 50: return 'grid-cols-5';
        case 75: return 'grid-cols-4';
        case 100: return 'grid-cols-3';
        case 125: return 'grid-cols-3';
        case 150: return 'grid-cols-2';
        case 200: return 'grid-cols-2';
        default: return 'grid-cols-3';
      }
    }
    // Desktop grid based on zoom
    switch (zoomPercent) {
      case 50: return 'grid-cols-4 xl:grid-cols-6';
      case 75: return 'grid-cols-3 xl:grid-cols-5';
      case 100: return 'grid-cols-2 xl:grid-cols-4';
      case 125: return 'grid-cols-2 xl:grid-cols-3';
      case 150: return 'grid-cols-2 xl:grid-cols-3';
      case 200: return 'grid-cols-1 xl:grid-cols-2';
      default: return 'grid-cols-2 xl:grid-cols-3';
    }
  };

  // Get zoom level for component
  const getZoomLevel = (): 'small' | 'medium' | 'large' | 'xlarge' => {
    if (zoomPercent <= 75) return 'small';
    if (zoomPercent <= 100) return 'medium';
    if (zoomPercent <= 125) return 'large';
    return 'xlarge';
  };

  // Tier limits based on auth
  // Guest: 0 flows (can't save), 6 poses
  // Free: 3 flows, 8 poses per flow
  // Pro: Unlimited flows, unlimited poses
  const tierLimits = useMemo(() => {
    if (!user) return { maxFlows: 0, maxPoses: 6, canSave: false, tier: 'guest' as const };
    if (isProUser) return { maxFlows: Infinity, maxPoses: Infinity, canSave: true, tier: 'pro' as const };
    return { maxFlows: 3, maxPoses: 8, canSave: true, tier: 'free' as const };
  }, [user, isProUser]);

  const isOverPoseLimit = items.length >= tierLimits.maxPoses;
  const isOverFlowLimit = savedFlows.length >= tierLimits.maxFlows;

  // Listen for auth state changes (client-side)
  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Builder: Auth state changed:', event);

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsProUser(false);
        setSavedFlows([]);
        return;
      }

      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' });

        // Check subscription status
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const subscriptionTier = (profile as { subscription_tier?: string }).subscription_tier;
          setIsProUser(subscriptionTier === 'paid');
        }

        // Refetch flows on sign in
        if (event === 'SIGNED_IN') {
          try {
            const response = await fetch('/api/flows', { credentials: 'include' });
            if (response.ok) {
              const data = await response.json();
              setSavedFlows(data);
            }
          } catch (error) {
            console.error('Error fetching flows:', error);
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch poses from database
  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const response = await fetch('/api/poses');
        if (response.ok) {
          const data = await response.json();
          setPoses(data);
        }
      } catch (error) {
        console.error('Error fetching poses:', error);
      } finally {
        setIsPosesLoading(false);
      }
    };

    fetchPoses();
  }, []);

  // Handle URL parameters (load flow, switch tab)
  // Track if we've already processed the load param
  const [loadParamProcessed, setLoadParamProcessed] = useState(false);
  const [fromParamProcessed, setFromParamProcessed] = useState(false);

  // Determine user's max poses based on tier
  const getUserMaxPoses = useCallback(() => {
    if (!user) return 8; // anonymous: 8 poses
    if (isProUser) return Infinity; // paid: unlimited
    return 15; // free: 15 poses
  }, [user, isProUser]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const loadParam = searchParams.get('load');
    const fromParam = searchParams.get('from');

    // Switch to My Flows tab if requested
    if (tabParam === 'my-flows') {
      setActiveTab('my-flows');
    }

    // Load a public flow by slug (from shared page)
    if (fromParam && !fromParamProcessed) {
      fetchPublicFlowBySlug(fromParam);
      return;
    }

    // Load a specific flow if requested
    if (loadParam && !loadParamProcessed) {
      // Wait for initial flows loading to complete
      if (isFlowsLoading) return;

      // First check if flow is already in savedFlows
      const flowToLoad = savedFlows.find(f => f.id === loadParam);

      if (flowToLoad) {
        loadFlowIntoBuilder(flowToLoad);
        setLoadParamProcessed(true);
        window.history.replaceState({}, '', '/builder');
      } else {
        // Flow not in savedFlows list - fetch it directly
        // The API will handle auth, so no need to check user state
        fetchAndLoadFlow(loadParam);
      }
    }
  }, [searchParams, savedFlows, isFlowsLoading, loadParamProcessed, fromParamProcessed]);

  // Fetch a public flow by slug and load it into builder (with tier limits)
  const fetchPublicFlowBySlug = async (slug: string) => {
    try {
      const response = await fetch(`/api/flows/public/${slug}`);
      if (response.ok) {
        const flowData = await response.json();

        // Apply tier limits - limit number of poses
        const maxPoses = getUserMaxPoses();
        const limitedItems = flowData.items?.slice(0, maxPoses) || [];

        const newTitle = flowData.title ? `${flowData.title} (Copy)` : 'Copied Flow';

        const loadedItems: FlowItem[] = limitedItems
          .sort((a: { position: number }, b: { position: number }) => a.position - b.position)
          .map((item: { pose?: { slug?: string; english_name?: string; image_url?: string | null }; pose_id: string; duration_seconds: number; side: PoseSide; notes?: string | null }) => ({
            id: `${item.pose?.slug || item.pose_id}-${Date.now()}-${Math.random()}`,
            poseId: item.pose_id,
            poseSlug: item.pose?.slug || '',
            poseName: item.pose?.english_name || 'Unknown Pose',
            poseImage: getProxiedImageUrl(item.pose?.image_url) || null,
            durationSeconds: item.duration_seconds,
            side: item.side,
            notes: item.notes || '',
          }));

        // Set UI state
        setFlowTitle(newTitle);
        setFlowStyle(flowData.style);
        setFlowLevel(flowData.level);
        setTargetDuration(flowData.duration_minutes);
        setItems(loadedItems);
        setActiveTab('build');
        setFromParamProcessed(true);
        window.history.replaceState({}, '', '/builder');

        // Auto-save if user is logged in
        if (user) {
          try {
            const totalSecs = loadedItems.reduce((acc, item) => acc + item.durationSeconds, 0);
            const saveResponse = await fetch('/api/flows', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: newTitle,
                style: flowData.style,
                level: flowData.level,
                duration_minutes: Math.ceil(totalSecs / 60),
                items: loadedItems.map((item, index) => ({
                  pose_id: item.poseId,
                  position: index,
                  duration_seconds: item.durationSeconds,
                  side: item.side,
                  notes: item.notes,
                })),
              }),
              credentials: 'include',
            });

            if (saveResponse.ok) {
              const savedFlow = await saveResponse.json();
              setCurrentFlowId(savedFlow.id);
              setIsDirty(false);

              // Refresh saved flows list
              const flowsResponse = await fetch('/api/flows', { credentials: 'include' });
              if (flowsResponse.ok) {
                const flows = await flowsResponse.json();
                setSavedFlows(flows);
              }
            }
          } catch (saveError) {
            console.error('Error auto-saving flow:', saveError);
            // Flow is still loaded, just not saved
            setIsDirty(true);
          }
        } else {
          setIsDirty(true);
        }

        // Show info message if poses were limited
        if (flowData.items && flowData.items.length > maxPoses) {
          alert(`This flow has ${flowData.items.length} poses. Your account allows up to ${maxPoses} poses per flow, so only the first ${maxPoses} poses were loaded.`);
        }
      } else if (response.status === 410) {
        // Link expired
        alert('This share link has expired.');
        setFromParamProcessed(true);
        window.history.replaceState({}, '', '/builder');
      } else {
        // Flow not found or other error
        setFromParamProcessed(true);
        window.history.replaceState({}, '', '/builder');
      }
    } catch (error) {
      console.error('Error fetching public flow:', error);
      setFromParamProcessed(true);
      window.history.replaceState({}, '', '/builder');
    }
  };

  // Helper to load flow data into builder state
  const loadFlowIntoBuilder = (flow: SavedFlow) => {
    setCurrentFlowId(flow.id);
    setFlowTitle(flow.title);
    setFlowStyle(flow.style);
    setFlowLevel(flow.level);
    setTargetDuration(flow.duration_minutes);

    const loadedItems: FlowItem[] = (flow.items || [])
      .sort((a, b) => a.position - b.position)
      .map((item) => ({
        id: `${item.pose?.slug || item.pose_id}-${Date.now()}-${Math.random()}`,
        poseId: item.pose_id,
        poseSlug: item.pose?.slug || '',
        poseName: item.pose?.english_name || 'Unknown Pose',
        poseImage: getProxiedImageUrl(item.pose?.image_url) || null,
        durationSeconds: item.duration_seconds,
        side: item.side,
        notes: item.notes || '',
      }));

    setItems(loadedItems);
    setIsDirty(false);
    setActiveTab('build');
  };

  // Fetch a specific flow by ID
  const fetchAndLoadFlow = async (flowId: string) => {
    try {
      const response = await fetch(`/api/flows/${flowId}`, { credentials: 'include' });
      if (response.ok) {
        const flowData = await response.json();
        loadFlowIntoBuilder(flowData);
        setLoadParamProcessed(true);
        window.history.replaceState({}, '', '/builder');
      } else if (response.status === 401) {
        // Not authenticated - mark as processed and redirect to login
        setLoadParamProcessed(true);
        setShowLoginModal(true);
      } else {
        // Flow not found or other error - mark as processed
        setLoadParamProcessed(true);
        window.history.replaceState({}, '', '/builder');
      }
    } catch (error) {
      console.error('Error fetching flow:', error);
      setLoadParamProcessed(true);
    }
  };

  // Filter poses for the picker
  const filteredPoses = useMemo(() => {
    return poses.filter((pose) => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesName = pose.english_name.toLowerCase().includes(searchLower);
        const matchesSanskrit = pose.sanskrit_name?.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesSanskrit) return false;
      }
      if (typeFilter && pose.pose_type !== typeFilter) return false;
      return true;
    });
  }, [poses, searchQuery, typeFilter]);

  // Calculate total duration
  const totalSeconds = useMemo(() => {
    return items.reduce((acc, item) => acc + item.durationSeconds, 0);
  }, [items]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // DnD setup
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        setIsDirty(true);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addPoseToFlow = (pose: PoseFromDB) => {
    if (isOverPoseLimit) {
      if (!user) {
        setShowLoginModal(true);
      }
      return;
    }

    const newItem: FlowItem = {
      id: `${pose.slug}-${Date.now()}`,
      poseId: pose.id,
      poseSlug: pose.slug,
      poseName: pose.english_name,
      poseImage: getProxiedImageUrl(pose.image_url),
      durationSeconds: pose.duration_hint_seconds || 30,
      side: 'both',
      notes: '',
    };
    setItems([...items, newItem]);
    setIsDirty(true);

    // Show toast on mobile
    if (isMobile) {
      setAddedPoseToast(pose.english_name);
      setTimeout(() => setAddedPoseToast(null), 1500);
    }
  };

  const updateItem = (id: string, updates: Partial<FlowItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    setIsDirty(true);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setIsDirty(true);
  };

  const clearFlow = () => {
    if (confirm('Are you sure you want to clear all poses?')) {
      setItems([]);
      setCurrentFlowId(null);
      setFlowTitle('');
      setFlowStyle('vinyasa');
      setFlowLevel('beginner');
      setIsDirty(false);
    }
  };

  // Save flow
  const saveFlow = useCallback(async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!flowTitle.trim()) {
      setSaveError('Please give your flow a name before saving');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const flowData = {
        title: flowTitle,
        style: flowStyle,
        level: flowLevel,
        duration_minutes: Math.ceil(totalSeconds / 60),
        items: items.map((item, index) => ({
          pose_id: item.poseId,
          position: index,
          duration_seconds: item.durationSeconds,
          side: item.side,
          notes: item.notes,
        })),
      };

      const url = currentFlowId ? `/api/flows/${currentFlowId}` : '/api/flows';
      const method = currentFlowId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flowData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to save flow (${response.status})`);
      }

      const savedFlow = await response.json();

      if (!savedFlow || !savedFlow.id) {
        throw new Error('Invalid response from server');
      }

      setCurrentFlowId(savedFlow.id);
      setIsDirty(false);
      setSaveSuccess(true);
      setShowSaveModal(false);

      // Refresh saved flows list
      const flowsResponse = await fetch('/api/flows', { credentials: 'include' });
      if (flowsResponse.ok) {
        const flows = await flowsResponse.json();
        setSavedFlows(flows);
      }

      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving flow:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save flow');
    } finally {
      setIsSaving(false);
    }
  }, [user, flowTitle, flowStyle, flowLevel, totalSeconds, items, currentFlowId]);

  // Create share link and open in new tab
  const createAndOpenShare = useCallback(async () => {
    if (!currentFlowId) {
      setShowSaveFirstWarning(true);
      return;
    }
    if (!isProUser) {
      setShowShareModal(true); // Show upgrade prompt
      return;
    }

    setIsCreatingShare(true);
    try {
      const response = await fetch(`/api/flows/${currentFlowId}/share`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create share link');
      }

      const data = await response.json();
      if (data.share_url) {
        window.open(data.share_url, '_blank');
      }
    } catch (error) {
      console.error('Error creating share link:', error);
      alert('Failed to create share link. Please try again.');
    } finally {
      setIsCreatingShare(false);
    }
  }, [currentFlowId, isProUser]);

  // Load flow
  const loadFlow = (flow: SavedFlow) => {
    if (isDirty && !confirm('You have unsaved changes. Are you sure you want to load a different flow?')) {
      return;
    }

    setCurrentFlowId(flow.id);
    setFlowTitle(flow.title);
    setFlowStyle(flow.style);
    setFlowLevel(flow.level);
    setTargetDuration(flow.duration_minutes);

    const loadedItems: FlowItem[] = flow.items
      .sort((a, b) => a.position - b.position)
      .map((item) => ({
        id: `${item.pose?.slug || item.pose_id}-${Date.now()}-${Math.random()}`,
        poseId: item.pose_id,
        poseSlug: item.pose?.slug || '',
        poseName: item.pose?.english_name || 'Unknown Pose',
        poseImage: getProxiedImageUrl(item.pose?.image_url) || null,
        durationSeconds: item.duration_seconds,
        side: item.side,
        notes: item.notes || '',
      }));

    setItems(loadedItems);
    setIsDirty(false);
    setShowLoadModal(false);
  };

  // Delete flow
  const deleteFlow = async (flowId: string) => {
    if (!confirm('Are you sure you want to delete this flow?')) return;

    try {
      const response = await fetch(`/api/flows/${flowId}`, { method: 'DELETE', credentials: 'include' });
      if (response.ok) {
        setSavedFlows(savedFlows.filter((f) => f.id !== flowId));
        if (currentFlowId === flowId) {
          setCurrentFlowId(null);
          setFlowTitle('');
          setItems([]);
        }
      }
    } catch (error) {
      console.error('Error deleting flow:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header user={user} profile={initialProfile} />

      <main className="flex-1 flex flex-col pt-14 md:pt-16">
        {/* Toolbar */}
        <div className="glass-strong border-b border-neutral-100 sticky top-14 md:top-16 z-40">
          <Container size="xl">
            <div className="py-2 hidden lg:flex items-center gap-3">
              {/* Flow Title */}
              <div className="relative">
                <input
                  type="text"
                  value={flowTitle}
                  onChange={(e) => {
                    setFlowTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  className="h-9 w-52 px-3 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-900 font-medium transition-all hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-neutral-400 placeholder:font-normal"
                  placeholder="Flow name..."
                />
                {isDirty && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" title="Unsaved changes" />
                )}
                {saveSuccess && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-neutral-200" />

              {/* Style Dropdown */}
              <select
                value={flowStyle}
                onChange={(e) => {
                  setFlowStyle(e.target.value as FlowStyle);
                  setIsDirty(true);
                }}
                className="h-9 px-3 text-sm rounded-lg bg-white border border-neutral-200 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary-500/20 focus:border-primary-500"
              >
                {flowStyleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {/* Level Dropdown */}
              <select
                value={flowLevel}
                onChange={(e) => {
                  setFlowLevel(e.target.value as Difficulty);
                  setIsDirty(true);
                }}
                className="h-9 px-3 text-sm rounded-lg bg-white border border-neutral-200 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary-500/20 focus:border-primary-500"
              >
                {difficultyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {/* Divider */}
              <div className="w-px h-5 bg-neutral-200" />

              {/* Stats */}
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-medium text-neutral-700">{formatDuration(totalSeconds)}</span>
                </div>
                <span>•</span>
                <span><span className="font-medium text-neutral-700">{items.length}</span> poses</span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {/* Delete */}
                <button
                  onClick={clearFlow}
                  className="h-9 px-3 flex items-center gap-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                {/* Load */}
                {user && savedFlows.length > 0 && (
                  <button
                    onClick={() => setShowLoadModal(true)}
                    className="h-9 px-3 flex items-center gap-1.5 text-sm font-medium text-white bg-neutral-500 hover:bg-neutral-600 rounded-lg transition-colors"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Load</span>
                  </button>
                )}
                {/* Save */}
                <button
                  onClick={() => {
                    if (!user) {
                      setShowLoginModal(true);
                    } else {
                      setShowSaveModal(true);
                    }
                  }}
                  disabled={isSaving}
                  className="h-9 px-3 flex items-center gap-1.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{currentFlowId ? 'Update' : 'Save'}</span>
                </button>
                {/* Create */}
                <button
                  onClick={createAndOpenShare}
                  disabled={isCreatingShare}
                  className="h-9 px-3 flex items-center gap-1.5 text-sm font-medium text-white bg-[#34C759] hover:bg-[#2DB84D] rounded-lg transition-colors disabled:opacity-50"
                >
                  {isCreatingShare ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                  <span>Create</span>
                </button>
              </div>
            </div>

            {/* Mobile Toolbar */}
            <div className="py-3 flex flex-col gap-3 lg:hidden">
              {/* Mobile Tab Navigation */}
              <div className="flex items-center bg-neutral-100 rounded-lg p-0.5">
                <button
                  onClick={() => setActiveTab('build')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'build'
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Build
                </button>
                <button
                  onClick={() => setActiveTab('my-flows')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'my-flows'
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                  My Flows
                  {user && savedFlows.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                      {savedFlows.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Build Tab - Mobile Content */}
              {activeTab === 'build' && (
                <>
                  {/* Row 1: Flow name */}
                  <div className="relative">
                    <input
                      type="text"
                      value={flowTitle}
                      onChange={(e) => {
                        setFlowTitle(e.target.value);
                        setIsDirty(true);
                      }}
                      className="h-9 w-full px-3 text-sm rounded-lg bg-white border border-neutral-200 text-neutral-900 font-medium transition-all hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-neutral-400 placeholder:font-normal"
                      placeholder="Flow name..."
                    />
                    {isDirty && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
                    )}
                  </div>
                  {/* Row 2: Style, Level, Actions - all in one row */}
                  <div className="flex items-center gap-1.5">
                    {/* Style dropdown - compact */}
                    <select
                      value={flowStyle}
                      onChange={(e) => setFlowStyle(e.target.value as FlowStyle)}
                      className="h-8 px-2 text-xs rounded-lg bg-white border border-neutral-200 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary-500/20 focus:border-primary-500"
                    >
                      {flowStyleOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {/* Level dropdown - compact */}
                    <select
                      value={flowLevel}
                      onChange={(e) => setFlowLevel(e.target.value as Difficulty)}
                      className="h-8 px-2 text-xs rounded-lg bg-white border border-neutral-200 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary-500/20 focus:border-primary-500"
                    >
                      {difficultyOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {/* Spacer */}
                    <div className="flex-1" />
                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      {/* Delete */}
                      <button
                        onClick={clearFlow}
                        className="w-8 h-8 flex items-center justify-center text-white bg-red-500 active:bg-red-600 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {/* Load */}
                      {user && savedFlows.length > 0 && (
                        <button
                          onClick={() => setShowLoadModal(true)}
                          className="w-8 h-8 flex items-center justify-center text-white bg-neutral-500 active:bg-neutral-600 rounded-lg"
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {/* Save */}
                      <button
                        onClick={() => user ? setShowSaveModal(true) : setShowLoginModal(true)}
                        disabled={isSaving}
                        className="w-8 h-8 flex items-center justify-center text-white bg-primary-500 active:bg-primary-600 rounded-lg disabled:opacity-50"
                      >
                        {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      </button>
                      {/* Create */}
                      <button
                        onClick={createAndOpenShare}
                        disabled={isCreatingShare}
                        className="w-8 h-8 flex items-center justify-center text-white bg-[#34C759] active:bg-[#2DB84D] rounded-lg disabled:opacity-50"
                      >
                        {isCreatingShare ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* My Flows Tab - Mobile Content */}
              {activeTab === 'my-flows' && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    {savedFlows.length} {savedFlows.length === 1 ? 'flow' : 'flows'} saved
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      clearFlow();
                      setActiveTab('build');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    New Flow
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Container size="xl" className="py-6">
            {/* Build Tab Content */}
            {activeTab === 'build' && (
              <div className="grid lg:grid-cols-3 gap-6 h-full">
                {/* Pose Picker - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block lg:col-span-1">
                <Card variant="glass" padding="md" className="sticky top-44">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-neutral-900">Pose Library</h2>
                    <span className="text-sm text-neutral-500">
                      {searchQuery || typeFilter ? (
                        <><span className="font-medium text-neutral-700">{filteredPoses.length}</span> / {poses.length}</>
                      ) : (
                        <><span className="font-medium text-neutral-700">{poses.length}</span> poses</>
                      )}
                    </span>
                  </div>

                  {/* Search and Filter */}
                  <div className="space-y-3 mb-4">
                    <Input
                      placeholder="Search poses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      leftIcon={<Search className="w-4 h-4" />}
                    />
                    <Select
                      options={poseTypeFilterOptions}
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value as PoseType | '')}
                    />
                  </div>

                  {/* Pose List */}
                  {isPosesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[calc(100vh-450px)] overflow-y-auto scrollbar-hide">
                      {filteredPoses.map((pose) => (
                        <button
                          key={pose.slug}
                          onClick={() => addPoseToFlow(pose)}
                          disabled={isOverPoseLimit}
                          className="relative w-full p-[5px] rounded-xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {/* Green + badge - right edge, vertically centered */}
                          <div className="absolute top-1/2 -translate-y-1/2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm z-10">
                            <Plus className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </div>
                          <div className="flex items-center gap-2 pr-8">
                            <div className="w-14 h-14 rounded-lg bg-neutral-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {pose.image_url ? (
                                <Image
                                  src={getProxiedImageUrl(pose.image_url) || pose.image_url}
                                  alt={pose.english_name}
                                  width={56}
                                  height={56}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <span className="text-neutral-400 font-light text-xl">
                                  {pose.english_name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-neutral-900 text-sm truncate group-hover:text-primary-600">
                                {pose.english_name}
                              </p>
                              {pose.sanskrit_name && (
                                <p className="text-xs text-neutral-500 truncate italic">
                                  {pose.sanskrit_name}
                                </p>
                              )}
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary-50 text-primary-600 rounded capitalize">
                                  {pose.pose_type?.replace('_', ' ')}
                                </span>
                                <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded capitalize ${
                                  pose.difficulty === 'beginner'
                                    ? 'bg-green-50 text-green-600'
                                    : pose.difficulty === 'intermediate'
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'bg-red-50 text-red-600'
                                }`}>
                                  {pose.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {!isPosesLoading && filteredPoses.length === 0 && (
                    <div className="text-center py-8 text-neutral-500">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No poses found</p>
                    </div>
                  )}
                </Card>
              </div>

              {/* Flow Preview - Full width on mobile */}
              <div className="col-span-full lg:col-span-2">
                <Card variant="glass" padding="sm" className="lg:p-6">
                  {/* Mobile Flow Header - Compact iOS style */}
                  <div className="lg:hidden mb-3 pb-2 border-b border-neutral-100">
                    <div className="flex items-center justify-between">
                      {/* Stats - iOS pill style */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-full">
                          <span className="text-[11px] font-semibold text-neutral-700">{items.length}</span>
                          <span className="text-[11px] text-neutral-500">poses</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-full">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          <span className="text-[11px] font-semibold text-neutral-700">{formatDuration(totalSeconds)}</span>
                        </div>
                      </div>
                      {/* Zoom Controls + Actions */}
                      <div className="flex items-center gap-1">
                        {/* Zoom Controls - iOS segmented style */}
                        <div className="flex items-center bg-neutral-100 rounded-full p-0.5">
                          <button
                            onClick={zoomOut}
                            disabled={!canZoomOut}
                            className={`p-1.5 rounded-full transition-colors ${
                              canZoomOut
                                ? 'text-neutral-600 active:bg-white'
                                : 'text-neutral-300'
                            }`}
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] font-semibold text-neutral-600 w-7 text-center">
                            {zoomPercent}%
                          </span>
                          <button
                            onClick={zoomIn}
                            disabled={!canZoomIn}
                            className={`p-1.5 rounded-full transition-colors ${
                              canZoomIn
                                ? 'text-neutral-600 active:bg-white'
                                : 'text-neutral-300'
                            }`}
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Flow Preview Header - hidden on mobile */}
                  <div className="hidden lg:flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
                    {/* Flow Info */}
                    <div className="flex items-center gap-3">
                      {/* Flow Name */}
                      <h2 className="text-base font-semibold text-neutral-900">
                        {flowTitle || <span className="text-neutral-400 font-normal italic">Untitled Flow</span>}
                      </h2>

                      {/* Divider */}
                      <div className="w-px h-4 bg-neutral-200" />

                      {/* Style & Level */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-primary-600 font-medium">
                          {flowStyleOptions.find(o => o.value === flowStyle)?.label}
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-neutral-600">
                          {difficultyOptions.find(o => o.value === flowLevel)?.label}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-4 bg-neutral-200" />

                      {/* Stats */}
                      <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-neutral-700">{items.length}</span>
                          <span>poses</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-semibold text-neutral-700">{formatDuration(totalSeconds)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Zoom Controls */}
                      <div className="flex items-center gap-1 bg-neutral-100 rounded-lg px-1 py-0.5">
                        <button
                          onClick={zoomOut}
                          disabled={!canZoomOut}
                          className={`p-1.5 rounded transition-colors ${
                            canZoomOut
                              ? 'text-neutral-500 hover:text-neutral-700 hover:bg-white'
                              : 'text-neutral-300 cursor-not-allowed'
                          }`}
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-medium text-neutral-600 w-9 text-center">
                          {zoomPercent}%
                        </span>
                        <button
                          onClick={zoomIn}
                          disabled={!canZoomIn}
                          className={`p-1.5 rounded transition-colors ${
                            canZoomIn
                              ? 'text-neutral-500 hover:text-neutral-700 hover:bg-white'
                              : 'text-neutral-300 cursor-not-allowed'
                          }`}
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Limit Warning */}
                  {isOverPoseLimit && !user && (
                    <div className="bg-warning-light border border-warning/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">
                          Pose limit reached
                        </p>
                        <p className="text-sm text-neutral-600">
                          Sign in to add more poses and save your flows.
                        </p>
                        <Link href="/login">
                          <Button size="sm" className="mt-2">
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {items.length === 0 && (
                    <>
                      {/* Desktop Empty State */}
                      <div className="hidden lg:block border-2 border-dashed border-neutral-200 rounded-2xl p-16 text-center">
                        <div className="w-20 h-20 rounded-full bg-neutral-100 mx-auto mb-6 flex items-center justify-center">
                          <Plus className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-medium text-neutral-900 mb-2">
                          Start building your flow
                        </h3>
                        <p className="text-neutral-600 max-w-md mx-auto">
                          Select poses from the library on the left to add them to your sequence.
                          Drag cards to reorder.
                        </p>
                      </div>
                      {/* Mobile Empty State - Minimal */}
                      <button
                        onClick={() => setShowMobilePoseLibrary(true)}
                        className="lg:hidden w-full py-10 border-2 border-dashed border-neutral-200 rounded-xl active:bg-neutral-50 transition-colors"
                      >
                        <p className="text-sm text-neutral-500 mb-4">Start creating your own yoga flow</p>
                        <Plus className="w-12 h-12 text-neutral-300 mx-auto mb-2" strokeWidth={1.5} />
                        <p className="text-sm text-neutral-400">Tap to Add Yoga Pose</p>
                      </button>
                    </>
                  )}

                  {/* Visual Grid */}
                  {items.length > 0 && (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={items.map((item) => item.id)}
                        strategy={rectSortingStrategy}
                      >
                        <div className={`grid ${isMobile ? 'gap-2' : 'gap-4'} ${getGridCols()}`}>
                          {items.map((item, index) => (
                            <VisualFlowItem
                              key={item.id}
                              id={item.id}
                              index={index}
                              poseName={item.poseName}
                              poseImage={item.poseImage}
                              durationSeconds={item.durationSeconds}
                              side={item.side}
                              notes={item.notes}
                              zoomLevel={getZoomLevel()}
                              isMobile={isMobile}
                              onUpdate={(updates) => updateItem(item.id, updates)}
                              onRemove={() => removeItem(item.id)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </Card>
              </div>
            </div>
            )}

            {/* My Flows Tab Content */}
            {activeTab === 'my-flows' && (
              <div className="max-w-4xl mx-auto">
                {!user ? (
                  /* Not logged in state */
                  <Card variant="glass" padding="lg" className="text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Sign in to see your flows</h3>
                    <p className="text-neutral-600 mb-6">
                      Create an account to save and manage your yoga sequences.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Link href="/login">
                        <Button variant="outline">Sign In</Button>
                      </Link>
                      <Link href="/signup">
                        <Button>Create Account</Button>
                      </Link>
                    </div>
                  </Card>
                ) : isFlowsLoading ? (
                  /* Loading state */
                  <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                  </div>
                ) : savedFlows.length === 0 ? (
                  /* Empty state */
                  <Card variant="glass" padding="lg" className="text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">No flows yet</h3>
                    <p className="text-neutral-600 mb-6">
                      Create your first yoga flow sequence and it will appear here.
                    </p>
                    <Button
                      onClick={() => {
                        clearFlow();
                        setActiveTab('build');
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Flow
                    </Button>
                  </Card>
                ) : (
                  /* Flows list */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-neutral-900">Your Saved Flows</h2>
                      <div className="text-sm text-neutral-500">
                        {tierLimits.tier === 'pro' ? (
                          <span>{savedFlows.length} flows</span>
                        ) : (
                          <>
                            {savedFlows.length} / {tierLimits.maxFlows} flows
                            <Link href="/pricing" className="ml-2 text-primary-600 hover:underline">
                              Upgrade for more
                            </Link>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {savedFlows.map((flow) => (
                        <Card
                          key={flow.id}
                          variant="glass"
                          padding="md"
                          className="hover:border-primary-200 transition-all group cursor-pointer"
                          onClick={() => {
                            loadFlow(flow);
                            setActiveTab('build');
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-neutral-900 truncate group-hover:text-primary-600">
                                {flow.title}
                              </h3>
                              <p className="text-sm text-neutral-500 mt-0.5">
                                {flowStyleOptions.find(o => o.value === flow.style)?.label} · {difficultyOptions.find(o => o.value === flow.level)?.label}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  loadFlow(flow);
                                  setActiveTab('build');
                                }}
                                className="p-1.5 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                title="Edit flow"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteFlow(flow.id);
                                }}
                                className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete flow"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-neutral-600">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{flow.items?.length || 0}</span>
                              <span>poses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{flow.duration_minutes || 0}m</span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-neutral-100 text-xs text-neutral-400">
                            Updated {new Date(flow.updated_at).toLocaleDateString()}
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Upgrade prompt for free tier */}
                    {tierLimits.tier === 'free' && savedFlows.length >= 3 && (
                      <div className="mt-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-5 border border-primary-100">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Crown className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900">Need more flows?</h3>
                            <p className="text-sm text-neutral-600 mt-1">
                              Upgrade to Pro for unlimited flows, unlimited poses per flow, PDF export, and more.
                            </p>
                            <Link href="/pricing">
                              <Button size="sm" className="mt-3">
                                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                                Upgrade to Pro
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Container>
        </div>
      </main>

      {/* Save Modal - for free tier users */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="default" padding="lg" className="max-w-lg w-full animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-neutral-900">
                {currentFlowId ? 'Update Flow' : 'Save Flow'}
              </h3>
              <button onClick={() => setShowSaveModal(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-600">
                {saveError}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Flow Title"
                value={flowTitle}
                onChange={(e) => setFlowTitle(e.target.value)}
                placeholder="My Yoga Flow"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Style</label>
                  <Select
                    options={flowStyleOptions}
                    value={flowStyle}
                    onChange={(e) => setFlowStyle(e.target.value as FlowStyle)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Level</label>
                  <Select
                    options={difficultyOptions}
                    value={flowLevel}
                    onChange={(e) => setFlowLevel(e.target.value as Difficulty)}
                  />
                </div>
              </div>

              <div className="text-sm text-neutral-600">
                {items.length} poses • {formatDuration(totalSeconds)} total
              </div>
            </div>

            {/* Free tier info */}
            {tierLimits.tier === 'free' && !currentFlowId && (
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="bg-neutral-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full">
                      Free Plan
                    </span>
                    <span className="text-xs text-neutral-500">
                      {savedFlows.length} / {tierLimits.maxFlows} flows used
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-neutral-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Up to {tierLimits.maxFlows} saved flows
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Up to {tierLimits.maxPoses} poses per flow
                    </li>
                  </ul>
                </div>

                {/* Pro upgrade teaser */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 border border-primary-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900 text-sm">Want more?</p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Upgrade to Pro for unlimited flows, unlimited poses, PDF export, and more.
                      </p>
                      <Link href="/pricing">
                        <button className="mt-2 text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          View Pro features
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Flow limit warning */}
                {isOverFlowLimit && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Flow limit reached</p>
                        <p className="text-xs text-amber-700 mt-0.5">
                          You&apos;ve reached your limit of {tierLimits.maxFlows} flows. Delete an existing flow or upgrade to Pro.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={saveFlow}
                disabled={isSaving || !flowTitle.trim() || (isOverFlowLimit && !currentFlowId)}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : currentFlowId ? (
                  'Update'
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="default" padding="lg" className="max-w-lg w-full animate-scale-in max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-neutral-900">Load Flow</h3>
              <button onClick={() => setShowLoadModal(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isFlowsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              </div>
            ) : savedFlows.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No saved flows yet</p>
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto flex-1">
                {savedFlows.map((flow) => (
                  <div
                    key={flow.id}
                    className="p-4 rounded-xl border border-neutral-100 hover:border-primary-200 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <button
                        onClick={() => loadFlow(flow)}
                        className="flex-1 text-left"
                      >
                        <p className="font-medium text-neutral-900 group-hover:text-primary-600">
                          {flow.title}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          {flow.items?.length || 0} poses • {flow.style} • {flow.level}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                          Updated {new Date(flow.updated_at).toLocaleDateString()}
                        </p>
                      </button>
                      <button
                        onClick={() => deleteFlow(flow.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowLoadModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Login Modal - for non-signed-in users */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="default" padding="lg" className="max-w-md w-full animate-scale-in relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Registration required notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Sign up required</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Create a free account to save your yoga flows.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits of signing up */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                What you get with a free account
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-800">Save up to 3 flows</p>
                    <p className="text-sm text-neutral-600">Store your custom yoga sequences</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-800">8 poses per flow</p>
                    <p className="text-sm text-neutral-600">Add up to 8 poses to each flow</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-800">Full pose library access</p>
                    <p className="text-sm text-neutral-600">Browse all yoga poses</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-800">Edit anytime, anywhere</p>
                    <p className="text-sm text-neutral-600">Update your flows from any device</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowLoginModal(false)}
              >
                Maybe later
              </Button>
              <Link href="/signup" className="flex-1">
                <Button className="w-full">Sign Up Free</Button>
              </Link>
            </div>

            <p className="text-center text-xs text-neutral-500 mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      )}

      {/* Share Modal */}
      <ShareFlowModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        flowId={currentFlowId || ''}
        flowTitle={flowTitle}
        isProUser={isProUser}
      />

      {/* Save First Warning Modal */}
      {showSaveFirstWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-scale-in">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Save your flow first
              </h3>
              <p className="text-sm text-neutral-600 mb-6">
                You need to save your flow before creating a shareable link. Go to the Settings panel and click Save.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowSaveFirstWarning(false)}
                className="w-full"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Action Button - Add Poses */}
      {activeTab === 'build' && items.length > 0 && (
        <button
          onClick={() => setShowMobilePoseLibrary(true)}
          disabled={isOverPoseLimit}
          className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-500 text-white rounded-full shadow-xl shadow-primary-500/30 flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add poses"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Pose Library Bottom Sheet */}
      {showMobilePoseLibrary && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobilePoseLibrary(false)}
          />

          {/* Bottom Sheet - iOS style */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] flex flex-col animate-slide-up">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-neutral-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-neutral-900">Add Poses</h2>
                <span className="text-sm text-neutral-500">
                  {searchQuery || typeFilter ? (
                    <>{filteredPoses.length} / {poses.length}</>
                  ) : (
                    <>{poses.length}</>
                  )}
                </span>
              </div>
              <button
                onClick={() => setShowMobilePoseLibrary(false)}
                className="p-2 -mr-2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="px-4 py-3 space-y-2 border-b border-neutral-100 bg-neutral-50/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search poses..."
                  className="w-full h-10 pl-9 pr-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
              {/* Type filter pills - horizontal scroll */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
                <button
                  onClick={() => setTypeFilter('')}
                  className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    typeFilter === ''
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-neutral-600 border border-neutral-200'
                  }`}
                >
                  All
                </button>
                {poseTypeFilterOptions.slice(1).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTypeFilter(opt.value as PoseType)}
                    className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      typeFilter === opt.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pose limit indicator */}
            {tierLimits.maxPoses !== Infinity && (
              <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Poses in flow</span>
                  <span className={`font-semibold ${isOverPoseLimit ? 'text-red-500' : 'text-neutral-700'}`}>
                    {items.length} / {tierLimits.maxPoses}
                  </span>
                </div>
              </div>
            )}

            {/* Toast notification */}
            {addedPoseToast && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full shadow-lg">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Added to flow</span>
                </div>
              </div>
            )}

            {/* Pose List */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {isPosesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                </div>
              ) : filteredPoses.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No poses found</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 p-4">
                  {filteredPoses.map((pose) => (
                    <button
                      key={pose.slug}
                      onClick={() => {
                        addPoseToFlow(pose);
                        // Don't close immediately so user can add multiple
                      }}
                      disabled={isOverPoseLimit}
                      className="relative flex flex-col items-center p-2 rounded-xl bg-white border border-neutral-100 shadow-sm active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Green + badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                        <Plus className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <div className="w-full aspect-square rounded-lg bg-neutral-50 mb-1.5 overflow-hidden">
                        {pose.image_url ? (
                          <Image
                            src={getProxiedImageUrl(pose.image_url) || pose.image_url}
                            alt={pose.english_name}
                            width={100}
                            height={100}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl text-neutral-300 font-light">
                              {pose.english_name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-neutral-700 text-center leading-tight line-clamp-2">
                        {pose.english_name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom safe area with done button */}
            <div className="px-4 py-4 border-t border-neutral-100 bg-white">
              <button
                onClick={() => setShowMobilePoseLibrary(false)}
                className="w-full py-3 bg-neutral-900 text-white font-medium rounded-xl active:scale-[0.98] transition-transform"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
