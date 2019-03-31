import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import SalesQueueSynch from '@components/SalesQueueSynch';
import {connect} from 'react-redux';

const ImageBar = (props) => {
    return (
        <View style={{flexDirection: 'row', flex: 1}}>
            <SalesQueueSynch/>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Image style={{margin: 10, height: 35, width: 35}} source={{uri: props.appConfig.hostAddress + '/images/app/cart.png'}} size={32}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login', {message: 'bryan', logout: true})}>
                <Image style={{margin: 10, height: 35, width: 35}} source={{uri: props.appConfig.hostAddress + '/images/app/logout.png'}} size={32}/>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }; //none yet
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageBar);