import { StackNavigator, TabNavigator } from 'react-navigation';
import StartScreen from './StartScreen';
import QuestionScreen from './QuestionScreen';

export default StackNavigator({
    Start: {
        screen: StartScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    Question: {
        screen: QuestionScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    }
}, {
        mode: 'modal',
        headerMode: 'none'
    });