import { Platform } from "react-native";

export default {
    accent: '#0081BA',
    white: '#FFFFFF',
    black: '#000000',
    lightGrey: '#D3D3D3',
    darkGrey: '#505050',
    invalid: '#FF0000',

    textSelection: Platform.OS === 'ios' ? '#000000' : null,

    missedMedicine: '#CD853F',
    skippedMedicine: '#FF4500',
    takenMedicine: '#3CB371',
    notTakenMedicine: '#0081BA',

    medicineFeedbackRatingMaximum: Platform.OS === 'ios' ? '#FFFFFF' : '#66CDAA',
    medicineFeedbackRatingMinimum: Platform.OS === 'ios' ? '#66CDAA' : '#FFFFFF'
}