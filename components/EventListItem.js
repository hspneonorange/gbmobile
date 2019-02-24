import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Moment from 'moment';
import {connect} from 'react-redux';
import NavigationService from '../components/NavigationService';

const EventListItem = (props) => {
    return (
        <TouchableOpacity
            style={styles.listItemBox}
            onPress={()=>props.onPressEvent(props.item)}
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
    }; //none yet? ówò
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPressEvent: (item) => {
            dispatch({type: 'SET_EVENT', event: item.id});
            console.log('Selected: ', item.id, '|', item.name);
            NavigationService.navigate('Sales');
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListItem);