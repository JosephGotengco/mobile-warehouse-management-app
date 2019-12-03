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

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            const data = new FormData();

            data.append("photo", {
                name: result.fileName,
                type: result.type,
                uri:
                    Platform.OS === "android" ? result.uri : result.uri.replace("file://", "")
            });
            console.log(data);
            this.props.updateUserProfilePicture(data)
        }
    };
    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    handleLogout = () => {
        Alert.alert('You have been logged out');
        this.props.logout();
    }
    render() {
        let { image } = this.state;
        let { user } = this.props;
        let { firstName, lastName, email, phone } = user;
        return (
            <View style={{ flex: 1, backgroundColor: "#F2F2F2", padding: wp('10%') }}>
                <View style={{ position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: wp('50%'), height: wp('50%') }}>
                        <Image source={image ? { uri: image } : require('./../assets/placeholder.jpg')} style={{ width: wp('50%'), height: wp('50%'), borderRadius: 100 }} />
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
                        <Text>{this.capitalizeFirstLetter(firstName)}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Last Name</Text>
                        <Text>{this.capitalizeFirstLetter(lastName)}</Text>
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