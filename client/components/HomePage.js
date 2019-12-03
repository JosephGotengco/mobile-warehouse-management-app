import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'; // 6.2.2
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getInventory } from "./../actions/inventoryActions";
import { getNumOfUsers } from "./../actions/userActions";
import { getInOrders, getOutOrders } from "./../actions/orderActions";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfInventoryItems: 0
        }
        this.sumInventoryItems = this.sumInventoryItems.bind(this);
        this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    }
    componentWillMount() {
        this.props.getInventory();
        this.props.getNumOfUsers();
        this.props.getInOrders();
        this.props.getOutOrders();
    }
    componentDidUpdate(prevProps) {
        let { inventoryItems } = this.props;
        if (prevProps.inventoryItems.length !== inventoryItems.length) {
            this.sumInventoryItems(inventoryItems);
        }
    }
    sumInventoryItems = inventoryItems => {
        let { numOfInventoryItems } = this.state;
        inventoryItems.forEach(obj => numOfInventoryItems += obj.quantity);
        this.setState({
            numOfInventoryItems
        })
    }
    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let { user, numOfUsers, inOrders, outOrders } = this.props;
        let { firstName, lastName, shifts } = user;
        let shiftsLength = Object.keys(shifts).length;
        let inOrdersLength = inOrders.length;
        let outOrdersLength = outOrders.length;
        let { numOfInventoryItems } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: "#F2F2F2", padding: 10, paddingHorizontal: '6%', alignItems: 'flex-start', paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
                <View style={{ display: 'flex', flexDirection: 'column', marginVertical: 20 }}>
                    <Text style={{ fontSize: 32 }}>Welcome</Text>
                    <Text style={{ fontSize: 32, fontWeight: '800' }}>{`${this.capitalizeFirstLetter(firstName)} ${this.capitalizeFirstLetter(lastName)}`}!</Text>
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ width: '100%' }}><Text style={{ fontSize: 24, fontWeight: '800', color: '#46CDCD' }}>Employee Summary</Text></View>
                    <View style={{ flexDirection: 'row', flex: 1, paddingTop: '5%', justifyContent: 'space-between', alignItems: 'stretch', display: 'flex' }}>
                        <View style={styles.responsiveBox}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ backgroundColor: 'rgba(70, 205, 205, 0.25)', borderRadius: 50, padding: 5 }}>
                                    <MaterialCommunityIcons name="calendar" size={32} color={'black'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#46CDCD', fontSize: 26, fontWeight: '800' }}>{`${shiftsLength}`}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 14, color: "#333333" }}>
                                        # of Shifts
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.responsiveBox}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ backgroundColor: 'rgba(70, 205, 205, 0.25)', borderRadius: 50, padding: 5 }}>
                                    <MaterialCommunityIcons name="archive" size={32} color={'black'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#46CDCD', fontSize: 26, fontWeight: '800' }}>{`${numOfInventoryItems}`}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 14, color: "#333333" }}>
                                        # of Items
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, paddingTop: '5%', justifyContent: 'space-between', alignItems: 'stretch', display: 'flex' }}>
                        <View style={styles.responsiveBox}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ backgroundColor: 'rgba(70, 205, 205, 0.25)', borderRadius: 50, padding: 5 }}>
                                    <MaterialCommunityIcons name="arrow-expand-down" size={32} color={'black'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#46CDCD', fontSize: 26, fontWeight: '800' }}>{`${inOrdersLength}`}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 14, color: "#333333" }}>
                                        # of Incoming Orders
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.responsiveBox}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ backgroundColor: 'rgba(70, 205, 205, 0.25)', borderRadius: 50, padding: 5 }}>
                                    <MaterialCommunityIcons name="arrow-expand-up" size={32} color={'black'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#46CDCD', fontSize: 26, fontWeight: '800' }}>{`${outOrdersLength}`}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 14, color: "#333333" }}>
                                        # of Outgoing Orders
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, width: '100%', marginTop: 30 }}>
                    <View style={{ width: '100%' }}><Text style={{ fontSize: 24, fontWeight: '800', color: '#46CDCD' }}>Company Summary</Text></View>
                    <View style={{ flexDirection: 'row', flex: 1, paddingTop: '5%', justifyContent: 'space-between', alignItems: 'stretch', display: 'flex' }}>
                        <View style={styles.responsiveBox}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ backgroundColor: 'rgba(70, 205, 205, 0.25)', borderRadius: 50, padding: 5 }}>
                                    <MaterialCommunityIcons name="account" size={32} color={'black'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#46CDCD', fontSize: 26, fontWeight: '800' }}>{`${numOfUsers}`}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 14, color: "#333333" }}>
                                        # of Employees
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.responsiveBox}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ backgroundColor: 'rgba(70, 205, 205, 0.25)', borderRadius: 50, padding: 5 }}>
                                    <MaterialCommunityIcons name="archive" size={32} color={'black'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#46CDCD', fontSize: 26, fontWeight: '800' }}>{`${numOfInventoryItems}`}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 14, color: "#333333" }}>
                                        # of Items
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    inventoryItems: state.inventory.items,
    numOfUsers: state.user.numOfUsers,
    inOrders: state.order.inOrders,
    outOrders: state.order.outOrders
})


export default connect(mapStateToProps, { getInventory, getNumOfUsers, getInOrders, getOutOrders })(HomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    responsiveBox: {
        width: wp('40.5%'),
        height: hp('12%'),
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#F2F2F2',
        elevation: 24,
        borderRadius: 15
    },
    text: {
        color: 'white'
    }
});