import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Alert, StatusBar, Vibration, StyleSheet } from 'react-native';
import axios from 'axios';
import GridImageView from './GridImageViewer';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import styles from '../../StyleSheet';
import config from '../../config';

export default function ImageGridHome() {
    var key = 0;
    const [imageGridItem, setImageGridItem] = useState([]);     //이미지 그리드 아이템들(최신순, 과거순 그리드)
    const [storeImageGrid, setStoreImageGrid] = useState([])    //업체별 이미지 그리드 아이템들
    const [sortMenu, setSortMenu] = useState(1);                //1:최신순, 2:과거순, 3:업체별
    const [selectVal, setSelectVal] = useState(null);           //위치별 업종별 가격대별 선택 옵션

    useEffect(() => {
        const getItems = async () => {
            await axios.get(`${config.MAIN_URL}/items/grid?sortMenu=1`)
                .then((res) => {
                    let imgArr = []
                    res.data.forEach(element => {
                        imgArr.push({ image : `${config.MAIN_URL}/imges/${element}` })
                    })
                    setImageGridItem(imgArr)
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
        if (menu === 1 || menu === 2) {
            axios.get(`${config.MAIN_URL}/items/grid?sortMenu=${menu}`)     //최신순 또는 과거순
            .then((res) => {
                let imgArr = []
                res.data.forEach(element => {
                    imgArr.push({ image : `${config.MAIN_URL}/imges/${element}` })
                })
                setImageGridItem(imgArr)
            })
            .catch((error) => console.error(error))
        } else if (menu === 3) {                                                    //업체별                              
            axios.get(`${config.MAIN_URL}/items/grid?sortMenu=${menu}`)
            .then((res) => {
                let storeImageGridArr = []
                res.data.forEach(element => {
                    let storeName = element.storeName;
                    let dong = element.dong;
                    let city = element.city;
                    let imgArr = []
                    element.imgArr.forEach(ele => {     
                        imgArr.push({ image : `${config.MAIN_URL}/imges/${ele}` })     
                    })
                    storeImageGridArr.push({ storeName : storeName, dong: dong, city, city, imgArr : imgArr })
                });
                setStoreImageGrid(storeImageGridArr)
            })
            .catch((error) => console.error(error))
        }
    }


    let Grid;
    if(sortMenu != 3){  //최신순 과거순 이미지 그리드
        Grid = <GridImageView data={imageGridItem}/>
    } else {            //업체별 이미지 그리드
        Grid =  <FlatList
                    data={storeImageGrid}
                    style={styles.listScrollViewWrap}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View  key={item.id}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingRight:20, paddingLeft:20, paddingTop:10, paddingBottom:10, backgroundColor:'#fff'}}>
                            <Text>
                                {item.storeName}
                            </Text>
                            <Text>
                                {item.dong} {item.city}
                            </Text>
                            </View>

                            <View>
                                <GridImageView data={item.imgArr} />
                            </View>

                        </View>

                    )}
                />
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" />
            <View style={styles.mainTitle}>
                <View>
                    <Text style={styles.mainTitleSmailText}>이미지 모아보기</Text>
                    <Text style={styles.mainTitleBigText}>랭스타그램</Text>
                </View>
            </View>
            <View style={{...styles.sortMenu, justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={() => listSort(1)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 1 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>최신순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(2)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 2 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>과거순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(3)} style={styles.sortMenuBtn}>
                    <Text style={{ color: sortMenu === 3 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>업체별</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width:'99%', flex : 1 , marginTop:10}}>
                <View style={{ opacity: imageGridItem.length === 0 ? 1 : 0, height: imageGridItem.length === 0 ? '100%' : 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Entypo name="add-to-list" size={40} color='rgba(0, 0, 0, 0.2)' />
                        <Text style={styles.listEmptyTitle}>평가를 남겨주세요.</Text>
                        <Text style={styles.listEmptySub}>남길랭 탭에서 시작하세요.</Text>
                    </View>
                {Grid}
            </View>

            
        </View>
    );
}


