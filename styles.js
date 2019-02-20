import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      flex: 1,
      justifyContent:'center'
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
        padding:30,
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
      backgroundColor: '#e0eeef'
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
      marginTop: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    listItemImage: {
      height:40,
      width:40,
    },
    listItemText: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    additionalInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
});