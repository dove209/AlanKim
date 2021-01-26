import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Vibration, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from '../../../StyleSheet';


export default function StarRaing({defaultRating, maxRating, onIncrease, onDecrease, UpdateRating}) {


    const scoreComment = ['너무 너무 최악!', '너무 최악!', '최악!', '그럭저럭...', ' 보통. 그럭저럭 괜찮네.', '괜찮네~', '좋아요~~!', '아주 좋아요~!', '최고야!아주 멋져.', '궁극. 완벽! 펄풱!'];
    const Star = require('../../../assets/imges/star_filled.png');
    const Star_With_Border = require('../../../assets/imges/star_corner.png');



    let RatingBar = [];

    for (var i = 1; i <= maxRating; i++) {
        RatingBar.push(
          <TouchableOpacity
            activeOpacity={0.7}
            key={i}
            onPress={UpdateRating.bind(this, i)}>
            <Image
              style={styles.StarImage}
              source={i <= defaultRating ? Star : Star_With_Border}
            />
          </TouchableOpacity>
        );
      } 
    return (
        <View style={styles.starWrap}>
            <View style={styles.stars}>{RatingBar}</View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, width: "90%" }}>
                <TouchableOpacity onPress={onDecrease} style={{ width: 50, height: 50, justifyContent: 'center' }}>
                    <AntDesign name="minus" size={24} color="rgba(0, 0, 0, 0.3)" />
                </TouchableOpacity>
                <Text style={styles.scoreText}>{defaultRating}</Text>
                <TouchableOpacity onPress={onIncrease} style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="plus" size={24} color="rgba(0, 0, 0, 0.3)" />
                </TouchableOpacity>
            </View>
            <Text style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{scoreComment[defaultRating - 1]}</Text>
        </View>
    )
}