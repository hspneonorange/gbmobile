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
import SearchProductListItem from '@components/SearchProductListItem';
import actionType from '../constants/actionType';
import Moment from 'moment';

const CommissionPage = (props) => {
    /*REQUIRED FIELDS FOR COMMISSION:
      event_id*
      user_id*
      datetime_recorded*
      commissioner_name*
      commissioner_email*
      commission_details
      price (int/float)
      paid (bool)
      completed (bool)
    */
    return (
        <ScrollView style={styles.scroll}>
            <View style={{paddingBottom: 120}}>
                <Text style={styles.nameDisplay}>Commissioner Contact Information</Text>
                <View style={styles.span} />
                
                <Text>Name (Required):</Text>
                <TextInput style={styles.textInput} placeholder="Enter commissioner name" onChangeText={(text) => props.commissionerNameTextChanged(text)} />
                <View style={styles.span} />
                
                <Text>Email Address (Required):</Text>
                <TextInput style={styles.textInput} placeholder="Enter commissioner email" onChangeText={(text) => props.commissionerEmailTextChanged(text)} />
                <View style={styles.span} />
                
                <Text>Phone Number:</Text>
                <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder="Enter commissioner phone number" onChangeText={(text) => props.commissionerPhoneTextChanged(text)} />
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />

                <Text style={styles.nameDisplay}>Shipping Information</Text>
                <View style={styles.span} />
                
                <Text>Street Address:</Text>
                <TextInput style={styles.textInput} placeholder="Enter street address" onChangeText={(text) => props.commissionerStreetAddressTextChanged(text)} />
                <View style={styles.span} />
                
                <Text>City:</Text>
                <TextInput style={styles.textInput} placeholder="Enter city" onChangeText={(text) => props.commissionerCityTextChanged(text)} />
                <View style={styles.span} />
                
                <Text>State:</Text>
                <Picker
                    selectedValue={props.commissionerStateAbbr}
                    onValueChange={(stateValue, stateIndex) =>
                        props.commissionerStateAbbrChanged(stateValue)
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
                <TextInput style={styles.textInput} keyboardType='decimal-pad'placeholder="Enter ZIP code" onChangeText={(text) => props.commissionerZipTextChanged(text)} />
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />

                <Text style={styles.nameDisplay}>Commission Information</Text>
                <View style={styles.span} />
                
                <Text>Commission Details (Required):</Text>
                <TextInput style={styles.textInput} multiline={true} minHeight={200} placeholder="Please be as detailed as possible" onChangeText={(text) => props.commissionDetailsChanged(text)} />
                <View style={styles.span} />
                
                <Text>Price (Required):</Text>
                <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder="Enter price" onChangeText={(text) => props.commissionPriceKeyPressed(text)} />
                <View style={styles.span} />
                
                <Text>Paid? (Required):</Text>
                <Picker
                    selectedValue={props.commissionPaymentStatus}
                    onValueChange={(paymentValue, paymentIndex) =>
                        props.commissionPaymentStatusChanged(paymentValue)
                    }>
                    <Picker.Item label="Select one" value='' />
                    <Picker.Item label="No" value={false} />
                    <Picker.Item label="Yes" value={true} />
                </Picker>
                <View style={styles.span} />
                
                <Text>Completed? (Required):</Text>
                <Picker
                    selectedValue={props.commissionCompletionStatus}
                    onValueChange={(completionValue, completionIndex) =>
                        props.commissionCompletionStatusChanged(completionValue)
                    }>
                    <Picker.Item label="Select one" value='' />
                    <Picker.Item label="No" value={false} />
                    <Picker.Item label="Yes" value={true} />
                </Picker>
                <View style={styles.span} />
                <View style={styles.span} />

                <Button title="Submit" color="#979797" onPress={() => {props.submitPressed(
                    props.commissionerName,
                    props.commissionerEmail,
                    props.commissionerPhone,
                    props.commissionerStreetAddress,
                    props.commissionerCity,
                    props.commissionerStateAbbr,
                    props.commissionerZip,
                    props.appConfig.hostAddress,
                    props.sessionToken,
                    props.eventId,
                    props.userId,
                    props.commissionDetails,
                    props.commissionPrice,
                    props.commissionPaymentStatus,
                    props.commissionCompletionStatus,
                )}}/>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        appConfig: state.appConfig,
        commissionerName: state.commissionerName,
        commissionerEmail: state.commissionerEmail,
        commissionerPhone: state.commissionerPhone,
        commissionerStreetAddress: state.commissionerStreetAddress,
        commissionerCity: state.commissionerCity,
        commissionerStateAbbr: state.commissionerStateAbbr,
        commissionerZip: state.commissionerZip,
        eventId: state.eventId,
        userId: state.userId,
        commissionDetails: state.commissionDetails,
        commissionPrice: state.commissionPrice,
        commissionPaymentStatus: state.commissionPaymentStatus,
        commissionCompletionStatus: state.commissionCompletionStatus,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        commissionerNameTextChanged: (text) => {
            dispatch({type: actionType.COMMISSIONER_NAME_TEXT_CHANGED, commissionerName: text});
        },
        commissionerEmailTextChanged: (text) => {
            dispatch({type: actionType.COMMISSIONER_EMAIL_TEXT_CHANGED, commissionerEmail: text});
        },
        commissionerPhoneTextChanged: (text) => {
            dispatch({type: actionType.COMMISSIONER_PHONE_TEXT_CHANGED, commissionerPhone: text});
        },
        commissionerStreetAddressTextChanged: (text) => {
            dispatch({type: actionType.COMMISSIONER_STREET_ADDRESS_TEXT_CHANGED, streetAddress: text});
        },
        commissionerCityTextChanged: (text) => {
            dispatch({type: actionType.COMMISSIONER_CITY_TEXT_CHANGED, city: text});
        },
        commissionerStateAbbrChanged: (stateValue) => {
            dispatch({type: actionType.COMMISSIONER_STATE_ABBR_CHANGED, stateAbbr: stateValue});
        },
        commissionerZipTextChanged: (text) => {
            dispatch({type: actionType.COMMISSIONER_ZIP_TEXT_CHANGED, zipCode: text});
        },
        commissionDetailsChanged: (text) => {
            dispatch({type: actionType.COMMISSION_DETAILS_TEXT_CHANGED, commissionDetails: text});
        },
        commissionPriceKeyPressed: (text) => {
            dispatch({type: actionType.COMMISSION_PRICE_KEY_PRESS, commissionPrice: text});
        },
        commissionPaymentStatusChanged: (paymentValue) => {
            dispatch({type: actionType.COMMISSION_PAYMENT_STATUS_CHANGED, paymentStatus: paymentValue});
        },
        commissionCompletionStatusChanged: (completionValue) => {
            dispatch({type: actionType.COMMISSION_COMPLETION_STATUS_CHANGED, completionStatus: completionValue});
        },

        submitPressed: (
            commissionerName,
            commissionerEmail,
            commissionerPhone,
            commissionerStreetAddress,
            commissionerCity,
            commissionerStateAbbr,
            commissionerZip,
            hostAddress,
            sessionToken,
            eventId,
            userId,
            commissionDetails,
            commissionPrice,
            commissionPaymentStatus,
            commissionCompletionStatus,
        ) => {
            fetch(hostAddress + '/commissions', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + sessionToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify ({
                    event_id: eventId,
                    user_id: userId,
                    datetime_recorded: Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    commissioner_name: commissionerName,
                    commissioner_email: commissionerEmail,
                    commissioner_phone: commissionerPhone.replace('-','').replace('(','').replace(')',''), //should strip out unnecessary characters in phone #
                    street_address: commissionerStreetAddress,
                    address_city: commissionerCity,
                    address_state_abbr: commissionerStateAbbr,
                    address_zip: commissionerZip,
                    commission_details: commissionDetails,
                    price: commissionPrice,
                    paid: commissionPaymentStatus,
                    completed: commissionCompletionStatus,
                })
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                dispatch({type: actionType.RETURN_SEARCH_ITEMS, searchItems: responseJson.items})
            })
            .catch((error) => {
                console.error(error);
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommissionPage);