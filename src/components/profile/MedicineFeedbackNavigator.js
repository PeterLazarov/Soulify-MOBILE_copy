import { StackNavigator, TabNavigator } from 'react-navigation';
import MedicineFeedbackStartScreen from './MedicineFeedbackStartScreen';
import MedicineFeedbackRatingsScreen from './MedicineFeedbackRatingsScreen';
import MedicineFeedbackRemarksScreen from './MedicineFeedbackRemarksScreen';

export default StackNavigator({
    Start: {
        screen: MedicineFeedbackStartScreen,
    },
    MedicineFeedbackRatings: {
        screen: MedicineFeedbackRatingsScreen
    },
    MedicineFeedbackRemarks: {
        screen: MedicineFeedbackRemarksScreen
    }
}, {
        mode: 'modal',
        headerMode: 'none'
    });