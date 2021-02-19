import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, BackHandler, Alert, Vibration, Keyboard, Platform } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { AntDesign, Feather } from '@expo/vector-icons';
import StarRating from './StarRating';
import EditComment from './EditComment';
import styles from '../../../StyleSheet';
import config from '../../../config';



export default function Scoring_3({ route, navigation }) {
    const _id = route.params._id;
    const QArr = route.params.QArr;

    const [Q3, setQ3] = useState({
        Q_num: 3,
        Q_score: 1,
        Q_imges: [],
        Q_comment: ''
    })

    const maxRating = 10;

    const [isModalVisible, setModalVisible] = useState(false);  //모달창 열림 여부
    const [selectImageIdx, setSelectImageIdx] = useState(null); //썸네일 이미지 선택 번호
    const [isEditComment, setIsEditComment] = useState(false);  //코멘트 편집 창 열림 여부


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('카메라 및 앨범 접근을 혀용해 주세요.');
                }
            }
        })();

        BackHandler.addEventListener("hardwareBackPress", goback);

        return () => 
            BackHandler.removeEventListener('hardwareBackPress', goback);

    }, [])

    const goback = () => {
        Vibration.vibrate(5)
        Alert.alert("종료하시겠습니까?",
            "모든 내용은 저장되지 않습니다.", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            { text: "예", onPress: () => navigation.popToTop() }
        ]);
        return true;
    }

    //별점 +1
    const onIncrease = () => {
        Vibration.vibrate(5)
        if (Q3.Q_score < maxRating) {
            setQ3({
                ...Q3,
                Q_score: Q3.Q_score + 1
            })
        }
    }
    //별점 -1
    const onDecrease = () => {
        Vibration.vibrate(5)
        if (Q3.Q_score > 1) {
            setQ3({
                ...Q3,
                Q_score: Q3.Q_score - 1
            })
        }
    }

    //별점 선택
    const updateRating = (key) => {
        Vibration.vibrate(5)
        setQ3({
            ...Q3,
            Q_score: key
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
            quality: 1,
        };
        let image = null;
        if (Q3.Q_imges.length < 2) {
            if (menu === 'camera') {
                image = await ImagePicker.launchCameraAsync(option);
            } else if (menu === 'library') {
                image = await ImagePicker.launchImageLibraryAsync(option);
            }
            if (!image.cancelled) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    image.localUri || image.uri,
                    [{ resize: { width: image.width * 0.25, height: image.height * 0.25 } }],
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );
                setQ3({
                    ...Q3,
                    Q_imges: [...Q3.Q_imges, manipResult.uri]
                });
            }
        } else {
            alert('이미지 추가는 최대 2장입니다.')
        }
    }

    //이미지 제거
    const deleteImage = () => {
        Vibration.vibrate(5)
        if (Q3.Q_imges.length > 0) {
            setQ3({
                ...Q3,
                Q_imges: Q3.Q_imges.filter(image => image !== Q3.Q_imges[selectImageIdx - 1])
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
        setQ3({
            ...Q3,
            Q_comment: val
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
        setQ3({
            ...Q3,
            Q_comment: text
        })
    }

    //코멘트 삭제 
    const deleteComment = () => {
        Vibration.vibrate(5)
        setQ3({
            ...Q3,
            Q_comment: ''
        })
    }

    //다음 질문으로 넘어가기
    const nextQuestion = () => {
        Vibration.vibrate(5)
        navigation.navigate("Scoring_16", {
            _id: _id, QArr: [...QArr, Q3]
        })
    }

    //이전 질문으로 넘거가기
    const prevQuestion = () => {
        Vibration.vibrate(5)
        Alert.alert("해당 질문은 저장되지 않습니다.",
            "그래도 이전으로 이동하시겠습니까?", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            { text: "예", onPress: () => navigation.navigate("Scoring_2") }
        ]);
    }

    let thumbnail = [];
    for (let i = 0; i < Q3.Q_imges.length; i++) {
        thumbnail.push(
            <TouchableOpacity key={i} onPress={() => setSelectImageIdx(i + 1)} style={{ marginLeft: 10, borderRadius: 10, borderWidth: 2, borderColor: selectImageIdx === (i + 1) ? '#00B2FF' : '#f9f9f9' }}>
                <Image style={styles.thumbnail} source={{ uri: Q3.Q_imges[i] }}>
                </Image>
            </TouchableOpacity>)
    }


    if (isEditComment) {
        return (
            <EditComment comment={Q3.Q_comment} cancelEditComment={cancelEditComment} submitEditComment={submitEditComment} changeComment={changeComment} />
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
                            <Text style={styles.orderNum}>{`${Q3.Q_num}/16`}</Text>
                            <Text style={{ color: '#0094FF', fontWeight: 'bold' }}>상권</Text>
                        </View>
                        <Text style={styles.questionsTitle}>{config.question[2]}</Text>
                        <Text style={styles.questionsContent}>몇층 / 한 걸물 / 외적요소 등</Text>
                    </View>

                    {/* 별점 */}
                    <StarRating defaultRating={Q3.Q_score} maxRating={maxRating} onIncrease={onIncrease} onDecrease={onDecrease} updateRating={updateRating} />

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
                            {Q3.Q_comment}
                        </Text>
                    </View>
                    {/* 이전/다음 버튼 */}
                    <View style={styles.btnWrap}>
                        <View style={styles.width90per}>
                            <TouchableOpacity style={[styles.prevNextBtn, { backgroundColor: 'rgba(196, 196, 196, 0.3)' }]} onPress={prevQuestion}>
                                <Text style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 18 }}>이전</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.prevNextBtn, { backgroundColor: '#00B2FF' }]} onPress={nextQuestion}>
                                <Text style={{ color: '#fff', fontSize: 18 }}>다음</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}