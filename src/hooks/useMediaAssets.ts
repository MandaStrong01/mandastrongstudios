import { useState, useEffect } from 'react';
import {
  getUserAssets,
  uploadFile,
  deleteAsset,
  getSignedUrl,
  MediaAsset,
  UploadProgress
} from '../lib/storage';

export function useMediaAssets(type?: 'video' | 'audio' | 'image') {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await getUserAssets(type);
      setAssets(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, [type]);

  const upload = async (file: File): Promise<MediaAsset> => {
    setUploading(true);
    setUploadProgress({
      fileName: file.name,
      progress: 0,
      status: 'uploading'
    });

    try {
      const asset = await uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });

      setAssets(prev => [asset, ...prev]);
      setUploadProgress(null);
      return asset;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const remove = async (assetId: string) => {
    try {
      await deleteAsset(assetId);
      setAssets(prev => prev.filter(a => a.id !== assetId));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const getUrl = async (asset: MediaAsset): Promise<string> => {
    const bucket = asset.type === 'video' ? 'videos' :
                   asset.type === 'audio' ? 'audio' : 'images';
    return getSignedUrl(asset.file_path, bucket);
  };

  return {
    assets,
    loading,
    error,
    uploading,
    uploadProgress,
    upload,
    remove,
    getUrl,
    refresh: loadAssets
  };
}
