import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import Construction from './construction';
import AppleID from './appleid';
import Profile from './profile'


class Login {


    handlegoicon() {
        const construction = new Construction();
        const loginNow = construction.getloginnow.call(this)
        if (this.state.emailaddress && this.state.emailaddresscheck) {
            if ((this.state.client && this.state.clientid) || (this.state.password && this.state.passwordcheck)) {
                return (<TouchableOpacity onPress={() => { construction.loginclient.call(this) }}>
                    <Image source={require('./png/loginnow.png')}
                        resizeMethod='scale'
                        style={loginNow}
                    />
                </TouchableOpacity>)

            }
        }
    }
    showlogin() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const appleid = new AppleID();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const myuser = construction.getuser.call(this);
        const profile = new Profile();
    
        const showpassword = () => {
            if(!this.state.clientid && !this.state.client) {
                return(password.showpassword.call(this))
            }
            
        }
      

        const showlogin = () => {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
    
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[styles.boldFont, headerFont, styles.alignCenter]}>Login </Text>
                            </View>
                        </View>
                        {appleid.showappleid.call(this, "login")}
    
                   
    
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                            </View>
                        </View>
    
                    </View>
                </View>)
        }
        
        if(myuser) {
            return(profile.showmyprofile.call(this))
        } else {
            return(showlogin())
        }


      
    }

}
export default Login;