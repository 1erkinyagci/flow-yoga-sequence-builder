'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Loader2, Plus, X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { poseFormSchema, PoseFormInput, generateSlug, prepareFormDataForSubmission } from '@/lib/validations/pose';
import { Pose, POSE_TYPES, POSE_DIFFICULTIES, BODY_FOCUS_OPTIONS, POSE_STATUSES, COMMON_EQUIPMENT, COMMON_TAGS } from '@/types/pose';

interface PoseFormProps {
  initialData?: Partial<Pose>;
  isEditing?: boolean;
}

export default function PoseForm({ initialData, isEditing = false }: PoseFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PoseFormInput>({
    defaultValues: {
      english_name: initialData?.english_name || '',
      sanskrit_name: initialData?.sanskrit_name || '',
      sanskrit_name_simplified: initialData?.sanskrit_name_simplified || '',
      pronunciation: initialData?.pronunciation || '',
      short_description: initialData?.short_description || '',
      description: initialData?.description || '',
      breath_cue: initialData?.breath_cue || '',
      benefits: initialData?.benefits || [''],
      cautions: initialData?.cautions || [''],
      contraindications: initialData?.contraindications || [''],
      step_by_step: initialData?.step_by_step || [''],
      alignment_cues: initialData?.alignment_cues || [''],
      modifications: initialData?.modifications || [''],
      variations: initialData?.variations || [''],
      tags: initialData?.tags || [],
      equipment: initialData?.equipment || [],
      difficulty: initialData?.difficulty || 'beginner',
      pose_type: initialData?.pose_type || '',
      primary_focus: initialData?.primary_focus || '',
      secondary_focus: initialData?.secondary_focus || [],
      duration_hint_seconds: initialData?.duration_hint_seconds || null,
      is_peak_pose: initialData?.is_peak_pose || false,
      is_warmup: initialData?.is_warmup || false,
      is_cooldown: initialData?.is_cooldown || false,
      is_bilateral: initialData?.is_bilateral ?? true,
      image_alt: initialData?.image_alt || '',
      meta_title: initialData?.meta_title || '',
      meta_description: initialData?.meta_description || '',
      canonical_url: initialData?.canonical_url || '',
      status: initialData?.status || 'draft',
    },
  });

  const watchedValues = watch();
  const shortDescription = watch('short_description');
  const metaDescription = watch('meta_description');
  const englishName = watch('english_name');

  // Auto-generate slug from English name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('english_name', e.target.value);
  };

  // Array field handlers
  const getArrayValue = (field: keyof PoseFormInput): string[] => {
    const value = watchedValues[field];
    return Array.isArray(value) ? value : [];
  };

  const handleArrayFieldChange = (field: keyof PoseFormInput, index: number, value: string) => {
    const arr = [...getArrayValue(field)];
    arr[index] = value;
    setValue(field, arr as never);
  };

  const addArrayField = (field: keyof PoseFormInput) => {
    const arr = [...getArrayValue(field), ''];
    setValue(field, arr as never);
  };

  const removeArrayField = (field: keyof PoseFormInput, index: number) => {
    const arr = [...getArrayValue(field)];
    arr.splice(index, 1);
    setValue(field, (arr.length ? arr : ['']) as never);
  };

  // Tag/equipment toggle handlers
  const toggleTag = (tag: string) => {
    const current = getArrayValue('tags');
    if (current.includes(tag)) {
      setValue('tags', current.filter((t) => t !== tag));
    } else {
      setValue('tags', [...current, tag]);
    }
  };

  const toggleEquipment = (item: string) => {
    const current = getArrayValue('equipment');
    if (current.includes(item)) {
      setValue('equipment', current.filter((e) => e !== item));
    } else {
      setValue('equipment', [...current, item]);
    }
  };

  // Secondary focus toggle
  const toggleSecondaryFocus = (focus: string) => {
    const current = getArrayValue('secondary_focus');
    if (current.includes(focus)) {
      setValue('secondary_focus', current.filter((f) => f !== focus) as never);
    } else {
      setValue('secondary_focus', [...current, focus] as never);
    }
  };

  // Image upload handler
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: PoseFormInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Generate slug from English name
      const slug = generateSlug(data.english_name);

      // Prepare data for submission
      const preparedData = prepareFormDataForSubmission(data);

      // Upload image first if there's a new one
      let imageUrl = initialData?.image_url || null;
      let imagePath = initialData?.image_path || null;

      if (imageFile) {
        setIsUploadingImage(true);
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('slug', slug);

        const uploadResponse = await fetch('/api/admin/poses/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          throw new Error(uploadError.error || 'Failed to upload image');
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
        imagePath = uploadResult.path;
        setIsUploadingImage(false);
      }

      // Prepare final payload
      const payload = {
        ...preparedData,
        slug,
        image_url: imageUrl,
        image_path: imagePath,
      };

      const url = isEditing ? `/api/admin/poses/${initialData?.id}` : '/api/admin/poses';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || 'Failed to save pose');
      }

      router.push('/admin/poses');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
      setIsUploadingImage(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              English Name *
            </label>
            <input
              {...register('english_name')}
              placeholder="e.g., Downward Facing Dog"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.english_name && (
              <p className="text-red-500 text-sm mt-1">{errors.english_name.message}</p>
            )}
            <p className="text-sm text-neutral-500 mt-1">
              Slug: {englishName ? generateSlug(englishName) : '-'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Sanskrit Name
            </label>
            <input
              {...register('sanskrit_name')}
              placeholder="e.g., Adho Mukha Svanasana"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Sanskrit Simplified
            </label>
            <input
              {...register('sanskrit_name_simplified')}
              placeholder="e.g., Adho Mukha Svanasana"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Pronunciation
            </label>
            <input
              {...register('pronunciation')}
              placeholder="e.g., AH-doh MOO-kah shvah-NAHS-anna"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </Card>

      {/* Classification */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Classification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Difficulty *</label>
            <select
              {...register('difficulty')}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {POSE_DIFFICULTIES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Pose Type</label>
            <select
              {...register('pose_type')}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Type</option>
              {POSE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Primary Focus</label>
            <select
              {...register('primary_focus')}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Focus</option>
              {BODY_FOCUS_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Duration Hint (seconds)
            </label>
            <input
              type="number"
              {...register('duration_hint_seconds', { valueAsNumber: true })}
              placeholder="e.g., 30"
              min="1"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Secondary Focus */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-700 mb-3">Secondary Focus</label>
          <div className="flex flex-wrap gap-2">
            {BODY_FOCUS_OPTIONS.map((focus) => (
              <button
                key={focus.value}
                type="button"
                onClick={() => toggleSecondaryFocus(focus.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  getArrayValue('secondary_focus').includes(focus.value)
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {focus.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pose Characteristics */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-700 mb-3">Characteristics</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('is_bilateral')}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Bilateral (both sides)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('is_peak_pose')}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Peak Pose</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('is_warmup')}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Warm-up Pose</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('is_cooldown')}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Cool-down Pose</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Descriptions */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Descriptions</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Short Description (for previews)
            </label>
            <textarea
              {...register('short_description')}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={2}
              maxLength={300}
              placeholder="Brief description of the pose..."
            />
            <p className="text-sm text-neutral-500 mt-1">{shortDescription?.length || 0}/300</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Full Description
            </label>
            <textarea
              {...register('description')}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Detailed description of the pose..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Breath Cue</label>
            <input
              {...register('breath_cue')}
              placeholder="e.g., Exhale as you press hips up and back"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </Card>

      {/* Benefits */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Benefits</h2>
        <div className="space-y-3">
          {getArrayValue('benefits').map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                placeholder="e.g., Stretches hamstrings and calves"
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="button"
                onClick={() => removeArrayField('benefits', index)}
                className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('benefits')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Benefit
          </button>
        </div>
      </Card>

      {/* Step by Step Instructions */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Step-by-Step Instructions</h2>
        <div className="space-y-3">
          {getArrayValue('step_by_step').map((step, index) => (
            <div key={index} className="flex gap-2">
              <span className="flex items-center justify-center w-8 h-10 bg-primary-100 text-primary-700 rounded-lg font-medium text-sm">
                {index + 1}
              </span>
              <input
                type="text"
                value={step}
                onChange={(e) => handleArrayFieldChange('step_by_step', index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="button"
                onClick={() => removeArrayField('step_by_step', index)}
                className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('step_by_step')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Step
          </button>
        </div>
      </Card>

      {/* Alignment Cues */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Alignment Cues</h2>
        <div className="space-y-3">
          {getArrayValue('alignment_cues').map((cue, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={cue}
                onChange={(e) => handleArrayFieldChange('alignment_cues', index, e.target.value)}
                placeholder="e.g., Press weight evenly through hands"
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="button"
                onClick={() => removeArrayField('alignment_cues', index)}
                className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('alignment_cues')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Alignment Cue
          </button>
        </div>
      </Card>

      {/* Modifications & Variations */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Modifications & Variations</h2>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Modifications</h3>
          <div className="space-y-3">
            {getArrayValue('modifications').map((mod, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={mod}
                  onChange={(e) => handleArrayFieldChange('modifications', index, e.target.value)}
                  placeholder="e.g., Bend knees if hamstrings are tight"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('modifications', index)}
                  className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('modifications')}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Modification
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Variations</h3>
          <div className="space-y-3">
            {getArrayValue('variations').map((variation, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={variation}
                  onChange={(e) => handleArrayFieldChange('variations', index, e.target.value)}
                  placeholder="e.g., Three-legged Dog - lift one leg"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('variations', index)}
                  className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('variations')}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Variation
            </button>
          </div>
        </div>
      </Card>

      {/* Cautions & Contraindications */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Cautions & Contraindications</h2>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Cautions</h3>
          <div className="space-y-3">
            {getArrayValue('cautions').map((caution, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={caution}
                  onChange={(e) => handleArrayFieldChange('cautions', index, e.target.value)}
                  placeholder="e.g., Go easy if you have wrist issues"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('cautions', index)}
                  className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('cautions')}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Caution
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Contraindications (who should avoid)</h3>
          <div className="space-y-3">
            {getArrayValue('contraindications').map((contra, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={contra}
                  onChange={(e) => handleArrayFieldChange('contraindications', index, e.target.value)}
                  placeholder="e.g., High blood pressure"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('contraindications', index)}
                  className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('contraindications')}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Contraindication
            </button>
          </div>
        </div>
      </Card>

      {/* Tags & Equipment */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Tags & Equipment</h2>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {COMMON_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  getArrayValue('tags').includes(tag)
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Equipment Needed</h3>
          <div className="flex flex-wrap gap-2">
            {COMMON_EQUIPMENT.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleEquipment(item)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  getArrayValue('equipment').includes(item)
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Image */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Pose Image</h2>

        <div className="space-y-4">
          {/* Image preview or upload area */}
          {imagePreview ? (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Pose preview"
                className="w-64 h-64 object-cover rounded-xl border border-neutral-200"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
              <ImageIcon className="w-12 h-12 text-neutral-400 mb-2" />
              <span className="text-sm text-neutral-600">Click to upload image</span>
              <span className="text-xs text-neutral-400 mt-1">PNG, JPG up to 5MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Image Alt Text
            </label>
            <input
              {...register('image_alt')}
              placeholder="e.g., Woman performing Downward Facing Dog pose"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </Card>

      {/* SEO */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">SEO</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Meta Title
            </label>
            <input
              {...register('meta_title')}
              placeholder="e.g., Downward Facing Dog (Adho Mukha Svanasana) | FLOW"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              maxLength={70}
            />
            <p className="text-sm text-neutral-500 mt-1">
              {watch('meta_title')?.length || 0}/70
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Meta Description
            </label>
            <textarea
              {...register('meta_description')}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={2}
              maxLength={160}
              placeholder="SEO description for search results..."
            />
            <p className="text-sm text-neutral-500 mt-1">{metaDescription?.length || 0}/160</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Canonical URL (optional)
            </label>
            <input
              {...register('canonical_url')}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </Card>

      {/* Status */}
      <Card variant="default" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Status</h2>
        <div className="flex gap-4">
          {POSE_STATUSES.map((status) => (
            <label
              key={status.value}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors ${
                watchedValues.status === status.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <input
                type="radio"
                {...register('status')}
                value={status.value}
                className="sr-only"
              />
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                {status.label}
              </span>
            </label>
          ))}
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 sticky bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-neutral-200 shadow-lg">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/poses')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting || isUploadingImage}
          leftIcon={isUploadingImage ? <Upload className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        >
          {isUploadingImage ? 'Uploading Image...' : isEditing ? 'Update Pose' : 'Create Pose'}
        </Button>
      </div>
    </form>
  );
}
