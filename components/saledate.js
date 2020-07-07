import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './saledatecalender'
import { validateMonth, validateDate, validateYear } from './functions';
import { View, Text, TextInput } from 'react-native'

class SaleDate {


    handleyear(year) {
    
        const construction = new Construction();
        const checkmanager = construction.checkmanager.call(this);
        if (checkmanager) {
            this.setState({ saledateyear: year })
            const myuser = construction.getuser.call(this)
            if (myuser) {


                if (year.length === 4) {

                    if (validateYear(year)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                let day = this.state.saledateday;
                                let month = this.state.saledatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.saledate = timein;
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
            alert(`Only Managers can modify sale date`)
        }
    }

    handleday(day) {
        const construction = new Construction();
        day = day.toString();
        const checkmanager = construction.checkmanager.call(this);
        if (checkmanager) {
        this.setState({ saledateday: day })
     
        const myuser = construction.getuser.call(this)
        if (myuser) {


            if (day.length === 2) {


                if (validateDate(day)) {

                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                        if (myequipment) {

                            const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                            let year = this.state.saledateyear;
                            let month = this.state.saledatemonth;
                            const timein = `${year}-${month}-${day}`
                            myuser.company.equipment.myequipment[i].ownership.saledate = timein;
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
        alert(`Only Managers can modify equipment sale date`)
    }
    }

    handlemonth(month) {
        this.setState({ saledatemonth: month })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const checkmanager = construction.checkmanager.call(this);
        if (checkmanager) {
        if (myuser) {


            if (month.length === 2) {

                if (validateMonth(month)) {





                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                        if (myequipment) {

                            const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                            let day = this.state.saledateday;
                            let year = this.state.saledateyear;
                            const timein = `${year}-${month}-${day}`
                            myuser.company.equipment.myequipment[i].ownership.saledate = timein;
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
        alert(`Only Managers can modify equipment sale date`)
    }
    }





    showsaledate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const saledate = new SaleDate();
        const calender = new MaterialCalender();
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Sale Date (MM-DD-YYYY) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} value={this.state.saledatemonth.toString()}
                                onChangeText={text => { saledate.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.saledateday.toString()}
                                onChangeText={text => { saledate.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.saledateyear.toString()}
                                onChangeText={text => { saledate.handleyear.call(this, text) }} />
                        </View>


                    </View>
                    {calender.showMaterialCalender.call(this)}


                </View>
            </View>)
    }

}

export default SaleDate;