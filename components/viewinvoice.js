import React from 'react'
import { Text, View, TextInput } from 'react-native'
import Construction from './construction'
import { MyStylesheet } from './styles'
import { CreateBidScheduleItem, DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, sorttimes, ProfitForLabor, ProfitForMaterial, ProfitForEquipment, isNumeric, UTCStringFormatDateforProposal, UTCTimefromCurrentDate, inputUTCStringForLaborID } from './functions'

class ViewInvoice {
    getinvoice() {
        const construction = new Construction();
        let myinvoice = false;
        const activeproject = construction.getactiveproject.call(this)
        const invoiceid = activeproject.invoiceid;
        const projectid = activeproject.projectid;
        invoices = construction.getinvoicesbyprojectid.call(this, projectid)
        invoices.map(invoice => {
            if (invoice.invoiceid === invoiceid) {
                myinvoice = invoice;
            }
        })
        return myinvoice;
    }
    getactualitems() {
        const viewinvoice = new ViewInvoice()
        let actualitems = false;
        let myinvoice = viewinvoice.getinvoice.call(this);
        if (myinvoice) {
            if (myinvoice.hasOwnProperty("bid")) {
                actualitems = myinvoice.bid.biditem
            }
        }
        return actualitems;
    }
    getactualitem(csiid) {
        const viewinvoice = new ViewInvoice()
        let actualitems = viewinvoice.getactualitems.call(this);
        let actualitem = false;
        if (actualitems) {
            // eslint-disable-next-line
            actualitems.map(item => {
                if (item.csiid === csiid) {
                    actualitem = item;
                }
            })
        }
        return actualitem;
    }
    getitems() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        const invoiceid = activeproject.invoiceid;
        let payitems = construction.getAllActual.call(this, projectid)

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
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.invoiceid === invoiceid) {
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
                    csis.push(newItem)
                }
            })
        }

        return csis;
    }
    showbidtable() {
        const viewinvoice = new ViewInvoice();
        const biditems = viewinvoice.getitems.call(this)
        let items = [];
        if (biditems.length > 0) {
            biditems.map(biditem => {
                items.push(viewinvoice.showbiditem.call(this, biditem))
            })
        }
        return items;

    }
    getdirectcost(csiid) {
        const construction = new Construction()
        const project = construction.getactiveproject.call(this);
        const invoiceid = project.invoiceid;
        const projectid = project.projectid;
        const myproject = construction.getprojectbyid.call(this, projectid)
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    invoiceitemsbycsiid(csiid) {
        const construction = new Construction();
        const project = construction.getactiveproject.call(this);
        const myproject = construction.getprojectbyid.call(this, project.projectid)
        const invoiceid = project.invoiceid;
        let items = [];
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
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
        const viewinvoice = new ViewInvoice();
        let profit = 0;
        let directcost = 0;
        let items = viewinvoice.invoiceitemsbycsiid.call(this, csiid);
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
        const viewinvoice = new ViewInvoice()
        let directcost = Number(viewinvoice.getdirectcost.call(this, csiid));
        let profit = Number(viewinvoice.getprofit.call(this, csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }
    getunit(csiid) {
        const viewinvoice = new ViewInvoice()
        let actualitem = viewinvoice.getactualitem.call(this, csiid);
        if (actualitem) {

            return actualitem.unit;


        } else {
            return ""
        }
    }
    getquantity(csiid) {
        const viewinvoice = new ViewInvoice()
        let actualitem = viewinvoice.getactualitem.call(this, csiid);

        if (actualitem) {
            if (Number(actualitem.quantity) > 0) {
                return Number(actualitem.quantity);

            } else {

                return ""
            }

        } else {
            return ""
        }

    }
    getunitprice(csiid) {
        const viewinvoice = new ViewInvoice();
        let quantity = Number(viewinvoice.getquantity.call(this, csiid));
        let bidprice = Number(viewinvoice.getbidprice.call(this, csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return bidprice;;
        }


    }

    handlechangequantity(quantity, csiid, invoiceid, projectid) {
        if (isNumeric(quantity)) {
            const construction = new Construction();
            let myuser = construction.getuser.call(this);
            if (myuser) {

                const myproject = construction.getprojectbyid.call(this, projectid);
                if (myproject) {
                    let i = construction.getprojectkeybyid.call(this, projectid)
                    const invoice = construction.getinvoicebyid.call(this, projectid, invoiceid)
                    if (invoice) {
                        let j = construction.getinvoicekeybyid.call(this, projectid, invoiceid)

                        const lineitem = construction.getinvoiceitem.call(this, csiid, invoiceid, projectid)
                        const l = construction.getinvoiceitemkey.call(this, csiid, invoiceid, projectid)
                        if (lineitem) {

                            const k = construction.getinvoiceitemkey.call(this, csiid, invoiceid, projectid)
                            myuser.company.projects.myproject[i].invoices.myinvoice[j].bid.biditem[k].quantity = quantity;
                            myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else {

                            let unit = "";
                            let newItem = CreateBidScheduleItem(csiid, unit, quantity)
                            myuser.company.projects.myproject[i].invoices.myinvoice[j].bid = { biditem: [newItem] }
                            myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        }

                    }

                }

            }

        } else {
            alert(`Quantity should be numeric`)
        }
    }

    handlechangeunit(unit, csiid, invoiceid, projectid) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {

            const myproject = construction.getprojectbyid.call(this, projectid);
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, projectid)
                const invoice = construction.getinvoicebyid.call(this, projectid, invoiceid)
                if (invoice) {
                    let j = construction.getinvoicekeybyid.call(this, projectid, invoiceid)

                    const lineitem = construction.getinvoiceitem.call(this, csiid, invoiceid, projectid)
                    const l = construction.getinvoiceitemkey.call(this, csiid, invoiceid, projectid)
                    if (lineitem) {
                        const k = construction.getinvoiceitemkey.call(this, csiid, invoiceid, projectid)
                        myuser.company.projects.myproject[i].invoices.myinvoice[j].bid.biditem[k].unit = unit;
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else {
                        let quantity = "";
                        let newItem = CreateBidScheduleItem(csiid, unit, quantity)
                        myuser.company.projects.myproject[i].invoices.myinvoice[j].bid = { biditem: [newItem] }
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }
                }

            }

        }

    }

    handlechangeprofit(profit, csiid, invoiceid, projectid) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            let i = construction.getprojectkeybyid.call(this, projectid);
            let myproject = construction.getprojectbyid.call(this, projectid);
            let k = false;
            if (myproject) {
                const l = construction.getinvoiceitemkey.call(this, csiid, invoiceid, projectid)
                if (myproject.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    myproject.actuallabor.mylabor.map((mylabor, j) => {
                        if (mylabor.invoiceid === invoiceid && (mylabor.csiid === csiid) && !mylabor.charge) {
                            myuser.company.projects.myproject[i].actuallabor.mylabor[j].profit = profit;
                            k = construction.getinvoicekeybyid.call(this, projectid, invoiceid)
                            myuser.company.projects.myproject[i].invoices.myinvoice[k].updated = UTCTimefromCurrentDate();
                        }

                    })

                }
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                        if (mymaterial.invoiceid === invoiceid && (mymaterial.csiid === csiid) && !mymaterial.charge) {
                            myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].profit = profit;
                            k = construction.getinvoicekeybyid.call(this, projectid, invoiceid)
                            myuser.company.projects.myproject[i].invoices.myinvoice[k].updated = UTCTimefromCurrentDate();
                        }

                    })
                }
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map((myequipment, j) => {
                        if (myequipment.invoiceid === invoiceid && (myequipment.csiid === csiid) && !myequipment.charge) {
                            myuser.company.projects.myproject[i].actualequipment.myequipment[j].profit = profit;
                            k = construction.getinvoicekeybyid.call(this, projectid, invoiceid)
                            myuser.company.projects.myproject[i].invoices.myinvoice[k].updated = UTCTimefromCurrentDate();
                        }

                    })
                }
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            }
        }
    }



    showbiditem(item) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const csi = construction.getcsibyid.call(this, item.csiid);
        const viewinvoice = new ViewInvoice();
        const directcost = Number(viewinvoice.getdirectcost.call(this, item.csiid)).toFixed(2);
        const profit = +Number(viewinvoice.getprofit.call(this, item.csiid)).toFixed(4);
        const bidprice = Number(viewinvoice.getbidprice.call(this, item.csiid)).toFixed(2);
        const quantity = viewinvoice.getquantity.call(this, item.csiid);
        const unit = viewinvoice.getunit.call(this, item.csiid)
        const unitprice = +Number(viewinvoice.getunitprice.call(this, item.csiid)).toFixed(2);
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const invoiceid = activeproject.invoiceid;
        const regularFont = construction.getRegularFont.call(this)
    
        const showprofit = () => {
   
            return (<TextInput style={[styles.defaultInput, regularFont, styles.alignCenter]}
                value={profit.toString()}
                onChangeText={text => { viewinvoice.handlechangeprofit.call(this, text, item.csiid, invoiceid, projectid) }}
            />)
           


        }
        const showunit = () => {
         
            return (<TextInput style={[styles.defaultInput, regularFont, styles.alignCenter]}
                value={unit}
                onChangeText={text => { viewinvoice.handlechangeunit.call(this, text, item.csiid, invoiceid, projectid) }}
            />)
          

        }
        const showquantity = () => {
           
            return (<TextInput style={[styles.defaultInput, regularFont, styles.alignCenter]}
                keyboardType='numeric'
                value={quantity.toString()}
                onChangeText={text => { viewinvoice.handlechangequantity.call(this, text, item.csiid, invoiceid, projectid) }}
            />)

           

        }

        if (menu.open) {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont]} onPress={() => { this.handleinvoicelineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                            {showquantity()}
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>

                            <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                            {showunit()}

                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                            {showprofit()}

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
                                <Text style={[regularFont]} onPress={() => { this.handleinvoicelineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                                {showquantity()}

                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>

                                <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                                {showunit()}
                            </View>
                        </View>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                                <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                                {showprofit()}
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
    getcollected() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this);
        const projectid = activeparams.projectid;
        const invoiceid = activeparams.invoiceid;
        const items = construction.getAllActual.call(this,projectid)
        let pendings = [];
        let amount = 0;
        if (items) {
            // eslint-disable-next-line
            items.map(item => {
                if ((item.invoiceid === invoiceid) && item.chargeid && !item.transferid) {
                    pendings.push(item)
    
                }
            })
        }
        console.log(pendings)
    
        if (pendings.length > 0) {
            // eslint-disable-next-line
            pendings.map(myitem => {
                console.log(myitem)
                if (myitem.hasOwnProperty("laborid")) {
                    amount += DirectCostForLabor(myitem) + ProfitForLabor(myitem)
    
                } else if (myitem.hasOwnProperty("materialid")) {
                    amount += DirectCostForMaterial(myitem) + ProfitForMaterial(myitem)
    
                } else if (myitem.hasOwnProperty("equipmentid")) {
                    amount += DirectCostForEquipment(myitem) + ProfitForEquipment(myitem)
    
                }
    
            })
    
        }
        return amount;
    }
    getamount() {
    const viewinvoice = new ViewInvoice();
        const biditems = viewinvoice.getitems.call(this);
        let amount = 0;
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                amount += viewinvoice.getbidprice.call(this,item.csiid)
            })
        }
    
        // 
        return Math.round((amount * 100))
    
    
    }
    sumoftransfers() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this);
        const projectid = activeparams.projectid;
        const invoiceid = activeparams.invoiceid;
        const transfers = construction.getTransferbyInvoiceID.call(this, projectid,invoiceid)
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)
            })
        }
    
        return amount;
    }
    showtransfer(transfer) {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const created = inputUTCStringForLaborID(transfer.created);
        const account = construction.getaccountbydestination.call(this, transfer.destination)
        return (<View style={[styles.generalFlex]} key={transfer.transferid}>
        <View style={[styles.flex1]}>
           <Text style={[regularFont]}> Transfer Created {created} for the Amount ${transfer.amount} to Account {account.accountname}</Text>
           </View>
        </View>)
    }

    invoicesummary() {
        const construction = new Construction()
        const viewinvoice = new ViewInvoice();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const amount = Number(viewinvoice.getamount.call(this) / 100).toFixed(2)
        const sumoftransfers = Number(viewinvoice.sumoftransfers.call(this)).toFixed(2);
        const invoicebalance = Number(amount - sumoftransfers).toFixed(2);
        const collected = Number(viewinvoice.getcollected.call(this)).toFixed(2)
        const pending = () => {
            if (viewinvoice.getcollected.call(this)) {
                return (` Total of $${collected} has been collected and is due for transfer`)
            }
        }
    
        return (
            <View style={[ styles.generalFlex ]}>
                <View style={[ styles.generalFont, headerFont, styles.flex1 ]}>
    
                    <View style={[ styles.generalFlex ]}>
                        <View style={[ styles.generalFont, styles.flex1 ]}><Text style={[headerFont, styles.underline]}>Invoice Summary</Text></View>
                    </View>
    
                    <View style={[ styles.generalFlex ]}>
                        <View style={[ styles.generalFont,  styles.flex1 ]}><Text style={[regularFont]}>Calculated Invoice Amount is ${amount} Total amount of Transfers is ${sumoftransfers} Total Amount left to be paid out ${invoicebalance} {pending()} </Text></View>
                    </View>
    
    
    
                </View>
    
            </View>)
    }
    
    transferSummary() {
        const construction = new Construction()
        const styles = MyStylesheet();
        const activeparams = construction.getactiveproject.call(this);
        const projectid = activeparams.projectid;
        const invoiceid = activeparams.invoiceid;
        const transfers = construction.getTransferbyInvoiceID.call(this, projectid,invoiceid)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const viewinvoice = new ViewInvoice();
        const sumoftransfers = () => {
            let sum = 0;
    
            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    sum += Number(transfer.amount)
                })
            }
            return sum;
        }
        let transferids = [];
        const jsx = (transferids) => {
            return (<View style={[ styles.generalFlex ]}>
                <View style={[ styles.flex1 ]}>
    
                    <View style={[ styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[ styles.flex1 ]}>
                            <Text style={[headerFont, styles.underline]}>Transfer Summary</Text>
                </View>
                    </View>
    
                    <View style={[ styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[ styles.flex1 ]}>
                           {transferids}
                        </View>
                    </View>
    
                    <View style={[ styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[ styles.flex1, regularFont ]}>
                           <Text style={[regularFont]}>Sum of Transfers  ${Number(sumoftransfers()).toFixed(2)}</Text> 
                        </View>
                    </View>
    
    
                </View>
            </View>)
        }
    
    
    
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                transferids.push(viewinvoice.showtransfer.call(this,transfer))
    
            })
        }
        return (jsx(transferids))
    }
    showinvoice() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this)
        const myproject = construction.getprojectbyid.call(this, activeproject.projectid)
        const invoiceid = activeproject.invoiceid;
        const projectid = activeproject.projectid;
        const styles = MyStylesheet();
        const viewinvoice = new ViewInvoice();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const invoice = construction.getinvoicebyid.call(this, myproject.projectid, invoiceid)
        const regularFont = construction.getRegularFont.call(this)
       
        const updated = () => {
            if (invoice.updated) {
                return (<Text style={[regularFont, styles.alignCenter]}>Invoice Updated On {UTCStringFormatDateforProposal(invoice.updated)}</Text>)
            }

        }

       
        const saveproject = () => {
           
                return(construction.showsaveproject.call(this))
            
        }

        if (myuser) {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}/invoice/{invoiceid}</Text>
                            </View>
                        </View>
                        {viewinvoice.showbidtable.call(this)}
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                {updated()}
                            </View>
                        </View>

                      

                        {viewinvoice.invoicesummary.call(this)}

                        {viewinvoice.transferSummary.call(this)}


                        {saveproject()}
                    </View>
                </View>
            )
        } else {
            return (construction.loginMessage.call(this, "View Invoice"))
        }
    }
}
export default ViewInvoice;