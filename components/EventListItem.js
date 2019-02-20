import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Moment from 'moment';

export default EventListItem = (props) => {
    return (
        <View style={styles.listItemBox}>
            <Text style={styles.nameDisplay}>{props.item.name}</Text>
            <Text>{Moment(props.item.start_date).format('ddd, D MMM, YYYY')}-{Moment(props.item.end_date).format('ddd, D MMM, YYYY')}</Text>
        </View>
    );
}