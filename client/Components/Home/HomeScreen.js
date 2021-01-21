import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Button, Text, ScrollView, RefreshControl, FlatList } from 'react-native';
import axios from 'axios';
import { AntDesign, Feather, Entypo} from '@expo/vector-icons';
import styles from '../../StyleSheet';
import config from '../../config';
import PickerScreen from './picker';

export default function HomeScreen({ navigation }) {
    const [items, setItems] = useState([]);
    const [sortMenu, setSortMenu] = useState(1);
    const [isSelectBox, setIsSelectBox] = useState(false);
    const [refreshing, setRefresing] = useState(false);

    useEffect(() => {
        const getItems = async() => {
            await axios.get(`${config.MAIN_URL}/items`)
            .then((res) => {
                setItems(res.data);
            })
            .catch((error) => console.error(error))
        }
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log("focus되었을때!!");
            getItems();
        });

        return unsubscribe;
    }, [navigation])


    const listSort = (menu) => {
        setSortMenu(menu)
        if (menu === 3 || menu === 4 || menu === 5) {
            setIsSelectBox(true)
        } else {
            setIsSelectBox(false)
        }
    }
    //남기기 클릭
    const addList = () => {
        navigation.navigate("AddListScreen")
    }

    //ScrollView 다운시 새로고침
    const onRefresh = () => {
        setRefresing(true)
        axios.get(`${config.MAIN_URL}/items`)
        .then((res) => {
            setItems(res.data);
            setRefresing(false);
        })
        .catch((error) => console.error(error))
    }


    return (
        <View style={styles.container}>
            <View style={styles.mainTitle}>
                <View>
                    <Text style={styles.mainTitleSmailText}>오늘은 어디를</Text>
                    <Text style={styles.mainTitleBigText}>남길랭?</Text>
                </View>
                <AntDesign onPress={addList} name="pluscircle" size={30} color="#00B2FF" />
            </View>
            <View style={styles.sortMenu}>
                <TouchableOpacity onPress={() => listSort(1)}>
                    <Text style={{ color: sortMenu === 1 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>최신순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(2)}>
                    <Text style={{ color: sortMenu === 2 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>과거순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(3)}>
                    <Text style={{ color: sortMenu === 3 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>위치별</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(4)}>
                    <Text style={{ color: sortMenu === 4 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>업종별</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => listSort(5)}>
                    <Text style={{ color: sortMenu === 5 ? '#00B2FF' : 'rgba(0, 0, 0, 0.2)' }}>가격대별</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.selectBox, { opacity: isSelectBox ? 1 : 0, height: isSelectBox ? 50 : 0 }]}>
                <Text>{sortMenu === 3 ? '광역시·도' : sortMenu === 4 ? '업종' : '가격대별'}</Text>
                {isSelectBox ? <PickerScreen sortMenu={sortMenu}></PickerScreen> : null}
            </View>

            <View style={styles.homeList}>
                <View style={{ opacity: items.length === 0 ? 1 : 0, height: items.length === 0 ? '100%' : 0, justifyContent:'center', alignItems:'center'}}>
                    <Entypo name="add-to-list" size={40} color='rgba(0, 0, 0, 0.2)' />
                    <Text style={styles.listEmptyTitle}>리스트를 추가해주세요.</Text>
                    <Text style={styles.listEmptySub}>우측 상단 리스트등록 클릭</Text>
                </View>
                <FlatList
                    data={items}
                    style={styles.listScrollViewWrap}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item, index }) => (
                        <View key={item.id} style={[styles.listItemWrap, { marginTop: index == 0 ? 0 : 10 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.itemSmallText}>{item.upTime}</Text>
                                    <Text style={styles.itemStoreName}>{item.storeName}</Text>
                                    <Text style={styles.itemStoreAddress}>{item.dong} {item.city}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10}}>
                                        <Text style={styles.itemSmallText}>{item.storeType}</Text>
                                        <Text style={styles.itemSmallText}>{item.price}</Text>
                                        <Text style={styles.itemSmallText}>주차{item.isParking}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <AntDesign name="edit" size={30} color="rgba(0, 0, 0, 0.3)"  style={{marginRight:30}}/>
                                        <Feather name="trash-2" size={30}  color="rgba(0, 0, 0, 0.3)" />
                                    </View>
                                    <TouchableOpacity style={styles.itemMarkStartBtn} onPress={() => alert(item._id)}>
                                        <Text style={{color:'#fff'}}>시작하기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}