import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeIn from './scheduletimeincalender';
import {View, Text, TextInput} from 'react-native'
class TimeIn {
    handleminutes(minutes) {
        this.setState({ timeinminutes: minutes })
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
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timein = timein;
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
                                        let day = this.state.timeinday;
                                        let year = this.state.timeinyear;
                                        let month = this.state.timeinmonth;
                                        let hours = this.state.timeinhours;
                                        let time = this.state.timeinampm;
                                        let timein = makeTimeString(year, month, day, hours, minutes, time);
                                        timein = UTCTimeStringfromTime(timein);
                                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
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
        this.setState({ timeinhours: hours })
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
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timein = timein;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {


                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid,  this.state.activeequipmentid)
                                if (myequipment) {

                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid,   myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
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
        this.setState({ timeinyear: year })
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
                                    let day = this.state.timeinday;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timein = timein;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid,  myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let minutes = this.state.timeinminutes;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
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
        this.setState({ timeinday: day })
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
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timein = timein;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)

                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid, myequipment.equipmentid)
                                    let minutes = this.state.timeinminutes;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
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
        this.setState({ timeinmonth: month })
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
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timein = timein;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid,  myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let minutes = this.state.timeinminutes;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
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
        if (this.state.timeinampm === 'am' && ampm === 'pm') {
            this.setState({ timeinampm: 'pm' })
        } else if (this.state.timeinampm === 'pm' && ampm === 'am') {
            this.setState({ timeinampm: 'am' })
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
                            let day = this.state.timeinday;
                            let year = this.state.timeinyear;
                            let month = this.state.timeinmonth;
                            let hours = this.state.timeinhours;
                            let time = ampm;
                            let minutes = this.state.timeinminutes;
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                            console.log(timein)
                            timein = UTCTimeStringfromTime(timein);
                            console.log(timein)
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timein = timein;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getscheduleequipmentbyid.call(this, projectid,  this.state.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getscheduleequipmentkeybyid.call(this, projectid,  myequipment.equipmentid)
                            let day = this.state.timeinday;
                            let year = this.state.timeinyear;
                            let month = this.state.timeinmonth;
                            let hours = this.state.timeinhours;
                            let minutes = this.state.timeinminutes;
                            let time = ampm
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                            timein = UTCTimeStringfromTime(timein);
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
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
        const timein = new TimeIn();
        const showam = () => {
            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onPress={() => { timein.toggleampm.call(this, 'pm') }}>AM</Text>
            </View>)

        }
        const showpm = () => {

            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onPress={() => { timein.toggleampm.call(this, 'am') }}>PM</Text>
            </View>)

        }




        if (this.state.timeinampm === 'am') {
            return showam()
        } else if (this.state.timeinampm === 'pm') {
            return showpm()
        }


    }

    showtimein() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const timein = new TimeIn();
        const calender = new CalenderTimeIn();
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Time In (MM-DD-YYYY HH mm) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} 
                            value={this.state.timeinmonth.toString()}
                                onChangeText={text => { timein.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeinday.toString()}
                                onChangeText={text => { timein.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex2, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeinyear.toString()}
                                onChangeText={text => { timein.handleyear.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeinhours.toString()}
                                onChangeText={text => { timein.handlehours.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.timeinminutes.toString()}
                                onChangeText={text => { timein.handleminutes.call(this, text) }}
                            />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>
                            {timein.showampm.call(this)}
                        </View>
                    </View>

                    {calender.showCalenderTimeIn.call(this)}

                </View>
            </View>)
    }

}

export default TimeIn;