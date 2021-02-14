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
import Scoring_16 from './Components/Home/Score/Scoring_16';
import Scoring_finish from './Components/Home/Score/Scoring_finish';

import ScoreListHome from './Components/ScoreList/ScoreListHome';
import ScoreDetail from './Components/ScoreList/ScoreDetail';
import ScoreDetailInfo from './Components/ScoreList/ScoreDetailInfo';

import ImageGridHome from './Components/ImageGrid/ImageGridHome';


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
