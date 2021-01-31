import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, BackHandler, Alert, Vibration, ActivityIndicator, StatusBar} from 'react-native';
import axios from 'axios';
import { AntDesign, Feather } from '@expo/vector-icons';
import styles from '../../../StyleSheet';
import config from '../../../config';

export default function Scoring_finish({ route, navigation }) {
    const _id = route.params._id;

    const [isLoading, setIsLoading] = useState(true)
    const [finishInfo, setFinishInfo] = useState({})
    const [defaultRating, setDefaultRating] = useState(3);

    const maxRating = 5
    const scoreComment = ['너무 너무 최악!', '나빠요..', '보통.그럭저럭이네', '좋아요!!', '펄펙!!!최고야'];
    const Star = require('../../../assets/imges/star_filled.png');
    const Star_With_Border = require('../../../assets/imges/star_corner.png');



    useEffect(() => {
        const getScore = async() => {
            await axios.get(`${config.MAIN_URL}/items/${_id}`)
            .then((res) => {
                if(res.status === 200){
                    setFinishInfo(res.data[0])
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
        getScore()

        const backAction = () => {
            Vibration.vibrate(5) 
            Alert.alert("평가 완료!",
            "홈으로 나가시겠습니까?", [
                {
                    text: "아니요",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "예", onPress: () => navigation.dispatch(
                    StackActions.replace('HomeScreen')
                )}
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();

    }, [])

    const goback = () => {
        Vibration.vibrate(5) 
        Alert.alert("평가 완료!",
        "홈으로 나가시겠습니까?", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            { text: "예", onPress: () => navigation.dispatch(
                StackActions.replace('HomeScreen')
            )}
        ]);
        return true;
    }


    let RatingBar = [];
    for (var i = 1; i <= maxRating; i++) {
        RatingBar.push(
          <View
            activeOpacity={0.7}
            key={i}
          >
            <Image
              style={{...styles.StarImage, width:20, height:20}}
              source={i <= defaultRating ? Star : Star_With_Border}
            />
          </View>
        );
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
        return (
            <View style={{flex:1, justifyContent:'space-between', alignItems:'center', paddingTop:50, paddingBottom:30}}>
                <View style={{alignItems:"center"}}>
                    <Text style={styles.finishTitle}>평가를 완료하였습니다.</Text>
                    <Text style={styles.finishsmall}>수고하셨습니다.</Text>
                </View>

                
                <View style={styles.scoreBox}>
                    <View style={{...styles.stars, width:"45%", marginTop:0}}>{RatingBar}</View>
                    <Text style={{fontSize:23, fontWeight:'bold', marginTop:20}}>{finishInfo.storeName}</Text>
                    <Text style={{fontSize:15, color: 'rgba(0,0,0,0.5)'}}>{finishInfo.dong} {finishInfo.city}</Text>
                    <Text style={{fontSize:50, fontWeight:'bold', marginTop:20}}>66.4</Text>
                    <Text style={{fontSize:15, color: 'rgba(0,0,0,0.5)'}}>{scoreComment[defaultRating - 1]}</Text>

                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:30}}>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>상권</Text>
                            <Text style={styles.smallBoxText}>보통</Text>
                            <Text style={styles.smallBoxScore}>50</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>인테리어</Text>
                            <Text style={styles.smallBoxText}>보통</Text>
                            <Text style={styles.smallBoxScore}>50</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>서비스</Text>
                            <Text style={styles.smallBoxText}>보통</Text>
                            <Text style={styles.smallBoxScore}>50</Text>
                        </View>
                        <View style={styles.scoreSmallBox}>
                            <Text style={styles.smallBoxTitle}>맛</Text>
                            <Text style={styles.smallBoxText}>보통</Text>
                            <Text style={styles.smallBoxScore}>50</Text>
                        </View>
                    </View>
                </View>


                <TouchableOpacity style={styles.toHome} onPress={goback}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>홈으로</Text>
                </TouchableOpacity>
            </View>
        );
    }
}