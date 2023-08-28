import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingBottom: 15,
    position: 'relative',
    fontWeight: 'bold',
  },

  headerText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputsWrapper: {
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  contentWrapper: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  configWrapper: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: 'white',
    borderTopColor: 'gray',
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
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
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
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  picker: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    position: 'relative'
  },
  textInputExplainerText: {
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'left'
  }
});