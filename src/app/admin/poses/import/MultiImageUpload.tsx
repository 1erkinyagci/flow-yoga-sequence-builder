'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, CheckCircle, XCircle, Loader2, ImageIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

interface FileUploadState {
  file: File;
  id: string;
  status: 'queued' | 'uploading' | 'success' | 'error';
  error?: string;
  poseId?: string;
}

export function MultiImageUpload() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [batchId, setBatchId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isImage && isValidSize;
    });

    const newFileStates: FileUploadState[] = validFiles.map((file) => ({
      file,
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'queued',
    }));

    setFiles((prev) => [...prev, ...newFileStates]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    const newBatchId = crypto.randomUUID();
    setBatchId(newBatchId);

    for (let i = 0; i < files.length; i++) {
      const fileState = files[i];
      if (fileState.status !== 'queued') continue;

      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) => (f.id === fileState.id ? { ...f, status: 'uploading' } : f))
      );

      try {
        const formData = new FormData();
        formData.append('file', fileState.file);
        formData.append('batchId', newBatchId);

        const response = await fetch('/api/admin/poses/bulk-upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const result = await response.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileState.id
              ? { ...f, status: 'success', poseId: result.poseId }
              : f
          )
        );
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileState.id
              ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
              : f
          )
        );
      }
    }

    setIsUploading(false);
  };

  const successCount = files.filter((f) => f.status === 'success').length;
  const errorCount = files.filter((f) => f.status === 'error').length;
  const queuedCount = files.filter((f) => f.status === 'queued').length;
  const uploadingCount = files.filter((f) => f.status === 'uploading').length;

  const clearCompleted = () => {
    setFiles((prev) => prev.filter((f) => f.status !== 'success'));
  };

  const clearAll = () => {
    setFiles([]);
    setBatchId(null);
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          className="hidden"
        />
        <Upload className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
        <p className="text-lg font-medium text-neutral-700">
          Drop images here or click to select
        </p>
        <p className="text-sm text-neutral-500 mt-2">
          Supports JPG, PNG, WebP, GIF up to 5MB each
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-neutral-900">
              Files ({files.length})
            </h3>
            <div className="flex gap-2">
              {successCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-neutral-500 hover:text-neutral-700"
                >
                  Clear completed
                </button>
              )}
              <button
                onClick={clearAll}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Status Summary */}
          <div className="flex gap-4 text-sm">
            {queuedCount > 0 && (
              <span className="text-neutral-500">{queuedCount} queued</span>
            )}
            {uploadingCount > 0 && (
              <span className="text-blue-500">{uploadingCount} uploading</span>
            )}
            {successCount > 0 && (
              <span className="text-green-600">{successCount} completed</span>
            )}
            {errorCount > 0 && (
              <span className="text-red-500">{errorCount} failed</span>
            )}
          </div>

          {/* File Items */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {files.map((fileState) => (
              <div
                key={fileState.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  fileState.status === 'success'
                    ? 'bg-green-50 border-green-200'
                    : fileState.status === 'error'
                    ? 'bg-red-50 border-red-200'
                    : fileState.status === 'uploading'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                {/* Preview */}
                <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0">
                  {fileState.file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(fileState.file)}
                      alt={fileState.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 m-3 text-neutral-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {fileState.file.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {(fileState.file.size / 1024).toFixed(1)} KB
                  </p>
                  {fileState.error && (
                    <p className="text-xs text-red-600 mt-1">{fileState.error}</p>
                  )}
                </div>

                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {fileState.status === 'queued' && (
                    <button
                      onClick={() => removeFile(fileState.id)}
                      className="p-1 text-neutral-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  {fileState.status === 'uploading' && (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  )}
                  {fileState.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {fileState.status === 'error' && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <div className="text-sm text-neutral-500">
          {files.length === 0
            ? 'Select images to create draft poses'
            : `${queuedCount} files ready to upload`}
        </div>
        <div className="flex gap-3">
          {successCount > 0 && !isUploading && (
            <Button
              variant="outline"
              onClick={() => router.push('/admin/poses?status=draft')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Go to Drafts ({successCount})
            </Button>
          )}
          <Button
            onClick={uploadFiles}
            disabled={queuedCount === 0 || isUploading}
            isLoading={isUploading}
            leftIcon={<Upload className="w-4 h-4" />}
          >
            {isUploading ? 'Uploading...' : `Upload ${queuedCount} Files`}
          </Button>
        </div>
      </div>
    </div>
  );
}
