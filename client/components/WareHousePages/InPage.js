import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import { getInOrders } from '../../actions/orderActions';
import * as Constants from './../../constants';

class InPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ordersByDate: []
        };
        this.groupOrdersByDate = this.groupOrdersByDate.bind(this);
        this.onOrderPress = this.onOrderPress.bind(this);
    }

    componentWillMount() {
        this.props.getInOrders();
        this.groupOrdersByDate(this.props.inOrders);
    }

    componentDidUpdate(prevProps) {
        if (this.props.inOrders.length !== prevProps.inOrders.length) {
            let { inOrders } = this.props;
            if (inOrders) {
                this.groupOrdersByDate(inOrders);
            }
        }
    }

    groupOrdersByDate = orders => {
        let ordersByDate = [];

        let allDates = [];
        for (let i = 0; i < orders.length; i++) {
            allDates.push(orders[i].date);
        }
        let uniqueDates = allDates.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        for (let j = 0; j < uniqueDates.length; j++) {
            let obj = {};
            let ordersOnDate = orders.filter(order => {
                return order.date === uniqueDates[j];
            });
            obj[uniqueDates[j]] = ordersOnDate;
            ordersByDate.push(obj);
        }
        this.setState({ ordersByDate });
    };

    onOrderPress = order => {
        let { id, date, time, items } = order;
        this.props.navigation.navigate('OrderPage', { orderId: id, date, time, items })
    }

    render() {
        let { ordersByDate } = this.state;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                {ordersByDate.map(obj => {
                    let key = Object.keys(obj)[0];
                    // date
                    let dateArr = key.split('-');
                    let fullYear = dateArr[0];
                    let monthNum = dateArr[1];
                    let dateNum = dateArr[2];
                    let month = Constants.MONTHS[monthNum - 1];
                    return (
                        <View key={key}>
                            <Text>{`${month} ${dateNum}, ${fullYear}`}</Text>
                            <FlatList
                                data={obj[key]}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) => {
                                    // time
                                    let timeArr = item.time.split(':');
                                    let hour = parseInt(timeArr[0]);
                                    let minute = parseInt(timeArr[1]);

                                    return (
                                        <ListItem
                                            containerStyle={{ backgroundColor: "#f1f1f1", borderBottomColor: "black", borderBottomWidth: 1 }}
                                            key={item.id}
                                            onPress={() => this.onOrderPress(item)}
                                            title={hour > 12 ? `${hour - 12}:${minute}PM` : `${item.time}AM`}
                                            subtitle={"Number of Items: " + item.items.length}
                                            subtitleStyle={{ fontSize: 13 }}
                                            bottomDivider={true}
                                        />
                                    )
                                }
                                }
                            />
                        </View>)
                })}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    inOrders: state.order.inOrders
})


export default withNavigation(connect(mapStateToProps, { getInOrders })(InPage));