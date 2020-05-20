import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DateobjfromUTCString, inputDateObjOutputAdjString } from './functions';
import { MyStylesheet } from './styles';
import Construction from './construction';

class TimeOut {

    handletimeout() {
        if(this.state.showtimeout) {
        this.setState({showtimeout:false})
        } else {
            this.setState({showtimeout:true})
        }
    }

    showdate() {
        const styles = MyStylesheet();
        const timeout = new TimeOut();
        const construction = new Construction();
        const timeicon = construction.gettimeicon.call(this)
        const timeoutimage = () => {
          
                
                if(this.state.showtimeout) {
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

        const showtimeout = () => {
            if (this.state.showtimeout) {
                return (<DateTimePicker
                    mode={'datetime'}
                    value={DateobjfromUTCString(this.gettimeout())}
                    onChange={(e, newDate) => {
                        this.handletimeout(inputDateObjOutputAdjString(newDate))
                    }}
                />)
            }
        }

        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex4]}>
                            <Text style={[styles.regularFont]}>Time Out</Text>
                        </View>

                        <View style={[styles.flex1]}>
                        <TouchableOpacity onPress={() => { timeout.handletimeout.call(this) }}>
                           {timeoutimage()}
                        </TouchableOpacity>
                        </View>

                    </View>



                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>
                            {showtimeout()}
                        </View>
                    </View>

                </View>
            </View>




        )
    }


}
export default TimeOut;