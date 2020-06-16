import React, { Component } from 'react'
import { Alert, TouchableOpacity, View, Text, TextInput, Image } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import Construction from './construction'
import MaterialDate from './materialdate'
import MaterialID from './materialid'
import MilestoneID from './milestoneid'
import CSI from './csi';
import { CreateScheduleMaterial, DateStringfromObj, milestoneformatdatestring, isNumeric } from './functions';
import MakeID from './makeids'

class ScheduleMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', message:'', activematerialid: '', material: '', timein: new Date(), unit: '', quantity: '', unitcost: '', milestoneid: '', csiid: '', mymaterialid: '', csi_1: '', csi_2: '', csi_3: '', showdate:false }
    }


    handlemilestoneid(milestoneid) {
        const makeID = new MakeID();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            let project = construction.getactiveproject.call(this)
            const myproject = construction.getprojectbyid.call(this, project.projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this,myproject.projectid,this.state.activematerialid)
                    if(mymaterial) {
                    let j = construction.getschedulematerialskeybyid.call(this, myproject.projectid, this.state.activematerialid)
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].milestoneid = milestoneid
                    this.props.reduxUser(myuser);
                    if(mymaterial.proposalid) {
                        construction.updateproposal.call(this,mymaterial.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                    }
                } else {
                    let materialid = makeID.schedulematerialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let timein = DateStringfromObj(this.state.timein)
                    let unit = this.state.unit;
                    let mymaterialid = this.state.mymaterialid;
                    let unitcost = this.state.unitcost;
                    let quantity = this.state.quanity;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }
    handlemymaterialid(mymaterialid) {
      
        const makeID = new MakeID();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        const mymaterial = construction.getmymaterialbyid.call(this,mymaterialid)
    

        if (myuser) {
            let project = construction.getactiveproject.call(this)
            const myproject = construction.getprojectbyid.call(this, project.projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this,myproject.projectid,this.state.activematerialid)
                    if(mymaterial) {
                    let j = construction.getschedulematerialskeybyid.call(this, myproject.projectid, this.state.activematerialid)
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].mymaterialid = mymaterialid
                    this.props.reduxUser(myuser);
                    if(mymaterial.proposalid) {
                        construction.updateproposal.call(this,mymaterial.proposalid)
                    } else {
                        this.setState({ material:mymaterial.material })
                    }
                    

                    }
                } else {
                    let materialid = makeID.schedulematerialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let timein = DateStringfromObj(this.state.timein)
                    let unit = this.state.unit;
                    let milestoneid = this.state.milestoneid;
                    let unitcost = this.state.unitcost;
                    let quantity = this.state.quanity;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid, material:mymaterial.material })
                   
                  

                }
            }
        }
    }

    showmaterialids() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        let myproject = construction.getprojectbyid.call(this, projectid)
        let materials = [];
        if (myproject) {
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    materials.push(this.showmaterialid(mymaterial))
                })
            }
        }
        return materials;

    }

    getquantity() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        if (this.state.activematerialid) {
            let mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)

            return mymaterial.quantity;
        } else {
            return this.state.quantity;
        }
    }

    getamount() {
        const quantity = Number(this.getquantity());
        const unitcost = Number(this.getunitcost());
        let amount = 0;
        if(quantity > 0 && unitcost >0) {
            amount = quantity * unitcost;
        }
        if(amount > 0) {
            amount = `$${amount.toFixed(2).toString()}`;
        }
        return amount;
        
    }

    handlequantity(quantity) {
       
        if(isNumeric(quantity)) {
    
        const makeID = new MakeID();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            let project = construction.getactiveproject.call(this)
            const myproject = construction.getprojectbyid.call(this, project.projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    let j = construction.getschedulematerialskeybyid.call(this, myproject.projectid, this.state.activematerialid)
                    const mymaterial = construction.getschedulematerialsbyid.call(this,myproject.projectid,this.state.activematerialid)
                    if(mymaterial) {
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].quantity = quantity
                    this.props.reduxUser(myuser);
                    if(mymaterial.proposalid) {
                        construction.updateproposal.call(this,mymaterial.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                    }

                } else {
                    let materialid = makeID.schedulematerialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = DateStringfromObj(this.state.timein);
                    let milestoneid = this.state.milestoneid;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }

    } else {
        alert(`Quantity should be numeric `)
    }
    }
    
    

    getmymaterialid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        if (this.state.activematerialid) {
            let mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
            const mymaterialid = mymaterial.mymaterialid;
            return (mymaterialid)
        } else {
            return this.state.mymaterialid;
        }
    }

    getmilestoneid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        if (this.state.activematerialid) {
            let mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
    
            return mymaterial.milestoneid;
        } else {
            return this.state.milestoneid;
        }
    }

    getunitcost() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        if (this.state.activematerialid) {
            let mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)

            return mymaterial.unitcost;
        } else {
            return this.state.unitcost;
        }
    }

    handleunitcost(unitcost) {
        if(isNumeric(unitcost)) {
        const makeID = new MakeID();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            let project = construction.getactiveproject.call(this)
            const myproject = construction.getprojectbyid.call(this, project.projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this,myproject.projectid,this.state.activematerialid)
                    if(mymaterial) {
                    let j = construction.getschedulematerialskeybyid.call(this, myproject.projectid, this.state.activematerialid)
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unitcost = unitcost
                    this.props.reduxUser(myuser);
                    if(mymaterial.proposalid) {
                        construction.updateproposal.call(this,mymaterial.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                    }
                } else {
                    let materialid = makeID.schedulematerialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = DateStringfromObj(this.state.timein);
                    let milestoneid = this.state.milestoneid;
                    let unit = this.state.unit;
                    let quantity = this.state.quanity;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    } else {
        alert(`Unit Cost must be numeric `)
    }
    }

    getunit() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        if (this.state.activematerialid) {
            let mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)

            return mymaterial.unit;
        } else {
            return this.state.unit;
        }
    }

    handleunit(unit) {

        const makeID = new MakeID();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            let project = construction.getactiveproject.call(this)
            const myproject = construction.getprojectbyid.call(this, project.projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this,myproject.projectid,this.state.activematerialid)
                    if(mymaterial) {
                    let j = construction.getschedulematerialskeybyid.call(this, myproject.projectid, this.state.activematerialid)
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unit = unit
                    this.props.reduxUser(myuser);
                    if(mymaterial.proposalid) {
                        construction.updateproposal.call(this,mymaterial.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                }
                } else {
                    let materialid = makeID.schedulematerialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = DateStringfromObj(this.state.timein);
                    let milestoneid = this.state.milestoneid;
                    let unitcost = this.state.unitcost;
                    let quantity = this.state.quanity;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }

    gettimein() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        if (this.state.activematerialid) {
            let mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)

            return mymaterial.timein;
        } else {
            return DateStringfromObj(this.state.timein);
        }
    }

    handletimein(timein) {

        const makeID = new MakeID();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            let project = construction.getactiveproject.call(this)
            const myproject = construction.getprojectbyid.call(this, project.projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this,myproject.projectid,this.state.activematerialid)
                    if(mymaterial) {
                    let j = construction.getschedulematerialskeybyid.call(this, myproject.projectid, this.state.activematerialid)
                    
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].timein = timein
                    this.props.reduxUser(myuser);
                    if(mymaterial.proposalid) {
                        construction.updateproposal.call(this,mymaterial.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                   

                    }
                } else {
                    let materialid = makeID.schedulematerialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let unit = this.state.unit;
                    let milestoneid = this.state.milestoneid;
                    let unitcost = this.state.unitcost;
                    let quantity = this.state.quanity;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }


    getcsiid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        if (this.state.activematerialid) {
            let mymaterial = construction.getschedulematerialsbyid.call(this, projectid, this.state.activematerialid)
            const csi = construction.getcsibyid.call(this, mymaterial.csiid)
            if(csi) {
            return (`${csi.csi}-${csi.title}`)
            }
        } else {
            return this.state.csiid;
        }
    }

    handlecsiid(csiid) {

        const makeID = new MakeID();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        const csi = construction.getcsibyid.call(this, csiid)
        let csi_1 = csi.csi.substr(0, 2)
        let csi_2 = csi.csi.substr(2, 2)
        let csi_3 = csi.csi.substr(4, 2)
        this.setState({ csi_1, csi_2, csi_3 })
        if (myuser) {
            let project = construction.getactiveproject.call(this)
            const myproject = construction.getprojectbyid.call(this, project.projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = construction.getschedulematerialsbyid.call(this,myproject.projectid,this.state.activematerialid)
                    if(mymaterial) {
                    let j = construction.getschedulematerialskeybyid.call(this, myproject.projectid, this.state.activematerialid)
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].csiid = csiid
                    this.props.reduxUser(myuser);
                    if(mymaterial.proposalid) {
                        construction.updateproposal.call(this,mymaterial.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }

                    }
                } else {
                    let materialid = makeID.schedulematerialid.call(this)
                    let providerid = this.state.employeeid;
                    let unitcost = this.state.unitcost;
                    let mymaterialid = this.state.mymaterialid;
                    let timein = DateStringfromObj(this.state.timein)
                    let milestoneid = this.state.milestoneid;
                    let unit = this.state.unit;
                    let quantity = this.state.quanity;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }
   

    makematerialactive(materialid) {

        const construction = new Construction();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false, csi_1, csi_2, csi_3, csiid: '',material:'' })
        } else {
            const myproject = construction.getactiveproject.call(this)
            let mymaterial = construction.getschedulematerialsbyid.call(this, myproject.projectid, materialid);
            let csi = construction.getcsibyid.call(this, mymaterial.csiid);
            const material = construction.getmymaterialbyid.call(this,mymaterial.mymaterialid)
            if (csi) {
                csi_1 = csi.csi.substr(0, 2)
                csi_2 = csi.csi.substr(2, 2)
                csi_3 = csi.csi.substr(4, 2)
            }

            this.setState({ activematerialid: materialid, csi_1, csi_2, csi_3, material:material.material })
         
        }
    }

    removematerial(material) {
        const construction = new Construction();
        const mymaterial = construction.getmymaterialbyid.call(this, material.mymaterialid)
        Alert.alert(
            'Delete Material',
            `Are you sure you want to remove ${mymaterial.material}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove accout '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremovematerial(material) } },
            ],
            { cancelable: false }
        )
    }
    
    confirmremovematerial(material) {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)  
        const projectid = activeproject.projectid;
            const myuser = construction.getuser.call(this);
            if (myuser) {
                const i = construction.getprojectkeybyid.call(this,projectid)
                const j = construction.getschedulematerialskeybyid.call(this, projectid, material.materialid)
                myuser.company.projects.myproject[i].schedulematerials.mymaterial.splice(j, 1)
                if (myuser.company.projects.myproject[i].schedulematerials.mymaterial.length === 0) {
                    delete myuser.company.projects.myproject[i].schedulematerials.mymaterial;
                    delete myuser.company.projects.myproject[i].schedulematerials;
                }
                this.props.reduxUser(myuser)
                this.setState({ activematerialid: false })
            }
        
    }

    showmaterialid(mymaterial) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const removeIconSize = construction.getremoveicon.call(this)
        const csi = construction.getcsibyid.call(this, mymaterial.csiid)
        const milestone = construction.getmilestonebyid.call(this, mymaterial.milestoneid)
        const material = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid)
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        const activeBackground = () => {
            if(this.state.activematerialid === mymaterial.materialid) {
                return (styles.activeBackground)
            } else {
                return;
            }
        }

        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={mymaterial.materialid}>
                    <View style={[styles.flex1, styles.flexDirection]}>
                        <Text style={[regularFont, activeBackground()]} onPress={() => { this.makematerialactive(mymaterial.materialid) }}> {milestoneformatdatestring(mymaterial.timein)} {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone}
                            {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)} </Text>
                        <TouchableOpacity onPress={()=>{this.removematerial(mymaterial)}}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                        </TouchableOpacity>

                    </View>
                </View>)
        } else {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={mymaterial.materialid}>
                <View style={[styles.flex4]}>
                    <Text style={[regularFont, activeBackground()]} onPress={() => { this.makematerialactive(mymaterial.materialid) }}>{milestoneformatdatestring(mymaterial.timein)} {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone}
                        {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)} </Text>
                </View>
                <View style={[styles.flex1]}>
                <TouchableOpacity onPress={()=>{this.removematerial(mymaterial)}}>
                    <Image source={require('./png/removeIcon.png')}
                        style={removeIconSize}
                        resizeMethod='scale'
                    />
                </TouchableOpacity>

                </View>
            </View>)
        }

    }


    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const project = construction.getprojectbyid.call(this, projectid)
        const materialdate = new MaterialDate();
        const materialid = new MaterialID();
        const milestoneid = new MilestoneID();
        const csi = new CSI();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const Material = () => {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
    
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{project.title}/schedulematerials</Text>
                            </View>
                        </View>
                        {materialid.showmaterialid.call(this)}
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                {materialdate.showdate.call(this)}
                            </View>
                        </View>
                        
                        {csi.showcsi.call(this)}
                        {milestoneid.showmilestoneid.call(this)}
    
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont]}>Quantity </Text>
                                <TextInput style={[regularFont, styles.defaultInput]}
                                    value={this.getquantity()}
                                    onChangeText={text => { this.handlequantity(text) }}
                                />
                            </View>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont]}>Unit </Text>
                                <TextInput style={[regularFont, styles.defaultInput]}
                                    value={this.getunit()}
                                    onChangeText={text => { this.handleunit(text) }}
                                />
                            </View>
                        </View>
    
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont]}>Unit Price </Text>
                                <TextInput style={[regularFont, styles.defaultInput]}
                                    value={this.getunitcost()}
                                    onChangeText={text => { this.handleunitcost(text) }}
                                />
                            </View>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont,styles.alignCenter]}>Amount </Text>
                                <Text style={[regularFont,styles.alignCenter]}>{this.getamount()} </Text>
    
                            </View>
                        </View>
                        {construction.showsaveproject.call(this)}
                        {this.showmaterialids()}
    
    
    
                    </View>
                </View>)
        }
        if(myuser) {
            return (Material())
        } else {
            return(construction.loginMessage.call(this,"Schedule Materials"))
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

export default connect(mapStateToProps, actions)(ScheduleMaterials)