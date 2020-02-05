import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styles from '../../styles/styles';

export default props => {
    return (
        <TouchableOpacity
            onPress={() => props.navigate('DrawerOpen')}
            style={styles.header.drawerButton}>
            <Text style={[styles.header.icon, props.iconStyle]}>
                <FontAwesome>{Icons.navicon}</FontAwesome>
            </Text>
        </TouchableOpacity>)
}