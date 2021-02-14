import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, Alert, StatusBar, Vibration } from 'react-native';
import axios from 'axios';
import { AntDesign, Entypo } from '@expo/vector-icons';
import styles from '../../StyleSheet';
import config from '../../config';
import PickerScreen from '../Home/picker';
import StarRating from './StarRating';


export default function ScoreListHome({ navigation }) {
    const [items, setItems] = useState([]);
    const [avgScore, setAvgScore] = useState(0);                //평균 점수
    const [sortMenu, setSortMenu] = useState(1);                //1:최신순, 2:과거순, 3:위치별, 4:업종별, 5:가격대별, 6:점수순
    const [isSelectBox, setIsSelectBox] = useState(false);
    const [refreshing, setRefresing] = useState(false);

    const [selectVal, setSelectVal] = useState(null);           //위치별 업종별 가격대별 선택 옵션


    const onValueChange = (val) => {
        Vibration.vibrate(5)
        setSelectVal(val)
        axios.get(`${config.MAIN_URL}/items?isScore=true&sortMenu=${sortMenu}&val=${val}`)
            .then((res) => {
                if(res.data.length !== 0 ){
                    let sumScore = 0
                    res.data.forEach(element => {
                        sumScore += element.totalScore
                    });
                    setAvgScore((sumScore/res.data.length).toFixed(1))
                } else {
                    setAvgScore(0)
                }
                setItems(res.data);
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        const getItems = async () => {
            await axios.get(`${config.MAIN_URL}/items?isScore=true&sortMenu=1`)
                .then((res) => {
                    if(res.data.length !== 0 ){
                        let sumScore = 0
                        res.data.forEach(element => {
                            sumScore += element.totalScore
                        });
                        setAvgScore((sumScore/res.data.length).toFixed(1))
                    } else {
                        setAvgScore(0)
                    }
                    setItems(res.data);
 
                })
                .catch((error) => console.error(error))
        }
        getItems();
    }, [])

    // 정렬 기준 선택
    const listSort = (menu) => {
        Vibration.vibrate(5)
        setSortMenu(menu)
        setSelectVal(null)
        if (menu === 3 || menu === 4 || menu === 5) {
            axios.get(`${config.MAIN_URL}/items?isScore=true&sortMenu=1`)
            .then((res) => {
                if(res.data.length !== 0 ){
                    let sumScore = 0
                    res.data.forEach(element => {
                        sumScore += element.totalScore
                    });
                    setAvgScore((sumScore/res.data.length).toFixed(1))
                } else {
                    setAvgScore(0)
                }
                setItems(res.data);
                setIsSelectBox(true);
            })
            .catch((error) => console.error(error))
        } else if( menu === 1 || menu ===  2) {                                         //최신순 또는 과거순
            axios.get(`${config.MAIN_URL}/items?isScore=true&sortMenu=${menu}`)
            .then((res) => {
                if(res.data.length !== 0 ){
                    let sumScore = 0
                    res.data.forEach(element => {
                        sumScore += element.totalScore
                    });
                    setAvgScore((sumScore/res.data.length).toFixed(1))
                } else {
                    setAvgScore(0)
                }
                setItems(res.data);
                setIsSelectBox(false);
            })
            .catch((error) => console.error(error))
        } else if(menu === 6) {                                                         //점수순
            axios.get(`${config.MAIN_URL}/items?isScore=true&sortMenu=${menu}`)
            .then((res) => {
                if(res.data.length !== 0 ){
                    let sumScore = 0
                    res.data.forEach(element => {
                        sumScore += element.totalScore
                    });
                    setAvgScore((sumScore/res.data.length).toFixed(1))
                } else {
                    setAvgScore(0)
                }
                setItems(res.data);
                setIsSelectBox(false);
            })
        }
    }



    //ScrollView 다운시 새로고침
    const onRefresh = () => {
        Vibration.vibrate(5)
        setRefresing(true)
        axios.get(`${config.MAIN_URL}/items?isScore=true&sortMenu=1`)
            .then((res) => {
                if(res.data.length !== 0 ){
                    let sumScore = 0
                    res.data.forEach(element => {
                        sumScore += element.totalScore
                    });
                    setAvgScore((sumScore/res.data.length).toFixed(1))
                } else {
                    setAvgScore(0)
                }
                setItems(res.data);
                setSortMenu(1);
                setIsSelectBox(false);
                setRefresing(false);
            })
            .catch((error) => console.error(error))
    }


    //점수 상세 보기
    const goToDetail = (item) => {
        Vibration.vibrate(5)
        navigation.navigate('ScoreDetail', {item:item})
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default"/>
            <View style={styles.mainTitle}>
                <View>
                    <Text style={styles.mainTitleSmailText}>등록 남길랭</Text>
                    <Text style={styles.mainTitleBigText}>평가보기</Text>
                </View>
                <View style={{flexDirection:'row', marginBottom:5, marginRight:20}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color: 'rgba(0, 0, 0, 0.5)'}}>남길랭</Text>
                        <Text style={{marginLeft:5}}>{items.length}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginLeft:10}}>
                        <Text style={{color: 'rgba(0, 0, 0, 0.5)'}}>평균점수</Text>
                        <Text style={{marginLeft:5}}>{avgScore}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.sortMenu}>
                <TouchableOpacity onPress={() => listSort(1)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 1 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>최신순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(2)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 2 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>과거순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(6)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 6 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>점수순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(3)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 3 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>위치별</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(4)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 4 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>업종별</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(5)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 5 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>가격대별</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.selectBox, { opacity: isSelectBox ? 1 : 0, height: isSelectBox ? 50 : 0, marginBottom: isSelectBox ? 20 : 0 }]}>
                <Text>{sortMenu === 3 ? '광역시·도' : sortMenu === 4 ? '업종' : '가격대별'}</Text>
                {isSelectBox ? <PickerScreen sortMenu={sortMenu} selectVal={selectVal} onValueChange={onValueChange}></PickerScreen> : null}
            </View>

            <View style={styles.homeList}>
                <View style={{ opacity: items.length === 0 ? 1 : 0, height: items.length === 0 ? '100%' : 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Entypo name="add-to-list" size={40} color='rgba(0, 0, 0, 0.2)' />
                    <Text style={styles.listEmptyTitle}>평가를 남겨주세요.</Text>
                    <Text style={styles.listEmptySub}>남길랭 탭에서 시작하세요.</Text>
                </View>
                <FlatList
                    data={items}
                    style={styles.listScrollViewWrap}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={item.id} style={[styles.listItemWrap, { marginTop: index == 0 ? 0 : 10 }]} onPress={() => goToDetail(item)}>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                                <View>
                                    {/* 등록 일(년 월 일) */}
                                    <Text style={styles.itemSmallText}>{item.upTime.split(" ")[0]}</Text>
                                    <Text style={styles.itemStoreName}>{item.storeName}</Text>
                                    <Text style={styles.itemStoreAddress}>{item.dong} {item.city}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text style={styles.itemSmallText}>{item.storeType}</Text>
                                        <Text style={styles.itemSmallText}>{item.price}</Text>
                                        <Text style={styles.itemSmallText}>주차{item.isParking}</Text>
                                    </View>
                                </View>
                                <View style={{width:"43%"}}> 
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop:20 }}>
                                        <View style={{...styles.totalScoreBox, width:80}}>
                                            <Text style={{color: item.totalScore <= 40 ? '#BD0000' : item.totalScore > 40 && item.totalScore <= 60 ? '#A4A4A4' : '#169D00'}}>
                                            { item.totalScore >= 0 && item.totalScore <= 20 ? '매우불만'
                                                : item.totalScore > 20 && item.totalScore <= 40 ? '불 만'
                                                    : item.totalScore > 40 && item.totalScore <= 60 ? '보 통'
                                                        : item.totalScore > 60 && item.totalScore <= 80 ? '만 족'
                                                            : '매우만족'
                                            }
                                            </Text>
                                        </View>
                                        <View style={{...styles.totalScoreBox, marginLeft:5, width:60}}>
                                            <Text>{item.totalScore}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop:10}}>
                                        <StarRating defaultRating={
                                            item.totalScore >= 0 && item.totalScore <= 20 ? 1
                                                : item.totalScore > 20 && item.totalScore <= 40 ? 2
                                                    : item.totalScore > 40 && item.totalScore <= 60 ? 3
                                                        : item.totalScore > 60 && item.totalScore <= 80 ? 4
                                                            : 5}>                    
                                        </StarRating>
                                    </View>
                                </View>
                                <View style={{justifyContent:'center'}}>
                                    <AntDesign name="right" size={20} color="rgba(0, 0, 0, 0.2)" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}