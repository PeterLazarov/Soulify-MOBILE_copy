import React from 'react';
import { View, Text, Image, FlatList, Alert } from 'react-native';
import { Icons } from 'react-native-fontawesome';
import HeaderRightButton from '../common/HeaderRightButton';
import styles from '../../styles/styles';
import NoteItem from './NoteItem';
import http from '../../services/http';
import constants from '../../config/constants';
import settingsProvider from '../../services/settings-provider';
import settings from '../../config/settings';

export default class NotesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: 'Notes',
            headerRight: <HeaderRightButton
                onPress={() => navigation.navigate('WriteNote', {
                    noteId: null,
                    onNoteAdded: params.onNoteAdded
                })}
                icon={Icons.pencil} />,
        }
    };

    async componentDidMount() {
        this.props.navigation.setParams({
            onNoteAdded: this.onNoteAdded.bind(this)
        });

        await this.readNotes();
    }

    render() {
        return (
            <View style={styles.screens.layout}>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.data}
                    renderItem={i => <NoteItem
                        onPress={this.onNotePressed.bind(this, i.item)}
                        title={i.item.title}
                        content={i.item.content}
                        date={i.item.createdAt} />}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        );
    }

    renderSeparator() {
        return <View style={styles.notes.separator} />;
    }

    async readNotes() {
        const id = await settingsProvider.get(settings.ID);
        const result = await http.request(`${constants.API_ADDRESS}${constants.API_NOTES_BY_PATIENT_ENDPOINT}/${id}`);

        if (result.isOkay) {
            this.setState({
                data: result.data
            });
        }
    }

    async onNoteAdded() {
        await this.readNotes();
    }

    async onNoteEdited() {
        await this.readNotes();
    }

    async onNoteDeleted() {
        await this.readNotes();
    }

    onNotePressed(note) {
        const { navigate } = this.props.navigation;
        navigate('WriteNote', {
            noteId: note.id,
            title: note.title,
            content: note.content,
            onNoteEdited: this.onNoteEdited.bind(this),
            onNoteDeleted: this.onNoteDeleted.bind(this)
        });
    }
}