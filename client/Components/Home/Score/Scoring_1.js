import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, BackHandler, Alert, Vibration, Keyboard, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import StarRating from './StarRating';
import EditComment from './EditComment';
import styles from '../../../StyleSheet';



export default function Scoring_1({ route, navigation }) {
    const _id = route.params._id

    const [defaultRating, setDefaultRating] = useState(3);
    const maxRating = 10;

    const [images , setImages] = useState([]);
    const [selectImageIdx, setSelectImageIdx] = useState(null);

    const [isEditComment, setIsEditComment] = useState(false);
    const [comment, setComment] = useState('');  

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
          })();

        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();

    }, [])

    const goback = () => {
        navigation.dispatch(
            StackActions.replace('HomeScreen')
        );
    }

    //별점 +1
    const onIncrease = () => {
        Vibration.vibrate(5)
        if(defaultRating < maxRating){
            setDefaultRating(defaultRating + 1);
        }
    }
    //별점 -1
    const onDecrease = () => {
        Vibration.vibrate(5)
        if(defaultRating > 1){
            setDefaultRating(defaultRating - 1);
        }
    }

    //별점 선택
    const UpdateRating = (key) => {
        Vibration.vibrate(5)
        setDefaultRating(key);
    }

    //이미지 추가 
    const addImage = async() => {
        if(images.length < 2){
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
          
              console.log(result);
              if (!result.cancelled) {
                setImages([...images, result.uri]);
              }
        } else {
            alert('이미지 추가는 최대 2장입니다.')
        }
    }
    const deleteImage = () => {
        Vibration.vibrate(5)
        setImages(images.filter(image => image !== images[selectImageIdx-1]));
    }


    //코멘트 작성하러 가기
    const editComment = () => {
        Vibration.vibrate(5)
        setIsEditComment(true)
    }

    //코멘트 TextInput 값 수정
    const changeComment = (val) => {
        setComment(val)
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
        setComment(text)
    }
    
    //코멘트 삭제 
    const deleteComment = () => {
        Vibration.vibrate(5)
        setComment('')
    }

    //다음 질문으로 넘어가기
    const nextQuestion = () => {
        Vibration.vibrate(5)
        console.log({
            'score' : defaultRating,
            'images' : images,
            'comment' : comment
        })
    }

    let thumbnail = [];
    for (let i = 0; i < images.length; i++) {
        thumbnail.push(
         <TouchableOpacity key={i} onPress={() => setSelectImageIdx(i+1)} style={{ marginLeft:10, borderRadius:10, borderWidth:2, borderColor:selectImageIdx === (i+1) ? '#00B2FF' : '#E5E5E5'}}>
             <Image style={styles.thumbnail} source={{uri : images[i]}}>
             </Image>
         </TouchableOpacity>)
      } 


    if(isEditComment){
        return(
            <EditComment comment={comment} cancelEditComment={cancelEditComment} submitEditComment={submitEditComment} changeComment={changeComment} />
        )
    }else {
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
                            <Text style={styles.orderNum}>1/16</Text>
                            <Text style={{ color: '#0094FF', fontWeight: 'bold' }}>상권</Text>
                        </View>
                        <Text style={styles.questionsTitle}>매장 상권 어때?</Text>
                        <Text style={styles.questionsContent}>특급 / 도심상권,역세권 / 대학가,아파트단지 / 동네상권</Text>
                    </View>
    
                    {/* 별점 */}
                    <StarRating defaultRating={defaultRating} maxRating={maxRating} onIncrease={onIncrease} onDecrease={onDecrease} UpdateRating={UpdateRating} />
    
                    {/* 이미지 추가 */}
                    <View style={styles.AddWrap}>
                        <View style={styles.width90per}>
                            <Text>이미지</Text>
                            <TouchableOpacity onPress={deleteImage}>
                                <Feather name="trash-2" size={25} color="rgba(0, 0, 0, 0.3)" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', width:'95%', marginTop:5}}>
                            <TouchableOpacity style={styles.addImageBtn} onPress={addImage}>
                                <AntDesign name="plus" size={27} color="rgba(0, 0, 0, 0.3)" />
                                <Text style={{color:"rgba(0, 0, 0, 0.3)", marginTop:10}}>사진추가</Text>
                            </TouchableOpacity>
                            {thumbnail}

                        </View>
             
   
                    </View>
                    {/* 코멘트 추가 */}
                    <View style={styles.AddWrap}>
                        <View style={styles.width90per}>
                            <Text>코멘트</Text>
                            <View style={{flexDirection:"row"}}>
                                <AntDesign onPress={editComment} name="edit" size={25} color="rgba(0, 0, 0, 0.3)" style={{ marginRight: 30 }} />
                                <Feather onPress={deleteComment} name="trash-2" size={25} color="rgba(0, 0, 0, 0.3)" />
                            </View>
                        </View>
                        <Text style={{width:"95%", marginTop:10, color:'rgba(0, 0, 0, 0.3)'}} numberOfLines={4} ellipsizeMode="tail">
                            {comment}
                        </Text>
                    </View>
                    {/* 이전/다음 버튼 */}
                    <View style={styles.btnWrap}>
                        <View style={styles.width90per}>
                            <TouchableOpacity style={[styles.prevNextBtn, {backgroundColor:'rgba(196, 196, 196, 0.3)'}]}>
                                <Text style={{color:'rgba(0, 0, 0, 0.6)', fontSize:18}}>이전</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.prevNextBtn, {backgroundColor:'#00B2FF'}]} onPress={nextQuestion}>
                                <Text style={{color:'#fff', fontSize:18}}>다음</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}