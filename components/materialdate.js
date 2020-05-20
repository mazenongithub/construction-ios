import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateStringfromObj,DateObjfromString} from './functions'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Construction from './construction';
import { MyStylesheet } from './styles';

class MaterialDate {
    

    handlematerialdate() {
        if(this.state.showdate) {
        this.setState({showdate:false})
        } else {
            this.setState({showdate:true})
        }
    }

    showdate() {
        const materialdate = new MaterialDate();
        const construction = new Construction();
        const styles = MyStylesheet();
        const timeicon = construction.gettimeicon.call(this)

        const materialdateimage = () => {
          
                
            if(this.state.showdate) {
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


        const showmaterialdate = () => {
            if(this.state.showdate) {
                return( <DateTimePicker
                    mode={'date'}
                    value={DateObjfromString(this.gettimein())}
                    onChange={(e,newDate) => {
                        this.handletimein(DateStringfromObj(newDate))
                    }}
                   
                />)
            }
        }
       
        return (
            <View style={[styles.generalFlex]}>
            <View style={[styles.flex1]}>

                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex4]}>
                        <Text style={[styles.regularFont]}>Material Date</Text>
                    </View>

                    <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { materialdate.handlematerialdate.call(this) }}>
                       {materialdateimage()}
                    </TouchableOpacity>
                    </View>

                </View>



                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
                        {showmaterialdate()}
                    </View>
                </View>

            </View>
        </View>
                   
              
           
        )
    }


}
export default MaterialDate;