import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import Construction from './construction'
import { MyStylesheet } from './styles'
import { calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime, CreateInvoice, inputDateObjOutputAdjString, isNumeric, UTCTimefromCurrentDate, UTCStringFormatDateforProposal } from './functions'
import MakeID from './makeids';
class Invoices {

    handlelaborprofit(profit, laborid) {
        if (isNumeric(profit)) {
            let construction = new Construction();
            const myuser = construction.getuser.call(this)
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;

            if (myuser) {
                let myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    let i = construction.getprojectkeybyid.call(this, projectid);
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, laborid)
                    if (mylabor) {
                        let j = construction.getactuallaborkeybyid.call(this, projectid, laborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].profit = profit;

                        this.props.reduxUser(myuser);
                        if (mylabor.invoiceid) {
                            construction.updateinvoice.call(this, mylabor.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }
                    }
                }
            }
        } else {
            alert(`Proft should be numeric`)
        }
    }

    handleequipmentprofit(profit, equipmentid) {
        if (isNumeric(profit)) {
            let construction = new Construction();
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;
            const myuser = construction.getuser.call(this)
            if (myuser) {
                let myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    let i = construction.getprojectkeybyid.call(this, projectid);
                    let j = construction.getactualequipmentkeybyid.call(this, projectid, equipmentid);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].profit = profit;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }
            }
        } else {
            alert(`Equipment profit should be numeric`)
        }
    }

    handlematerialprofit(profit, materialid) {
        if (isNumeric(profit)) {
            const construction = new Construction();
            const myuser = construction.getuser.call(this);
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;
            if (myuser) {
                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    let i = construction.getprojectkeybyid.call(this, projectid);
                    const mymaterial = construction.getactualmaterialsbyid.call(this, projectid, materialid)
                    if (mymaterial) {
                        let j = construction.getactualmaterialskeybyid.call(this, projectid, materialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].profit = profit;
                        this.props.reduxUser(myuser);
                        if (mymaterial.invoiceid) {
                            construction.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }
                    }
                }

            }

        } else {
            alert(`Profit should be numeric`)
        }
    }


    handlematerialunit(unit, materialid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            const myproject = construction.getprojectbyid.call(this, projectid)
            if (myproject) {
                let i = construction.getprojectkeybyid.call(this, projectid);
                const mymaterial = construction.getactualmaterialsbyid.call(this, projectid, materialid)
                if (mymaterial) {
                    let j = construction.getactualmaterialskeybyid.call(this, projectid, materialid)
                    myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unit = unit;
                    this.props.reduxUser(myuser)
                    if (mymaterial.invoiceid) {
                        construction.updateinvoice.call(this, mymaterial.invoiceid)

                    } else {
                        this.setState({ render: 'render' })
                    }
                }

            }
        }
    }

    handlematerialquantity(quantity, materialid) {
        if (isNumeric(quantity)) {
            const construction = new Construction();
            const myuser = construction.getuser.call(this);
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;
            if (myuser) {
                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    let i = construction.getprojectkeybyid.call(this, projectid);
                    const mymaterial = construction.getactualmaterialsbyid.call(this, projectid, materialid)
                    if (mymaterial) {
                        let j = construction.getactualmaterialskeybyid.call(this, projectid, materialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].quantity = quantity;
                        this.props.reduxUser(myuser)
                        if (mymaterial.invoiceid) {
                            construction.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }

                    }

                }
            }
        } else {
            alert(`Quantity should be numeric`)
        }
    }

    handlematerialunitcost(unitcost, materialid) {
        if (isNumeric(unitcost)) {
            const construction = new Construction();
            const myuser = construction.getuser.call(this);
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;
            if (myuser) {
                const myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    let i = construction.getprojectkeybyid.call(this, projectid);
                    const mymaterial = construction.getactualmaterialsbyid.call(this, projectid, materialid)
                    if (mymaterial) {
                        let j = construction.getactualmaterialskeybyid.call(this, projectid, materialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unitcost = unitcost;
                        this.props.reduxUser(myuser)
                        if (mymaterial.invoiceid) {
                            construction.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }

                    }

                }
            }

        } else {
            alert(`Unit Cost should be numeric`)
        }
    }

    handlelaborrate(laborrate, laborid) {
        if (isNumeric(laborrate)) {

            let construction = new Construction();
            const myuser = construction.getuser.call(this)
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;

            if (myuser) {
                let myproject = construction.getprojectbyid.call(this, projectid)
                if (myproject) {
                    let i = construction.getprojectkeybyid.call(this, projectid);
                    const mylabor = construction.getactuallaborbyid.call(this, projectid, laborid)
                    if (mylabor) {
                        let j = construction.getactuallaborkeybyid.call(this, projectid, laborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].laborrate = laborrate;
                        this.props.reduxUser(myuser);
                        if (mylabor.invoiceid) {
                            construction.updateinvoice.call(this, mylabor.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }

                    }
                }
            }

        } else {
            return (`Labor rate should be numeric`)
        }
    }
    handleequipmentrate(equipmentrate, equipmentid) {
        if (isNumeric(equipmentrate)) {
            const construction = new Construction();
            const myuser = construction.getuser.call(this);
            const activeproject = construction.getactiveproject.call(this)
            const projectid = activeproject.projectid;
            if (myuser) {
                let i = construction.getprojectkeybyid.call(this, projectid);
                const myequipment = construction.getactualequipmentbyid.call(this, projectid, equipmentid)
                if (myequipment) {
                    let j = construction.getactualequipmentkeybyid.call(this, projectid, equipmentid);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].equipmentrate = equipmentrate;
                    this.props.reduxUser(myuser);
                    if (myequipment.invoiceid) {
                        construction.updateinvoice.call(this, myequipment.invoiceid)
                    } else {
                        this.setState({ render: 'render' })
                    }

                }
            }
        } else {
            alert(`Equipment rate must be numeric`)
        }
    }
    activebackground(invoiceid) {
        if (invoiceid === this.state.activeinvoiceid) {
            return ({ backgroundColor: '#F2C4D2' })
        }
    }
    addItem(item) {

        const checkinvoiceitem = (item) => {
            let result = 'add';
            if (item.invoiceid === this.state.activeinvoiceid) {
                result = 'remove'
            }
            return result;
        }


        let construction = new Construction();
        const myuser = construction.getuser.call(this)
        const activeproject = construction.getactiveproject.call(this)

        if (myuser) {
            if (this.state.activeinvoiceid) {


                let invoiceid = this.state.activeinvoiceid;
                let i = construction.getprojectkeybyid.call(this, activeproject.projectid)

                let result = checkinvoiceitem(item);
                let j = false;
                let l = construction.getinvoicekeybyid.call(this, activeproject.projectid, invoiceid)
                if (result === 'add') {

                    if (item.hasOwnProperty("laborid")) {
                        j = construction.getactuallaborkeybyid.call(this, activeproject.projectid, item.laborid)
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].invoiceid = invoiceid;
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("materialid")) {
                        j = construction.getactualmaterialskeybyid.call(this, activeproject.projectid, item.materialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].invoiceid = invoiceid;
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("equipmentid")) {
                        j = construction.getactualequipmentkeybyid.call(this, activeproject.projectid, item.equipmentid);

                        myuser.company.projects.myproject[i].actualequipment.myequipment[j].invoiceid = invoiceid;
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                } else if (result === 'remove') {

                    if (item.hasOwnProperty("laborid")) {
                        j = construction.getactuallaborkeybyid.call(this, activeproject.projectid, item.laborid)
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].invoiceid = ""
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("materialid")) {
                        j = construction.getactualmaterialskeybyid.call(this, activeproject.projectid, item.materialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].invoiceid = ""
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("equipmentid")) {
                        j = construction.getactualequipmentkeybyid.call(this, activeproject.projectid, item.equipmentid);
                        myuser.company.projects.myproject[i].actualequipment.myequipment[j].invoiceid = ""
                        myuser.company.projects.myproject[i].invoices.myinvoice[l].updated = UTCTimefromCurrentDate();
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
        const invoices = new Invoices();
        const regularFont = construction.getRegularFont.call(this)
        const checkinvoice = construction.checkinvoicelaborid.call(this, item.laborid)

        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();
        const laborrate = item.laborrate.toString();

        if (checkinvoice) {

            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.laborid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}> {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $</Text>
                            <TextInput value={laborrate} onChangeText={text => { invoices.handlelaborrate.call(this, text, item.laborid) }} style={[regularFont, styles.defaultInput, styles.smallField]} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>= ${amount.toFixed(2)}  x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>Profit</Text>
                            <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text => { invoices.handlelaborprofit.call(this, text, item.laborid) }} />
                        </View>

                    </View>
                )
            } else {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.laborid}>
                        <View style={[styles.flex3, styles.flexDirection]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>{employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $</Text>
                            <TextInput value={laborrate} onChangeText={text => { invoices.handlelaborrate.call(this, text, item.laborid) }} style={[regularFont, styles.defaultInput, styles.smallField]} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>= ${amount.toFixed(2)}  x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)} </Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>Profit</Text>
                            <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text => { invoices.handlelaborprofit.call(this, text, item.laborid) }} />
                        </View>

                    </View>
                )

            }

        } else {

            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.laborid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]}> {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $</Text>
                            <Text style={[regularFont, styles.smallField]}>{laborrate}</Text>
                            <Text style={[regularFont]}>= ${amount.toFixed(2)}  x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profit</Text>
                            <Text style={[regularFont]} >{item.profit}</Text>
                        </View>

                    </View>
                )
            } else {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.laborid}>
                        <View style={[styles.flex3, styles.flexDirection]}>
                            <Text style={[regularFont]}> {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $</Text>
                            <Text style={[regularFont, styles.smallField]}>{laborrate}</Text>
                            <Text style={[regularFont]}>= ${amount.toFixed(2)}  x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profit</Text>
                            <Text style={[regularFont]} >{item.profit}</Text>
                        </View>

                    </View>
                )

            }

        }

    }
    showequipmentitem(item) {

        let construction = new Construction()
        const styles = MyStylesheet();
        const menu = construction.getnavigation.call(this)
        const myequipment = construction.getmyequipmentbyid.call(this, item.myequipmentid);
        const csi = construction.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const equipmentrate = item.equipmentrate.toString();
        const amount = Number(totalhours * Number(item.equipmentrate))
        const profit = Number(item.profit) / 100;
        const invoices = new Invoices();
        const regularFont = construction.getRegularFont.call(this)
        const checkinvoice = construction.checkinvoiceequipmentid.call(this, item.equipmentid)
        console.log("checkinvoiceequipment", checkinvoice)
        if (checkinvoice) {
            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.equipmentid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>{myequipment.equipment} CSI: {csi.csi} - {csi.title} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                            Total Hours:{totalhours.toFixed(2)} x $</Text>
                            <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={equipmentrate} onChangeText={text => { invoices.handleequipmentrate.call(this, text, item.equipmentid) }} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>= {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>Profit</Text>
                            <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text => { invoices.handleequipmentprofit.call(this, text, item.equipmentid) }} />
                        </View>

                    </View>
                )
            } else {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.equipmentid}>
                        <View style={[styles.flex3]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>{myequipment.equipment} CSI: {csi.csi} - {csi.title} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                            Total Hours:{totalhours.toFixed(2)} x $</Text>
                            <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={equipmentrate} onChangeText={text => { invoices.handleequipmentrate.call(this, text, item.equipmentid) }} /><Text style={[regularFont]}>= {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>Profit</Text>
                            <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text => { invoices.handleequipmentprofit.call(this, text, item.equipmentid) }} />
                        </View>

                    </View>
                )

            }

        } else {

            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.equipmentid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]}>{myequipment.equipment} CSI: {csi.csi} - {csi.title} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                            Total Hours:{totalhours.toFixed(2)} x $</Text>
                            <Text style={[regularFont, styles.smallField]}>{equipmentrate}</Text>
                            <Text style={[regularFont]}>= {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profit</Text>
                            <Text style={[regularFont]}>{item.profit}</Text>
                        </View>

                    </View>
                )
            } else {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.equipmentid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]}>{myequipment.equipment} CSI: {csi.csi} - {csi.title} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                            Total Hours:{totalhours.toFixed(2)} x $</Text>
                            <Text style={[regularFont, styles.smallField]}>{equipmentrate}</Text>
                            <Text style={[regularFont]}>= {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profit</Text>
                            <Text style={[regularFont]}>{item.profit}</Text>
                        </View>

                    </View>
                )

            }

        }
    }

    showmaterialitem(item) {
        const styles = MyStylesheet();
        const construction = new Construction()
        const menu = construction.getnavigation.call(this)
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
        const invoices = new Invoices();
        const regularFont = construction.getRegularFont.call(this)
        const checkinvoice = construction.checkinvoicematerialid.call(this, item.materialid)
        if (checkinvoice) {
            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.materialid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>{inputUTCStringForMaterialIDWithTime(item.timein)}  {material.material} CSI: {csi.csi} - {csi.title} </Text>
                            <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={item.quantity} onChangeText={text => { invoices.handlematerialquantity.call(this, text, item.materialid) }} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>x $</Text>
                            <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unitcost} onChangeText={text => { invoices.handlematerialunitcost.call(this, text, item.materialid) }} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>=  / </Text>
                            <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unit} onChangeText={text => { invoices.handlematerialunit.call(this, text, item.materialid) }} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>= ${amount.toFixed(2)} x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>Profit</Text>
                            <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text => { invoices.handlematerialprofit.call(this, text, item.materialid) }} />
                        </View>

                    </View>
                )
            } else {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.materialid}>
                        <View style={[styles.flex3, styles.flexDirection]}>
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>{inputUTCStringForMaterialIDWithTime(item.timein)}  {material.material} CSI: {csi.csi} - {csi.title} </Text>
                            <TextInput style={[regularFont, styles.smallField, styles.defaultInput]} value={item.quantity} onChangeText={text => { invoices.handlematerialquantity.call(this, text, item.materialid) }} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>x $</Text>
                            <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unitcost} onChangeText={text => { invoices.handlematerialunitcost.call(this, text, item.materialid) }} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>=  / </Text>
                            <TextInput style={[regularFont, styles.defaultInput, styles.smallField]} value={item.unit} onChangeText={text => { invoices.handlematerialunit.call(this, text, item.materialid) }} />
                            <Text style={[regularFont]} onPress={() => { invoices.addItem.call(this, item) }}>= ${amount.toFixed(2)} x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profit</Text>
                            <TextInput style={[regularFont, styles.defaultInput]} value={item.profit} onChangeText={text => { invoices.handlematerialprofit.call(this, text, item.materialid) }} />
                        </View>

                    </View>
                )
            }
        } else {

            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.materialid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]}>{inputUTCStringForMaterialIDWithTime(item.timein)}  {material.material} CSI: {csi.csi} - {csi.title} </Text>
                            <Text style={[regularFont, styles.smallField]}>{item.quantity} </Text>
                            <Text style={[regularFont]} >x $</Text>
                            <Text style={[regularFont, styles.smallField]}>{item.unitcost}</Text>
                            <Text style={[regularFont]}>=  / </Text>
                            <Text style={[regularFont, styles.smallField]}>{item.unit}</Text>
                            <Text style={[regularFont]}>= ${amount.toFixed(2)} x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</Text>

                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profit</Text>
                            <Text style={[regularFont]}>{item.profit} </Text>
                        </View>

                    </View>
                )
            } else {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10, invoices.activebackground.call(this, item.invoiceid)]} key={item.materialid}>
                        <View style={[styles.flex2, styles.flexDirection]}>
                            <Text style={[regularFont]}>{inputUTCStringForMaterialIDWithTime(item.timein)}  {material.material} CSI: {csi.csi} - {csi.title} </Text>
                            <Text style={[regularFont, styles.smallField]}>{item.quantity} </Text>
                            <Text style={[regularFont]} >x $</Text>
                            <Text style={[regularFont, styles.smallField]}>{item.unitcost}</Text>
                            <Text style={[regularFont]}>=  / </Text>
                            <Text style={[regularFont, styles.smallField]}>{item.unit}</Text>
                            <Text style={[regularFont]}>= ${amount.toFixed(2)} x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</Text>

                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Profit</Text>
                            <Text style={[regularFont]}>{item.profit} </Text>
                        </View>

                    </View>
                )
            }

        }
    }

    showallpayitems() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const invoices = new Invoices();
        let items = [];
        let payitems = construction.getAllActual.call(this, projectid)
        if (payitems.length > 0) {
            // eslint-disable-next-line
            payitems.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    if(this.state.showactuallabor) {
                    items.push(invoices.showlaboritem.call(this, item))
                    }
                }
                if (item.hasOwnProperty("materialid")) {
                    if(this.state.showactualmaterials) {
                    items.push(invoices.showmaterialitem.call(this, item))
                    }

                }
                if (item.hasOwnProperty("equipmentid")) {
                    if(this.state.showactualequipment) {
                    items.push(invoices.showequipmentitem.call(this, item))
                    }

                }


            })
        }
        return items;

    }
    createnewinvoice() {
        const construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            let invoiceid = makeID.invoiceid.call(this);
            let providerid = myuser.providerid;
            let updated = inputDateObjOutputAdjString(this.state.updated);
            let approved = this.state.approved;
            let newinvoice = CreateInvoice(invoiceid, providerid, updated, approved);
            let activeproject = construction.getactiveproject.call(this);
            const myproject = construction.getprojectbyid.call(this, activeproject.projectid)
            let i = construction.getprojectkeybyid.call(this, activeproject.projectid);
            if (myproject.hasOwnProperty("invoices")) {
                myuser.company.projects.myproject[i].invoices.myinvoice.push(newinvoice)

            } else {
                myuser.company.projects.myproject[i].invoices = { myinvoice: [newinvoice] }

            }
            this.props.reduxUser(myuser);
            this.setState({ activeinvoiceid: invoiceid })
        }

    }
    showinvoiceid(myinvoice) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const invoiceid = myinvoice.invoiceid;
        const getplusicon = construction.getPlusIcon.call(this)
        const getminusicon = construction.getMinusIcon.call(this)
        const checkButton = construction.getcheckicon.call(this)
        const invoices = new Invoices();
        const checkicon = (invoiceid) => {
    
            if (this.state.activeinvoiceid === invoiceid) {
                return (
                    <TouchableOpacity style={{ ...checkButton, ...styles.addRightMargin }} onPress={() => { invoices.makeinvoiceactive.call(this, invoiceid) }}>
                        <Image source={require('./png/redminus.png')}
                            resizeMethod='scale'
                            style={getminusicon}
                        />
                    </TouchableOpacity>)
            } else {
                return (
                    <TouchableOpacity style={{ ...checkButton, ...styles.addRightMargin }} onPress={() => { invoices.makeinvoiceactive.call(this, invoiceid) }}>
                        <Image source={require('./png/redplus.png')}
                            resizeMethod='scale'
                            style={getplusicon} />
                    </TouchableOpacity>)
            }
        }
        let updateinfo = "";
        if (myinvoice.updated) {
            updateinfo = `Updated ${UTCStringFormatDateforProposal(myinvoice.updated)}`
        }
    
        return (<View style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont, ...styles.marginLeft60 }} key={myinvoice.invoiceid}>
            <View style={{ ...styles.flex1 }} onPress={() => { invoices.makeinvoiceactive.call(this, invoiceid) }}>
                {checkicon(myinvoice.invoiceid)}
    
            </View>
            <View style={{ ...styles.flex5 }}>
                <Text style={{ ...regularFont, ...styles.generalFont, ...invoices.activebackground.call(this, myinvoice.invoiceid) }} onPress={() => { invoices.makeinvoiceactive.call(this, invoiceid) }}>Invoice ID: {myinvoice.invoiceid} {updateinfo}</Text>
            </View>
        </View>)
    
    
    }
    getinvoiceids() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const myinvoices = construction.getinvoicesbyprojectid.call(this, projectid)
        const invoices = new Invoices();
        let invoiceids = [];
        if (myinvoices) {
            myinvoices.map(invoice => {
                invoiceids.push(invoices.showinvoiceid.call(this, invoice))

            })

        }
        return invoiceids;
    }

    handleinvoicelink() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        if (this.state.activeinvoiceid) {
            return (<Text style={[headerFont, styles.alignCenter, styles.bottomMargin10]} onPress={() => { this.handleviewinvoice(this.state.activeinvoiceid) }}>View Invoice {this.state.activeinvoiceid} </Text>)
        }
    }
    makeinvoiceactive(invoiceid) {
        if (this.state.activeinvoiceid === invoiceid) {
            this.setState({ activeinvoiceid: false })
        } else {
            this.setState({ activeinvoiceid: invoiceid })
        }
    }
    showinvoices() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const project = construction.getprojectbyid.call(this, projectid)
        const styles = MyStylesheet();
        const menu = construction.getnavigation.call(this)
        const invoices = new Invoices();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const getminusicon = construction.getMinusIcon.call(this)
        const proposalIcon = construction.getPlusIcon.call(this)
        const checkIcon = construction.getcheckicon.call(this)
        const invoiceIcon = () => {
            if (menu.open) {
                return ({ width: 180, height: 36 })
            } else {
                return ({ width: 241, height: 48 })
            }
        }

 
        const CheckedBox = () => {
            return (
                <Image source={require('./png/managercheck.png')}
                    style={checkIcon}
                    resizeMethod='scale'
                />)
        }

        const EmptyBox = () => {

            return (<Image source={require('./png/emptybox.png')}
                style={checkIcon}
                resizeMethod='scale'
            />)

        }
        const laboricon = () => {
            if (this.state.showactuallabor) {
                return (<View style={{ ...styles.generalContainer }}>
                    <TouchableOpacity style={{ ...styles.generalButton }} onPress={() => { this.setState({ showactuallabor:false }) }}>{CheckedBox()}</TouchableOpacity>
                </View>)

            } else {
                return (<View style={{ ...styles.generalContainer }}>
                    <TouchableOpacity style={{ ...styles.generalButton }} onPress={() => { this.setState({ showactuallabor:true }) }}>{EmptyBox()}</TouchableOpacity>
                </View>)
            }

        }
        const materialicon = () => {
            if (this.state.showactualmaterials) {
                return (<View style={{ ...styles.generalContainer }}>
                    <TouchableOpacity style={{ ...styles.generalButton }} onPress={() => { this.setState({ showactualmaterials:false }) }}>{CheckedBox()}</TouchableOpacity>
                </View>)
            } else {
                return (<View style={{ ...styles.generalContainer }}>
                    <TouchableOpacity style={{ ...styles.generalButton }} onPress={() => { this.setState({ showactualmaterials:true }) }}>{EmptyBox()}</TouchableOpacity>
                </View>)
            }


        }

        const equipmenticon = () => {
            if (this.state.showactualequipment) {
                return (<View style={{ ...styles.generalContainer }} >
                    <TouchableOpacity style={{ ...styles.generalButton }} onPress={() => { this.setState({ showactualequipment:false }) }}>{CheckedBox()}</TouchableOpacity>
                </View>)

            } else {
                return (<View style={{ ...styles.generalContainer }}>
                    <TouchableOpacity style={{ ...styles.generalButton }} onPress={() => { this.setState({ showactualequipment:true }) }}>{EmptyBox()}</TouchableOpacity>
                </View>)
            }

        }



        if (myuser) {

            const checkmanager = construction.checkmanager.call(this)
            if (checkmanager) {

                return (<View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/invoices</Text>
                                <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{project.title}</Text>
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <TouchableOpacity  onPress={() => { invoices.createnewinvoice.call(this) }}>
                                    <Image source={require('./png/redplus.png')}
                                        resizeMethod='scale'
                                        style={proposalIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.flex5]}>
                                <Text style={{ ...styles.generalFont, ...regularFont }}>Create New Invoice</Text>
                            </View>
                        </View>

                   
                        <View style={{ ...styles.generalFlex, ...styles.marginLeft30 }}>
                            <View style={{ ...styles.flex1, ...styles.generalFont }}>
                                <Image source={require('./png/redminus.png')}
                                    resizeMethod='scale'
                                    style={getminusicon}
                                />
                            </View>
                            <View style={{ ...styles.flex5 }}>
                                <Text style={{ ...styles.generalFont, ...regularFont }}>My Invoices</Text>
                            </View>
                        </View>

                        {invoices.getinvoiceids.call(this)}

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont }}>Labor</Text>
                                {laboricon()}
                            </View>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont }}>Equipment</Text>
                                {equipmenticon()}
                            </View>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont }}>Materials</Text>
                                {materialicon()}
                            </View>
                        </View>
                       
                        {invoices.showallpayitems.call(this)}
                        {invoices.handleinvoicelink.call(this)}
                        {construction.showsaveproject.call(this)}
                    </View>
                </View>)

            } else {
                return (<Text style={[regularFont]}> Only Managers can view invoices </Text>)
            }

        } else {
            return (construction.loginMessage.call(this, "Invoices"))
        }
    }

}
export default Invoices