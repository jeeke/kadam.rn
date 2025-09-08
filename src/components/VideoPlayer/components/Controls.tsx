// components/VideoPlayer/Controls.tsx
import { screenHeight, screenWidth } from '@/src/utils/resizing';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import AppPressable from '../../ui/AppPressable/AppPressable';
import { ControlsProps } from '../types';



const Controls: React.FC<ControlsProps> = ({
    status,
    onPlayPause,
    isLoading,
    onSeek,
    onToggleMute,
    onToggleFullscreen,
}) => {

    return <AppPressable  center onPress={onPlayPause} style={[{ zIndex: 2, alignSelf:"center", position:"absolute", top: screenHeight/2, left: (screenWidth/2) - (25), backgroundColor:'rgba(0,0,0,0.5)', height: 70, width: 70, borderRadius: 35 }]} >
       {isLoading ? <ActivityIndicator size={20} color={'#fff'} /> : <Ionicons
            name={status.isPlaying ? 'pause' : 'play'}
            size={30}
            color="white"
        />}
    </AppPressable>

    //   return (
    //     <View style={styles.controlsContainer}>


    //       <View style={styles.controls}>
    //         {/* <ProgressBar
    //           currentTime={status.position || 0}
    //           duration={status.duration || 0}
    //           onSeek={onSeek}
    //         /> */}

    //         <View style={styles.bottomControls}>
    //           <View style={styles.leftControls}>
    //             <TouchableOpacity onPress={onPlayPause} style={styles.controlButton}>
    //               <Ionicons
    //                 name={status.isPlaying ? 'pause' : 'play'}
    //                 size={24}
    //                 color="white"
    //               />
    //             </TouchableOpacity>

    //             <TimeDisplay
    //               currentTime={status.position}
    //               duration={status.duration}
    //             />
    //           </View>

    //           <View style={styles.rightControls}>
    //             <TouchableOpacity onPress={onToggleMute} style={styles.controlButton}>
    //               <Ionicons
    //                 name={status.isMuted ? 'volume-mute' : 'volume-medium'}
    //                 size={24}
    //                 color="white"
    //               />
    //             </TouchableOpacity>

    //             <TouchableOpacity onPress={onToggleFullscreen} style={styles.controlButton}>
    //               <Ionicons name="expand" size={24} color="white" />
    //             </TouchableOpacity>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   );
};

const styles = StyleSheet.create({
    controlsContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        zIndex: 2
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    controls: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 16,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    leftControls: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        padding: 8,
        marginHorizontal: 4,
    },
});

export default Controls;