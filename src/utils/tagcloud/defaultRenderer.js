import React from 'react';
import { Text, TouchableWithoutFeedback ,View} from 'react-native';
import * as Animatable from 'react-native-animatable';


export const defaultRenderer = (tag, size, color,handler) => {
  const fontSize = size;
  const key = tag.key || tag.value;
  const style = {
    ...styles,
    color,
    fontSize,
  };
  return (
    <Animatable.View
      animation={{
        from: {
          translateY: tag.y,
          translateX: tag.x,
        },
        to: {
          translateY: tag.nextY,
          translateX: tag.nextX,
        },
      }}
      duration={10000}
      delay={100}
      easing="linear"
      iterationCount="infinite"
      key={key}
    >
      <TouchableWithoutFeedback onPress={r=>{
        handler(tag)
      }}>
        <View>
          <Text style={style} key={key}>
            {tag.value}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </Animatable.View>

  );
};

const styles = {};
