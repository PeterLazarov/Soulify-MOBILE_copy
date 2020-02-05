import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Icons } from 'react-native-fontawesome';
import HeaderRightButton from '../common/HeaderRightButton';
import HeaderDrawerButton from '../common/HeaderDrawerButton';
import TherapyMissingLayout from './TherapyMissingLayout';
import TherapyNotStartedLayout from './TherapyNotStartedLayout';
import TherapyStartedLayout from './TherapyStartedLayout';
import colors from '../../styles/colors';
import http from '../../services/http';
import constants from '../../config/constants';
import settingsProvider from '../../services/settings-provider';
import settings from '../../config/settings';

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            therapyMissing: false
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        const hideHeader = params && params.hideHeader;

        return {
            title: hideHeader ? '' : 'Profile',
            headerStyle: hideHeader ? {
                backgroundColor: colors.accent,
                borderBottomWidth: 0,
                elevation: 0
            } : null,
            headerLeft: Platform.OS === 'android' ? < HeaderDrawerButton iconStyle={{ color: hideHeader ? colors.white : colors.black }} navigate={navigation.navigate} /> : null,
            headerRight: hideHeader ? null : <HeaderRightButton icon={Icons.cog} onPress={() => navigation.navigate('Settings')} />
        };
    };

    async componentWillMount() {
        const { params } = this.props.navigation.state;

        const id = await settingsProvider.get(settings.ID);
        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_THERAPY_BY_PATIENT_ENDPOINT}/${id}`);

        await this.setTherapy(result);
    }

    render() {
        if (this.state.therapy) {
            if (!this.state.therapy.startedAt) {
                return <TherapyNotStartedLayout onStart={this.onTherapyStart.bind(this)} />;
            } else {
                return <TherapyStartedLayout therapy={this.state.therapy} />;
            }
        } else if (this.state.therapyMissing) {
            return <TherapyMissingLayout />;
        } else {
            return <View></View>;
        }
    }

    async onTherapyStart() {
        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_THERAPY_BEGIN_ENDPOINT}`,
            'POST', {
                id: this.state.therapy.id
            });

        await this.setTherapy(result);

        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('default');
        }
    }

    async setTherapy(result) {
        let hasTherapy = false;

        if (result.isOkay) {
            await settingsProvider.set(settings.THERAPY_ID, result.data.id);

            this.setState({
                therapy: result.data
            });

            if (result.data.startedAt) {
                hasTherapy = true;
            }
        } else {
            this.setState({
                therapyMissing: true
            });
        }

        this.props.navigation.setParams({
            hideHeader: !hasTherapy
        });

        await settingsProvider.set(settings.HAS_STARTED_THERAPY, hasTherapy);
    }
}