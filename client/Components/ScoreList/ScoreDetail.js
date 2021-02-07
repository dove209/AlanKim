import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Alert, StatusBar, Vibration, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import styles from '../../StyleSheet';
import config from '../../config';
import StarRating from './StarRating';
import Plotly from 'react-native-plotly';

export default function ScoreDetail({ route, navigation }) {
    const _id = route.params._id
    const [isLoading, setIsLoading] = useState(true)
    const [item, setItem] = useState({})

    useEffect(() => {
        const getItem = async () => {
            await axios.get(`${config.MAIN_URL}/items/${_id}`)
                .then((res) => {
                    setItem(res.data[0])
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        getItem()
    }, [])

    const goback = () => {
        navigation.popToTop()
    }


    const data = [ // 차트에 들어갈 data를 먼저 지정해주고!
        {
        type: 'scatterpolar', // chart type
        r: [39, 28, 8, 7, 28, 39], // data
        theta: ['A','B','C', 'D', 'E', 'A'], // data category
        fill: 'none', // fill option
        fillcolor:'#000000',
        name: 'Group A' // data group name
        }
      ]
      
      const layout = {
        height: 280, // 원하는 크기로 height를 지정해주었다!
        margin: { // chart에는 기본값으로 margin이 적용되어 있는데, 우리가 흔히 아는 top, bottom, left와는 좀 다르다. 0으로 모두 초기화 해주었다.
          l: 0,
          r: 0,
          t: 20,
          d: 0,
        },
        polar: {
          radialaxis: { // 방사축 꾸미기 시작!
            visible: true,
            range: [0, 200],
            color: "rgba(0, 0, 0, 0.2)", // 방사축의 선 색깔
            showticklabels: false, // @1-1
            showline: false, // @1-2
            ticklen: 0, // @1-3
          },
          angularaxis: { // 각축 꾸미기 시작!
            rotation: 110, // 차트 회전율!
            color: 'rgba(0, 0, 0, 0.2)', // 각축의 선 색깔
            ticklen: 0, // @2-1
            tickfont: { // @2-2
              color: 'rgba(0, 0, 0, 0.6);',
              size: 13,
            },
          },
          gridshape: 'linear', // @3
        },
        showlegend: false, // @4
      };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <StatusBar barStyle="default" />
                <ActivityIndicator size="large" color="#00bdff" />
            </View>
        )
    }
    else {
        return (
            <View style={styles.addListContainer}>
                <View style={{ width: '90%' }}>
                    <AntDesign onPress={goback} name="arrowleft" size={24} color="rgba(0, 0, 0, 0.3)" />
                    <Text style={{ ...styles.mainTitleBigText, marginTop: 10 }}>{item.storeName}</Text>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{item.dong} {item.city}</Text>

                    {/* 총 점수 박스 */}
                    <View style={styles.whiteBox}>
                        <Text style={{ fontWeight: 'bold' }}>총 점수</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: '40%' }}>
                                <StarRating defaultRating={4} ></StarRating>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.totalScoreBox}>
                                    <Text>매우만족</Text>
                                </View>
                                <View style={{ ...styles.totalScoreBox, width: 60, marginLeft: 5 }}>
                                    <Text>{item.totalScore}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    {/* 항목 별 점수 박스 */}
                    <View style={styles.whiteBox}>
                        <Text style={{ fontWeight: 'bold' }}>항목 별 점수</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginTop: 10, alignSelf: 'center' }}>
                            <View style={styles.scoreSmallBox}>
                                <Text style={styles.smallBoxTitle}>상권</Text>
                                <Text style={styles.smallBoxText}>보통</Text>
                                <Text style={styles.smallBoxScore}>{item.categoryScore[0]}</Text>
                            </View>
                            <View style={styles.scoreSmallBox}>
                                <Text style={styles.smallBoxTitle}>인테리어</Text>
                                <Text style={styles.smallBoxText}>보통</Text>
                                <Text style={styles.smallBoxScore}>{item.categoryScore[1]}</Text>
                            </View>
                            <View style={styles.scoreSmallBox}>
                                <Text style={styles.smallBoxTitle}>서비스</Text>
                                <Text style={styles.smallBoxText}>보통</Text>
                                <Text style={styles.smallBoxScore}>{item.categoryScore[2]}</Text>
                            </View>
                            <View style={styles.scoreSmallBox}>
                                <Text style={styles.smallBoxTitle}>맛</Text>
                                <Text style={styles.smallBoxText}>보통</Text>
                                <Text style={styles.smallBoxScore}>{item.categoryScore[3]}</Text>
                            </View>
                        </View>
                        <View style={{height:250, marginTop:10}}>
                            <Plotly data={data} layout={layout} debug enableFullPlotly />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}