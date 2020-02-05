import React from 'react';
import { View, Text, BackHandler, Platform } from 'react-native';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import styles from '../../styles/styles';
import http from '../../services/http';
import colors from '../../styles/colors';
import constants from '../../config/constants';
import settingsProvider from "../../services/settings-provider";
import settings from "../../config/settings";
import AnswersList from './AnswersList';

export default class QuestionScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionnaire: [],
            answers: [],
            progress: 0,
            answersDisabled: true,
            currentQuestion: '',
        };
    }

    async componentDidMount() {
        const id = await settingsProvider.get(settings.ID);
        const result = await http.request(`${constants.API_ADDRESS}${constants.API_QUESTIONNAIRE_LOAD_ENDPOINT}/${id}`);

        this.setState({
            patientId: id,
            currentQuestion: _.first(result.data.questions).text,
            questions: result.data.questions,
            answers: result.data.answers,
            questionsCount: result.data.questions.length,
            answersDisabled: false
        });

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
                <Text style={[
                    styles.screens.introTitle,
                    styles.questionnaire.questionTitle]}>
                    {this.state.currentQuestion}
                </Text>

                <AnswersList
                    answers={this.state.answers}
                    disabled={this.state.answersDisabled}
                    onPress={this.onAnswerPress.bind(this)} />

                <Progress.Bar
                    style={styles.questionnaire.progress}
                    progress={this.state.progress}
                    color={colors.white}
                    borderWidth={0}
                    width={null}
                    height={3}
                    unfilledColor={colors.accent} />
            </View>
        );
    }

    onBackPressed() {
        return true; // disable going back
    }

    async onAnswerPress(id) {
        const currentQuestion = _.first(this.state.questions);
        const remainingQuestions = _.drop(this.state.questions);
        const currentQuestionOrder = this.state.questionsCount - remainingQuestions.length;
        const newQuestion = _.first(remainingQuestions);
        const questionnaire = [].concat(this.state.questionnaire, [{
            questionId: currentQuestion.id,
            answerId: id
        }]);

        if (newQuestion) {
            this.showNextQuestion({
                currentQuestion,
                currentQuestionOrder,
                newQuestion,
                remainingQuestions,
                questionnaire
            });
        } else {
            await this.saveQuestionnaire(questionnaire);
        }
    }

    showNextQuestion(values) {
        this.setState({
            currentQuestion: values.newQuestion.text,
            questions: values.remainingQuestions,
            questionnaire: values.questionnaire,
            progress: parseFloat((values.currentQuestionOrder / this.state.questionsCount).toFixed(2)),
        });
    }

    async saveQuestionnaire(questionnaire) {
        const { navigate } = this.props.navigation;

        await http.request(
            `${constants.API_ADDRESS}${constants.API_QUESTIONNAIRES_ENDPOINT}`,
            'POST',
            {
                patientId: this.state.patientId,
                questionAnswers: questionnaire
            });

        navigate('SignedIn');
    }
}