import React from 'react'
import { Text, View, TextInput } from 'react-native'
import Construction from './construction'
import { MyStylesheet } from './styles'
import { CreateBidScheduleItem,DirectCostForLabor,DirectCostForMaterial,DirectCostForEquipment,sorttimes,ProfitForLabor,ProfitForMaterial,ProfitForEquipment} from './functions'

class Bid {
 
    getitems() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        let payitems = construction.getAllActual.call(this,projectid)
    
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
        const bid = new Bid();
        const biditems = bid.getitems.call(this)
        let items = [];
        if (biditems.length > 0) {
            biditems.map(biditem => {
                items.push(bid.showbiditem.call(this, biditem))
            })
        }
        return items;

    }
    getdirectcost(csiid) {
        const construction = new Construction()
        const project = construction.getactiveproject.call(this);
        const projectid = project.projectid;
        const myproject = construction.getprojectbyid.call(this,projectid)
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid ) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid ) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid ) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    itemsbycsiid(csiid) {
        const construction = new Construction();
        const project = construction.getactiveproject.call(this);
        const myproject = construction.getprojectbyid.call(this,project.projectid)
        let items = [];
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid ) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid ) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid ) {
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
        const bid = new Bid();
        let profit = 0;
        let directcost = 0;
        let items = bid.itemsbycsiid.call(this,csiid);
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
        const bid = new Bid()
        let directcost = Number(bid.getdirectcost.call(this,csiid));
        let profit = Number(bid.getprofit.call(this,csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }
    getunit(csiid) {
        let unit = ""
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        let myinvoice = construction.getinvoicesbyprojectid.call(this,projectid)
        if (myinvoice) {
            // eslint-disable-next-line
            myinvoice.map(invoices => {

                if (invoices.hasOwnProperty("bid")) {
                    // eslint-disable-next-line
                    invoices.bid.biditem.map(item => {
                        if (item.csiid === csiid) {
                            unit = item.unit
                        }
                    })
                }


            })

        }
        return unit;

    }
    getquantity(csiid) {
        let quantity = 0;
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        let myinvoice = construction.getinvoicesbyprojectid.call(this,projectid)
        if (myinvoice) {
            // eslint-disable-next-line
            myinvoice.map(invoices => {

                if (invoices.hasOwnProperty("bid")) {
                    // eslint-disable-next-line
                    invoices.bid.biditem.map(item => {
                        if (item.unit && item.unit !== 'Lump Sum' && item.unit != 'L.S.' && item.csiid === csiid) {
                            quantity += Number(item.quantity);
                        }
                    })
                }


            })

        }
        return quantity;

    }
    getunitprice(csiid) {
        const bid = new Bid();
        let quantity = Number(bid.getquantity.call(this,csiid));
        let bidprice = Number(bid.getbidprice.call(this,csiid));

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
        const bid = new Bid();
        const directcost = Number(bid.getdirectcost.call(this,item.csiid)).toFixed(2);
        const profit = +Number(bid.getprofit.call(this,item.csiid)).toFixed(4);
        const bidprice = Number(bid.getbidprice.call(this,item.csiid)).toFixed(2);
        const quantity = bid.getquantity.call(this,item.csiid);
        const unit = bid.getunit.call(this,item.csiid)
        const unitprice = +Number(bid.getunitprice.call(this,item.csiid)).toFixed(2);
        const regularFont = construction.getRegularFont.call(this)
        
        if (menu.open) {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont]} onPress={()=>{this.handlebidlineitem(item.csiid)}}> {csi.csi}-{csi.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                            <Text style={[ regularFont, styles.alignCenter]}>{quantity.toString()}</Text>
                          
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>

                            <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                            <Text style={[ regularFont,styles.alignCenter]}>{unit}</Text>

                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                            <Text style={[ regularFont,styles.alignCenter]}>{profit.toString()} </Text>
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
                                <Text style={[regularFont]} onPress={()=>{this.handlebidlineitem(item.csiid)}}> {csi.csi}-{csi.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                                <Text style={[ regularFont, styles.alignCenter]}>{quantity.toString()}</Text>
                            

                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>

                                <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                                <Text style={[ regularFont]}>{unit}</Text>
                            
                            </View>
                        </View>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                                <Text style={[ regularFont]}>{profit.toString()} </Text>
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
    showbid() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const myproject = construction.getprojectbyid.call(this, activeproject.projectid)
        const styles = MyStylesheet();
        const bid = new Bid();
        const myuser = construction.getuser.call(this);
        const headerFont = construction.getHeaderFont.call(this)
        if(myuser) {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}/bid </Text>
                        </View>
                    </View>
                    {bid.showbidtable.call(this)}
                </View>
            </View>
        )
        } else {
            return(construction.loginMessage.call(this,"Bid"))
        }
    }
}
export default Bid;