import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Modal, FlatList, Image, ScrollView, Alert } from 'react-native';
import Cross from './Cross';

const GridImageView = ({ data }) => {
    const [modal, setModal] = useState({ visible: false, data: 0 });
    const ref = useRef();
    var key = 0;

    const Component = () => {
        return (
            <View>
                {
                    data.map((item, key) =>
                    (
                        <View key={key}>
                            <Image style={styles.img_modal} source={{ uri: item.image }} />
                        </View>
                    ))
                }
            </View>
        );
    };

    return (
        <View style={styles.background}>

            <Modal
                // propagateSwipe={true}
                animationType="slide"
                transparent={true}
                visible={modal.visible}
                onRequestClose={() => {
                    setModal({ visible: false, data: 0 });
                }}>

                <Component />

                <View style={styles.cross}>
                    <TouchableOpacity
                        style={{width:50, height:50, alignItems:'center', justifyContent:'center'}}
                        onPress={() => {
                            setModal({ visible: false, data: 0 });
                        }}>
                        <Cross />
                    </TouchableOpacity>
                </View>

            </Modal>

            <FlatList
                contentContainerStyle={{ paddingBottom: 40 }}
                data={data}
                renderItem={({ item, index }) => {
                    if (data.length <= index * 3) {
                        return null;
                    }
                    return (
                        <View style={styles.unit}>
                            <View style={styles.unit_item}>
                                {data.length > index * 3 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModal({ visible: true, data: index * 3 });

                                        }}
                                        style={styles.unit_item}
                                    >
                                        <Image style={styles.img} source={{ uri: data[index * 3].image }} />
                                    </TouchableOpacity> : null}
                            </View>
                            <View style={styles.unit_item}>
                                {data.length > index * 3 + 1 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModal({ visible: true, data: index * 3 + 1 });

                                        }}
                                        style={styles.unit_item}
                                    >
                                        <Image style={styles.img} source={{ uri: data[index * 3 + 1].image }} />
                                    </TouchableOpacity> : null}
                            </View>
                            <View style={styles.unit_item}>
                                {data.length > index * 3 + 2 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModal({ visible: true, data: index * 3 + 2 });

                                        }}
                                        style={styles.unit_item}
                                    >
                                        <Image style={styles.img} source={{ uri: data[index * 3 + 2].image }} />
                                    </TouchableOpacity> : null}
                            </View>

                        </View>
                    );
                }}
                keyExtractor={(item) => {
                    key++;
                    return key.toString();
                }}
                style={styles.flatlist}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    flatlist: {
        flex: 1
    },
    unit: {
        flexDirection: 'row'
    },
    unit_item: {
        height: Dimensions.get('window').height / 5.5,
        margin: 0.5,
        flex: 1,
    },
    img: {
        flex: 1,
    },
    img_modal: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    cross: {
        width:'100%',
        alignItems:'center',
        position: 'absolute',
        bottom:'20%',
    },
    move_left_view: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 20
    },
    move_right_view: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        right: 20
    }
});

export default GridImageView;