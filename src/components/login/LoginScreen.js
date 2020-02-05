import React from 'react';
import { View, StatusBar, Image, Platform } from 'react-native';
import RoundedButton from '../common/RoundedButton';
import styles from '../../styles/styles';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonVisible: false
        };
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={[styles.screens.layout, styles.screens.introLayout]}>
                {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}

                <Image
                    onLoad={this.onLogoLoad.bind(this)}
                    style={styles.login.logo}
                    source={require('../../images/logo.png')} />

                <View style={styles.screens.separator} />

                {this.state.buttonVisible &&
                    <RoundedButton
                        title='Continue'
                        onPress={() => navigate('Code')} />}
            </View >
        );
    }

    onLogoLoad() {
        this.setState({
            buttonVisible: true
        });
    }
}