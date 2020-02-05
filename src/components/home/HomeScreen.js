import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return (
            <View>
                {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
            </View>
        );
    }
}