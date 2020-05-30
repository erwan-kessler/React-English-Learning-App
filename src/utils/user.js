import {AsyncStorage} from 'react-native';
async function setUserData(key,data) {
  try {
    await AsyncStorage.setItem(key, data.toString());
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }

  console.log("set",data);
}

async function getUserData(key) {

  let data = '';
  try {
    data = await AsyncStorage.getItem(key) || null;
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  console.log("get",data);
  return data;
}

export { getUserData,setUserData };
