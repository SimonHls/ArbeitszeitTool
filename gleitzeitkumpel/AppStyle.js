import { StyleSheet } from 'react-native'
import { useColorScheme } from 'react-native';

export const useDynamicStyles = () => {
  const colorScheme = useColorScheme();

  const fontColor = colorScheme === 'dark' ? 'white' : 'black';
  const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  const wrapperBackgroundColor = colorScheme === 'dark' ? '#161618' : 'white';
  const sectionBorderColor = colorScheme === 'dark' ? '#818181' : 'lightGray';

  return StyleSheet.create({
    applicationWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: backgroundColor,
    },
    header: {
      marginTop: 35,
      paddingTop: 15,
      paddingBottom: 15,
      position: 'relative',
      fontWeight: 'bold',
    },

    headerText: {
      fontSize: 32,
      color: fontColor,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    inputsWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: sectionBorderColor,
      padding: 10,
      marginBottom: 10,
    },
    contentWrapper: {
      backgroundColor: wrapperBackgroundColor,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: 10,
      padding: 10,
      borderColor: fontColor,
      borderRadius: 10,
    },
    configWrapper: {
      backgroundColor: wrapperBackgroundColor,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: 10,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderColor: sectionBorderColor,
      borderRadius: 10,
      borderWidth: 1,
    },
    resultsWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    result: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    resultText: {
      flex: 1,
      marginRight: 10,
      color: fontColor,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'right',
      flexWrap: 'wrap',
    },
    resultTextValue: {
      marginTop: 5,
      fontSize: 18,
      minWidth: 120,
      fontWeight: 'normal',
      textAlign: 'center',
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: 'gold',
      color : 'black',
      borderRadius: 10,
      overflow: 'hidden', // add overflow property
    },
    adaptiveResultTextValue: {
      marginTop: 5,
      fontSize: 18,
      minWidth: 120,
      fontWeight: 'normal',
      textAlign: 'center',
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: 'gold',
      color : 'black',
      borderRadius: 10,
      overflow: 'hidden',
    },
    TextInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginTop: 5,
      marginBottom: 10,
      borderRadius: 10,
      color: fontColor,
    },
    inputText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: fontColor,
      textAlign: 'left'
    },
    picker: {
      flexDirection: 'row',
      marginTop: 10,
      paddingBottom: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateTimePicker: {
      transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
    },
    miniHeader: {
      paddingTop: 10,
      paddingBottom: 10,
      color: fontColor,
      fontWeight: 'bold',
      fontSize: 18,
      position: 'relative'
    },
    textInputExplainerText: {
      fontSize: 12,
      fontWeight: 'medium',
      color: fontColor,
      textAlign: 'center'
    },
    icon: {
      color: fontColor, // set the color based on the color scheme
      fontSize: 24,
      marginRight: 10,
    },
  });
}