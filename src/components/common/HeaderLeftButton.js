import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styles from '../../styles/styles';

export default HeaderLeftButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.header.leftButton}>
            <Text style={styles.header.icon}>
                <FontAwesome>{props.icon}</FontAwesome>
            </Text>
        </TouchableOpacity>)
}