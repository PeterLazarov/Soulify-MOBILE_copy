import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import RoundedButton from '../common/RoundedButton';
import styles from '../../styles/styles';

export default class StartScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={[styles.screens.layout, styles.screens.introLayout]}>
                {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}

                <Text style={styles.screens.introTitle}>Please take a moment to answers these questions.</Text>

                <View style={styles.screens.separator} />

                <RoundedButton
                    title='Continue'
                    onPress={() => navigate('Question')} />
            </View>
        );
    }
}