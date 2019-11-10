import React, { Component } from 'react';
import ReactNative, { View, Text, StyleSheet, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNavigation } from 'react-navigation';

import logo from "./../assets/logo.png";

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordHide: true,
        };
        this._scrollToInput = this._scrollToInput.bind(this);
    }

    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    render() {
        let { email, password, passwordHide } = this.state;

        return (
            <View style={styles.container}>

                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraScrollHeight={150}
                    contentContainerStyle={{ backgroundColor: "#F2F2F2", paddingTop: 25 }}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    <View style={{ width: 180, height: 180, marginVertical: 15, marginLeft: -15 }}>
                        <Image style={{ flex: 1, height: undefined, width: undefined }}
                            resizeMode="contain"

                            source={logo} />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'Rubik-Bold',
                            fontSize: 32,
                            color: "#4F4F4F"
                        }}>Welcome {"\n"}Back</Text>
                    </View>

                    <View style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        <View style={{ width: '90%' }}>
                            <TextField
                                label='Email'
                                lineWidth={2}
                                tintColor={"#828282"}
                                baseColor={"#828282"}
                                value={email}
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        <View style={{ width: '90%', position: 'relative' }}>
                            <TextField
                                label='Password'
                                lineWidth={2}
                                tintColor={"#828282"}
                                baseColor={"#828282"}
                                secureTextEntry={passwordHide}
                                value={password}
                                onChangeText={(password) => this.setState({ password })}
                            />
                            <MaterialCommunityIcons name={passwordHide ? "eye-off-outline" : "eye-outline"} size={24} color="#828282"
                                style={{ position: 'absolute', right: '3%', top: '45%' }}
                                onPress={() => this.setState({ passwordHide: !this.state.passwordHide })}
                            />
                        </View>
                    </View>

                    <View style={{
                        display: 'flex', width: "90%", justifyContent: 'space-between',
                        alignItems: "center", marginTop: 35, flexDirection: "row"
                    }}>
                        <Text style={{ fontFamily: "Rubik-Bold", fontSize: 32, color: "#4F4F4F" }}>
                            Sign In
                        </Text>
                        <View style={{
                            height: 50, width: 50, backgroundColor: "#4F4F4F", elevation: 5,
                            borderRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <MaterialIcons name="arrow-forward" size={32} color="#F2F2F2" />
                        </View>
                    </View>
                    <View style={{
                        display: 'flex', width: "90%", justifyContent: 'flex-start',
                        alignItems: "center", marginTop: 20, flexDirection: "row"
                    }}>
                        <Text
                            onPress={() => { this.props.navigation.push('SignUpPage') }}
                            style={{
                                fontFamily: "Rubik-Bold", fontSize: 16,
                                color: "#4F4F4F", textDecorationLine: 'underline'
                            }}>
                            Sign Up
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>

        );
    }
}
export default withNavigation(SignInPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingLeft: 25,
        flexDirection: 'column'
    }
})