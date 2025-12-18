import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const MediaUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
      setStatusMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');
    setStatusMessage('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('media_assets')
        .insert([
          {
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            file_type: file.type,
            public_url: publicUrl,
          },
        ]);

      if (dbError) {
        throw dbError;
      }

      setUploadStatus('success');
      setStatusMessage(`Successfully uploaded ${file.name}`);
      setFile(null);

      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Upload className="w-6 h-6 mr-2" />
        Media Upload
      </h3>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="file-input"
            className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-all inline-flex items-center justify-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            Choose File
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleChange}
            className="hidden"
            accept="image/*,video/*,audio/*"
          />
        </div>

        {file && (
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-gray-300 text-sm">Selected file:</p>
            <p className="text-white font-medium">{file.name}</p>
            <p className="text-gray-400 text-sm">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Upload
            </>
          )}
        </button>

        {uploadStatus === 'success' && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-green-300 text-sm">{statusMessage}</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{statusMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
