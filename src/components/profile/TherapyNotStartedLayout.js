import React from 'react';
import { View, Text } from 'react-native';
import RoundedButton from '../common/RoundedButton';
import styles from '../../styles/styles';

export default TherapyNotStartedLayout = props => {
    return (
        <View style={[styles.screens.layout, styles.screens.introLayout]}>
            <Text style={styles.screens.introTitle}>Your treatment is ready to begin.</Text>

            <RoundedButton
                title='Begin'
                style={styles.profile.treatmentStartButton}
                onPress={props.onStart} />
        </View>
    );
};