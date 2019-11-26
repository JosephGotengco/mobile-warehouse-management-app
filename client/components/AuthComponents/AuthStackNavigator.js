import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

const AuthNavigator = new createStackNavigator(
  {
    SignUpPage: {
      screen: SignUpPage,
      navigationOptions: {
        header: null
      }
    },
    SignInPage: {
      screen: SignInPage,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "SignInPage"
  }
);

AuthNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "CustomHide") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
};

export default createAppContainer(AuthNavigator);
