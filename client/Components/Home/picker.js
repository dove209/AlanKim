import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import config from '../../config';

export default function PickerScreen({ sortMenu, selectVal, onValueChange }) {

    let pickerItems = []

    if (sortMenu === 3){
        pickerItems = config.Dongs;
    } else if (sortMenu === 4) {
        pickerItems = config.storeType;
    } else if (sortMenu === 5) {
        pickerItems = config.price;
    }
    return (
        <Picker
            style={{ height: 30, width: 150, borderWidth: 0 }}
            value={null}
            selectedValue={selectVal}
            onValueChange={onValueChange}
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
