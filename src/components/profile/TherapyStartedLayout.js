import React from 'react';
import { View, Alert, SectionList } from 'react-native';
import { withNavigation } from 'react-navigation';
import TherapyHistorySectionHeader from './TherapyHistorySectionHeader';
import TherapyHistoryItem from './TherapyHistoryItem';
import styles from '../../styles/styles';
import http from '../../services/http';
import constants from '../../config/constants';
import settingsProvider from '../../services/settings-provider';
import settings from '../../config/settings';
import medicineStatus from './medicine-status';

class TherapyStartedLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        const therapyId = await settingsProvider.get(settings.THERAPY_ID);
        const result = await http.request(`${constants.API_ADDRESS}${constants.API_THERAPY_HISTORY_ENDPOINT}/${therapyId}`);

        this.setState({
            data: result.data.periods
        });
    }

    render() {
        return (
            <View style={styles.screens.layout}>
                <SectionList
                    stickySectionHeadersEnabled={false}
                    style={styles.profile.therapyHistoryList}
                    renderSectionHeader={({ section }) => <TherapyHistorySectionHeader date={section.key} />}
                    renderItem={({ item }) => <TherapyHistoryItem onPress={this.onItemPressed.bind(this, item)} data={item} />}
                    sections={this.state.data}
                    keyExtractor={(item, index) => item.id} />
            </View>
        );
    }

    onItemPressed(item) {
        const { navigate } = this.props.navigation;

        if (item.medicineStatus === medicineStatus.taken) {
            Alert.alert('You have already taken this medicine.');
        } else if (item.medicineStatus === medicineStatus.skipped) {
            Alert.alert('You have decided to skip taking this medicine. Please, contact your doctor.');
        } else if (item.medicineStatus === medicineStatus.missed) {
            navigate('MedicineFeedback', {
                therapyHistoryId: item.id
            });
        } else if (item.medicineStatus === medicineStatus.notTaken) {
            if (item.isPatientInIntakePeriod) {
                navigate('MedicineFeedback', {
                    therapyHistoryId: item.id
                });
            } else {
                Alert.alert('It is too early for this medicine to be taken.');
            }
        }
    }
}

export default withNavigation(TherapyStartedLayout);