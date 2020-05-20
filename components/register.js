import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import Construction from './construction';
import ProviderID from './providerid'
import EmailAddress from './emailaddress'
import AppleID from './appleid';
import Profile from './profile';


class Register {

    handleregistericon() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const loginNow = construction.getloginnow.call(this)

        if (this.state.emailaddresscheck && this.state.profilecheck) {
            
            if (this.state.clientid || (this.state.password && this.state.passwordcheck)) {
               
               return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { construction.loginclient.call(this) }}>
                            <Image source={require('./png/register.png')}
                                resizeMethod='scale'
                                style={loginNow}
                            />
                        </TouchableOpacity>
                    </View>
                </View>)
            }
        }
    }


    showregister() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const providerid = new ProviderID();
        const emailaddress = new EmailAddress();
        const appleid = new AppleID();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this);
        const register = new Register();
        const myuser = construction.getuser.call(this);
        const profile = new Profile();

        const showpassword = () => {
            if(!this.state.clientid && !this.state.client) {
                return(password.showpassword.call(this))
            }
            
        }

        if(myuser) {
        return(profile.showmyprofile.call(this))
        } else {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[styles.boldFont, headerFont, styles.alignCenter]}>Register </Text>
                        </View>
                    </View>
                    {appleid.showappleid.call(this)}

                    {providerid.showprofile.call(this)}

                    {emailaddress.showemailaddress.call(this)}


                    {register.handleregistericon.call(this)}

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                        </View>
                    </View>

                </View>
            </View>)

        }
    }

}
export default Register;