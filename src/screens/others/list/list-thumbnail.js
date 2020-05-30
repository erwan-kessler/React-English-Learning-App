import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right
} from "native-base";
import styles from "./styles";

const sankhadeep = require("../../../../assets/contacts/default.png");
const supriya = require("../../../../assets/contacts/default.png");
const himanshu = require("../../../../assets/contacts/default.png");
const shweta = require("../../../../assets/contacts/default.png");
const shruti = require("../../../../assets/contacts/default.png");
const shivraj = require("../../../../assets/contacts/default.png");
const datas = [
  {
    img: sankhadeep,
    text: "Test",
    note: "Its time to build a difference . ."
  },
  {
    img: supriya,
    text: "Test",
    note: "One needs courage to be happy and smiling all time . . "
  },
  {
    img: shivraj,
    text: "Test",
    note: "Time changes everything . ."
  },
  {
    img: shruti,
    text: "Test",
    note: "The biggest risk is a missed opportunity !!"
  },
  {
    img: himanshu,
    text: "Test",
    note: "Live a life style that matchs your vision"
  },
  {
    img: shweta,
    text: "Test",
    note: "Failure is temporary, giving up makes it permanent"
  }
];

class NHListThumbnail extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>List Thumbnail</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={data.img} />
                </Left>
                <Body>
                  <Text>
                    {data.text}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.note}
                  </Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHListThumbnail;
