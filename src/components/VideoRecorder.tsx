import { useState, useRef, useEffect } from 'react';
import { Video, Square, Pause, Play, Download, Upload, Trash2, Monitor, Camera, Mic, MicOff, Loader2 } from 'lucide-react';

interface VideoRecorderProps {
  onRecordingComplete?: (blob: Blob, filename: string) => void;
  onUploadToLibrary?: (file: File) => void;
}

export default function VideoRecorder({ onRecordingComplete, onUploadToLibrary }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingMode, setRecordingMode] = useState<'camera' | 'screen'>('camera');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [stream, previewUrl]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1920, height: 1080 },
        audio: audioEnabled
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const startScreen = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: 1920, height: 1080 },
        audio: false
      });

      let audioStream = null;
      if (audioEnabled) {
        try {
          audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (err) {
          console.log('Could not get audio:', err);
        }
      }

      const combinedStream = new MediaStream([
        ...displayStream.getVideoTracks(),
        ...(audioStream ? audioStream.getAudioTracks() : [])
      ]);

      setStream(combinedStream);
      if (videoRef.current) {
        videoRef.current.srcObject = combinedStream;
      }
    } catch (err) {
      console.error('Error accessing screen:', err);
      alert('Screen recording cancelled or not supported.');
    }
  };

  const startRecording = async () => {
    if (recordingMode === 'camera') {
      await startCamera();
    } else {
      await startScreen();
    }

    if (!stream && videoRef.current?.srcObject) {
      const currentStream = videoRef.current.srcObject as MediaStream;
      setStream(currentStream);
    }

    const mediaStream = videoRef.current?.srcObject as MediaStream;
    if (!mediaStream) return;

    const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options.mimeType = 'video/webm';
    }

    const mediaRecorder = new MediaRecorder(mediaStream, options);
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      if (onRecordingComplete) {
        const filename = `recording-${Date.now()}.webm`;
        onRecordingComplete(blob, filename);
      }

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    mediaRecorder.start(100);
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    setRecordingTime(0);

    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recording-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const uploadRecording = async () => {
    if (recordedBlob && onUploadToLibrary) {
      setIsUploading(true);
      const file = new File([recordedBlob], `recording-${Date.now()}.webm`, { type: 'video/webm' });

      await new Promise(resolve => setTimeout(resolve, 1000));

      onUploadToLibrary(file);
      setIsUploading(false);
      alert('Recording uploaded to Media Library!');
    }
  };

  const discardRecording = () => {
    setRecordedBlob(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-3 rounded-xl">
            <Video className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Video Recorder</h2>
            <p className="text-zinc-400 text-sm">Record from camera or screen</p>
          </div>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full" />
            <span className="text-white font-bold">{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>

      {!isRecording && !recordedBlob && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => setRecordingMode('camera')}
            className={`flex items-center justify-center gap-3 p-6 rounded-xl border-2 transition ${
              recordingMode === 'camera'
                ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <Camera size={28} />
            <span className="font-bold">Camera</span>
          </button>

          <button
            onClick={() => setRecordingMode('screen')}
            className={`flex items-center justify-center gap-3 p-6 rounded-xl border-2 transition ${
              recordingMode === 'screen'
                ? 'border-green-500 bg-green-500/20 text-green-400'
                : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <Monitor size={28} />
            <span className="font-bold">Screen</span>
          </button>
        </div>
      )}

      {!isRecording && !recordedBlob && (
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={`mb-6 w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition ${
            audioEnabled
              ? 'border-purple-500 bg-purple-500/20 text-purple-400'
              : 'border-zinc-700 bg-zinc-800/50 text-zinc-400'
          }`}
        >
          {audioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
          <span className="font-bold">{audioEnabled ? 'Audio Enabled' : 'Audio Disabled'}</span>
        </button>
      )}

      <div className="bg-black rounded-xl overflow-hidden mb-6">
        {!recordedBlob ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full aspect-video bg-zinc-900"
          />
        ) : (
          <video
            ref={previewVideoRef}
            src={previewUrl || undefined}
            controls
            className="w-full aspect-video bg-zinc-900"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {!isRecording && !recordedBlob && (
          <button
            onClick={startRecording}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg"
          >
            <Video size={20} />
            Start Recording
          </button>
        )}

        {isRecording && (
          <>
            <button
              onClick={pauseRecording}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>

            <button
              onClick={stopRecording}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg"
            >
              <Square size={20} />
              Stop Recording
            </button>
          </>
        )}

        {recordedBlob && (
          <>
            <button
              onClick={downloadRecording}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg"
            >
              <Download size={20} />
              Download
            </button>

            <button
              onClick={uploadRecording}
              disabled={isUploading}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload to Library
                </>
              )}
            </button>

            <button
              onClick={discardRecording}
              className="flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg"
            >
              <Trash2 size={20} />
              Discard
            </button>

            <button
              onClick={() => {
                discardRecording();
                setRecordedBlob(null);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg"
            >
              <Video size={20} />
              New Recording
            </button>
          </>
        )}
      </div>

      {recordedBlob && (
        <div className="mt-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Recording Duration:</span>
            <span className="text-white font-bold">{formatTime(recordingTime)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-zinc-400">File Size:</span>
            <span className="text-white font-bold">{(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-zinc-400">Format:</span>
            <span className="text-white font-bold">WebM</span>
          </div>
        </div>
      )}
    </div>
  );
}
