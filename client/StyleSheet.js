import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 20,
        alignItems: 'center',
    },
    mainTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: width * 0.9,
    },
    mainTitleSmailText: {
        fontSize: width / 28,
    },
    mainTitleBigText: {
        fontSize: width / 16,
        fontWeight: 'bold'
    },
    sortMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingRight: 40,
        width: width * 0.9,
    },
    sortMenuBtn: {
        width: width / 7,
        height: 30
    },
    selectBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        width: width * 0.9,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10
    },
    homeList: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    listEmptyTitle: {
        fontSize: 20,
        marginTop: 15,
    },
    listEmptySub: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.2)',
        marginTop: 5,
    },
    listScrollViewWrap: {
        width: '100%',
    },
    listItemWrap: {
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    itemSmallText: {
        fontSize: 12,
        marginRight: 10,
        color: 'rgba(0, 0, 0, 0.25)'
    },
    itemStoreName: {
        fontSize: 18,
        fontWeight: '500',
    },
    itemStoreAddress: {
        fontSize: 13,
    },
    itemMarkStartBtn: {
        backgroundColor: "#00B2FF",
        width: 110,
        height: 40,
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },


    // 리스트 등록 화면
    addListContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    optionsWrap: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 20,
        width: width * 0.88,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        fontSize: width / 20,
        height: 25,
        marginTop: 10,
    },
    bar: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginTop: 10,
    },
    addressSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingRight: 50,
    },
    selectBtnWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectBtnWrapLast: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    selectBtn: {
        borderWidth: 1,
        width: width * 0.21,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    submitBtn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 30,
    },

    //아이템 점수 메기기
    addScoreContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#f9f9f9'
    },
    orderNum: {
        color: 'rgba(0, 0, 0, 0.6)',
    },
    questionsTitle: {
        fontWeight: 'bold',
        fontSize: width / 16,
        marginTop: 10,
    },
    questionsContent: {
        marginTop: 5,
        fontSize: width / 28,
        color: 'rgba(0, 0, 0, 0.5)',
    },
    starWrap: {
        borderRadius: 10,
        backgroundColor: "#fff",
        height: height * 0.22,
        marginTop: 10,
        alignItems: 'center'
    },
    stars: {
        width: "90%",
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 30,
    },
    StarImage: {
        width: width / 15,
        height: width / 15,
        resizeMode: 'cover',
    },
    scoreText: {
        fontWeight: 'bold',
        fontSize: width / 10,
    },
    AddWrap: {
        height: height * 0.15,
        marginTop: 5,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center'
    },
    width90per: {
        width: "95%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    addImageBtn: {
        width: 90,
        height: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#c4c4c4',
    },
    thumbnail: {
        width: 90,
        height: 90,
        borderRadius: 10,
        resizeMode: "stretch"
    },
    btnWrap: {
        height: height * 0.1,
        marginTop: 5,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center'
    },
    prevNextBtn: {
        width: "48%",
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: width * 0.5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        width: "100%",
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    //아이템 점수 메기기 완료
    finishTitle: {
        fontWeight: 'bold',
        fontSize: width / 15
    },
    finishsmall: {
        fontSize: width / 25,
        color: 'rgba(0,0,0,0.5)'
    },
    scoreBox: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#dedede",
        width: width * 0.85,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 20,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreSmallBox: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        padding: 10,
        width: '23%'
    },
    smallBoxTitle: {
        fontSize: 12
    },
    smallBoxText: {
        fontSize: 12,
        marginTop: 5
    },
    smallBoxScore: {
        marginTop:10,
        fontSize: 15
    },
    toHome: {
        backgroundColor: "#fff",
        width: width * 0.85,
        borderWidth: 1,
        borderColor: "#dedede",
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    //아이템 점수 상세 보기 페이지
    whiteBox :{
        marginTop:20,
        backgroundColor:'#fff',
        padding:20,
        borderRadius:10,
        borderWidth:1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
    },
    totalScoreBox : {
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderColor:'rgba(0, 0, 0, 0.3)'
    },
    grayColor:{
       color: 'rgba(0, 0, 0, 0.3)',
       textAlign:'center',
    },
    modalBg : {
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        position:'absolute',
        zIndex:1,
        width:width,
    },
    swiperDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3 
    },    
    questionImg: {
        resizeMode: "contain",
        width: "100%",
        height: "100%",
        borderRadius: 6,
        alignSelf:"center",
    },

    //설정 더보기 화면
    addProfileImg: {
        width:'80%',
        height:"40%",
        marginTop:50,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#c4c4c4',
        borderWidth:1
    },
    etcBox: {
        width:'90%',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:40,
        paddingRight:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:1,
        borderRadius:10,
        borderColor:'rgba(0, 0, 0, 0.3)',
        backgroundColor:'#ffffff'
    },
    etcBoxTitle : {
        fontWeight: "500",
     },
     etcBoxCont : {
         fontWeight:"normal",
         color:'rgba(0, 0, 0, 0.3)'
     }

})


export default styles;