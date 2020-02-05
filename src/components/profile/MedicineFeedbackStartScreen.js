import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import RoundedButton from '../common/RoundedButton';
import http from '../../services/http';
import styles from '../../styles/styles';
import constants from '../../config/constants';
import medicineStatus from './medicine-status';

export default class MedicineFeedbackStartScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allowFeedback: false
        };
    }

    async componentWillMount() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_THERAPY_HISTORIES_ENDPOINT}/${params.therapyHistoryId}`);

        if (result.data.medicineStatus === medicineStatus.notTaken || result.data.medicineStatus === medicineStatus.missed) {
            this.setState({
                allowFeedback: true
            });
        } else {
            navigate('SignedIn');
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        if (this.state.allowFeedback) {
            return (
                <View style={[styles.screens.layout, styles.screens.introLayout]}>
                    {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}

                    <Text style={styles.screens.introTitle}>Please take a moment to tell us how you feel.</Text>

                    <View style={styles.screens.separator} />

                    <RoundedButton
                        title='Continue'
                        onPress={() => navigate('MedicineFeedbackRatings', {
                            therapyHistoryId: params.therapyHistoryId
                        })} />
                </View>
            );
        } else {
            return <View></View>;
        }
    }
}