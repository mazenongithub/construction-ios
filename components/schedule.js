import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import {
    inputUTCStringForLaborID,
    calculatetotalhours,
    formatDateStringDisplay,
    getMonthfromTimein,
    getDayfromTimein,
    getYearfromTimein,
    getHoursfromTimein,
    getMinutesfromTimein,
    getAMPMfromTimeIn,
    makeTimeString,
    UTCTimeStringfromTime,
    CreateScheduleLabor,
    CreateScheduleEquipment,
    CreateScheduleMaterial,
    isNumeric
} from './functions'
import Construction from './construction'
import TimeIn from './scheduletimein';
import TimeOut from './scheduletimeout'
import MaterialDate from './scheduledate'
import MilestoneID from './milestoneid';
import CSI from './csi'
import MakeID from './makeids';
import EmployeeID from './employeeid'
import EquipmentID from './equipmentid';
import MaterialID from './materialid';
import ScheduleView from './scheduleview'




class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, active: '', activelaborid: false, activeequipmentid: false, activematerialid: false, providerid: '', timeinmonth: '', timeinday: '', timeinyear: '', timeinhours: '', timeinminutes: '', timeinampm: '', csi_1: '', csi_2: '', csi_3: '', csi_4: '', timeoutmonth: '', timeoutday: '', timeoutminutes: '', timeouthours: '', timeoutyear: '', timeoutampm: '', milestoneid: '', csiid: '', laborrate: 0, equipmentrate: 0, mymaterialid: '', myequipmentid: '', materialdateday: '', materialdatemonth: '', materialdateyear: '', quantity: '', unit: '', unitcost: '', calendertimein: true, calendertimeout: true, materialcalender: true, material: '', equipment: '', employee: '', milestone:''}

    }
    componentDidMount() {
        this.timeindefault()
        this.timeoutdefault();
        this.materialdatedefault();
    }

    reset() {
        this.timeindefault()
        this.timeoutdefault();
        this.materialdatedefault();
        this.setState({ quantity: '', unit: '', unitcost: '', laborrate: '', equipmentrate: '', material: '', equipment: '' })

    }

    materialdatedefault() {
        const materialdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const materialdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const materialdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ materialdateyear: materialdateyear(), materialdatemonth: materialdatemonth(), materialdateday: materialdateday() })
    }


    timeoutdefault() {
        const timeoutmonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const timeoutday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const timeoutyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        const timeouthours = () => {
            let hours = new Date().getHours();
            if (hours > 12) {
                hours = hours - 12;
            }
            if (hours < 10) {
                hours = `0${hours}`
            }
            return hours;
        }
        const timeoutminutes = () => {
            let minutes = new Date().getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            return minutes;
        }
        const timeoutampm = () => {
            const hours = new Date().getHours();
            if (hours < 12) {
                return 'am'
            } else {
                return 'pm'
            }
        }
        this.setState({ timeoutmonth: timeoutmonth(), timeoutday: timeoutday(), timeoutyear: timeoutyear(), timeouthours: timeouthours(), timeoutminutes: timeoutminutes(), timeoutampm: timeoutampm() })
    }
    timeindefault() {
        const timeinmonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const timeinday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const timeinyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        const timeinhours = () => {
            let hours = new Date().getHours();
            if (hours > 12) {
                hours = hours - 12;
            }
            if (hours < 10) {
                hours = `0${hours}`
            }
            return hours;
        }
        const timeinminutes = () => {
            let minutes = new Date().getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            return minutes;
        }
        const timeinampm = () => {
            const hours = new Date().getHours();
            if (hours < 12) {
                return 'am'
            } else {
                return 'pm'
            }
        }
        this.setState({ timeinmonth: timeinmonth(), timeinday: timeinday(), timeinyear: timeinyear(), timeinhours: timeinhours(), timeinminutes: timeinminutes(), timeinampm: timeinampm() })
    }

    handleemployeeid(providerid) {
        const construction = new Construction();
        const makeid = new MakeID();
        const myuser = construction.getuser.call(this);
        const myemployee = construction.getemployeebyid.call(this, providerid)
        const employee = `${myemployee.firstname} ${myemployee.lastname}`
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                if (this.state.activelaborid) {
                    const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {
                        const j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[j].providerid = providerid;
                        this.props.reduxUser(myuser)
                        this.setState({ employee })
                    }
                } else {
                    const laborid = makeid.schedulelaborid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const csiid = this.state.csiid;
                    const dayin = this.state.timeinday;
                    const yearin = this.state.timeinyear;
                    const monthin = this.state.timeinmonth;
                    const hoursin = this.state.timeinhours;
                    const timetimein = this.state.timeinampm;
                    const minutesin = this.state.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.state.timeoutday;
                    const yearout = this.state.timeoutyear;
                    const monthout = this.state.timeoutmonth;
                    const hoursout = this.state.timeouthours;
                    const minutesout = this.state.timeoutminutes;
                    const timetimeout = this.state.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const laborrate = construction.gethourlyrate.call(this, providerid).toFixed(2)
                    const profit = 0;
                    const engineerid = providerid;

                    const newLabor = CreateScheduleLabor(laborid, engineerid, milestoneid, csiid, timein, timeout, laborrate, '', '', profit)

                    const labors = construction.getschedulelabor.call(this, projectid)
                    if (labors) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newLabor)
                    } else {
                        const schedulelabor = {mylabor:[newLabor]}
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: laborid, employee })
                }
            }
        }
    }



    getemployeeid() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        if (project) {
            const projectid = project.projectid;
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {

                    return mylabor.providerid;
                }
            } else {
                return this.state.providerid;
            }

        }
    }

    handlemyequipmentid(myequipmentid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const makeid = new MakeID();
        const equipment = construction.getmyequipmentbyid.call(this, myequipmentid)
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                if (this.state.activeequipmentid) {
                    const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                    if (myequipment) {

                        const j = construction.getscheduleequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].myequipmentid = myequipmentid;
                        this.props.reduxUser(myuser)
                        this.setState({ equipment: equipment.equipment })
                    }

                } else {
                    const equipmentid = makeid.equipmentid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const csiid = this.state.csiid;
                    const dayin = this.state.timeinday;
                    const yearin = this.state.timeinyear;
                    const monthin = this.state.timeinmonth;
                    const hoursin = this.state.timeinhours;
                    const timetimein = this.state.timeinampm;
                    const minutesin = this.state.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.state.timeoutday;
                    const yearout = this.state.timeoutyear;
                    const monthout = this.state.timeoutmonth;
                    const hoursout = this.state.timeouthours;
                    const minutesout = this.state.timeoutminutes;
                    const timetimeout = this.state.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const equipmentrate = construction.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)
                    const engineerid = myuser.providerid;


                    const newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, engineerid, csiid, milestoneid, timein, timeout, equipmentrate, '', 0)

                    const equipments = construction.getscheduleequipment.call(this, projectid)
                    if (equipments) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        const scheduleequipment = {myequipment:[newEquipment]}
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: equipmentid, equipment: equipment.equipment })


                }
            }
        }
    }
    getmymaterialid() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        let materialid = this.state.mymaterialid;
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;

                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
                    if (mymaterial) {
                        materialid = mymaterial.mymaterialid;
                    }
                }

            }

        }
        return materialid;

    }

    handlemymaterialid(mymaterialid) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const makeid = new MakeID();
        const material = construction.getmymaterialbyid.call(this, mymaterialid);
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid);
                    if (mymaterial) {
                        const j = construction.getschedulematerialskeybyid.call(this, projectid, this.state.activematerialid)
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].mymaterialid = mymaterialid;
                        this.reduxUser({ myuser })
                        this.setState({ material: material.material })
                    }

                } else {
                    const materialid = makeid.materialid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const mymaterial = construction.getmymaterialbyid.call(this, mymaterialid)
                    const csiid = this.state.csiid;
                    const year = this.state.materialdateyear;
                    const day = this.state.materialdateday;
                    const month = this.state.materialdatemonth;
                    const timein = `${year}-${month}-${day}`;
                    const quantity = this.state.quantity;
                    const unitcost = mymaterial.unitcost;
                    const unit = mymaterial.unit;
                    const engineerid = myuser.providerid;
                    const newMaterial = CreateScheduleMaterial(materialid, mymaterialid, engineerid, milestoneid, csiid, timein, quantity, unit, unitcost, '', 0);
                    const materials = construction.getschedulematerials.call(this, projectid);
                    if (materials) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)

                    } else {
                        const schedulematerials = {mymaterial:[newMaterial]}
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }

                    this.props.reduxUser(myuser)
                    this.setState({ activematerialid: materialid, material: material.material })

                }
            }
        }

    }

    getmyequipmentid() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let equipmentid = "";
        if (project) {
            const projectid = project.projectid;
            if (this.state.activeequipmentid) {
                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                if (myequipment) {
                    equipmentid = myequipment.myequipmentid;
                }
            } else {
                equipmentid = this.state.myequipmentid;
            }

        }
        return equipmentid;
    }

    getmilestoneid() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let milestoneid = this.state.milestoneid;
        if (project) {
            const projectid = project.projectid;
            if (this.state.active === 'labor') {
                if (this.state.activelaborid) {
                    const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid);
                    milestoneid = mylabor.milestoneid;
                } else {
                    milestoneid = this.state.milestoneid;
                }

            } else if (this.state.active === 'equipment') {
                if (this.state.activeequipmentid) {
                    const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                    milestoneid = myequipment.milestoneid;
                }

            } else if (this.state.active === 'materials') {

                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid);
                    milestoneid = mymaterial.milestoneid;
                }

            }

        }
        return milestoneid;

    }


    handlemilestoneid(milestoneid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                if (this.state.active === 'labor') {

                    if (this.state.activelaborid) {
                        const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid);
                        if (mylabor) {
                            const j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].milestoneid = milestoneid;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        this.setState({ milestoneid })
                    }

                } else if (this.state.active === 'materials') {

                    if (this.state.activematerialid) {
                        const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid);
                        if (mymaterial) {
                            const j = construction.getschedulematerialskeybyid.call(this, projectid, this.state.activematerialid);
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].milestoneid = milestoneid;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ milestoneid })
                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                        if (myequipment) {
                            const j = construction.getscheduleequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].milestoneid = milestoneid;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ milestoneid })
                    }

                } else {
                    this.setState({ milestoneid })
                }

            }

        }

    }

    getcsiid() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        if (project) {
            const projectid = project.projectid;
            if (this.state.activelaborid && this.state.active === 'labor') {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {
                    let csi = construction.getcsibyid.call(this, mylabor.csiid)
                    if (csi) {
                        return `${csi.csi}-${csi.title}`
                    }

                }
            } else if (this.state.activematerialid && this.state.active === 'materials') {
                const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
                if (mymaterial) {
                    let csi = construction.getcsibyid.call(this, mymaterial.csiid);
                    if (csi) {

                        return `${csi.csi}-${csi.title}`
                    }
                }
            } else if (this.state.activeequipmentid && this.state.active === 'equipment') {
                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)

                if (myequipment) {
                    let csi = construction.getcsibyid.call(this, myequipment.csiid);
                    if (csi) {

                        return `${csi.csi}-${csi.title}`
                    }
                }

            } else if (this.state.csiid) {
                let csi = construction.getcsibyid.call(this, this.state.csiid);
                return `${csi.csi}-${csi.title}`
            }

        }

    }

    handlecsiid(csiid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                const csi = construction.getcsibyid.call(this, csiid);
                if (csi) {

                    const csi_1 = csi.csi.substring(0, 2)
                    const csi_2 = csi.csi.substring(2, 4);
                    const csi_3 = csi.csi.substring(4, 6);
                    let csi_4 = "";
                    if (csi.csi.length > 6) {
                        csi_4 = csi.csi.substring(7, 9);
                    }
                    this.setState({ csi_4, csi_3, csi_2, csi_1 })


                    if (this.state.active === 'labor') {

                        if (this.state.activelaborid) {
                            const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid);
                            if (mylabor) {
                                const j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].csiid = csiid;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            this.setState({ csiid })
                        }

                    } else if (this.state.active === 'materials') {

                        if (this.state.activematerialid) {
                            const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid);
                            if (mymaterial) {
                                const j = construction.getschedulematerialskeybyid.call(this, projectid, this.state.activematerialid);
                                myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].csiid = csiid;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })
                            }
                        } else {
                            this.setState({ csiid })
                        }

                    } else if (this.state.active === 'equipment') {

                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                            if (myequipment) {
                                const j = construction.getscheduleequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                                myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].csiid = csiid;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })
                            }
                        } else {
                            this.setState({ csiid })
                        }

                    } else {
                        this.setState({ csiid })
                    }

                }

            }

        }

    }

    makematerialactive(materialid) {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        if (project) {
            const projectid = project.projectid;

            if (this.state.activematerialid === materialid) {
                this.materialdatedefault();
                this.setState({ activematerialid: false })
                this.reset()

            } else {

                const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, materialid)
                if (mymaterial) {
                    const materialdateyear = mymaterial.timein.substring(0, 4)
                    const materialdatemonth = mymaterial.timein.substring(5, 7);
                    const materialdateday = mymaterial.timein.substring(8, 10);
                    let csi_1 = "";
                    let csi_2 = "";
                    let csi_3 = "";
                    let csi_4 = "";
                    const csi = construction.getcsibyid.call(this, mymaterial.csiid);
                    if (csi) {
                        csi_1 = csi.csi.substring(0, 2)
                        csi_2 = csi.csi.substring(2, 4);
                        csi_3 = csi.csi.substring(4, 6);

                        if (csi.csi.length > 6) {
                            csi_4 = csi.csi.substring(7, 9);
                        }

                    }

                    const material = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid)


                    this.setState({ materialdatemonth, materialdateday, materialdateyear, activematerialid: materialid, csi_1, csi_2, csi_3, csi_4, material: material.material })

                }

            }

        }

    }


    removematerial(mymaterial) {
        const construction = new Construction();
        const material = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid)
        Alert.alert(
            'Remove Material',
            `Are you sure you want to remove ${material.material}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Material '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremovematerial(mymaterial) } },
            ],
            { cancelable: false }
        )
    }


    confirmremovematerial(mymaterial) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const material = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid)

        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                const material = construction.getschedulematerialsbyid.call(this, projectid, mymaterial.materialid)
                if (material) {
                    const j = construction.getschedulematerialskeybyid.call(this, projectid, material.materialid)
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial.splice(j, 1)
                    this.props.reduxUser(myuser)
                    this.reset();

                }

            }

        }

    }

    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const removeIcon = construction.getremoveicon.call(this)
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        const csi = construction.getcsibyid.call(this, mymaterial.csiid);
        const material = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid)
        const getbutton = () => {
            if (this.state.activematerialid === mymaterial.materialid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }


        }
        const activebackground = (materialid) => {
            if (this.state.activematerialid === materialid) {
                return (styles.activeBackground)
            }

        }
        if (this.state.active === 'materials') {
            if (project) {
                const projectid = project.projectid;
                const milestone = construction.getmilestonebyid.call(this, mymaterial.milestoneid)

                return (<View style={{ ...styles.generalContainer, ...activebackground(mymaterial.materialid) }} key={mymaterial.materialid}>
                    <Text style={{ ...regularFont, ...styles.generalFont }} onPress={() => { this.makematerialactive(mymaterial.materialid) }} key={mymaterial.materialid}>{formatDateStringDisplay(mymaterial.timein)}
                        {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone}
                        {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => { this.removematerial(mymaterial) }}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIcon}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>

                </View>)

            }
        }

    }

    showmaterialids() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let materialids = [];
        if (project) {
            const projectid = project.projectid;
            const materials = construction.getschedulematerials.call(this, projectid)
            if (materials) {
                // eslint-disable-next-line
                materials.map(material => {
                    materialids.push(this.showmaterialid(material))
                })
            }

        }
        return materialids;

    }

    removelaborid(mylabor) {

        Alert.alert(
            'Remove Labor',
            `Are you sure you want to remove labor ${mylabor.providerid}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Labor '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremovelaborid(mylabor) } },
            ],
            { cancelable: false }
        )
    }

    confirmremovelaborid(labor) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);

        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, labor.laborid);
                if (mylabor) {
                    const j = construction.getschedulelaborkeybyid.call(this, projectid, mylabor.laborid);
                    myuser.company.projects.myproject[i].schedulelabor.mylabor.splice(j, 1);
                    this.props.reduxUser(myuser)
                    this.reset();
                }
            }
        }



    }

    getSchedule() {
        const construction = new Construction();
        const params = construction.getactiveproject.call(this)
        const schedule = construction.getAllSchedule.call(this, params.projectid);
        return schedule;

    }
    makelaboractive(laborid) {

        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        if (project) {
            const projectid = project.projectid;
            if (this.state.activelaborid === laborid) {
                this.reset();
                this.setState({ activelaborid: false })
            } else {

                const mylabor = construction.getschedulelaborbyid.call(this, projectid, laborid)

                if (mylabor) {
                    const myemployee = construction.getemployeebyid.call(this, mylabor.providerid)
                    const employee = `${myemployee.firstname} ${myemployee.lastname}`

                    const timeinmonth = getMonthfromTimein(mylabor.timein);
                    const timeinday = getDayfromTimein(mylabor.timein);
                    const timeinyear = getYearfromTimein(mylabor.timein)
                    const timeinhours = getHoursfromTimein(mylabor.timein)
                    const timeinminutes = getMinutesfromTimein(mylabor.timein)
                    const timeinampm = getAMPMfromTimeIn(mylabor.timein)

                    const timeoutmonth = getMonthfromTimein(mylabor.timeout);
                    const timeoutday = getDayfromTimein(mylabor.timeout);
                    const timeoutyear = getYearfromTimein(mylabor.timeout)
                    const timeouthours = getHoursfromTimein(mylabor.timeout)
                    const timeoutminutes = getMinutesfromTimein(mylabor.timeout)
                    const timeoutampm = getAMPMfromTimeIn(mylabor.timeout);
                    let csi_1 = "";
                    let csi_2 = "";
                    let csi_3 = "";
                    let csi_4 = "";
                    const csi = construction.getcsibyid.call(this, mylabor.csiid);
                    if (csi) {
                        csi_1 = csi.csi.substring(0, 2)
                        csi_2 = csi.csi.substring(2, 4);
                        csi_3 = csi.csi.substring(4, 6);

                        if (csi.csi.length > 6) {
                            csi_4 = csi.csi.substring(7, 9);
                        }
                    }


                    this.setState({ activelaborid: laborid, timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm, timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm, csi_1, csi_2, csi_3, csi_4, employee })

                }
            }

        }
    }

    showlaborid(labor) {
        const construction = new Construction();
        const styles = MyStylesheet();
        const removeIcon = construction.getremoveicon.call(this)
        const regularFont = construction.getRegularFont.call(this);
        const csi = construction.getcsibyid.call(this, labor.csiid);
        let employee = construction.getemployeebyid.call(this, labor.providerid)
        let hourlyrate = labor.laborrate;
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        if (project) {
            const projectid = project.projectid;
            const milestone = construction.getmilestonebyid.call(this, labor.milestoneid)


            const getbutton = () => {
                if (this.state.activelaborid === labor.laborid) {
                    return (styles.activeButton);
                } else {
                    return (styles.generalButton);
                }
            }
            console.log(getbutton())

            const getactivelaborbackground = (laborid) => {
                if (this.state.activelaborid === laborid) {
                    return styles.activeBackground;
                }

            }

            if (this.state.active === 'labor') {

                return (
                    <View key={labor.laborid} style={{ ...styles.generalContainer }}>
                        <Text style={{ ...getactivelaborbackground(labor.laborid), ...styles.generalFont, ...regularFont }} onPress={() => { this.makelaboractive(labor.laborid) }}>
                            {employee.firstname} {employee.lastname}: {labor.description} Milestone {milestone.milestone} CSI:{csi.csi}-{csi.title}
                From {inputUTCStringForLaborID(labor.timein)} to {inputUTCStringForLaborID(labor.timeout)}
                ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(labor.timeout, labor.timein)} Hrs = ${(Number(calculatetotalhours(labor.timeout, labor.timein)) * hourlyrate).toFixed(2)}
                        </Text>

                        <TouchableOpacity onPress={() => { this.removelaborid(labor) }}>
                            <Image source={require('./png/removeIcon.png')}
                                style={removeIcon}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>


                    </View>)

            }

        }

    }
    showlaborids() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const checkmanager = construction.checkmanager.call(this)
        let laborids = [];
        const myuser = construction.getuser.call(this);
        if (myuser) {
            const project = construction.getprojectbyid.call(this, activeparams.projectid);
            if (project) {
                const projectid = project.projectid;
                const labors = construction.getschedulelabor.call(this, projectid)
                if (labors) {
                    // eslint-disable-next-line
                    labors.map(labor => {
                        if (labor.providerid === myuser.providerid || checkmanager) {
                            laborids.push(this.showlaborid(labor))

                        }


                    })
                }

            }

        }
        return laborids;

    }

    removeequipment(equipment) {
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid)
        Alert.alert(
            'Remove Equipment',
            `Are you sure you want to remove ${myequipment.equipment}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Equipment '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremoveequipment(equipment) } },
            ],
            { cancelable: false }
        )
    }

    confirmremoveequipment(equipment) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid)

        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid)
                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, equipment.equipmentid);
                if (myequipment) {
                    const j = construction.getscheduleequipmentkeybyid.call(this, projectid, equipment.equipmentid);
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment.splice(j, 1)
                    this.props.reduxUser(myuser)
                    this.reset();
                }


            }

        }

    }

    makeequipmentactive(equipmentid) {

        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)

        if (project) {
            const projectid = project.projectid;
            if (this.state.activeequipmentid === equipmentid) {

                this.setState({ activeequipmentid: false })
                this.reset();
            } else {

                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, equipmentid)

                if (myequipment) {
                    const equipment = construction.getmyequipmentbyid.call(this, myequipment.myequipmentid)
                    const timeinmonth = getMonthfromTimein(myequipment.timein);
                    const timeinday = getDayfromTimein(myequipment.timein);
                    const timeinyear = getYearfromTimein(myequipment.timein)
                    const timeinhours = getHoursfromTimein(myequipment.timein)
                    const timeinminutes = getMinutesfromTimein(myequipment.timein)
                    const timeinampm = getAMPMfromTimeIn(myequipment.timein)

                    const timeoutmonth = getMonthfromTimein(myequipment.timeout);
                    const timeoutday = getDayfromTimein(myequipment.timeout);
                    const timeoutyear = getYearfromTimein(myequipment.timeout)
                    const timeouthours = getHoursfromTimein(myequipment.timeout)
                    const timeoutminutes = getMinutesfromTimein(myequipment.timeout)
                    const timeoutampm = getAMPMfromTimeIn(myequipment.timeout);

                    const csi = construction.getcsibyid.call(this, myequipment.csiid);
                    let csi_1 = "";
                    let csi_2 = "";
                    let csi_3 = "";
                    let csi_4 = "";
                    if (csi) {
                        csi_1 = csi.csi.substring(0, 2)
                        csi_2 = csi.csi.substring(2, 4);
                        csi_3 = csi.csi.substring(4, 6);

                        if (csi.csi.length > 6) {
                            csi_4 = csi.csi.substring(7, 9);
                        }
                    }
                    this.setState({ activeequipmentid: equipmentid, timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm, timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm, csi_1, csi_2, csi_3, csi_4, equipment: equipment.equipment })

                }
            }

        }
    }

    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        const csi = construction.getcsibyid.call(this, equipment.csiid)
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`
        const removeIcon = construction.getremoveicon.call(this)
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate))
        const getbutton = () => {
            if (this.state.activeequipmentid === equipment.equipmentid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }
        }

        const activeequipment = (equipmentid) => {
            if (this.state.activeequipmentid === equipmentid) {
                return (styles.activeBackground)
            }

        }
        if (project) {

            const milestone = construction.getmilestonebyid.call(this, equipment.milestoneid)
            const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid);

            return (<View style={{ ...styles.generalContainer, ...styles.generalFont }} key={equipment.equipmentid}>
                <Text style={{ ...activeequipment(equipment.equipmentid), ...regularFont }} onPress={() => { this.makeequipmentactive(equipment.equipmentid) }}>
                    {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
                 CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone}
                Total Hours: {totalhours} x  {equipmentrate} = ${amount.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => { this.removeequipment(equipment) }}>
                    <Image source={require('./png/removeIcon.png')}
                        style={removeIcon}
                        resizeMethod='scale'
                    />
                </TouchableOpacity>
            </View>
            )

        }

    }


    showequipmentids() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let equipmentids = [];
        if (this.state.active === 'equipment') {
            if (project) {
                const projectid = project.projectid;

                const equipments = construction.getscheduleequipment.call(this, projectid)

                if (equipments) {
                    // eslint-disable-next-line
                    equipments.map(equipment => {
                        equipmentids.push(this.showequipmentid(equipment))
                    })
                }

            }


        }
        return equipmentids;

    }


    getequipmentrate() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let equipmentrate = "";
        if (project) {
            const projectid = project.projectid;
            if (this.state.activeequipmentid) {
                const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid);
                if (myequipment) {
                    equipmentrate = myequipment.equipmentrate;
                }
            } else {
                equipmentrate = this.state.equipmentrate;
            }

        }


        return equipmentrate;
    }




    getlaborrate() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let laborrate = "";
        if (project) {
            const projectid = project.projectid;
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid);
                if (mylabor) {
                    laborrate = mylabor.laborrate;
                }
            } else {
                laborrate = this.state.laborrate;
            }
        }
        return laborrate;
    }

    handleequipmentrate(equipmentrate) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        if (isNumeric(equipmentrate)) {
            if (myuser) {
                const activeparams = construction.getactiveproject.call(this)
                const project = construction.getprojectbyid.call(this, activeparams.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = construction.getprojectkeybyid.call(this, projectid)
                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getscheduleequipmentbyid.call(this, projectid, this.state.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getscheduleequipmentkeybyid.call(this, projectid, this.state.activeequipmentid)
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        this.setState({ equipmentrate })
                    }
                }
            }
        } else {
            this.setState({ equipmentrate })
            alert(`Equipment rate ${equipmentrate} must be numeric `)
        }
    }

    handlelaborrate(laborrate) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        if (isNumeric(laborrate)) {
            if (myuser) {
                const activeparams = construction.getactiveproject.call(this)
                const project = construction.getprojectbyid.call(this, activeparams.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = construction.getprojectkeybyid.call(this, projectid)
                    if (this.state.activelaborid) {
                        const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                        if (mylabor) {
                            const j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].laborrate = laborrate;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        this.setState({ laborrate })
                    }
                }
            }

        } else {
            alert(`Labor Rate ${laborrate} must be numeric`)
        }
    }

    getquantity() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let quantity = this.state.quantity;
        if (project) {
            const projectid = project.projectid;

            if (this.state.activematerialid) {
                const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid);
                quantity = mymaterial.quantity;

            }

        }
        return quantity;

    }
    getunit() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let unit = this.state.unit;
        if (project) {
            const projectid = project.projectid;

            if (this.state.activematerialid) {
                const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid);
                unit = mymaterial.unit;

            }

        }
        return unit;

    }
    getunitcost() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let unitcost = this.state.unitcost;
        if (project) {
            const projectid = project.projectid;

            if (this.state.activematerialid) {
                const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid);
                unitcost = mymaterial.unitcost;

            }

        }
        return unitcost;

    }
    handlequantity(quantity) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (isNumeric(quantity)) {
            if (myuser) {
                const activeparams = construction.getactiveproject.call(this)
                const project = construction.getprojectbyid.call(this, activeparams.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = construction.getprojectkeybyid.call(this, projectid);
                    if (this.state.activematerialid) {
                        const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
                        if (mymaterial) {
                            const j = construction.getschedulematerialskeybyid.call(this, projectid, this.state.activematerialid);
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].quantity = quantity;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ quantity })
                    }
                }
            }

        } else {
            this.setState({ quantity })
            alert(`Quantity ${quantity} must be numeric`)
        }

    }
    handleunit(unit) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            const activeparams = construction.getactiveproject.call(this)
            const project = construction.getprojectbyid.call(this, activeparams.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = construction.getprojectkeybyid.call(this, projectid);
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
                    if (mymaterial) {
                        const j = construction.getschedulematerialskeybyid.call(this, projectid, this.state.activematerialid);
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unit = unit;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })
                    }
                } else {
                    this.setState({ unit })
                }
            }
        }

    }
    handleunitcost(unitcost) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (isNumeric(unitcost)) {
            if (myuser) {
                const activeparams = construction.getactiveproject.call(this)
                const project = construction.getprojectbyid.call(this, activeparams.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = construction.getprojectkeybyid.call(this, projectid);
                    if (this.state.activematerialid) {
                        const mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
                        if (mymaterial) {
                            const j = construction.getschedulematerialskeybyid.call(this, projectid, this.state.activematerialid);
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unitcost = unitcost;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ unitcost })
                    }
                }
            }

        } else {
            this.setState({ unitcost })
            alert(`Unit cost ${unitcost} must be numeric`)
        }

    }




    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this);
        const buttonheight = construction.getbuttonheight.call(this)
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        const employeeid = new EmployeeID();
        const equipmentid = new EquipmentID();
        const materialid = new MaterialID();
        const milestoneid = new MilestoneID();
        const regularFont = construction.getRegularFont.call(this)
        const csi = new CSI();
        const materialdate = new MaterialDate();
        const timein = new TimeIn();
        const timeout = new TimeOut();
        const scheduleview = new ScheduleView();
       

        const showmaterialdate = () => {
            if (this.state.active === 'materials') {
                return (materialdate.showmaterialdate.call(this))
            }
        }
        const showemployeeid = () => {
            if (this.state.active === 'labor') {
                return (employeeid.showemployeeid.call(this))
            } else {
                return;
            }

        }

        const showtimein = () => {
            if (this.state.active === 'labor' || this.state.active === 'equipment') {
                return (timein.showtimein.call(this))
            }
        }

        const laborbackground = () => {
            if (this.state.active === 'labor') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }
        const equipmentbackground = () => {
            if (this.state.active === 'equipment') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }

        const materialbackground = () => {
            if (this.state.active === 'materials') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }


        const showequipmentid = () => {
            if (this.state.active === 'equipment') {
                return (equipmentid.showequipmentid.call(this))
            } else {
                return;
            }

        }

        const showmaterialid = () => {
            if (this.state.active === 'materials') {
                return (materialid.showmaterialid.call(this))
            } else {
                return;
            }

        }

        const showtimeout = () => {
            if (this.state.active === 'labor' || this.state.active === 'equipment') {
                return (timeout.showtimeout.call(this))
            }
        }
        const equipmentrate = () => {
            if (this.state.active === 'equipment' && this.state.activeequipmentid) {
                return (
                    <View style={{ ...styles.generalContainer }}>
                        <View style={{ ...styles.generalContainer }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Equipment Rate</Text>
                        </View>
                        <View style={{ ...styles.generalContainer }}>
                            <TextInput style={{ ...styles.generalFont, ...regularFont, ...styles.defaultInput }}
                                value={this.getequipmentrate().toString()}
                                onChangeText={text => { this.handleequipmentrate(text) }}

                            />
                        </View>

                    </View>
                )
            }
        }
        const laborrate = () => {
            if (this.state.active === 'labor' && this.state.activelaborid) {
                return (
                    <View style={{ ...styles.generalContainer, ...styles.bottomMargin15f }}>
                        <View style={{ ...styles.generalContainer }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Labor Rate</Text>
                        </View>
                        <View style={{ ...styles.generalContainer }}>
                            <TextInput style={{ ...styles.generalFont, ...regularFont, ...styles.defaultInput }}
                                value={this.getlaborrate().toString()}
                                onChangeText={text => { this.handlelaborrate(text) }}

                            />
                        </View>

                    </View>
                )
            }
        }

        const showmaterialquantity = () => {
            if (this.state.active === 'materials') {
                return (
                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>


                            <View style={{ ...styles.generalContainer }}>
                                <Text style={{ ...styles.generalFont, ...regularFont }}>Quantity</Text>
                                <TextInput style={{ ...styles.generalFont, ...regularFont, ...styles.defaultInput }}
                                    value={this.getquantity().toString()}
                                    onChangeText={text => { this.handlequantity(text) }}
                                />
                            </View>

                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <View style={{ ...styles.generalContainer }}>
                                <Text style={{ ...styles.generalFont, ...regularFont }}>Unit</Text>
                            </View>
                            <View style={{ ...styles.generalContainer }}>
                                <TextInput style={{ ...styles.generalFont, ...regularFont, ...styles.defaultInput }}
                                    value={this.getunit().toString()}
                                    onChangeText={text => { this.handleunit(text) }}
                                />
                            </View>

                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <View style={{ ...styles.generalContainer }}>
                                <Text style={{ ...styles.generalFont, ...regularFont }}>Unit Cost</Text>
                            </View>
                            <View style={{ ...styles.generalContainer }}>
                                <TextInput style={{ ...styles.generalFont, ...regularFont, ...styles.defaultInput }}
                                    value={this.getunitcost().toString()}
                                    onChangeText={text => { this.handleunitcost(text) }}
                                />
                            </View>

                        </View>

                    </View>
                )

            }
        }

        if (project) {
            return (

                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1 }}>
                                <View style={{ ...styles.generalContainer }}><Text style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily, ...styles.alignCenter }}>Schedule </Text></View>
                                <View style={{ ...styles.generalContainer }}><Text style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily, ...styles.alignCenter }}>/{project.title} </Text></View>
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1, ...laborbackground(), ...styles.margin5, ...styles.showBorder, ...styles.addRadius }}>
                                <Text style={{ ...headerFont, ...styles.alignCenter, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...headerFont, ...styles.specialButton }} onPress={() => { this.setState({ active: 'labor' }) }}>Labor</Text>
                            </View>
                            <View style={{ ...styles.flex1, ...styles.alignCenter, ...equipmentbackground(), ...styles.margin5, ...styles.showBorder, ...styles.addRadius }}>
                                <Text style={{ ...headerFont, ...styles.alignCenter, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...headerFont, ...styles.specialButton }} onPress={() => { this.setState({ active: 'equipment' }) }}>Equipment</Text>
                            </View>
                            <View style={{ ...styles.flex1, ...styles.alignCenter, ...materialbackground(), ...styles.margin5, ...styles.showBorder, ...styles.addRadius }}>
                                <Text style={{ ...headerFont, ...styles.alignCenter, ...styles.boldFont, ...styles.addRadius, ...headerFont, ...styles.specialButton }} onPress={() => { this.setState({ active: 'materials' }) }}>Materials</Text>
                            </View>
                        </View>

                        {showemployeeid()}
                        {showequipmentid()}
                        {showmaterialid()}

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1 }}>
                                {milestoneid.showmilestoneid.call(this)}
                                {csi.showcsi.call(this)}
                            </View>
                        </View>

                        {showmaterialdate()}

                        {showtimein()}
                        {showtimeout()}

                        {laborrate()}
                        {equipmentrate()}
                        {showmaterialquantity()}


                        {this.showmaterialids()}
                        {this.showlaborids()}
                        {this.showequipmentids()}

                        {scheduleview.showschedule.call(this,"schedule")}

                        {construction.showsaveproject.call(this)}

                    </View>
                </View>)
        } else {
            return(<View><Text style={{...regularFont}}> Please Login to view schedule </Text></View>)
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
export default connect(mapStateToProps, actions)(Schedule);