import React, {Component} from 'react';
import {
    Text,
    Button,
    Alert,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {connect} from 'react-redux';
import style from '../styles';

class ProductListItem extends React.Component {
    render() {
        const currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        if (this.props.item.local_image_link) {
            DisplayImage = (
            <Image
                style={{width: 60, height: 60, alignContent: 'center'}}
                //source={{uri:(""+props.item.gb_image_link).replace('https://drive.google.com/open?id=', 'http://drive.google.com/uc?export=view&id=')}}
                source={{uri:(this.props.appConfig.hostAddress + '/' + this.props.item.local_image_link)}}
                resizeMethod="auto"
            />);
        } else { //only display this if there is no given product picture for an item
            //https://drive.google.com/file/d/1Faj2B7ftTti8QzMxN--GveGuAtfaou58/view?usp=sharing
            DisplayImage = 
            <Image
                style={{width: 60, height: 60, alignContent: 'center'}}
                source={{uri:(this.props.appConfig.hostAddress + '/images/app/unavailable.png')}} //link to "image not available"
                resizeMethod="auto"
            />
        }

        return (
            <View style={style.listItemBox}>
                <TouchableOpacity
                    style={styles.listItemBox}
                    onPress={() => this.props.onPressListItem(this.props.item, this.props.navigation)}
                >
                    {DisplayImage}
                    <View style={styles.listItemText}>
                        <Text numberOfLines={1} style={styles.nameDisplay}>{this.props.item.name}</Text>
                        <View style={styles.additionalInfo}>
                            <Text style={styles.productPrice}>{currencyFormatter.format(this.props.item.price)}</Text>
                            <Text numberofLines={1} style={styles.productSeries}>{this.props.item.product_series}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPressListItem: (item, navigation) => {
            navigation.navigate('ProductInfo', {
                item: item
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);