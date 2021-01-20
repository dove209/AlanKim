import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Slider, Image, Text, Dimensions, Alert } from 'react-native';

const MAIN_URL = "http://alt-a.iptime.org:5000";
const { width, height } = Dimensions.get('window');

export default function SLSettingScreen({ route, navigation }) {
    const { insNo } = route.params;
    const cctvNo = 1;
    const [threshold, setThreshold] = useState(10);     //감지 시간(10 ~ 60)
    const [volume, setVolume] = useState(1);            //스피커 볼륨(1 ~ 30)
    const [submit, setSubmit] = useState(false);        //적용 버튼 활성/비활성
    const thresholdMin = 10;
    const thresholdMax = 60;
    const volumeMin = 1;
    const volumeMax = 30;

    useEffect(() => {
        const getSLsettingInfo = async () => {
            await fetch(`${MAIN_URL}/sl_setting`, {
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
                    setThreshold(parseInt(res[0].detect_time)),
                        setVolume(parseInt(res[0].p_vol))
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        getSLsettingInfo();
    }, [])

    //감지 시간 설정
    const changeThreshold = (value) => {
        if (value >= thresholdMin && value <= thresholdMax) {
            setThreshold(parseInt(value));
            setSubmit(true);
        }
    }

    //볼륨 설정
    const changeVolume = (value) => {
        if (value >= volumeMin && value <= volumeMax) {
            setThreshold(parseInt(value));
            setSubmit(true);
        }
    }

    //적용버튼 클릭
    const submitClick = () => {
        if (submit) {
            Alert.alert(
                '장치 설정',
                '장치 설정 변경 하시겠습니까?',
                [
                    { text: '취소', style: 'cancel' },
                    { text: '적용', onPress: () => [this.deviceControl(threshold, volume)] },
                ],
                { cancelable: false },
            );
        }
    }

    //감지 임계값, 스피커 볼륨 값 보내기
    const deviceControl = (threshold, volume) => {
        fetch(`${MAIN_URL}/devControl`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmd: {
                    threshold: threshold,
                    volume: volume,
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
                    alert('장치 설정이 변경되었습니다.')
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
                    <Text allowFontScaling={false} style={{ marginLeft: 10, fontSize: width / 20, fontFamily: "NotoSansCJKkr_M" }}>장치 설정</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.SLBox}>
                    <Image source={require('../../assets/gaeso_setting/setting_device_icon_182x182.png')} style={{ resizeMode: "contain", width: 50, height: 50 }}></Image>
                    {/* 감지 시간 설정 */}
                    <View style={{ width: "100%", marginTop: 30, }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                            <Image source={require('../../assets/gaeso_setting/setting_time_icon_118x118.png')} style={styles.setting_icon}></Image>
                            <View style={{ width: "55%" }}>
                                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.setting_title}>감지 시간</Text>
                                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.setting_subtitle}>감지 시 임계값 수치 설정</Text>
                            </View>
                            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.val_text}>{threshold < thresholdMin ? thresholdMin : threshold > thresholdMax ? thresholdMax : String(threshold)}</Text>
                        </View>
                        <View style={styles.slider_wrap}>
                            <TouchableOpacity onPress={() => changeThreshold(threshold - 1)} ><Text allowFontScaling={false} style={styles.slider_btn}>-</Text></TouchableOpacity>
                            <Slider
                                step={1}
                                minimumValue={thresholdMin}
                                maximumValue={thresholdMax}
                                onValueChange={(value) => { setThreshold(value), setSubmit(true) }}
                                value={threshold}
                                minimumTrackTintColor="#00b222"
                                thumbTintColor="#00b222"
                                style={{ width: "75%", }}
                            />
                            <TouchableOpacity onPress={() => changeThreshold(threshold + 1)}><Text allowFontScaling={false} style={styles.slider_btn}>+</Text></TouchableOpacity>
                        </View>

                        <View style={{ height: 1, width: width * 0.8, marginTop: 20, backgroundColor: "#dedede", alignSelf: "center" }}></View>

                        {/* 스피커 볼륨 설정 */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 20 }}>
                            <Image source={require('../../assets/gaeso_setting/setting_volume_icon_118x118.png')} style={styles.setting_icon}></Image>
                            <View style={{ width: "55%" }}>
                                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.setting_title}>볼륨</Text>
                                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.setting_subtitle}>스피커 볼륨 조절</Text>
                            </View>
                            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={styles.val_text}>{volume < volumeMin ? volumeMin : volume > volumeMax ? volumeMax : String(volume)}</Text>
                        </View>
                        <View style={styles.slider_wrap}>
                            <TouchableOpacity onPress={() => changeVolume(volume - 1)}><Text allowFontScaling={false} style={styles.slider_btn}>-</Text></TouchableOpacity>
                            <Slider
                                step={1}
                                minimumValue={volumeMin}
                                maximumValue={volumeMax}
                                onValueChange={(value) => { setVolume(value), setSubmit(true) }}
                                value={volume}
                                minimumTrackTintColor="#00b222"
                                thumbTintColor="#00b222"
                                thumbTintb
                                style={{ width: "75%", }}
                            />
                            <TouchableOpacity onPress={() => changeVolume(volume + 1)}><Text allowFontScaling={false} style={styles.slider_btn}>+</Text></TouchableOpacity>
                        </View>
                    </View>

                    {/* 적용 버튼 */}
                    <TouchableOpacity onPress={submitClick} style={[styles.submit_btn, { backgroundColor: submit ? "#00b222" : "#dedede" }]}>
                        <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: width / 20, color: "#fff", fontFamily: "NotoSansCJKkr_R" }}>적 용</Text>
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
        borderTopColor: "#dedede",
        borderTopWidth: 1,
        paddingTop: "5%",
        alignItems: "center",
    },
    SLBox: {
        paddingTop: 30,
        backgroundColor: "#fff",
        borderRadius: 10,
        height: "100%",
        width: "90%",
        alignItems: "center",
        padding: 10,
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
    val_text: {
        width: 47,
        height: 30,
        lineHeight: 39,
        borderColor: "#cccccc",
        borderRadius: 5,
        borderWidth: 1,
        textAlign: "center",
        fontSize: width / 22,
        fontFamily: "NotoSansCJKkr_M"
    },
    slider_wrap: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 15
    },
    slider_btn: {
        fontSize: 35, width: 30, textAlign: "center", marginTop: -7.5
    },
    submit_btn: {
        width: "95%", height: 50, borderRadius: 6, marginTop: 30, alignItems: "center", justifyContent: "center"
    }
});