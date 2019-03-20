import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import Moment from 'moment';
import {connect} from 'react-redux';
import NavigationService from '../components/NavigationService';
import actionType from '@constants/actionType';

const EventListItem = (props) => {
    return (
        <TouchableOpacity
            style={styles.listItemBox}
            onPress={()=>props.onPressEvent(props.item, props.sessionToken, props.userId)}
        >
            <View style={styles.listItemText}>
                <Text style={styles.nameDisplay}>{props.item.name}</Text>
                <Text>{Moment(props.item.start_date).format('ddd, D MMM, YYYY')}-{Moment(props.item.end_date).format('ddd, D MMM, YYYY')}</Text>
            </View>
        </TouchableOpacity>
    );
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        userId: state.userId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPressEvent: (item, sessionToken, userId) => {
            console.log('item, sessionToken, userId:', item, sessionToken, userId);
            dispatch({type: actionType.SET_EVENT, eventId: item.id});
            try {
                AsyncStorage.setItem('@Authentication:access-token', sessionToken);
                AsyncStorage.setItem('@Authentication:userId', userId.toString());
                AsyncStorage.setItem('@Event:eventId', item.id.toString());
                // TODO: Add userId as another AsyncStorage item
            } catch (error) {
                console.log('AsyncStorage failed: ', error);
            }
            NavigationService.navigate('Sales');
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListItem);