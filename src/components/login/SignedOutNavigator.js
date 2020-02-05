import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Button } from 'react-native';
import Login from '../login/LoginScreen';
import LoginCodeScreen from '../login/LoginCodeScreen';
import LoginPasswordScreen from '../login/LoginPasswordScreen';
import colors from '../../styles/colors';
import styles from '../../styles/styles';

export default StackNavigator({
    Main: {
        screen: Login,
        navigationOptions: {
        }
    },
    Code: {
        screen: LoginCodeScreen,
        navigationOptions: {
        }
    },
    Password: {
        screen: LoginPasswordScreen
    }
}, {
        mode: 'modal',
        headerMode: 'none'
    });