import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
} from 'native-base';
import styles from './style';
import { setUserData } from '../../utils/user';

const drawerCover = require('../../../assets/background_app_tiny.jpg');
const drawerImage = require('../../../assets/logo_with_text.png');
const datas = [
  {
    name: 'Home',
    route: 'Home',
    icon: 'home',
    bg: '#C5F442',
  },
  {
    name: 'Voice Recognition',
    route: 'VoiceRecognition',
    icon: 'microphone',
    bg: '#C5F442',
  },{
    name: 'Game',
    route: 'Game',
    icon: 'logo-game-controller-a',
    bg: '#C5F442',
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{
            flex: 1,
            backgroundColor: '#6fc36a',
            top: -1,
          }}
        >
          <Image source={drawerCover} style={styles.drawerCover}/>
          <Image square style={styles.drawerImage} source={drawerImage}/>

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={
                  () => {
                    if (this.props.activeItemKey===data.route){
                      this.props.navigation.goBack();
                    }else{
                      this.props.navigation.navigate(data.route);
                    }
                  }
                }
              >
                <Left>
                  <Icon
                    name={data.icon}
                    style={{
                      color: '#3549f0',
                      fontSize: 26,
                      width: 30,
                    }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                <Right style={{ flex: 1 }}>
                  <Badge
                    style={{
                      borderRadius: 3,
                      height: 25,
                      width: 72,
                      backgroundColor: data.bg,
                    }}
                  >
                    <Text style={styles.badgeText}>
                      {`${data.types} Types`}
                    </Text>
                  </Badge>
                </Right>
                }
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
