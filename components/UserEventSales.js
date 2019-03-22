import React from 'react';
import {
    ScrollView,
    Text,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';

export const UserEventSales = (props) => {
    if (!props.userEventSalesUpdated) props.queryUserEventSales(props.sessionToken, props.appConfig.hostAddress, props.userId, props.eventId);
    return (
        <ScrollView style={styles.scroll}>
            <Text style={styles.nameDisplay}>Your 20 Most Recent Synced Sales</Text>
            <FlatList 
                data = {props.userEventSales}
                keyExtractor = {item => 'list-item-$'+item.id}
                renderItem = {({item}) => <Text>{item.id}, {item.date}, {item.discount}, {item.notes}</Text>}
            />
        </ScrollView>
    )
}

const mapStateToProps = (state, ownProps) => {
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
        onPressListItem: (item) => {
            NavigationService.navigate('ProductInfo', {
                item: item
            });
        },
        queryUserEventSales: (sessionToken, hostAddress, userId, eventId) => {
            fetch(hostAddress + '/api/sales/' + userId + '/' + eventId, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: actionType.UPDATE_USER_EVENT_SALES, userEventSales: responseJson.items})
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEventSales);