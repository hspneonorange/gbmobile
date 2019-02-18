import React, {Component} from 'react';
import {ScrollView, FlatList, Button} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../components/NavigationService';
import EventListItem from '@components/EventListItem';

const SelectEventScreen = (props) => {
    if (props.events.length == 0) props.queryEvents(props.sessionToken);
    return (
        <ScrollView style={styles.scroll}>
            <ScrollView>
              <FlatList 
                data = {props.events}
                keyExtractor = {item => 'list-item-$'+item.id}
                renderItem = {({item}) => <EventListItem item={item} />}
              />
            </ScrollView>
            <Button title='Logout' onPress={() => props.logoutClick(props.sessionToken)} />
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        events: state.events,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        queryEvents: (sessionToken) => {
            fetch('http://192.168.0.100:5000/api/events', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson);
                dispatch({type: 'RETURN_EVENTS', events: responseJson.items})
            })
            .catch((error) => {
                console.error(error);
            });
        },
        logoutClick: async (sessionToken) => {
            await fetch('http://192.168.0.100:5000/api/tokens', {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then(() => NavigationService.navigate('Login'))
            .catch((error) => {
                console.error(error);
            });
        },
        updateSessionToken: (sessionToken) => {
            dispatch({type: 'HANDLE_AUTHN', token: sessionToken});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectEventScreen);
