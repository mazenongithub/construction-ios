import React from 'react';
import { View, Text } from 'react-native';
import { MyStylesheet } from './styles';
import * as AppleAuthentication from 'expo-apple-authentication';
import Construction from './construction';

class AppleID {
    showappleicon(type) {
        const construction = new Construction();
        const appleIcon = construction.getappleicon.call(this)
      
            return (<AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={[appleIcon]}
                onPress={() => { construction.appleSignIn.call(this,type) }}

            />)
       
    }
    showappleid(type) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const appleid = new AppleID();
    
        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1, styles.alignContentCenter]}>
                    {appleid.showappleicon.call(this, type)}
                </View>
            </View>
        )
    }

}
export default AppleID;