import React from 'react';
import { View, Alert } from 'react-native';
import { Icons } from 'react-native-fontawesome';
import HeaderLeftButton from '../common/HeaderLeftButton';
import HeaderRightButton from '../common/HeaderRightButton';
import styles from '../../styles/styles';
import settingProvider from '../../services/settings-provider';

export default class SettingsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Settings',
            headerLeft: <HeaderLeftButton onPress={() => params.onBack()} icon={Icons.chevronLeft} />,
            headerRight: <HeaderRightButton onPress={() => params.logOut()} icon={Icons.signOut} />
        }
    };

    componentWillMount() {
        this.props.navigation.setParams({
            onBack: this.onBackPressed.bind(this),
            logOut: this.logOut.bind(this)
        });
    }

    render() {
        return (
            <View style={styles.screens.layout}>
            </View>
        );
    }

    onBackPressed() {
        this.props.navigation.goBack();
    }

    logOut() {
        Alert.alert(
            'Sign out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await settingProvider.flush();
                        this.props.navigation.navigate('SignedOut');
                    }
                },
            ], {
                cancelable: false
            }
        )
    }
}