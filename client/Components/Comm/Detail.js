import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import SettingBox from './SettingBox';


const MAIN_URL = "http://alt-a.iptime.org:5000";
const { width, height } = Dimensions.get('window');


export default function DetailScreen({ route, navigation }) {
    const { insNo, address, dong, uptime, opLog, parkingStatus } = route.params;
    const cctvImgUrl = `${MAIN_URL}/imgs?ins_no=${insNo}`;
    const cctvSmallimgUrl = `${MAIN_URL}/small_imgs?ins_no=${insNo}`;

    const [mode, setMode] = useState('');
    const [cctvNo, setCctvNo] = useState(1);
    const [spVol, setSpVol] = useState(0);              //스피커 볼륨
    const [detectTime, setdetectTime] = useState(0);    //감지시간

    const swiperRef = useRef();

    useEffect(()=> {
        setCctvNo(route.params.cctvNo);
        const getInsNoInfo = async() => {
            Promise.all([
            await fetch(`${MAIN_URL}/sl_setting`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ins_no: insNo,
                    cctv_no: cctvNo,
                }),
            }),
            await fetch(`${MAIN_URL}/ins_mode`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ins_no: insNo,
                    cctv_no: cctvNo,
                }),
            }),
        ])
        .then(([res1, res2]) => {
            return Promise.all([res1.json(), res2.json()])
        })
        .then(([res1, res2]) => {
            setSpVol(parseInt(res1[0].p_vol)),
            setdetectTime(parseInt(res1[0].detect_time)),
            setMode(res2[0].MODE)
        })
        .catch((error) => {
            console.error(error);
        });
       }
       getInsNoInfo()
    },[])


    //CCTV화면 변경(모드, 기기설정값 불러오기)
    const changeCCTV = async (index) => {
       
        Promise.all([
            await fetch(`${MAIN_URL}/sl_setting`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ins_no: insNo,
                    cctv_no: 1  //추후 변경
                }),
            }),
            await fetch(`${MAIN_URL}/ins_mode`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ins_no: insNo,
                    cctv_no: 1 //추후 변경
                }),
            })
        ])
        .then(([res1, res2]) => {
            return Promise.all([res1.json(), res2.json()])
        })
        .then(([res1, res2]) => {
            setSpVol( parseInt(res1[0].p_vol)),
            setdetectTime( parseInt(res1[0].detect_time)),
            setMode(res2[0].MODE)
            setCctvNo(index + 1)
        })
        .catch((error) => console.error(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", width: "90%"}}>
                    <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.backArrow}>
                        <Image source={require('../../assets/gaeso_setting/setting_back_33x54.png')} style={{ resizeMode: "contain", width: 13, height: 13 }}></Image>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.title}>개소 설정</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={{ flexDirection: "row", alignItems: "center"}}>
                    <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.insNo}>{insNo}</Text>
                    <Text allowFontScaling={false} style={{
                        marginTop: -15, borderWidth: 1.5, fontFamily: "NotoSansCJKkr_M", borderColor: parkingStatus == 'parking' ? '#cc130a'
                            : parkingStatus == 'stop' ? '#e27e1a'
                                : parkingStatus == 'wait' ? '#adadad'
                                    : parkingStatus == 'old' ? '#000'
                                        : '#037716'
                        , height: 33, lineHeight: 33, width: width / 7, borderRadius: 6, fontSize: width / 18, textAlign: "center", marginLeft: 10, color: "#fff",
                        backgroundColor: parkingStatus == 'parking' ? 'red'
                            : parkingStatus == 'stop' ? 'orange'
                                : parkingStatus == 'wait' ? '#dedede'
                                    : parkingStatus == 'old' ? '#000'
                                        : '#00b222'
                    }}>
                        {parkingStatus == 'parking' ? '주차'
                            : parkingStatus == 'stop' ? '정차'
                                : parkingStatus == 'wait' ? '대기'
                                    : parkingStatus == 'old' ? '미교체'
                                        : '정상'}
                    </Text>
                </View>
                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.address}>{dong} {address}</Text>
                <Swiper
                    showsButtons={false}
                    showsPagination={true}
                    dot={<View style={[styles.swiperDot, { backgroundColor: 'rgba(255,255,255,.2)'}]} />}
                    activeDot={<View style={[styles.swiperDot, { backgroundColor: 'rgba(255,255,255,.8)'}]} />}
                    paginationStyle={{ bottom: 10,}}
                    loop={false}
                    ref={swiperRef}
                    index={cctvNo - 1}
                    onIndexChanged={(index) => changeCCTV(index)}
                >
                    <Image source={{uri: `${cctvImgUrl}&randon=${Math.random().toString(36).substring(7)}` }} style={styles.cctvImg}></Image>
                    <Image source={{uri: `${cctvImgUrl}&randon=${Math.random().toString(36).substring(7)}` }} style={styles.cctvImg}></Image>
                </Swiper>
                <Image source={{ uri: `${cctvSmallimgUrl}&randon=${Math.random().toString(36).substring(7)}` }} style={styles.cctvSmallImg}></Image>

                {/* 주정차 현황 */}
                <View style={styles.parking_wrap}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text allowFontScaling={false} style={styles.timeTitle}>{parkingStatus == 'parking' ? '입차' : '출차'}</Text>
                        <Text allowFontScaling={false} style={styles.time}>{uptime}</Text>
                    </View>
                    <View style={{ backgroundColor: "#a4a4a4", width: 1, height: 12 }}></View>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text allowFontScaling={false} style={styles.timeTitle}>통신</Text>
                        <Text allowFontScaling={false} style={styles.time}>{opLog}</Text>
                    </View>
                </View>

                {/* 기기 설정 버튼 */}
                <View style={styles.setting_wrap}>
                    <SettingBox idx={0} insNo= {insNo} title={'시스템 모드'} content={mode == "no" ? "대기모드" : mode == "de" ? "감지모드" : mode == "re" ? "녹화모드" : ""} navigation={navigation} ></SettingBox>
                    <View style={{ width: "95%", height: 1, backgroundColor: "#dedede" }}></View>
                    <SettingBox idx={1} insNo= {insNo} title={'장치 설정'} content={`감지 시간 ${detectTime}, 볼륨 ${spVol}`} navigation={navigation}></SettingBox>
                    <View style={{ width: "95%", height: 1, backgroundColor: "#dedede" }}></View>
                    <SettingBox idx={2} insNo= {insNo} title={'기타 설정'} content={""} navigation={navigation}></SettingBox>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f8"
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.08,
    },
    backArrow: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        marginLeft: 10,
        fontSize: width / 20,
        fontFamily: "NotoSansCJKkr_M"
    },
    section: {
        paddingTop:  60,
        height: "90%",
        width: "100%",
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    insNo: {
        marginTop: -15,
        width:  width / 7,
        height:  width / 10.5,
        borderWidth: 1.5,
        borderRadius: 6,
        borderColor: "#dddddd",
        textAlign: "center",
        lineHeight:  width / 11,
        fontSize:  width / 15,
        fontFamily: "NotoSansCJKkr_B"
    },
    address: {
        textAlign: "center",
        fontFamily: "NotoSansCJKkr_B",
        width: "80%",
        fontSize: width / 20,
        marginTop: -5,
    },
    parking_wrap: {
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        height: "10%",
        marginTop: -5
    },
    swiperDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3 
    },
    cctvImg: {
        resizeMode: "contain",
        width: "90%",
        height: "100%",
        borderRadius: 6,
        alignSelf:"center",
    },
    cctvSmallImg: {
        position: "absolute",
        right: 20,
        resizeMode: "cover",
        width: 200,
        height: 100,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 5
    },
    timeTitle: {
        fontSize: width / 30,
        fontFamily: "NotoSansCJKkr_R",
        color: "#a4a4a4"
    },
    time:{
        fontSize: width / 29,
        marginLeft: 5,
        fontFamily: "NotoSansCJKkr_R",
        color: "#444444"
    },
    setting_wrap: {
        width: "90%",
        height: "35%",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: -2,
        alignItems: "center",
    },

});