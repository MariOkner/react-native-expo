import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  input: {
    borderWidth: 2,
    borderColor: '#a9a9a9',
    paddingVertical: 8,
    paddingLeft: 10,
    borderRadius: 50,
    color: '#000000',
    backgroundColor: '#f0f8ff',
    opacity: 0.8,
  },
  navText: {
    marginTop: 20,
    marginBottom: 20,
  },
  activeText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
  },
  staticText: {
    color: '#0000cd',
    textAlign: 'center',
    fontSize: 16,
  },
});
