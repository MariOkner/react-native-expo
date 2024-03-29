import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#000',
    fontFamily: 'andika-b',
  },
  headerBox: {
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 30,
    flexDirection: 'row',
    borderColor: '#a9a9a9',
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'rubik-b',
  },
  enabledButton: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6c00',
    paddingVertical: 10,
    borderRadius: 50,
  },
  disabledButton: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'rubik-b',
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: 280,
  },
  inputBox: {
    marginTop: 20,
  },
});
