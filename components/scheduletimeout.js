import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeOut from './scheduletimeoutcalender';
import {View, Text, TextInput} from 'react-native'
class TimeOut {
    handleminutes(minutes) {
        this.setState({ timeoutminutes: minutes })
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeparams = construction.getactiveproject.call(this)
        if (myuser) {

            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (minutes.length === 2) {

                    if (validateMinutes(minutes)) {


                        if (this.state.active === 'labor') {


                            if (this.state.activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, projectid,  this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }



                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this,  projectid,  this.state.activeequipmentid)
                                if (myequipment) {

                                    if (myequipment) {
                                        const j = construction.getscheduleequipmentkeybyid.call(this, projectid,  myequipment.equipmentid)
                                        let day = this.state.timeoutday;
                                        let year = this.state.timeoutyear;
                                        let month = this.state.timeoutmonth;
                                        let hours = this.state.timeouthours;
                                        let time = this.state.timeoutampm;
                                        let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                        timeout = UTCTimeStringfromTime(timeout);
                                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timeout = timeout;
                                        this.props.reduxUser(myuser)
                                        this.setState({ render: 'render' })
                                    }

                                }
                            }

                        }

                    } else {
                        alert(`Invalid minute format ${minutes}`)
                    }
                }
            }
        }

    }

    handlehours(hours) {
        this.setState({ timeouthours: hours })
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeparams = construction.getactiveproject.call(this)
        if (myuser) {

            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (hours.length === 2) {
                    if (validateMonth(hours)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, projectid,  this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {


                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid,  this.state.activeequipmentid)
                                if (myequipment) {

                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid,   myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })

                                }
                            }
                        }

                    } else {
                        alert(`Invalid hours ${hours}`)

                    }

                }

            }
        }
    }

    handleyear(year) {
        this.setState({ timeoutyear: year })
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeparams = construction.getactiveproject.call(this)
        if (myuser) {

            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (year.length === 4) {

                    if (validateYear(year)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, projectid,  this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid,  myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let minutes = this.state.timeoutminutes;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })
                                }
                            }

                        }

                    } else {
                        alert(`Invalid Year Format ${year}`)
                    }
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ timeoutday: day })
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (day.length === 2) {

                    if (validateDate(day)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, projectid,  this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, projectid,  this.state.activelaborid)
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)

                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                                    let minutes = this.state.timeoutminutes;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })
                                }
                            }

                        }

                    } else {
                        alert(`Invalid Date Format ${day}`)
                    }
                }

            }
        }
    }

    handlemonth(month) {
        this.setState({ timeoutmonth: month })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const activeparams = construction.getactiveproject.call(this)
        if (myuser) {

            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);
                if (month.length === 2) {

                    if (validateMonth(month)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, projectid,  this.state.activelaborid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid,  myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let minutes = this.state.timeoutminutes;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })
                                }

                            }

                        }

                    } else {
                        alert(`invalid month format ${month}`)
                    }

                }

            }
        }
    }

    toggleampm(ampm) {
        if (this.state.timeoutampm === 'am' && ampm === 'pm') {
            this.setState({ timeoutampm: 'pm' })
        } else if (this.state.timeoutampm === 'pm' && ampm === 'am') {
            this.setState({ timeoutampm: 'am' })
        }

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const activeparams = construction.getactiveproject.call(this)
        if (myuser) {

            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = construction.getprojectkeybyid.call(this, projectid);

                if (this.state.active === 'labor') {



                    if (this.state.activelaborid) {
                        const mylabor = construction.getschedulelaborbyid.call(this, projectid,  this.state.activelaborid);
                        if (mylabor) {

                            const j = construction.getschedulelaborkeybyid.call(this, projectid,  this.state.activelaborid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let time = ampm;
                            let minutes = this.state.timeoutminutes;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                    
                            timeout = UTCTimeStringfromTime(timeout);
                    
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getscheduleequipmentbyid.call(this, projectid,  this.state.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getscheduleequipmentkeybyid.call(this, projectid,  myequipment.equipmentid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let minutes = this.state.timeoutminutes;
                            let time = ampm
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            timeout = UTCTimeStringfromTime(timeout);
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timeout = timeout;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    }

                }

            }
        }

    }

    showampm() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const timeout = new TimeOut();
        const showam = () => {
            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onPress={() => { timeout.toggleampm.call(this, 'pm') }}>AM</Text>
            </View>)

        }
        const showpm = () => {

            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onPress={() => { timeout.toggleampm.call(this, 'am') }}>PM</Text>
            </View>)

        }




        if (this.state.timeoutampm === 'am') {
            return showam()
        } else if (this.state.timeoutampm === 'pm') {
            return showpm()
        }


    }

    showtimeout() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const timeout = new TimeOut();
        const calender = new CalenderTimeOut();
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Time Out (MM-DD-YYYY HH mm) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} 
                            value={this.state.timeoutmonth.toString()}
                                onChangeText={text => { timeout.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeoutday.toString()}
                                onChangeText={text => { timeout.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex2, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeoutyear.toString()}
                                onChangeText={text => { timeout.handleyear.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeouthours.toString()}
                                onChangeText={text => { timeout.handlehours.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeoutminutes.toString()}
                                onChangeText={text => { timeout.handleminutes.call(this, text) }}
                            />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>
                            {timeout.showampm.call(this)}
                        </View>
                    </View>

                    {calender.showCalenderTimeOut.call(this)}

                </View>
            </View>)
    }

}

export default TimeOut;