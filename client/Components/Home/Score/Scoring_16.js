import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, BackHandler, Alert, Vibration, Keyboard, Platform, ActivityIndicator, StatusBar} from 'react-native';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AntDesign, Feather } from '@expo/vector-icons';
import StarRating from './StarRating';
import EditComment from './EditComment';
import styles from '../../../StyleSheet';
import config from '../../../config';


export default function Scoring_1({ route, navigation }) {
    const _id = route.params._id;
    const QArr = route.params.QArr;

    const [Q16, setQ16] = useState({
        Q_num: 16,
        Q_score: 1,
        Q_imges: [],
        Q_comment:''
    })

    const maxRating = 10;

    const [isModalVisible, setModalVisible] = useState(false);  //모달창 열림 여부
    const [selectImageIdx, setSelectImageIdx] = useState(null); //썸네일 이미지 선택 번호
    const [isEditComment, setIsEditComment] = useState(false);  //코멘트 편집 창 열림 여부

    const [isLoading, setIsLoading] = useState(false);          //최종 제출 후 로딩중...

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted' ) {
                    alert('카메라 및 앨범 접근을 혀용해 주세요.');
                }
            }
        })();

        const backAction = () => {
            Vibration.vibrate(5) 
            Alert.alert("낙장 불입!",
            "모든 남기기를 끝내겟습니까?", [
                {
                    text: "아니요",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "예", onPress: () => navigation.popToTop() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();

    }, [])

    const goback = () => {
        Vibration.vibrate(5) 
        Alert.alert("낙장 불입!",
        "모든 남기기를 끝내겟습니까?", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            { text: "예", onPress: () => navigation.popToTop() }
        ]);
    }

    //별점 +1
    const onIncrease = () => {
        Vibration.vibrate(5)
        if (Q16.Q_score < maxRating) {
            setQ16({
                ...Q16,
                Q_score: Q16.Q_score + 1
            })
        }
    }
    //별점 -1
    const onDecrease = () => {
        Vibration.vibrate(5)
        if(Q16.Q_score > 1) {
            setQ16({
                ...Q16,
                Q_score: Q16.Q_score - 1
            })
        }
    }

    //별점 선택
    const updateRating = (key) => {
        Vibration.vibrate(5)
        setQ16({
            ...Q16,
            Q_score:key
        })
    }

    //이미지 추가 
    const addImage = () => {
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
            aspect: [4, 3],
            quality: 1,
        };
        let image = null;
        if(Q16.Q_imges.length < 2){
            if(menu === 'camera'){
                image = await ImagePicker.launchCameraAsync(option);
            } else if(menu === 'library'){
                image = await ImagePicker.launchImageLibraryAsync(option);
            }
            if (!image.cancelled) {
                setQ16({
                    ...Q16,
                    Q_imges:[...Q16.Q_imges, image.uri]
                });
              }

        } else {
            alert('이미지 추가는 최대 2장입니다.')
        }
    }

    //이미지 제거
    const deleteImage = () => {
        Vibration.vibrate(5)
        if(Q16.Q_imges.length > 0) {
            setQ16({
                ...Q16,
                Q_imges: Q16.Q_imges.filter(image => image !== Q16.Q_imges[selectImageIdx - 1])
            });
        }
        setSelectImageIdx(null)
    }


    //코멘트 작성하러 가기
    const editComment = () => {
        Vibration.vibrate(5)
        setIsEditComment(true)
    }

    //코멘트 TextInput 값 수정
    const changeComment = (val) => {
        setQ16({
            ...Q16,
            Q_comment : val
        })
    }

    //코멘트 작성 취소
    const cancelEditComment = () => {
        Vibration.vibrate(5)
        Keyboard.dismiss()
        setIsEditComment(false)
    }

    //코멘트 작성 완료
    const submitEditComment = (text) => {
        Vibration.vibrate(5)
        Keyboard.dismiss()
        setIsEditComment(false)
        setQ16({
            ...Q16,
            Q_comment : text
        })
    }

    //코멘트 삭제 
    const deleteComment = () => {
        Vibration.vibrate(5)
        setQ16({
            ...Q16,
            Q_comment : ''
        })
    }

    //질문 모음 제출하기
    const submitQuestion = () => {
        Vibration.vibrate(5)

        Alert.alert("낙장 불입!",
        "제출하시겠습니까?", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            { text: "예", onPress: async () => {
                setIsLoading(true)
                let TotalQArr = [...QArr, Q16]
                for(let i=0; i < TotalQArr.length; i++) {
                    for(let j=0; j < TotalQArr[i].Q_imges.length; j++){
                        let localUri = TotalQArr[i].Q_imges[j];
        
                        let filename = `${new Date().valueOf()}_${_id}_${TotalQArr[i].Q_num}_${localUri.split('/').pop()}`;
        
                        TotalQArr[i].Q_imges[j] = filename;
                        
                        // Infer the type of the image
                        let match = /\.(\w+)$/.exec(filename);
                        let type = match ? `image/${match[1]}` : `image`;
                
                        // Upload the image using the fetch and FormData APIs
                        let formData = new FormData();
                        // Assume "photo" is the name of the form field the server expects
                        formData.append('photo', { uri: localUri, name: filename, type });
                        
                        await fetch(`${config.MAIN_URL}/items/score`, {
                            method: 'PUT',
                            body: formData,
                            headers: {
                                'content-type': 'multipart/form-data',
                            },
                        })
                        .then((res) => res.json())
                        .then( res => {
                            if(res){
                                console.log('사진 제출 완료')
                            }
                        })
                        .catch((error) => console.error(error));
                    }
                }
                
                await axios.put(`${config.MAIN_URL}/items/score`,{ _id:_id, QArr:[...QArr, Q16]})
                .then(res=>{
                    if(res.data){
                        console.log('최종 제출 완료')
                        setIsLoading(false)
                        //최종 점수 페이지로 이동..
                        navigation.navigate("Scoring_finish", {
                            _id: _id
                        })
         
                    }
                })   
                .catch((error) => console.error(error))
            }}
        ]);      
    }

    //이전 질문으로 넘거가기
    const prevQuestion = () => {
        Vibration.vibrate(5)
        Vibration.vibrate(5)
        Alert.alert("해당 질문은 저장되지 않습니다.",
        "그래도 이전으로 이동하시겠습니까?", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            { text: "예", onPress: () => navigation.navigate("Scoring_3") }
        ]);
    }


    let thumbnail = [];
    for (let i = 0; i < Q16.Q_imges.length; i++) {
        thumbnail.push(
            <TouchableOpacity key={i} onPress={() => setSelectImageIdx(i + 1)} style={{ marginLeft: 10, borderRadius: 10, borderWidth: 2, borderColor: selectImageIdx === (i + 1) ? '#00B2FF' : '#E5E5E5' }}>
                <Image style={styles.thumbnail} source={{ uri: Q16.Q_imges[i] }}>
                </Image>
            </TouchableOpacity>)
    }

    if(isLoading){
        return(
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
             <StatusBar barStyle="default"/>
            <ActivityIndicator size="large" color="#00bdff" />
          </View>
        )
    }
    else {
        if (isEditComment) {
            return (
                <EditComment comment={Q16.Q_comment} cancelEditComment={cancelEditComment} submitEditComment={submitEditComment} changeComment={changeComment} />
            )
        } else {
            return (
                <View style={styles.addScoreContainer}>
                    <View style={styles.mainTitle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign onPress={goback} name="arrowleft" size={24} color="rgba(0, 0, 0, 0.3)" />
                        </View>
                    </View>
    
                    <View style={styles.optionsWrap}>
                        {/* 질문 순서 및 카테고리 */}
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.orderNum}>{`${Q16.Q_num}/16`}</Text>
                                <Text style={{ color: '#F11D00', fontWeight: 'bold' }}>맛</Text>
                            </View>
                            <Text style={styles.questionsTitle}>음식 양 어때?</Text>
                            <Text style={styles.questionsContent}>객관적인 양</Text>
                        </View>
    
                        {/* 별점 */}
                        <StarRating defaultRating={Q16.Q_score} maxRating={maxRating} onIncrease={onIncrease} onDecrease={onDecrease} updateRating={updateRating} />
    
                        {/* 이미지 추가 */}
                        <View style={styles.AddWrap}>
                            <View style={styles.width90per}>
                                <Text>이미지</Text>
                                <TouchableOpacity onPress={deleteImage}>
                                    <Feather name="trash-2" size={25} color="rgba(0, 0, 0, 0.3)" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%', marginTop: 5 }}>
                                <TouchableOpacity style={styles.addImageBtn} onPress={addImage}>
                                    <AntDesign name="plus" size={27} color="rgba(0, 0, 0, 0.3)" />
                                    <Text style={{ color: "rgba(0, 0, 0, 0.3)", marginTop: 10 }}>사진추가</Text>
                                </TouchableOpacity>
                                {thumbnail}
    
                            </View>
                        </View>
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
                                        onPress={()=> imageCameraLibrary('camera')}
                                    >
                                        <Text style={styles.textStyle}>카메라</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#00B2FF", marginTop: 10 }}
                                        onPress={()=> imageCameraLibrary('library')}
                                    >
                                        <Text style={styles.textStyle}>앨범</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#fff", borderWidth:1, marginTop: 10 }}
                                        onPress={() => {setModalVisible(!isModalVisible)}}
                                    >
                                        <Text style={{...styles.textStyle, color:'#000000'}}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        {/* 코멘트 추가 */}
                        <View style={styles.AddWrap}>
                            <View style={styles.width90per}>
                                <Text>코멘트</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <AntDesign onPress={editComment} name="edit" size={25} color="rgba(0, 0, 0, 0.3)" style={{ marginRight: 30 }} />
                                    <Feather onPress={deleteComment} name="trash-2" size={25} color="rgba(0, 0, 0, 0.3)" />
                                </View>
                            </View>
                            <Text style={{ width: "95%", marginTop: 10, color: 'rgba(0, 0, 0, 0.3)' }} numberOfLines={4} ellipsizeMode="tail">
                                {Q16.Q_comment}
                            </Text>
                        </View>
                        {/* 이전/다음 버튼 */}
                        <View style={styles.btnWrap}>
                            <View style={styles.width90per}>
                                <TouchableOpacity style={[styles.prevNextBtn, { backgroundColor: 'rgba(196, 196, 196, 0.3)' }]} onPress={prevQuestion}>
                                    <Text style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 18 }}>이전</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.prevNextBtn, { backgroundColor: '#00B2FF' }]} onPress={submitQuestion}>
                                    <Text style={{ color: '#fff', fontSize: 18 }}>제출하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }


}