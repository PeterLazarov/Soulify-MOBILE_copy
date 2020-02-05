import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RoundedButton from '../common/RoundedButton';
import styles from '../../styles/styles';

export default AnswersList = props => {
    const answers = props.answers.map(a =>
        <RoundedButton
            key={a.id}
            title={a.text}
            style={styles.questionnaire.answersButton}
            onPress={() => props.onPress(a.id)}
            autoDisable={false}
            disabled={props.disabled} />
    );

    return (
        <View style={styles.questionnaire.answersLayout}>
            {answers}
        </View>
    );
}