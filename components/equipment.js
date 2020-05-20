import React, { Component } from 'react';
import { Alert, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import AccountID from './accountid'
import PurchaseDate from './purchasedate';
import SaleDate from './saledate';
import EquipmentDate from './equipmentdate'
import { formatDateStringDisplay, CreateEquipment, CreateRentalRate, DateStringfromObj, CreateCostID, CreateOwnwership, isNumeric } from './functions'
import MakeID from './makeids';


class Equipment extends Component {
    constructor(props) {
        super(props)
        this.state = { render: '', accountname:'', activeequipmentid: '', accountid: '', equipment: '', ownership: '', activecostid: '', cost: '', purchasedate: new Date(), saledate: new Date(), purchasecalender: 'open', resaledate: '', detail: '', resalevalue: '', loaninterest: '', workinghours: '', showdetail: true, equipmentdate: new Date(), costmenu: true,showpurchasedate:false,showsaledate:false, showequipmentdate:false }
    }
    accountidindex(equipmentid) {
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)
        let i = 0;
        if (myequipment.accountid) {
            i = construction.getaccountkeybyid.call(this, myequipment.accountid)
        }
    }
    makeequipmentactive(equipmentid) {
        const construction = new Construction();
        const equipment = construction.getmyequipmentbyid.call(this,equipmentid);
        const accountid = equipment.accountid;
        const account = construction.getaccountbyid.call(this,accountid)
        const accountname = account.accountname;
        if (this.state.activeequipmentid === equipmentid) {
            this.setState({ activeequipmentid: false, accountname:'' })
        } else {
            this.setState({ activeequipmentid: equipmentid, accountname })
        }
    }

    checkremoveequipment(equipmentid) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        let validate = {};
        validate.validate = true;
        validate.message = "";
        if (company.hasOwnProperty("projects")) {
            // eslint-disable-next-line
            company.projects.myproject.map(myproject => {
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    myproject.scheduleequipment.myequipment.map(myequipment => {
                        if (myequipment.myequipmentid === equipmentid) {
                            validate.validate = false;
                            validate.message += `Could not delete equipment. Check Schedule Equipment for Project ID ${myproject.title}  `;
                        }
                    })

                }
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        if (myequipment.myequipmentid === equipmentid) {
                            validate.validate = false;
                            validate.message += `Could not delete equipment. Check Actual Equipment for Project ID ${myproject.title}  `;
                        }
                    })

                }
            })
        }
        return validate;
    }

    confirmremoveequipment(equipment) {
        const construction = new Construction();

        const myuser = construction.getuser.call(this)
        const validate = this.checkremoveequipment(equipment.equipmentid);

        if (validate.validate) {
            const i = construction.getequipmentkeybyid.call(this, equipment.equipmentid)
            myuser.company.equipment.myequipment.splice(i, 1);
            if (myuser.company.equipment.myequipment.length === 0) {
                delete myuser.company.equipment.myequipment
                delete myuser.company.equipment
            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render', activeequipmentid: false })


        } else {
            this.setState({ message: validate.message })
        }

    }

    removeequipment(equipment) {
        Alert.alert(
            'Delete Equipment',
            `Are you sure you want to remove ${equipment.equipment}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove accout '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremoveequipment(equipment) } },
            ],
            { cancelable: false }
        )
    }

    showequipmentid(equipment) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const removeIconSize = construction.getremoveicon.call(this)
        const account = construction.getaccountbyid.call(this, equipment.accountid)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const activeBackground = () => {
            if (this.state.activeequipmentid === equipment.equipmentid) {
                return styles.activeBackground;
            } else {
                return;
            }
        }

        
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={equipment.equipmentid} onPress={() => { this.makeequipmentactive(equipment.equipmentid) }}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont, activeBackground()]} onPress={() => { this.makeequipmentactive(equipment.equipmentid) }}> {equipment.equipment}  Account: {account.accountname} {equipment.ownershipstatus}</Text>
                </View>
                <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { this.removeequipment(equipment) }}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>

                </View>
            </View>)
        
    }

    showequipmentids() {
        const construction = new Construction();
        let myequipment = construction.getmyequipment.call(this)
        let equipmentids = [];
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                equipmentids.push(this.showequipmentid(equipment))

            })
        }
        return equipmentids;
    }
    handleOwnedIcon() {
        const construction = new Construction()
        const radioIcon = construction.getradioicon.call(this)
        if (this.state.activeequipmentid) {
            let myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            if (myequipment.ownershipstatus === 'owned') {
                return (<Image source={require('./png/radioclosed.png')}
                    style={radioIcon}
                    resizeMethod='scale'
                />)
            } else {
                return (<Image source={require('./png/radioopen.png')}
                    style={radioIcon}
                    resizeMethod='scale'
                />)
            }

        } else {
            return (<Image source={require('./png/radioopen.png')}
                style={radioIcon}
                resizeMethod='scale'
            />)
        }
    }
    handleRentedIcon() {

        const construction = new Construction()

        const radioIcon = construction.getradioicon.call(this)
        if (this.state.activeequipmentid) {

            let myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)

            if (myequipment.ownershipstatus === 'rented') {

                return (<Image source={require('./png/radioclosed.png')}
                    style={radioIcon}
                    resizeMethod='scale'
                />)
            } else {

                return (<Image source={require('./png/radioopen.png')}
                    style={radioIcon}
                    resizeMethod='scale'
                />)
            }

        } else {
            return (<Image source={require('./png/radioopen.png')}
                style={radioIcon}
                resizeMethod='scale'
            />)
        }
    }
    getworkinghours() {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            return (equipment.ownership.workinghours)
        } else {
            return (this.state.workinghours)
        }
    }
    handleworkinghours(workinghours) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                myuser.company.equipment.myequipment[i].ownership.workinghours = workinghours;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }

        }

    }

    getpurchasedate() {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            return (equipment.ownership.purchasedate)
        } else {
            return (DateStringfromObj(this.state.purchasedate))
        }
    }
    handlepurchasedate(purchasedate) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                myuser.company.equipment.myequipment[i].ownership.purchasedate = purchasedate;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }

        }

    }
    getsaledate() {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            return (equipment.ownership.saledate)
        } else {
            return (DateStringfromObj(this.state.saledate))
        }
    }
    handlesaledate(saledate) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                myuser.company.equipment.myequipment[i].ownership.saledate = saledate;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }

        }

    }
    getloaninterest() {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            return (equipment.ownership.loaninterest)
        } else {
            return (this.state.loaninterest)
        }
    }
    handleloaninterest(loaninterest) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                myuser.company.equipment.myequipment[i].ownership.loaninterest = loaninterest;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }

        }

    }
    showequipmentownership() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const workinghours = () => {
            if (menu.open) {
                return (
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>

                            <View style={[styles.generalFlex]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>Annual Working Hours</Text>
                                    <TextInput style={[regularFont, styles.defaultInput]}
                                        value={this.getworkinghours()}
                                        onChangeText={text => { this.handleworkinghours(text) }}
                                    />
                                </View>

                            </View>

                            <View style={[styles.generalFlex]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>Interest Rate</Text>
                                    <TextInput style={[regularFont, styles.defaultInput]}
                                        value={this.getloaninterest()}
                                        onChangeText={text => { this.handleloaninterest(text) }}
                                    />
                                </View>

                            </View>

                        </View>

                    </View>
                )

            } else {
                return (

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Annual Working Hours</Text>
                            <TextInput style={[regularFont, styles.defaultInput]}
                                value={this.getworkinghours()}
                                onChangeText={text => { this.handleworkinghours(text) }} />
                        </View>

                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Interest Rate</Text>
                            <TextInput style={[regularFont, styles.defaultInput]}
                                value={this.getloaninterest()}
                                onChangeText={text => { this.handleloaninterest(text) }} />
                        </View>

                    </View>


                )

            }
        }
        if (this.state.activeequipmentid) {
            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            if (myequipment) {
                if (myequipment.ownershipstatus === 'owned') {
                    return (
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[headerFont]}>Ownership</Text>
                                    </View>
                                </View>
                                {workinghours()}
                            </View>
                        </View>
                    )
                } else {
                    return;
                }
            } else {
                return;
            }
        } else {
            return;
        }
    }
    showequipmentcostids() {
        const construction = new Construction();
        
        const costs = construction.getequipmentcostsbyid.call(this, this.state.activeequipmentid);
        let costids = [];
        if (costs) {
            costs.map(cost => {
                costids.push(this.showcostid(cost))
            })
        }
        return costids;
    }
    removeequipmentcost(cost) {
        Alert.alert(
            'Delete Cost',
            `Are you sure you want to remove ${cost.detail}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove accout '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremoveequipmentcost(cost) } },
            ],
            { cancelable: false }
        )
    }

    confirmremoveequipmentcost(cost) {

        const construction = new Construction();
        const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
        const j = construction.getequipmentcostskeybyid.call(this, this.state.activeequipmentid, cost.costid)
        const myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.company.equipment.myequipment[i].ownership.cost.splice(j, 1);
            this.props.reduxUser(myuser)
            this.setState({ render: 'render', activecostid: false })
        }

    }

    makecostidactive(costid) {
        if (this.state.activecostid === costid) {
            this.setState({ activecostid: false })
        } else {
            console.log("ACTIVECOSTID", costid)
            this.setState({ activecostid: costid })
        }
    }

    getcost() {
        const construction = new Construction();
        let cost = this.state.cost;
        if (this.state.activeequipmentid) {
            if (this.state.activecostid) {
                cost = construction.getequipmentcostbyid.call(this, this.state.activeequipmentid, this.state.activecostid).cost;

            }
        }
        return cost;

    }
    handlecost(cost) {
        if(isNumeric(cost)) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activeequipmentid) {

                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)

                if (this.state.activecostid) {

                    let j = construction.getequipmentcostskeybyid.call(this, this.state.activeequipmentid, this.state.activecostid)

                    myuser.company.equipment.myequipment[i].ownership.cost[j].cost = cost;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                } else {

                    let costid = makeID.costid.call(this);
                    let datein = DateStringfromObj(this.state.equipmentdate)
                    let detail = "";
                    let newcost = CreateCostID(costid, cost, detail, datein)
                    let equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)

                    if (equipment.ownership.hasOwnProperty("cost")) {
                        myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                    } else {

                        myuser.company.equipment.myequipment[i].ownership.cost = [newcost]
                    }

                    this.props.reduxUser(myuser)
                    this.setState({ activecostid: costid, render: 'render' })

                }

            }
        }
    } else {
        alert(`Cost should be numeric`)
    }

    }

    getdetail() {
        const construction = new Construction();
        let detail = this.state.detail;
        if (this.state.activeequipmentid) {
            if (this.state.activecostid) {
                detail = construction.getequipmentcostbyid.call(this, this.state.activeequipmentid, this.state.activecostid).detail;

            }
        }
        return detail;

    }
    handledetail(detail) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activeequipmentid) {

                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)

                if (this.state.activecostid) {

                    let j = construction.getequipmentcostskeybyid.call(this, this.state.activeequipmentid, this.state.activecostid)

                    myuser.company.equipment.myequipment[i].ownership.cost[j].detail = detail;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                } else {

                    let costid = makeID.costid.call(this);
                    let datein = DateStringfromObj(this.state.equipmentdate)
                    let cost = this.state.cost;
                    let newcost = CreateCostID(costid, cost, detail, datein)
                    let equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)

                    if (equipment.ownership.hasOwnProperty("cost")) {
                        myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                    } else {

                        myuser.company.equipment.myequipment[i].ownership.cost = [newcost]
                    }

                    this.props.reduxUser(myuser)
                    this.setState({ activecostid: costid, render: 'render' })

                }

            }
        }

    }

    getequipmentdate() {
        const construction = new Construction();
        let equipmentdate = DateStringfromObj(this.state.equipmentdate);
        if (this.state.activeequipmentid) {
            if (this.state.activecostid) {
                equipmentdate = construction.getequipmentcostbyid.call(this, this.state.activeequipmentid, this.state.activecostid).timein;

            }
        }
        return equipmentdate;

    }
    handleequipmentdate(equipmentdate) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activeequipmentid) {

                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)

                if (this.state.activecostid) {

                    let j = construction.getequipmentcostskeybyid.call(this, this.state.activeequipmentid, this.state.activecostid)

                    myuser.company.equipment.myequipment[i].ownership.cost[j].timein = equipmentdate
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                } else {

                    let costid = makeID.costid.call(this);
                    let detail = this.state.detail;
                    let cost = this.state.cost;
                    let newcost = CreateCostID(costid, cost, detail, equipmentdate)
                    let equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)

                    if (equipment.ownership.hasOwnProperty("cost")) {
                        myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                    } else {

                        myuser.company.equipment.myequipment[i].ownership.cost = [newcost]
                    }

                    this.props.reduxUser(myuser)
                    this.setState({ activecostid: costid, render: 'render' })

                }

            }
        }

    }
    showcostid(cost) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const menu = construction.getnavigation.call(this)
        const removeIconSize = construction.getremoveicon.call(this)
        const styles = MyStylesheet();
        const activeBackground = () => {
            if (this.state.activecostid === cost.costid) {
                return (styles.activeBackground)
            } else {
                return;
            }
        }

        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={cost.costid}>
                    <View style={[styles.flex1, styles.flexDirection]}>
                        <Text style={[regularFont, activeBackground()]} onPress={() => { this.makecostidactive(cost.costid) }}> {formatDateStringDisplay(cost.timein)} Cost:${Number(cost.cost).toFixed(2)}  Detail: {cost.detail}</Text>
                        <TouchableOpacity onPress={() => { this.removeequipmentcost(cost) }}>
                            <Image source={require('./png/removeIcon.png')}
                                style={removeIconSize}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>

                    </View>
                </View>)
        } else {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={cost.costid}>
                <View style={[styles.flex4]}>
                    <Text style={[regularFont, activeBackground()]} onPress={() => { this.makecostidactive(cost.costid) }}> {formatDateStringDisplay(cost.timein)} Cost:${Number(cost.cost).toFixed(2)}  Detail: {cost.detail}</Text>
                </View>
                <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { this.removeequipmentcost(cost) }}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>

                </View>
            </View>)
        }
    }
    ownershipdetail() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const purchasedate = new PurchaseDate();
        const saledate = new SaleDate();
        const equipmentdate = new EquipmentDate();
        const regularFont = construction.getRegularFont.call(this);
        const headerFont = construction.getHeaderFont.call(this);
        const equipmentrate = () => {
            let rate = construction.calculateequipmentratebyid.call(this,this.state.activeequipmentid);
            const equipment = construction.getmyequipmentbyid.call(this,this.state.activeequipmentid)
            if(rate) {
                rate = Number(rate.toFixed(2))
                return(
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
                       <Text style={[styles.regularFont]}>{equipment.equipment} is ${rate} dollars per working hour </Text>
                    </View>
                </View>
                )
           }
        
        }
        if (this.state.activeequipmentid) {
            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            if (myequipment) {
                if (myequipment.ownershipstatus === 'owned') {
                    return (
                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1]}>
                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        {purchasedate.showdate.call(this)}
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        {saledate.showdate.call(this)}
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[headerFont]}>Ownership Costs </Text>
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        {equipmentdate.showdate.call(this)}
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}> Cost </Text>
                                        <TextInput style={[styles.defaultInput, regularFont]}
                                            value={this.getcost()}
                                            onChangeText={text => { this.handlecost(text) }}
                                        />
                                    </View>
                                </View>


                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}> Detail </Text>
                                        <TextInput style={[styles.defaultInput, regularFont]}
                                            value={this.getdetail()}
                                            onChangeText={text => { this.handledetail(text) }}
                                        />
                                    </View>
                                </View>

                                {this.showequipmentcostids()}

                                {equipmentrate()}

                            </View>
                        </View>)
                } else {
                    return;
                }

            } else {
                return;
            }

        } else {
            return;
        }

    }

    handleweek(week) {
        const construction = new Construction();
        if (this.state.activeequipmentid) {

            let myuser = construction.getuser.call(this);
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.week = week;
            } else {
                let month = "0"
                let day = "0";
                let hour = "0";
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }
    getweek() {
        const construction = new Construction();
        let week = "";
        const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);

        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                week = equipment.rentalrates.week
            }
        }
        return week;
    }
    handlemonth(month) {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            let myuser = construction.getuser.call(this);
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.month = month;
            } else {
                let week = "0";
                let day = "0";
                let hour = "0";
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }
    getmonth() {
        const construction = new Construction();
        let month = "";
        const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                month = equipment.rentalrates.month
            }
        }

        return month;
    }

    getday() {
        const construction = new Construction();
        let day = ""
        const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);

        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                day = equipment.rentalrates.day
            }
        }
        return day;
    }

    handleday(day) {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            let myuser = construction.getuser.call(this);
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.day = day;
            } else {
                let month = "0"
                let week = "0";
                let hour = "0";
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }

    handlehour(hour) {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            let myuser = construction.getuser.call(this);
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.hour = hour;
            } else {
                let month = "0"
                let week = "0";
                let day = "0";
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }

    gethour() {
        const construction = new Construction();
        let hour = ""
        const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);

        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                hour = equipment.rentalrates.hour
            }
        }
        return hour;
    }
    rentalrates() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        if (this.state.activeequipmentid) {
            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            if (myequipment) {
                if (myequipment.ownershipstatus === 'rented') {
                    return (
                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1]}>
                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[headerFont, styles.alignCenter]}>Rental Rates </Text>
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}> Month </Text>
                                        <TextInput style={[styles.defaultInput, regularFont]}
                                            onChangeText={text => { this.handlemonth(text) }}
                                            value={this.getmonth()}
                                        />
                                    </View>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}> Week </Text>
                                        <TextInput style={[styles.defaultInput, regularFont]}
                                            onChangeText={text => { this.handleweek(text) }}
                                            value={this.getweek()}
                                        />
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}> Day </Text>
                                        <TextInput style={[styles.defaultInput, regularFont]}
                                            onChangeText={text => { this.handleday(text) }}
                                            value={this.getday()}
                                        />
                                    </View>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}> Hour </Text>
                                        <TextInput style={[styles.defaultInput, regularFont]}
                                            onChangeText={text => { this.handlehour(text) }}
                                            value={this.gethour()}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>)

                } else {

                    return;
                }

            } else {
                return;
            }

        } else {
            return;
        }

    }
    getequipment() {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)

            return (myequipment.equipment)
        } else {
            return (this.state.equipment)
        }
    }

    getaccountid() {
        const construction = new Construction();
        if (this.state.activeequipmentid) {
            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
    
            return (myequipment.accountid)
        } else {
            return (this.state.accountid)
        }
    }

    handleaccountid(accountid) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        const account = construction.getaccountbyid.call(this,accountid)
        const accountname = account.accountname;
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                myuser.company.equipment.myequipment[i].accountid = accountid;
                this.props.reduxUser(myuser)
                this.setState({ accountname})

            } else {
                this.setState({ equipment })
                let equipmentid = makeID.equipmentid.call(this);
                let ownership = this.state.ownership;
                let equipment = this.state.equipment
                let newEquipment = CreateEquipment(equipmentid, equipment, ownership, accountid)
                if (myuser.company.hasOwnProperty("equipment")) {
                    myuser.company.equipment.myequipment.push(newEquipment);
                } else {
                    let equipment = { myequipment: [newEquipment] };
                    myuser.company.equipment = equipment;

                }
                this.props.reduxUser(myuser);
                this.setState({ activeequipmentid: equipmentid, accountname })
            }

        }
    }

    handleequipment(equipment) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                myuser.company.equipment.myequipment[i].equipment = equipment;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            } else {
                this.setState({ equipment })
                let equipmentid = makeID.equipmentid.call(this);
                let ownership = "";
                let accountid = this.state.accountid;
                let newEquipment = CreateEquipment(equipmentid, equipment, ownership, accountid)
                if (myuser.company.hasOwnProperty("equipment")) {
                    myuser.company.equipment.myequipment.push(newEquipment);
                } else {
                    let equipment = { myequipment: [newEquipment] };
                    myuser.company.equipment = equipment;

                }
                this.props.reduxUser(myuser);
                this.setState({ activeequipmentid: equipmentid })
            }

        }
    }
    handleownership(ownership) {

        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                myuser.company.equipment.myequipment[i].ownershipstatus = ownership;
                let newOwnership = CreateOwnwership(DateStringfromObj(this.state.purchasedate),this.state.loaninterest,DateStringfromObj(this.state.saledate),this.state.resalevalue)
                myuser.company.equipment.myequipment[i].ownership = newOwnership;
                
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            } else {
                this.setState({ equipment })
                let equipmentid = makeID.equipmentid.call(this);
                let equipment = this.state.equipment;
                let accountid = this.state.accountid;
                let newEquipment = CreateEquipment(equipmentid, equipment, ownership, accountid)
                let newOwnership = CreateOwnwership(DateStringfromObj(this.state.purchasedate),this.state.loaninterest,DateStringfromObj(this.state.saledate),this.state.resalevalue)
                newEquipment.ownership = newOwnership;
                if (myuser.company.hasOwnProperty("equipment")) {
                    myuser.company.equipment.myequipment.push(newEquipment);
                } else {
                    let equipment = { myequipment: [newEquipment] };
                    myuser.company.equipment = equipment;

                }
                this.props.reduxUser(myuser);
                this.setState({ activeequipmentid: equipmentid })
            }

        }
    }
    showactiveequipment() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const accountid = new AccountID();
        const regularFont = construction.getRegularFont.call(this)

        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    {accountid.showaccountid.call(this)}


                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.alignContentCenter]}>
                            <Text style={[regularFont, styles.alignCenter]}>Owned</Text>
                            <TouchableOpacity onPress={() => { this.handleownership('owned') }}>
                                {this.handleOwnedIcon()}
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.flex1, styles.alignContentCenter]}>
                            <Text style={[regularFont]}> Rented</Text>
                            <TouchableOpacity onPress={() => { this.handleownership('rented') }}>
                                {this.handleRentedIcon()}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>)
    }

    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this)
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const Equipment = () => {
            return(<View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.alignCenter]}>/{mycompany.url}/equipment</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}> Equipment </Text>
                            <TextInput style={[styles.defaultInput, styles.regularFont]}
                                onChangeText={text => { this.handleequipment(text) }}
                                value={this.getequipment()}
                            />
                        </View>
                    </View>


                    {this.showactiveequipment()}

                    {this.showequipmentids()}

                    {this.showequipmentownership()}

                    {this.ownershipdetail()}

                    {this.rentalrates()}

                    {construction.showsavecompany.call(this)}

                </View>
            </View>)
        }
        
        if (myuser) {
            return (Equipment())
        } else {
            return (construction.loginMessage.call(this, "Equipment"))
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

export default connect(mapStateToProps, actions)(Equipment)