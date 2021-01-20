import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import styles from '../../StyleSheet';
import { Picker } from '@react-native-picker/picker';

export default function AddListScreen({ navigation }) {
    const [addListItem, setAddListItem] = useState({
        storeName: null,
        dong: null,
        city: null,
        storeType: null,
        price: null,
        isParking: null,
        isMarked:false
    })

    const addressItems_1 = ['서울특별시', '경기도']
    const addressItems_2 = ['중구', '영통구']

    const inputsRef = useRef();

    const goback = () => {
        navigation.navigate("HomeScreen")
    }


    const changeStoreName = (value) => {
        setAddListItem({
            ...addListItem,
            storeName: value,
        })
    };
    const changeDong = (value) => {
        setAddListItem({
            ...addListItem,
            dong: value,
        })
    }
    const changeCity = (value) => {
        setAddListItem({
            ...addListItem,
            city: value,
        })
    }
    const selectStoreType = (value) => {
        setAddListItem({
            ...addListItem,
            storeType: value,
        })
    }
    const selectStorePrice = (value) => {
        setAddListItem({
            ...addListItem,
            price: value,
        })
    }
    const selectStoreParking = (value) => {
        setAddListItem({
            ...addListItem,
            isParking: value,
        })
    }

    const addListSubmit = () => {
        console.log(addListItem);
        navigation.navigate("HomeScreen")
    }

    return (
        <View style={styles.addListContainer}>
            <View style={styles.mainTitle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign onPress={goback} name="arrowleft" size={24} color="rgba(0, 0, 0, 0.3)" />
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>리스트 등록</Text>
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
                            <Picker.Item label='선택' value='0' />
                            {
                                addressItems_1.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} /> })
                            }
                        </Picker>
                    </View>
                    <View style={styles.addressSelect}>
                        <Text>시·군·구</Text>
                        <Picker style={{ height: 30, width: 200 }} value={null} selectedValue={addListItem.city} onValueChange={(val, idx) => changeCity(val)}>
                            <Picker.Item label='선택' value='0' />
                            {
                                addressItems_2.map((item, idx) => { return <Picker.Item label={item} value={item} key={idx} /> })
                            }
                        </Picker>
                    </View>
                    <View style={styles.bar}></View>
                </View>

                {/* 업종 선택 */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.optionTitle}>업종</Text>
                    <View style={[styles.selectBtnWrap, { marginTop: 10 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '한식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('한식')}>
                            <Text style={{ color: addListItem.storeType === '한식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>한식</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '중식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('중식')}>
                            <Text style={{ color: addListItem.storeType === '중식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>중식</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '일식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('일식')}>
                            <Text style={{ color: addListItem.storeType === '일식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>일식</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '양식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('양식')}>
                            <Text style={{ color: addListItem.storeType === '양식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>양식</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.selectBtnWrap, { marginTop: 5 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '분식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('분식')}>
                            <Text style={{ color: addListItem.storeType === '분식' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>분식</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '해외' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('해외')}>
                            <Text style={{ color: addListItem.storeType === '해외' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>해외</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '뷔페' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('뷔페')}>
                            <Text style={{ color: addListItem.storeType === '뷔페' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>뷔페</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '카페' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('카페')}>
                            <Text style={{ color: addListItem.storeType === '카페' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>카페</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.selectBtnWrap, { marginTop: 5 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '주점' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('주점')}>
                            <Text style={{ color: addListItem.storeType === '주점' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>주점</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.storeType === '기타' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreType('기타')}>
                            <Text style={{ color: addListItem.storeType === '기타' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>기타</Text>
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
                        <Text style={{ fontSize: 13, marginLeft: 5, color: 'rgba(0, 0, 0, 0.4)' }}>*1인분 기준</Text>
                    </View>
                    <View style={[styles.selectBtnWrap, { marginTop: 10 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === '만원이하' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('만원이하')}>
                            <Text style={{ color: addListItem.price === '만원이하' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>만원이하</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === '1만원대' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('1만원대')}>
                            <Text style={{ color: addListItem.price === '1만원대' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>1만원대</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === '2만원대' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('2만원대')}>
                            <Text style={{ color: addListItem.price === '2만원대' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>2만원대</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.price === '3만원이상' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStorePrice('3만원이상')}>
                            <Text style={{ color: addListItem.price === '3만원이상' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>3만원이상</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bar}></View>

                {/* 주차가능 선택 */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.optionTitle}>주차</Text>
                    <View style={[styles.selectBtnWrap, { marginTop: 10 }]}>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.isParking === '가능' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreParking('가능')}>
                            <Text style={{ color: addListItem.isParking === '가능' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>가능</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectBtn, { borderColor: addListItem.isParking === '불가능' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }]} onPress={() => selectStoreParking('불가능')}>
                            <Text style={{ color: addListItem.isParking === '불가능' ? '#00B2FF' : 'rgba(0, 0, 0, 0.4)' }}>불가능</Text>
                        </TouchableOpacity>
                        <View style={[styles.selectBtn, { opacity: 0 }]}>
                        </View>
                        <View style={[styles.selectBtn, { opacity: 0 }]}>
                        </View>
                    </View>
                </View>

                {/* 완료 */}
                <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#00B2FF' }]} onPress={addListSubmit}>
                    <Text style={{ color: '#fff' }}>완료</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}