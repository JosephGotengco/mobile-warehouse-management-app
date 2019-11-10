import React, { Component } from 'react';
import * as Font from 'expo-font';

// Redux imports
import { Provider } from "react-redux";
import store from "./store/store";

// Page imports
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import AuthNavigator from "./components/AuthNavigator";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Rubik-Regular": require("./assets/fonts/Rubik/Rubik-Regular.ttf"),
      "Rubik-Medium": require("./assets/fonts/Rubik/Rubik-Medium.ttf"),
      "Rubik-Bold": require("./assets/fonts/Rubik/Rubik-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
  }


  render() {
    return (
      <Provider store={store}>
        {this.state.fontLoaded ? (<AuthNavigator />) : null}
      </Provider>
    );
  }
}

