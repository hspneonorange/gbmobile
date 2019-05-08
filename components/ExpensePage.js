import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Button,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Moment from 'moment';

export class UserExpenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            cost: 0,
        }
    }
    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.nameDisplay}>Submit An Expense</Text>
                <Text>Expense Description:</Text>
                <TextInput style={styles.textInput} placeholder="Enter expense details" onChangeText={(text) => this.setState({description: text})} />
                <Text>Cost:</Text>
                <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder="Enter cost" onChangeText={(text) => this.setState({cost: text})} />
                <Button title="Submit" color="#979797" onPress={() => {this.props.submitExpense(
                    this.props.sessionToken,
                    this.props.appConfig.hostAddress,
                    this.props.eventId,
                    this.props.userId,
                    this.state.description,
                    this.state.cost,
                    this.props.navigation,
                )}}/>
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitExpense: (sessionToken, hostAddress, eventId, userId, description, cost, navigation) => {
            console.log(hostAddress);
            console.log(JSON.stringify({
                description: description,
                cost: cost,
                datetime_recorded: Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                event_id: eventId,
                user_id: userId,
            }));
            fetch(hostAddress + '/api/expenses', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + sessionToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    description: description,
                    cost: cost,
                    datetime_recorded: Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    event_id: eventId,
                    user_id: userId,
                })
            })
            .then((response) => 
            {
                response.json();
                navigation.navigate('Search');
            })
            .catch((error) => {
                console.error(error);
            })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserExpenses);