import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Picker,
} from 'react-native';
import {connect} from 'react-redux';
import actionType from '../constants/actionType';

export class CommissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionerName: '',
            commissionerEmail: '',
            commissionerPhone: '',
            commissionerStreetAddress: '',
            commissionerCity: '',
            commissionerStateAbbr: '',
            commissionerZip: '',
            commissionDetails: '',
            commissionPrice: '',
            commissionAmountPaid: '',
            commissionCompletionStatus: '',
        }
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={{paddingBottom: 200}}>
                    <Text style={{fontWeight:'bold', fontSize: 20,}}>Commissioner Contact Information</Text>
                    <View style={styles.span} />
                    
                    <Text>Name (Required):</Text>
                    <TextInput style={styles.textInput} placeholder="Enter commissioner name" onChangeText={(text) => this.setState({commissionerName: text})} />
                    <View style={styles.span} />
                    
                    <Text>Email Address (Required):</Text>
                    <TextInput style={styles.textInput} placeholder="Enter commissioner email" onChangeText={(text) => this.setState({commissionerEmail: text})} />
                    <View style={styles.span} />
                    
                    <Text>Phone Number:</Text>
                    <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder="Enter commissioner phone number" onChangeText={(text) => this.setState({commissionerPhone: text})} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />

                    <Text style={{fontWeight:'bold', fontSize: 20,}}>Shipping Information</Text>
                    <View style={styles.span} />
                    
                    <Text>Street Address:</Text>
                    <TextInput style={styles.textInput} placeholder="Enter street address" onChangeText={(text) => this.setState({commissionerStreetAddress: text})} />
                    <View style={styles.span} />
                    
                    <Text>City:</Text>
                    <TextInput style={styles.textInput} placeholder="Enter city" onChangeText={(text) => this.setState({commissionerCity: text})} />
                    <View style={styles.span} />
                    
                    <Text>State:</Text>
                    <Picker
                        selectedValue={this.state.commissionerStateAbbr}
                        onValueChange={(stateValue) =>
                            this.setState({commissionerStateAbbr: stateValue})
                        }>
                        <Picker.Item label="Select a state" value='' />
                        <Picker.Item label="Texas" value="TX" />
                        <Picker.Item label="Alabama" value="AL" />
                        <Picker.Item label="Alaska" value="AK" />
                        <Picker.Item label="Arizona" value="AZ" />
                        <Picker.Item label="Arkansas" value="AR" />
                        <Picker.Item label="California" value="CA" />
                        <Picker.Item label="Colorado" value="CO" />
                        <Picker.Item label="Connecticut" value="CT" />
                        <Picker.Item label="Delaware" value="DE" />
                        <Picker.Item label="Florida" value="FL" />
                        <Picker.Item label="Georgia" value="GA" />
                        <Picker.Item label="Hawaii" value="HI" />
                        <Picker.Item label="Idaho" value="ID" />
                        <Picker.Item label="Illinois" value="IL" />
                        <Picker.Item label="Indiana" value="IN" />
                        <Picker.Item label="Iowa" value="IA" />
                        <Picker.Item label="Kansas" value="KS" />
                        <Picker.Item label="Kentucky" value="KY" />
                        <Picker.Item label="Louisiana" value="LA" />
                        <Picker.Item label="Maine" value="ME" />
                        <Picker.Item label="Maryland" value="MD" />
                        <Picker.Item label="Massachusetts" value="MA" />
                        <Picker.Item label="Michigan" value="MI" />
                        <Picker.Item label="Minnesota" value="MN" />
                        <Picker.Item label="Mississippi" value="MS" />
                        <Picker.Item label="Missouri" value="MO" />
                        <Picker.Item label="Montana" value="MT" />
                        <Picker.Item label="Nebraska" value="NE" />
                        <Picker.Item label="Nevada" value="NV" />
                        <Picker.Item label="New Hampshire" value="NH" />
                        <Picker.Item label="New Jersey" value="NJ" />
                        <Picker.Item label="New Mexico" value="NM" />
                        <Picker.Item label="New York" value="NY" />
                        <Picker.Item label="North Carolina" value="NC" />
                        <Picker.Item label="North Dakota" value="ND" />
                        <Picker.Item label="Ohio" value="OH" />
                        <Picker.Item label="Oklahoma" value="OK" />
                        <Picker.Item label="Oregon" value="OR" />
                        <Picker.Item label="Pennsylvania" value="PA" />
                        <Picker.Item label="Rhode Island" value="RI" />
                        <Picker.Item label="South Carolina" value="SC" />
                        <Picker.Item label="South Dakota" value="SD" />
                        <Picker.Item label="Tennessee" value="TN" />
                        <Picker.Item label="Utah" value="UT" />
                        <Picker.Item label="Vermont" value="VT" />
                        <Picker.Item label="Virginia" value="VA" />
                        <Picker.Item label="Washington" value="WA" />
                        <Picker.Item label="West Virginia" value="WV" />
                        <Picker.Item label="Wisconsin" value="WI" />
                        <Picker.Item label="Wyoming" value="WY" />
                    </Picker>
                    <View style={styles.span} />
                    
                    <Text>ZIP Code:</Text>
                    <TextInput style={styles.textInput} keyboardType='decimal-pad'placeholder="Enter ZIP code" onChangeText={(text) => this.setState({commissionerZip: text})} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />

                    <Text style={{fontWeight:'bold', fontSize: 20,}}>Commission Information</Text>
                    <View style={styles.span} />
                    
                    <Text>Commission Details (Required):</Text>
                    <TextInput style={styles.textInput} multiline={true} minHeight={200} placeholder="Please be as detailed as possible" onChangeText={(text) => this.setState({commissionDetails: text})} />
                    <View style={styles.span} />
                    
                    <Text>Price (Required):</Text>
                    <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder="Enter price" onChangeText={(text) => this.setState({commissionPrice: text})} />
                    <View style={styles.span} />
                    
                    <Text>Amount Paid (Required):</Text>
                    <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder="Enter total amount paid" onChangeText={(text) => this.setState({commissionAmountPaid: text})} />
                    <View style={styles.span} />
                    
                    <Text>Completed? (Required):</Text>
                    <Picker
                        selectedValue={this.state.commissionCompletionStatus}
                        onValueChange={(completionValue) =>
                            this.setState({commissionCompletionStatus: completionValue})
                        }>
                        <Picker.Item label="Select one" value='' />
                        <Picker.Item label="No" value={false} />
                        <Picker.Item label="Yes" value={true} />
                    </Picker>
                    <View style={styles.span} />
                    <View style={styles.span} />

                    <Button title="Submit" color="#979797" onPress={() => {this.props.submitPressed(
                        this.state.commissionerName,
                        this.state.commissionerEmail,
                        this.state.commissionerPhone,
                        this.state.commissionerStreetAddress,
                        this.state.commissionerCity,
                        this.state.commissionerStateAbbr,
                        this.state.commissionerZip,
                        this.state.commissionDetails,
                        this.state.commissionPrice,
                        this.state.commissionAmountPaid,
                        this.state.commissionCompletionStatus,
                    )}}/>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        appConfig: state.appConfig,
        sessionToken: state.sessionToken,
        eventId: state.eventId,
        userId: state.userId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitPressed: (
            commissionerName,
            commissionerEmail,
            commissionerPhone,
            commissionerStreetAddress,
            commissionerCity,
            commissionerStateAbbr,
            commissionerZip,
            commissionDetails,
            commissionPrice,
            commissionAmountPaid,
            commissionCompletionStatus,
        ) => {
            dispatch({type: actionType.SUBMIT_COMMISSION,
                commissionerName: commissionerName,
                commissionerEmail: commissionerEmail,
                commissionerPhone: commissionerPhone,
                commissionerStreetAddress: commissionerStreetAddress,
                commissionerCity: commissionerCity,
                commissionerStateAbbr: commissionerStateAbbr,
                commissionerZip: commissionerZip,
                commissionDetails: commissionDetails,
                commissionPrice: commissionPrice,
                commissionAmountPaid: commissionAmountPaid,
                commissionCompletionStatus: commissionCompletionStatus,
            })
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommissionPage);