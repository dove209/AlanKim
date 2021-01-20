import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Dimensions, Alert } from 'react-native';

const MAIN_URL = "http://alt-a.iptime.org:5000";
const { width, height } = Dimensions.get('window');

export default function SystemMode({ route, navigation }) {
    const { insNo } = route.params;
    const cctvNo = 1;
    const [initMode, setInitMode] = useState('');      //초기 모드
    const [upTime, setUpTime] = useState('');          //모드 변경 시간
    const [changeMode, setChangeMode] = useState('');   //변경된 모드
    const [submit, setSubmit] = useState(false);        //적용 버튼 활성/비활성
    const btnImges = [
        require('../../assets/gaeso_setting/uncehck_76x76.png'),
        require('../../assets/gaeso_setting/cehck_76x76.png')
    ]

    useEffect(() => {
        const getModeInfo = async () => {
            await fetch(`${MAIN_URL}/ins_mode`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ins_no: insNo,
                    cctv_no: cctvNo
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setInitMode(res[0].MODE);
                    setChangeMode(res[0].MODE);
                    setUpTime(res[0].START_TIME);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        getModeInfo();
    }, [])


    //변경 모드 선택
    const modeChange = (menuNum) => {
        if (menuNum == 1) {
            setChangeMode('de');
        } else if (menuNum == 2) {
            setChangeMode('no');
        } else if (menuNum == 3) {
            setChangeMode('re');
        }
    };
    useEffect(() => {
        if (initMode != changeMode) {
            setSubmit(true)
        } else {
            setSubmit(false)
        }
    }, [changeMode])

    //적용버튼 클릭
    const submitClick = () => {
        if (submit) {
            let mode = ""
            if (changeMode === "no") {
                mode = "대기 모드"
            } else if (changeMode === "de") {
                mode = "감지 모드"
            } else {
                mode = "녹화 모드"
            }
            Alert.alert(
                '모드 설정',
                mode + '로 변경 하시겠습니까?',
                [
                    { text: '취소', style: 'cancel' },
                    { text: '적용', onPress: () => deviceControl(mode) },
                ],
                { cancelable: false },
            );
        }
    }

    //변경 모드 보내기
    const deviceControl = (mode) => {
        fetch(`${MAIN_URL}/modeControl`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmd: {
                    mode: mode,
                },
                ins_no: insNo,
                cctv_no: cctvNo
            }),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                if (res) {
                    alert('시스템 모드가 변경되었습니다.')
                    navigation.goBack()
                } else {
                    alert('의도치 않은 에러가 발생하였습니다. 담당자에게 문의주시기 바랍니다.')
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", width: "85%", marginLeft: -30 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                        <Image source={require('../../assets/gaeso_setting/setting_back_33x54.png')} style={{ resizeMode: "contain", width: 13, height: 13 }}></Image>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={{ marginLeft: 10, fontSize: width / 20, fontFamily: "NotoSansCJKkr_M" }}>시스템 모드</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.modebox}>
                    <Image source={require('../../assets/gaeso_setting/setting_system_icon.png')} style={{ resizeMode: "contain", width: 50, height: 50 }}></Image>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ marginTop: 15, fontSize: width / 25, fontFamily: "NotoSansCJKkr_R" }}>현재 시스템 상태</Text>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ color: "#00b222", fontSize: width / 15, fontFamily: "NotoSansCJKkr_M", marginTop: -30 }}>
                        {initMode == "de" ? "감지모드" : initMode == "no" ? "대기모드" : "녹화모드"}
                    </Text>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ marginTop: -25, fontSize: width / 28, color: "#a4a4a4", fontFamily: "NotoSansCJKkr_R" }}>{upTime}</Text>
                    <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center", justifyContent: "center", width: "90%" }}>
                        <View style={styles.mode_item}>
                            <Text allowFontScaling={false} numberOfLines={1} style={styles.mode_item_title}>감 지</Text>
                            <Text allowFontScaling={false} numberOfLines={1} style={styles.mode_item_sub}>시스템 작동 모드</Text>
                            <TouchableOpacity onPress={() => modeChange(1)} style={styles.mode_item_btn}>
                                <Image source={changeMode == "de" ? btnImges[1] : btnImges[0]} style={styles.mode_item_btn_img}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bar}></View>
                        <View style={styles.mode_item}>
                            <Text allowFontScaling={false} numberOfLines={1} style={styles.mode_item_title}>대 기</Text>
                            <Text allowFontScaling={false} numberOfLines={1} style={styles.mode_item_sub}>설정 가능 모드</Text>
                            <TouchableOpacity onPress={() => modeChange(2)} style={styles.mode_item_btn}>
                                <Image source={changeMode == "no" ? btnImges[1] : btnImges[0]} style={styles.mode_item_btn_img}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bar}></View>
                        <View style={styles.mode_item}>
                            <Text allowFontScaling={false} numberOfLines={1} style={styles.mode_item_title}>녹 화</Text>
                            <Text allowFontScaling={false} numberOfLines={1} style={styles.mode_item_sub}>현장 녹화 모드</Text>
                            <TouchableOpacity onPress={() => modeChange(3)} style={styles.mode_item_btn}>
                                <Image source={changeMode == "re" ? btnImges[1] : btnImges[0]} style={styles.mode_item_btn_img}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={submitClick} style={[styles.submit_btn, { backgroundColor: submit == false ? "#dedede" : "#00b222" }]}>
                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: width / 20, color: "#fff", fontFamily: "NotoSansCJKkr_R" }}>적 용</Text>
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
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        paddingTop: "5%",
        alignItems: "center",
    },
    modebox: {
        paddingTop: 30,
        backgroundColor: "#fff",
        borderRadius: 10,
        height: "87%",
        width: "90%",
        alignItems: "center",
        padding: 10,
    },
    bar: {
        width: 1,
        height: "50%",
        backgroundColor: "#cccccc",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8
    },
    mode_item: {
        alignItems: "center",
        width: "30%"
    },
    mode_item_title: {
        fontSize: width / 25,
        fontFamily: "NotoSansCJKkr_B"
    },
    mode_item_sub: {
        marginTop: -15,
        fontSize: width / 36,
        color: "#7c7c7c",
        fontFamily: "NotoSansCJKkr_R"
    },
    mode_item_btn: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    mode_item_btn_img: {
        resizeMode: "contain",
        width: 22,
        height: 22
    },
    submit_btn: {
        width: "95%",
        height: 50,
        borderRadius: 6,
        marginTop: 45,
        alignItems: "center",
        justifyContent: "center"
    }
});