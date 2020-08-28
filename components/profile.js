import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { MyStylesheet } from './styles';
import Construction from './construction';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UploadProfileImage } from './actions/api'
import { returnCompanyList, inputUTCStringForLaborID, validateEmail, validateProviderID } from './functions'
import { CheckEmailAddress, CheckProviderID } from './actions/api';

class Profile {

    confirmemailaddressimage() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (!myuser.hasOwnProperty("invalidemail")) {
            const gocheck = construction.getgochecksmall.call(this)

            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        } else {
            return;
        }

    }

    confirmprofileimage() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        
        if (!myuser.invalid) {
            const gocheck = construction.getgochecksmall.call(this)
            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        } else {
            return;
        }

    }

    async handleprofilephoto() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        if (myuser) {

            let permission = await Permissions.askAsync(
                Permissions.CAMERA_ROLL);

            if (permission.status === "granted") {

                try {
                    let myImage = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [1, 1],
                    });

                    if (myImage.hasOwnProperty("uri")) {
                        let uriParts = myImage.uri.split('.');
                        let fileType = uriParts[uriParts.length - 1];

                        const profilephoto = () => {
                            return ({
                                uri: myImage.uri,
                                name: `photo.${fileType}`,
                                type: `image/${fileType}`,
                            })

                        }

                        const values = { providerid: myuser.providerid, client: myuser.client, clientid: myuser.clientid, firstname: myuser.firstname, lastname: myuser.lastname, emailaddress: myuser.emailaddress, phonenumber: myuser.phonenumber, profileurl: myuser.profileurl, profile: myuser.profile }
                        let formData = new FormData();
                        formData.append("profilephoto", profilephoto());
                        formData.append("myuser", JSON.stringify(values))
                        try {
                            let response = await UploadProfileImage(formData, myuser.providerid);
                            console.log(response)
                            if (response.hasOwnProperty("allusers")) {
                                let companys = returnCompanyList(response.allusers);
                                this.props.reduxAllCompanys(companys)
                                this.props.reduxAllUsers(response.allusers);

                            }
                            if (response.hasOwnProperty("myuser")) {

                                this.props.reduxUser(response.myuser)
                            }

                            if (response.hasOwnProperty("message")) {
                                let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                                this.setState({ message: `${response.message} Last updated ${lastupdated}` })
                            }

                        } catch (err) {
                            alert(err)
                        } // try upload image

                    } // end my image url


                } catch (err) {
                    console.log("User Canceled photo selection")
                }

            } else if (permission.status === "undetermined") {
                Alert.alert("You need to grant permissions to upload your Photo")
            }
        }
    }


    getprofile() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.profile;
    }

    handleprofile(profile) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        profile = profile.toLowerCase();
        myuser.profile = profile;
        let errmsg = validateProviderID(profile)

        if (myuser) {


            if (errmsg) {

                myuser.invalid = errmsg;
                this.props.reduxUser(myuser);
                this.setState({ message: errmsg })

            } else {

                if (myuser.hasOwnProperty("invalid")) {
                    delete myuser.invalid;
                }

                this.props.reduxUser(myuser);
                this.setState({ message: '' })
            }


        }

    }
    async verifyProfile() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        let errmsg = "";
        errmsg += construction.validateSaveProfile.call(this) 
        
        if (myuser) {

            if (!errmsg) {


                try {

                    let response = await CheckProviderID(myuser.profile)
                    console.log(response)
                    let message  ="";
                    if (response.hasOwnProperty("valid")) {

                        if (myuser.hasOwnProperty("invalid")) {

                            delete myuser.invalid

                        }

                    } else if (response.hasOwnProperty("invalid")) {
                       
                        myuser.invalid = response.invalid;
                        message+= response.invalid;
                    }


                    this.props.reduxUser(myuser);
                    this.setState({ message })

                }
                catch (err) {

                    alert(err)
                }

            }

        }

    }

    getfirstname() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.firstname;
    }
    handlefirstname(firstname) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.lastname;
    }
    handlelastname(lastname) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.lastname = lastname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    getphonenumber() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.phonenumber;
    }
    handlephonenumber(phonenumber) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.phonenumber = phonenumber;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    getemailaddress() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.emailaddress;
    }
    async verifyEmailAddress() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const errmsg = validateEmail(myuser.emailaddress);

        if (!errmsg) {
            try {

                const response = await CheckEmailAddress(myuser.emailaddress)

                if (response.hasOwnProperty("invalid")) {
                    myuser.invalidemail = ` ${response.invalid}`
                    this.props.reduxUser(myuser)
                    this.setState({ message: response.invalid })
                } else {
                    delete myuser.invalidemail;
                    this.props.reduxUser(myuser)
                    this.setState({ message:'' })
                }


            } catch (err) {
                alert(err)
            }




        } else {
            myuser.invalidemail = myuser.emailaddress;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }



    }
    handleemailaddress(emailaddress) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {

            let errmsg = "";
            errmsg = validateEmail(emailaddress)

            if (errmsg) {
                myuser.invalidemail = errmsg;
                this.setState({message:errmsg})

            } else {

                if (myuser.hasOwnProperty("invalidemail")) {
                    delete myuser.invalidemail
                }
                this.setState({message:errmsg})

            }
            myuser.emailaddress = emailaddress;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    getprofileurl() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        return myuser.profileurl;

    }
    handleprofileurl(profileurl) {

        const construction = new Construction();
        let myuser = construction.getuser.call(this);

        if (myuser) {
            myuser.profileurl = profileurl;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }
    }

    showmyprofile() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const profileDimension = construction.getprofiledimesions.call(this)
        const foldericon = construction.getfoldericon.call(this)
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const downIcon = construction.getdownIcon.call(this)
        const profile = new Profile();

        const profilepicture = () => {
            return (<View style={[styles.generalFlex, styles.topMargin5]}>
                <View style={[styles.flex1]}>


                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.alignContentCenter]}>

                            {profileImage()}
                            <TouchableOpacity onPress={() => { profile.handleprofilephoto.call(this) }}>
                                <Image source={require('./png/folder.png')}
                                    resizeMethod='scale'
                                    style={[foldericon, styles.leftMargin5]}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>




                </View>
            </View>
            )
        }
        const profileImage = () => {

            if (myuser.profileurl) {
                return (<Image
                    resizeMethod='scale'
                    style={[profileDimension, styles.showBorder]}
                    source={{ uri: `${myuser.profileurl}` }} />)
            } else {
                return;
            }
        }
        if (myuser) {
            return (<View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.alignContentCenter, styles.flexRow]}>
                            <Text style={[headerFont]}>/</Text>
                            <TextInput style={[styles.defaultInput, headerFont, styles.boldFont, styles.minWidth120]}
                                value={profile.getprofile.call(this)}
                                onChangeText={text => { profile.handleprofile.call(this, text) }}
                                onBlur={() => { profile.verifyProfile.call(this) }} />
                            {profile.confirmprofileimage.call(this)}
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.alignContentCenter]}>
                            {profilepicture()}
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profile Image URL</Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                value={profile.getprofileurl.call(this)}
                            />
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.flexRow]}>
                            <Text style={[regularFont]}>Login  </Text>
                            <Image source={require('./png/downicon.png')}
                                resizeMethod='scale'
                                style={[downIcon]}
                            />

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex3]}>
                            <Text style={[regularFont]}>Email Address</Text>
                            <TextInput style={[styles.defaultInput, regularFont, styles.minW]}
                                onChangeText={text => { profile.handleemailaddress.call(this, text) }}
                                value={profile.getemailaddress.call(this)}
                                onBlur={() => { profile.verifyEmailAddress.call(this) }}
                            />
                        </View>
                        <View style={[styles.flex1, styles.flexEnd]}>{profile.confirmemailaddressimage.call(this)}</View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Phone Number </Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { profile.handlephonenumber.call(this, text) }}
                                value={profile.getphonenumber.call(this)}
                            />
                        </View>

                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.flexRow]}>
                            <Text style={[regularFont]}>Additional Contact  </Text>
                            <Image source={require('./png/downicon.png')}
                                resizeMethod='scale'
                                style={[downIcon]}
                            />

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>First Name</Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { profile.handlefirstname.call(this, text) }}
                                value={profile.getfirstname.call(this)}
                            />
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Last Name </Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { profile.handlelastname.call(this, text) }}
                                value={profile.getlastname.call(this)}
                            />
                        </View>

                    </View>

                    {construction.showsaveprofile.call(this)}


                </View>
            </View>)

        } else {

            return (
                <View style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <Text styles={{ ...styles.generalFont, ...regularFont }}>Please Login to view profile </Text>
                </View>)
        }
    }
}
export default Profile;