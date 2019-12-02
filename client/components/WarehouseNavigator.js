import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Warehouse Page Imports
import WarehouseHome from './WareHousePages/WarehouseHome';
import InPage from './WareHousePages/InPage';
import OutPage from './WareHousePages/OutPage';
import StocksPage from './WareHousePages/StocksPage';
import HistoryPage from './WareHousePages/HistoryPage';
import OrderPage from './WareHousePages/SubPages/OrderPage';


const WarehouseStack = createStackNavigator(
    {
        WarehouseHome: {
            screen: WarehouseHome,
            navigationOptions: {
                header: null,
            }
        },
        InPage: {
            screen: InPage,
            navigationOptions: {
                title: "In"
            }
        },
        OutPage: {
            screen: OutPage,
            navigationOptions: {
                title: "Out"
            }
        },
        StocksPage: {
            screen: StocksPage,
            navigationOptions: {
                title: "Stocks"
            }
        },
        HistoryPage: {
            screen: HistoryPage,
            navigationOptions: {
                title: "History"
            }
        },
        OrderPage: {
            screen: OrderPage,
            navigationOptions: {
                title: "Order Page"
            }
        }
    },
    {
        initialRouteName: 'WarehouseHome'
    }
);

const WarehouseContainer = createAppContainer(WarehouseStack);

export default class WarehousePage extends Component {
    render() {
        return <WarehouseContainer />
    }
}