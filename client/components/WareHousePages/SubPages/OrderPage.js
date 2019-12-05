import React, { Component } from 'react';
import { View, Text, FlatList } from "react-native";
import * as Constants from './../../../constants';
import { ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class OrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderId: 0,
            date: "2019-12-02",
            time: "8:30",
            items: []
        }
    }

    componentWillMount() {
        const {navigation} = this.props;
        let numOfItems = 0;
        navigation.getParam('items').forEach(obj => {
            numOfItems += obj.quantity
        })
        this.setState({
            orderId: navigation.getParam('orderId'),
            date: navigation.getParam('date'),
            time: navigation.getParam('time'),
            items: navigation.getParam('items'),
            numOfItems
        });
    }

    render() {
        let {orderId, date, time, items, numOfItems} = this.state;
        // date
        let dateArr = date.split('-');
        let fullYear = dateArr[0];
        let monthNum = dateArr[1];
        let month = Constants.MONTHS[monthNum - 1];
        let dateNum = dateArr[2];
        // time
        let timeArr = time.split(':');
        let hours = timeArr[0] > 12 ? timeArr[0] - 12 : timeArr;
        let minutes = timeArr[1];

        return (
            <View style={{
                flex: 1,
                backgroundColor: '##f1f1f1',
                borderRadius: 20,
            }}>
            <View style={{
                padding: '3%'
            }}>
                <View style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                margin: '5%'
            }}>
                    <View style={{
                width: '50%'
            }}>
                        <View>
                            <Text style={{
                fontSize: wp('4%')
            }}>Order ID: {`${orderId}`}</Text>
                        </View>
                        <View>
                            <Text style={{
                fontSize: wp('4%')
            }}>
                                # of Items: {`${numOfItems}`}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                        <View>
                            <Text style={{
                fontSize: wp('4%')
            }}>Date: {`${month} ${dateNum}, ${fullYear}`}</Text>
                        </View>
                        <View>
                            <Text style={{
                fontSize: wp('4%')
            }}>Time: {`${hours}:${minutes}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                width: '100%'
            }}>
                    <Text style={{
                fontSize: hp('4%'),
                fontWeight: "bold",
                color: "#46CDCD"
            }}>

            Items:</Text>
                </View>
                </View>
                <FlatList
            data={items}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <ListItem
                containerStyle={{
                    backgroundColor: "#f1f1f1",
                    borderBottomColor: "black",
                    borderWidth: 1,
                }}
                key={item.id}
                title={item.name}
                subtitle={"Quantity: " + item.quantity}
                subtitleStyle={{
                    fontSize: hp('1.75%')
                }}
                bottomDivider={true}
                />
            }
            />
            </View>
        );
    }
}

export default OrderPage;