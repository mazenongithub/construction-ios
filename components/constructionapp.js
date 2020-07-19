import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Login from './login';
import Register from './register';
import Profile from './profile'
import Company from './company'
import Employees from './employees'
import Equipment from './equipment'
import Materials from './materials'
import Accounts from './accounts'
import Specifications from './specifications';
import Specification from './specification';
import { CheckUserLogin, LogoutUser, StripeDashboard, LoadCSIs } from './actions/api';
import { returnCompanyList } from './functions';
import Construction from './construction'
import Project from './project';
import Schedule from './schedule';
import Actual from './actual';
import Proposals from './proposals';
import ViewProposal from './viewproposal';
import Invoices from './invoices'
import ViewInvoice from './viewinvoice'
import ProposalLineItem from './proposallineitem';
import InvoiceLineItem from './invoicelineitem'
import BidSchedule from './bidschedule'
import Bid from './bid'
import BidScheduleLineItem from './bidschedulelineitem'
import BidLineItem from './bidlineitem'
import Landing from './landing';
import ViewAccount from './viewaccount';
import CostEstimate from './costestimate';


class ConstructionApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeimage: 'main_slide', message: '', render: '', width: 0, height: 0, open: true, activeproposalid: false, activeinvoiceid: false, message: '', profile: '',
            profilecheck: '', emailaddress: '', emailaddresscheck: false, firstname: '', lastname: '', clientid: '', client: '', updated: new Date(), approved: '',
            password: '', passwordcheck: false, showlabor:true,showmaterials:true,showequipment:true
        }
        this.updatedimesions = this.updatedimesions.bind(this)
    }
    componentDidMount() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
        Dimensions.addEventListener('change', this.updatedimesions)
        this.props.reduxNavigation({ open: true })
        this.checkuser();
        this.loadcsis();

    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updatedimesions)
    }
    updatedimesions() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
    }

    async loadcsis() {
        try {
            let response = await LoadCSIs();
            if (response.hasOwnProperty("csis")) {
                this.props.reduxCSIs(response.csis);

            }

        } catch (err) {
            alert(err)
        }
    }

    async logoutuser() {
        try {


            let response = await LogoutUser();
            console.log(response)
            if (response.hasOwnProperty("message")) {
                this.props.reduxUser(response)
            }
        } catch (err) {
            alert(err)
        }

    }
    async checkuser() {
        try {

            let response = await CheckUserLogin();
            //console.log("CHECKUSER", response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);

            }
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)
            }


        } catch (err) {
            alert(err)
        }
    }
    handlemenu() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        if (menu.open) {
            menu.open = false;
        } else {
            menu.open = true
        }

        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }
    updatestate() {
        this.setState({ render: 'render' })
    }
    showmainbody() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const project = new Project();
        const proposals = new Proposals();
        const viewproposal = new ViewProposal();
        const viewinvoice = new ViewInvoice();
        const invoices = new Invoices();
        const proposallineitem = new ProposalLineItem();
        const invoicelineitem = new InvoiceLineItem();
        const bidschedule = new BidSchedule();
        const bid = new Bid()
        const bidschedulelineitem = new BidScheduleLineItem();
        const bidlineitem = new BidLineItem();
        const login = new Login();
        const register = new Register();
        const profile = new Profile();
        const landing = new Landing();
        const accounts = new Accounts();
        const viewaccount = new ViewAccount();
        const specifications = new Specifications();
        const specification = new Specification();
        const costestimate = new CostEstimate();

        switch (menu.main) {
            case 'register':
                return (register.showregister.call(this));
                break;
            case 'login':
                return (login.showlogin.call(this));
                break;
            case 'profile':
                return (profile.showmyprofile.call(this));
                break;
            case 'company':
                return (<Company update={this.updatestate.bind(this)} />);
                break;
            case 'employees':
                return (<Employees update={this.updatestate.bind(this)} />);
                break;
            case 'equipment':
                return (<Equipment update={this.updatestate.bind(this)} />);
                break;
            case 'materials':
                return (<Materials update={this.updatestate.bind(this)} />);
                break;
            case 'accounts':
                return (accounts.showaccounts.call(this));
                break;
            case 'viewaccount':
                return (viewaccount.showaccount.call(this));
                break;
            case 'project':
                return (project.showproject.call(this));
                break;
            case 'costestimate':
                return (costestimate.showestimate.call(this));
                break;
            case 'schedule':
                return (<Schedule update={this.updatestate.bind(this)} />);
                break;
            case 'actual':
                return (<Actual update={this.updatestate.bind(this)} />);
                break;
            case 'proposals':
                return (proposals.showproposals.call(this));
                break;
            case 'viewproposal':
                return (viewproposal.showproposal.call(this));
                break;
            case 'invoices':
                return (invoices.showinvoices.call(this));
                break;
            case 'viewinvoice':
                return (viewinvoice.showinvoice.call(this));
                break;
            case "proposallineitem":
                return (proposallineitem.showproposallineitem.call(this))
                break;
            case "invoicelineitem":
                return (invoicelineitem.showinvoicelineitem.call(this))
                break;
            case "bidschedule":
                return (bidschedule.showbidschedule.call(this))
                break;
            case "bid":
                return (bid.showbid.call(this));
                break;
            case "bidschedulelineitem":
                return (bidschedulelineitem.showbidschedulelineitem.call(this))
                break;
            case "bidlineitem":
                return (bidlineitem.showbidlineitem.call(this))
                break;
            case "specifications":
                return (specifications.getspecifications.call(this));
            case "specification":
                return (specification.getspecification.call(this))
            case "landing":
                return (landing.showlanding.call(this));
                break;
            default:
                return (landing.showlanding.call(this));
                break
        }
    }
    handlelogin() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "login";
        this.props.reduxNavigation(menu)
        this.setState({ profilecheck: true, message: '', emailaddress: '', emailaddresscheck: false, password: '', passwordcheck: false, profile: '', profilecheck: false })
    }
    handleregister() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "register";
        this.props.reduxNavigation(menu)
        this.setState({ profilecheck: true, message: '', emailaddress: '', emailaddresscheck: false, password: '', passwordcheck: false, profile: '', profilecheck: false })
    }
    handleprofile() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "profile";
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }
    handlecompany() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "company";
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }
    handleemployees() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "employees";
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }

    handleequipment() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "equipment";
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }
    handlematerials() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "materials";
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }

    handleaccounts() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "accounts";
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }
    handlelanding() {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "landing";
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }


    handleviewproposal(proposalid) {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "viewproposal";
        const myproject = construction.getactiveproject.call(this)
        myproject.proposalid = proposalid;
        this.props.reduxProject(myproject)
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }
    handleproposallineitem(csiid) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        menu.main = 'proposallineitem'
        const project = construction.getactiveproject.call(this)
        project.proposal = { csiid }
        this.props.reduxNavigation(menu)
        this.props.reduxProject(project)
        this.setState({ render: 'render' })
    }
    handlebidschedulelineitem(csiid) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        menu.main = 'bidschedulelineitem'
        const project = construction.getactiveproject.call(this)
        project.bidschedule = { csiid }
        this.props.reduxNavigation(menu)
        this.props.reduxProject(project)
        this.setState({ render: 'render' })
    }
    async handleviewaccount(accountid) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            const providerid = myuser.providerid;
            let menu = construction.getnavigation.call(this);
            menu.main = "viewaccount";
            let myproject = construction.getactiveproject.call(this)
            if (myproject) {
                myproject.accountid = accountid;
            } else {
                myproject = {}
            }

            myproject.accountid = accountid;
            const account = construction.getaccountbyid.call(this, accountid);
            if (account.stripe) {
                let stripeurl = await StripeDashboard(providerid, account.stripe)
                console.log("STRIPEURL", stripeurl)
                const i = construction.getaccountkeybyid.call(this, accountid)
                if (stripeurl.url) {
                    myuser.company.office.accounts.account[i].stripedashboard = stripeurl.url;
                    this.props.reduxUser(myuser)

                }
            }
            this.props.reduxProject(myproject)
            this.props.reduxNavigation(menu)
            this.setState({ render: 'render' })

        }
    }
    handleviewinvoice(invoiceid) {
        const construction = new Construction();
        let menu = construction.getnavigation.call(this);
        menu.main = "viewinvoice";
        const myproject = construction.getactiveproject.call(this)
        myproject.invoiceid = invoiceid;
        this.props.reduxProject(myproject)
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })
    }
    handleinvoicelineitem(csiid) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        menu.main = 'invoicelineitem'
        const project = construction.getactiveproject.call(this)
        project.invoice = { csiid }
        this.props.reduxNavigation(menu)
        this.props.reduxProject(project)
        this.setState({ render: 'render' })
    }

    handlespecification(csiid) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'specification'
        const project = construction.getactiveproject.call(this)
        project.specifications = { csiid }
        this.props.reduxNavigation(menu);
        this.props.reduxProject(project)
        this.setState({ render: 'render' })

    }
    handlebidlineitem(csiid) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        menu.main = 'bidlineitem'
        const project = construction.getactiveproject.call(this)
        project.bid = { csiid }
        this.props.reduxNavigation(menu)
        this.props.reduxProject(project)
        this.setState({ render: 'render' })
    }
    makeprojectactive(projectid) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'project'
        this.props.reduxNavigation(menu)
        this.props.reduxProject({ projectid });
        this.setState({ render: 'render' })

    }
    handleschedule() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'schedule'
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })

    }
    handleactual() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'actual'
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })

    }
    handlecostestimate() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'costestimate'
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })

    }



    handleinvoices() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'invoices'
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })

    }
    handleproposals() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'proposals'
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })

    }
    handlespecifications() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'specifications'
        this.props.reduxNavigation(menu);
        this.setState({ render: 'render' })

    }
    handlebidschedule() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'bidschedule'
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })

    }
    handlebid() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        menu.main = 'bid'
        this.props.reduxNavigation(menu)
        this.setState({ render: 'render' })

    }
    getprojectlinks() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const myprojects = construction.getmyprojects.call(this);
        const projectlinks = [];
        const regularFont = construction.getRegularFont.call(this)
        if (myprojects) {
            myprojects.map(project => {
                projectlinks.push(<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.makeprojectactive(project.projectid) }} key={project.projectid}>/{project.title}</Text>)

            })
        }
        return projectlinks;
    }
    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const menu = construction.getnavigation.call(this)
        const headerFont = construction.getHeaderFont.call(this);
        const checkmanager =construction.checkmanager.call(this);
        const regularFont = construction.getRegularFont.call(this);
        const checkactive = construction.checkactive.call(this)
        const getWidth = () => {
            console.log("DIMENSIONS", this.state.width, this.state.height)
        }
        const getMinHeight = () => {
            return ({ minHeight: Dimensions.get('window').height + 200 })
        }

        const refreshIcon = () => {
            if (this.state.width > 400) {
                return ({ width: 58, height: 54 })
            } else {
                return ({ width: 49, height: 46 })
            }
        }

        const mainBody = () => {

            const closed_1 = () => {
                if (myuser) {
                    return (<Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handleprofile() }}>  /{myuser.profile} </Text>)
                } else {
                    return (<Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handlelanding() }}>  / </Text>)
                }

            }
            const refresh = () => {

                return (<TouchableOpacity onPress={() => { this.checkuser() }}>
                    <Image source={require('./png/refreshIcon.png')}
                        resizeMethod='scale'
                        style={refreshIcon()}
                    /></TouchableOpacity>)

            }
            const open_1 = () => {
                if (myuser) {
                    return (<Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handleprofile() }}>  /{myuser.providerid} </Text>)
                } else {
                    return (<Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handlelanding() }}>  / </Text>)
                }

            }
            const accounts =() => {
                if(checkmanager) {
                    return( <Text style={[styles.alignCenter, regularFont]} onPress={() => this.handleaccounts()}>  /accounts</Text>)
                }
            }

            const equipment =() => {
                if(checkmanager) {
                    return( <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handleequipment() }}>  /equipment</Text>)
                }
            }

            const materials =() => {
                if(checkmanager) {
                    return(    <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handlematerials() }}>  /materials</Text>)
                }
            }
            const companylinks = () => {
                const menu = construction.getnavigation.call(this)
                const regularFont = construction.getRegularFont.call(this)
                if (myuser && menu.open) {
                    if (myuser.hasOwnProperty("company")) {
                        return (
                            <View>
                                <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handleemployees() }}>  /employees</Text>
                               {accounts()}
                               {equipment()}
                               {materials()}
                            </View>)
                    }
                }
            }
            const company = () => {
                if(myuser) {
                if(myuser.hasOwnProperty("company")) {
                    return(`/${myuser.company.url}`)
                } else {
                    return ("company")
                }
            }
            }
            const open_2 = () => {
                if (myuser) {
                    return (
                        <View>
                            <Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handlecompany() }}>  {company()} </Text>
                            {companylinks()}
                        </View>
                    )
                } else {
                    return (<Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handleregister() }}>  /register </Text>)
                }

            }


            const closed_3 = () => {
                if (myuser) {
                    return (  <View style={[styles.flex1, styles.showBorder, styles.minHeight30, styles.navContainer, styles.margin5]}><Text style={[styles.alignCenter, headerFont]} onPress={() => { this.logoutuser() }}>  /logout </Text></View>)
                } else {
                    return ( <View style={[styles.flex1, styles.showBorder, styles.minHeight30, styles.navContainer, styles.margin5]}>
                                <Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handlelogin() }}>/login</Text>
                            </View>)
                }

            }


            const open_3 = () => {
                if (myuser) {
                   if(checkactive) {
                    return (
                        <View style={[styles.minHeight30, styles.showBorder, styles.navContainer, styles.alignCenter, headerFont, styles.margin5]}>
                            <Text style={[styles.alignCenter, headerFont]}>  /projects  </Text>
                            {this.getprojectlinks()}
                        </View>)
                   }
                } else {
                    return (
                        <View style={[styles.minHeight30, styles.showBorder, styles.navContainer]}> 
                        <Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handlelogin() }}>/login</Text></View>
                    )
                }

            }

            const open_4 = () => {
                if (myuser) {
                    return (<View style={[styles.minHeight30, styles.showBorder, styles.navContainer, styles.margin5]}>
                        <Text style={[styles.alignCenter, headerFont]} onPress={() => { this.logoutuser() }}>  /logout </Text>
                    </View>)
                } else {

                }
            }
            const open_5 = () => {
                if (myuser) {
                    return (<Text style={[styles.alignCenter, headerFont]} onPress={() => { this.handleprofile() }}>  /{myuser.providerid} </Text>)
                } else {
                    return (<Text style={[styles.alignCenter, headerFont]}>  / </Text>)
                }
            }
            const proposals = () => {
                if(checkmanager) {
                    return( <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handleproposals() }}> /proposals</Text>)
                }
            }

            const bidschedule = () => {
                if(checkmanager) {
                    return(    <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handlebidschedule() }}> /bidschedule</Text>)
                }
            }

            const invoices = () => {
                if(checkmanager) {
                    return( <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handleinvoices() }}>/invoices</Text>)
                }
            }

            const bid = () => {
                if(checkmanager) {
                    return(<Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handlebid() }}>/bid</Text>)
                }
            }
            const open_6 = () => {
                const regularFont = construction.getRegularFont.call(this)
                const projectid = construction.getactiveprojectid.call(this)
                if (projectid) {
                    const myproject = construction.getprojectbyid.call(this, projectid)
                    if (myproject) {
                        return (
                            <View style={[styles.minHeight30, styles.showBorder, styles.navContainer, styles.margin5, styles.bottomMargin10, styles.paddingTopBottom10]}>
                                <Text style={[styles.alignCenter, headerFont]} onPress={() => { this.makeprojectactive(myproject.projectid) }}>/{myproject.title}</Text>

                                <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handleschedule() }}>/schedule</Text>
                               {proposals()}
                               {bidschedule()}
                             
                                <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handleactual() }}>/actual</Text>
                               {invoices()}
                               {bid()}
                               
                                <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handlespecifications() }}>/specifications</Text>
                                <Text style={[styles.alignCenter, regularFont]} onPress={() => { this.handlecostestimate() }}>/estimate</Text>
                            </View>)
                    }
                }
            }
            const menuopen = () => {
                if (menu.open) {
                    return (<View style={[styles.flex1, styles.showBorder, getMinHeight(), styles.navOpenMenu]}>
                        <View style={[styles.minHeight30, styles.showBorder, styles.navContainer, styles.margin5, styles.alignContentCenter]}>
                            {refresh()}
                        </View>
                        <View style={[styles.minHeight30, styles.showBorder, styles.navContainer, styles.margin5]}>
                            {open_1()}
                        </View>
                        <View style={[styles.minHeight30, styles.showBorder, styles.navContainer, styles.alignCenter, headerFont, styles.margin5, styles.paddingTopBottom10]}>
                            {open_2()}
                        </View>
                        
                            {open_3()}
                     
                        {open_6()}
                        {open_4()}



                    </View>)
                }
            }
            const topmenu = () => {
                if (menu.open) {
                    return (<View style={[styles.minHeight30, styles.showBorder, styles.navContainer, styles.alignCenter, headerFont, styles.margin5]}>
                        {open_5()}
                    </View>)
                } else {
                    return (<View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder, styles.minHeight30, styles.navContainer, styles.margin5]}>

                            {closed_1()}
                        </View>
                        <View style={[styles.flex1, styles.showBorder, styles.minHeight30, styles.navContainer, styles.margin5]}>
                            {open_2()}

                        </View>
                      
                            {closed_3()}
                       

                    </View>)
                }
            }

            return (
                <View style={[styles.generalFlex]}>
                    {menuopen()}
                    <View style={[styles.flex1]}>
                        {topmenu()}

                        {this.showmainbody()}

                    </View>

                </View>)

        }
        const mainIcon = () => {
            let width = 0.27 * Number(this.state.width)
            height = 0.76 * width;
            return ({ width: Math.round(width), height: Math.round(height) })

        }
        const mainLogo = () => {
            let width = 0.72 * Number(this.state.width)
            let height = .29 * width
            return ({ width: Math.round(width), height: Math.round(height) })

        }
        return (
            <View style={[styles.generalFlex, styles.topMargin35, styles.leftMargin5]}>

                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>

                        <View style={[styles.flex1, styles.navHeight]}>
                            <TouchableOpacity onPress={() => { this.handlemenu() }}>
                                <Image source={require('./png/icon.png')}
                                    resizeMethod='scale'
                                    style={mainIcon()}
                                />

                            </TouchableOpacity>

                        </View>
                        <View style={[styles.flex3, styles.navHeight, styles.alignContentCenter]}>

                            <Image source={require('./png/logo.png')}
                                resizeMethod='scale'
                                style={[mainLogo(), styles.leftMargin10]}
                            />
                        </View>
                    </View>
                    <ScrollView>
                        {mainBody()}
                        <View style={{ height: Dimensions.get('window').height }}>
                            {getWidth()}
                        </View>
                    </ScrollView>

                </View>
            </View>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(ConstructionApp)