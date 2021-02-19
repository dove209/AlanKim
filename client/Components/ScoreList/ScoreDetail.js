import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StatusBar, Vibration, ActivityIndicator } from 'react-native';
import axios from 'axios';

import { AntDesign } from '@expo/vector-icons';
import styles from '../../StyleSheet';
import config from '../../config';
import StarRating from './StarRating';
import RadarCahrt from './RadarCahrt';

export default function ScoreDetail({ route, navigation }) {
    const item = route.params.item

    const goback = () => {
        navigation.popToTop()
    }

    //상세 내역 페이지로 이동
    const gotoDetailInfo = () => {
        Vibration.vibrate(5)
        navigation.navigate('ScoreDetailInfo', { item: item })
    }

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
                            <StarRating defaultRating={
                                item.totalScore >= 0 && item.totalScore <= 20 ? 1
                                    : item.totalScore > 20 && item.totalScore <= 40 ? 2
                                        : item.totalScore > 40 && item.totalScore <= 60 ? 3
                                            : item.totalScore > 60 && item.totalScore <= 80 ? 4
                                                : 5
                            } ></StarRating>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ ...styles.totalScoreBox, width: 80 }}>
                                <Text style={{ color: item.totalScore <= 40 ? '#BD0000' : item.totalScore > 40 && item.totalScore <= 60 ? '#A4A4A4' : '#169D00' }}>
                                    {item.totalScore >= 0 && item.totalScore <= 20 ? config.scoreComment[0]
                                        : item.totalScore > 20 && item.totalScore <= 40 ? config.scoreComment[1]
                                            : item.totalScore > 40 && item.totalScore <= 60 ? config.scoreComment[2]
                                                : item.totalScore > 60 && item.totalScore <= 80 ? config.scoreComment[3]
                                                    : config.scoreComment[4]
                                    }
                                </Text>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10, alignSelf: 'center' }}>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>상권</Text>
                            <Text style={{ ...styles.smallBoxText, color: item.categoryScore[0] <= 40 ? '#BD0000' : item.categoryScore[0] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {item.categoryScore[0] >= 0 && item.categoryScore[0] <= 20 ? config.scoreComment[0]
                                    : item.categoryScore[0] > 20 && item.categoryScore[0] <= 40 ? config.scoreComment[1]
                                        : item.categoryScore[0] > 40 && item.categoryScore[0] <= 60 ? config.scoreComment[2]
                                            : item.categoryScore[0] > 60 && item.categoryScore[0] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{item.categoryScore[0]}</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>인테리어</Text>
                            <Text style={{ ...styles.smallBoxText, color: item.categoryScore[1] <= 40 ? '#BD0000' : item.categoryScore[1] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {item.categoryScore[1] >= 0 && item.categoryScore[1] <= 20 ? config.scoreComment[0]
                                    : item.categoryScore[1] > 20 && item.categoryScore[1] <= 40 ? config.scoreComment[1]
                                        : item.categoryScore[1] > 40 && item.categoryScore[1] <= 60 ? config.scoreComment[2]
                                            : item.categoryScore[1] > 60 && item.categoryScore[1] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{item.categoryScore[1]}</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>서비스</Text>
                            <Text style={{ ...styles.smallBoxText, color: item.categoryScore[2] <= 40 ? '#BD0000' : item.categoryScore[2] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {item.categoryScore[2] >= 0 && item.categoryScore[2] <= 20 ? config.scoreComment[0]
                                    : item.categoryScore[2] > 20 && item.categoryScore[2] <= 40 ? config.scoreComment[1]
                                        : item.categoryScore[2] > 40 && item.categoryScore[2] <= 60 ? config.scoreComment[2]
                                            : item.categoryScore[2] > 60 && item.categoryScore[2] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{item.categoryScore[2]}</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>맛</Text>
                            <Text style={{ ...styles.smallBoxText, color: item.categoryScore[3] <= 40 ? '#BD0000' : item.categoryScore[3] <= 60 ? '#A4A4A4' : '#169D00' }}>
                                {item.categoryScore[3] >= 0 && item.categoryScore[3] <= 20 ? config.scoreComment[0]
                                    : item.categoryScore[3] > 20 && item.categoryScore[3] <= 40 ? config.scoreComment[1]
                                        : item.categoryScore[3] > 40 && item.categoryScore[3] <= 60 ? config.scoreComment[2]
                                            : item.categoryScore[3] > 60 && item.categoryScore[3] <= 80 ? config.scoreComment[3]
                                                : config.scoreComment[4]
                                }
                            </Text>
                            <Text style={styles.smallBoxScore}>{item.categoryScore[3]}</Text>
                        </View>
                    </View>

                    {/* 종목별 점수 차트 */}
                    <View style={{ height: 250, marginTop: 10, }}>
                        <RadarCahrt data={item.categoryScore}></RadarCahrt>
                    </View>
                </View>

                <TouchableOpacity style={{ ...styles.whiteBox, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={gotoDetailInfo}>
                    <Text style={{ fontWeight: 'bold' }}>
                        상세내역
                        </Text>
                    <AntDesign name="right" size={20} color="rgba(0, 0, 0, 0.2)" />
                </TouchableOpacity>
            </View>
        </View>
    );

}