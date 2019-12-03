import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // 6.2.2
import { connect } from 'react-redux'
import { logout } from "./../actions/authActions";
import { updateUserProfilePicture } from "./../actions/userActions";
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'


class AccountPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: null,
        }

    }
    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });


        if (!result.cancelled) {
            this.setState({ image: result.uri });
            let uri = result.uri;
            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            console.log(fileType)
            console.log(uri)
            let formData = new FormData();
            formData.append('photo', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            this.props.updateUserProfilePicture(formData)
        }
    };
    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }
    handleLogout = () => {
        Alert.alert('You have been logged out');
        this.props.logout();
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    Base64 = {
        btoa: (input) => {
            let str = input;
            let output = '';

            for (let block = 0, charCode, i = 0, map = this.chars;
                str.charAt(i | 0) || (map = '=', i % 1);
                output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

                charCode = str.charCodeAt(i += 3 / 4);

                if (charCode > 0xFF) {
                    throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                }

                block = block << 8 | charCode;
            }

            return output;
        },

        atob: (input) => {
            let str = input.replace(/=+$/, '');
            let output = '';

            if (str.length % 4 == 1) {
                throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
            }
            for (let bc = 0, bs = 0, buffer, i = 0;
                buffer = str.charAt(i++);

                ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
            ) {
                buffer = chars.indexOf(buffer);
            }

            return output;
        }
    };
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        console.log(bytes)
        return this.Base64.btoa(binary);
    };
    render() {
        let { image } = this.state;
        let { user } = this.props;
        let { firstName, lastName, email, phone, img } = user;

        return (
            <View style={{ flex: 1, backgroundColor: "#F2F2F2", padding: wp('10%') }}>
                <View style={{ position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: wp('50%'), height: wp('50%') }}>
                        <Image source={require('./../assets/placeholder.jpg')} style={{ width: wp('50%'), height: wp('50%'), borderRadius: 100 }} />
                        <MaterialCommunityIcons name="camera" size={24} style={{
                            position: 'absolute', right: '5%', bottom: '5%',
                            padding: 5, backgroundColor: 'white', borderRadius: 50
                        }}
                            onPress={this.pickImage} />
                    </View>
                </View>
                <View style={{ flex: 2, position: 'relative' }}>
                    <View style={styles.field}>
                        <Text style={styles.label}>First Name</Text>
                        <Text>{firstName ? this.capitalizeFirstLetter(firstName) : ""}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Last Name</Text>
                        <Text>{lastName ? this.capitalizeFirstLetter(lastName) : ""}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Phone</Text>
                        <Text>{phone}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Email</Text>
                        <Text>{email}</Text>
                    </View>
                </View>
                <View>
                    <Button title={'Logout'} onPress={this.handleLogout} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})


export default connect(mapStateToProps, { logout, updateUserProfilePicture })(AccountPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    field: {
        width: wp('80%'), height: hp('6%'), marginVertical: hp('3%'),
        position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        borderWidth: 1, borderColor: '#4F4F4F', borderRadius: wp('3%'), padding: wp('1%'), paddingLeft: wp('5%')
    },
    label: { position: 'absolute', top: -hp('1.75%'), left: wp('5%'), fontSize: 16, fontWeight: '800', backgroundColor: '#F2F2F2' }
})