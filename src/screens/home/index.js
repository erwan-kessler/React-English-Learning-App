import React, { Component } from 'react';
import { ImageBackground, View, StatusBar } from 'react-native';
import { Container, Button, H3, Text, Header, Left, Icon } from 'native-base';

import styles from './styles';
import { setUserData } from '../../utils/user';

const launchScreenBG = require('../../../assets/background_app.jpg');
const launchScreenLogo = require('../../../assets/logo_with_text.png');
class Home extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu"/>
            </Button>
          </Left>
        </Header>
        <ImageBackground source={launchScreenBG} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchScreenLogo} style={styles.logo}/>
          </View>
          <View style={{
            alignItems: 'center',
            marginBottom: 50,
            backgroundColor: '#6d6d6d',
          }}
          >
            <H3 style={styles.text}>Welcome to Audio-W</H3>
            <View style={{ marginTop: 8 }}/>
            <H3 style={styles.text}>It's time to learn !</H3>
            <View style={{ marginTop: 8 }}/>
          </View>
          <View style={{ marginBottom: 80}}>
            <Button
              style={{
                backgroundColor: '#6FAF98',
                alignSelf: 'center'
              }}
              onPress={() => {
                this.props.navigation.openDrawer();
                setUserData("reset", true).then();
              }}
              title={'Start a New Game!'}>
              <Text style={styles.textButton}>Start a New Game!</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
