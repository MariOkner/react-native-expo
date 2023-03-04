import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainBox: {
    padding: 15,
  },
  postBox: {
    width: 350,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 20,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: 'andika-b',
  },
  postDescriptionBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  postDescriptionButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  descriptionTextPadding: {
    paddingLeft: 2,
  },
  input: {
    textAlignVertical: 'top',
    paddingVertical: 10,
    fontSize: 18,
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
  },
});
