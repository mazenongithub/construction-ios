import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateStringfromObj,DateObjfromString} from './functions'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Construction from './construction';
import { MyStylesheet } from './styles';

class PurchaseDate {
    handlepurchasedate() {
        if(this.state.showpurchasedate) {
         this.setState({ showpurchasedate:false})
        } else {
            this.setState({showpurchasedate:true})
        }
    }

    showdate() {
        const purchasedate = new PurchaseDate();
        const construction = new Construction();
        const styles = MyStylesheet();
        const timeicon = construction.gettimeicon.call(this)

        const purchasedateimage = () => {
          
                
            if(this.state.showpurchasedate) {
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


        const showpurchasedate = () => {
            if(this.state.showpurchasedate) {
                return (
          
                    <DateTimePicker
                        mode={'date'}
                        value={DateObjfromString(this.getpurchasedate())}
                        onChange={(e,newDate) => {
                            {this.handlepurchasedate(DateStringfromObj(newDate))}
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
                        <Text style={[styles.regularFont]}>Purchase Date</Text>
                    </View>

                    <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { purchasedate.handlepurchasedate.call(this) }}>
                       {purchasedateimage()}
                    </TouchableOpacity>
                    </View>

                </View>



                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
                        {showpurchasedate()}
                    </View>
                </View>

            </View>
        </View>
                   
              
           
        )
       
        
    }


}
export default PurchaseDate;