import React from 'react';
import { Platform } from "react-native";
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import HeaderDrawerButton from '../common/HeaderDrawerButton';

export default StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: Platform.OS === 'android' ? < HeaderDrawerButton navigate={navigation.navigate} /> : null,
        }),
    },
});