import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles';

export default class RoundedButton extends React.Component {
    constructor(props) {
        super(props);

        let autoDisable = props.autoDisable;
        if (autoDisable === undefined) {
            autoDisable = true;
        }

        this.state = {
            disabled: props.disabled,
            autoDisable
        };
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.buttons.rounded, this.props.style]}
                onPress={this.onPress.bind(this)}
                disabled={this.state.disabled}>
                <Text style={styles.buttons.roundedText}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }

    onPress() {
        if (this.state.autoDisable) {
            this.setState({
                disabled: true
            });
        }

        this.props.onPress();
    }
}