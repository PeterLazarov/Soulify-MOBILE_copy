import React from 'react';
import { View, StatusBar, TextInput, Text, Vibration, Platform } from 'react-native';
import styles from '../../styles/styles';
import colors from '../../styles/colors';
import constants from '../../config/constants';
import settings from '../../config/settings';
import settingsProvider from '../../services/settings-provider';
import http from '../../services/http';
import routeProvider from '../../services/route-provider';
import timezoneProvider from '../../services/timezone-provider';

export default class LoginPasswordScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            passwordInvalid: false,
            helpText: 'Your sign-in password.',
        };
    }

    render() {
        return (
            <View style={[styles.screens.layout, styles.screens.introLayout]}>
                {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}

                <TextInput
                    maxLength={50}
                    autoFocus={true}
                    secureTextEntry={true}
                    style={styles.login.input}
                    underlineColorAndroid='transparent'
                    returnKeyType='go'
                    selectionColor={colors.lightGrey}
                    enablesReturnKeyAutomatically={true}
                    onChangeText={t => this.onPasswordChanged(t)}
                    onSubmitEditing={e => this.onPasswordSubmit(e.nativeEvent.text)} />

                <Text style={styles.login.help}>{this.state.helpText}</Text>
            </View>
        );
    }

    onPasswordChanged(text) {
        if (this.state.passwordInvalid) {
            this.setState({
                helpText: 'Your sign-in password.',
                passwordInvalid: false
            });
        }
    }

    async onPasswordSubmit(text) {
        const { params } = this.props.navigation.state;

        if (text) {
            const result = await http.request(
                `${constants.API_ADDRESS}${constants.API_USERS_LOGIN_ENDPOINT}`,
                'POST', {
                    code: params.code,
                    password: text
                });

            if (result.isOkay && result.data) {
                await this.login(result.data);
            } else if (result.isForbidden) {
                Vibration.vibrate();

                this.setState({
                    helpText: 'You have entered a wrong password.',
                    passwordInvalid: true
                });
            }
        }
    }

    async login(user) {
        const { navigate } = this.props.navigation;

        const result = await http.request(`${constants.API_ADDRESS}${constants.API_PATIENTS_ENDPOINT}/${user.patientId}`);

        settingsProvider.set(settings.ID, user.patientId);
        settingsProvider.set(settings.CODE, user.code);
        settingsProvider.set(settings.FIRST_NAME, result.data.firstName);
        settingsProvider.set(settings.LAST_NAME, result.data.lastName);

        await timezoneProvider.setUserTimezone();

        navigate(await routeProvider.getRoot());
    }
}