import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, BackHandler, Alert, Vibration, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import styles from '../../../StyleSheet';
import config from '../../../config';

export default function Scoring_finish({ route, navigation }) {
    const _id = route.params._id;

    const [isLoading, setIsLoading] = useState(true)
    const [finishInfo, setFinishInfo] = useState({})
    const [defaultRating, setDefaultRating] = useState(3);

    const maxRating = 5
    const totalScoreComment = ['최악!', '별로', '보통', '좋아요~', '최고야! 아주 멋져'];
    const Star = require('../../../assets/imges/star_filled.png');
    const Star_With_Border = require('../../../assets/imges/star_corner.png');

    useEffect(() => {
        const getScore = async () => {
            await axios.get(`${config.MAIN_URL}/items/${_id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setFinishInfo(res.data[0])
                        let defaultRating = res.data[0].totalScore >= 0 && res.data[0].totalScore <= 20 ? 1
                            : res.data[0].totalScore > 20 && res.data[0].totalScore <= 40 ? 2
                                : res.data[0].totalScore > 40 && res.data[0].totalScore <= 60 ? 3
                                    : res.data[0].totalScore > 60 && res.data[0].totalScore <= 80 ? 4
                                        : 5
                        setDefaultRating(defaultRating)
                        setIsLoading(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        getScore()

        BackHandler.addEventListener("hardwareBackPress", goback);

        return () => 
            BackHandler.removeEventListener('hardwareBackPress', goback);

    }, [])

    const goback = () => {
        Vibration.vibrate(5)
        Alert.alert("평가 완료!",
            "홈으로 나가시겠습니까?", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "예", onPress: () => {
                    navigation.popToTop()
                    navigation.dispatch(
                        StackActions.replace('HomeScreen')
                    )
                }
            }
        ]);
        return true;
    }


    let RatingBar = [];
    for (var i = 1; i <= maxRating; i++) {
        RatingBar.push(
            <View
                activeOpacity={0.7}
                key={i}
            >
                <Image
                    style={{ ...styles.StarImage, width: 20, height: 20 }}
                    source={i <= defaultRating ? Star : Star_With_Border}
                />
            </View>
        );
    }


    if (isLoading) {
        return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <StatusBar barStyle="default"/>
            <Image
              style={{resizeMode: 'contain', height:100}}
              source={require('../../../assets/imges/wait.png')}
            />
            <Text style={styles.questionsTitle}>로딩중...</Text>
            <Text style={styles.questionsContent}>조금만 기다려줘요</Text>
        </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingBottom: 30 }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.finishTitle}>평가를 완료하였습니다.</Text>
                    <Text style={styles.finishsmall}>수고하셨습니다.</Text>
                </View>


                <View style={styles.scoreBox}>
                    <View style={{ ...styles.stars, width: "45%", marginTop: 0 }}>{RatingBar}</View>
                    <Text style={{ fontSize: 23, fontWeight: 'bold', marginTop: 20 }}>{finishInfo.storeName}</Text>
                    <Text style={{ fontSize: 15, color: 'rgba(0,0,0,0.5)' }}>{finishInfo.dong} {finishInfo.city}</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', marginTop: 20 }}>{finishInfo.totalScore}</Text>
                    <Text style={{ fontSize: 15, color: 'rgba(0,0,0,0.5)' }}>{totalScoreComment[defaultRating - 1]}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 }}>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>상권</Text>
                            <Text style={{...styles.smallBoxText, color: finishInfo.categoryScore[0] <= 40 ? '#BD0000' : finishInfo.categoryScore[0] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {finishInfo.categoryScore[0] >= 0 && finishInfo.categoryScore[0] <= 20 ? config.scoreComment[0]
                                    : finishInfo.categoryScore[0] > 20 && finishInfo.categoryScore[0] <= 40 ? config.scoreComment[1]
                                        : finishInfo.categoryScore[0] > 40 && finishInfo.categoryScore[0] <= 60 ? config.scoreComment[2]
                                            : finishInfo.categoryScore[0] > 60 && finishInfo.categoryScore[0] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{finishInfo.categoryScore[0]}</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>인테리어</Text>
                            <Text style={{...styles.smallBoxText, color: finishInfo.categoryScore[1] <= 40 ? '#BD0000' : finishInfo.categoryScore[1] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {finishInfo.categoryScore[1] >= 0 && finishInfo.categoryScore[1] <= 20 ? config.scoreComment[0]
                                    : finishInfo.categoryScore[1] > 20 && finishInfo.categoryScore[1] <= 40 ? config.scoreComment[1]
                                        : finishInfo.categoryScore[1] > 40 && finishInfo.categoryScore[1] <= 60 ? config.scoreComment[2]
                                            : finishInfo.categoryScore[1] > 60 && finishInfo.categoryScore[1] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{finishInfo.categoryScore[1]}</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>서비스</Text>
                            <Text style={{...styles.smallBoxText, color: finishInfo.categoryScore[2] <= 40 ? '#BD0000' : finishInfo.categoryScore[2] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {finishInfo.categoryScore[2] >= 0 && finishInfo.categoryScore[2] <= 20 ? config.scoreComment[0]
                                    : finishInfo.categoryScore[2] > 20 && finishInfo.categoryScore[2] <= 40 ? config.scoreComment[1]
                                        : finishInfo.categoryScore[2] > 40 && finishInfo.categoryScore[2] <= 60 ? config.scoreComment[2]
                                            : finishInfo.categoryScore[2] > 60 && finishInfo.categoryScore[2] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{finishInfo.categoryScore[2]}</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>맛</Text>
                            <Text style={{...styles.smallBoxText, color: finishInfo.categoryScore[3] <= 40 ? '#BD0000' : finishInfo.categoryScore[3] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {finishInfo.categoryScore[3] >= 0 && finishInfo.categoryScore[3] <= 20 ? config.scoreComment[0]
                                    : finishInfo.categoryScore[3] > 20 && finishInfo.categoryScore[3] <= 40 ? config.scoreComment[1]
                                        : finishInfo.categoryScore[3] > 40 && finishInfo.categoryScore[3] <= 60 ? config.scoreComment[2]
                                            : finishInfo.categoryScore[3] > 60 && finishInfo.categoryScore[3] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{finishInfo.categoryScore[3]}</Text>
                        </View>
                    </View>
                </View>


                <TouchableOpacity style={styles.toHome} onPress={goback}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>홈으로</Text>
                </TouchableOpacity>
            </View>
        );
    }
}