import React from 'react';
import { View, TextInput, Keyboard, Dimensions, Platform, BackHandler } from 'react-native';
import { Icons } from 'react-native-fontawesome';
import HeaderLeftButton from '../common/HeaderLeftButton';
import styles from '../../styles/styles';
import colors from '../../styles/colors';
import constants from '../../config/constants';
import http from '../../services/http';
import settings from '../../config/settings';
import settingsProvider from '../../services/settings-provider';
import HeaderRightButton from '../common/HeaderRightButton';

export default class WriteNoteScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldTitle: 'New note',
            title: 'New note',
            oldContent: '',
            content: '',
            contentHeight: '100%'
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerRight: params.noteId ? <HeaderRightButton onPress={() => params.onDelete()} icon={Icons.trashO} /> : null,
            headerLeft: <HeaderLeftButton onPress={() => params.onBack()} icon={Icons.chevronLeft} />
        }
    };

    componentWillMount() {
        const { params } = this.props.navigation.state;

        this.props.navigation.setParams({
            onDelete: this.onDeletePressed.bind(this),
            onBack: this.onBackPressed.bind(this)
        });

        if (Platform.OS === 'ios') {
            Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
            Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
        }

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPressed.bind(this));
        }

        if (params.noteId) {
            this.setState({
                oldTitle: params.title,
                title: params.title,
                oldContent: params.content,
                content: params.content
            });
        }
    }

    render() {
        return (
            <View style={[styles.screens.layout, styles.notes.layout]}>
                <TextInput
                    value={this.state.title}
                    maxLength={constants.NOTE_TITLE_LENGTH}
                    multiline={true}
                    placeholder='Title'
                    selectionColor={colors.selectionColor}
                    underlineColorAndroid='transparent'
                    autoGrow={true}
                    onChangeText={t => this.onTitleChange(t)}
                    style={styles.notes.titleInput} />

                <TextInput
                    value={this.state.content}
                    autoFocus={true}
                    maxLength={constants.NOTE_CONTENT_LENGTH}
                    placeholder='Note'
                    multiline={true}
                    selectionColor={colors.selectionColor}
                    underlineColorAndroid='transparent'
                    autoGrow={true}
                    blurOnSubmit={false}
                    onChangeText={t => this.onContentChange(t)}
                    style={[styles.notes.contentInput, {
                        height: this.state.contentHeight
                    }]} />
            </View>
        );
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed.bind(this));
        }
    }

    async onDeletePressed() {
        const { params } = this.props.navigation.state;

        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_NOTES_ENDPOINT}/${params.noteId}`, 'DELETE');

        if (result.isOkay) {
            await params.onNoteDeleted();
            this.props.navigation.goBack();
        }
    }

    async onBackPressed() {
        const { params } = this.props.navigation.state;

        if (this.noteChanged()) {
            if (params.noteId) {
                await this.updateNote(params.noteId);
            } else {
                await this.createNote();
            }
        } else {
            this.props.navigation.goBack();
        }
    }

    noteChanged() {
        return (this.state.title !== this.state.oldTitle) || (this.state.content != this.state.oldContent);
    }

    async createNote() {
        const { params } = this.props.navigation.state;

        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_NOTES_ENDPOINT}`,
            'POST', {
                title: this.state.title,
                content: this.state.content,
                patientId: await settingsProvider.get(settings.ID)
            });

        if (result.isCreated) {
            await params.onNoteAdded();
            this.props.navigation.goBack();
            this.props.navigation.goBack();
        }
    }

    async updateNote(id) {
        const { params } = this.props.navigation.state;

        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_NOTES_ENDPOINT}/${id}`,
            'PUT', {
                title: this.state.title,
                content: this.state.content,
                patientId: await settingsProvider.get(settings.ID)
            });

        if (result.isOkay) {
            await params.onNoteEdited();
            this.props.navigation.goBack();
        }
    }

    onTitleChange(text) {
        this.setState({
            title: text
        });
    }

    onContentChange(text) {
        this.setState({
            content: text
        });
    }

    keyboardWillShow(e) {
        const { height, width } = Dimensions.get('window');

        // TODO: remove magic number
        this.setState({
            contentHeight: height - e.endCoordinates.height - 110
        })
    }

    keyboardWillHide(e) {
        // TODO: also fix height on disappearing
    }
}