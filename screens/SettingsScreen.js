import React, {Component} from 'react';
import {ScrollView, TextInput, View, Button, Text, AsyncStorage, Clipboard} from 'react-native';
import HorizontalDivider from '@components/HorizontalDivider';
import {purgeStoredState} from 'redux-persist';
import {connect} from 'react-redux';
import actionType from '@constants/actionType';

class SettingsScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hostAddress: this.props.appConfig.hostAddress,
        }
    }

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

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View>
                    <Text>URL</Text>
                    <TextInput ref={(c) => {this.hostAddressTextInput = c}} value={this.state.hostAddress} style={styles.textInput} placeholder='e.g.: http://192.168.4.1:5000' onChangeText={(text) => {this.setState({hostAddress: text})}} />
                    <Button title="Save URL" color="#979797" onPress={() => {this.props.savePressed(this.state.hostAddress)}}/>
                </View>
                <HorizontalDivider />
                <View>
                    <Button title="gbweeby AP" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.4.1:5000'});}} />
                    <Button title="gbweeby" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.0.127:5000'});}} />
                    <Button title="coleowen" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.0.108:5000'});}} />
                    <Button title="dad" color="#979797" onPress={() => {this.setState({hostAddress: 'http://192.168.0.129:5000'});}} />
                    <HorizontalDivider/>
                    <Button title="OwO Purge Stored State OwO" color="#979797" onPress={()=>{purgeStoredState({storage: AsyncStorage})}}/>
                    <Button title="Copy salesQueue to clipboard" color="#979797" onPress={() => Clipboard.setString(this.props.salesQueue)}/>
                    <HorizontalDivider/>
                    <Button title="Empty Sales Queue" color="#979797" onPress={() => this.props.emptySalesQueue()}/>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        sessionToken: state.sessionToken,
        salesQueue: JSON.stringify(state.salesQueue),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        savePressed: (hostAddress) => {
            dispatch({type: actionType.UPDATE_HOST_ADDRESS, hostAddress: hostAddress});
        },
        dumpReduxState: () => {
            dispatch({type: actionType.DUMP_ALL_STATE});
        },
        emptySalesQueue: () => {
            dispatch({type: actionType.EMPTY_SALES_QUEUE});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);