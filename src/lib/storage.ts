import { supabase } from './supabase';

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export interface MediaAsset {
  id: string;
  user_id: string;
  project_id?: string;
  name: string;
  type: 'video' | 'audio' | 'image' | 'text';
  file_path: string;
  file_size: number;
  duration?: number;
  width?: number;
  height?: number;
  ai_generated: boolean;
  ai_tool_name?: string;
  ai_prompt?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  timeline_data: {
    video: MediaAsset[];
    audio: MediaAsset[];
    text: any[];
  };
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface RenderJob {
  id: string;
  user_id: string;
  project_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  quality: 'hd' | '4k' | '8k';
  format: 'mp4' | 'mov' | 'webm';
  output_path?: string;
  progress: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

function getBucketForFileType(file: File): string {
  const type = file.type;
  if (type.startsWith('video/')) return 'videos';
  if (type.startsWith('audio/')) return 'audio';
  if (type.startsWith('image/')) return 'images';
  throw new Error('Unsupported file type');
}

function getAssetType(file: File): 'video' | 'audio' | 'image' {
  const type = file.type;
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type.startsWith('image/')) return 'image';
  throw new Error('Unsupported file type');
}

async function getVideoDimensions(file: File): Promise<{ width: number; height: number; duration: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: Math.floor(video.duration)
      });
    };

    video.onerror = () => {
      window.URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video metadata'));
    };

    video.src = URL.createObjectURL(file);
  });
}

async function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = document.createElement('audio');
    audio.preload = 'metadata';

    audio.onloadedmetadata = () => {
      window.URL.revokeObjectURL(audio.src);
      resolve(Math.floor(audio.duration));
    };

    audio.onerror = () => {
      window.URL.revokeObjectURL(audio.src);
      reject(new Error('Failed to load audio metadata'));
    };

    audio.src = URL.createObjectURL(file);
  });
}

async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      window.URL.revokeObjectURL(img.src);
      resolve({
        width: img.width,
        height: img.height
      });
    };

    img.onerror = () => {
      window.URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export async function uploadFile(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<MediaAsset> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const bucket = getBucketForFileType(file);
    const assetType = getAssetType(file);
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `${user.id}/${fileName}`;

    onProgress?.({
      fileName: file.name,
      progress: 0,
      status: 'uploading'
    });

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    onProgress?.({
      fileName: file.name,
      progress: 50,
      status: 'processing'
    });

    let metadata: any = {};
    let duration: number | undefined;
    let width: number | undefined;
    let height: number | undefined;

    if (assetType === 'video') {
      const dims = await getVideoDimensions(file);
      width = dims.width;
      height = dims.height;
      duration = dims.duration;
    } else if (assetType === 'audio') {
      duration = await getAudioDuration(file);
    } else if (assetType === 'image') {
      const dims = await getImageDimensions(file);
      width = dims.width;
      height = dims.height;
    }

    const { data: assetData, error: assetError } = await supabase
      .from('media_assets')
      .insert({
        user_id: user.id,
        name: file.name,
        type: assetType,
        file_path: uploadData.path,
        file_size: file.size,
        duration,
        width,
        height,
        ai_generated: false,
        metadata
      })
      .select()
      .single();

    if (assetError) throw assetError;

    onProgress?.({
      fileName: file.name,
      progress: 100,
      status: 'complete'
    });

    return assetData;
  } catch (error: any) {
    onProgress?.({
      fileName: file.name,
      progress: 0,
      status: 'error',
      error: error.message
    });
    throw error;
  }
}

export async function getAssetUrl(filePath: string, bucket: string): Promise<string> {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function getSignedUrl(filePath: string, bucket: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, 3600);

  if (error) throw error;
  return data.signedUrl;
}

export async function getUserAssets(type?: 'video' | 'audio' | 'image'): Promise<MediaAsset[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  let query = supabase
    .from('media_assets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function deleteAsset(assetId: string): Promise<void> {
  const { data: asset, error: fetchError } = await supabase
    .from('media_assets')
    .select('file_path, type')
    .eq('id', assetId)
    .single();

  if (fetchError) throw fetchError;

  const bucket = asset.type === 'video' ? 'videos' :
                 asset.type === 'audio' ? 'audio' : 'images';

  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([asset.file_path]);

  if (storageError) throw storageError;

  const { error: dbError } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', assetId);

  if (dbError) throw dbError;
}

export async function createProject(name: string, description?: string): Promise<Project> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name,
      description: description || ''
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProjects(): Promise<Project[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateProject(
  projectId: string,
  updates: Partial<Pick<Project, 'name' | 'description' | 'timeline_data' | 'duration'>>
): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(projectId: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) throw error;
}

export async function createRenderJob(
  projectId: string,
  quality: 'hd' | '4k' | '8k',
  format: 'mp4' | 'mov' | 'webm'
): Promise<RenderJob> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('render_jobs')
    .insert({
      user_id: user.id,
      project_id: projectId,
      quality,
      format,
      status: 'pending',
      progress: 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRenderJobs(projectId?: string): Promise<RenderJob[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  let query = supabase
    .from('render_jobs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (projectId) {
    query = query.eq('project_id', projectId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createAIGeneratedAsset(
  toolName: string,
  prompt: string,
  type: 'video' | 'audio' | 'image',
  file: File
): Promise<MediaAsset> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const bucket = type === 'video' ? 'videos' :
                 type === 'audio' ? 'audio' : 'images';

  const timestamp = Date.now();
  const fileName = `ai-${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const filePath = `${user.id}/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  let duration: number | undefined;
  let width: number | undefined;
  let height: number | undefined;

  if (type === 'video') {
    const dims = await getVideoDimensions(file);
    width = dims.width;
    height = dims.height;
    duration = dims.duration;
  } else if (type === 'audio') {
    duration = await getAudioDuration(file);
  } else if (type === 'image') {
    const dims = await getImageDimensions(file);
    width = dims.width;
    height = dims.height;
  }

  const { data: assetData, error: assetError } = await supabase
    .from('media_assets')
    .insert({
      user_id: user.id,
      name: file.name,
      type,
      file_path: uploadData.path,
      file_size: file.size,
      duration,
      width,
      height,
      ai_generated: true,
      ai_tool_name: toolName,
      ai_prompt: prompt,
      metadata: { generated_at: new Date().toISOString() }
    })
    .select()
    .single();

  if (assetError) throw assetError;
  return assetData;
}
