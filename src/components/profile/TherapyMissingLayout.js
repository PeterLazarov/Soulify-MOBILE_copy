import React from 'react';
import { View, Text, Image, TouchableOpacity, SectionList, StatusBar } from 'react-native';
import styles from '../../styles/styles';

export default TherapyMissingLayout = props => {
    return (
        <View style={[styles.screens.layout, styles.screens.introLayout]}>
            <Text style={styles.screens.introTitle}>Contact your doctor in order to begin a treatment.</Text>
        </View>
    );
};