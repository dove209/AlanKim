import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, Vibration} from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../StyleSheet';
import config from '../../config';


export default function ScoreDetailInfo({ route, navigation }) {
    const item = route.params.item

    const [isCommentModalVisible, setCommentModalVisible] = useState(false);    //코멘트 모달창 열림 여부
    const [question, setQuestion] = useState(null);                             //모달창 질문 
    const [questionNum, setQuestionNum] = useState(null);                       //모달창 질문 번호
    const [comment, setComment] = useState(null);                               //코멘트 모달창 내용

    const [isImgModalVisible, setImgModalVisible] = useState(false);            //사진 모달창 열림 여부
    const [imgArr, setImgArr] = useState([])                                    //사진 모달창 이미지들
    const [swiperIndex, setSwiperIndex ] = useState(1)                          //이미지 스와이퍼 인덱스
    
    const goback = () => {
        navigation.navigate("ScoreDetail")
    }

    //이미지 모달창 띄우기
    const showImg = (Q_num, Q_imges) => {
        if(Q_imges.length != 0){
            Vibration.vibrate(5) 
            setImgModalVisible(!isImgModalVisible);
            setQuestionNum(Q_num)                                   //질문 번호
            setQuestion(config.question[Number(Q_num) - 1])         //질문 내용
            setImgArr(Q_imges)

        } 
    }

    //코멘트 모달창 띄우기
    const showComment = (Q_num, Q_comment) => {
        if(Q_comment != ''){
            Vibration.vibrate(5) 
            setCommentModalVisible(!isCommentModalVisible);
            setQuestionNum(Q_num)                                   //질문 번호
            setQuestion(config.question[Number(Q_num) - 1])         //질문 내용
            setComment(Q_comment);                                  //코멘트 내용
        } 
    }

    let imgSwiper = []
    for (var i = 0; i < imgArr.length; i++) {
        imgSwiper.push(
            <View  key={i}>
                <Image source={{uri:`${config.MAIN_URL}/imges/${imgArr[i]}&random=${Math.random().toString(36).substring(7)}` }} style={styles.questionImg}></Image>
            </View>

        );
      } 

    return (
        <View style={styles.addListContainer}>
             <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign onPress={goback} name="arrowleft" size={24} color="rgba(0, 0, 0, 0.3)" />
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>상세내역</Text>
                </View>
                {/* 질문 리스트 */}
                <View style={{ ...styles.row, marginTop: 10 }}>
                    <Text style={{ ...styles.grayColor, width: "10%" }}>순서</Text>
                    <Text style={{ ...styles.grayColor, width: "25%" }}>질문</Text>
                    <Text style={{ ...styles.grayColor, width: "15%" }}>평가</Text>
                    <Text style={{ ...styles.grayColor, width: "10%" }}>점수</Text>
                    <Text style={{ ...styles.grayColor, width: "15%" }}>이미지</Text>
                    <Text style={{ ...styles.grayColor, width: "15%" }}>코멘트</Text>
                </View>
                <FlatList
                    data={item.QArr}
                    style={{ height: "100%" }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <QuestionItem key={index} item={item} showImg={showImg} showComment={showComment}> </QuestionItem>
                    )}
                />
            </View>

      
            <View style={{...styles.modalBg, height : isCommentModalVisible || isImgModalVisible ? "150%" : 0}}></View>
            {/* 코멘트 모달창 */}
            <Modal
                transparent={true}
                visible={isCommentModalVisible}
                onRequestClose={() => {
                    setCommentModalVisible(!isCommentModalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{...styles.modalView, width:"90%", height:300}}>
                        <View style={{...styles.row,  width:"100%"}}>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>{questionNum}. {question}</Text>
                            <TouchableOpacity onPress={() => { Vibration.vibrate(5), setCommentModalVisible(!isCommentModalVisible) }}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:20, width:"100%"}}>
                            <Text style={{color:'rgba(0, 0, 0, 0.6)'}}>{comment}</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 이미지 모달창 */}
            <Modal
                transparent={true}
                visible={isImgModalVisible}
                onRequestClose={() => {
                    setImgModalVisible(!isImgModalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{...styles.modalView, width:"90%", height:300}}>
                        <View style={{...styles.row,  width:"100%"}}>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>{questionNum}. {question}</Text>
                            <TouchableOpacity onPress={() => { Vibration.vibrate(5), setImgModalVisible(!isImgModalVisible) }}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:20, height:'80%'}}>
                            <Swiper
                             showsButtons={false}
                             dot={<View style={{...styles.swiperDot, backgroundColor: 'rgba(255,255,255,.2)'}} />}
                             activeDot={<View style={{...styles.swiperDot, backgroundColor: 'rgba(255,255,255,.8)'}} />}
                             paginationStyle={{ bottom: 10}}
                            >   
                            {imgSwiper}
                            </Swiper>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function QuestionItem({ item, showImg, showComment }) {
    const weightVal = [4, 3, 3, 2, 2, 2, 4, 3, 1, 2, 2, 2, 4, 8, 4, 4]  //질문 점수 가중치
    return (
        <View style={{ ...styles.row, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, borderTopColor: "#dedede", borderTopWidth: item.Q_num != 1 ? 1 : 0 }}>
            <View style={{ ...styles.row, justifyContent: 'flex-start', width: '10%' }}>
                <View style={{
                    width: 5, height: 20, marginRight: 5, backgroundColor: item.Q_num === 1 || item.Q_num === 2 || item.Q_num === 3 ? '#0070C0'
                        : item.Q_num === 4 || item.Q_num === 7 || item.Q_num === 11 || item.Q_num === 12 ? '#92D050'
                            : item.Q_num === 5 || item.Q_num === 6 || item.Q_num === 8 || item.Q_num === 9 || item.Q_num === 10 ? '#FFC000'
                                : '#F11D00'
                }}>
                </View>
                <Text style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{item.Q_num}</Text>
            </View>
            <View style={{ width: '25%' }}>
                <Text numberOfLines={1} style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 12 }}>{config.question[Number(item.Q_num) - 1]}</Text>
            </View>
            <View style={{ width: '15%', alignItems: 'center' }}>
                <Text style={{ color: item.Q_score <= 4 ? '#BD0000' : item.Q_score <= 6 ? '#A4A4A4' : '#169D00', fontSize: 12, fontWeight: 'bold' }}>
                    {item.Q_score <= 2 ? '매우불만' : item.Q_score <= 4 ? '불만' : item.Q_score <= 6 ? '보통' : item.Q_score <= 8 ? '만족' : '매우만족'}
                </Text>
            </View>
            <View style={{ width: '10%', alignItems: 'center' }}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 12 }}>{item.Q_score * weightVal[Number(item.Q_num) - 1]}/{weightVal[Number(item.Q_num) - 1] * 10}</Text>
            </View>
            <TouchableOpacity onPress={()=> showImg(item.Q_num, item.Q_imges)} style={{ width: '15%', alignItems: 'center' }}>
                <AntDesign name="camera" size={24} color={(item.Q_imges).length != 0 ? '#00B2FF' : 'rgba(0, 0, 0, 0.05)'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> showComment(item.Q_num, item.Q_comment)} style={{ width: '15%', alignItems: 'center' }}>
                <MaterialCommunityIcons name="message-text" size={24} color={item.Q_comment != '' ? '#00B2FF' : 'rgba(0, 0, 0, 0.05)'} />
            </TouchableOpacity>
        </View>
    )
}