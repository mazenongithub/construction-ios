import React from 'react'
import { Text, View, TextInput } from 'react-native'
import Construction from './construction'
import { MyStylesheet } from './styles'
import { CreateBidScheduleItem, DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, sorttimes, ProfitForLabor, ProfitForMaterial, ProfitForEquipment, isNumeric, UTCStringFormatDateforProposal, UTCTimefromCurrentDate, sortcode } from './functions'

class ViewProposal {
    getproposal() {
        const construction = new Construction();
        let myproposal = false;
        const activeproject = construction.getactiveproject.call(this)
        const proposalid = activeproject.proposalid;
        const projectid = activeproject.projectid;
        proposals = construction.getproposalsbyprojectid.call(this, projectid)
        proposals.map(proposal => {
            if (proposal.proposalid === proposalid) {
                myproposal = proposal;
            }
        })
        return myproposal;
    }
    getscheduleitems() {
        const viewproposal = new ViewProposal()
        let scheduleitems = false;
        let myproposal = viewproposal.getproposal.call(this);
        if (myproposal) {
            if (myproposal.hasOwnProperty("bidschedule")) {
                scheduleitems = myproposal.bidschedule.biditem
            }
        }
        return scheduleitems;
    }
    getscheduleitem(csiid) {
        const viewproposal = new ViewProposal()
        let scheduleitems = viewproposal.getscheduleitems.call(this);
        let scheduleitem = false;
        if (scheduleitems) {
            // eslint-disable-next-line
            scheduleitems.map(item => {
                if (item.csiid === csiid) {
                    scheduleitem = item;
                }
            })
        }
        return scheduleitem;
    }
    getitems() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const proposalid = activeproject.proposalid;
        let payitems = construction.getAllSchedule.call(this, projectid)

        let items = [];
        const validateNewItem = (items, item) => {
            let validate = true;
            // eslint-disable-next-line
            items.map(myitem => {
                if (myitem.csiid === item.csiid) {
                    validate = false;
                }
            })
            return validate;
        }
        // eslint-disable-next-line
        payitems.map(item => {

            if (item.hasOwnProperty("laborid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }

        })
        let csis = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {

                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", "0")
                    let csi = construction.getcsibyid.call(this, lineitem.csiid)
                    newItem.csi = csi.csi;
                    newItem.title = csi.title;
                    csis.push(newItem)
                }
            })
        }

        return (csis.sort((a, b) => {
            return (sortcode(a, b))
        }));


    }
    showbidtable() {
        const viewproposal = new ViewProposal();
        const biditems = viewproposal.getitems.call(this)
        let items = [];
        if (biditems.length > 0) {
            biditems.map(biditem => {
                items.push(viewproposal.showbiditem.call(this, biditem))
            })
        }
        return items;

    }
    getdirectcost(csiid) {
        const construction = new Construction()
        const project = construction.getactiveproject.call(this);
        const proposalid = project.proposalid;
        const projectid = project.projectid;
        const myproject = construction.getprojectbyid.call(this, projectid)
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    proposalitemsbycsiid(csiid) {
        const construction = new Construction();
        const project = construction.getactiveproject.call(this);
        const myproject = construction.getprojectbyid.call(this, project.projectid)
        const proposalid = project.proposalid;
        let items = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    items.push(myequipment)
                }
            })

        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        return items;
    }
    getprofit(csiid) {
        const viewproposal = new ViewProposal();
        let profit = 0;
        let directcost = 0;
        let items = viewproposal.proposalitemsbycsiid.call(this, csiid);
        // eslint-disable-next-line
        items.map(item => {
            if (item.hasOwnProperty("laborid")) {
                directcost += DirectCostForLabor(item);
                profit += ProfitForLabor(item);
            }
            if (item.hasOwnProperty("materialid")) {
                directcost += DirectCostForMaterial(item);
                profit += ProfitForMaterial(item);
            }
            if (item.hasOwnProperty("equipmentid")) {
                directcost += DirectCostForEquipment(item);
                profit += ProfitForEquipment(item);
            }

        })

        return ((profit / directcost) * 100)

    }
    getbidprice(csiid) {
        const viewproposal = new ViewProposal()
        let directcost = Number(viewproposal.getdirectcost.call(this, csiid));
        let profit = Number(viewproposal.getprofit.call(this, csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }
    getunit(csiid) {
        const viewproposal = new ViewProposal()
        let scheduleitem = viewproposal.getscheduleitem.call(this, csiid);
        if (scheduleitem) {

            return scheduleitem.unit;


        } else {
            return ""
        }
    }
    getquantity(csiid) {
        const viewproposal = new ViewProposal()
        let scheduleitem = viewproposal.getscheduleitem.call(this, csiid);
        let quantity = "";
        if (scheduleitem) {
            quantity = scheduleitem.quantity
        }
        return quantity;

    }
    getunitprice(csiid) {
        const viewproposal = new ViewProposal();
        let quantity = Number(viewproposal.getquantity.call(this, csiid));
        let bidprice = Number(viewproposal.getbidprice.call(this, csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return bidprice;;
        }


    }

    handlechangequantity(quantity, csiid, proposalid, projectid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);

        if (myuser) {

            if (isNumeric(quantity)) {
                const myproject = construction.getprojectbyid.call(this, projectid);
                if (myproject) {
                    const i = construction.getprojectkeybyid.call(this, projectid);
                    const proposal = construction.getproposalbyid.call(this, projectid, proposalid);
                    if (proposal) {
                        const j = construction.getproposalkeybyid.call(this, projectid, proposalid)
                        const lineitem = construction.getproposalitem.call(this, csiid, proposalid, projectid)

                        if (lineitem) {
                            let k = construction.getproposalitemkey.call(this, csiid, proposalid, projectid)
                            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem[k].quantity = quantity;


                        } else {
                            let unit = "";
                            let newItem = CreateBidScheduleItem(csiid, unit, quantity)
                            if (proposal.hasOwnProperty("bidschedule")) {
                                myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem.push(newItem);
                            } else {
                                myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule = { biditem: [newItem] }
                            }


                        }

                        myuser.company.projects.myproject[i].proposals.myproposal[j].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })



                    }// proposal



                } // project 


            } else {
                alert(`Quantity should be numeric`)
            }

        }

    }

    handlechangeunit(unit, csiid, proposalid, projectid) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);


        if (myuser) {
            const myproject = construction.getprojectbyid.call(this, projectid);
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, projectid);
                const proposal = construction.getproposalbyid.call(this, projectid, proposalid);
                if (proposal) {
                    let j = construction.getproposalkeybyid.call(this, projectid, proposalid)
                    const lineitem = construction.getproposalitem.call(this, csiid, proposalid, projectid)
                    if (lineitem) {
                        let k = construction.getproposalitemkey.call(this, csiid, proposalid, projectid)
                        myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem[k].unit=unit;


                    } else {
                        let quantity = "";
                        let newItem = CreateBidScheduleItem(csiid, unit, quantity)
                        if (proposal.hasOwnProperty("bidschedule")) {
                            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem.push(newItem);
                        } else {
                            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule = { biditem: [newItem] }
                        }


                    }
                    myuser.company.projects.myproject[i].proposals.myproposal[j].updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })

                }

            }
        }

    }

    handlechangeprofit(profit, csiid, proposalid, projectid) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            if (isNumeric(profit)) {


                let i = construction.getprojectkeybyid.call(this, projectid);
                let myproject = construction.getprojectbyid.call(this, projectid);
                if (myproject.hasOwnProperty("schedulelabor")) {
                    // eslint-disable-next-line
                    myproject.schedulelabor.mylabor.map((mylabor, j) => {
                        if (mylabor.proposalid === proposalid && (mylabor.csiid === csiid)) {

                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].profit = profit;
                            let k = construction.getproposalkeybyid.call(this, projectid, proposalid)
                            myuser.company.projects.myproject[i].proposals.myproposal[k].updated = UTCTimefromCurrentDate()
                        }

                    })

                }
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                        if (mymaterial.proposalid === proposalid && (mymaterial.csiid === csiid)) {
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].profit = profit;
                            let k = construction.getproposalkeybyid.call(this, projectid, proposalid)
                            myuser.company.projects.myproject[i].proposals.myproposal[k].updated = UTCTimefromCurrentDate()
                        }

                    })
                }
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    myproject.scheduleequipment.myequipment.map((myequipment, j) => {
                        if (myequipment.proposalid === proposalid && (myequipment.csiid === csiid)) {
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].profit = profit;
                            let k = construction.getproposalkeybyid.call(this, projectid, proposalid)
                            myuser.company.projects.myproject[i].proposals.myproposal[k].updated = UTCTimefromCurrentDate()
                        }

                    })
                }
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            }
        } else {
            alert(`Profit should be numeric`)
        }
    }
    showbiditem(item) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const csi = construction.getcsibyid.call(this, item.csiid);
        const viewproposal = new ViewProposal();
        const directcost = Number(viewproposal.getdirectcost.call(this, item.csiid)).toFixed(2);
        const profit = Number(viewproposal.getprofit.call(this, item.csiid)).toFixed(4);
        const bidprice = Number(viewproposal.getbidprice.call(this, item.csiid)).toFixed(2);
        const quantity = viewproposal.getquantity.call(this, item.csiid);
        const unit = viewproposal.getunit.call(this, item.csiid)
        const unitprice = Number(viewproposal.getunitprice.call(this, item.csiid)).toFixed(2);
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const proposalid = activeproject.proposalid;
        const regularFont = construction.getRegularFont.call(this)



        if (menu.open) {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont]} onPress={() => { this.handleproposallineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                            <TextInput style={[styles.defaultInput, regularFont, styles.alignCenter]}
                                keyboardType='numeric'
                                value={quantity.toString()}
                                onChangeText={text => { viewproposal.handlechangequantity.call(this, text, item.csiid, proposalid, projectid) }}
                            />
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>

                            <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                            <TextInput style={[styles.defaultInput, regularFont, styles.alignCenter]}
                                value={unit}
                                onChangeText={text => { viewproposal.handlechangeunit.call(this, text, item.csiid, proposalid, projectid) }}
                            />

                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                            <TextInput style={[styles.defaultInput, regularFont, styles.alignCenter]}
                                value={profit.toString()}
                                onChangeText={text => { viewproposal.handlechangeprofit.call(this, text, item.csiid, proposalid, projectid) }}
                            />
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Bid Price</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${bidprice}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Unit Price</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${unitprice}</Text>
                        </View>
                    </View>





                </View>
            </View>)

        } else {

            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex2, styles.showBorder]}>
                                <Text style={[regularFont]} onPress={() => { this.handleproposallineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                                <TextInput style={[styles.defaultInput, regularFont, styles.alignCenter]}
                                    keyboardType='numeric'
                                    value={quantity.toString()}
                                    onChangeText={text => { viewproposal.handlechangequantity.call(this, text, item.csiid, proposalid, projectid) }}
                                />

                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>

                                <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                                <TextInput style={[styles.defaultInput, regularFont]}
                                    value={unit}
                                    onChangeText={text => { viewproposal.handlechangeunit.call(this, text, item.csiid, proposalid, projectid) }}
                                />
                            </View>
                        </View>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                                <TextInput style={[styles.defaultInput, regularFont]}
                                    value={profit.toString()}
                                    onChangeText={text => { viewproposal.handlechangeprofit.call(this, text, item.csiid, proposalid, projectid) }}
                                />
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Bid Price</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${bidprice}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Unit Price</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${unitprice}</Text>
                            </View>
                        </View>



                    </View>
                </View>
            )

        }


    }
    showproposal() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const myproject = construction.getprojectbyid.call(this, projectid)
        const proposalid = activeproject.proposalid;
        const styles = MyStylesheet();
        const viewproposal = new ViewProposal();
        const myuser = construction.getuser.call(this);
        const headerFont = construction.getHeaderFont.call(this)
        const proposal = construction.getproposalbyid.call(this, projectid, proposalid)
        const getupdated = () => {
            if (proposal.updated) {
                return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[styles.regularFont]}> Proposal Last Updated on {UTCStringFormatDateforProposal(proposal.updated)}</Text>
                    </View>
                </View>)
            }
        }
        const getapproved = () => {
            if (proposal.approved) {

                return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[styles.regularFont]}> Proposal Approved on {UTCStringFormatDateforProposal(proposal.approved)}</Text>
                    </View>
                </View>)
            }
        }
        if (myuser) {
            const checkmanager = construction.checkmanager.call(this)
            if (checkmanager) {
                return (
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}</Text>
                                    <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/proposal/{proposalid}</Text>
                                </View>
                            </View>
                            {viewproposal.showbidtable.call(this)}

                            {getupdated()}

                            {getapproved()}

                            {construction.showsaveproject.call(this)}

                        </View>
                    </View>
                )
            } else {
                return (<Text style={[regularFont]}>Only Managers can view proposal</Text>)
            }
        } else {
            return (construction.loginMessage.call(this, "View Proposal"))
        }
    }
}
export default ViewProposal;