import React from 'react';
import { View, StatusBar, Platform, TextInput, Text, Vibration } from 'react-native';
import styles from '../../styles/styles';
import colors from '../../styles/colors';
import constants from '../../config/constants';
import http from '../../services/http';

export default class LoginCodeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            helpText: 'Your 10-digit sign-in code.',
            codeInvalid: false
        };
    }

    render() {
        return (
            <View style={[styles.screens.layout, styles.screens.introLayout]}>
                {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}

                <TextInput
                    keyboardType='numeric'
                    maxLength={10}
                    autoFocus={true}
                    selectionColor={colors.lightGrey}
                    style={styles.login.input}
                    underlineColorAndroid='transparent'
                    onChangeText={t => this.onCodeChanged(t)} />

                <Text style={styles.login.help}>{this.state.helpText}</Text>
            </View>
        );
    }

    async onCodeChanged(text) {
        const { navigate } = this.props.navigation;

        // TODO: include validation for the code (digits only)
        if (this.state.codeInvalid) {
            // reset to normal
            this.setState({
                helpText: 'Your 10-digit sign-in code.',
                codeInvalid: false
            });
        } else if (text && text.length === 10) {
            const result = await http.request(`${constants.API_ADDRESS}${constants.API_PATIENT_BY_CODE_ENDPOINT}/${text}`);

            if (result.isOkay && result.data) {
                navigate('Password', {
                    code: text
                });
            } else if (result.isNotFound) {
                Vibration.vibrate();

                this.setState({
                    helpText: 'You have entered a wrong sign-in code.',
                    codeInvalid: true
                });
            }
        }
    }
}