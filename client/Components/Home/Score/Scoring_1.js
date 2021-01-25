import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, BackHandler, Alert, Vibration, Keyboard } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import EditComment from './EditComment';
import styles from '../../../StyleSheet';
import config from '../../../config';


export default function Scoring_1({ route, navigation }) {
    const _id = route.params._id
    const [defaultRating, setDefaultRating] = useState(3);
    const [isEditComment, setIsEditComment] = useState(false);
    const [comment, setComment] = useState('');

    const maxRating = 10;
    const scoreComment = ['너무 너무 최악!', '너무 최악!', '최악!', '그럭저럭...', ' 보통. 그럭저럭 괜찮네.', '괜찮네~', '좋아요~~!', '아주 좋아요~!', '최고야!아주 멋져.', '궁극. 완벽! 펄풱!'];
    const Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    const Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';


    
    const inputsRef = useRef();
    

    useEffect(() => {
        const getItem = async () => {
        }
        getItem()

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

    const onIncrease = () => {
        if(defaultRating < maxRating){
            setDefaultRating(defaultRating + 1);
        }
    }

    const onDecrease = () => {
        if(defaultRating > 1){
            setDefaultRating(defaultRating - 1);
        }
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

    const UpdateRating = (key) => {
        setDefaultRating(key);
    }
    let RatingBar = [];
    for (var i = 1; i <= maxRating; i++) {
        RatingBar.push(
          <TouchableOpacity
            activeOpacity={0.7}
            key={i}
            onPress={UpdateRating.bind(this, i)}>
            <Image
              style={styles.StarImage}
              source={
                i <= defaultRating
                  ? { uri: Star }
                  : { uri: Star_With_Border }
              }
            />
          </TouchableOpacity>
        );
      } 
    return (
        <View style={styles.addScoreContainer}>
            <EditComment comment={comment} isEditComment={isEditComment} cancelEditComment={cancelEditComment} submitEditComment={submitEditComment} changeComment={changeComment} />
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
                <View style={styles.starWrap}>
                    <View style={styles.stars}>{RatingBar}</View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10, width:"90%"}}>
                        <TouchableOpacity onPress={onDecrease} style={{width:50, height:50, justifyContent:'center'}}>
                            <AntDesign name="minus" size={24} color="rgba(0, 0, 0, 0.3)" />
                        </TouchableOpacity>
                        <Text style={styles.scoreText}>{defaultRating}</Text>
                        <TouchableOpacity  onPress={onIncrease} style={{width:50, height:50, justifyContent:'center', alignItems:'flex-end'}}>
                            <AntDesign name="plus" size={24} color="rgba(0, 0, 0, 0.3)" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{color:'rgba(0, 0, 0, 0.6)'}}>{scoreComment[defaultRating - 1]}</Text>
                   
                </View>

                {/* 이미지 추가 */}
                <View style={styles.AddWrap}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-between", width:"95%"}}>
                        <Text>이미지</Text>
                        <Feather name="trash-2" size={25} color="rgba(0, 0, 0, 0.3)" />
                    </View>
                 
                </View>

                {/* 코멘트 추가 */}
                <View style={styles.AddWrap}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-between", width:"95%"}}>
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
                    <View style={{flexDirection:'row', width:"95%",justifyContent:"space-between"}}>
                        <TouchableOpacity style={[styles.prevNextBtn, {backgroundColor:'rgba(196, 196, 196, 0.3)'}]}>
                            <Text style={{color:'rgba(0, 0, 0, 0.6)', fontSize:18}}>이전</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.prevNextBtn, {backgroundColor:'#00B2FF'}]}>
                            <Text style={{color:'#fff', fontSize:18}}>다음</Text>
                        </TouchableOpacity>
                    </View>
 
                </View>

            </View>

        </View>
    );
}