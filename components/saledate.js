import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateStringfromObj,DateObjfromString} from './functions'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Construction from './construction';
import { MyStylesheet } from './styles';

class SaleDate {
    handlesaledate() {
        if(this.state.showsaledate) {
        this.setState({showsaledate:false})
        } else {
            this.setState({showsaledate:true})
        }
    }


    showdate() {

        const saledate = new SaleDate();
        const construction = new Construction();
        const styles = MyStylesheet();
        const timeicon = construction.gettimeicon.call(this)

        const saledateimage = () => {
          
                
            if(this.state.showsaledate) {
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


        const showsaledate = () => {
            if(this.state.showsaledate) {
                return (
        
                    <DateTimePicker
                        mode={'date'}
                        value={DateObjfromString(this.getsaledate())}
                        onChange={(e,newDate)=> {
                            {this.handlesaledate(DateStringfromObj(newDate))}
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
                        <Text style={[styles.regularFont]}>Sale Date</Text>
                    </View>

                    <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { saledate.handlesaledate.call(this) }}>
                       {saledateimage()}
                    </TouchableOpacity>
                    </View>

                </View>



                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
                        {showsaledate()}
                    </View>
                </View>

            </View>
        </View>
                   
              
           
        )

        
    }


}
export default SaleDate;