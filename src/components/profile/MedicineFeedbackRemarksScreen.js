import React from 'react';
import { View, BackHandler, Dimensions, Platform, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native';
import RoundedButton from '../common/RoundedButton';
import colors from '../../styles/colors';
import constants from '../../config/constants';
import styles from '../../styles/styles';
import http from '../../services/http';

export default class MedicineFeedbackRemarksScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            remarks: '',
            inputHeight: Platform.OS === 'ios' ? '100%' : '45%'
        };
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
            Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
        }

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPressed.bind(this));
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed.bind(this));
        }
    }

    render() {
        return (
            <View style={[styles.screens.layout, styles.screens.introLayout]}>
                <KeyboardAvoidingView behavior='padding' style={styles.medicineFeedback.remarksAvoidingLayout}>
                    <TextInput
                        value={this.state.remarks}
                        autoFocus={true}
                        maxLength={constants.MEDICINE_FEEDBACK_LENGTH}
                        placeholder='Additional remarks (optional)'
                        multiline={true}
                        onChangeText={text => this.setState({
                            remarks: text
                        })}
                        blurOnSubmit={false}
                        selectionColor={colors.textSelection}
                        underlineColorAndroid='transparent'
                        autoGrow={true}
                        style={[styles.medicineFeedback.remarksInput, { height: this.state.inputHeight }]} />

                    <View style={styles.screens.separator} />

                    <RoundedButton
                        style={styles.medicineFeedback.remarksSendButton}
                        title='Send'
                        onPress={this.onSendButtonPressed.bind(this)} />
                </KeyboardAvoidingView>
            </View>
        );
    }

    onBackPressed() {
        return true; // disable going back
    }

    keyboardWillShow(e) {
        const { height, width } = Dimensions.get('window');

        // TODO: remove magic number
        this.setState({
            inputHeight: height - e.endCoordinates.height - 90
        })
    }

    keyboardWillHide(e) {
        // TODO: also fix height on disappearing
    }

    async onSendButtonPressed() {
        const { params } = this.props.navigation.state;

        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_THERAPY_HISTORIES_ENDPOINT}/${params.therapyHistoryId}`);

        const therapyHistory = {
            ...result.data,
            medicineFeedbackRemarks: this.state.remarks
        };

        await http.request(
            `${constants.API_ADDRESS}${constants.API_THERAPY_HISTORIES_ENDPOINT}/${therapyHistory.id}`,
            'PUT',
            therapyHistory);

        Keyboard.dismiss();
        this.props.navigation.navigate('SignedIn');
    }
}