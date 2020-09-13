import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import { View, Text} from 'react-native'
import { getScheduleDates, getWeekSchedule, formatDateStringDisplay } from './functions'
import Svg, {
    Rect,
    Text as TextSvg,
    G
} from 'react-native-svg';
class ScheduleView {

    getviewheight() {
        const construction = new Construction();
        const scheduleview = new ScheduleView();
        const schedules = this.getSchedule();
        let employees  = [];
        let equipment = [];

        schedules.map(schedule => {

            if (schedule.hasOwnProperty("laborid")) {

                if (scheduleview.validatenewemployee.call(this,employees, schedule.providerid)) {
                    let me = {};
                    let employee = construction.getemployeebyid.call(this, schedule.providerid)
                    me[schedule.providerid] = {};
                    me[schedule.providerid]["firstname"] = employee.firstname;
                    me[schedule.providerid]["lastname"] = employee.lastname;
                    me[schedule.providerid]["schedule"] = [];
                    me[schedule.providerid]["schedule"].push({ timein: schedule.timein, timeout: schedule.timeout })
                    employees.push(me)
                } else {
                    let i = scheduleview.getemployeekey.call(this,employees, schedule.providerid)
                    employees[i][schedule.providerid].schedule.push({ timein: schedule.timein, timeout: schedule.timeout })

                }


            } else if (schedule.hasOwnProperty("equipmentid")) {

                if (scheduleview.validatenewemployee.call(this,equipment, schedule.equipmentid)) {
                    let me = {};
                    const myequipment = construction.getmyequipmentbyid.call(this, schedule.myequipmentid)
                    me[schedule.myequipmentid] = {};
                    me[schedule.myequipmentid]["equipment"] = myequipment.equipment;
                    me[schedule.myequipmentid]["schedule"] = [];
                    me[schedule.myequipmentid]["schedule"].push({ timein: schedule.timein, timeout: schedule.timeout })
                    equipment.push(me)



                } else {
                    let i = scheduleview.getemployeekey.call(this,equipment, schedule.myequipmentid)

                    equipment[i][schedule.myequipmentid].schedule.push({ timein: schedule.timein, timeout: schedule.timeout })


                }

            }


        })

        if(employees.length  + equipment.length > 2) {
            return(210 + ((employees.length  + equipment.length - 2)*100) )
        } else {
            return(210)
        }

      



    }

    validatenewequipment(equipment, equipmentid) {
        let validate = true;
        if (equipment.length > 0) {
            // eslint-disable-next-line
            equipment.map(myequipment => {
                if (myequipment.hasOwnProperty(equipmentid)) {
                    validate = false;
                }
            })
        }
        return validate;
    }

    getequipmentkey(equipment, equipmentid) {
        let key = false;
        // eslint-disable-next-line
        equipment.map((myequipment, i) => {
            if (myequipment.hasOwnProperty(equipmentid)) {
                key = i;

            }
        })
        return key;
    }

    validatenewemployee(employees, providerid) {
        let validate = true;
        if (employees.length > 0) {
            // eslint-disable-next-line
            employees.map(employee => {
                if (employee.hasOwnProperty(providerid)) {
                    validate = false;
                }
            })
        }
        return validate;
    }

    getemployeekey(employees, providerid) {
        let key = false;
        // eslint-disable-next-line
        employees.map((employee, i) => {
            if (employee.hasOwnProperty(providerid)) {
                key = i;

            }
        })
        return key;
    }



    getschedule(type) {
        const construction = new Construction();
        const scheduleview = new ScheduleView();
        const schedules = this.getSchedule();
        let showschedule = [];
        let employees = [];
        let equipment = [];
        

        const getColorClass = (type) => {
         
            if (type === "schedule") {
                return ("#6BB9F0")
            } else if (type === "actual") {
                return ("#830026")
            }
        }

     
        let ypos = 80;
        if (schedules) {



            const dates = getScheduleDates(`${this.state.timeinyear}-${this.state.timeinmonth}-${this.state.timeinday}`)

            // eslint-disable-next-line
            schedules.map(schedule => {

                if (schedule.hasOwnProperty("laborid")) {

                    if (scheduleview.validatenewemployee.call(this,employees, schedule.providerid)) {
                        let me = {};
                        let employee = construction.getemployeebyid.call(this, schedule.providerid)
                        me[schedule.providerid] = {};
                        me[schedule.providerid]["providerid"] = employee.providerid;
                        me[schedule.providerid]["firstname"] = employee.firstname;
                        me[schedule.providerid]["lastname"] = employee.lastname;
                        me[schedule.providerid]["schedule"] = [];
                        me[schedule.providerid]["schedule"].push({ laborid:schedule.laborid, timein: schedule.timein, timeout: schedule.timeout })
                        employees.push(me)
                    } else {
                        let i = scheduleview.getemployeekey.call(this,employees, schedule.providerid)
                        employees[i][schedule.providerid].schedule.push({ laborid:schedule.laborid, timein: schedule.timein, timeout: schedule.timeout })

                    }


                } else if (schedule.hasOwnProperty("equipmentid")) {

                    if (scheduleview.validatenewequipment.call(this,equipment, schedule.myequipmentid)) {
                        let me = {};
                        const myequipment = construction.getmyequipmentbyid.call(this, schedule.myequipmentid)
                        me[schedule.myequipmentid] = {};
                        me[schedule.myequipmentid]["equipmentid"] = myequipment.equipmentid;
                        me[schedule.myequipmentid]["equipment"] = myequipment.equipment;
                        me[schedule.myequipmentid]["schedule"] = [];
                        me[schedule.myequipmentid]["schedule"].push({ equipmentid:schedule.equipmentid,timein: schedule.timein, timeout: schedule.timeout })
                        equipment.push(me)



                    } else {
                        let i = scheduleview.getequipmentkey.call(this,equipment, schedule.myequipmentid)

                        equipment[i][schedule.myequipmentid].schedule.push({ equipmentid:schedule.equipmentid, timein: schedule.timein, timeout: schedule.timeout })


                    }

                }


            })





            if (employees.length > 0) {
                // eslint-disable-next-line
                employees.map(employee => {
                    let props = Object.getOwnPropertyNames(employee)
                    let firstname = employee[props[0]].firstname
                    let lastname = employee[props[0]].lastname
                 
                        showschedule.push(<TextSvg key={employee[props[0]].providerid} fontSize="24" fill="black" stroke="none"  x="0" y={ypos}>{firstname} {lastname}</TextSvg>)
                        ypos+=50;


                    if (employee[props].hasOwnProperty("schedule")) {
                        // eslint-disable-next-line
                        employee[props[0]].schedule.map(myschedule => {

                            let params = getWeekSchedule(dates.day_1, dates.day_7, myschedule.timein, myschedule.timeout)

                            if (params.init > 0 && params.init <= 840) {
                                
                                showschedule.push(<Rect key={myschedule.laborid} fill={getColorClass(type)} strokeWidth="1" stroke="rgb(0,0,0)" x={2.81 + params.init} y={ypos - 25} width={params.length} height="25"/>)
                            }

                        })
                    }

                    ypos += 50;
                })


            } // end if employees length 



            if (equipment.length > 0) {
                // eslint-disable-next-line
                equipment.map(myequipment => {
                    let props = Object.getOwnPropertyNames(myequipment)
                    let equipment = myequipment[props[0]].equipment
                    let equipmentid = myequipment[props[0]].equipmentid
                    showschedule.push(<TextSvg key={equipmentid} fontSize="24" fill="black" stroke="none"  x="0" y={ypos}>{equipment}</TextSvg>)
                    ypos+=50;
                    if (myequipment[props].hasOwnProperty("schedule")) {
                        // eslint-disable-next-line
                        myequipment[props[0]].schedule.map(myschedule => {

                            let params = getWeekSchedule(dates.day_1, dates.day_7, myschedule.timein, myschedule.timeout)
                            if (params.init > 0 && params.init <= 840) {
                                showschedule.push(
                                    <Rect key={myschedule.equipmentid} fill={getColorClass(type)} strokeWidth="1" stroke="rgb(0,0,0)" x={2.81 + params.init} y={ypos - 25} width={params.length} height="25"/>)
                            }

                        })
                    }

                    ypos += 50;
                })


            } // end if equipment length 





        } // end if schedule


       return showschedule;


    }

    showschedule(type) {
        const scheduleview = new ScheduleView();
        const styles = MyStylesheet();
        const dates = getScheduleDates(`${this.state.timeinyear}-${this.state.timeinmonth}-${this.state.timeinday}`)
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const getviewheight = scheduleview.getviewheight.call(this)
        const alignright = {alignSelf: 'flex-end'}
        return (
            <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
              
                <Text style={{ ...styles.generalFont, ...regularFont, ...alignright}}>View from {formatDateStringDisplay(dates.day_1)} to {formatDateStringDisplay(dates.day_7)}</Text>
                
                <Svg width='100%' height={getviewheight} viewBox={`0 0 843.81 ${getviewheight}`}>



                    <TextSvg fill="black" fontSize="30" stroke="none" x="40.09" y="37.66">M</TextSvg>
                    <TextSvg fill="black" fontSize="30" stroke="none" x="167.69" y="37.63">T</TextSvg>
                    <TextSvg fill="black" fontSize="30"stroke="none" x="274.76" y="37.66">W</TextSvg>
                    <TextSvg fill="black" fontSize="30"stroke="none" x="387.48" y="37.66">TH</TextSvg>
                    <TextSvg fill="black" fontSize="30"stroke="none" x="527.54" y="37.66">F</TextSvg>
                    <TextSvg fill="black" fontSize="30"stroke="none" x="627.76" y="37.63">SA</TextSvg>
                    <TextSvg fill="black" fontSize="30"stroke="none" x="747.79" y="37.66">SU</TextSvg>

                    <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="2.81" y="1" width="120" height="50" />
                    <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="122.81" y="1" width="120" height="50" />
                    <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="242.81" y="1" width="120" height="50" />
                    <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="362.81" y="1" width="120" height="50" />
                    <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="482.81" y="1" width="120" height="50" />
                    <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="602.81" y="1" width="120" height="50" />
                    <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="722.81" y="1" width="120" height="50" />



                    {scheduleview.getschedule.call(this, type)}



                </Svg>

            </View>)
    }
}
export default ScheduleView;



