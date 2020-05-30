import React, { Component } from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  Title,
} from 'native-base';
import styles from './styles';
import { Asset } from 'expo-asset';

import * as Speech from 'expo-speech';
const random = require('fast-random');
const generator = random(Date.now());
const { Platform } = require('react-native');
const platform = (Platform.OS === 'android' || Platform.OS === 'ios');

import { Animated, TextInput, Text, View, Dimensions } from 'react-native';
import { Video,Audio } from 'expo-av';
import { TagCloud } from '../../utils/tagcloud';

const imageURI = Asset.fromModule(require('../../../assets/poster.jpg')).uri;
const videoURI = Asset.fromModule(require('../../../assets/back.mp4')).uri;
const audioDone = require('../../../assets/done.mp3');
const audioCongrats = require('../../../assets/congrats.mp3');

import { getUserData, setUserData } from '../../utils/user';

const getRandomHeight=()=>{
  return generator.nextFloat() * SCREEN_DIMENSIONS.height * (platform ? 0.4 : 0.5)
};


const getRandomWidth=()=>{
  return generator.nextFloat() * SCREEN_DIMENSIONS.width ;
};
const randomWords = require('random-words');
const { Value } = Animated;
const SCREEN_DIMENSIONS = Dimensions.get('window');
const defaultData = {
  value: 'English',
  key: 'English',
  count: 55,
  x: getRandomWidth(),
  nextX: getRandomWidth(),
  y: getRandomHeight(),
  nextY: getRandomHeight(),
};

const dataArray = [];

const datas = new Map([['English', defaultData]]);

const options = {
  luminosity: 'bright',
};

function revealAll(dataArray) {
  dataArray.forEach(el => {
    el.value = el.key;
  });
}


function revealWord(dataMap, word) {
  const data = dataMap.get(word);
  data.value = data.key;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(generator.nextFloat() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function changeCoord(data) {
  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    el.x = el.nextX;
    el.nextX = getRandomWidth();
    el.y = el.nextY;
    el.nextY = getRandomHeight();
  }
  return data;
}

async function makeApiRequest(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch(err => null);
}

async function getWords(state) {
  const dataArray = state.dataArray;
  const dataMap = state.dataMap;
  const words = randomWords(15);
  let i = 0;
  while (i < 5) {
    const word = words[i];
    const url = 'http://thesaurus.altervista.org/thesaurus/v1?word=' + word + '&language=en_US&key=UpI4Y4cQNOMAAvsHhbRP&output=json';
    const resJson = await makeApiRequest(url);

    if (resJson !== null && !resJson.hasOwnProperty('error')) {
      dataArray.length = 0;
      dataMap.length = 0;
      const newData = {
        value: word,
        key: word,
        count: generator.nextFloat() * 30 + 80 * (platform ? 1 : 2),
        x: getRandomWidth(),
        nextX: getRandomWidth(),
        y: getRandomHeight(),
        nextY: getRandomHeight(),
      };
      dataArray.push(newData);
      dataMap.set(word, newData);
      if (populateArray(resJson, dataArray, dataMap)) {

        return [await getDefinition(word,true), word];
      }
    }
    i += 1;
  }
}


async function getDefinition(word,bool) {
  let definition = 'No definition found, you are on your own !';
  try {
    const url = 'https://api.dictionaryapi.dev/api/v1/entries/en/' + word;
    const resJson = await makeApiRequest(url);
    if (resJson[0]['meaning'].hasOwnProperty('noun')) {
      definition = resJson[0]['meaning']['noun'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('transitive verb')) {
      definition = resJson[0]['meaning']['transitive verb'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('verb')) {
      definition = resJson[0]['meaning']['verb'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('adjective')) {
      definition = resJson[0]['meaning']['adjective'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('adverb')) {
      definition = resJson[0]['meaning']['adverb'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('cardinal number')) {
      definition = resJson[0]['meaning']['cardinal number'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('intransitive verb')) {
      definition = resJson[0]['meaning']['intransitive verb'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('pronoun')) {
      definition = resJson[0]['meaning']['pronoun'][0].definition;
    } else if (resJson[0]['meaning'].hasOwnProperty('plural noun')) {
      definition = resJson[0]['meaning']['plural noun'][0].definition;
    }else {
      console.log(resJson[0]['meaning']);
    }
  } catch (error) {
    console.error(error);
  }
  if (bool){
    Speech.speak(word,{language:"en-US"})
  }
  Speech.speak(definition,{language:"en-US"});
  return definition;
}


function populateArray(res, dataArray, dataMap) {
  let flag = false;
  res.response.forEach(el => {
    let data = el.list.synonyms.split('|');
    data.forEach(el => {
      const word = el.replace('\(generic term\)', '');
      if (word.split(' ').length < 2 && !dataMap.has(word)) {
        const newData = {
          value: word.replace(/./g, '*'),
          key: word,
          count: generator.nextFloat() * 30 * (platform ? 1 : 2),
          x: getRandomWidth(),
          nextX: getRandomWidth(),
          y: getRandomHeight(),
          nextY: getRandomHeight(),
        };
        console.log("cheating:",word);
        dataArray.push(newData);
        dataMap.set(word, newData);
        flag = true;
      }
    });

  });
  return flag;
}


async function playSound(audio){
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(audio);
    await soundObject.playAsync();
  } catch (error) {
    console.log(error)
  }
}
class cloudWords extends Component {

  opacity;

  constructor(props) {

    super(props);
    this.reset();
    setInterval(() => {
      this.setState({ dataArray: changeCoord(this.state.dataArray) });
      getUserData('reset').then(res=>{
        if (res==="true" && this.props["navigation"].isFocused()){
          console.log("Detecting a global reset");
          this.reset();
        }
      });

    }, 10000);
    this.opacity = new Animated.Value(0);
  }
  reset =()=>{
    console.log("Resetting");
    this.state = {
      text: '',
      dataArray: dataArray,
      dataMap: datas,
      found: false,
      score: 0,
      currentDefinition: '',
      currentSelection: '',
      alreadyFound:false,
    };
    getWords(this.state)
      .then(r => {
        this.setState({
          dataArray: this.state.dataArray,
          currentDefinition: r[0],
          currentSelection: r[1],
        });
        console.log('Finished');
      });
    getUserData('score')
      .then(r => this.setState({ score: parseInt(r) || 0 }));
    setUserData('reset',false).then();
  };

  render() {

    return (
      <Container style={styles.bigContainer}>
        <Header style={styles.header}>
          <Left style={[{ flex: 1 }, styles.side]}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu"/>
            </Button>
          </Left>

          <Body style={{
            flex: 1,
          }}>
            <Title style={styles.textTop}>Guess all the synonyms!</Title>
          </Body>
          <Right style={[{ flex: 1 }, styles.sides]}>
            <Text style={styles.textScore}>
              Score: {this.state.score}
            </Text>
          </Right>
        </Header>

        <Content style={styles.content}>

          <View style={styles.container}>
            <View style={styles.background}>
              <Animated.View
                style={[
                  { opacity: this.opacity },
                ]}
              >
                <Video
                  isLooping
                  isMuted={true}
                  positionMillis={500}
                  onLoad={() => {
                    Animated.timing(this.opacity, {
                      toValue: 1,
                    })
                      .start();
                  }}
                  posterSource={{ uri: imageURI }}
                  resizeMode="cover"
                  shouldPlay
                  source={{ uri: videoURI }}
                  style={styles.video}
                />
              </Animated.View>
            </View>
            <View style={styles.overlay}>

              <TagCloud
                minSize={platform ? 18 : 25}
                maxSize={platform ? 40 : 50}
                colorOptions={options}
                tags={this.state.dataArray}
                style={styles.overlay}
                handler={tag => {
                  getDefinition(tag.key,!tag.value.includes("*")).then(r => this.setState({ currentDefinition: r }));
                  this.setState({currentSelection:tag.key})
                }}
              />
            </View>
          </View>
        </Content>

        <Footer style={styles.footer}>
          <FooterTab>
            <Body>
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                  {platform && <Button
                    rounded
                    warning
                    title="Reveal me"
                    onPress={() => {
                      revealWord(this.state.dataMap, this.state.currentSelection);
                      this.setState({score:this.state.score-1});
                      this.forceUpdate();
                    }}
                  >
                    <Text>{' '}Reveal the word{' '}</Text>
                  </Button>}
                  {platform && <Button
                    rounded
                    danger
                    title="Reveal all"
                    onPress={() => {
                      revealAll(this.state.dataArray);
                      this.forceUpdate();
                      this.setState({score:this.state.score-10});
                    }}
                  >
                    <Text>{' '}Reveal all{' '}</Text>
                  </Button>}
                </View>
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                  <Text numberOfLines={2} style={styles.text}>
                    Definition: {this.state.currentDefinition}
                  </Text>
                </View>
                <View style={styles.inputPart}>
                  {!platform && <Button
                    rounded
                    warning
                    title="Reveal me"
                    onPress={() => {
                      revealWord(this.state.dataMap, this.state.currentSelection);

                      this.setState({score:this.state.score-1});
                      this.forceUpdate();
                    }}
                  >
                    <Text>{' '}Reveal the word{' '}</Text>
                  </Button>}
                  <View style={{ flexDirection: platform ? 'column' : 'row' }}>
                    <Text style={styles.text}>Enter a word: </Text>

                    <TextInput
                      style={styles.text}
                      placeholder="Type here your word!"
                      onChangeText={str => {
                        this.setState({
                          text: str,
                        });
                        if (!this.state.dataMap.has(str)) {
                          this.setState({ found: false,alreadyFound: false });
                        } else {
                          if (this.state.dataMap.get(str).value.includes("*")){

                            this.state.dataMap.get(str).value = str;
                            this.setState({
                              found: true,
                              text: '',
                              score: this.state.score + 10,
                            });
                            if (this.state.dataArray.every(el=>!el.value.includes("*"))){
                              playSound(audioCongrats).then();
                              setUserData('score', this.state.score + 90) .then();
                              this.setState({
                                score: this.state.score + 90,
                              });
                            }else{
                              playSound(audioDone).then()
                            }
                            setUserData('score', this.state.score + 10)
                              .then();
                          }else{
                              this.setState({
                                found: true,
                                alreadyFound: true,
                              });
                          }
                        }
                      }}
                      value={this.state.text}
                    />
                    <Text
                      style={[styles.text, this.state.found ? { color: '#4eff35' } : { color: '#ff1700' }]}>
                      {this.state.text
                        .split(' ')
                        .map(word => {
                          if(this.state.alreadyFound){
                            return "Already Found"
                          }else{
                            return word
                          }
                        })
                        .join(' ')}
                    </Text>

                  </View>
                  {!platform && <Button
                    rounded
                    danger
                    title="Reveal all"
                    onPress={() => {
                      revealAll(this.state.dataArray);
                      this.setState({score:this.state.score-10});
                      this.forceUpdate();
                    }}
                  >
                    <Text>{' '}Reveal all{' '}</Text>
                  </Button>}
                </View>
              </View>
            </Body>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default cloudWords;
