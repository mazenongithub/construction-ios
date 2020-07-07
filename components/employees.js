import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
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
            const checkmanager = construction.checkmanager.call(this);
            if(checkmanager) {
            let employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid)
                myuser.company.office.employees.employee[i].workinghours = workinghours;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }

        } else {
            alert(`Only Managers can change working hours `)
        }
        }

    }

    handlebenefit(benefit) {
        
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            const checkmanager = construction.checkmanager.call(this);
            if(checkmanager) {
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

        } else {
            alert(`Only Managers can update benefits`)
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
            const checkmanager = construction.checkmanager.call(this);
            if(checkmanager) {
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

        } else {
            alert(`Only managers can modify amount `)
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
            const checkmanager = construction.checkmanager.call(this)
            if(checkmanager) {
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

        } else {
            alert(`Only Managers can modify accountid`)
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
        const myemployee = construction.getemployeebyid.call(this, employee.providerid)
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
    const checkmanager = construction.checkmanager.call(this);
    const myuser = construction.getuser.call(this)
    if (employees) {
        employees.map(employee => {
            if(checkmanager || myuser.providerid === employee.providerid ) {
            myemployee.push(this.showemployee(employee))
            }
        })
    }
    return myemployee;
}

handleactive(type) {

    const construction = new Construction();
    const myuser = construction.getuser.call(this)
    const checkmanager = construction.checkmanager.call(this)
    if (checkmanager) {
        if (myuser) {
            if (this.state.activeemployeeid) {
                const employee = construction.getemployeebyid.call(this, this.state.activeemployeeid)
                if (employee) {
                    const i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid);
                    switch (type) {
                        case "not-active":
                            if (employee.manager) {
                                const validate = construction.validateremovemanager.call(this, this.state.activeemployeeid)
                                if (validate) {
                                    if (myuser.providerid !== this.state.activeemployeeid) {
                                        myuser.company.office.employees.employee[i].active = 'not-active';
                                        this.props.reduxUser(myuser);
                                        this.setState({ render: 'render' })
                                    } else {
                                        alert(`You cannot make yourself unactive, you won't be able to undo this `)
                                    }
                                } else {
                                    alert(`There needs to be atleast one active manager in the company `)
                                }

                            }
                            else {
                                myuser.company.office.employees.employee[i].active = 'not-active';
                                this.props.reduxUser(myuser);
                                this.setState({ render: 'render' })
                            }
                            break;
                        case "active":
                            myuser.company.office.employees.employee[i].active = 'active';
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                            break;
                        default:
                            break;
                    }

                }

            }
        }

    } else {
        alert(`Only managers can access this function `)
    }
}


handlemanager(type) {
    const construction = new Construction();
    const myuser = construction.getuser.call(this);
    const checkmanager = construction.checkmanager.call(this);
    if (checkmanager) {
        if (myuser) {
            if (this.state.activeemployeeid) {
                const i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid);
                switch (type) {
                    case "check":
                        if (construction.validateremovemanager.call(this, this.state.activeemployeeid)) {

                            if (myuser.providerid !== this.state.activeemployeeid) {


                                myuser.company.office.employees.employee[i].manager = '';
                                myuser.company.office.employees.employee[i].active = 'not-active';
                                this.props.reduxUser(myuser);
                                this.setState({ render: 'render' })


                            } else {

                                alert(`You cannot unset yourself as Manager, you won't be able to undo this `)

                            }
                        } else {
                            alert(`There needs to be atleast one manager in your company `)
                        }
                        break;
                    case "empty":
                        myuser.company.office.employees.employee[i].manager = 'manager';
                        myuser.company.office.employees.employee[i].active = 'active';
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                        break;
                    default:
                        break;
                }

            }
        }

    } else {
        alert(`Only Managers can access this function `)
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

confirmremovebeneftbyid(benefit) {
    Alert.alert(
        'Remove Benefit',
        `Are you sure you want to remove ${benefit.benefit}?`,
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Benefit '), style: 'cancel' },
            { text: 'OK', onPress: () => { this.removebenefitbyid(benefit) } },
        ],
        { cancelable: false }
    )
}

removebenefitbyid(benefit) {
 
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        if (myuser) {
            if(this.state.activeemployeeid) {
            const myemployee = construction.getemployeebyid.call(this,this.state.activeemployeeid)
                if(myemployee) {
            const i = construction.getemployeekeybyid.call(this, this.state.activeemployeeid)
                    const mybenefit = construction.getbenefitbyid.call(this,myemployee.providerid, benefit.benefitid);
                    if(mybenefit) {
            const j = construction.getbenefitkeybyid.call(this,myemployee.providerid,benefit.benefitid)
            myuser.company.office.employees.employee[i].benefits.benefit.splice(j, 1)
            if (myuser.company.office.employees.employee[i].benefits.benefit.length === 0) {
                delete myuser.company.office.employees.employee[i].benefits.benefit
                delete myuser.company.office.employees.employee[i].benefits;
            }

        }
            this.setState({ activebenefitid: false })

        

        }

        }
        }
    
}
showemployeebenefit(benefit) {
    const construction = new Construction();
    const menu = construction.getnavigation.call(this)
    const removeIconSize = construction.getremoveicon.call(this)
    const account = construction.getaccountbyid.call(this, benefit.accountid)
    const regularFont = construction.getRegularFont.call(this)
    const styles = MyStylesheet();
    const checkmanager = construction.checkmanager.call(this)
    const activebackground = () => {
        if(this.state.activebenefitid === benefit.benefitid) {
            return styles.activeBackground;
        }
    }
    const remove = () => {
        if(checkmanager) {
            return( 
            <TouchableOpacity onPress={()=>{this.confirmremovebeneftbyid(benefit)}}>
            <Image source={require('./png/removeIcon.png')}
            style={removeIconSize}
            resizeMethod='scale'
        />
        </TouchableOpacity>)
        }
    }
    if (menu.open) {
        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]} key={benefit.benefitid}>
                <View style={[styles.flex1, styles.flexDirection]}>
                    <Text style={[regularFont, activebackground()]} onPress={() => { this.makebenefitactive(benefit.benefitid) }}>{benefit.benefit}  Account: {account.accountname} Amount: {benefit.amount}</Text>
                   {remove()}

                </View>
            </View>)
    } else {
        return (<View style={[styles.generalFlex]} key={benefit.benefitid}>
            <View style={[styles.flex4]}>
                <Text style={[regularFont, activebackground()]}  onPress={() => { this.makebenefitactive(benefit.benefitid) }}> {benefit.benefit}  Account:  {account.account} {account.accountname} Amount: {benefit.amount}</Text>
            </View>
            <View style={[styles.flex1]}>
                {remove()}

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
    const active = () => {
        if (this.state.activeemployeeid) {
            let employeeid = this.state.activeemployeeid;
            const employee = construction.getemployeebyid.call(this, employeeid);
            if (employee) {
                if (employee.active === 'active') {
                    return (
                        <TouchableOpacity onPress={() => { this.handleactive("not-active") }}>
                            <Image source={require('./png/managercheck.png')}
                                style={checkIcon()}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>)
                } else {
                    return (
                        <TouchableOpacity onPress={() => { this.handleactive("active") }}>
                            <Image source={require('./png/emptybox.png')}
                                style={checkIcon()}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>)
                }
    
            }
        }
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

                      

                    </View>

                </View>
            )

    }

    const activemenu = () => {
        if (menu.open) {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin15]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                            <Text style={[regularFont, styles.alignCenter]}>Manager</Text>
                                {manager()}
                            </View>

                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin15]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <Text style={[regularFont]}>Active</Text>
                                {active()}
                            </View>

                        </View>

                    </View>

                </View>
            )

        } else {
            return (

                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
                    <Text style={[regularFont, styles.alignCenter]}>Manager</Text>
                        {manager()}
                    </View>

                    <View style={[styles.flex1, styles.alignContentCenter]}>
                       

                        <Text style={[regularFont]}>Active</Text>
                                {active()}
                    </View>

                </View>


            )

        }
    }

    const hourlyrate = () => {
        const construction = new Construction();
        
        let hourlyrate = 0;
        if(this.state.activeemployeeid) {
            const employee = construction.getemployeebyid.call(this,this.state.activeemployeeid)
          
            hourlyrate = construction.gethourlyrate.call(this,this.state.activeemployeeid)
            return(<Text style={[regularFont, styles.alignCenter]}>{employee.firstname} {employee.lastname}'s hourly rate ${hourlyrate.toFixed(2)}</Text>)
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
                        {activemenu()}

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
        const checkactive = construction.checkactive.call(this)
        if(checkactive) {
        return(Employee())
        } else {
            return(<Text style={[regularFont]}>You have to be active to view Employee Component </Text>)
        }
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