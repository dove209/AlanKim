import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StatusBar, Vibration } from 'react-native';
import * as Notifications from 'expo-notifications'
import Modal from 'react-native-modal';
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import styles from '../../StyleSheet';
import config from '../../config';

export default function EtcHome() {
    const [ isLoading, setIsLoading ] = useState(true)            
    const [ profileImg, setProfileImg] = useState(null);         //프로필 사진 이미지
    const [ isModalVisible, setModalVisible] = useState(false);  //모달창 열림 여부

    useEffect(()=> {
        (async () => {
            let token = (await Notifications.getExpoPushTokenAsync()).data;
            let regExpression = /\[(.*?)\]/g;                   //ExponentPushToken[tokenVal]에서 괄호안 값 추출
            let tokenReg =  regExpression.exec(token)[1];
            await axios.get(`${config.MAIN_URL}/imges/profile/${tokenReg}`)
            .then((res) => {
                if(res.data != false){
                    setProfileImg(`${res.config.url}&randon=${Math.random().toString(36).substring(7)}`)
                }
                setIsLoading(false)
            })
            .catch((err) => console.log(err))
        })()
    },[])

    //프로필 사진 추가
    const addProfileImg = async () => {
        Vibration.vibrate(5)
        setModalVisible(!isModalVisible)
    }

    //카메라 또는 앨범 접근
    const imageCameraLibrary = async (menu) => {
        Vibration.vibrate(5);
        setModalVisible(!isModalVisible);
        let option = {
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        };
        let image = null;
     
        if (menu === 'camera') {
            image = await ImagePicker.launchCameraAsync(option);
        } else if (menu === 'library') {
            image = await ImagePicker.launchImageLibraryAsync(option);
        }
        if (!image.cancelled) {
            const manipResult = await ImageManipulator.manipulateAsync(
                image.localUri || image.uri,
                [{ resize: { width: image.width * 0.7, height: image.height * 0.7 } }],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
            setProfileImg(manipResult.uri)
            let token = await Notifications.getExpoPushTokenAsync();
            let regExpression = /\[(.*?)\]/g;                   //ExponentPushToken[tokenVal]에서 괄호안 값 추출
            let tokenReg =  regExpression.exec(token.data)[1];
            let localUri = manipResult.uri;
            let filename = `${new Date().valueOf()}_${tokenReg}_${localUri.split('/').pop()}`;
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            let formData = new FormData();
            formData.append('photo', { uri: localUri, name: filename, type });

            //프로필 정보 저장
            await axios.post(`${config.MAIN_URL}/imges/profile`, {token: tokenReg, fileName:filename, upTime: moment().format("YYYY-MM-DD hh:mm:ss") })
            .then(res => {
                if (res.data) {
                    console.log('프로필 정보 제출 완료')
                }
            })
            .catch((error) => console.error(error))

            //프로필 이미지 저장
            await fetch(`${config.MAIN_URL}/imges/profile`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then((res) => res.json())
            .then(res => {
                if (res) {
                    console.log('프로필 이미지 파일 제출 완료')
                }
            })
            .catch((error) => console.error(error));

        }
    }
    if (isLoading) {
        return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <StatusBar barStyle="default"/>
            <Text style={styles.questionsTitle}>로딩중...</Text>
            <Text style={styles.questionsContent}>조금만 기다려줘요</Text>
        </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <View style={styles.mainTitle}>
                    <View>
                        <Text style={styles.mainTitleSmailText}>설정</Text>
                        <Text style={styles.mainTitleBigText}>더보기</Text>
                    </View>
                </View>
    
                {/* {profileImgView} */}
                <TouchableOpacity
                    onPress={addProfileImg}
                    style={styles.addProfileImg}>
                    {profileImg ? <Image source={{uri : profileImg}} style={{resizeMode:'cover', width:'100%', height:"100%"}}></Image>
                        : <View style={{alignItems:'center'}}>
                            <AntDesign name="plus" size={27} color="rgba(0, 0, 0, 0.3)" />
                            <Text style={{ color: "rgba(0, 0, 0, 0.3)", marginTop: 10 }}>프로필 추가</Text>
                          </View>
                    }
                </TouchableOpacity>
    
                <Modal
                    // animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setModalVisible(!isModalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#00B2FF" }}
                                onPress={() => imageCameraLibrary('camera')}
                            >
                                <Text style={styles.textStyle}>카메라</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#00B2FF", marginTop: 10 }}
                                onPress={() => imageCameraLibrary('library')}
                            >
                                <Text style={styles.textStyle}>앨범</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#fff", borderWidth: 1, marginTop: 10 }}
                                onPress={() => { setModalVisible(!isModalVisible) }}
                            >
                                <Text style={{ ...styles.textStyle, color: '#000000' }}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    
    
                <View style={{ ...styles.etcBox, marginTop: 40 }}>
                    <Text style={styles.etcBoxTitle}>기획</Text>
                    <Text style={styles.etcBoxCont}>Keepingez0</Text>
                </View>
                <View style={{ ...styles.etcBox, marginTop: 10 }}>
                    <Text style={styles.etcBoxTitle}>제작</Text>
                    <Text style={styles.etcBoxCont}>O_O_zin</Text>
                </View>
            </View>
        )
    }

}