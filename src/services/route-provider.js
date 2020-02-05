import { StackNavigator } from 'react-navigation';
import SignedInNavigator from '../components/login/SignedInNavigator';
import SignedOutNavigator from '../components/login/SignedOutNavigator';
import QuestionnaireNavigator from '../components/questionnaire/QuestionnaireNavigator';
import MedicineFeedbackNavigator from '../components/profile/MedicineFeedbackNavigator';
import settingsProvider from "./settings-provider";
import settings from "../config/settings";
import http from './http';
import constants from '../config/constants';

export default {
    async getRoot() {
        let route = 'SignedOut';

        const code = await settingsProvider.get(settings.CODE);
        if (code) {
            const id = await settingsProvider.get(settings.ID);
            const result = await http.request(`${constants.API_ADDRESS}${constants.API_QUESTIONNAIRE_REQUIRED_ENDPOINT}/${id}`);

            if (result.data.required) {
                route = 'Questionnaire';
            } else {
                route = 'SignedIn';
            }
        }

        return route;
    },

    getAppNavigator(initialRouteName, initialRouteParams) {
        return StackNavigator({
            SignedIn: {
                screen: SignedInNavigator,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOutNavigator,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            Questionnaire: {
                screen: QuestionnaireNavigator,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            MedicineFeedback: {
                screen: MedicineFeedbackNavigator,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        }, {
                headerMode: "none",
                mode: "modal",
                initialRouteName: initialRouteName,
                initialRouteParams: initialRouteParams
            });
    }
}