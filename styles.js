import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      flex: 1,
      justifyContent:'center',
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    scroll: {
        backgroundColor: '#c8e0e4',
        padding:20,
        flexGrow: 1
        //flexDirection: 'column',
    },
    optionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
        flex: 1
    },
    searchModes: {
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        fontSize: 20,
        flex: 1,
        backgroundColor: '#FFF',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#cce5ff',
    },
    span: {
      margin: 2
    },
    searchResults: {
      paddingBottom: 40,
    },
    sectionText: {
      fontWeight: 'bold',
      fontSize:14,
    },
    lineItem: {
      textAlign: 'right',
    },
    nameDisplay: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    listItemBox: {
      backgroundColor: '#bcbcbc',
      margin: 2,
      flexGrow: 1,
      flexDirection: 'row',
    },
    listItemImage: {
      height:40,
      width:40,
    },
    listItemText: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      flexGrow: 1,
    },
    additionalInfo: {
      flexDirection: 'row',
      flexGrow: 1,
    },
    productSeries: {
      flex: 3,
      alignContent: 'flex-end',
    },
    productPrice: {
      flex: 1,
      alignContent: 'flex-start'
    },
    addToCart: {
      fontWeight: 'bold',
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#979797',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
    },
    addProductText: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    
});