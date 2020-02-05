import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import moment from 'moment';
import styles from '../../styles/styles';

export default NoteItem = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={styles.notes.item}>
                {props.title ? <Text style={styles.notes.itemTitle}>{props.title.trim()}</Text> : null}
                {props.content ? <Text style={styles.notes.itemContent}>{props.content.trim()}</Text> : null}
                <Text style={styles.notes.itemDate}>
                    {
                        moment(props.date).isSame(moment(), 'day') ?
                            moment(props.date).format('[Today], HH:mm') :
                            moment(props.date).format('D MMMM, HH:mm')
                    }
                </Text>
            </View>
        </TouchableHighlight>
    );
}