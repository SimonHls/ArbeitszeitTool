import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  contentWrapper: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
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
    marginBottom: 10
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
    fontSize: 14,
    position: 'relative'
  },
  textInputExplainerText: {
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'left'
  }
});