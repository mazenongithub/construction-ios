import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './purchasedatecalender'
import { validateMonth, validateDate, validateYear } from './functions';
import {View, Text, TextInput} from 'react-native'

class PurchaseDate {


    handleyear(year) {
        const construction = new Construction();
        const checkmanager = construction.checkmanager.call(this);
        if(checkmanager) {
        this.setState({ purchasedateyear: year })
        
        const myuser = construction.getuser.call(this)
        if (myuser) {

        
                if (year.length === 4) {

                    if(validateYear(year)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this,  this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this,  this.state.activeequipmentid)
                                let day = this.state.purchasedateday;
                                let month = this.state.purchasedatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }

                  
                }

            
        }
    } else {
        alert(`Only Managers can modify purchase date`)
    }
    }

    handleday(day) {
        const construction = new Construction();
        const checkmanager = construction.checkmanager.call(this);
        if(checkmanager) {
        day = day.toString();
        this.setState({ purchasedateday: day })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

    
                if (day.length === 2) {

            
                        if(validateDate(day)) {

                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this,  this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this,this.state.activeequipmentid)
                                let year = this.state.purchasedateyear;
                                let month = this.state.purchasedatemonth;
                                const timein = `${year}-${month}-${day}`
                                 myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                

                } else {
                    alert(`Invalid day format ${day}`)
                }

            }

            
        }
    } else {
        alert(`Only Managers can modify purchase date`)
    }
    }

    handlemonth(month) {
        const construction = new Construction();
        const checkmanager = construction.checkmanager.call(this);
        if(checkmanager) {
        this.setState({ purchasedatemonth: month })
       
        const myuser = construction.getuser.call(this)
        if (myuser) {


                if (month.length === 2) {

                    if(validateMonth(month)) {

                



                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this,  this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this,  this.state.activeequipmentid)
                                let day = this.state.purchasedateday;
                                let year = this.state.purchasedateyear;
                                const timein = `${year}-${month}-${day}`
                                 myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                    

                } else {
                    alert(`Invalid month format ${month}`)
                }

                }

            
        }
    } else {
        alert(`Only Managers can modify purchasedate`)
    }
    }





    showpurchasedate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const purchasedate = new PurchaseDate();
        const calender = new MaterialCalender();
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Purchase Date (MM-DD-YYYY) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} value={this.state.purchasedatemonth.toString()}
                                onChangeText={text => { purchasedate.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.purchasedateday.toString()}
                                onChangeText={text => { purchasedate.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.purchasedateyear.toString()}
                                onChangeText={text => { purchasedate.handleyear.call(this, text) }} />
                        </View>
                        
                       
                    </View>
                    {calender.showMaterialCalender.call(this)}


                </View>
            </View>)
    }

}

export default PurchaseDate;