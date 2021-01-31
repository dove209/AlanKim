import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Components/Home/HomeScreen';
import AddListScreen from './Components/Home/AddListScreen';
import Scoring_1 from './Components/Home/Score/Scoring_1';
import Scoring_2 from './Components/Home/Score/Scoring_2';
import Scoring_16 from './Components/Home/Score/Scoring_16';
import Scoring_finish from './Components/Home/Score/Scoring_finish';


function MarkScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mark!</Text>
    </View>
  );
}

function PictureScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>picture!</Text>
    </View>
  );
}

function EtcScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Etc!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'edit' : 'edit';
          } else if (route.name === 'mark') {
            iconName = focused ? 'bars' : 'bars';
          } else if (route.name === 'picture') {
            iconName = focused ? 'picture' : 'picture';
          } else if (route.name === 'etc') {
            iconName = focused ? 'profile' : 'profile';
          }
          return <AntDesign name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="mark" component={MarkScreen} />
      <Tab.Screen name="picture" component={PictureScreen} />
      <Tab.Screen name="etc" component={EtcScreen} />
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
      <Stack.Screen name="Scoring_16" component={Scoring_16} />
      <Stack.Screen name="Scoring_finish" component={Scoring_finish} />
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
