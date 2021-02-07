import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Vibration, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from '../../StyleSheet';


export default function StarRaing({defaultRating}) {
    const maxRating = 5
    const Star = require('../../assets/imges/star_filled.png');
    const Star_With_Border = require('../../assets/imges/star_corner.png');


    let RatingBar = [];
    for (var i = 1; i <= maxRating; i++) {
        RatingBar.push(
          <View
            activeOpacity={0.7}
            key={i}
          >
            <Image
              style={{...styles.StarImage, width:20, height:20}}
              source={i <= defaultRating ? Star : Star_With_Border}
            />
          </View>
        );
    } 

    return (
        <View style={{...styles.stars, marginTop:0, justifyContent:'space-between', width:'100%'}}>{RatingBar}</View>
    )
}