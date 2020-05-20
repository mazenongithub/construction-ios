import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import AccountID from './accountid'
import { CreateBenefit } from './functions';
import MakeID from './makeids'
import {isNumeric} from './functions'


class Employees extends Component {
    constructor(props) {
        super(props)
        this.state = { render: '', accountname:'', activeemployeeid: '', activebenefitid: '', amount: "", accountid: '', benefit: '' }
    }
    makeemployeeactive(employeeid) {
        if (this.state.activeemployeeid === employeeid) {
            this.setState({ activeemployeeid: false })
        } else {
            this.setState({ activeemployeeid: employeeid })
        }
    }
    getworkinghours() {
        const construction = new Construction()
        if (this.state.activeemployeeid) {
            let employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
            return employee.workinghours;
        } else {
            return "";
        }

    }
    handleworkinghours(workinghours) {
        const construction = new Construction()
        let myuser = construction.getuser.call(this);
        if (myuser) {
            let employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid)
                myuser.company.office.employees.employee[i].workinghours = workinghours;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }
        }

    }

    handlebenefit(benefit) {
        
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activeemployeeid) {
                const employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
                let i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid)
                if (this.state.activebenefitid) {
                    let j = construction.getbenefitkeybyid.call(this, employee.providerid, this.state.activebenefitid);

                    myuser.company.office.employees.employee[i].benefits.benefit[j].benefit = benefit;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let benefitid = makeID.benefitid.call(this)
                    let amount = this.state.amount;
                    let accountid = this.state.accountid;
                    let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount);
                    if (employee.hasOwnProperty("benefits")) {
                        myuser.company.office.employees.employee[i].benefits.benefit.push(newBenefit)
                    } else {
                        let benefits = { benefit: [newBenefit] }
                        myuser.company.office.employees.employee[i].benefits = benefits;

                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activebenefitid: benefitid })
                }
            }

        }

    }

    getbenefit() {
        const construction = new Construction();
        if (this.state.activeemployeeid) {
            const employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
            if (this.state.activebenefitid) {
                let benefit = construction.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid);
                return (benefit.benefit)
            } else {
                return (this.state.benefit)
            }

        }
    }

    handleamount(amount) {
        if(isNumeric(amount)) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activeemployeeid) {
                const employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
                let i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid)
                if (this.state.activebenefitid) {
                    let j = construction.getbenefitkeybyid.call(this, employee.providerid, this.state.activebenefitid);

                    myuser.company.office.employees.employee[i].benefits.benefit[j].amount = amount;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let benefitid = makeID.benefitid.call(this)
                    let benefit = this.state.benefit;
                    let accountid = this.state.accountid;
                    let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount);
                    if (employee.hasOwnProperty("benefits")) {
                        myuser.company.office.employees.employee[i].benefits.benefit.push(newBenefit)
                    } else {
                        let benefits = { benefit: [newBenefit] }
                        myuser.company.office.employees.employee[i].benefits = benefits;

                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activebenefitid: benefitid })
                }
            }

        }

    } else {
        alert(`Benefit amount should be numeric`)
    }

    }

    getamount() {
        const construction = new Construction();
        if (this.state.activeemployeeid) {
            const employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
            if (this.state.activebenefitid) {
                let benefit = construction.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid);
                return (benefit.amount)
            } else {
                return (this.state.amount)
            }

        }
    }

    getaccountid() {
        const construction = new Construction();
        const styles = MyStylesheet();
        if (this.state.activeemployeeid) {
            const employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
            if (this.state.activebenefitid) {
                let benefit = construction.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid);
                
                return (benefit.accountid)
            } else {
                return;
            }
    
        }
    }

    handleaccountid(accountid) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        const account = construction.getaccountbyid.call(this,accountid)
        const accountname = account.accountname;
        if (myuser) {
            if (this.state.activeemployeeid) {
                const employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
                let i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid)
                if (this.state.activebenefitid) {
                    let j = construction.getbenefitkeybyid.call(this, employee.providerid, this.state.activebenefitid);

                    myuser.company.office.employees.employee[i].benefits.benefit[j].accountid = accountid;
                    this.props.reduxUser(myuser)
                    this.setState({ accountname })
                } else {
                    let benefitid = makeID.benefitid.call(this)
                    let benefit = this.state.benefit;
                    let amount = this.state.amount;
                    let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount);
                    if (employee.hasOwnProperty("benefits")) {
                        myuser.company.office.employees.employee[i].benefits.benefit.push(newBenefit)
                    } else {
                        let benefits = { benefit: [newBenefit] }
                        myuser.company.office.employees.employee[i].benefits = benefits;

                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activebenefitid: benefitid, accountname})
                }
            }

        }

    }
    accountidindex(benefitid) {

        const construction = new Construction();
        if (this.state.activeemployeeid) {
            const myemployee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
            const benefit = construction.getbenefitbyid.call(this, myemployee.providerid, benefitid)
            const accountid = benefit.accountid;
            let i = 0
            if (accountid) {
                i = construction.getaccountkeybyid.call(this, accountid)
            }

        }

    }


    showemployee(employee) {
        const construction = new Construction();
        const styles = MyStylesheet();
        const removeIconSize = construction.getremoveicon.call(this)
        const profileDimension = construction.getprofileDimension.call(this)
        const myemployee = construction.getemployeebyproviderid.call(this, employee.providerid)
        const menu = construction.getnavigation.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const activeBackground = () => {
            if (employee.providerid === this.state.activeemployeeid) {
                return styles.activeBackground;
            } else {
                return;
            }
        }
        const profileImage = () => {

            if (myemployee.profileurl) {
                return (<Image
                    resizeMethod='scale'
                    style={[profileDimension, styles.showBorder]}
                    source={{ uri: `${myemployee.profileurl}` }} />)
            } else {
                return;
            }
        }
        const detail = () => {

            return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>
                <Text style={[regularFont, styles.alignCenter, activeBackground()]} onPress={() => { this.makeemployeeactive(employee.providerid) }}>/{myemployee.profile}</Text>
                    <Text style={[regularFont, styles.alignCenter, activeBackground()]} onPress={() => { this.makeemployeeactive(employee.providerid) }}>{myemployee.firstname} {myemployee.lastname}</Text>
                </View>
            </View>)
        

    }
    return(
            <View style = { [styles.generalFlex, styles.bottomMargin10]} key = { employee.providerid } >
            <View style={[styles.flex1]}>

                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { this.makeemployeeactive(employee.providerid) }}>
                            {profileImage()}
                        </TouchableOpacity>
                    </View>
                </View>

                {detail()}



            </View>
            </View>
        )
    }
showmyemployees() {
    const construction = new Construction();
    const employees = construction.getmyemployees.call(this)
    let myemployee = [];
    if (employees) {
        employees.map(employee => {
            myemployee.push(this.showemployee(employee))
        })
    }
    return myemployee;
}
handlemanager(type) {
    const construction = new Construction();
    const myuser = construction.getuser.call(this);
    if (myuser) {
        if (this.state.activeemployeeid) {
            const i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid);
            switch (type) {
                case "check":
                    myuser.company.office.employees.employee[i].manager = '';
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                    break;
                case "empty":
                    myuser.company.office.employees.employee[i].manager = 'manager';
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                    break;
                default:
                    break;
            }

        }
    }
}
makebenefitactive(benefitid) {
    const construction = new Construction();
    const providerid = this.state.activeemployeeid;
    const benefit = construction.getbenefitbyid.call(this,providerid, benefitid)
    const accountid = benefit.accountid;
    const account = construction.getaccountbyid.call(this,accountid)
    const accountname = account.accountname;
    if (this.state.activebenefitid === benefitid) {
        this.setState({ activebenefitid: false, accountname:'' })

    } else {
        this.setState({ activebenefitid: benefitid, accountname})
    }
}
showemployeebenefit(benefit) {
    const construction = new Construction();
    const menu = construction.getnavigation.call(this)
    const removeIconSize = construction.getremoveicon.call(this)
    const account = construction.getaccountbyid.call(this, benefit.accountid)
    const regularFont = construction.getRegularFont.call(this)
    const styles = MyStylesheet();
    if (menu.open) {
        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]} key={benefit.benefitid}>
                <View style={[styles.flex1, styles.flexDirection]}>
                    <Text style={[regularFont]} onPress={() => { this.makebenefitactive(benefit.benefitid) }}>{benefit.benefit}  Account: {account.accountname} Amount: {benefit.amount}</Text>
                    <Image source={require('./png/removeIcon.png')}
                        style={removeIconSize}
                        resizeMethod='scale'
                    />

                </View>
            </View>)
    } else {
        return (<View style={[styles.generalFlex]} key={benefit.benefitid}>
            <View style={[styles.flex4]}>
                <Text style={[regularFont]}> {benefit.benefit}  Account:  {account.account} {account.accountname} Amount: {benefit.amount}</Text>
            </View>
            <View style={[styles.flex1]}>
                <Image source={require('./png/removeIcon.png')}
                    style={removeIconSize}
                    resizeMethod='scale'
                />

            </View>
        </View>)
    }
}
showactiveemployeebenefits() {
    const construction = new Construction();
    let employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
    let benefits = [];
    if (employee) {
        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.benefit.map(benefit => {
                benefits.push(this.showemployeebenefit(benefit))
            })

        }
    }
    return benefits;
}

render() {
    const construction = new Construction();
    const styles = MyStylesheet();
    const myuser = construction.getuser.call(this)
    const menu = construction.getnavigation.call(this)
    const regularFont = construction.getRegularFont.call(this)
    const headerFont = construction.getHeaderFont.call(this)
    const accountid = new AccountID()
    const amount = this.getamount()
    const flatlistcontainer = () => {
        return ({ maxHeight: 90 })
    }
    const checkIcon = () => {


        return ({ width: 112, height: 76 })

    }
    const manager = () => {
        if (this.state.activeemployeeid) {
            let employeeid = this.state.activeemployeeid;
            const employee = construction.getemployeebyid.call(this, employeeid);
            if (employee) {
                if (employee.manager === 'manager') {
                    return (
                        <TouchableOpacity onPress={() => { this.handlemanager("check") }}>
                            <Image source={require('./png/managercheck.png')}
                                style={checkIcon()}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>)
                } else {
                    return (
                        <TouchableOpacity onPress={() => { this.handlemanager("empty") }}>
                            <Image source={require('./png/emptybox.png')}
                                style={checkIcon()}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>)
                }

            }
        }
    }
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
                                    onChangeText={text => { this.handleworkinghours(text) }} />
                            </View>

                        </View>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <Text style={[regularFont]}>Manager</Text>
                                {manager()}
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
                            onChangeText={text => { this.handleworkinghours(text) }}
                        />
                    </View>

                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <Text style={[regularFont, styles.alignCenter]}>Manager</Text>
                        {manager()}
                    </View>

                </View>


            )

        }
    }
    const hourlyrate = () => {
        const construction = new Construction();
        let hourlyrate = 0;
        if(this.state.activeemployeeid) {
            const myuser = construction.getemployeebyproviderid.call(this,this.state.activeemployeeid)
            hourlyrate = construction.gethourlyrate.call(this,this.state.activeemployeeid)
            return(<Text style={[regularFont, styles.alignCenter]}>{myuser.firstname} {myuser.lastname}'s hourly rate ${hourlyrate.toFixed(2)}</Text>)
        }
    }

    const activeemployee = () => {
        if (this.state.activeemployeeid) {


            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[styles.alignCenter, headerFont]}>Employee, Wage Rate, and Benefits</Text>
                            </View>
                        </View>

                        {workinghours()}

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[headerFont]}> Benefits</Text>
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont]}> Benefit</Text>
                                <TextInput style={[styles.defaultInput, regularFont]}
                                    value={this.getbenefit()}
                                    onChangeText={text => { this.handlebenefit(text) }}
                                />
                            </View>
                        </View>

                     
                        {accountid.showaccountid.call(this)}
                           

                        <View style={[styles.generalFlex, styles.bottomMargin10, styles.topMargin15]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont]}> Amount Per Year</Text>
                                <TextInput style={[styles.defaultInput, regularFont]}
                                    value={amount}
                                    onChangeText={text => { this.handleamount(text) }}
                                />
                            </View>
                        </View>

                        {this.showactiveemployeebenefits()}

                        {hourlyrate()}
                    </View>
                </View>)

        } else {
            return;
        }

    }
    const Employee = () => {
        return( <View style={[styles.generalFlex]}>
            <View style={[styles.flex1]}>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[styles.alignCenter, headerFont, styles.boldFont]}>{myuser.company.url}/employees</Text>
                    </View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[styles.alignCenter, headerFont]}>My Employees</Text>
                    </View>
                </View>

                {this.showmyemployees()}

                {activeemployee()}

                {construction.showsavecompany.call(this)}



            </View>
        </View>)
    }
    if(myuser) {
        return(Employee())
    } else {
        return (construction.loginMessage.call(this,"employees"))
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

export default connect(mapStateToProps, actions)(Employees)