import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthLoading from './Components/AuthLoading';
import HomeScreen from './Components/Home/HomeScreen';
import AddListScreen from './Components/Home/AddListScreen';



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
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      {/* 로그인 추가? */}
      <Stack.Screen name="HomeScreen" component={MainTabs} />
      <Stack.Screen name="AddListScreen" component={AddListScreen} />
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
