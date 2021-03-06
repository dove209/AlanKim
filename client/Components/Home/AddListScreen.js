import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, BackHandler, Alert, Vibration} from 'react-native';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment'; 
import { AntDesign, Entypo } from '@expo/vector-icons';
import styles from '../../StyleSheet';
import config from '../../config';
import { Picker } from '@react-native-picker/picker';

export default function AddListScreen({ route, navigation }) {
    const _id = route.params._id

    const [role, setRole] = useState(null); //컴포넌트 역할, 신규등록 or 내용수정
    const [addListItem, setAddListItem] = useState({
        upTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        storeName: null,
        dong: null,
        city: null,
        storeType: null,
        price: null,
        isParking: null,
        isScore:false,
        QArr:[],
        totalScore:0,
        categoryScore:[],
    })
    const [selectedDong, setSelectedDong ] = useState(null);

    const inputsRef = useRef();

    useEffect(()=>{
       (async() => {
            await axios.get(`${config.MAIN_URL}/items/${_id}`)
            .then((res) => {
                if(res.status === 200){
                    setRole('내용수정');
                    setAddListItem({
                        ...addListItem,
                        storeName: res.data[0].storeName,
                        dong: res.data[0].dong,
                        city: res.data[0].city,
                        storeType: res.data[0].storeType,
                        price: res.data[0].price,
                        isParking: res.data[0].isParking,
                    });
                    setSelectedDong(res.data[0].dong);
                }
            })
            .catch((error) => {
                if(error.response.status === 500) {
                    console.log('신규 등록')
                    setRole('신규등록');
                } 
            })
        })();

        BackHandler.addEventListener("hardwareBackPress", goback);
      
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", goback);
    },[])

    const goback = () => {
        navigation.popToTop()
        return true
    }

    const changeStoreName = (value) => {
        Vibration.vibrate(5)
        setAddListItem({
            ...addListItem,
            storeName: value,
        })
    };
    const changeDong = (value) => {
        Vibration.vibrate(5)
        inputsRef.current.blur();
        setSelectedDong(value)
        setAddListItem({
            ...addListItem,
            dong: value,
            city: null
        })
    }

    const changeCity = (value) => {
        Vibration.vibrate(5)
        inputsRef.current.blur();
        setAddListItem({
            ...addListItem,
            city: value,
        })
    }
    const selectStoreType = (value) => {
        Vibration.vibrate(5)
        inputsRef.current.blur();
        setAddListItem({
            ...addListItem,
            storeType: value,
        })
    }
    const selectStorePrice = (value) => {
        Vibration.vibrate(5)
        inputsRef.current.blur();
        setAddListItem({
            ...addListItem,
            price: value,
        })
    }
    const selectStoreParking = (value) => {
        Vibration.vibrate(5)
        inputsRef.current.blur();
        setAddListItem({
            ...addListItem,
            isParking: value,
        })
    }

    // 신규 아이템 등록(POST) 또는 아이템 내용 수정(PUT)
    const addListSubmit = () => {
        if(addListItem.city !== null && addListItem.dong !== null && addListItem.isParking !== null && addListItem.price !== null && addListItem.storeName !== null && addListItem.storeName !== '' && addListItem.storeType !== null){
            if(role === '신규등록'){
                axios.post(`${config.MAIN_URL}/items`,{addListItem})
                .then(res=>{
                    if(res.data){
                        console.log('리스트 등록 완료')
                        navigation.popToTop()
                        navigation.dispatch(
                            StackActions.replace('HomeScreen')
                        );
                    }
                })   
                .catch((error) => console.error(error))
             } else if(role === '내용수정'){
                axios.put(`${config.MAIN_URL}/items`,{addListItem,_id:_id})
                .then(res=>{
                    if(res.data){
                        console.log('리스트 수정 완료')
                        navigation.popToTop()
                        navigation.dispatch(
                            StackActions.replace('HomeScreen')
                        );
                    }
                })   
                .catch((error) => console.error(error))
             }
        } else {
            alert("모두 작성 해주세요.")
        }
    }

    return (
        <View style={styles.addListContainer}>
            <View style={styles.mainTitle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign onPress={goback} name="arrowleft" size={24} color="rgba(0, 0, 0, 0.3)" />
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>{role  === '신규등록' ? '리스트 등록' : '리스트 수정'}</Text>
                </View>
            </View>

            <View style={styles.optionsWrap}>
                {/* 상호 입력 */}
                <View>
                    <Text style={styles.optionTitle}>상호</Text>
                    <TextInput
                        allowFontScaling={false}
                        ref={inputsRef}
                        style={styles.input}
                        placeholder="상호명"
                        value={addListItem.storeName}
                        placeholderTextColor="#cccccc"
                        autoCapitalize="none"
                        onChangeText={(val) => changeStoreName(val)}
                    />
                    <View style={styles.bar}></View>
                </View>

                {/* 위치 선택 */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.optionTitle}>위치</Text>
                    <View style={styles.addressSelect}>
                        <Text>광역시·도</Text>
                            <Picker style={{ height: 30, width: 200 }} value={null} selectedValue={addListItem.dong} onValueChange={(val, idx) => changeDong(val)}>
                                <Picker.Item label='선택' value='선택' />
                                {
                                    config.Dongs.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} /> })
                                }
                            </Picker>
                    </View>
                    <View style={styles.addressSelect}>
                        <Text>시·군·구</Text>
                        <Picker style={{ height: 30, width: 200 }} value={null} selectedValue={addListItem.city} onValueChange={(val, idx) => changeCity(val)}>
                            <Picker.Item label='선택' value='선택' />
                            {
                               selectedDong === null ? null 
                               : selectedDong === '선택' ? null
                               : selectedDong === '서울특별시' ? config.cityItems_1.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})  
                               : selectedDong === '부산광역시' ? config.cityItems_2.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '대구광역시' ? config.cityItems_3.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '인천광역시' ? config.cityItems_4.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '광주광역시' ? config.cityItems_5.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '대전광역시' ? config.cityItems_6.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '울산광역시' ? config.cityItems_7.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '세종특별자치시' ? config.cityItems_8.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '경기도' ? config.cityItems_9.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '강원도' ? config.cityItems_10.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '충청북도' ? config.cityItems_11.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '충청남도' ? config.cityItems_12.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '전라북도' ? config.cityItems_13.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '전라남도' ? config.cityItems_14.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '경상북도' ? config.cityItems_15.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : selectedDong === '경상남도' ? config.cityItems_16.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                               : config.cityItems_17.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} />})
                            }
                        </Picker>
                    </View>
                    <View style={styles.bar}></View>
                </View>

                {/* 업종 선택 */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.optionTitle}>업종</Text>
                    <View style={[styles.selectBtnWrap, { marginTop: 10 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[0]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[0]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[0]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[1]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[1]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[1]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[2]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[2]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[2]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[3]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[3]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[3]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[3]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.selectBtnWrap, { marginTop: 5 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[4]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[4]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[4]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[4]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[5]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[5]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[5]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[5]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[6]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[6]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[6]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[6]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[7]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[7]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[7]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[7]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.selectBtnWrap, { marginTop: 5 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[8]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[8]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[8]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[8]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === `${config.storeType[9]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType(`${config.storeType[9]}`)}>
                            <Text style={{ color: addListItem.storeType === `${config.storeType[9]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.storeType[9]}</Text>
                        </TouchableOpacity>
                        <View style={[styles.selectBtn, { opacity: 0 }]}>
                        </View>
                        <View style={[styles.selectBtn, { opacity: 0 }]}>
                        </View>
                    </View>
                </View>
                <View style={styles.bar}></View>

                {/* 가격대 선택 */}
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={styles.optionTitle}>가격</Text>
                        <Text style={{ fontSize: 13, marginLeft: 10, color: 'rgba(0, 0, 0, 0.4)' }}>*1인분 기준</Text>
                    </View>
                    <View style={[styles.selectBtnWrap, { marginTop: 10 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === `${config.price[0]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('만원이하')}>
                            <Text style={{ color: addListItem.price === `${config.price[0]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.price[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === `${config.price[1]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('1만원대')}>
                            <Text style={{ color: addListItem.price === `${config.price[1]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.price[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === `${config.price[2]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('2만원대')}>
                            <Text style={{ color: addListItem.price === `${config.price[2]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.price[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === `${config.price[3]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('3만원이상')}>
                            <Text style={{ color: addListItem.price === `${config.price[3]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.price[3]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bar}></View>

                {/* 주차가능 선택 */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.optionTitle}>주차</Text>
                    <View style={[styles.selectBtnWrap, { marginTop: 10 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.isParking === `${config.parking[0]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreParking('가능')}>
                            <Text style={{ color: addListItem.isParking === `${config.parking[0]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.parking[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.isParking === `${config.parking[1]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreParking('불가능')}>
                            <Text style={{ color: addListItem.isParking === `${config.parking[1]}` ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>{config.parking[1]}</Text>
                        </TouchableOpacity>
                        <View style={[styles.selectBtn, { opacity: 0 }]}>
                        </View>
                        <View style={[styles.selectBtn, { opacity: 0 }]}>
                        </View>
                    </View>
                </View>

                {/* 완료 */}
                <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#00B2FF' }]} onPress={addListSubmit}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>완 료</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}