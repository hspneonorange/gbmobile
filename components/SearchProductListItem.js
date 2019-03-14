import React from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import ProductInfoListItem from '@components/ProductListItem';
import {connect} from 'react-redux';
import styles from '../styles';
import actionType from '@constants/actionType';

const SearchProductListItem = (props) => {
    // TODO: May want to add some indication whether this item is already in the cart (and how many)
    return (
        <TouchableOpacity style={styles.listItemBorderBox}>
            <ProductInfoListItem item={props.item}/>
            <TouchableOpacity style={styles.addToCart} onPress={() => props.addToCart(props.item)}>
                <Text style={styles.addProductText}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: ownProps.item,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {
            dispatch({type: actionType.ADD_TO_CART, item: item})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductListItem);
