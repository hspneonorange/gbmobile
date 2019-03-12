import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Moment from 'moment';

class SalesQueueSynch extends Component{

    render() {
        return (
            <TouchableOpacity onPress={() => this.run()}>
                <Ionicons style={{margin: 10}} name="md-sync" size={32}/>
            </TouchableOpacity>
        );
    }

    async run() {
        // We take small single bites at the salesQueue; each API call is a single
        // bite and autonomous piece of work, with state updated in the salesQueue.
        // The salesQueue is immutably updated via Redux, so we can't count on
        // it to persist after a single bite of work is completed; we have to return
        // afresh another bite.
        try {
            console.log('SalesQueueSynch::this.props', this.props);
            while (this.props.salesQueue.length > 0) {
                if (!this.props.salesQueue[0].id) {
                    console.log('id is 0, so creating sale!');
                    // Create sale
                    await fetch(this.props.appConfig.hostAddress + '/sales', {
                        method: 'POST',
                        headers: {
                            Authorization: "Bearer " + this.props.sessionToken,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            event_id: this.props.salesQueue[0].eventId,
                            user_id: this.props.salesQueue[0].userId,
                            date: Moment(this.props.salesQueue[0].time).format('YYYY-MM-DD HH:MM:SS'),
                            discount: this.props.salesQueue[0].discount,
                        })
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                    // Update sale & all items w/ returned ID (via Redux)
                    console.log('pre-updateSaleId responseJson', responseJson);
                    this.props.updateSaleId(this.props.salesQueue[0], responseJson.id);
                        console.log('post-updateSaleId order', this.props.salesQueue[0]);
                    })
                    .catch((error) => {
                        throw error; 
                    });
                } else {
                    console.log('id is non-zero, so creating sale line item!');
                    // Sale already created; create SaleLineItems
                    fetch(this.props.appConfig.hostAddress + '/sale_line_items', {
                        method: 'POST',
                        headers: {
                            Authorization: "Bearer " + this.props.sessionToken
                        },
                        body: {
                            sale_id: this.props.salesQueue[0].id,
                            product_id: this.props.salesQueue[0].items[0].id,
                            num_sold: this.props.salesQueue[0].items[0].quantity,
                            sale_price: this.props.salesQueue[0].items[0].price,
                        }
                    })
                    .then((response) => response.json())
                    .then(async (responseJson) => {
                        // Remove order from salesQueue (via Redux)
                        this.props.removeItemFromOrder(this.props.salesQueue[0]);
                        console.log('post-updateSaleId order', this.props.salesQueue[0]);
                    })
                }
                // TODO: API should decrement stock as line items are added!
            }
        } catch(e) {
            console.log('Error encountered during synch process; ending until next iteration:', e);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        salesQueue: state.salesQueue,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSaleId: (order, saleId) => {
            dispatch({type: actionType.UPDATE_SALESQUEUE_ORDER_WITH_ID, order: order, id: saleId});
        },
        removeItemFromOrder: (order) => {
            dispatch({type: actionType.REMOVE_FIRST_ITEM_FROM_SALES_QUEUE, order: order})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesQueueSynch);
