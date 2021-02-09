import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, Alert, StatusBar, Vibration, ActivityIndicator } from 'react-native';
import config from '../../config';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../StyleSheet';


export default function ScoreDetailInfo({ route, navigation }) {
    const item = route.params.item
    console.log(item)

    const goback = () => {
        navigation.navigate("ScoreDetail")
    }
    
    return (
        <View style={styles.addListContainer}>
           <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign onPress={goback} name="arrowleft" size={24} color="rgba(0, 0, 0, 0.3)" />
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>상세내역</Text>
                </View>
                {/* 질문 리스트 */}
                <View style={{...styles.row, marginTop:10}}>
                    <Text style={{...styles.grayColor, width:"10%"}}>순서</Text>
                    <Text style={{...styles.grayColor, width:"25%"}}>질문</Text>
                    <Text style={{...styles.grayColor, width:"15%"}}>평가</Text>
                    <Text style={{...styles.grayColor, width:"10%"}}>점수</Text>
                    <Text style={{...styles.grayColor, width:"15%"}}>이미지</Text>
                    <Text style={{...styles.grayColor, width:"15%"}}>코멘트</Text>
                </View>
                <FlatList
                    data={item.QArr}
                    style={{height:"100%"}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <QuestionItem key={index} item={item}> </QuestionItem>
                    )}
                />
            </View>
        </View>
    );
}

function QuestionItem({ item, index }) {
    const weightVal = [4, 3, 3, 2, 2, 2, 4, 3, 1, 2, 2, 2, 4, 8, 4, 4]  //질문 점수 가중치
    return(
        <View style={{...styles.row, paddingTop:10, paddingBottom:10, borderBottomColor:"#dedede", borderBottomWidth:1}}>
        <View style={{...styles.row, justifyContent:'flex-start', width:'10%'}}>
            <View style={{width:10, height:20, marginRight:5, backgroundColor: item.Q_num === 1 || item.Q_num === 2 ||  item.Q_num === 3  ? '#0070C0' 
                : item.Q_num === 4 || item.Q_num === 7 || item.Q_num === 11 || item.Q_num === 12 ? '#92D050'
                : item.Q_num === 5 || item.Q_num === 6 || item.Q_num === 8 || item.Q_num === 9 || item.Q_num === 10 ? '#FFC000' 
                : '#F11D00'}}>
            </View>
            <Text style={{color:'rgba(0, 0, 0, 0.6)'}}>{item.Q_num}</Text>
        </View>
        <View style={{width:'25%'}}>
            <Text numberOfLines={1} style={{color:'rgba(0, 0, 0, 0.6)', fontSize:12}}>{config.question[Number(item.Q_num) - 1]}</Text>
        </View>
        <View style={{width:'15%',alignItems:'center'}}>
            <Text style={{color: item.Q_score <= 4 ? '#BD0000' : item.Q_score <= 6 ? '#A4A4A4' : '#169D00', fontSize:12, fontWeight:'bold'}}>
                {item.Q_score <= 2 ? '매우불만' : item.Q_score <= 4 ? '불만' : item.Q_score <= 6 ? '보통' : item.Q_score <= 8 ? '만족' : '매우만족'}
            </Text>
        </View>
        <View style={{width:'10%',alignItems:'center'}}>
            <Text style={{color:'rgba(0, 0, 0, 0.6)', fontSize:12}}>{item.Q_score * weightVal[Number(item.Q_num) - 1]}/{weightVal[Number(item.Q_num) - 1] * 10}</Text>
        </View>
        <TouchableOpacity style={{width:'15%',alignItems:'center'}}>
            <AntDesign name="camera" size={24} color={(item.Q_imges).length != 0 ? '#00B2FF' : 'rgba(0, 0, 0, 0.05)' } />
        </TouchableOpacity>
        <TouchableOpacity style={{width:'15%',alignItems:'center'}}>
            <MaterialCommunityIcons name="message-text" size={24} color={item.Q_comment != '' ? '#00B2FF' : 'rgba(0, 0, 0, 0.05)'} />
        </TouchableOpacity>
    </View>
    )
}