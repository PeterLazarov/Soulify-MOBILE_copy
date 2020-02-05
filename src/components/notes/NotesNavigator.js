import React from 'react';
import { Platform } from "react-native";
import { StackNavigator, TabNavigator } from 'react-navigation';
import NotesScreen from './NotesScreen';
import WriteNoteScreen from './WriteNoteScreen';
import HeaderDrawerButton from '../common/HeaderDrawerButton';
import colors from '../../styles/colors';

export default StackNavigator({
    Notes: {
        screen: NotesScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: Platform.OS === 'android' ? < HeaderDrawerButton navigate={navigation.navigate} /> : null,
        }),
    },
    WriteNote: {
        screen: WriteNoteScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.white,
                borderBottomWidth: 0,
                paddingLeft: 5,
                elevation: 0
            }
        }
    }
});