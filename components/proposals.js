import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import Construction from './construction'
import { MyStylesheet } from './styles'
import { calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime,inputDateObjOutputAdjString, CreateProposal, isNumeric } from './functions'
import MakeID from './makeids';

class Proposals {
  
    handlelaborprofit(profit, laborid) {
        if(isNumeric(profit)) {
        let construction = new Construction();
        const myuser = construction.getuser.call(this)
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let myproject = construction.getprojectbyid.call(this,projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this,projectid);
                const mylabor = construction.getschedulelaborbyid.call(this,projectid,laborid);
                if(mylabor) {
                let j = construction.getschedulelaborkeybyid.call(this, projectid, laborid);
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].profit = profit;
                this.props.reduxUser(myuser);
                if(mylabor.proposalid) {
                    construction.updateproposal.call(this,mylabor.proposalid)
                } else {
                    this.setState({ render: 'render' })

                }
                

                }
            }
        }

    } else {
        alert(`Profit should be numeric `)
    }
    }
    
    handleequipmentprofit(profit, equipmentid) {
        if(isNumeric(profit)) {
        let construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const myuser = construction.getuser.call(this)
        if (myuser) {
            let myproject = construction.getprojectbyid.call(this,projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this,projectid);
                const myequipment = construction.getscheduleequipmentbyid.call(this,projectid,equipmentid)
                if(myequipment) {
                let j = construction.getscheduleequipmentkeybyid.call(this, projectid, equipmentid);
                myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].profit = profit;
                this.props.reduxUser(myuser);
                if(myequipment.proposalid) {
                    construction.updateproposal.call(this,myequipment.proposalid)
                } else {
                    this.setState({ render: 'render' })
                }
      

                }
            }
        }
    } else {
        alert(`Equipment profit should be numeric`)
    }
    }
    
    handlematerialprofit(profit, materialid) {
        if(isNumeric(profit)) {
        let construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const myuser = construction.getuser.call(this)
        if (myuser) {
            let myproject = construction.getprojectbyid.call(this,projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this,projectid);
                const mymaterial = construction.getschedulematerialsbyid.call(this,projectid,materialid)
                if(mymaterial) {
                let j = construction.getschedulematerialskeybyid.call(this, projectid, materialid);
                myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].profit = profit;
                this.props.reduxUser(myuser);
                if(mymaterial.proposalid) {
                    construction.updateproposal.call(this,mymaterial.proposalid)
                } else {
                    this.setState({ render: 'render' })
                }
               

                }
            }
        }
    } else {
        alert(`Material profit should be numeric`)
    }
    }
    
    handlematerialunit(unit, materialid) {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const myuser = construction.getuser.call(this);
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this,projectid);
            const mymaterial = construction.getschedulematerialsbyid.call(this,projectid,materialid)
            if(mymaterial) {
            let j = construction.getschedulematerialskeybyid.call(this, projectid, materialid)
            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unit = unit;
            this.props.reduxUser(myuser)
            if(mymaterial.proposalid) {
                construction.updateproposal.call(this,mymaterial.proposalid)

            } else {
                this.setState({ render: 'render' })
            }
            

            }
        }
    }
    handlematerialunitcost(unitcost, materialid) {
        if(isNumeric(unitcost)) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this,projectid);
            const mymaterial = construction.getschedulematerialsbyid.call(this,projectid,materialid)
            if(mymaterial) {
            let j = construction.getschedulematerialskeybyid.call(this, projectid, materialid)
            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unitcost = unitcost;
            this.props.reduxUser(myuser)
            if(mymaterial.proposalid) {
                construction.updateproposal.call(this,mymaterial.proposalid)

            } else {
                this.setState({ render: 'render' })
            }

            }
        }
    } else {
        alert(`Unit Cost must be numeric`)
    }
    }
    handlematerialquantity(quantity, materialid) {
        if(isNumeric(quantity)) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this,projectid);
            const mymaterial = construction.getschedulematerialsbyid.call(this,projectid,materialid)
            if(mymaterial) {
            let j = construction.getschedulematerialskeybyid.call(this, projectid, materialid)
            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].quantity = quantity;
            this.props.reduxUser(myuser)
            if(mymaterial.proposalid) {
                construction.updateproposal.call(this,mymaterial.proposalid)

            } else {
                this.setState({ render: 'render' })
            }

            }
        }
    } else {
        alert(`Material quantity should be numeric`)
    }
    }
    handlelaborrate(laborrate, laborid) {
        if(isNumeric(laborrate)) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this,projectid);
            const mylabor = construction.getschedulelaborbyid.call(this,projectid,laborid);
                if(mylabor) {
            let j = construction.getschedulelaborkeybyid.call(this, projectid, laborid)
            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].laborrate = laborrate;
            this.props.reduxUser(myuser);
            if(mylabor.proposalid) {
                construction.updateproposal.call(this,mylabor.proposalid)
            } else {
                this.setState({ render: 'render' })

            }


                }
        }
    } else {
        alert(`Labor rate should be numeric`)
    }
    }
    handleequipmentrate(equipmentrate, equipmentid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if(isNumeric(equipmentrate)) {
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this,projectid);
            const myequipment = construction.getscheduleequipmentbyid.call(this,projectid,equipmentid)
            if(myequipment) {
            let j = construction.getscheduleequipmentkeybyid.call(this, projectid, equipmentid);
            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
            this.props.reduxUser(myuser);
            if(myequipment.proposalid) {
                construction.updateproposal.call(this,myequipment.proposalid)
            } else {
                this.setState({ render: 'render' })
            }

            }
        }
    } else {
        alert(`Equipment rate should be numeric`)
    }
    }
    activebackground(proposalid) {
        if (proposalid === this.state.activeproposalid) {
            return ({ backgroundColor: '#93CCE5' })
        }
    }
    addItem(item) {

        const checkproposalitem = (item) => {
            let result = 'add';
            if (item.proposalid === this.state.activeproposalid) {
                result = 'remove'
            }
            return result;
        }
        
        
            let construction = new Construction();
            const myuser = construction.getuser.call(this)
            const activeproject = construction.getactiveproject.call(this)
        
            if (myuser) {
                if (this.state.activeproposalid) {
        
                    
                    let proposalid = this.state.activeproposalid;
                    let i = construction.getprojectkeybyid.call(this,activeproject.projectid)
        
                    let result = checkproposalitem(item);
                    let j = false;
                    if (result === 'add') {
        
                        if (item.hasOwnProperty("laborid")) {
                            j = construction.getschedulelaborkeybyid.call(this,activeproject.projectid, item.laborid)
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].proposalid = proposalid;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("materialid")) {
                            j = construction.getschedulematerialskeybyid.call(this, activeproject.projectid, item.materialid)
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].proposalid = proposalid;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("equipmentid")) {
                            j = construction.getscheduleequipmentkeybyid.call(this, activeproject.projectid, item.equipmentid);
        
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].proposalid = proposalid;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        }
        
                    } else if (result === 'remove') {
        
                        if (item.hasOwnProperty("laborid")) {
                            j = construction.getschedulelaborkeybyid.call(this,activeproject.projectid, item.laborid)
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].proposalid = ""
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("materialid")) {
                            j = construction.getschedulematerialskeybyid.call(this, activeproject.projectid, item.materialid)
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].proposalid = ""
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("equipmentid")) {
                            j = construction.getscheduleequipmentkeybyid.call(this,activeproject.projectid, item.equipmentid);
        
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].proposalid = ""
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        }
        
        
                    }
        
                }
            }
        
        }

    showlaboritem(item) {

        const styles = MyStylesheet();
        const construction = new Construction();
        const amount = (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
        const employee = construction.getemployeebyproviderid.call(this, item.providerid);
        const csi = construction.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const menu = construction.getnavigation.call(this)
        const proposals = new Proposals();
        const regularFont = construction.getRegularFont.call(this)
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const laborrate = item.laborrate.toString();
        const profit = getprofit();
        
        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10, proposals.activebackground.call(this,item.proposalid)]} key={item.laborid}>
                    <View style={[styles.flex2, styles.flexDirection]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}> {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $</Text>
                        <TextInput value={laborrate} onChangeText={text=>{proposals.handlelaborrate.call(this,text,item.laborid)}} style={[regularFont, styles.defaultInput, styles.smallField]} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>= ${amount.toFixed(2)}  x {profit} = ${Number(amount * profit).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>Profit</Text>
                        <TextInput style={[regularFont, styles.defaultInput]} onChangeText={text=>{proposals.handlelaborprofit.call(this,text,item.laborid)}} value={item.profit} />
                    </View>

                </View>
            )
        } else {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10,proposals.activebackground.call(this,item.proposalid)]} key={item.laborid}>
                    <View style={[styles.flex3, styles.flexDirection]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>{employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $</Text>
                        <TextInput value={laborrate} onChangeText={text=>{proposals.handlelaborrate.call(this,text,item.laborid)}} style={[regularFont, styles.defaultInput, styles.smallField]} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>= ${amount.toFixed(2)}  x {profit} = ${Number(amount * profit).toFixed(2)} </Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>Profit</Text>
                        <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text=>{proposals.handlelaborprofit.call(this,text,item.laborid)}} />
                    </View>

                </View>
            )

        }


    }
    showequipmentitem(item) {
      
        let construction = new Construction()
        const proposals = new Proposals();
        const styles = MyStylesheet();
        const menu = construction.getnavigation.call(this)
        const myequipment = construction.getmyequipmentbyid.call(this, item.myequipmentid);
        const csi = construction.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const equipmentrate = item.equipmentrate.toString();
        const amount = Number(totalhours * Number(item.equipmentrate))
        const profit = Number(item.profit) / 100;
        const regularFont = construction.getRegularFont.call(this)
        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10,proposals.activebackground.call(this,item.proposalid)]} key={item.equipmentid}>
                    <View style={[styles.flex2, styles.flexDirection]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>{myequipment.equipment} CSI: {csi.csi} - {csi.title} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                            Total Hours:{totalhours.toFixed(2)} x $</Text>
                        <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={equipmentrate} onChangeText={text=>{proposals.handleequipmentrate.call(this,text,item.equipmentid)}}/>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>= {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>Profit</Text>
                        <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text=>{proposals.handleequipmentprofit.call(this,text,item.equipmentid)}} />
                    </View>

                </View>
            )
        } else {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10,proposals.activebackground.call(this,item.proposalid)]} key={item.equipmentid}>
                    <View style={[styles.flex3]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>{myequipment.equipment} CSI: {csi.csi} - {csi.title} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                            Total Hours:{totalhours.toFixed(2)} x $</Text>
                        <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={equipmentrate} onChangeText={text=>{proposals.handleequipmentrate.call(this,text,item.equipmentid)}} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>= {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>Profit</Text>
                        <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text=>{proposals.handleequipmentprofit.call(this,text,item.equipmentid)}} />
                    </View>

                </View>
            )

        }
    }

    showmaterialitem(item) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const proposals = new Proposals();
        const menu = construction.getnavigation.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();
        const csi = construction.getcsibyid.call(this, item.csiid)
        const material = construction.getmymaterialbyid.call(this, item.mymaterialid)
        const amount = Number(item.quantity * item.unitcost);
    
        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10,proposals.activebackground.call(this,item.proposalid)]} key={item.materialid}>
                    <View style={[styles.flex2, styles.flexDirection]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>{inputUTCStringForMaterialIDWithTime(item.timein)}  {material.material} CSI: {csi.csi} - {csi.title} </Text>
                        <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={item.quantity} onChangeText={text=>{proposals.handlematerialquantity.call(this,text,item.materialid)}} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>x $</Text>
                        <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unitcost} onChangeText={text=>{proposals.handlematerialunitcost.call(this,text,item.materialid)}} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>=  / </Text>
                        <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unit} onChangeText={text=>{proposals.handlematerialunit.call(this,text,item.materialid)}} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>= ${amount.toFixed(2)} x {profit} = ${Number(amount * profit).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>Profit</Text>
                        <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text=>{proposals.handlematerialprofit.call(this,text,item.materialid)}} />
                    </View>
    
                </View>
            )
        } else {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10,proposals.activebackground.call(this,item.proposalid)]} key={item.materialid}>
                    <View style={[styles.flex3,styles.flexDirection]}>
                    <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>{inputUTCStringForMaterialIDWithTime(item.timein)}  {material.material} CSI: {csi.csi} - {csi.title} </Text>
                        <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={item.quantity} onChangeText={text=>{proposals.handlematerialquantity.call(this,text,item.materialid)}} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>x $</Text>
                        <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unitcost} onChangeText={text=>{proposals.handlematerialunitcost.call(this,text,item.materialid)}} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>=  / </Text>
                        <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unit} onChangeText={text=>{proposals.handlematerialunitcost.call(this,text,item.materialid)}} />
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>= ${amount.toFixed(2)} x {profit} = ${Number(amount * profit).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]} onPress={()=>{proposals.addItem.call(this,item)}}>Profit</Text>
                        <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text=>{proposals.handlematerialprofit.call(this,text,item.materialid)}}/>
                    </View>
    
                </View>
            )
            }
    }
    
    showallpayitems() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const proposals = new Proposals();
        let items = [];
        let payitems = construction.getAllSchedule.call(this, projectid)
        if (payitems.length > 0) {
            // eslint-disable-next-line
            payitems.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    items.push(proposals.showlaboritem.call(this, item))
                }
                 if (item.hasOwnProperty("materialid")) {
                    items.push(proposals.showmaterialitem.call(this, item))

                 }
                if (item.hasOwnProperty("equipmentid")) {
                    items.push(proposals.showequipmentitem.call(this, item))

                }


            })
        }
        return items;

    }
    showproposalid(proposal) {
        const construction = new Construction()
        const menu = construction.getnavigation.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const styles = MyStylesheet();
        const proposals = new Proposals()
        const proposalcheck = () => {
            
            if (menu.open) {
                return ({ width: 58, height: 30 })
            } else {
                return ({ width: 85, height: 44 })
            }
        }
        const handleproposalcheck = () => {
            if(this.state.activeproposalid === proposal.proposalid) {
                return(<Image source={require('./png/proposalcheck.png')}
                resizeMethod='scale'
                style={proposalcheck()}
            />)
            } else {
                return;
            }
        }
        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={proposal.proposalid}>
                    <View style={[styles.flex3, styles.alignContentCenter]}>
                        {handleproposalcheck()}
                    </View>
                    <View style={[styles.flex4]}>
                        <Text style={[headerFont, styles.alignCenter]} onPress={()=>{proposals.makeproposalactive.call(this,proposal.proposalid)}}>ProposalID {proposal.proposalid} </Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={proposal.proposalid}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                    {handleproposalcheck()}
                    </View>
                    <View style={[styles.flex2]}>
                        <Text style={[headerFont]} onPress={()=>{proposals.makeproposalactive.call(this,proposal.proposalid)}}>ProposalID {proposal.proposalid} </Text>
                    </View>
                </View>
            )

        }

    }
    getproposalids() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const myproposals = construction.getproposalsbyprojectid.call(this, projectid)
        const proposals = new Proposals();
        let proposalids = [];
        if (myproposals) {
            myproposals.map(proposal => {
                proposalids.push(proposals.showproposalid.call(this, proposal))

            })

        }
        return proposalids;
    }
    
    handleproposallink() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        if(this.state.activeproposalid) {
            return(<Text style={[headerFont,styles.alignCenter,styles.bottomMargin10]} onPress={()=>{this.handleviewproposal(this.state.activeproposalid)}}>View Proposal {this.state.activeproposalid} </Text>)
        }
    }
    makeproposalactive(proposalid) {
        if (this.state.activeproposalid === proposalid) {
            this.setState({ activeproposalid: false })
        } else {
            this.setState({ activeproposalid: proposalid })
        }
    }
    createnewproposal() {
        const construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            let proposalid = makeID.proposalid.call(this);
            let providerid = myuser.providerid;
            let updated = inputDateObjOutputAdjString(this.state.updated);
            let approved = this.state.approved;
            let newproposal = CreateProposal(proposalid, providerid, updated, approved);
            let activeproject = construction.getactiveproject.call(this);
            const myproject =construction.getprojectbyid.call(this,activeproject.projectid)
            let i = construction.getprojectkeybyid.call(this, activeproject.projectid);
            if (myproject.hasOwnProperty("proposals")) {
                myuser.company.projects.myproject[i].proposals.myproposal.push(newproposal)
    
            } else {
                myuser.company.projects.myproject[i].proposals = { myproposal: [newproposal] }
    
            }
            this.props.reduxUser(myuser);
            this.setState({ activeproposalid: proposalid })
        }
    
    }
    showproposals() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const project = construction.getprojectbyid.call(this, projectid)
        const styles = MyStylesheet();
        const menu = construction.getnavigation.call(this)
        const proposals = new Proposals();
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const proposalIcon = () => {
            if (menu.open) {
                return ({ width: 169, height: 36 })
            } else {
                return ({ width: 262, height: 56 })
            }
        }

        const LEM = () => {
            if (menu.open) {
                return (
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>

                            <View style={[styles.generalFlex]}>
                                <View style={[styles.flex1, styles.showBorder]}>
                                    <Text style={[regularFont, styles.alignCenter, styles.minHeight30]}>Labor</Text>
                                </View>
                            </View>

                            <View style={[styles.generalFlex]}>
                                <View style={[styles.flex1, styles.showBorder]}>
                                    <Text style={[regularFont, styles.alignCenter, styles.minHeight30]}>Equipment</Text>
                                </View>
                            </View>

                            <View style={[styles.generalFlex]}>
                                <View style={[styles.flex1, styles.showBorder]}>
                                    <Text style={[regularFont, styles.alignCenter, styles.minHeight30]}>Materials</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                )
            } else {
                return (


                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter, styles.minHeight30]}>Labor</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter, styles.minHeight30]}> Equipment </Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter, styles.minHeight30]}>Materials</Text>
                        </View>
                    </View>

                )
            }
        }

        if(myuser){

        return (<View style={[styles.generalFlex]}>
            <View style={[styles.flex1]}>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{project.title}/proposals</Text>
                    </View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={()=>{proposals.createnewproposal.call(this)}}>
                            <Image source={require('./png/createproposal.png')}
                                resizeMethod='scale'
                                style={proposalIcon()}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {proposals.getproposalids.call(this)}
                {LEM()}
                {proposals.showallpayitems.call(this)}
                {proposals.handleproposallink.call(this)}
                {construction.showsaveproject.call(this)}
            </View>
        </View>)

        } else {
            return(construction.loginMessage("Proposals"))
        }
    }

}
export default Proposals