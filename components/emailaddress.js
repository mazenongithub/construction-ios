import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { MyStylesheet } from './styles';
import Construction from './construction';
import { CheckEmailAddress } from './actions/api'
import { validateEmail } from './functions'
class EmailAddress {
    confirmemailaddressimage() {
        const construction = new Construction();
        const gocheck = construction.getgochecksmall.call(this)
        if (this.state.emailaddresscheck) {
            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        } else {
            return;
        }

    }

    handleemailaddress(emailaddress) {
        emailaddress = emailaddress.toLowerCase();
        this.setState({ emailaddress })
        let errmsg = validateEmail(emailaddress)
        if (errmsg) {
            this.setState({ emailaddresscheck: false, message: errmsg })
        } else {
            this.setState({ emailaddresscheck: true, message: "" })
        }

    }


    async verifyEmailAddress() {
        const construction = new Construction();
        let emailaddress = this.state.emailaddress;
        const navigation = construction.getnavigation.call(this)

        if(navigation.main === 'register') {

        if (!validateEmail(emailaddress)) {
            try {
                let response = await CheckEmailAddress(emailaddress)
                
                if (response.hasOwnProperty("valid")) {
                    this.setState({ emailaddresscheck: true, message:''});
                }
                else {
                    this.setState({ emailaddresscheck: false, message: response.invalid });
                }

            } catch (err) {

                alert(err)
            }

        }

    }


    }
    showemailaddress() {
        const emailaddress = new EmailAddress();
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)


        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont]}>Email Address </Text>
                    <TextInput style={[regularFont, styles.defaultInput, styles.minwidth90]}
                        onChangeText={text => { emailaddress.handleemailaddress.call(this, text) }}
                        onBlur={() => { emailaddress.verifyEmailAddress.call(this) }} 
                        value={this.state.emailaddress}
                        />
                </View>
                <View style={[styles.flex1, styles.flexEnd]}>
                    {emailaddress.confirmemailaddressimage.call(this)}
                </View>
            </View>
        )
    }
}
export default EmailAddress