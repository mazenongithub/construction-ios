import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import ShowSchedule from './showschedule';
import { getScheduleDates, getDayfromDateString } from './functions'
import MaterialDate from './viewscheduledate';
import {Text, View} from 'react-native';



class MySchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '', year: '', month: '', day: '', day_1: '', day_2: '', day_3: '', day_4: '', day_5: '', day_6: '', day_7: '', showcalender: true }

    }
    componentDidMount() {

        this.datedefault()
    }
   
   
    datedefault() {
        const datemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const dateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const dateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
      
        const dates = getScheduleDates(`${dateyear()}-${datemonth()}-${dateday()}`)
        this.setState({ day_1: dates.day_1, day_2: dates.day_2, day_3: dates.day_3, day_4: dates.day_4, day_5: dates.day_5, day_6: dates.day_6, day_7: dates.day_7 })
        this.setState({ year: dateyear(), month: datemonth(), day: dateday() })
    }
    gettitle() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const styles = MyStylesheet();

        if (myuser) {
            return (<Text style={{ ...headerFont, ...styles.generalFont, ...styles.boldFont }}>/{myuser.profile}</Text>)
        }
    }

    getschedule() {
        const construction = new Construction();
        const params = construction.getactiveproject.call(this)

        const profile = construction.getemployeebyprofile.call(this,params.employeeid);
        const myemployee = construction.getemployeebyproviderid.call(this, profile.providerid)
       
        const myschedule = construction.getschedulebyproviderid.call(this, myemployee.providerid);
        return myschedule;
    }
    render() {
        const showschedule = new ShowSchedule()
        const styles = MyStylesheet();
        const materialdate = new MaterialDate();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this);
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const profile = construction.getactiveemployeeid.call(this)

        if (myuser) {

            return (
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>/{profile}</Text>
                                <Text style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter}}>View Schedule</Text>
                            </View>

                        </View>
                        {materialdate.showmaterialdate.call(this)}
                        {showschedule.showschedule.call(this,"schedule")}
                    </View>
                </View>)

        } else {
            return (
                <View style={{ ...styles.generalContainer }}>
                    <Text style={{ ...styles.generalFont, ...regularFont }}> Please Login to View Schedule</Text>
                </View>)
        }



    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(MySchedule);