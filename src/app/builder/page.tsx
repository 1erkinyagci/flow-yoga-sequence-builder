'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container, Card, Input, Button, Select } from '@/components/ui';
import { VisualFlowItem } from '@/components/flows/VisualFlowItem';
import { createClient } from '@/lib/supabase/client';
import type { FlowStyle, Difficulty, PoseType, PoseSide, Flow } from '@/types';

const ZOOM_LEVELS = [50, 75, 100, 150, 200] as const;
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
  { value: 'hip_opener', label: 'Hip Opener' },
  { value: 'balance', label: 'Balance' },
  { value: 'restorative', label: 'Restorative' },
];

export default function BuilderPage() {
  // Auth state
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Poses from database
  const [poses, setPoses] = useState<PoseFromDB[]>([]);
  const [isPosesLoading, setIsPosesLoading] = useState(true);

  // User's saved flows
  const [savedFlows, setSavedFlows] = useState<SavedFlow[]>([]);
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [zoomPercent, setZoomPercent] = useState<ZoomPercent>(100);

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

  // Get grid columns based on zoom
  const getGridCols = () => {
    switch (zoomPercent) {
      case 50: return 'grid-cols-4 xl:grid-cols-6';
      case 75: return 'grid-cols-3 xl:grid-cols-5';
      case 100: return 'grid-cols-2 xl:grid-cols-4';
      case 150: return 'grid-cols-2 xl:grid-cols-3';
      case 200: return 'grid-cols-1 xl:grid-cols-2';
      default: return 'grid-cols-2 xl:grid-cols-3';
    }
  };

  // Get zoom level for component
  const getZoomLevel = (): 'small' | 'medium' | 'large' => {
    if (zoomPercent <= 75) return 'small';
    if (zoomPercent >= 150) return 'large';
    return 'medium';
  };

  // Tier limits based on auth
  const tierLimits = useMemo(() => {
    if (!user) return { maxPoses: 8, canSave: false };
    return { maxPoses: 50, canSave: true }; // Logged in users can save
  }, [user]);

  const isOverLimit = items.length >= tierLimits.maxPoses;

  // Check auth on mount
  useEffect(() => {
    const supabase = createClient();

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({ id: user.id, email: user.email || '' });
      }
      setIsAuthLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
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

  // Fetch user's saved flows when logged in
  useEffect(() => {
    if (!user) {
      setSavedFlows([]);
      return;
    }

    const fetchFlows = async () => {
      setIsFlowsLoading(true);
      try {
        const response = await fetch('/api/flows');
        if (response.ok) {
          const data = await response.json();
          setSavedFlows(data);
        }
      } catch (error) {
        console.error('Error fetching flows:', error);
      } finally {
        setIsFlowsLoading(false);
      }
    };

    fetchFlows();
  }, [user]);

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
    if (isOverLimit) {
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
      poseImage: pose.image_url,
      durationSeconds: pose.duration_hint_seconds || 30,
      side: 'both',
      notes: '',
    };
    setItems([...items, newItem]);
    setIsDirty(true);
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
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save flow');
      }

      const savedFlow = await response.json();
      setCurrentFlowId(savedFlow.id);
      setIsDirty(false);
      setSaveSuccess(true);
      setShowSaveModal(false);

      // Refresh saved flows list
      const flowsResponse = await fetch('/api/flows');
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
        poseImage: item.pose?.image_url || null,
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
      const response = await fetch(`/api/flows/${flowId}`, { method: 'DELETE' });
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
      <Header />

      <main className="flex-1 flex flex-col pt-24 md:pt-28">
        {/* Toolbar */}
        <div className="glass-strong border-b border-neutral-100 sticky top-24 md:top-28 z-40">
          <Container size="xl">
            <div className="py-2.5 hidden lg:flex items-center gap-6">
              {/* Flow Title */}
              <div className="relative">
                <input
                  type="text"
                  value={flowTitle}
                  onChange={(e) => {
                    setFlowTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  className="h-9 w-48 px-3 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-900 font-medium transition-all hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-neutral-400 placeholder:font-normal"
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

              {/* Minimal Selects */}
              <div className="flex items-center gap-4">
                {/* Style */}
                <div className="relative">
                  <select
                    value={flowStyle}
                    onChange={(e) => {
                      setFlowStyle(e.target.value as FlowStyle);
                      setIsDirty(true);
                    }}
                    className="appearance-none bg-transparent text-sm text-neutral-700 font-medium pr-5 cursor-pointer hover:text-neutral-900 focus:outline-none"
                  >
                    {flowStyleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                </div>

                {/* Level */}
                <div className="relative">
                  <select
                    value={flowLevel}
                    onChange={(e) => {
                      setFlowLevel(e.target.value as Difficulty);
                      setIsDirty(true);
                    }}
                    className="appearance-none bg-transparent text-sm text-neutral-700 font-medium pr-5 cursor-pointer hover:text-neutral-900 focus:outline-none"
                  >
                    {difficultyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-medium">{formatDuration(totalSeconds)}</span>
                </div>

                {/* Poses Count */}
                <div className="text-sm text-neutral-600">
                  <span className="font-medium">{items.length}</span> poses
                </div>
              </div>

              {/* Actions - with more spacing */}
              <div className="flex items-center gap-2 ml-auto">
                {user && savedFlows.length > 0 && (
                  <button
                    onClick={() => setShowLoadModal(true)}
                    className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Load
                  </button>
                )}
                <button
                  onClick={clearFlow}
                  disabled={items.length === 0}
                  className="p-2 text-neutral-400 hover:text-red-500 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (!user) {
                      setShowLoginModal(true);
                    } else {
                      setShowSaveModal(true);
                    }
                  }}
                  disabled={items.length === 0 || isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-1" />
                  )}
                  {currentFlowId ? 'Update' : 'Save'}
                </Button>
              </div>
            </div>

            {/* Mobile Toolbar */}
            <div className="py-3 flex flex-col gap-3 lg:hidden">
              <div className="relative">
                <input
                  type="text"
                  value={flowTitle}
                  onChange={(e) => {
                    setFlowTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  className="h-10 w-full px-4 rounded-xl bg-white border border-neutral-200 text-neutral-900 font-medium transition-all hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-neutral-400 placeholder:font-normal"
                  placeholder="Give your flow a name..."
                />
                {isDirty && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Select
                  options={flowStyleOptions}
                  value={flowStyle}
                  onChange={(e) => setFlowStyle(e.target.value as FlowStyle)}
                  className="flex-1 min-w-[100px]"
                />
                <Select
                  options={difficultyOptions}
                  value={flowLevel}
                  onChange={(e) => setFlowLevel(e.target.value as Difficulty)}
                  className="flex-1 min-w-[100px]"
                />
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearFlow} disabled={items.length === 0}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => user ? setShowSaveModal(true) : setShowLoginModal(true)}
                    disabled={items.length === 0 || isSaving}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Container size="xl" className="py-6">
            <div className="grid lg:grid-cols-3 gap-6 h-full">
              {/* Pose Picker */}
              <div className="lg:col-span-1">
                <Card variant="glass" padding="md" className="sticky top-44">
                  <h2 className="font-semibold text-neutral-900 mb-4">Pose Library</h2>

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
                          disabled={isOverLimit}
                          className="w-full p-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-100 hover:border-primary-200 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {pose.image_url ? (
                                <Image
                                  src={pose.image_url}
                                  alt={pose.english_name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-neutral-400 font-light text-lg">
                                  {pose.english_name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-neutral-900 text-sm truncate group-hover:text-primary-600">
                                {pose.english_name}
                              </p>
                              {pose.sanskrit_name && (
                                <p className="text-xs text-neutral-400 italic truncate">
                                  {pose.sanskrit_name}
                                </p>
                              )}
                            </div>
                            <Plus className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
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

              {/* Flow Preview */}
              <div className="lg:col-span-2">
                <Card variant="glass" padding="md">
                  {/* Flow Preview Header - stylish info display */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
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

                  {/* Limit Warning */}
                  {isOverLimit && !user && (
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
                    <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-16 text-center">
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
                        <div className={`grid gap-4 ${getGridCols()}`}>
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
          </Container>
        </div>
      </main>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="default" padding="lg" className="max-w-md w-full animate-scale-in">
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
                disabled={isSaving || !flowTitle.trim()}
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="default" padding="lg" className="max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Sign in to save your flow
            </h3>
            <p className="text-neutral-600 mb-6">
              Create a free account to save your yoga sequences and access them from anywhere.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowLoginModal(false)}
              >
                Maybe later
              </Button>
              <Link href="/login" className="flex-1">
                <Button className="w-full">Sign In</Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
