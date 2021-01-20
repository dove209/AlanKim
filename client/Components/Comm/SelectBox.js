import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export default function SelectBox({ boxSelect, selectedBoxIdx, cnt }){
    const boxImgs = [
        require("../../assets/list/list_all_242x254.png"),      //전체개소 비활성
        require("../../assets/list/list_parking_242x254.png"),  //주차개소 비활성
        require("../../assets/list/list_step_242x254.png"),     //정차개소 비활성
        require("../../assets/list/list_waiting_242x254.png"),  //대기개소 비활성
        require("../../assets/list/list_ok_242x254.png"),       //정상개소 비활성
        require("../../assets/list/list_all_245x257.png"),      //전체개소 활성
        require("../../assets/list/list_parking_245x257.png"),  //주차개소 활성
        require("../../assets/list/list_stop_245x257.png"),     //정차개소 활성
        require("../../assets/list/list_waiting_245x257.png"),  //대기개소 활성
        require("../../assets/list/list_ok_245x257.png"),       //정상개소 활성
    ];

    return(
        <View>
            <Image source={boxSelect === selectedBoxIdx ? boxImgs[boxSelect + 5] : boxImgs[boxSelect]} style={styles.status_img} />
            <Text allowFontScaling={false} style={[styles.status_cnt, { left: cnt / 10 >= 1 ? "32%" : "41%" }]}>{cnt}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
        //현장 개소 박스
        status_img: {
            resizeMode: "contain",
            height: width / 5,
            width: width / 5.9
        },
        status_cnt: {
            position: "absolute",
            top: "35%",
            fontSize:  width / 20,
            fontFamily: "NotoSansCJKkr_M",
        },
})