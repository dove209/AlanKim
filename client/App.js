import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Components/Home/HomeScreen';
import AddListScreen from './Components/Home/AddListScreen';
import Scoring_1 from './Components/Home/Score/Scoring_1';
import Scoring_2 from './Components/Home/Score/Scoring_2';
import Scoring_3 from './Components/Home/Score/Scoring_3';
import Scoring_4 from './Components/Home/Score/Scoring_4';
import Scoring_5 from './Components/Home/Score/Scoring_5';
import Scoring_6 from './Components/Home/Score/Scoring_6';
import Scoring_7 from './Components/Home/Score/Scoring_7';
import Scoring_8 from './Components/Home/Score/Scoring_8';
import Scoring_9 from './Components/Home/Score/Scoring_9';
import Scoring_10 from './Components/Home/Score/Scoring_10';
import Scoring_11 from './Components/Home/Score/Scoring_11';
import Scoring_12 from './Components/Home/Score/Scoring_12';
import Scoring_13 from './Components/Home/Score/Scoring_13';
import Scoring_14 from './Components/Home/Score/Scoring_14';
import Scoring_15 from './Components/Home/Score/Scoring_15';
import Scoring_16 from './Components/Home/Score/Scoring_16';
import Scoring_finish from './Components/Home/Score/Scoring_finish';

import ScoreListHome from './Components/ScoreList/ScoreListHome';
import ScoreDetail from './Components/ScoreList/ScoreDetail';
import ScoreDetailInfo from './Components/ScoreList/ScoreDetailInfo';

import ImageGridHome from './Components/ImageGrid/ImageGridHome';

import EtcHome from './Components/Etc/EtcHome';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'home') {
            return <MaterialIcons name='edit' size={size} color={color} />
          } else if (route.name === 'score') {
            return <AntDesign name='profile' size={size} color={color} />;
          } else if (route.name === 'picture') {
            return <AntDesign name='picture' size={size} color={color} />;
          } else if (route.name === 'etc') {
            return <Entypo name='dots-three-horizontal' size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#00B2FF',
        inactiveTintColor: '#a4a4a4',
        labelStyle: {
          fontSize: 1,
          opacity: 0
        },
        style: {
          paddingTop: 0,
          height: 60,
        }
      }}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="score" component={ScoreListHome} />
      <Tab.Screen name="picture" component={ImageGridHome} />
      <Tab.Screen name="etc" component={EtcHome} />
    </Tab.Navigator>
  );
}


function MainStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={MainTabs} />
      <Stack.Screen name="AddListScreen" component={AddListScreen} />
      <Stack.Screen name="Scoring_1" component={Scoring_1} />
      <Stack.Screen name="Scoring_2" component={Scoring_2} />
      <Stack.Screen name="Scoring_3" component={Scoring_3} />
      <Stack.Screen name="Scoring_4" component={Scoring_4} />
      <Stack.Screen name="Scoring_5" component={Scoring_5} />
      <Stack.Screen name="Scoring_6" component={Scoring_6} />
      <Stack.Screen name="Scoring_7" component={Scoring_7} />
      <Stack.Screen name="Scoring_8" component={Scoring_8} />
      <Stack.Screen name="Scoring_9" component={Scoring_9} />
      <Stack.Screen name="Scoring_10" component={Scoring_10} />
      <Stack.Screen name="Scoring_11" component={Scoring_11} />
      <Stack.Screen name="Scoring_12" component={Scoring_12} />
      <Stack.Screen name="Scoring_13" component={Scoring_13} />
      <Stack.Screen name="Scoring_14" component={Scoring_14} />
      <Stack.Screen name="Scoring_15" component={Scoring_15} />
      <Stack.Screen name="Scoring_16" component={Scoring_16} />
      <Stack.Screen name="Scoring_finish" component={Scoring_finish} />
      <Stack.Screen name="ScoreListHome" component={ScoreListHome} />
      <Stack.Screen name="ScoreDetail" component={ScoreDetail} />
      <Stack.Screen name="ScoreDetailInfo" component={ScoreDetailInfo} />
    </Stack.Navigator>
  )
}



export default function App() {
  return (
    <NavigationContainer>
      <MainStack></MainStack>
    </NavigationContainer>
  );
}
