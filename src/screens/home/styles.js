const React = require('react-native');
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 18,
    marginBottom: 30
  },
  logo: {
    position: 'absolute',
    left: Platform.OS === 'android' ? 20 : 40,
    top: Platform.OS === 'android' ? 15 : 60,
    width: 350,
    height: 200
  },
  text: {
    color: '#ffffff',
    bottom: 6,
    marginTop: Platform.OS === 'android' ? 20 : 5,
    fontSize: Platform.OS === 'android' ? 20 : 26,
  },
  textButton: {
    bottom: 6,
    marginTop: Platform.OS === 'android' ? 8 : 1,
    fontSize: Platform.OS === 'android' ? 20 : 26,
  },
};
