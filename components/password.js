import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { MyStylesheet } from './styles';
import Construction from './construction';
import { validatePassword} from './functions';

class Password {

    handlePassword(text) {
        let validate = validatePassword(text);
        if(!validate.validate) {
            
            this.setState({passwordcheck:false, password:text, message:validate.message })
        } else {
            this.setState({ password:text, message:"", passwordcheck:true  })  
        }
         


    }

    confirmpassword() {
        const construction = new Construction();
        const gocheck = construction.getgochecksmall.call(this)
        if(this.state.passwordcheck && this.state.password) {

            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        }

    }

    showpassword() {
        const password = new Password();
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)

        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont]}>Password </Text>
                    <TextInput style={[regularFont, styles.defaultInput]}
                        onChangeText={text => { password.handlePassword.call(this, text) }}
                        value={this.state.password}
                        secureTextEntry={true}
                        password={true}
                    />
                </View>
                <View style={[styles.flex1, styles.flexEnd]}>
                    {password.confirmpassword.call(this)}
                </View>
            </View>
        )
    }
}
export default Password;