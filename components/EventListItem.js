import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import {connect} from 'react-redux';
import actionType from '@constants/actionType';

const EventListItem = (props) => {
    return (
        <TouchableOpacity
            style={styles.listItemBox}
            onPress={()=>props.onPressEvent(props.item, props.navigation)}
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
        onPressEvent: (item, navigation) => {
            dispatch({type: actionType.SET_EVENT, eventId: item.id});
            navigation.navigate('Sales');
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListItem);