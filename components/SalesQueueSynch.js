import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Moment from 'moment';
import {withBadge, Icon} from 'react-native-elements';

class SalesQueueSynch extends Component{
    componentDidMount() {
        this.synchTimer = setInterval(() => this.run(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.synchTimer);
    }

    render() {
        if (this.props.salesQueue.length) {
            BadgedIcon = withBadge(this.props.salesQueue.length)(Icon)
        } else {
            BadgedIcon = Icon
        }
        return (
            <TouchableOpacity style={{margin: 10}}onPress={() => this.run()}>
                <BadgedIcon type='ionicon' name="md-sync" size={32}/>
            </TouchableOpacity>
        );
    }

    run() {
        // We take small single bites at the salesQueue; each API call is a single
        // bite and autonomous piece of work, with state updated in the salesQueue.
        // The salesQueue is immutably updated via Redux, so we can't count on
        // it to persist after a single bite of work is completed; we have to return
        // afresh another bite.

        if (!this.synchFlag) {
            if (this.props.salesQueue.length) {
                console.log('another go-round');
                fetch(this.props.appConfig.hostAddress)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('synch is not blocking');
                        this.synchFlag = true;
                        if (!this.props.salesQueue[0].id) {
                            // Create order, update order.id
                            console.log('no order.id; create order');
                            let responseBody = fetch(this.props.appConfig.hostAddress + '/api/sales', {
                                method: 'POST',
                                headers: {
                                    Authorization: "Bearer " + this.props.sessionToken,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({
                                    event_id: this.props.salesQueue[0].eventId,
                                    user_id: this.props.salesQueue[0].userId,
                                    date: Moment(this.props.salesQueue[0].time).format('YYYY-MM-DD HH:mm:ss'),
                                    discount: this.props.salesQueue[0].discount,
                                })
                            })
                            .then((responseBody) => responseBody.json())
                            .then((responseJson) => {
                                console.log(responseJson.id);
                                this.props.updateSaleId(this.props.salesQueue[0], responseJson.id);
                            })
                            .then(() => {
                                this.synchFlag = false;
                            })
                        } else {
                            // Create item, remove item from order
                            console.log('order.id exists; create item');
                            responseBody = fetch(this.props.appConfig.hostAddress + '/api/sale_line_items', {
                                method: 'POST',
                                headers: {
                                    Authorization: "Bearer " + this.props.sessionToken,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({
                                    sale_id: this.props.salesQueue[0].id,
                                    product_id: this.props.salesQueue[0].items[0].id,
                                    num_sold: this.props.salesQueue[0].items[0].quantity,
                                    sale_price: this.props.salesQueue[0].items[0].price,
                                })
                            })
                            .then((responseBody) => responseBody.json())
                            .then((responseJson) => {
                                this.props.removeItemFromOrder(this.props.salesQueue[0]);
                            })
                            .then(() => {
                                this.synchFlag = false;
                            })
                        }
                    } else {
                        console.log('Cannot connect to gbweeby');
                    }
                })
                .catch((error) => {
                    console.log('network error: ' + error);
                })
            // } else { // This acts like a "heartbeat" in the console to let us know synch is alive
            //     console.log('Sales queue is empty.');
            }
        } else {
            console.log('synch flag is blocking');
        }
    }
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        salesQueue: state.salesQueue,
        appConfig: state.appConfig,
        synchFlag: state.synchFlag,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSaleId: (order, id) => {
            dispatch({type: actionType.UPDATE_SALESQUEUE_ORDER_WITH_ID, order: order, id: id});
        },
        removeItemFromOrder: (order) => {
            dispatch({type: actionType.REMOVE_FIRST_ITEM_FROM_SALES_QUEUE, order: order});
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesQueueSynch);
