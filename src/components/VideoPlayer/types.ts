import { VideoContentFit } from "expo-video";

// types/videoPlayer.ts
export interface VideoSource {
    uri: string;
    headers?: { [key: string]: string };
}

export interface VideoPlayerStatus {
    isPlaying: boolean;
    isBuffering: boolean;
    isMuted: boolean;
    position: number;
    duration: number;
    isLoaded: boolean;
    
}

export interface VideoPlayerProps {
    source: VideoSource;
    style?: any;
    resizeMode?: VideoContentFit
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    onPlaybackStatusUpdate?: (status: VideoPlayerStatus) => void;
    showControls?: boolean;
}

export interface ControlsProps {
    status: VideoPlayerStatus;
    onPlayPause: () => void;
    onSeek: (position: number) => void;
    onToggleMute: () => void;
    onToggleFullscreen: () => void;
    onToggleControls: () => void;
    isLoading:boolean
}

export interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (position: number) => void;
}

export interface TimeDisplayProps {
    currentTime: number;
    duration: number;
}

export interface ErrorViewProps {
    error: any;
    onRetry: () => void;
}