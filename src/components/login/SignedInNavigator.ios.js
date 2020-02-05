import React from 'react';
import { Text, StatusBar, Platform, Keyboard } from 'react-native';
import { TabNavigator } from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HomeNavigator from '../home/HomeNavigator';
import ProfileNavigator from '../profile/ProfileNavigator';
import NotesNavigator from '../notes/NotesNavigator';
import colors from '../../styles/colors';
import styles from '../../styles/styles';
import settingsProvider from '../../services/settings-provider';
import settings from '../../config/settings';

async function onTabPress({ jumpToIndex, scene }) {
    if (Platform.OS === 'ios') {
        // this changes bar color on iOS if therapy is not started
        const hasTherapy = await settingsProvider.get(settings.HAS_STARTED_THERAPY);
        if (!hasTherapy) {
            if (scene.index !== 1) {
                StatusBar.setBarStyle('default');
            } else {
                StatusBar.setBarStyle('light-content');
            }
        }
    }

    jumpToIndex(scene.index);
}

export default TabNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Text style={styles.tabs.icon}><FontAwesome color={tintColor}>{Icons.feed}</FontAwesome></Text>
        },
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Text style={styles.tabs.icon}><FontAwesome color={tintColor}>{Icons.user}</FontAwesome></Text>
        },
    },
    Notes: {
        screen: NotesNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Text style={styles.tabs.icon}><FontAwesome color={tintColor}>{Icons.stickyNote}</FontAwesome></Text>
        },
    }
}, {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: colors.accent,
            showLabel: false,
        },
        navigationOptions: () => ({
            tabBarOnPress: onTabPress
        }),
    });