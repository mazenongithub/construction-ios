import React, { Component } from 'react'
import { Alert, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Construction from './construction'
import EmployeeID from './employeeid'
import TimeIn from './timein'
import TimeOut from './timeout'
import MilestoneID from './milestoneid';
import CSI from './csi'
import { calculatetotalhours, inputUTCStringForLaborID, inputDateObjOutputAdjString, CreateScheduleLabor } from './functions'
import MakeID from './makeids'


class ScheduleLabor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, employeeid: '', activelaborid: '', csiid: '', milestoneid: '', description: '',
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            activetimeincalendar: true, activetimeoutcalendar: true,
            csi_1: '', csi_2: '', csi_3: '', message: '', employee: '',
            showtimein: false, showtimeout: false
        }
    }

    handleemployeeid(providerid) {
        let construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const myemployee = construction.getemployeebyproviderid.call(this, providerid)
        const employee = `${myemployee.firstname} ${myemployee.lastname}`
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this, projectid);
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {
                    let j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].providerid = providerid;
                    this.props.reduxUser(myuser)
                    if (mylabor.proposalid) {
                        construction.updateproposal.call(this, mylabor.proposalid)

                    } else {
                        this.setState({ employee })
                    }

                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let description = this.state.description;
                let milestoneid = this.state.milestoneid;
                let csiid = this.state.csiid;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = construction.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)
                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newlabor)
                    } else {
                        let schedulelabor = { mylabor: [newlabor] }
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: newlabor.laborid, employee })
                }
            }

        }
    }

    getemployeeid() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activelaborid) {
            let mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)

            if (mylabor) {
                return (mylabor.providerid)
            }

        } else {
            return (this.state.employeeid);
        }
    }

    handlemilestoneid(milestoneid) {
        let construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this, projectid);
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {
                    let j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].milestoneid = milestoneid;
                    this.props.reduxUser(myuser)
                    if (mylabor.proposalid) {
                        construction.updateproposal.call(this, mylabor.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }

                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let description = this.state.description
                let csiid = this.state.csiid;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = construction.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newlabor)
                    } else {
                        let schedulelabor = { mylabor: [newlabor] }
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: newlabor.laborid })
                }
            }

        }
    }

    getmilestoneid() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activelaborid) {
            let mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)

            if (mylabor) {
                return (mylabor.milestoneid)
            }

        } else {
            return (this.state.milestoneid);
        }
    }

    getdescription() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activelaborid) {
            let mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)

            if (mylabor) {
                return (mylabor.description)
            }

        } else {
            return (this.state.description);
        }
    }

    handledescription(description) {

        let construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this, projectid);
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {
                    let j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].description = description;
                    this.props.reduxUser(myuser)
                    if (mylabor.proposalid) {
                        construction.updateproposal.call(this, mylabor.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }


                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let csiid = this.state.csiid;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = construction.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newlabor)
                    } else {
                        let schedulelabor = { mylabor: [newlabor] }
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: newlabor.laborid })
                }
            }

        }
    }

    gettimein() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activelaborid) {
            let mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)

            if (mylabor) {
                return (mylabor.timein)
            }

        } else {
            return (inputDateObjOutputAdjString(this.state.timein));
        }
    }

    handletimein(timein) {

        let construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this, projectid);
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {
                    let j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timein = timein;
                    this.props.reduxUser(myuser)
                    if (mylabor.proposalid) {
                        construction.updateproposal.call(this, mylabor.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }


                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let csiid = this.state.csiid;
                let description = this.state.description
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = construction.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newlabor)
                    } else {
                        let schedulelabor = { mylabor: [newlabor] }
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: newlabor.laborid })
                }
            }

        }
    }

    gettimeout() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        if (this.state.activelaborid) {
            let mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)

            if (mylabor) {
                return (mylabor.timeout)
            }

        } else {
            return (inputDateObjOutputAdjString(this.state.timeout));
        }
    }

    handletimeout(timeout) {

        let construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this, projectid);
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {
                    let j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                    this.props.reduxUser(myuser)
                    if (mylabor.proposalid) {
                        construction.updateproposal.call(this, mylabor.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }

                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let csiid = this.state.csiid;
                let description = this.state.description
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let proposalid = "";
                let laborrate = construction.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newlabor)
                    } else {
                        let schedulelabor = { mylabor: [newlabor] }
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: newlabor.laborid })
                }
            }

        }
    }

    getcsiid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        let csi = false;
        if (this.state.activelaborid) {
            let mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
            if (mylabor) {
                csi = construction.getcsibyid.call(this, mylabor.csiid)
            }



            if (csi) {
                return (`${csi.csi}-${csi.title}`)
            } else {
                return ""
            }

        }
    }

    handlecsiid(csiid) {

        let construction = new Construction();
        const makeID = new MakeID();
        const csi = construction.getcsibyid.call(this, csiid)
        let csi_1 = csi.csi.substr(0, 2)
        let csi_2 = csi.csi.substr(2, 2)
        let csi_3 = csi.csi.substr(4, 2)
        this.setState({ csi_1, csi_2, csi_3 })
        let myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this, projectid);
            if (this.state.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, projectid, this.state.activelaborid)
                if (mylabor) {
                    let j = construction.getschedulelaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].csiid = csiid;
                    this.props.reduxUser(myuser)
                    if (mylabor.proposalid) {
                        construction.updateproposal.call(this, mylabor.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }

                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let description = this.state.description;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = construction.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newlabor)
                    } else {
                        let schedulelabor = { mylabor: [newlabor] }
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: newlabor.laborid })
                }
            }

        }
    }


    makelaboractive(laborid) {
        const construction = new Construction();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";
        if (this.state.activelaborid === laborid) {

            this.setState({ activelaborid: false, csi_1, csi_2, csi_3, employee: '' })
        } else {
            const myproject = construction.getactiveproject.call(this);
            const projectid = myproject.projectid;
            let mylabor = construction.getschedulelaborbyid.call(this, projectid, laborid);
            let myemployee = construction.getemployeebyproviderid.call(this, mylabor.providerid)
            const employee = `${myemployee.firstname} ${myemployee.lastname}`
            if (mylabor) {
                let csi = construction.getcsibyid.call(this, mylabor.csiid)
                if (csi) {
                    csi_1 = csi.csi.substr(0, 2)
                    csi_2 = csi.csi.substr(2, 2)
                    csi_3 = csi.csi.substr(4, 2)
                }
            }
            this.setState({ activelaborid: laborid, csi_1, csi_2, csi_3, employee })

        }

    }

    confirmremovelabor(mylabor) {

        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const i = construction.getprojectkeybyid.call(this, projectid)
        const j = construction.getschedulelaborbyid.call(this, projectid, mylabor.laborid);
        const myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.company.projects.myproject[i].schedulelabor.mylabor.splice(j, 1);
            if (myuser.company.projects.myproject[i].schedulelabor.mylabor.length === 0) {
                delete myuser.company.projects.myproject[i].schedulelabor.mylabor
                delete myuser.company.projects.myproject[i].schedulelabor;
            }
            this.props.reduxUser(myuser)
            this.setState({ activelaborid: false })
        }

    }

    removelabor(mylabor) {
        Alert.alert(
            'Delete Labor',
            `Are you sure you want to remove ${mylabor.description}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove accout '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremovelabor(mylabor) } },
            ],
            { cancelable: false }
        )
    }
    showlaborid(mylabor) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const removeIconSize = construction.getremoveicon.call(this)
        let employee = construction.getemployeebyproviderid.call(this, mylabor.providerid)
        let hourlyrate = construction.gethourlyrate.call(this, employee.providerid)
        const csi = construction.getcsibyid.call(this, mylabor.csiid)
        const milestone = construction.getmilestonebyid.call(this, mylabor.milestoneid)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)

        const activeBackground = () => {
            if (this.state.activelaborid === mylabor.laborid) {
                return (styles.activeBackground)
            } else {
                return;
            }
        }

        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={mylabor.laborid}>
                    <View style={[styles.flex1, styles.flexDirection]}>
                        <Text style={[regularFont, activeBackground()]} onPress={() => { this.makelaboractive(mylabor.laborid) }}> {employee.firstname} {employee.lastname} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                        ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)} {mylabor.description}</Text>
                        <TouchableOpacity onPress={() => { this.removelabor(mylabor) }}>
                            <Image source={require('./png/removeIcon.png')}
                                style={removeIconSize}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>

                    </View>
                </View>)
        } else {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={mylabor.laborid}>
                <View style={[styles.flex4]}>
                    <Text style={[regularFont, activeBackground()]} onPress={() => { this.makelaboractive(mylabor.laborid) }}>  {employee.firstname} {employee.lastname} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}</Text>
                </View>
                <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { this.removelabor(mylabor) }}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>

                </View>
            </View>)
        }
    }
    showlaborids() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const myproject = construction.getprojectbyid.call(this, projectid)
        let laborids = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                laborids.push(this.showlaborid(mylabor))
            })
        }
        return laborids;
    }
    render() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const projectid = construction.getactiveprojectid.call(this)
        const project = construction.getprojectbyid.call(this, projectid)
        const employeeid = new EmployeeID();
        const timein = new TimeIn();
        const timeout = new TimeOut();
        const csi = new CSI();
        const milestoneid = new MilestoneID();
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const Labor = () => {
            return (<View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{project.title}/schedulelabor</Text>
                        </View>
                    </View>

                    {employeeid.showemployeeid.call(this)}

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
                            <Text style={[regularFont]}>Description</Text>
                            <TextInput style={[regularFont, styles.defaultInput]}
                                value={this.getdescription()}
                                onChangeText={text => { this.handledescription(text) }} />
                        </View>
                    </View>

                    {construction.showsaveproject.call(this)}

                    {this.showlaborids()}

                </View>
            </View>)
        }
        if (myuser) {
            return (Labor())
        } else {
            return (construction.loginMessage("Schedule Labor"))
        }

    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(ScheduleLabor)