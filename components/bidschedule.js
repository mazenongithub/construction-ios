import React from 'react'
import { Text, View, TextInput } from 'react-native'
import Construction from './construction'
import { MyStylesheet } from './styles'
import { CreateBidScheduleItem, DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, sorttimes, ProfitForLabor, ProfitForMaterial, ProfitForEquipment } from './functions'

class BidSchedule {

    handlequantity(csiid, quantity) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if(myuser) {
            const project = construction.getprojectbyid.call(this,projectid);
            if (project) {
    
                const i = construction.getprojectkeybyid.call(this, project.projectid);
                const scheduleitems = construction.getbidschedule.call(this,projectid)
                if(scheduleitems) {
    
                const scheduleitem = construction.getbidschedulebyid.call(this, project.projectid, csiid)
                if (scheduleitem) {
                    const j = construction.getbidschedulekeybyid.call(this, project.projectid,csiid)
                    myuser.company.projects.myproject[i].bidschedule[j].quantity = quantity;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                   
                } else {
                    let newItem = {csiid, quantity, unit:'', providerid:myuser.providerid}
                    myuser.company.projects.myproject[i].bidschedule.push(newItem)
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }
    
            } else {
                let newItem = {csiid, quantity, unit:'', providerid:myuser.providerid}
                myuser.company.projects.myproject[i].bidschedule = [newItem]
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
    
           
    
    
            }
        }
    
    }
    
    
    handleunit(csiid, unit) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if(myuser) {
            const project = construction.getprojectbyid.call(this,projectid);
            if (project) {
                const i = construction.getprojectkeybyid.call(this, project.projectid);
                const scheduleitems = construction.getbidschedule.call(this,project.projectid)
                if(scheduleitems) {
                   
                const scheduleitem = construction.getbidschedulebyid.call(this, project.projectid,csiid)
              
                if (scheduleitem) {
                    
                    const j = construction.getbidschedulekeybyid.call(this, project.projectid, csiid)
                    myuser.company.projects.myproject[i].bidschedule[j].unit = unit;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                   
                } else {
                    let newItem = {csiid, quantity:'', unit, providerid:myuser.providerid}
                    myuser.company.projects.myproject[i].bidschedule.push(newItem)
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }
    
            } else {
                let newItem = {csiid, quantity:'', unit, providerid:myuser.providerid}
                myuser.company.projects.myproject[i].bidschedule = [newItem]
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
    
           
    
    
            }
        }
    
    }
    
   
     
        getunit(csiid) {
            const construction = new Construction();
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;
            let unit = ""
            const item = construction.getbidschedulebyid.call(this, projectid,csiid);
            if (item) {
                unit = item.unit
            }
            return unit 
    
            }
    

    getitems() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
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

                items.push(item)


            }
            if (item.hasOwnProperty("materialid")) {

                items.push(item)


            }
            if (item.hasOwnProperty("equipmentid")) {

                items.push(item)


            }

        })
        let csis = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {

                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", 0)
                    csis.push(newItem)
                }
            })
        }

        return csis;
    }
    showbidtable() {
        const bidschedule = new BidSchedule();
        const biditems = bidschedule.getitems.call(this)
        let items = [];
        if (biditems.length > 0) {
            biditems.map(biditem => {
                items.push(bidschedule.showbiditem.call(this, biditem))
            })
        }
        return items;

    }
    getdirectcost(csiid) {
        const construction = new Construction()
        const project = construction.getactiveproject.call(this);
        const projectid = project.projectid;
        const myproject = construction.getprojectbyid.call(this, projectid)
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    itemsbycsiid(csiid) {
        const construction = new Construction();
        const project = construction.getactiveproject.call(this);
        const myproject = construction.getprojectbyid.call(this, project.projectid)
        let items = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid) {
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
        const bidschedule = new BidSchedule();
        let profit = 0;
        let directcost = 0;
        let items = bidschedule.itemsbycsiid.call(this, csiid);
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
        const bidschedule = new BidSchedule()
        let directcost = Number(bidschedule.getdirectcost.call(this, csiid));
        let profit = Number(bidschedule.getprofit.call(this, csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }

    getquantity(csiid) {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        let quantity = ""
        const item = construction.getbidschedulebyid.call(this, projectid,csiid);
        if (item) {
            quantity = item.quantity
        }
        return quantity 

        }
    getunitprice(csiid) {
        const bidschedule = new BidSchedule();
        let quantity = Number(bidschedule.getquantity.call(this, csiid));
        let bidprice = Number(bidschedule.getbidprice.call(this, csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return bidprice;;
        }


    }
    showbiditem(item) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const csi = construction.getcsibyid.call(this, item.csiid);
        const bidschedule = new BidSchedule();
        const directcost = Number(bidschedule.getdirectcost.call(this, item.csiid)).toFixed(2);
        const profit = +Number(bidschedule.getprofit.call(this, item.csiid)).toFixed(4);
        const bidprice = Number(bidschedule.getbidprice.call(this, item.csiid)).toFixed(2);
        const unitprice = +Number(bidschedule.getunitprice.call(this, item.csiid)).toFixed(2);
        const regularFont = construction.getRegularFont.call(this);
        const activeparams = construction.getactiveproject.call(this)
        const projectid = activeparams.projectid;
        const project = construction.getprojectbyid.call(this,projectid)
        const unit = bidschedule.getunit.call(this, item.csiid)
   

        if (menu.open) {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont]} onPress={() => { this.handlebidschedulelineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                            <TextInput value={bidschedule.getquantity.call(this,item.csiid).toString()}
                                onChangeText={text => { bidschedule.handlequantity.call(this, item.csiid, text) }}
                                style={[styles.defaultInput, regularFont, styles.alignCenter]} />

                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>

                            <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                            <TextInput value={bidschedule.getunit.call(this, item.csiid)}
                                onChangeText={text => { bidschedule.handleunit.call(this, item.csiid, text) }}
                                style={[styles.alignCenter, regularFont, styles.defaultInput]} />

                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                            <Text style={[regularFont, styles.alignCenter]}>{profit.toString()} </Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Bid Price</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${bidprice}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Unit Price</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${unitprice}/{unit}</Text>
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
                                <Text style={[regularFont]} onPress={() => { this.handlebidschedulelineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                            <TextInput value={bidschedule.getquantity.call(this, item.csiid).toString()}
                                onChangeText={text => { bidschedule.handlequantity.call(this, item.csiid, text) }}
                                style={[styles.defaultInput, regularFont, styles.alignCenter]} />


                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>

                            <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                            <TextInput value={bidschedule.getunit.call(this, item.csiid)}
                                onChangeText={text => { bidschedule.handleunit.call(this, item.csiid, text) }}
                                style={[styles.alignCenter, regularFont, styles.defaultInput]} />

                            </View>
                        </View>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                                <Text style={[regularFont]}>{profit.toString()} </Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Bid Price</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${bidprice}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Unit Price</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${unitprice}/{unit}</Text>
                            </View>
                        </View>


                    </View>
                </View>
            )

        
    }


    }
    showbidschedule() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const myproject = construction.getprojectbyid.call(this, activeproject.projectid)
        const styles = MyStylesheet();
        const bidschedule = new BidSchedule();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        if (myuser) {
            const checkmanager = construction.checkmanager.call(this)
            if (checkmanager) {
                return (
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}/bidschedule </Text>
                                </View>
                            </View>
                            {bidschedule.showbidtable.call(this)}
                        </View>
                    </View>
                )
            } else {
                return (<Text style={[regularFont]}> Only Managers can view bid schedule</Text>)
            }
        } else {
            return (construction.loginMessage.call(this, "Bid Schedule"))
        }
    }
}
export default BidSchedule;