import { StyleSheet, Platform } from 'react-native';
import colors from './colors';

export default {
    tabs: StyleSheet.create({
        icon: {
            fontSize: 22,
        },
    }),

    buttons: StyleSheet.create({
        rounded: {
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            paddingVertical: 15,
            width: '70%',
            borderColor: colors.white,
            borderRadius: 10,
        },
        roundedText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.accent,
        }
    }),

    header: StyleSheet.create({
        icon: {
            color: colors.black,
            fontSize: 20,
        },
        rightButton: {
            marginRight: 15
        },
        leftButton: {
            marginLeft: 10
        },
        drawerButton: {
            marginLeft: 25
        }
    }),

    screens: StyleSheet.create({
        layout: {
            flex: 1,
            flexDirection: 'column',
        },
        introLayout: {
            backgroundColor: colors.accent,
            alignItems: 'center'
        },
        introTitle: {
            marginTop: '45%',
            fontSize: 26,
            color: colors.white,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingHorizontal: 10
        },
        separator: {
            flex: .85,
            alignSelf: 'stretch'
        },
    }),

    login: StyleSheet.create({
        input: {
            color: colors.white,
            marginTop: '50%',
            fontSize: 30,
            alignSelf: 'flex-start',
            paddingHorizontal: 15,
            paddingVertical: 5,
            width: '100%',
            borderWidth: 0
        },

        help: {
            fontSize: 18,
            color: colors.white,
            alignSelf: 'flex-start',
            paddingHorizontal: 15,
        },

        logo: {
            marginTop: '35%',
            width: '100%',
            height: '30%'
        },
    }),

    notes: StyleSheet.create({
        layout: {
            backgroundColor: colors.white
        },
        titleInput: {
            fontSize: 22,
            padding: 15,
            width: '100%',
            fontWeight: 'bold',
            textAlignVertical: 'top'
        },
        contentInput: {
            fontSize: 18,
            padding: 15,
            width: '100%',
            textAlignVertical: 'top'
        },
        item: {
            padding: 15,
            backgroundColor: colors.white,
        },
        itemTitle: {
            fontWeight: 'bold',
            fontSize: 18,
            paddingBottom: 5
        },
        itemContent: {
            fontSize: 14
        },
        itemDate: {
            fontSize: 12,
            paddingTop: 10,
            color: colors.darkGrey
        },
        separator: {
            height: 1,
            backgroundColor: colors.lightGrey
        }
    }),

    questionnaire: StyleSheet.create({
        questionTitle: {
            height: 100,
        },
        answersLayout: {
            flexDirection: 'column',
            width: '100%'
        },
        answersButton: {
            marginVertical: 5,
            paddingVertical: 10
        },
        progress: {
            width: '100%',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0
        }
    }),

    profile: StyleSheet.create({
        treatmentStartButton: {
            marginTop: '15%'
        },
        therapySectionHeader: {
            marginTop: 20,
            marginBottom: 10,
            fontSize: 15,
            textAlign: 'center'
        },
        therapyDetail: {
            backgroundColor: colors.white,
            padding: 15,
            borderBottomWidth: 2
        },
        therapyDetailMedicineText: {
            fontWeight: 'bold',
            fontSize: 18,
            paddingBottom: 5
        },
        therapyDetailIntakeText: {
            fontSize: 14,
            paddingBottom: 10
        },
        therapyDetailPastIntakeText: {
            fontSize: 12,
            color: colors.darkGrey
        },
    }),

    medicineFeedback: StyleSheet.create({
        layout: {
            paddingTop: 40
        },
        ratingContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
        },
        ratingSlider: {
            width: '100%',
            marginBottom: 5
        },
        ratingText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.lightGrey
        },
        ratingsContinueButton: {
            marginBottom: 40
        },
        remarksSendButton: {
            marginBottom: 10
        },
        remarksInput: {
            textAlignVertical: 'top',
            color: colors.white,
            marginTop: Platform.select({
                ios: 30,
                android: 0
            }),
            fontSize: 22,
            padding: 15,
            width: '100%',
        },
        remarksAvoidingLayout: {
            width: '100%',
            flex: 1
        }
    })
};