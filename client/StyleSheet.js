import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        paddingTop: 50,
        alignItems: 'center',
    },
    mainTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: width * 0.9,
    },
    mainTitleSmailText: {
        fontSize: 12,
    },
    mainTitleBigText: {
        fontSize: 20,
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
    selectBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:20,
        width: width*0.9,
        backgroundColor: '#fff',
        borderWidth:1,
        borderRadius:10
    },
    homeList: {
        flex: 1,
        marginTop:20,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    listEmptyTitle: {
        fontSize: 20,
        marginTop:15,
    },
    listEmptySub:{
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.2)',
        marginTop: 5,
    },
    listScrollViewWrap:{
        width:'100%',
    },
    listItemWrap:{
        width:'100%',
        paddingLeft:'5%',
        paddingRight:'7%',
        paddingTop:10,
        paddingBottom:10,
        alignSelf:'center',
        backgroundColor:'#fff'
    },
    itemSmallText:{
        fontSize:12,
        color:'rgba(0, 0, 0, 0.25)'
    },  
    itemStoreName:{
        fontSize:18,
        fontWeight:'500',
    },  
    itemStoreAddress:{
        fontSize:13,
    },
    itemMarkStartBtn:{
        backgroundColor: "#00B2FF",
        width:110,
        height:40,
        marginTop:15,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },


    // 리스트 등록 화면
    addListContainer:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    optionsWrap: {
        flex: 1,
        justifyContent:'space-between',
        marginTop:10,
        width: width * 0.9,
    },
    optionTitle:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        fontSize: width / 30,
        height: 30,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    bar: {
        height:1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginTop:20,
    },
    addressSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:10,
        paddingRight:50,
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
    selectBtn:{
        borderWidth:1,
        width:width*0.21,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
    }, 
    submitBtn:{
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        marginTop:30,
    }
})

export default styles;