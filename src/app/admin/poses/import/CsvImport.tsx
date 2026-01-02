'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui';

interface CsvRow {
  rowNumber: number;
  // Matching fields
  image_original_filename?: string;
  image_filename?: string; // Alias
  slug?: string;
  // Core fields
  english_name?: string;
  sanskrit_name?: string;
  sanskrit_name_simplified?: string;
  pronunciation?: string;
  // Descriptions
  short_description?: string;
  description?: string;
  // Array fields (pipe-separated)
  benefits?: string;
  cautions?: string;
  contraindications?: string;
  step_by_step?: string;
  alignment_cues?: string;
  modifications?: string;
  variations?: string;
  tags?: string;
  equipment?: string;
  secondary_focus?: string;
  // Classification
  difficulty?: string;
  pose_type?: string;
  primary_focus?: string;
  // Timing
  duration_hint_seconds?: string;
  // Boolean flags
  is_peak_pose?: string;
  is_warmup?: string;
  is_cooldown?: string;
  is_bilateral?: string;
  // SEO
  meta_title?: string;
  meta_description?: string;
  image_alt?: string;
  // Status
  status?: string;
  // Validation
  isValid: boolean;
  errors: string[];
  matchType?: 'filename' | 'slug' | 'new';
}

interface ImportResult {
  success: number;
  failed: number;
  updated: number;
  created: number;
  errors: Array<{ row: number; error: string }>;
}

const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const VALID_STATUSES = ['draft', 'published', 'archived'];
const VALID_POSE_TYPES = [
  'standing', 'seated', 'balancing', 'backbend', 'twist', 'inversion',
  'arm_balance', 'hip_opening', 'forward_fold', 'restorative', 'prone', 'supine', 'kneeling',
];
const VALID_BODY_FOCUS = [
  'hips', 'hamstrings', 'shoulders', 'spine', 'core', 'legs',
  'glutes', 'chest', 'neck', 'wrists', 'ankles', 'full_body',
];

export function CsvImport() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<CsvRow[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Detect CSV separator (tab, semicolon, or comma)
  const detectSeparator = (line: string): string => {
    // Count occurrences of potential separators
    const tabCount = (line.match(/\t/g) || []).length;
    const semicolonCount = (line.match(/;/g) || []).length;
    const commaCount = (line.match(/,/g) || []).length;

    // Return the separator with most occurrences
    if (tabCount >= semicolonCount && tabCount >= commaCount && tabCount > 0) return '\t';
    if (semicolonCount >= commaCount && semicolonCount > 0) return ';';
    return ',';
  };

  const parseCsv = (text: string): Record<string, string>[] => {
    const lines = text.split('\n').filter((line) => line.trim());
    if (lines.length < 2) return [];

    // Detect separator from header line
    const separator = detectSeparator(lines[0]);

    // Parse header
    const headerLine = lines[0];
    const headers = parseCSVLine(headerLine, separator);

    // Parse data rows
    const rows: Record<string, string>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i], separator);
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        // Normalize header: lowercase, trim, replace spaces with underscores
        const normalizedHeader = header.trim().toLowerCase().replace(/\s+/g, '_');
        row[normalizedHeader] = values[index]?.trim() || '';
      });
      rows.push(row);
    }

    return rows;
  };

  // Parse a single CSV line, handling quoted values
  const parseCSVLine = (line: string, separator: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === separator && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);

    return result;
  };

  const validateRow = (row: Record<string, string>, rowNumber: number): CsvRow => {
    const errors: string[] = [];

    // Check required fields
    if (!row.english_name?.trim()) {
      errors.push('english_name is required');
    }

    // Get the effective image filename (support both aliases)
    const imageFilename = row.image_original_filename?.trim() || row.image_filename?.trim();

    // Must have either image_original_filename/image_filename or slug for matching
    if (!imageFilename && !row.slug?.trim()) {
      errors.push('Either image_original_filename (or image_filename) or slug is required for matching');
    }

    // Validate difficulty
    if (row.difficulty && !VALID_DIFFICULTIES.includes(row.difficulty.toLowerCase())) {
      errors.push(`Invalid difficulty: ${row.difficulty}`);
    }

    // Validate status
    if (row.status && !VALID_STATUSES.includes(row.status.toLowerCase())) {
      errors.push(`Invalid status: ${row.status}`);
    }

    // Validate pose_type
    if (row.pose_type && !VALID_POSE_TYPES.includes(row.pose_type.toLowerCase())) {
      errors.push(`Invalid pose_type: ${row.pose_type}`);
    }

    // Validate primary_focus
    if (row.primary_focus && !VALID_BODY_FOCUS.includes(row.primary_focus.toLowerCase())) {
      errors.push(`Invalid primary_focus: ${row.primary_focus}`);
    }

    // Validate secondary_focus items (pipe-separated)
    if (row.secondary_focus) {
      const focusItems = row.secondary_focus.split('|').map(s => s.trim()).filter(Boolean);
      for (const item of focusItems) {
        if (!VALID_BODY_FOCUS.includes(item.toLowerCase())) {
          errors.push(`Invalid secondary_focus item: ${item}`);
        }
      }
    }

    // Determine match type
    let matchType: 'filename' | 'slug' | 'new' | undefined;
    if (imageFilename) {
      matchType = 'filename';
    } else if (row.slug?.trim()) {
      matchType = 'slug';
    } else {
      matchType = 'new';
    }

    // Normalize image_filename to image_original_filename
    const normalizedRow = { ...row };
    if (row.image_filename && !row.image_original_filename) {
      normalizedRow.image_original_filename = row.image_filename;
    }

    return {
      rowNumber,
      ...normalizedRow,
      isValid: errors.length === 0,
      errors,
      matchType,
    } as CsvRow;
  };

  const handleFileSelect = async (file: File) => {
    setError(null);
    setImportResult(null);
    setCsvFile(file);
    setIsValidating(true);

    try {
      const text = await file.text();
      const rawRows = parseCsv(text);

      if (rawRows.length === 0) {
        setError('CSV file is empty or has no data rows');
        setParsedRows([]);
        return;
      }

      // Validate rows
      const validatedRows = rawRows.map((row, index) => validateRow(row, index + 2)); // +2 for header row
      setParsedRows(validatedRows);
    } catch (err) {
      setError('Failed to parse CSV file');
      setParsedRows([]);
    } finally {
      setIsValidating(false);
    }
  };

  const handleImport = async () => {
    const validRows = parsedRows.filter((row) => row.isValid);
    if (validRows.length === 0) return;

    setIsImporting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/poses/csv-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: validRows }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Import failed');
      }

      const result: ImportResult = await response.json();
      setImportResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const downloadTemplate = () => {
    const headers = [
      'image_original_filename',
      'slug',
      'english_name',
      'sanskrit_name',
      'sanskrit_name_simplified',
      'pronunciation',
      'short_description',
      'description',
      'benefits',
      'cautions',
      'contraindications',
      'step_by_step',
      'alignment_cues',
      'modifications',
      'variations',
      'tags',
      'equipment',
      'difficulty',
      'pose_type',
      'primary_focus',
      'secondary_focus',
      'duration_hint_seconds',
      'is_peak_pose',
      'is_warmup',
      'is_cooldown',
      'is_bilateral',
      'status',
      'meta_title',
      'meta_description',
      'image_alt',
    ];

    const exampleRow = [
      'downward-dog.jpg',
      'downward-facing-dog',
      'Downward Facing Dog',
      'Adho Mukha Svanasana',
      'Adho Mukha Svanasana',
      'AH-doh MOO-kah shvah-NAHS-anna',
      'A foundational yoga inversion',
      'Full description of the pose...',
      'Stretches hamstrings|Strengthens arms|Calms the mind',
      'Wrist sensitivity|High blood pressure',
      'Carpal tunnel|Late pregnancy',
      'Start on hands and knees|Lift hips up and back|Press heels toward floor',
      'Hands shoulder-width|Feet hip-width|Spine long',
      'Bend knees if needed|Use blocks under hands',
      'Three-legged dog|Puppy pose',
      'Strength|Flexibility|Inversion',
      'Yoga Mat',
      'beginner',
      'standing',
      'hamstrings',
      'shoulders|core',
      '45',
      'false',
      'true',
      'false',
      'true',
      'draft',
      'Downward Facing Dog | FLOW Yoga',
      'Learn the downward facing dog pose with step-by-step instructions',
      'Person performing downward facing dog yoga pose',
    ];

    // Properly escape CSV values
    const escapeCSV = (value: string) => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const csvContent = [
      headers.join(','),
      exampleRow.map(escapeCSV).join(','),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pose-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const validCount = parsedRows.filter((r) => r.isValid).length;
  const invalidCount = parsedRows.filter((r) => !r.isValid).length;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-medium text-blue-900 mb-2">CSV Import Instructions</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>CSV must have a header row with column names</li>
          <li>Required: <code className="bg-blue-100 px-1 rounded">english_name</code></li>
          <li>For matching: <code className="bg-blue-100 px-1 rounded">image_original_filename</code> (or <code className="bg-blue-100 px-1 rounded">image_filename</code>) or <code className="bg-blue-100 px-1 rounded">slug</code></li>
          <li>Pipe-separated arrays: benefits, cautions, contraindications, step_by_step, alignment_cues, modifications, variations, tags, equipment, secondary_focus</li>
          <li>Boolean fields: is_peak_pose, is_warmup, is_cooldown, is_bilateral (use true/false)</li>
          <li>Valid difficulties: beginner, intermediate, advanced</li>
          <li>Valid statuses: draft, published, archived</li>
        </ul>
        <button
          onClick={downloadTemplate}
          className="mt-3 inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900"
        >
          <Download className="w-4 h-4" />
          Download CSV Template
        </button>
      </div>

      {/* File Upload */}
      {!csvFile && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 rounded-xl p-12 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          <FileSpreadsheet className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
          <p className="text-lg font-medium text-neutral-700">
            Click to select CSV file
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            Upload a CSV file with pose metadata
          </p>
        </div>
      )}

      {/* Loading */}
      {isValidating && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          <span className="ml-3 text-neutral-600">Validating CSV...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Preview Table */}
      {parsedRows.length > 0 && !isValidating && !importResult && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-neutral-900">
                Preview ({parsedRows.length} rows)
              </h3>
              <div className="flex gap-4 text-sm mt-1">
                <span className="text-green-600">{validCount} valid</span>
                {invalidCount > 0 && (
                  <span className="text-red-500">{invalidCount} invalid</span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setCsvFile(null);
                setParsedRows([]);
              }}
              className="text-sm text-neutral-500 hover:text-neutral-700"
            >
              Clear & Choose Different File
            </button>
          </div>

          <div className="overflow-x-auto border border-neutral-200 rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">Row</th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">Match By</th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">Filename/Slug</th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">English Name</th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">Difficulty</th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">Pose Type</th>
                  <th className="px-4 py-3 text-left font-medium text-neutral-700">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {parsedRows.slice(0, 50).map((row) => (
                  <tr
                    key={row.rowNumber}
                    className={row.isValid ? '' : 'bg-red-50'}
                  >
                    <td className="px-4 py-3 text-neutral-500">{row.rowNumber}</td>
                    <td className="px-4 py-3">
                      {row.isValid ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        row.matchType === 'filename'
                          ? 'bg-blue-100 text-blue-700'
                          : row.matchType === 'slug'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {row.matchType === 'filename' ? 'Filename' : row.matchType === 'slug' ? 'Slug' : 'New'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-900 max-w-xs truncate">
                      {row.image_original_filename || row.image_filename || row.slug || '-'}
                    </td>
                    <td className="px-4 py-3 text-neutral-900 max-w-xs truncate">
                      {row.english_name || '-'}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 capitalize">
                      {row.difficulty || '-'}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 capitalize">
                      {row.pose_type?.replace('_', ' ') || '-'}
                    </td>
                    <td className="px-4 py-3 text-red-600 text-xs max-w-xs">
                      {row.errors.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {parsedRows.length > 50 && (
              <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-sm text-neutral-500">
                Showing first 50 of {parsedRows.length} rows
              </div>
            )}
          </div>

          {/* Import Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
            <Button
              onClick={handleImport}
              disabled={validCount === 0 || isImporting}
              isLoading={isImporting}
              leftIcon={<Upload className="w-4 h-4" />}
            >
              {isImporting ? 'Importing...' : `Import ${validCount} Valid Rows`}
            </Button>
          </div>
        </div>
      )}

      {/* Import Result */}
      {importResult && (
        <div className="space-y-4">
          <div
            className={`rounded-xl p-6 ${
              importResult.failed === 0
                ? 'bg-green-50 border border-green-200'
                : 'bg-yellow-50 border border-yellow-200'
            }`}
          >
            <div className="flex items-start gap-4">
              {importResult.failed === 0 ? (
                <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              )}
              <div>
                <h3 className="font-medium text-lg text-neutral-900">
                  Import Complete
                </h3>
                <p className="text-neutral-600 mt-1">
                  {importResult.success} poses processed successfully
                  {importResult.updated > 0 && ` (${importResult.updated} updated)`}
                  {importResult.created > 0 && ` (${importResult.created} created)`}
                  {importResult.failed > 0 && `, ${importResult.failed} failed`}
                </p>
                {importResult.errors.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-neutral-700 mb-2">Errors:</p>
                    <ul className="text-sm text-red-600 space-y-1">
                      {importResult.errors.map((err, i) => (
                        <li key={i}>Row {err.row}: {err.error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setCsvFile(null);
                setParsedRows([]);
                setImportResult(null);
              }}
            >
              Import Another File
            </Button>
            <Button
              onClick={() => router.push('/admin/poses')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Go to Poses
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
