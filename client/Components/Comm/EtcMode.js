import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Slider, Image, Text, Dimensions, Alert, BackHandler, Platform, ActivityIndicator, StatusBar } from 'react-native';


const MAIN_URL = "http://alt-a.iptime.org:5000";
const { width, height } = Dimensions.get('window');


export default function EtcModeScreen({ route, navigation }) {
    const { insNo } = route.params;

    //다시 시작 버튼 클릭시
    const rebootClick = () => {
        Alert.alert(
            '시스템을 다시 시작 하시겠습니까?',
            '[아니요] 클릭 시 적용되지 않습니다',
            [
                { text: '아니요', style: 'cancel' },
                { text: '적용', onPress: () => [this.deviceReboot(), alert("적용 완료")] },
            ],
            { cancelable: false },
        );
    }

    //테스트 모드 버튼 클릭시
    const testmodeClick = () => {
        Alert.alert(
            '테스트 모드를 시작 하시겠습니까?',
            '[아니요] 클릭 시 적용되지 않습니다',
            [
                { text: '아니요', style: 'cancel' },
                { text: '적용', onPress: () => [this.deviceTest(), alert("적용 완료")] },
            ],
            { cancelable: false },
        );
    }

    //Reboot|00 보내기
    const deviceReboot = () => {
        fetch(`${MAIN_URL}/device_reboot`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmd: 'Reboot|00',
                ins_no: insNo,
            }),
        })
            .then(function (res) {
                if (res) {
                    alert('시스템 다시 시작 완료.')
                    navigation.goBack()
                } else {
                    alert('의도치 않은 에러가 발생하였습니다. 담당자에게 문의주시기 바랍니다.')
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    //Test|Ip 보내기
    const deviceTest = () => {
        fetch(`${MAIN_URL}/device_test`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmd: 'Test|Ip',
                ins_no: insNo,
            }),
        })
            .then(function (res) {
                if (res) {
                    alert('테스트 모드로 변경되었습니다.')
                    navigation.goBack()
                } else {
                    alert('의도치 않은 에러가 발생하였습니다. 담당자에게 문의주시기 바랍니다.')
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", width: "85%", marginLeft: -30 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                        <Image source={require('../../assets/gaeso_setting/setting_back_33x54.png')} style={{ resizeMode: "contain", width: 13, height: 13 }}></Image>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={{ marginLeft: 10, fontSize: width / 20, fontFamily: "NotoSansCJKkr_M" }}>기타 설정</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.etcbox}>
                    <Image source={require('../../assets/gaeso_setting/setting_etc_icon_182x182.png')} style={{ resizeMode: "contain", width: 50, height: 50 }}></Image>
                    {/* 다시 시작 */}
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 40 }}>
                        <Image source={require('../../assets/gaeso_setting/setting_startover_icon_118x118.png')} style={styles.setting_icon}></Image>
                        <View style={{ marginLeft: 10 }}>
                            <Text allowFontScaling={false} style={styles.setting_title}>다시 시작</Text>
                            <Text allowFontScaling={false} style={styles.setting_subtitle}>전 시스템 재시작</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={rebootClick} style={styles.btn}>
                        <Text allowFontScaling={false} style={{ fontSize: width / 25, color: "#000", fontFamily: "NotoSansCJKkr_R" }}>다시 시작</Text>
                    </TouchableOpacity>
                    <View style={{ height: 1, width: width * 0.8, marginTop: 20, backgroundColor: "#dedede" }}></View>
                    {/* 테스트 모드 */}
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 20 }}>
                        <Image source={require('../../assets/gaeso_setting/setting_test_icon_118x418.png')} style={styles.setting_icon}></Image>
                        <View style={{ marginLeft: 10 }}>
                            <Text allowFontScaling={false} style={styles.setting_title}>테스트 모드</Text>
                            <Text allowFontScaling={false}  style={styles.setting_subtitle}>연결 장치 및 시스템 테스트</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={testmodeClick} style={styles.btn}>
                        <Text allowFontScaling={false} style={{ fontSize:  width / 25, color: "#000", fontFamily: "NotoSansCJKkr_R" }}>테스트 모드</Text>
                    </TouchableOpacity>
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
    section: {
        height: "90%",
        width: "100%",
        borderTopColor: "#cccccc",
        borderTopWidth: 1,
        paddingTop: "5%",
        alignItems: "center",
    },
    etcbox: {
        backgroundColor: "#fff",
        borderRadius: 8,
        height: "91%",
        width: "90%",
        alignItems: "center",
        padding: 30,
    },
    setting_icon: {
        resizeMode: "contain",
        width: 35,
        height: 35
    },
    setting_title: {
        fontSize: width / 24, fontFamily: "NotoSansCJKkr_M"
    },
    setting_subtitle: {
        fontSize: width / 30, marginTop: -17, color: "#a4a4a4", fontFamily: "NotoSansCJKkr_R" 
    },
    btn: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 6,
        marginTop: 12,
        alignItems: "center",
        justifyContent: "center"
    }
});