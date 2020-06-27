import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './equipmentdatecalender'
import { validateMonth, validateDate, validateYear } from './functions';
import {View, Text, TextInput} from 'react-native';


class EquipmentDate {


    handleyear(year) {
        this.setState({ equipmentdateyear: year })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

                if (year.length === 4) {

                    if(validateYear(year)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this,  this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this,  this.state.activeequipmentid)
                               if(this.state.activecostid) {
                                const cost = construction.getcostbyid.call(this,myequipment.equipmentid,this.state.activecostid)
                                if(cost) {
                                    const j = construction.getequipmentcostskeybyid.call(this,myequipment.equipmentid, cost.costid)
                                let day = this.state.equipmentdateday;
                                let month = this.state.equipmentdatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.cost[j].timein = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })

                                }


                               } else {
                                   this.setState({equipmentdateyear:year})
                               }


                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }

                  
                }

            
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ equipmentdateday: day })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

        
                if (day.length === 2) {

            
                        if(validateDate(day)) {

                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this,  this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this,  this.state.activeequipmentid)
                               if(this.state.activecostid) {
                                const cost = construction.getcostbyid.call(this,myequipment.equipmentid,this.state.activecostid)
                                if(cost) {
                                    const j = construction.getequipmentcostskeybyid.call(this,myequipment.equipmentid, cost.costid)
                                let year= this.state.equipmentdateyear;
                                let month = this.state.equipmentdatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.cost[j].timein = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })

                                }


                               } else {
                                   this.setState({equipmentdateday:day})
                               }


                            }

                        }

                

                } else {
                    alert(`Invalid day format ${day}`)
                }

            }

            
        }
    }

    handlemonth(month) {
        this.setState({ equipmentdatemonth: month })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

                if (month.length === 2) {

                    if(validateMonth(month)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this,  this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this,  this.state.activeequipmentid)
                               if(this.state.activecostid) {
                                const cost = construction.getcostbyid.call(this,myequipment.equipmentid,this.state.activecostid)
                                if(cost) {
                                    const j = construction.getequipmentcostskeybyid.call(this,myequipment.equipmentid, cost.costid)
                                let day = this.state.equipmentdateday;
                                let year = this.state.equipmentdateyear;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.cost[j].timein = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })

                                }


                               } else {
                                   this.setState({equipmentdatemonth:month})
                               }


                            }

                        }

                    

                } else {
                    alert(`Invalid month format ${month}`)
                }

                }

            
        }
    }





    showequipmentdate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const equipmentdate = new EquipmentDate();
        const calender = new MaterialCalender();
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Equipment Date (MM-DD-YYYY) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} 
                            value={this.state.equipmentdatemonth.toString()}
                            onChangeText={text => { equipmentdate.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.equipmentdateday.toString()}
                                onChangeText={text => { equipmentdate.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.equipmentdateyear.toString()}
                                onChangeText={text => { equipmentdate.handleyear.call(this, text) }} />
                        </View>
                        
                       
                    </View>
                    {calender.showMaterialCalender.call(this)}


                </View>
            </View>)
    }

}

export default EquipmentDate;