import React, { Component } from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Header,
  Icon,
  Left,
  Picker,
  Text,
  Title,
} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import styles from './styles';
import supportedLanguages from './supportedLanguages';
import SpeechToText from 'speech-to-text';

class VoiceRecognition extends Component {
  state = {
    error: '',
    interimText: '',
    finalisedText: [],
    listening: false,
    language: 'en-US',
  };

  onAnythingSaid = text => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = text => {
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: '',
    });
  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language,
      );
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {
      console.log('Error');
      console.log(err);
      this.setState({
        finalisedText: [err.toString(), ...this.state.finalisedText],
        interimText: '',
      });
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };

  onValueChange(value) {
    this.setState({
      language: value,
    });
  }

  render() {
    const {
      error,
      interimText,
      finalisedText,
      listening,
      language,
    } = this.state;
    if (error) {
      return (
        <Text>
          {error}
        </Text>
      );
    } else {
      let buttonForListening;
      if (listening) {
        buttonForListening = (
          <Button color="primary" onPress={() => this.stopListening()}>
            <Text>
              Stop Listening
            </Text>
          </Button>
        );
      } else {
        buttonForListening = (
          <Button color="primary"
                  onPress={() => this.startListening()}
                  variant="contained">
            <Text>
              Start Listening
            </Text>
          </Button>
        );
      }
      return (
        <Container style={styles.container}>
          <Header>
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon name="ios-menu"/>
              </Button>
            </Left>
            <Body style={{
              flex: 1,
              justifyContent: 'center',
            }}>
              <Title style={styles.text}>Audio comprehension</Title>
            </Body>
          </Header>

          <Content padder>
            <Text>
              Status: {listening ? 'listening...' : 'finished listening'}
            </Text>

            {buttonForListening}
            <Form>
              <Text>
                What language are you going to speak in?
              </Text>

              <Picker mode="dropdown"
                      style={{ width: undefined }}
                      placeholder="Select your language"
                      selectedValue={language}
                      onValueChange={this.onValueChange.bind(this)}
                      enabled={!listening}
              >
                {supportedLanguages.map(language => (
                  <Picker.Item label={language[0]} value={language[1]} key={language[1]}/>
                ))}
              </Picker>

            </Form>
            <Text>
              Current text:
            </Text>
            <Text>
              {interimText}
            </Text>
            <Text>
              Final Text:
            </Text>
            <Grid>
              {finalisedText.map((str, index) => {
                return (
                  <Row key={index}>
                    <Text>
                      {str}
                    </Text>
                  </Row>
                );
              })}
            </Grid>
          </Content>

          <Footer>
            <FooterTab>
              <Body>
                <Text style={styles.text}>By Text to speech</Text>
              </Body>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}

export default VoiceRecognition;
