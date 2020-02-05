import React from 'react';
import { Text, StatusBar, Platform, Keyboard } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HomeNavigator from '../home/HomeNavigator';
import ProfileNavigator from '../profile/ProfileNavigator';
import NotesNavigator from '../notes/NotesNavigator';
import styles from '../../styles/styles';

export default DrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => <Text style={styles.tabs.icon}><FontAwesome color={tintColor}>{Icons.feed}</FontAwesome></Text>
        },
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            drawerLabel: 'Profile',
            drawerIcon: ({ tintColor }) => <Text style={styles.tabs.icon}><FontAwesome color={tintColor}>{Icons.user}</FontAwesome></Text>
        }
    },
    Notes: {
        screen: NotesNavigator,
        navigationOptions: {
            drawerLabel: 'Notes',
            drawerIcon: ({ tintColor }) => <Text style={styles.tabs.icon}><FontAwesome color={tintColor}>{Icons.stickyNote}</FontAwesome></Text>
        }
    }
});