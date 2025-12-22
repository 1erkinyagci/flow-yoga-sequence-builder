'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Images, FileSpreadsheet } from 'lucide-react';
import { MultiImageUpload } from './MultiImageUpload';
import { CsvImport } from './CsvImport';

type TabType = 'images' | 'csv';

export default function ImportPage() {
  const [activeTab, setActiveTab] = useState<TabType>('images');

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/admin/poses"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Poses
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900">Bulk Import</h1>
        <p className="text-neutral-600">
          Upload multiple images or import metadata from CSV
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="flex border-b border-neutral-200">
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'images'
                ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <Images className="w-5 h-5" />
            Multi Image Upload
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'csv'
                ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5" />
            CSV Import (Metadata)
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'images' && <MultiImageUpload />}
          {activeTab === 'csv' && <CsvImport />}
        </div>
      </div>
    </div>
  );
}
