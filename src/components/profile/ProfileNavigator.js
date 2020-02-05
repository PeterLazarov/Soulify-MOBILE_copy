import { StackNavigator, TabNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

export default StackNavigator({
    Profile: {
        screen: ProfileScreen
    },
    Settings: {
        screen: SettingsScreen
    }
});