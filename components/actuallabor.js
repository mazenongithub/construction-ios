import React, { Component } from 'react'
import { Alert, TouchableOpacity, View, Text, TextInput, Image } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Construction from './construction'
import EmployeeID from './employeeid'
import TimeIn from './timein'
import TimeOut from './timeout'
import MilestoneID from './milestoneid';
import CSI from './csi'
import { calculatetotalhours, inputUTCStringForLaborID, inputDateObjOutputAdjString, CreateActualLabor } from './functions'
import MakeID from './makeids'

class ActualLabor extends Component {
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
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {
                        let j = construction.getactuallaborkeybyid.call(this, projectid, this.state.activelaborid)
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].providerid = providerid;
                        this.props.reduxUser(myuser)
                        if(mylabor.invoiceid) {
                            construction.updateinvoice.call(this,mylabor.invoiceid)
                        } else {
                            this.setState({render:'render'})
                        }
                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let description = this.state.description;
                    let milestoneid = this.state.milestoneid;
                    let csiid = this.state.csiid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let proposalid = "";
                    let laborrate = construction.gethourlyrate.call(this, providerid)
                    let profit = 0;
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)
                    const myproject = construction.getprojectbyid.call(this, projectid)
                    if (myproject) {
                        if (myproject.hasOwnProperty("actuallabor")) {
                            myuser.company.projects.myproject[i].actuallabor.mylabor.push(newlabor)
                        } else {
                            let actuallabor = { mylabor: [newlabor] }
                            myuser.company.projects.myproject[i].actuallabor = actuallabor;
                        }
                        this.props.reduxUser(myuser)
                        this.setState({ activelaborid: newlabor.laborid, employee })
                    }
                }

            }
        }

        getmilestoneid() {
            const construction = new Construction();
            const activeproject = construction.getactiveproject.call(this);
            const projectid = activeproject.projectid;
            if (this.state.activelaborid) {
                let mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)

                if (mylabor) {
                    return (mylabor.milestoneid)
                }

            } else {
                return (this.state.milestoneid);
            }
        }

        getemployeeid() {
            const construction = new Construction();
            const activeproject = construction.getactiveproject.call(this);
            const projectid = activeproject.projectid;
            if (this.state.activelaborid) {
                let mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)

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
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {
                    let j = construction.getactuallaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].actuallabor.mylabor[j].milestoneid = milestoneid;
                    this.props.reduxUser(myuser)
                    if(mylabor.invoiceid) {
                        construction.updateinvoice.call(this,mylabor.invoiceid)
                    } else {
                        this.setState({render:'render'})
                    }

                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let description = this.state.description
                    let csiid = this.state.csiid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let proposalid = "";
                    let laborrate = construction.gethourlyrate.call(this, providerid)
                    let profit = 0;
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                    const myproject = construction.getprojectbyid.call(this, projectid)
                    if (myproject) {
                        if (myproject.hasOwnProperty("actuallabor")) {
                            myuser.company.projects.myproject[i].actuallabor.mylabor.push(newlabor)
                        } else {
                            let actuallabor = { mylabor: [newlabor] }
                            myuser.company.projects.myproject[i].actuallabor = actuallabor;
                        }
                        this.props.reduxUser(myuser)
                        this.setState({ activelaborid: newlabor.laborid })
                    }
                }

            }
        }

        getdescription() {
            const construction = new Construction();
            const activeproject = construction.getactiveproject.call(this);
            const projectid = activeproject.projectid;
            if (this.state.activelaborid) {
                let mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)

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
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {

                    let j = construction.getactuallaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].actuallabor.mylabor[j].description = description;
                    this.props.reduxUser(myuser)
                    if(mylabor.invoiceid) {
                        construction.updateinvoice.call(this,mylabor.invoiceid)
                    } else {
                        this.setState({render:'render'})
                    }

                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let csiid = this.state.csiid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let proposalid = "";
                    let laborrate = construction.gethourlyrate.call(this, providerid)
                    let profit = 0;
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                    const myproject = construction.getprojectbyid.call(this, projectid)
                    if (myproject) {
                        if (myproject.hasOwnProperty("actuallabor")) {
                            myuser.company.projects.myproject[i].actuallabor.mylabor.push(newlabor)
                        } else {
                            let actuallabor = { mylabor: [newlabor] }
                            myuser.company.projects.myproject[i].actuallabor = actuallabor;
                        }
                        this.props.reduxUser(myuser)
                        this.setState({ activelaborid: newlabor.laborid })
                    }
                }

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
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {
                    let j = construction.getactuallaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].actuallabor.mylabor[j].timein = timein;
                    this.props.reduxUser(myuser)
                    if(mylabor.invoiceid) {
                        construction.updateinvoice.call(this,mylabor.invoiceid)
                    } else {
                        this.setState({render:'render'})
                    }

                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let csiid = this.state.csiid;
                    let description = this.state.description
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let proposalid = "";
                    let laborrate = construction.gethourlyrate.call(this, providerid)
                    let profit = 0;
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                    const myproject = construction.getprojectbyid.call(this, projectid)
                    if (myproject) {
                        if (myproject.hasOwnProperty("actuallabor")) {
                            myuser.company.projects.myproject[i].actuallabor.mylabor.push(newlabor)
                        } else {
                            let actuallabor = { mylabor: [newlabor] }
                            myuser.company.projects.myproject[i].actuallabor = actuallabor;
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
                let mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)

                if (mylabor) {
                    return (mylabor.timein)
                }

            } else {
                return (inputDateObjOutputAdjString(this.state.timein));
            }
        }

        gettimeout() {
            const construction = new Construction();
            const activeproject = construction.getactiveproject.call(this);
            const projectid = activeproject.projectid;
            if (this.state.activelaborid) {
                let mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)

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
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {
                    let j = construction.getactuallaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].actuallabor.mylabor[j].timeout = timeout;
                    this.props.reduxUser(myuser)
                    if(mylabor.invoiceid) {
                        construction.updateinvoice.call(this,mylabor.invoiceid)
                    } else {
                        this.setState({render:'render'})
                    }
                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let csiid = this.state.csiid;
                    let description = this.state.description
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let proposalid = "";
                    let laborrate = construction.gethourlyrate.call(this, providerid)
                    let profit = 0;
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                    const myproject = construction.getprojectbyid.call(this, projectid)
                    if (myproject) {
                        if (myproject.hasOwnProperty("actuallabor")) {
                            myuser.company.projects.myproject[i].actuallabor.mylabor.push(newlabor)
                        } else {
                            let actuallabor = { mylabor: [newlabor] }
                            myuser.company.projects.myproject[i].actuallabor = actuallabor;
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
                let mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)
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
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, this.state.activelaborid)
                    if (mylabor) {
                    let j = construction.getactuallaborkeybyid.call(this, projectid, this.state.activelaborid)
                    myuser.company.projects.myproject[i].actuallabor.mylabor[j].csiid = csiid;
                    this.props.reduxUser(myuser)
                    if(mylabor.invoiceid) {
                        construction.updateinvoice.call(this,mylabor.invoiceid)
                    } else {
                        this.setState({render:'render'})
                    }

                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let description = this.state.description;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let proposalid = "";
                    let laborrate = construction.gethourlyrate.call(this, providerid)
                    let profit = 0;
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)

                    const myproject = construction.getprojectbyid.call(this, projectid)
                    if (myproject) {
                        if (myproject.hasOwnProperty("actuallabor")) {
                            myuser.company.projects.myproject[i].actuallabor.mylabor.push(newlabor)
                        } else {
                            let actuallabor = { mylabor: [newlabor] }
                            myuser.company.projects.myproject[i].actuallabor = actuallabor;
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
                let mylabor = construction.getactuallaborbyid.call(this, projectid, laborid);
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
            const j = construction.getactuallaborbyid.call(this, projectid, mylabor.laborid);
            const myuser = construction.getuser.call(this);
            if (myuser) {
                myuser.company.projects.myproject[i].actuallabor.mylabor.splice(j, 1);
                if (myuser.company.projects.myproject[i].actuallabor.mylabor.length === 0) {
                    delete myuser.company.projects.myproject[i].actuallabor.mylabor
                    delete myuser.company.projects.myproject[i].actuallabor;
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
                        <Text style={[regularFont, activeBackground()]} onPress={() => { this.makelaboractive(mylabor.laborid) }}> {employee.firstname} {employee.lastname} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone}  From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)} {mylabor.description}</Text>
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
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {
                    laborids.push(this.showlaborid(mylabor))
                })
            }
            return laborids;
        }

        checkinvoice() {
            let check = true;
            const construction = new Construction();
            if (this.state.activelaborid) {
                const mylabor = construction.findactuallaborbyid.call(this, this.state.activelaborid)
                if (mylabor.invoiceid) {
                    check = construction.checkinvoicelaborid.call(this, this.state.activelaborid)
                }
            }
            return check;
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
            const checkinvoice = this.checkinvoice();
            const showtimein = () => {
                if (checkinvoice || !this.state.activelaborid) {
                    return (timein.showdate.call(this))

                } else {
                    const mylabor = construction.findactuallaborbyid.call(this, this.state.activelaborid)
                    const gettimein = inputUTCStringForLaborID(mylabor.timein);
                    return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Time In</Text>
                            <Text style={[regularFont]}>
                                {gettimein}
                            </Text>
                        </View>
                    </View>)
                }

            }

            const showtimeout = () => {

                if (checkinvoice || !this.state.activelaborid) {

                    return (timeout.showdate.call(this))

                } else {
                    const mylabor = construction.findactuallaborbyid.call(this, this.state.activelaborid)
                    const timeout = inputUTCStringForLaborID(mylabor.timeout);
                    return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Time Out</Text>
                            <Text style={[regularFont]}>
                                {timeout}
                            </Text>
                        </View>
                    </View>)
                }

            }
            const showemployeeid = () => {
                if (checkinvoice || !this.state.activelaborid) {
                    return (employeeid.showemployeeid.call(this))
                } else {
                    const mylabor = construction.findactuallaborbyid.call(this, this.state.activelaborid)
                    const providerid = mylabor.providerid;
                    const employee = construction.getemployeebyproviderid.call(this, providerid)
                    return (<Text style={[regularFont]}>{employee.firstname} {employee.lastname}</Text>)
                }
            }

            const showmilestone = () => {
                if (checkinvoice || !this.state.activelaborid) {
                    return (milestoneid.showmilestoneid.call(this))
                } else {
                    const mylabor = construction.findactuallaborbyid.call(this, this.state.activelaborid)
                    const milestoneid = mylabor.milestoneid;
                    const milestone = construction.getmilestonebyid.call(this, milestoneid)
                    return (<View style={styles.generalFlex, styles.bottomMargin10}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Milestone</Text>
                            <Text style={[regularFont]}>{milestone.milestone}</Text>
                        </View>
                    </View>)
                }
            }

            const showdescription = () => {
                if (checkinvoice || !this.state.activelaborid) {
                    return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Description</Text>
                            <TextInput style={[regularFont, styles.defaultInput]}
                                value={this.getdescription()}
                                onChangeText={text => { this.handledescription(text) }}
                            />
                        </View>
                    </View>)
                } else {
                    return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Description</Text>
                            <Text style={[regularFont]}>
                                {this.getdescription()}
                            </Text>
                        </View>
                    </View>)
                }
            }

            const showcsi = () => {
                if (checkinvoice || !this.state.activelaborid) {
                    return (csi.showcsi.call(this))
                } else {
                    const mylabor = construction.findactuallaborbyid.call(this, this.state.activelaborid)
                    const csiid = mylabor.csiid;
                    const csi = construction.getcsibyid.call(this, csiid)
                    return (<View style={styles.generalFlex, styles.bottomMargin10}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>CSI</Text>
                            <Text style={[regularFont]}>{csi.csi}-{csi.title}</Text>
                        </View>
                    </View>)
                }
            }

            const Labor = () => {
                return (
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[styles.headerFont, styles.boldFont, styles.alignCenter]}>/{project.title}/actuallabor</Text>
                                </View>
                            </View>

                            {showemployeeid()}

                            {showtimein()}
                            {showtimeout()}
                            {showcsi()}
                            {showmilestone()}
                            {showdescription()}

                            {construction.showsaveproject.call(this)}

                            {this.showlaborids()}

                        </View>
                    </View>
                )
            }
            if (myuser) {
                return (Labor())
            } else {
                return (construction.loginMessage.call(this, "Actual Labor"))
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

export default connect(mapStateToProps, actions)(ActualLabor)