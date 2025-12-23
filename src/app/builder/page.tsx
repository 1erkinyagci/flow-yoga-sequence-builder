'use client';

import { useState, useMemo } from 'react';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Search,
  Plus,
  Save,
  Download,
  Share2,
  Sparkles,
  Clock,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container, Card, Input, Button, Select } from '@/components/ui';
import { DifficultyBadge, PoseTypeBadge } from '@/components/ui/Badge';
import { SortableFlowItem } from '@/components/flows/SortableFlowItem';
import { samplePoses } from '@/data/poses';
import type { FlowStyle, Difficulty, PoseType, PoseSide } from '@/types';

interface FlowItem {
  id: string;
  poseSlug: string;
  poseName: string;
  durationSeconds: number;
  side: PoseSide;
  notes: string;
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

// Tier limits
const ANONYMOUS_LIMITS = { maxFlows: 1, maxPoses: 8, canSave: false, canExport: false };

export default function BuilderPage() {
  // Flow metadata
  const [flowTitle, setFlowTitle] = useState('Untitled Flow');
  const [flowStyle, setFlowStyle] = useState<FlowStyle>('vinyasa');
  const [flowLevel, setFlowLevel] = useState<Difficulty>('beginner');
  const [targetDuration, setTargetDuration] = useState(60);

  // Flow items
  const [items, setItems] = useState<FlowItem[]>([]);

  // Pose picker state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PoseType | ''>('');

  // UI state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Check limits (anonymous user for now)
  const isOverLimit = items.length >= ANONYMOUS_LIMITS.maxPoses;
  const canSave = ANONYMOUS_LIMITS.canSave;
  const canExport = ANONYMOUS_LIMITS.canExport;

  // Filter poses for the picker
  const filteredPoses = useMemo(() => {
    return samplePoses.filter((pose) => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesName = pose.english_name.toLowerCase().includes(searchLower);
        const matchesSanskrit = pose.sanskrit_name?.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesSanskrit) return false;
      }
      if (typeFilter && pose.pose_type !== typeFilter) return false;
      return true;
    });
  }, [searchQuery, typeFilter]);

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
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addPoseToFlow = (poseSlug: string, poseName: string) => {
    if (isOverLimit) {
      setShowUpgradeModal(true);
      return;
    }

    const newItem: FlowItem = {
      id: `${poseSlug}-${Date.now()}`,
      poseSlug,
      poseName,
      durationSeconds: 30,
      side: 'both',
      notes: '',
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<FlowItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearFlow = () => {
    if (confirm('Are you sure you want to clear all poses?')) {
      setItems([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />

      <main className="flex-1 flex flex-col pt-24 md:pt-28">
        {/* Toolbar */}
        <div className="glass-strong border-b border-neutral-100 sticky top-24 md:top-28 z-40">
          <Container size="xl">
            <div className="py-3 flex flex-col md:flex-row md:items-center gap-4">
              {/* Flow Title */}
              <input
                type="text"
                value={flowTitle}
                onChange={(e) => setFlowTitle(e.target.value)}
                className="text-lg font-semibold bg-transparent border-none focus:outline-none text-neutral-900 w-full md:w-auto"
                placeholder="Flow title..."
              />

              {/* Flow Settings */}
              <div className="flex items-center gap-3 flex-wrap">
                <Select
                  options={flowStyleOptions}
                  value={flowStyle}
                  onChange={(e) => setFlowStyle(e.target.value as FlowStyle)}
                  className="w-32"
                />
                <Select
                  options={difficultyOptions}
                  value={flowLevel}
                  onChange={(e) => setFlowLevel(e.target.value as Difficulty)}
                  className="w-36"
                />
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(totalSeconds)}</span>
                  <span className="text-neutral-400">/ {targetDuration} min</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFlow}
                  disabled={items.length === 0}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => !canSave && setShowUpgradeModal(true)}
                  disabled={items.length === 0}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => !canExport && setShowUpgradeModal(true)}
                  disabled={items.length === 0}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => !canExport && setShowUpgradeModal(true)}
                  disabled={items.length === 0}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
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
                <Card variant="glass" padding="md" className="sticky top-36">
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
                  <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-hide">
                    {filteredPoses.map((pose) => (
                      <button
                        key={pose.slug}
                        onClick={() => addPoseToFlow(pose.slug, pose.english_name)}
                        disabled={isOverLimit}
                        className="w-full p-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-100 hover:border-primary-200 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-neutral-400 font-light">
                              {pose.english_name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-neutral-900 text-sm truncate group-hover:text-primary-600">
                              {pose.english_name}
                            </p>
                            <p className="text-xs text-neutral-500 capitalize">
                              {pose.pose_type.replace('_', ' ')} • {pose.difficulty}
                            </p>
                          </div>
                          <Plus className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {filteredPoses.length === 0 && (
                    <div className="text-center py-8 text-neutral-500">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No poses found</p>
                    </div>
                  )}
                </Card>
              </div>

              {/* Flow Builder */}
              <div className="lg:col-span-2">
                <Card variant="glass" padding="md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-neutral-900">
                      Your Sequence
                      <span className="text-neutral-500 font-normal ml-2">
                        ({items.length}/{ANONYMOUS_LIMITS.maxPoses} poses)
                      </span>
                    </h2>
                    <Button variant="ghost" size="sm" disabled>
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Suggest
                    </Button>
                  </div>

                  {/* Limit Warning */}
                  {isOverLimit && (
                    <div className="bg-warning-light border border-warning/30 rounded-xl p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">
                          Pose limit reached
                        </p>
                        <p className="text-sm text-neutral-600">
                          Create a free account to add up to 15 poses, or upgrade to Pro
                          for unlimited poses.
                        </p>
                        <Button size="sm" className="mt-2" onClick={() => setShowUpgradeModal(true)}>
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {items.length === 0 && (
                    <div className="border-2 border-dashed border-neutral-200 rounded-xl p-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                        <Plus className="w-8 h-8 text-neutral-400" />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">
                        Start building your flow
                      </h3>
                      <p className="text-neutral-600 max-w-sm mx-auto">
                        Click on poses from the library to add them to your sequence.
                        Drag to reorder.
                      </p>
                    </div>
                  )}

                  {/* Sortable List */}
                  {items.length > 0 && (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={items.map((item) => item.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {items.map((item, index) => (
                            <SortableFlowItem
                              key={item.id}
                              id={item.id}
                              index={index}
                              poseName={item.poseName}
                              durationSeconds={item.durationSeconds}
                              side={item.side}
                              notes={item.notes}
                              onUpdate={(updates) => updateItem(item.id, updates)}
                              onRemove={() => removeItem(item.id)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}

                  {/* Flow Summary */}
                  {items.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-neutral-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Total Duration</span>
                        <span className="font-semibold text-neutral-900">
                          {formatDuration(totalSeconds)}
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </main>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="default" padding="lg" className="max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Upgrade to unlock more features
            </h3>
            <p className="text-neutral-600 mb-6">
              Create a free account to save up to 5 flows with 15 poses each, or
              upgrade to Pro for unlimited access plus AI suggestions and exports.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowUpgradeModal(false)}
              >
                Maybe later
              </Button>
              <Button className="flex-1">Sign up free</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
