import { VideoContentFit } from 'expo-video';

export interface VideoPlayerProps {
    source: any;
    style?: any;
    resizeMode?: VideoContentFit;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    onPlaybackStatusUpdate?: (status: VideoPlayerStatus) => void;
    showControls?: boolean;
}

export interface VideoPlayerStatus {
    isPlaying: boolean;
    isBuffering: boolean;
    isMuted: boolean;
    position: number;
    duration: number;
    isLoaded: boolean;
}

export interface PlayerControlsProps {
    status: VideoPlayerStatus;
    onPlayPause: () => void;
    onSeek: (position: number) => void;
    onToggleMute: () => void;
    onToggleFullscreen: () => void;
    isLoading: boolean;
}

export interface PlayerErrorProps {
    error: any;
    onRetry: () => void;
}
