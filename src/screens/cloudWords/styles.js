const React = require('react-native');
const { Platform,Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const devicewidth = Dimensions.get('window').width;
const platform = (Platform.OS === 'android' || Platform.OS === 'ios');
export default {
  text: {
    color: '#ffffff',
    textAlign: 'center',
    padding:  platform?1:0,
    fontSize: platform?15:30,
    marginBottom:  platform?2:0,
  },
  textScore: {
    color: '#ffffff',
    textAlign: 'center',
    padding:  platform?1:0,
    fontSize: platform?15:30,
  },
  textDef: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: platform?10:20,
  },
  textTop: {
    color: '#ffffff',
    textAlign: 'center',
    paddingLeft: platform?0:devicewidth/12,
    paddingTop: platform?devicewidth/24:0,
    fontSize: platform?10:30,
    flex: 1,
  },sides:{
    width:platform?devicewidth/12:devicewidth/3
  },
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
  cloudContainer: {
    flex: 1,
    height: deviceHeight * 0.8,
    marginBottom: 30,

  },
  tagCloud: {
    flex: 1,
  },
  movingCloud: {
    transition: '1.4s',
  },
  bigContainer: {
    backgroundColor:"#fff"
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',

  },
  background: {
    backgroundColor: "transparent",
    width:devicewidth,
    height: deviceHeight,
    overflow:'hidden',
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
    position: 'absolute',

  },
  overlay: {
    width:devicewidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  footer:{
    flexDirection: 'row',
    height: platform?deviceHeight*0.25:deviceHeight*0.15,
  },
  video:{
    height:  platform?deviceHeight*0.75:deviceHeight,
    width:devicewidth,
  },
  header:{
    flexDirection: 'row',
    height: platform?deviceHeight*0.07:deviceHeight*0.05,
  },
  content:{
    overflowY: 'hidden',
    height: deviceHeight*0.8,
  }
  ,
  inputPart:{
    flexDirection: platform?'column':'row',
    justifyContent: "space-around",
  },
  outputText:{
    color: '#4eff35',
    textAlign: 'center',
    padding:  platform?1:10,
    fontSize: platform?15:30,
    marginBottom:  platform?2:20,

  }

};
