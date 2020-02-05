import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import styles from '../../styles/styles';

export default TherapyHistorySectionHeader = props => {
    return (
        <View>
            <Text style={styles.profile.therapySectionHeader}>
                {
                    moment(props.date).isSame(moment(), 'day') ?
                        'Today' :
                        moment(props.date).format('dddd, D MMMM')
                }
            </Text>
        </View>
    );
};