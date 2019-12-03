import React, { Component } from 'react';
import ReactNative, { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { signUp, resetFailedSignUp } from "../../actions/authActions";
import logo from "./../../assets/logo.png";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            passwordHide: true,
            confirmPassword: '',
            confirmPasswordHide: true,
            buttonLoading: false
        };
        this._scrollToInput = this._scrollToInput.bind(this);
    }


    formatText = (text) => {
        return text.replace(/[^+\d]/g, '');
    };

    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    onSubmit = () => {
        let { firstName, lastName, email, phone, password, confirmPassword } = this.state;
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) return alert("Please fill in all the fields.");
        this.setState({ buttonLoading: true });
        this.props.signUp({ firstName, lastName, email, phone, password, confirmPassword });
    }

    componentDidUpdate() {
        let { registerErr, resetFailedSignUp, registerErrMsg } = this.props;
        if (registerErr == true) {
            resetFailedSignUp();
            alert(registerErrMsg);
            this.setState({ buttonLoading: false });
        }
    }

    render() {
        let { firstName, lastName, phone, email, password,
            passwordHide, confirmPassword, confirmPasswordHide, buttonLoading } = this.state;

        return (
            <View style={styles.container}>

                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraScrollHeight={150}
                    contentContainerStyle={{ backgroundColor: "#F2F2F2", paddingTop: 25 }}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    <View style={{ height: 50, width: 50, marginVertical: 15 }}>
                        <Image style={{ flex: 1, height: undefined, width: undefined }}
                            resizeMode="contain"
                            source={logo} />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'Rubik-Bold',
                            fontSize: 32,
                            color: "#4F4F4F"
                        }}>Create {"\n"}Account</Text>
                    </View>
                    <View style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        <View style={{ width: '40%' }}>
                            <TextField
                                label='First Name'
                                lineWidth={2}
                                tintColor={"#828282"}
                                baseColor={"#828282"}
                                value={firstName}
                                onChangeText={(firstName) => this.setState({ firstName })}
                            />
                        </View>
                        <View style={{ width: '40%', marginLeft: '10%' }}>
                            <TextField
                                label='Last Name'
                                lineWidth={2}
                                tintColor={"#828282"}
                                baseColor={"#828282"}
                                value={lastName}
                                onChangeText={(lastName) => this.setState({ lastName })}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        <View style={{ width: '90%' }}>
                            <TextField
                                label='Phone'
                                lineWidth={2}
                                tintColor={"#828282"}
                                baseColor={"#828282"}
                                keyboardType='phone-pad'
                                formatText={this.formatText}
                                value={phone}
                                onChangeText={(phone) => this.setState({ phone })}
                            />
                        </View>
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
                                onPress={() => this.setState({ passwordHide: !passwordHide })}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        <View style={{ width: '90%', position: 'relative' }}>
                            <TextField
                                label='Confirm Password'
                                lineWidth={2}
                                tintColor={"#828282"}
                                baseColor={"#828282"}
                                secureTextEntry={confirmPasswordHide}
                                onFocus={(event) => {
                                    // `bind` the function if you're using ES6 classes
                                    this._scrollToInput(ReactNative.findNodeHandle(event.target))
                                }}
                                value={confirmPassword}
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                            />
                            <MaterialCommunityIcons name={confirmPasswordHide ? "eye-off-outline" : "eye-outline"} size={24} color="#828282"
                                style={{ position: 'absolute', right: '3%', top: '45%' }}
                                onPress={() => this.setState({ confirmPasswordHide: !confirmPasswordHide })}
                            />
                        </View>
                    </View>
                    <View style={{
                        display: 'flex', width: "90%", justifyContent: 'space-between',
                        alignItems: "center", marginTop: 35, flexDirection: "row"
                    }}>
                        <Text style={{ fontFamily: "Rubik-Bold", fontSize: 32, color: "#4F4F4F" }}
                            onPress={this.onSubmit} >
                            Sign Up
                        </Text>
                        <Button
                            icon={<MaterialIcons name="arrow-forward" size={32} color="#F2F2F2" />}
                            onPress={this.onSubmit}
                            loading={buttonLoading}
                            buttonStyle={{
                                height: 50, width: 50, backgroundColor: "#4F4F4F", elevation: 5,
                                borderRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>

                        </Button>
                    </View>
                    <View style={{
                        display: 'flex', width: "90%", justifyContent: 'flex-start',
                        alignItems: "center", marginTop: 20, flexDirection: "row"
                    }}>
                        <Text
                            onPress={() => { this.props.navigation.push('SignInPage') }}
                            style={{
                                fontFamily: "Rubik-Bold", fontSize: 16,
                                color: "#4F4F4F", textDecorationLine: 'underline'
                            }}>
                            Sign In
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        registerErr: state.auth.registerErr,
        registerErrMsg: state.auth.registerErrMsg
    }
}

export default withNavigation(connect(mapStateToProps, { signUp, resetFailedSignUp })(SignUpPage));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingLeft: 25,
        flexDirection: 'column'
    }
})