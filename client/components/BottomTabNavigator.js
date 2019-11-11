import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons'; // 6.2.2
import React from 'react';

// Page imports
import HomePage from "./HomePage";
import WarehousePage from "./WarehousePage";
import SchedulePage from "./SchedulePage";
import AccountPage from "./AccountPage";


const bottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="home-outline" size={25} color={tintColor}
                    />),
            }
        },
        Warehouse: {
            screen: WarehousePage,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Feather name="truck" size={25} color={tintColor}
                    />),
            }
        },
        Schedule: {
            screen: SchedulePage,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="calendar-o" size={20} color={tintColor}
                    />),
            }
        },
        Account: {
            screen: AccountPage,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="account-outline" size={27} color={tintColor ? tintColor : "#333333"}
                    />),
            }
        }
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: "#46CDCD"
        }
    }
);

export default createAppContainer(bottomTabNavigator);