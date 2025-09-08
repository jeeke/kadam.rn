import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppPressable from '../../ui/AppPressable/AppPressable';
import { PlayerErrorProps } from '../types';

const PlayerError: React.FC<PlayerErrorProps> = ({
    error,
    onRetry
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Error: {error?.message || 'An unknown error occurred.'}</Text>
            <AppPressable onPress={onRetry} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Retry</Text>
            </AppPressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PlayerError;
