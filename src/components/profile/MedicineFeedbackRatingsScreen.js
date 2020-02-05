import React from 'react';
import { View, BackHandler, Platform } from 'react-native';
import MedicineFeedbackSlider from './MedicineFeedbackSlider';
import medicineFeedbackType from './medicine-feedback-type';
import RoundedButton from '../common/RoundedButton';
import styles from '../../styles/styles';
import http from '../../services/http';
import constants from '../../config/constants';
import medicineStatus from './medicine-status';

export default class MedicineFeedbackRatingsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moodRating: 5,
            sleepRating: 5,
            appetiteRating: 5,
            muscleFatigueRating: 5,
            dizzinessRating: 5,
        };
    }

    componentWillMount() {
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
            <View style={[styles.screens.layout, styles.screens.introLayout, styles.medicineFeedback.layout]}>
                <MedicineFeedbackSlider
                    text='Mood'
                    rating={this.state.moodRating}
                    onRatingChange={rating => this.setState({
                        moodRating: rating
                    })} />
                <MedicineFeedbackSlider
                    text='Sleep'
                    rating={this.state.sleepRating}
                    onRatingChange={rating => this.setState({
                        sleepRating: rating
                    })} />
                <MedicineFeedbackSlider
                    text='Appetite'
                    rating={this.state.appetiteRating}
                    onRatingChange={rating => this.setState({
                        appetiteRating: rating
                    })} />
                <MedicineFeedbackSlider
                    text='Muscle Fatigue'
                    rating={this.state.muscleFatigueRating}
                    onRatingChange={rating => this.setState({
                        muscleFatigueRating: rating
                    })} />
                <MedicineFeedbackSlider
                    text='Dizziness'
                    rating={this.state.dizzinessRating}
                    onRatingChange={rating => this.setState({
                        dizzinessRating: rating
                    })} />

                <View style={styles.screens.separator} />

                <RoundedButton
                    onPress={this.onContinueButtonPressed.bind(this)}
                    style={styles.medicineFeedback.ratingsContinueButton}
                    title='Continue' />
            </View>
        );
    }

    onBackPressed() {
        return true; // disable going back
    }

    async onContinueButtonPressed() {
        const { params } = this.props.navigation.state;

        const medicineFeedback = [{
            type: medicineFeedbackType.mood,
            rating: this.state.moodRating
        }, {
            type: medicineFeedbackType.sleep,
            rating: this.state.sleepRating
        }, {
            type: medicineFeedbackType.appetite,
            rating: this.state.appetiteRating
        }, {
            type: medicineFeedbackType.muscleFatigue,
            rating: this.state.muscleFatigueRating
        }, {
            type: medicineFeedbackType.dizziness,
            rating: this.state.dizzinessRating
        }];

        let result = await http.request(
            `${constants.API_ADDRESS}${constants.API_THERAPY_HISTORIES_ENDPOINT}/${params.therapyHistoryId}`);

        const therapyHistory = {
            ...result.data,
            medicineFeedback
        };

        // mark the medicine as taken
        therapyHistory.medicineStatus = medicineStatus.taken;

        result = await http.request(
            `${constants.API_ADDRESS}${constants.API_THERAPY_HISTORIES_ENDPOINT}/${therapyHistory.id}`,
            'PUT',
            therapyHistory);

        this.props.navigation.navigate('MedicineFeedbackRemarks', {
            therapyHistoryId: therapyHistory.id
        });
    }
}