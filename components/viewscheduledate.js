import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './viewscheduledatecalender'
import { getScheduleDates } from './functions';
import {Text, View, TextInput} from 'react-native'


class MaterialDate {


    handleyear(year) {

        this.setState({ year: year })
        const dates = getScheduleDates(`${year}-${this.state.month}-${this.state.day}`) 
        this.setState({day_1:dates.day_1, day_2:dates.day_2, day_3:dates.day_3, day_4:dates.day_4, day_5:dates.day_5, day_6:dates.day_6, day_7:dates.day_7})
     
    }

    handleday(day) {
        day = day.toString();
        this.setState({ day: day })
        const dates = getScheduleDates(`${this.state.year}-${this.state.month}-${day}`) 
        this.setState({day_1:dates.day_1, day_2:dates.day_2, day_3:dates.day_3, day_4:dates.day_4, day_5:dates.day_5, day_6:dates.day_6, day_7:dates.day_7})
  
    }

    handlemonth(month) {
        this.setState({month: month })
        const dates = getScheduleDates(`${this.state.year}-${month}-${this.state.day}`) 
        this.setState({day_1:dates.day_1, day_2:dates.day_2, day_3:dates.day_3, day_4:dates.day_4, day_5:dates.day_5, day_6:dates.day_6, day_7:dates.day_7})
       
    }





    showmaterialdate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const materialdate = new MaterialDate();
        const calender = new MaterialCalender();
        console.log(this.state.year,"showyear")
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Material Date (MM-DD-YYYY) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont,  ...styles.alignCenter, ...styles.defaultInput }} 
                                value={this.state.month.toString()}
                                onChangeText={text => { materialdate.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont,  ...styles.alignCenter, ...styles.defaultInput }}
                                value={this.state.day.toString()}
                                onChangeText={text => { materialdate.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont,  ...styles.alignCenter, ...styles.defaultInput }}
                                value={this.state.year.toString()}
                                onChangeText={text => { materialdate.handleyear.call(this, text) }} />
                        </View>
                        
                       
                    </View>
                    {calender.showMaterialCalender.call(this)}


                </View>
            </View>)
    }

}

export default MaterialDate;