import React from 'react';
import {
    ScrollView,
    FlatList,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import EventListItem from '@components/EventListItem';
import actionType from '@constants/actionType';

const SelectEventScreen = (props) => {
    if (!props.events || props.events.length == 0) props.queryEvents(props.sessionToken, props.appConfig.hostAddress);
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.searchResults}>
              <FlatList 
                data = {props.events}
                keyExtractor = {item => 'list-item-$'+item.id}
                renderItem = {({item}) => <EventListItem item={item} navigation={props.navigation} />}
              />
              <View style={styles.span} />
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        events: state.events,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        queryEvents: (sessionToken,hostAddress) => {
            fetch(hostAddress + '/api/events', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                dispatch({type: actionType.RETURN_EVENTS, events: responseJson.items})
            })
            .catch((error) => {
                console.error(error);
            });
        },
        updateSessionToken: (sessionToken) => {
            dispatch({type: actionType.HANDLE_AUTHN, token: sessionToken});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectEventScreen);
