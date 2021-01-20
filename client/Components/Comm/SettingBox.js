import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, AsyncStorage } from "react-native";
const { width, height } = Dimensions.get('window');
const MAIN_URL = "http://alt-a.iptime.org:5000";


export default function SettingBox({ idx, insNo, title, content, navigation }){
    const [loginedId, setLoginId] = useState('');

    useEffect(()=> {
        //로그인된 아이디 불러오기
        AsyncStorage.getItem("LOGINED_ID", (err, value) => {
            if (err == null) {
                setLoginId(value)
           }
       });
    },[]);

    const moveDetailSettig = async(idx) => {
        let natigate = ''
        if(idx === 0){
            natigate = 'SystemModeScreen'
        }else if(idx === 1){
            natigate = 'SLSettingScreen'
        }else if (idx === 2){
            natigate = 'EtcModeScreen'
        }
        await fetch(`${MAIN_URL}/user_auth`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: loginedId,
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            let userAuth = res[0].authority;
            if (userAuth === 'admin') {
                navigation.navigate(natigate, {insNo : insNo})
            } else {
                alert('해당 기능은 관리자 권한일 경우에 사용 가능합니다.')
            }
        })
        .catch((error) => console.error(error))
    }


    return(
        <TouchableOpacity style={styles.setting_item} onPress={()=> moveDetailSettig(idx)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: (Platform.OS === 'ios') ? width / 20 : width / 24, marginLeft: 8, fontFamily: "NotoSansCJKkr_M" }}>{title}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{ color: "#00b222", fontFamily: "NotoSansCJKkr_M" }}>{content}</Text>
                <Image source={require('../../assets/list/list_moer_25x42.png')} style={{ marginLeft: 10, resizeMode: "contain", width: 12, height: 12 }}></Image>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    setting_item: {
        paddingLeft: 10,
        paddingRight: 10,
        width: "95%",
        height: "33%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})