import React, {Component} from 'react';
import {ScrollView, TextInput, View, Button, Text, AsyncStorage} from 'react-native';
import HorizontalDivider from '@components/HorizontalDivider';
import {purgeStoredState} from 'redux-persist';
import {connect} from 'react-redux';
import actionType from '@constants/actionType';

class SettingsScreen extends Component {
    
    static navigationOptions = {
        title: 'Settings',
        headerStyle: {
            backgroundColor: '#666666'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentDidMount() {
        // Pull host and port from async storage
        // If non-null, populate 'host' and 'port'
        // If null, populate host with '192.168.4.1' and port with '5000'
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View>
                    <Text>URL</Text>
                    <TextInput defaultValue={this.state.hostAddress} style={styles.textInput} placeholder='e.g.: http://192.168.4.1:5000' onChangeText={(text) => {this.setState({hostAddress: text})}} />
                    <Button title="Save URL" color="#979797" onPress={() => {this.props.savePressed(this.state.hostAddress)}}/>
               </View>
               <View>
                   <Button title="gbweeby" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.4.1:5000'})}} />
                   <Button title="gbwebby AP" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.0.127:5000'})}} />
                   <Button title="coleowen" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.0.108:5000'})}} />
                   <Button title="dad" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.0.129:5000'})}} />
               </View>
               <HorizontalDivider/>
               <View>
                    <Button title="OwO Purge Stored State OwO" color="#979797" onPress={()=>{ purgeStoredState({storage: AsyncStorage})}}/>
               </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        appConfig: state.appConfig,
        sessionToken: state.sessionToken,
        navigation: ownProps.navigation,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        savePressed: (username, password, hostAddress) => {
            dispatch({action: actionType.UPDATE_HOST_ADDRESS, hostAddress: this.state.hostAddress});
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);