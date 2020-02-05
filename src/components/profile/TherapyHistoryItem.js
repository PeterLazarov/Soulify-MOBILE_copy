import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from '../../styles/styles';
import medicineIntakeType from './medicine-intake-type';
import medicineStatus from './medicine-status';
import colors from '../../styles/colors';

export default class TherapyHistoryItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View onPress style={[styles.profile.therapyDetail, { borderBottomColor: this.getStatusIndicatorColor() }]}>
                    <Text style={styles.profile.therapyDetailMedicineText}>{this.props.data.medicineName}</Text>
                    <Text style={styles.profile.therapyDetailIntakeText}>{this.getPendingIntake()}</Text>
                    <Text style={styles.profile.therapyDetailPastIntakeText}>{this.getPastIntake()}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    getStatusIndicatorColor() {
        const { data } = this.props;
        if (data.medicineStatus === medicineStatus.notTaken) {
            return colors.notTakenMedicine;
        } else if (data.medicineStatus === medicineStatus.missed) {
            return colors.missedMedicine;
        } else if (data.medicineStatus === medicineStatus.skipped) {
            return colors.skippedMedicine;
        } else if (data.medicineStatus === medicineStatus.taken) {
            return colors.takenMedicine;
        }
    }

    getPastIntake() {
        const { data } = this.props;
        if (data.medicineStatus === medicineStatus.notTaken) {
            return 'Not Taken';
        } else if (data.medicineStatus === medicineStatus.missed) {
            return 'Missed';
        } else if (data.medicineStatus === medicineStatus.skipped) {
            return 'Skipped';
        } else if (data.medicineStatus === medicineStatus.taken) {
            return 'Taken';
        }
    }

    getPendingIntake() {
        const { data } = this.props;
        if (data.intakeType === medicineIntakeType.days) {
            return `Every ${data.intakeInterval} days`;
        } else if (data.intakeType === medicineIntakeType.morning) {
            return `${data.intakeQuantity} ${data.intakeQuantityType}/morning`;
        } else if (data.intakeType === medicineIntakeType.noon) {
            return `${data.intakeQuantity} ${data.intakeQuantityType}/noon`;
        } else if (data.intakeType === medicineIntakeType.evening) {
            return `${data.intakeQuantity} ${data.intakeQuantityType}/evening`;
        }
    }
}