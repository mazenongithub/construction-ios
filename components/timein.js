import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DateobjfromUTCString, inputDateObjOutputAdjString } from './functions';
import { MyStylesheet } from './styles';
import Construction from './construction';

class TimeIn {

    handletimein() {
        if(this.state.showtimein) {
        this.setState({showtimein:false})
        } else {
            this.setState({showtimein:true})
        }
    }

    showdate() {
        const styles = MyStylesheet();
        const timein = new TimeIn();
        const construction = new Construction();
        const timeicon = construction.gettimeicon.call(this)
        const timeinimage = () => {
          
                
                if(this.state.showtimein) {
                    return( <Image source={require('./png/hidetime.png')}
                    resizeMethod='scale'
                    style={timeicon}
                />)
                } else {
                    return( <Image source={require('./png/showtime.png')}
                    resizeMethod='scale'
                    style={timeicon}
                />)
                }
            
        }

        const showtimein = () => {
            if (this.state.showtimein) {
                return (<DateTimePicker
                    mode={'datetime'}
                    value={DateobjfromUTCString(this.gettimein())}
                    onChange={(e, newDate) => {
                        this.handletimein(inputDateObjOutputAdjString(newDate))
                    }}
                />)
            }
        }

        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex4]}>
                            <Text style={[styles.regularFont]}>Time In</Text>
                        </View>

                        <View style={[styles.flex1]}>
                        <TouchableOpacity onPress={() => { timein.handletimein.call(this) }}>
                           {timeinimage()}
                        </TouchableOpacity>
                        </View>

                    </View>



                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>
                            {showtimein()}
                        </View>
                    </View>

                </View>
            </View>




        )
    }


}
export default TimeIn;