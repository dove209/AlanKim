import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, TextInput, Vibration } from 'react-native';

export default function EditComment({ comment, cancelEditComment, submitEditComment, changeComment}) {
    const inputRef = useRef()

    const submit = () => {
        Vibration.vibrate(5)
        submitEditComment(comment)
    }

    return(
    <View style={{flex:1, backgroundColor:"#E5E5E5", alignItems:"center", width:"100%", height: "100%"}}>
        <View style={{flexDirection:'row', width:'90%', alignItems:'center', justifyContent:"space-between", paddingTop:30}}>
            <Text style={{fontSize:18}}>코멘트</Text>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{marginRight:20}} onPress={cancelEditComment}>
                    <Text style={{fontSize:18, color:"rgba(0, 0, 0, 0.3);"}}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={submit}>
                    <Text style={{fontSize:18, color:"#1DB9FC"}}>작성</Text>
                </TouchableOpacity>
            </View>

        </View>
        <TextInput
                style={{marginTop:20, width:"90%", height:"60%"}}
                value={comment}
                ref={inputRef}
                multiline={true}        //여러줄 입력가능
                textAlignVertical="top" //처음부터 시작 (기본값은 center)
                onChangeText={(text) => changeComment(text)}
                autoCapitalize="sentences"
                autoCorrect
                placeholder="코멘트를 남겨주세요"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                />
    </View>
    )
}