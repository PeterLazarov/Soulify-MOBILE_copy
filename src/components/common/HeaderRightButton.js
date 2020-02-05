import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styles from '../../styles/styles';

export default HeaderRightButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.header.rightButton}>
            <Text style={[styles.header.icon, props.style]}>
                <FontAwesome>{props.icon}</FontAwesome>
            </Text>
        </TouchableOpacity>)
}