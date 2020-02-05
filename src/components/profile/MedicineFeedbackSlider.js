import React from 'react';
import { TouchableHighlight, Text, View, Slider } from 'react-native';
import moment from 'moment';
import styles from '../../styles/styles';
import colors from '../../styles/colors';

export default class MedicineFeedbackSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: props.rating
        };
    }

    render() {
        return (
            <View style={styles.medicineFeedback.ratingContainer}>
                <Slider
                    style={styles.medicineFeedback.ratingSlider}
                    value={this.state.rating}
                    onValueChange={this.props.onRatingChange}
                    step={1}
                    maximumValue={10}
                    minimumValue={0}
                    thumbTintColor={colors.white}
                    maximumTrackTintColor={colors.medicineFeedbackRatingMaximum}
                    minimumTrackTintColor={colors.medicineFeedbackRatingMinimum} />

                <Text style={styles.medicineFeedback.ratingText}>{this.props.text}</Text>
            </View>
        );
    }
}