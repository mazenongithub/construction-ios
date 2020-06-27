import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './actualdatecalender'
import { validateMonth, validateDate, validateYear } from './functions';
import {View,Text,TextInput} from 'react-native'


class MaterialDate {


    handleyear(year) {
        this.setState({ materialdateyear: year })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
          
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (year.length === 4) {

                    if(validateYear(year)) {


                        if (this.state.activematerialid) {
                            const mymaterial = construction.getactualmaterialsbyid.call(this, projectid,  this.state.activematerialid);
                            if (mymaterial) {

                                const j = construction.getactualmaterialskeybyid.call(this, projectid, this.state.activematerialid)
                                let day = this.state.materialdateday;
                                let month = this.state.materialdatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].timein = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }

                  
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ materialdateday: day })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (day.length === 2) {

            
                        if(validateDate(day)) {

                        if (this.state.activematerialid) {
                            const mymaterial = construction.getactualmaterialsbyid.call(this, projectid, this.state.activematerialid);
                            if (mymaterial) {

                                const j = construction.getactualmaterialskeybyid.call(this, projectid, this.state.activematerialid)
                                let year = this.state.materialdateyear;
                                let month = this.state.materialdatemonth;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].timein = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                

                } else {
                    alert(`Invalid day format ${day}`)
                }

            }

            }
        }
    }

    handlemonth(month) {
        this.setState({ materialdatemonth: month })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (month.length === 2) {

                    if(validateMonth(month)) {

                    if (this.state.active === 'materials') {



                        if (this.state.activematerialid) {
                            const mymaterial = construction.getactualmaterialsbyid.call(this, projectid, this.state.activematerialid);
                            if (mymaterial) {

                                const j = construction.getactualmaterialskeybyid.call(this, projectid, this.state.activematerialid)
                                let day = this.state.materialdateday;
                                let year = this.state.materialdateyear;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].timein = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                    } 

                } else {
                    alert(`Invalid month format ${month}`)
                }

                }

            }
        }
    }





    showmaterialdate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const materialdate = new MaterialDate();
        const calender = new MaterialCalender();
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

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} 
                                value={this.state.materialdatemonth.toString()}
                                onChangeText={text => { materialdate.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.materialdateday.toString()}
                                onChangeText={text => { materialdate.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.materialdateyear.toString()}
                                onChangeText={text => { materialdate.handleyear.call(this, text) }} />
                        </View>
                        
                       
                    </View>
                    {calender.showMaterialCalender.call(this)}


                </View>
            </View>)
    }

}

export default MaterialDate;