import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateStringfromObj,DateObjfromString} from './functions'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Construction from './construction';
import { MyStylesheet } from './styles';

class EquipmentDate {

    handleequipmentdate() {
        if(this.state.showequipmentdate) {
        this.setState({showequipmentdate:false})
        } else {
            this.setState({showequipmentdate:true})
        }
    }


    showdate() {
        const equipmentdate = new EquipmentDate();
        const construction = new Construction();
        const styles = MyStylesheet();
        const timeicon = construction.gettimeicon.call(this)

        const equipmentdateimage = () => {
          
                
            if(this.state.showequipmentdate) {
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


        const showequipmentdate = () => {
            if(this.state.showequipmentdate) {
                return (
          
                    <DateTimePicker
                        mode={'date'}
                        value={DateObjfromString(this.getequipmentdate())}
                        onChange={(e,newDate) => {
                            {this.handleequipmentdate(DateStringfromObj(newDate))}
                        }}
                    />
              
           
        )
            }
        }
       
        return (
            <View style={[styles.generalFlex]}>
            <View style={[styles.flex1]}>

                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex4]}>
                        <Text style={[styles.regularFont]}>Equipment Date</Text>
                    </View>

                    <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { equipmentdate.handleequipmentdate.call(this) }}>
                       {equipmentdateimage()}
                    </TouchableOpacity>
                    </View>

                </View>



                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
                        {showequipmentdate()}
                    </View>
                </View>

            </View>
        </View>
                   
              
           
        )
       
       
    }


}
export default EquipmentDate;