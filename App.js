import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, Image, Text, View,Video } from 'react-native';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import Setup from './src/boot/setup';

const bootSplashLogo = require('./assets/logo.png');
const DELAY=0;


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheVideos(videos) {
  return videos.map(video => {
      return Asset.fromModule(video).downloadAsync();

  });
}



const apiCall = (delay) => new Promise(resolve => setTimeout(resolve, delay));

class App extends React.Component {
  state = { loading: true };
  opacity;

  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide(); // Instruct SplashScreen not to hide ye
    this.cacheResourcesAsync() // ask for resources
      .then(() => this.setState({ loading: false })) // mark loading as done
      .catch(error => console.error(`Unexpected error thrown when loading: ${error.stack}`));
    SplashScreen.hide();
  }

  render() {
    if (this.state.loading) {
      return (
        <Animated.View style={[styles.bootSplash]}>
          <Animated.Image source={bootSplashLogo} fadeDuration={10} style={[styles.logo]}/>
          <View style={[styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff"/>
            <Text style={styles.text}>Loading</Text>
          </View>
        </Animated.View>
      );
    }
    return (
      <Setup/>
    );
  }
  async cacheResourcesAsync() {
    const imageAssets = cacheImages([
      require('./assets/background_app.jpg'),
      require('./assets/logo_with_text.png'),
      require('./assets/poster.jpg'),
      ]);
    const videoAssets =cacheVideos([
      require('./assets/back.mp4'),
      require('./assets/congrats.mp3'),
      require('./assets/done.mp3'),
    ]);
    const fonts=Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      GochiHand: require('./assets/fonts/GochiHand_Regular.ttf')
    });
    return Promise.all([...imageAssets,fonts,videoAssets,apiCall(DELAY*1000)]);
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(109,109,109,0.52)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 20,
    lineHeight: 30,
    color: '#333',
    textAlign: 'center',
  },
  bootSplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(109,109,109,0.52)',
  },
  logo: {
    height: 400,
    width: 200,
  },
});
export default App;
