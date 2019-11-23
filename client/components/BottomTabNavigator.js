import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // 6.2.2
import React from "react";

// Page imports
import HomePage from "./HomePage";
import WarehousePage from "./WarehouseNavigator";
import SchedulePage from "./SchedulePage";
import AccountPage from "./AccountPage";

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="home-outline"
            size={35}
            color={tintColor}
          />
        )
      }
    },
    Warehouse: {
      screen: WarehousePage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="truck" size={35} color={tintColor} />
        )
      }
    },
    Schedule: {
      screen: SchedulePage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="calendar" size={35} color={tintColor} />
        )
      }
    },
    Account: {
      screen: AccountPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="account-outline"
            size={35}
            color={tintColor ? tintColor : "#333333"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Warehouse",
    tabBarOptions: {
      activeTintColor: "#46CDCD",
      style: {
        height: 55,
        paddingTop: 8
      }
    }
  }
);

export default createAppContainer(bottomTabNavigator);
