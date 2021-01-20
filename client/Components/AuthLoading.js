import React, {useState, useEffect}  from 'react';
import { ActivityIndicator , View, StatusBar } from 'react-native';
import { Notifications } from 'expo';
import { navigation  } from '@react-navigation/native';

const MAIN_URL = "http://alt-a.iptime.org:5000";

export default function AuthLoading( {navigation}) {
  const [loginedCheck, setLoginedCheck] = useState(false) //기존 로그인 상태 유지 사용 여부

  useEffect(() => {
    //로그 상태 유지 유무 확인하기
    const checkLogined = async() => {
      let token = await Notifications.getExpoPushTokenAsync();

      await fetch(`${MAIN_URL}/logined_check`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: {
              value: token,
            },
          }),
      })
      .then(res => res.json())
      .then(res => {
        setLoginedCheck(res)
        navigation.navigate(res ? 'HomeScreen' : 'Login');
      })
      .catch(error => {
        console.error(error);
      });
    };
    checkLogined()
  },[])

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <ActivityIndicator size="large" color="#00bdff" />
      <StatusBar barStyle="dark-content" />
    </View>
  );
}


