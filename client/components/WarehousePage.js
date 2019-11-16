import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Warehouse Page Imports
import WarehouseHome from './WareHousePages/WarehouseHome';
import InPage from './WareHousePages/InPage';
import OutPage from './WareHousePages/OutPage';
import StocksPage from './WareHousePages/StocksPage';
import HistoryPage from './WareHousePages/HistoryPage';


const WarehouseStack = createStackNavigator(
    {
        WarehouseHome: {
            screen: WarehouseHome,
            navigationOptions: {
                header: null,
            }
        },
        InPage: {
            screen: InPage
        },
        OutPage: {
            screen: OutPage
        },
        StocksPage: {
            screen: StocksPage
        },
        HistoryPage: {
            screen: HistoryPage
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