import React from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import { MyStylesheet } from './styles';
import Construction from './construction';
import { CheckProviderID } from './actions/api'
import { validateProviderID } from './functions'

class ProviderID{
    confirmprofileimage() {
        const construction = new Construction();
        const gocheck = construction.getgochecksmall.call(this)
        if (this.state.profilecheck) {
            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        } else {
            return;
        }

    }
    handleprofile(profile) {
        profile = profile.toLowerCase();
        this.setState({ profile })
        const errmsg = validateProviderID(profile);
        if (errmsg) {
            this.setState({ profilecheck: false, message: errmsg })
        } else {
            this.setState({ profilecheck: true, message: "" })
        }
    }

    async verifyProfile() {
        if (this.state.profilecheck) {
            let profile = this.state.profile;
            try {
                let response = await CheckProviderID(profile)
                console.log(response)
                if (response.hasOwnProperty("valid")) {
                    this.setState({ profilecheck: true });
                }
                else {
                    this.setState({ profilecheck: false, message: response.message });
                }

            } catch (err) {

                alert(err)
            }

        }


    }
    showprofile() {
        const profile = new ProviderID();
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont]}>Create Profile ID </Text>
                    <TextInput style={[regularFont,styles.defaultInput]}
                        onChangeText={text => { profile.handleprofile.call(this,text) }}
                        onBlur={() => { profile.verifyProfile.call(this) }}
                        value={this.state.profile} />
                        
                </View>
                <View style={[styles.flex1,styles.flexEnd]}>{profile.confirmprofileimage.call(this)}</View>
            </View>
        )
    }
}
export default ProviderID