import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function PickerScreen({ sortMenu }) {
    const [selectVal, setSelectVal] = useState(null);

    let pickerItems = []

    if (sortMenu === 3){
        pickerItems = ['서울특별시', '경기도']
    }
    else if (sortMenu === 4) {
        pickerItems = ['한식', '중식', '일식', '양식', '분식', '해외', '뷔페', '카페', '주점', '기타']
    } else if (sortMenu === 5) {
        pickerItems = ['만원이하', '1만원대', '2만원대', '3만원이상']
    }
    return (
        <Picker
            style={{ height: 30, width: 150, borderWidth: 0 }}
            value={null}
            selectedValue={selectVal}
            onValueChange={(val, idx) => setSelectVal(val) }
        >
            <Picker.Item label='선택' value='0' />
            {
                pickerItems.map((item, idx) => {
                    return (
                        <Picker.Item label={item} value={item} key={idx} />
                    )
                })
            }
        </Picker>
    );
}
