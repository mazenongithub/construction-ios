import React, { Component } from 'react'
import { Alert, TouchableOpacity, View, Text, Image } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Construction from './construction'
import TimeIn from './timein'
import TimeOut from './timeout'
import EquipmentID from './equipmentid'
import MilestoneID from './milestoneid'
import CSI from './csi';
import MakeID from './makeids';
import { inputUTCStringForLaborID, calculatetotalhours, inputDateObjOutputAdjString, CreateScheduleEquipment } from './functions'

class ScheduleEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, activeequipmentid: '', myequipmentid: '',
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            milestoneid: '', csiid: '', csi_1: '', csi_2: '', csi_3: '', proposalid: '',equipment:'',
            showtimein:false,showtimeout:false
        }


    }

    getmilestoneid() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
            
            if (myequipment) {
    
                return (myequipment.milestoneid)
    
            }
    
        } else {
            return (this.state.milestoneid);
        }
    
    
    }
    handlemilestoneid(milestoneid) {
    const construction = new Construction()
    let myuser = construction.getuser.call(this);
    const makeID = new MakeID();
    if (myuser) {
        const activeproject = construction.getactiveproject.call(this)
        let myproject = construction.getprojectbyid.call(this, activeproject.projectid);
        if (myproject) {
            let i = construction.getprojectkeybyid.call(this, myproject.projectid);
            let equipmentrate = 0;
            if (this.state.activeequipmentid) {
                const myequipment = construction.getscheduleequipmentbyid.call(this,myproject.projectid,this.state.activeequipmentid)
                if(myequipment) {
                let j = construction.getscheduleequipmentkeybyid.call(this,myproject.projectid,this.state.activeequipmentid)
                myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].milestoneid = milestoneid;
                this.props.reduxUser(myuser)
                if(myequipment.proposalid) {
                    construction.updateproposal.call(this,myequipment.proposalid)
                } else {
                    this.setState({ render: 'render' })
                }
                
                }
            } else {
                let equipmentid = makeID.scheduleequipmentid.call(this)
                let providerid = myuser.providerid;
                let timein = inputDateObjOutputAdjString(this.state.timein)
                let csiid = this.state.csiid
                let myequipmentid = this.state.equipment;
                let timeout = inputDateObjOutputAdjString(this.state.timeout)
                let proposalid = this.state.proposalid;
                let profit = 0;
                equipmentrate = +Number(construction.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)).toFixed(4);

                let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                } else {
                    let scheduleequipment = { myequipment: [newEquipment] }
                    myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;

                }
                this.props.reduxUser(myuser)
                this.setState({ activeequipmentid: newEquipment.equipmentid })
            }

        }

    }
    }

    getmyequipmentid() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
            
            if (myequipment) {

                return (myequipment.myequipmentid)

            }
    
        } else {
            return (this.state.myequipment);
        }

    
    }
    handlemyequipmentid(myequipmentid) {
        const construction = new Construction()
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        const equipment = construction.getmyequipmentbyid.call(this,myequipmentid);
        if (myuser) {
            const activeproject = construction.getactiveproject.call(this)
            let myproject = construction.getprojectbyid.call(this, activeproject.projectid);
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                let equipmentrate = 0;
                if (this.state.activeequipmentid) {
                    const myequipment = construction.getscheduleequipmentbyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    if(myequipment) {
                    let j = construction.getscheduleequipmentkeybyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    let myequipment = construction.getscheduleequipmentbyid.call(this,myproject.projectid,this.state.activeequipmentid);
                   
                    equipmentrate = construction.calculateequipmentratebyid.call(this, equipment.myequipmentid, myequipment.timein, myequipment.timeout);
                    
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].myequipmentid = myequipmentid;
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                    this.props.reduxUser(myuser)
                    if(myequipment.proposalid) {
                        construction.updateproposal.call(this,myequipment.proposalid)
                    } else {
                        this.setState({ equipment:equipment.equipment })
                    }
                   
                    }
                } else {
                    let equipmentid = makeID.scheduleequipmentid.call(this)
                    let providerid = myuser.providerid;
                    let csiid = this.state.csiid;
                    let milestoneid = this.state.milestoneid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let proposalid = this.state.proposalid;
                    let profit = 0;
                    equipmentrate = +Number(construction.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)).toFixed(4);
    
                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                    if (myproject.hasOwnProperty("scheduleequipment")) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        let scheduleequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;
    
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: newEquipment.equipmentid, equipment:equipment.equipment })
                }
    
            }
    
        }
    }
    handletimein(timein) {
        const construction = new Construction()
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            const activeproject = construction.getactiveproject.call(this)
            let myproject = construction.getprojectbyid.call(this, activeproject.projectid);
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                let equipmentrate = 0;
                if (this.state.activeequipmentid) {
                    const myequipment = construction.getscheduleequipmentbyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    if(myequipment) {
                    let j = construction.getscheduleequipmentkeybyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
                    this.props.reduxUser(myuser)
                    if(myequipment.proposalid) {
                        construction.updateproposal.call(this,myequipment.proposalid)
                    } else {
                        this.setState({ equipment:equipment.equipment })
                    }

                    }
                } else {
                    let equipmentid = makeID.scheduleequipmentid.call(this)
                    let providerid = myuser.providerid;
                    let csiid = this.state.csiid;
                    let milestoneid = this.state.milestoneid;
                    let myequipmentid = this.state.equipment;
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let proposalid = this.state.proposalid;
                    let profit = 0;
                    equipmentrate = +Number(construction.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)).toFixed(4);
    
                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                    if (myproject.hasOwnProperty("scheduleequipment")) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        let scheduleequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;
    
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: newEquipment.equipmentid })
                }
    
            }
    
        }
    }
    gettimein() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
    
            if (myequipment) {
                return (myequipment.timein)
            }
    
        } else {
            return (inputDateObjOutputAdjString(this.state.timein));
        }
    }
    
    gettimeout() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
    
            if (myequipment) {
                return (myequipment.timeout)
            }
    
        } else {
            return (inputDateObjOutputAdjString(this.state.timeout));
        }
    }

    handletimeout(timeout) {
        const construction = new Construction()
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            const activeproject = construction.getactiveproject.call(this)
            let myproject = construction.getprojectbyid.call(this, activeproject.projectid);
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                let equipmentrate = 0;
                if (this.state.activeequipmentid) {
                    const myequipment = construction.getscheduleequipmentbyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    if(myequipment) {
                    let j = construction.getscheduleequipmentkeybyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timeout = timeout;
                    this.props.reduxUser(myuser)
                    if(myequipment.proposalid) {
                        construction.updateproposal.call(this,myequipment.proposalid)
                    } else {
                        this.setState({ equipment:equipment.equipment })
                    }

                    }
                } else {
                    let equipmentid = makeID.scheduleequipmentid.call(this)
                    let providerid = myuser.providerid;
                    let csiid = this.state.csiid;
                    let milestoneid = this.state.milestoneid;
                    let myequipmentid = this.state.equipment;
                    let timein= inputDateObjOutputAdjString(this.state.timein)
                    let proposalid = this.state.proposalid;
                    let profit = 0;
                    equipmentrate = +Number(construction.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)).toFixed(4);
    
                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                    if (myproject.hasOwnProperty("scheduleequipment")) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        let scheduleequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;
    
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: newEquipment.equipmentid })
                }
    
            }
    
        }
    }

    getcsiid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        let csi = false;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
            if (myequipment) {
                csi = construction.getcsibyid.call(this, myequipment.csiid)
            }
    
        if (csi) {
            return (`${csi.csi}-${csi.title}`)
        } else {
            return ""
        }
    
    }
    }

    handlecsiid(csiid) {
        const construction = new Construction()
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        let csi = construction.getcsibyid.call(this, csiid);
            if (csi) {
                csi_1 = csi.csi.substr(0, 2)
                csi_2 = csi.csi.substr(2, 2)
                csi_3 = csi.csi.substr(4, 2)
            }

        if (myuser) {
            const activeproject = construction.getactiveproject.call(this)
            let myproject = construction.getprojectbyid.call(this, activeproject.projectid);
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                let equipmentrate = 0;
                if (this.state.activeequipmentid) {
                    let j = construction.getscheduleequipmentkeybyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    const myequipment = construction.getscheduleequipmentbyid.call(this,myproject.projectid,this.state.activeequipmentid)
                    if(myequipment) {
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].csiid = csiid;
                    this.props.reduxUser(myuser)
                    if(myequipment.proposalid) {
                        construction.updateproposal.call(this,myequipment.proposalid)
                    }
                    this.setState({ render: 'render',csi_1,csi_2,csi_3 })
                    }
                } else {
                    let equipmentid = makeID.scheduleequipmentid.call(this)
                    let providerid = myuser.providerid;
                    let timein = inputDateObjOutputAdjString(this.state.timein)
                    let milestoneid = this.state.milestoneid;
                    let myequipmentid = this.state.equipment;
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let proposalid = this.state.proposalid;
                    let profit = 0;
                    equipmentrate = +Number(construction.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)).toFixed(4);
    
                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                    if (myproject.hasOwnProperty("scheduleequipment")) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        let scheduleequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;
    
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: newEquipment.equipmentid,csi_1,csi_2,csi_3 })
                }
    
            }
    
        }
    }

    makeequipmentactive(equipmentid) {
        const construction = new Construction();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";
    
    
        if (this.state.activeequipmentid === equipmentid) {
    
            this.setState({ activeequipmentid: false, csi_1, csi_2, csi_3, csiid: '' })
        } else {
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid, equipmentid);
            const equipment = construction.getmyequipmentbyid.call(this,myequipment.myequipmentid)
            let csi = construction.getcsibyid.call(this, myequipment.csiid);
            if (csi) {
                csi_1 = csi.csi.substr(0, 2)
                csi_2 = csi.csi.substr(2, 2)
                csi_3 = csi.csi.substr(4, 2)
            }
            this.setState({ activeequipmentid: equipmentid, csi_1, csi_2, csi_3, equipment:equipment.equipment})
    
            
        }
    }


    gettotalhours() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        let totalhours = 0;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
            if (myequipment) {
                let timein = myequipment.timein;
                let timeout = myequipment.timeout;
                totalhours = calculatetotalhours(timeout, timein)
            }
    
    
        }
        return totalhours;
    }
    getequipmentrate() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        let equipmentrate = 0;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
            equipmentrate = Number(myequipment.equipmentrate);
        }
        return equipmentrate;
    }

    getamount() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        let amount = 0;
        if (this.state.activeequipmentid) {
            let myequipment = construction.getscheduleequipmentbyid.call(this,projectid,this.state.activeequipmentid)
            let totalhours = calculatetotalhours(myequipment.timeout, myequipment.timein);
            let rate = Number(myequipment.equipmentrate);
            amount = totalhours * rate;
        }
        return amount;
    }

    removeequipment(equipment)  {
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid)
        Alert.alert(
            'Delete Equipment',
            `Are you sure you want to remove ${myequipment.equipment}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove Equipment '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremoveequipment(equipment) } },
            ],
            { cancelable: false }
        )
    }
    
    confirmremoveequipment(equipment) {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
       
            const myuser = construction.getuser.call(this);
            if (myuser) {
                const i = construction.getprojectkeybyid.call(this,projectid);
                const j = construction.getscheduleequipmentbyid.call(this, projectid, equipment.equipmentid);
                myuser.company.projects.myproject[i].scheduleequipment.myequipment.splice(j, 1);
                this.props.reduxUser(myuser);
                this.setState({ activeequipmentid: false })
            }
        
    }

    showequipmentid(equipment) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const removeIconSize = construction.getremoveicon.call(this)
        const csi = construction.getcsibyid.call(this, equipment.csiid)
        const milestone = construction.getmilestonebyid.call(this, equipment.milestoneid)
        const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate))
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const activeBackground = () => {
            if(this.state.activeequipmentid === equipment.equipmentid) {
                return styles.activeBackground;
            } else {
                return;
            }
        } 

        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={equipment.equipmentid}>
                    <View style={[styles.flex1, styles.flexDirection]}>
                        <Text style={[regularFont, activeBackground()]} onPress={()=>{this.makeequipmentactive(equipment.equipmentid)}}> {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
                            CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone} 
                            Total Hours: {totalhours} x  {equipmentrate} = ${amount.toFixed(2)}</Text>
                        <TouchableOpacity onPress={()=>{this.removeequipment(equipment)}}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                        </TouchableOpacity>

                    </View>
                </View>)
        } else {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={equipment.equipmentid}>
                    <View style={[styles.flex4]}>
                        <Text style={[regularFont, activeBackground()]} onPress={()=>{this.makeequipmentactive(equipment.equipmentid)}}> {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
                            CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone} 
                            Total Hours: {totalhours} x  {equipmentrate} = ${amount.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={()=>{this.removeequipment(equipment)}}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>

                    </View>
                </View>)
        }
    }
    showequipmentids() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const myequipment = construction.getscheduleequipment.call(this, projectid);
        const equipmentids = [];
        if (myequipment) {
            myequipment.map(equipment => {
                equipmentids.push(this.showequipmentid(equipment))
            })
        }
        return equipmentids;

    }
    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const project = construction.getprojectbyid.call(this, projectid)
        const equipmentid = new EquipmentID();
        const timein = new TimeIn()
        const timeout = new TimeOut();
        const csi = new CSI();
        const milestoneid = new MilestoneID();
        const totalhours = this.gettotalhours().toFixed(2)
        const rate = `$${this.getequipmentrate().toFixed(2)}`
        const amount = `$${this.getamount().toFixed(2)}`
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const Equipment = () => {
            return (<View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>
    
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{project.title}/schedulematerials</Text>
                        </View>
                    </View>
                    {equipmentid.showequipmentid.call(this)}
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            {timein.showdate.call(this)}
                        </View>
                    </View>
    
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            {timeout.showdate.call(this)}
                        </View>
                    </View>
                    {csi.showcsi.call(this)}
                    {milestoneid.showmilestoneid.call(this)}
    
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont, styles.alignCenter]}>Total Hours</Text>
                            <Text style={[regularFont, styles.alignCenter]}>{totalhours}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont, styles.alignCenter]}>Rate </Text>
                            <Text style={[regularFont, styles.alignCenter]}>{rate} </Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont, styles.alignCenter]}>Amount </Text>
                            <Text style={[regularFont, styles.alignCenter]}>{amount} </Text>
                        </View>
                    </View>
                    {construction.showsaveproject.call(this)}
                    {this.showequipmentids()}
                </View>
            </View>)
        }
        if(myuser) {
            return(Equipment())
        } else {
            return(construction.loginMessage("Schedule Equipment"))
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
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(ScheduleEquipment)