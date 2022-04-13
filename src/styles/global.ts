import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    backgroundColor: 'mintcream',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    color: 'dimgray',
    fontWeight: '600',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'tomato',
  },
  btn: {
    borderRadius: 5,
    backgroundColor: 'aliceblue',
    color: 'dimgray',
    paddingHorizontal: 32,
    paddingVertical: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderWidth: 0.2,
    borderColor: 'silver',
  },
  btnPrimary: {
    backgroundColor: 'lightskyblue',
    color: 'snow',
  },
  textLink: {
    color: 'skyblue',
    textDecorationLine: 'underline',
  },
  textError: {
    color: 'tomato',
    fontSize: 12,
    fontWeight: '300',
  },
});

export { globalStyles };
