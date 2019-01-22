import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  SectionList,
  Alert,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

//import ProductSearchScreen from 'ProductSearchScreen';

export default class SalesScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page_id: 1
    };
  }
  
  static navigationOptions = {
    header: null,
  }

  render() {
    switch (this.state.page_id) {
      case 1:
        return (
          <ScrollView style={styles.scroll}>
            <View style={styles.welcomeContainer}>
                <Image
                  source={
                    __DEV__
                      ? require('../assets/images/gb.png')
                      : require('../assets/images/robot-prod.png')
                  }
                  style={styles.welcomeImage}
                />
            </View>
            <Text>You are logged in as [insert username here] and have selected the event [insert event here].</Text>
            <View
                style={styles.span}
            />
            <Text>If this is incorrect, please return to the Home tab and log in with your employee information or change your event.</Text>
            <View
                style={styles.span}
            />
            <Text>This might actually be less annoying if it was displayed only once after login and event selection, and then didn't reappear until the next login.</Text>
            <View
                style={styles.span}
            />
            <Text>Proceed?</Text>
            <View
                style={styles.span}
            /><View
            style={styles.span}
            />
            <Button
                onPress={() => {
                  this.setState({
                    page_id: 2
                  });
                }}
                title="Confirm My Information"
                color="#979797"
              />
          </ScrollView>
        );
        break;
        
      case 2: //product search
        return (
          <ScrollView style={styles.scroll}>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter search term"
                onChangeText={(text) => this.setState({text})}
              />
            </View>
            <ScrollView style={styles.searchResults}>
            <View
              style={styles.span}
            />
            <Button
              onPress={() => {
                Alert.alert("You've selected a product!");
              }}
              title="Product1"
              color="#bcbcbc"
            />
            <View
              style={styles.span}
            />
            <Button
              onPress={() => {
                Alert.alert("You've selected a product!");
              }}
              title="Product2"
              color="#bcbcbc"
            />
            <View
              style={styles.span}
            />
            <Button
              onPress={() => {
                Alert.alert("You've selected a product!");
              }}
              title="Product3"
              color="#bcbcbc"
            />
            <View
              style={styles.span}
            />
            </ScrollView>
            <View
              style={styles.span}
            />
            <View
              style={styles.span}
            />
            <Button style={styles}
              onPress={() => {
                this.setState({
                  page_id: 3
                });
              }}
              title="Checkout"
              color="#979797"
            />
          </ScrollView>
        );
        break;

      case 3: //cart and order review
        return (
          <ScrollView style={styles.scroll}>
            <Text>Review Your Order</Text>
            <View
              style={styles.span}
            />
            <View
              style={styles.span}
            />
            <Text style={styles.sectionText}>Items:</Text>
            <Text style={styles.lineItem}>Product | Quantity | Price</Text>
            <Text style={styles.lineItem}>Sailor Moon Button | 2 | 4.00</Text>
            <Text style={styles.lineItem}>Fairy Tail Red Symbol Button | 1 | 2.00</Text>
            <View
              style={styles.span}
            />
            <View
              style={styles.span}
            />
            <Text style={styles.sectionText}>Discounts:</Text>
            <Text style={styles.lineItem}>3 Button Discount | 1 | -1.00</Text>
            <View
              style={styles.span}
            />
            <View
              style={styles.span}
            />
            <Text style={styles.sectionText}>Total:</Text>
            <Text style={styles.lineItem}>3.00</Text>
          </ScrollView>
        );
        break;

      case 4: //order successful message and basic order details just so we can make sure info we wanted submitted has been submitted correctly
        return (
          <ScrollView style={styles.scroll}>
          </ScrollView>
        );
        break;

      default:
        return (
          <Text>This shouldn't happen :0</Text>
        )
      break;
    }
  }
}

const styles = StyleSheet.create({
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    scroll: {
        backgroundColor: '#c8e0e4',
        padding:30,
        //flexDirection: 'column',
    },
    optionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
        flex: 1
    },
    searchModes: {
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        fontSize: 20,
        flex: 1,
        backgroundColor: '#FFF',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#cce5ff',
    },
    span: {
      margin: 2
    },
    searchResults: {
      backgroundColor: '#e0eeef'
    },
    sectionText: {
      fontWeight: 'bold',
      fontSize:14,
    },
    lineItem: {
      textAlign: 'right',
    },
});