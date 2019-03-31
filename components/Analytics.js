import React, { Component } from 'react';
import {View, Button, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HorizontalDivider from '@components/HorizontalDivider';

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salesForThisEvent: 0,
        }
    }

    componentDidMount() {
        fetch(this.props.appConfig.hostAddress + '/api/analytics/' + this.props.eventId, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + this.props.sessionToken
            }
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((responseJson) => {
            console.log('response: ', responseJson);
            console.log('total', responseJson.total);
            this.setState({salesForThisEvent: responseJson.total});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>Sales for this event: ${this.state.salesForThisEvent}</Text>
                </View>
                <HorizontalDivider />
                <Button color="#979797" title="Refresh" onPress={() => this.componentDidMount()} />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        appConfig: state.appConfig,
        eventId: state.eventId,
        userId: state.userId,
        userEventSalesUpdated: state.userEventSalesUpdated,
        userEventSales: state.userEventSales,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
