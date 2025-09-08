import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const PlayerLoading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default PlayerLoading;
