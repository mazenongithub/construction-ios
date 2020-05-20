import React from 'react';
import {View, Text} from 'react-native';
import {MyStylesheet} from './styles';
import * as AppleAuthentication from 'expo-apple-authentication';
import Construction from './construction';

class AppleID {
showappleicon() {
    const construction = new Construction();
    const appleIcon = construction.getappleicon.call(this)
    if(!this.state.client || !this.state.clientid) {
        return(<AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
            cornerRadius={5}
            style={[appleIcon]}
            onPress={()=>{construction.appleSignIn.call(this)}}

        />)
    } else {
        return;
    }
}
    showappleid() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const appleid = new AppleID();
        const loginMessage = () => {
            if(this.state.client && this.state.clientid) {
                return(`Your account is secure with Apple`)
            } else {
                return(`Secure Login with Apple`)
            }
        }
        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]}>
            <View style={[styles.flex1, styles.alignContentCenter]}>
            <Text style={[regularFont,styles.alignCenter]}>{loginMessage()}</Text>
            {appleid.showappleicon.call(this)}
            </View>
        </View>
        )
    }

}
export default AppleID;