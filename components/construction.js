import React from 'react';
import { Dimensions, View, TouchableOpacity, Image, Text } from 'react-native';
import { MyStylesheet } from './styles';
import { checkemptyobject,calculateday, calculatemonth, calculateyear, getScale, calculateFloat, getDateInterval, sorttimes, inputUTCStringForLaborID, returnCompanyList, CreateUser, getEquipmentRentalObj, calculatetotalhours, AmmortizeFactor, calculateTotalMonths, FutureCostPresent, isNumeric, UTCTimefromCurrentDate, sortpart, getDateTime } from './functions'
import * as AppleAuthentication from 'expo-apple-authentication';
import { SaveCompany, SaveProfile, SaveProject, AppleLogin, LoadAllUsers } from './actions/api'


class Construction {

    getbuttonheight() {
        if (this.state.width > 1200) {
            return ({ height: 75 })
        } else if (this.state.width > 800) {
            return ({ height: 58 })
        } else {
            return ({ height: 40 })
        }
    }

    getactiveaccountid() {
        let accountid = false;
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("accountid")) {
                accountid = this.props.project.accountid;
            }

        }
        return accountid;
    }
    gettimeicon() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        if (menu.open) {
            return ({ width: 20, height: 18 })
        } else {
            return ({ width: 43, height: 37 })
        }
    }
    getupdatepassword() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        if (menu.open) {
            return ({ width: 123, height: 30 })
        } else {
            return ({ width: 199, height: 48 })
        }

    }
    getPlusIcon() {
        return ({ width: 27, height: 27 })
    }
    getMinusIcon() {
        return ({ width: 27, height: 9 })
    }
    getdownIcon() {
        return ({ width: 49, height: 36 })
    }

    getfoldericon() {
        return ({ width: 84, height: 62 })
    }
    getprofiledimesions() {
        return ({ width: 152, height: 145 })
    }
    getloginnow() {
        return ({ width: 199, height: 42 })
    }
    getgochecksmall() {
        return ({ width: 52, height: 44 })
    }
    getappleicon() {
        const width = Dimensions.get('window').width;
        if (width > 400) {
            return ({ width: 190, height: 48 })
        } else {
            return ({ width: 165, height: 42 })
        }

    }
    appleLogin() {
        const width = Dimensions.get('window').width;
        if (width > 400) {
            return ({ width: 190, height: 48 })
        } else {
            return ({ width: 165, height: 42 })
        }

    }

    getRegularFont() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);

        if (menu.open) {

            return ({ fontSize: 16 })
        } else {

            return ({ fontSize: 20 })
        }
    }

    getHeaderFont() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);

        if (menu.open) {
            return ({ fontSize: 20 })
        } else {
            return ({ fontSize: 24 })
        }
    }
    getcompany() {
        let construction = new Construction();
        let myuser = construction.getuser.call(this);
        let company = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                company = myuser.company;
            }
        }

        return company;
    }

    findactuallaborbyid(laborid) {
        const construction = new Construction();
        const projects = construction.getmyprojects.call(this)
        let labor = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    myproject.actuallabor.mylabor.map(mylabor => {
                        if (mylabor.laborid === laborid) {
                            labor = mylabor;
                        }
                    })
                }
            })
        }
        return labor;
    }

    getTransferbyInvoiceID(projectid, invoiceid) {
        const construction = new Construction();
        const myinvoice = construction.getinvoicebyid.call(this, projectid, invoiceid)
        let transfers = false;
        if (myinvoice) {
            if (myinvoice.hasOwnProperty("transfers")) {
                transfers = myinvoice.transfers.transfer;
            }
        }
        return transfers;
    }

    findactualequipmentbyid(equipmentid) {
        const construction = new Construction();
        const projects = construction.getmyprojects.call(this)
        let equipment = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {
                            equipment = myequipment;
                        }
                    })
                }
            })
        }
        return equipment;
    }

    getemployeebenefitsbyid(providerid) {
        const construction = new Construction();
        let benefits = false;
        const employee = construction.getemployeebyid.call(this, providerid)
        if (employee.hasOwnProperty("benefits")) {
            benefits = employee.benefits.benefit;
        }
        return benefits;
    }

    getemployeeaccountsbyid(providerid) {
        const construction = new Construction();
        const accountratio = (benefits, accountid) => {
            let benefitamount = 0;
            let totalbenefits = 0;
            // eslint-disable-next-line
            benefits.map(benefit => {
                if (benefit.accountid === accountid) {
                    benefitamount = benefit.amount;
                }
            })
            // eslint-disable-next-line
            benefits.map(benefit => {
                totalbenefits += benefit.amount;
            })
            return (benefitamount / totalbenefits);
        }
        const checkaccounts = (accounts, accountid) => {
            let checkaccount = true;
            // eslint-disable-next-line
            accounts.map(account => {
                if (account.accountid === accountid) {
                    checkaccount = false;
                }
            })
            return checkaccount;

        }
        let accounts = [];
        const benefits = construction.getemployeebenefitsbyid.call(this, providerid)
        // eslint-disable-next-line
        benefits.map(benefit => {
            if (checkaccounts(accounts, benefit.accountid)) {
                accounts.push({ accountid: benefit.accountid, ratio: accountratio(benefits, benefit.accountid) })
            }
        })
        return accounts;
    }
    getemployeeaccountratio(providerid, accountid) {
        const construction = new Construction();
        const accounts = construction.getemployeeaccountsbyid.call(this, providerid)
        let ratio = false;
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                if (account.accountid === accountid) {
                    ratio = account.ratio;
                }
            })
        }
        return ratio;
    }

    showchargesbyaccountid(accountid) {
        const construction = new Construction();
        const myprojects = construction.getmyprojects.call(this)
        let charges = false;
        const calculatelabor = (mylabor) => {
            let hours = calculatetotalhours(mylabor.timeout, mylabor.timein);

            let labor = hours * mylabor.laborrate * (1 + (mylabor.profit / 100));
            return labor;

        }
        const calculatematerialamount = (mymaterial) => {
            let materialamount = mymaterial.quantity * mymaterial.unitcost * (1 + (mymaterial.profit / 100))
            return materialamount;
        }
        const calculateequipmentamount = (myequipment) => {
            let hours = calculatetotalhours(myequipment.timeout, myequipment.timein)
            let equipment = hours * myequipment.equipmentrate * (1 + (myequipment.profit / 100))
            return equipment;
        }
        if (myprojects) {
            charges = {};
            charges.project = {};
            charges.project.myproject = [];
            // eslint-disable-next-line
            myprojects.map((myproject, i) => {
                charges.project.myproject[i] = {}
                charges.project.myproject[i].projectid = myproject.projectid;
                charges.project.myproject[i].charges = {};
                charges.project.myproject[i].charges.charge = [];
                if (myproject.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    myproject.actuallabor.mylabor.map(mylabor => {
                        let accounts = construction.getemployeeaccountsbyid.call(this, mylabor.providerid)
                        let laboramount = calculatelabor(mylabor)
                        let laborid = mylabor.laborid;
                        // eslint-disable-next-line
                        accounts.map(account => {
                            if (account.accountid === accountid) {
                                let ratio = account.ratio;
                                let amount = laboramount * ratio;
                                charges.project.myproject[i].charges.charge.push({ laborid, amount })
                            }
                        })

                    })
                }
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {

                        let materialid = mymaterial.materialid;
                        let material = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid);
                        if (material.accountid === accountid) {
                            let materialamount = calculatematerialamount(mymaterial)
                            charges.project.myproject[i].charges.charge.push({ materialid, amount: materialamount })
                        }
                    })

                }
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        let equipment = construction.getmyequipmentbyid.call(this, myequipment.myequipmentid)
                        if (equipment.accountid === accountid) {
                            let equipmentamount = calculateequipmentamount(myequipment)
                            charges.project.myproject[i].charges.charge.push({ equipmentid: myequipment.equipmentid, amount: equipmentamount })
                        }
                    })

                }
            })

        }
        return charges;
    }

    validateremovemanager(providerid) {
        // checks to see if there is one manager
        let validate = true;
        const construction = new Construction();
        let obj = construction.getuser.call(this);

        const validatemyuser = (obj) => {
            let validateuser = false;
            // eslint-disable-next-line
            obj.company.office.employees.employee.map(employee => {
                if (employee.manager === 'manager' && employee.providerid !== providerid) {
                    validateuser = true;
                }
            })

            return validateuser;

        }

        if (obj) {
            const employee = construction.getemployeebyid.call(this, providerid);
            if (employee) {
                validate = validatemyuser(obj)

            }
        }

        return validate;

    }

    findactualmaterialbyid(materialid) {
        const construction = new Construction();
        const projects = construction.getmyprojects.call(this)
        let material = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            material = mymaterial;
                        }
                    })
                }

            })
        }
        return material;
    }
    async loginclient(type) {
        let emailaddress = this.state.emailaddress;
        let client = this.state.client;
        let clientid = this.state.clientid;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let profile = this.state.profile;
        let phonenumber = this.state.phonenumber;
        let profileurl = this.state.profileurl;


        let values = { emailaddress, client, clientid, firstname, lastname, profile, phonenumber, profileurl, type }

        try {
            let response = await AppleLogin(values)
            console.log("RESPONSE LOGIN", response)
         
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)
                this.setState({ client: '', clientid: '', emailaddress: '', message: '', emailaddresscheck: false, profilecheck: false, profile: '', firstname: '', lastname: '', profileurl: '', profile: '' })
            } else if (response.hasOwnProperty("message")) {
                this.setState({ message: response.message })
            }
        } catch (err) {
            alert(err)
        }
    }

    async appleSignIn(type) {
        const construction = new Construction();
        const navigation = construction.getnavigation.call(this)
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            // signed in

            if (credential.hasOwnProperty("user")) {
                console.log("CREDENTIAL", credential)
                let profile = this.state.profile;
                let profilecheck = this.state.profilecheck;
                let emailaddress = credential.email;
                let client = 'apple';
                let clientid = credential.user;
                let firstname = credential.fullName.givenName;
                let lastname = credential.fullName.familyName;
                let emailaddresscheck = false;
                if (emailaddress) {
                    emailaddresscheck = true;
                }
                this.setState({ emailaddress, client, clientid, firstname, lastname, emailaddresscheck })

                construction.loginclient.call(this,type)
            }



        } catch (err) {
            alert(err)
        }
    }

    async loadallusers() {
        try {
            let response = await LoadAllUsers();
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
            }
        } catch (err) {
            alert(err)
        }

    }

    checkactive() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        let check = false;
        if (myuser) {
            const employee = construction.getemployeebyid.call(this, myuser.providerid);
            if (employee) {
                if (employee.active === 'active') {
                    check = true;
                }
            }

        }
        return check;


    }


    checkmanager() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        let check = false;
        if (myuser) {
            const employee = construction.getemployeebyid.call(this, myuser.providerid);
            if (employee) {
                if (employee.manager === 'manager') {
                    check = true;
                }
            }

        }
        return check;


    }

    showappleauth() {
        const construction = new Construction();
        const styles = MyStylesheet();
        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1]}>
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
                        cornerRadius={5}
                        style={{ width: 190, height: 48 }}
                        onPress={() => { construction.appleSignIn.call(this) }}
                    />
                </View>
            </View>

        );
    }

    getradioicon() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        if (menu.open) {
            return ({ width: 34, height: 32 })
        } else {
            return ({ width: 64, height: 62 })
        }

    }
    getmilestones() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this);
        let myproject = construction.getprojectbyid.call(this, projectid)
        let milestones = false;
        if (myproject) {
            if (myproject.hasOwnProperty("projectmilestones")) {
                milestones = myproject.projectmilestones.mymilestone;

            }
        }
        return milestones;

    }
    getmilestonekeybyid(projectid, milestoneid) {
        const construction = new Construction();
        const myproject = construction.getprojectbyid.call(this, projectid)
        let key = false;
        if (myproject) {
            if (myproject.hasOwnProperty("projectmilestones")) {
                myproject.projectmilestones.mymilestone.map((mymilestone, i) => {
                    if (mymilestone.milestoneid === milestoneid) {
                        key = i;
                    }
                })

            }
        }
        return key;
    }
    getequipmentkeybyid(equipmentid) {
        const construction = new Construction();
        let key = false;

        let myequipment = construction.getmyequipment.call(this)
        // eslint-disable-next-line
        myequipment.map((equipment, i) => {
            if (equipment.equipmentid === equipmentid) {
                key = i;
            }
        })


        return key;
    }
    getmyequipmentbyid(equipmentid) {
        const construction = new Construction();
        let equipments = false;

        let myequipment = construction.getmyequipment.call(this)
        // eslint-disable-next-line
        myequipment.map((equipment) => {
            if (equipment.equipmentid === equipmentid) {
                equipments = equipment
            }
        })


        return equipments;
    }
    getscheduleequipment(projectid) {
        const construction = new Construction();
        let scheduleequipment = false;
        let myproject = construction.getprojectbyid.call(this, projectid);
        if (myproject.hasOwnProperty("scheduleequipment")) {
            scheduleequipment = myproject.scheduleequipment.myequipment;

        }
        return scheduleequipment;
    }
    getactualequipment(projectid) {
        const construction = new Construction();
        let actualequipment = false;
        let myproject = construction.getprojectbyid.call(this, projectid);
        if (myproject.hasOwnProperty("actualequipment")) {
            actualequipment = myproject.actualequipment.myequipment;

        }
        return actualequipment;
    }
    getmyequipment() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        let equipment = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("equipment")) {
                    equipment = myuser.company.equipment.myequipment;
                }
            }
        }
        return equipment;
    }
    getcompany() {
        let construction = new Construction();
        let myuser = construction.getuser.call(this);
        let company = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                company = myuser.company;
            }
        }

        return company;
    }
    getmyaccounts() {
        const construction = new Construction();
        let myaccounts = false;
        const mycompany = construction.getcompany.call(this);
        if (mycompany) {
            if (mycompany.office.hasOwnProperty("accounts")) {
                myaccounts = mycompany.office.accounts.account;
            }
        }
        return myaccounts;
    }
    getaccountbyid(accountid) {
        const construction = new Construction();
        const myaccounts = construction.getmyaccounts.call(this);
        let myaccount = false;
        if (myaccounts.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myaccounts.map((account, i) => {
                if (account.accountid === accountid) {
                    myaccount = account;
                }
            })
        }
        return myaccount;
    }
    getaccountkeybyid(accountid) {
        const construction = new Construction();
        const myaccounts = construction.getmyaccounts.call(this);
        let key = false;
        if (myaccounts.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myaccounts.map((account, i) => {
                if (account.accountid === accountid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getemployeebyid(providerid) {
        const construction = new Construction()
        let myemployees = construction.getmyemployees.call(this)
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                if (employee.providerid === providerid) {
                    employees = employee;
                }
            })
        }
        return employees;
    }
    getemployeekeybyid(providerid) {
        const construction = new Construction()
        let myemployees = construction.getmyemployees.call(this)
        let key = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map((employee, i) => {
                if (employee.providerid === providerid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getmyemployees() {
        const construction = new Construction()
        let myuser = construction.getuser.call(this);
        let employees = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.office.hasOwnProperty("employees")) {
                    employees = myuser.company.office.employees.employee;
                }
            }
        }
        return employees;
    }

    getremoveicon() {
        return ({ width: 41, height: 34 })
    }

    getcostbyid(equipmentid, costid) {

        const construction = new Construction();
        let costs = false;
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    costs = cost;
                }

            })

        }

        return costs
    }

    getallusers() {
        let allusers = false;
        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty("myuser")) {
                if (this.props.allusers.myuser.hasOwnProperty("length")) {
                    allusers = this.props.allusers.myuser;
                }

            }
        }
        return allusers;
    }
    getactiveprojectid() {
        let projectid = false;
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("projectid")) {
                projectid = this.props.project.projectid;
            }

        }
        return projectid;
    }
    getactiveemployeeid() {
        let employeeid = false;
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("employeeid")) {
                employeeid = this.props.project.employeeid
            }

        }
        return employeeid;
    }
    getactiveproject() {
        let project = false;
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("projectid")) {
                project = this.props.project
            }

        }
        return project;
    }

    getprojectbyid(projectid) {
        const construction = new Construction();
        const myprojects = construction.getmyprojects.call(this);
        let myproject = false;
        if (myprojects) {
            myprojects.map(project => {
                if (project.projectid === projectid) {
                    myproject = project;
                }
            })
        }
        return myproject;
    }

    updateproposal(proposalid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid

        if (myuser) {
            const myproject = construction.getprojectbyid.call(this, projectid);
            if (myproject) {
                const i = construction.getprojectkeybyid.call(this, projectid)
                const myproposal = construction.getproposalbyid.call(this, projectid, proposalid)
                if (myproposal) {

                    const j = construction.getproposalkeybyid.call(this, projectid, proposalid)
                    console.log('updateproposal', i, j, proposalid, projectid, UTCTimefromCurrentDate())
                    myuser.company.projects.myproject[i].proposals.myproposal[j].updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

    }

    getprojectkeybyid(projectid) {
        const construction = new Construction();
        const myprojects = construction.getmyprojects.call(this);
        let key = false;
        if (myprojects) {
            myprojects.map((project, i) => {
                if (project.projectid === projectid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getmyprojects() {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        let projects = false;
        if (company) {
            if (company.hasOwnProperty("projects")) {
                projects = company.projects.myproject;
            }
        }
        return projects;
    }
    getemployeebyproviderid(providerid) {
        let construction = new Construction();


        let myemployees = construction.getmyemployees.call(this)
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                if (employee.providerid === providerid) {
                    employees = employee;
                }
            })
        }
        return employees;

    }

    getspecficationsbyprojectid(projectid) {
        const construction = new Construction();
        const myproject = construction.getprojectbyid.call(this, projectid)
        let specifications = false;
        if (myproject.hasOwnProperty("specifications")) {
            specifications = myproject.specifications;
        }

        return specifications;
    }


    getspecificationbycsi(projectid, csiid) {
        const construction = new Construction();
        const specs = construction.getspecficationsbyprojectid.call(this, projectid)
        let myspec = false;
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                if (spec.csiid === csiid) {
                    myspec = spec;
                }
            })
        }
        return myspec;
    }

    getsectionbyid(projectid, csiid, sectionid) {
        const construction = new Construction();
        const spec = construction.getspecificationbycsi.call(this, projectid, csiid)
        let mysection = false;
        if (spec) {

            if (spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map(section => {
                    if (section.sectionid === sectionid) {
                        mysection = section;
                    }
                })
            }
        }
        return mysection;
    }

    getsectionnumberbyid(projectid, csiid, sectionid) {
        const construction = new Construction();
        const spec = construction.getspecificationbycsi.call(this, projectid, csiid)
        let mycounter = "";
        if (spec.hasOwnProperty("sections")) {
            const section = construction.getsectionbyid.call(this, projectid, csiid, sectionid)
            if (section) {
                let part = section.part;

                spec.sections.sort((b, a) => {
                    return sortpart(b, a)
                })

                let counter = 1;
                // eslint-disable-next-line
                spec.sections.map((section, i) => {
                    if (section.part === part) {

                        if (section.sectionid === sectionid) {
                            mycounter = counter;
                        } else {
                            counter += 1;
                        }

                    }



                })

            }

        }
        if (Number(mycounter) < 10) {
            mycounter = `0${mycounter}`
        }
        return mycounter;
    }
    getspecficationsbyprojectid(projectid) {
        const construction = new Construction();
        const myproject = construction.getprojectbyid.call(this, projectid)
        let specifications = false;
        if (myproject.hasOwnProperty("specifications")) {
            specifications = myproject.specifications;
        }

        return specifications;
    }
    getprofileDimension() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        if (menu.open) {
            return ({ width: 127, height: 115 })
        } else {
            return ({ width: 152, height: 145 })
        }
    }
    getallcsicodes() {

        const construction = new Construction();
        const csis = construction.getcsis.call(this)
        return csis;
    }
    downIcon() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        if (menu.open) {
            return ({ width: 42, height: 31 })
        } else {
            return ({ width: 49, height: 36 })

        }
    }
    getcompanys() {
        let companys = false;

        if (this.props.allcompanys) {
            if (this.props.allcompanys.hasOwnProperty("length")) {
                companys = this.props.allcompanys;
            }
        }

        return companys;
    }

    getactuallaborbyproviderid(providerid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        let labor = [];
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.myproject.map(project => {
                        if (project.hasOwnProperty("actuallabor")) {
                            // eslint-disable-next-line
                            project.actuallabor.mylabor.map(mylabor => {
                                if (mylabor.providerid === providerid) {
                                    labor.push(mylabor)
                                }
                            })
                        }
                    })
                }
            }
        }
        return labor;
    }

    getAllSchedule(projectid) {
        const construction = new Construction();

        const schedule = () => {
            let schedules = [];
            let myproject = construction.getprojectbyid.call(this, projectid)

            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    schedules.push(mylabor)
                })
            }
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map(myequipment => {
                    schedules.push(myequipment)
                })
            }
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    schedules.push(mymaterial)
                })

            }

            schedules.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })

            return schedules;

        }

        let MySchedule = schedule();

        return MySchedule

    }
    getAllActual(projectid) {
        const construction = new Construction();

        let actuals = [];
        let myproject = construction.getprojectbyid.call(this, projectid)

        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                actuals.push(mylabor)
            })
        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                actuals.push(myequipment)
            })
        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                actuals.push(mymaterial)
            })

        }

        actuals.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })


        return actuals;

    }

    gettransfersbyaccountid(accountid) {
        const construction = new Construction();
        const projects = construction.getmyprojects.call(this)
        const account = construction.getaccountbyid.call(this, accountid);
        let transfers = [];
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    myproject.invoices.myinvoice.map(myinvoice => {
                        if (myinvoice.hasOwnProperty("transfers")) {
                            if (myinvoice.transfers.hasOwnProperty("transfer")) {
                                // eslint-disable-next-line
                                myinvoice.transfers.transfer.map(transfer => {
                                    if (transfer.destination === account.stripe) {
                                        transfers.push(transfer)
                                    }

                                })
                            }
                        }
                    })
                }
            })
        }
        return transfers;
    }
    getinvoiceidfromtransferid(transferid) {
        const construction = new Construction();
        const projects = construction.getmyprojects.call(this)
        let invoiceid = false;
        if (projects) {
            // eslint-disable-next-line 
            projects.map(myproject => {
                if (myproject.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    myproject.invoices.myinvoice.map(myinvoice => {

                        if (myinvoice.hasOwnProperty("transfers")) {
                            if (myinvoice.transfers.hasOwnProperty("transfer")) {
                                // eslint-disable-next-line
                                myinvoice.transfers.transfer.map(transfer => {
                                    if (transfer.transferid === transferid) {
                                        invoiceid = myinvoice.invoiceid;
                                    }

                                })

                            }
                        }
                    })


                }
            })
        }
        return invoiceid;
    }
    getactualmaterials(projectid) {
        const construction = new Construction();
        let myproject = construction.getprojectbyid.call(this, projectid);
        let actualmaterials = false;
        if (myproject.hasOwnProperty("actualmaterials")) {
            actualmaterials = myproject.actualmaterials.mymaterial;

        }
        return actualmaterials;
    }
    getschedulematerials(projectid) {
        const construction = new Construction();
        let myproject = construction.getprojectbyid.call(this, projectid);
        let schedulematerials = false;
        if (myproject.hasOwnProperty("schedulematerials")) {
            schedulematerials = myproject.schedulematerials.mymaterial;

        }
        return schedulematerials;
    }
    getactuallabor(projectid) {
        const construction = new Construction();
        let actuallabor = false;
        let myproject = construction.getprojectbyid.call(this, projectid);
        if (myproject.hasOwnProperty("actuallabor")) {
            actuallabor = myproject.actuallabor.mylabor;

        }
        return actuallabor;
    }
    getschedulelabor(projectid) {
        const construction = new Construction();
        let schedulelabor = false;
        let myproject = construction.getprojectbyid.call(this, projectid);
        if (myproject.hasOwnProperty("schedulelabor")) {
            schedulelabor = myproject.schedulelabor.mylabor;

        }
        return schedulelabor;
    }

    getschedulematerialsbyid(projectid, materialid) {
        const construction = new Construction();
        let materials = false;
        const mymaterials = construction.getschedulematerials.call(this, projectid);
        if (mymaterials) {
            mymaterials.map(mymaterial => {
                if (mymaterial.materialid === materialid) {
                    materials = mymaterial;
                }
            })
        }
        return materials;
    }

    getschedulematerialskeybyid(projectid, materialid) {
        const construction = new Construction();
        let key = false;
        const mymaterials = construction.getschedulematerials.call(this, projectid);
        if (mymaterials) {
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getscheduleequipmentbyid(projectid, equipmentid) {
        const construction = new Construction();
        let equipment = false;
        const myequipments = construction.getscheduleequipment.call(this, projectid);
        if (myequipments) {
            myequipments.map(myequipment => {
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })
        }
        return equipment;
    }

    getscheduleequipmentkeybyid(projectid, equipmentid) {
        const construction = new Construction();
        let key = false;
        const myequipments = construction.getscheduleequipment.call(this, projectid);
        if (myequipments) {
            myequipments.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getschedulelaborbyid(projectid, laborid) {
        const construction = new Construction();
        let labor = false;
        const mylabors = construction.getschedulelabor.call(this, projectid);
        if (mylabors) {
            mylabors.map(mylabor => {
                if (mylabor.laborid === laborid) {
                    labor = mylabor;
                }
            })
        }
        return labor;
    }

    getschedulelaborkeybyid(projectid, laborid) {
        const construction = new Construction();
        let key = false;
        const mylabors = construction.getschedulelabor.call(this, projectid);
        if (mylabors) {
            mylabors.map((mylabor, i) => {
                if (mylabor.laborid === laborid) {
                    key = i;
                }
            })
        }
        return key;
    }


    getactuallaborbyid(projectid, laborid) {
        const construction = new Construction();
        let labor = false;
        const mylabors = construction.getactuallabor.call(this, projectid);
        if (mylabors) {
            mylabors.map(mylabor => {
                if (mylabor.laborid === laborid) {
                    labor = mylabor;
                }
            })
        }
        return labor;
    }

    getactuallaborkeybyid(projectid, laborid) {
        const construction = new Construction();
        let key = false;
        const mylabors = construction.getactuallabor.call(this, projectid);
        if (mylabors) {
            mylabors.map((mylabor, i) => {
                if (mylabor.laborid === laborid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getactualmaterialskeybyid(projectid, materialid) {
        const construction = new Construction();
        let key = false;
        const mymaterials = construction.getactualmaterials.call(this, projectid);
        if (mymaterials) {
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getactualmaterialsbyid(projectid, materialid) {
        const construction = new Construction();
        let materials = false;
        const mymaterials = construction.getactualmaterials.call(this, projectid);
        if (mymaterials) {
            mymaterials.map(mymaterial => {
                if (mymaterial.materialid === materialid) {
                    materials = mymaterial;
                }
            })
        }
        return materials;
    }

    getactualequipmentbyid(projectid, equipmentid) {
        const construction = new Construction();
        let equipment = false;
        const myequipments = construction.getactualequipment.call(this, projectid);
        if (myequipments) {
            myequipments.map(myequipment => {
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })
        }
        return equipment;
    }

    getactualequipmentkeybyid(projectid, equipmentid) {
        const construction = new Construction();
        let key = false;
        const myequipments = construction.getactualequipment.call(this, projectid);
        if (myequipments) {
            myequipments.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getinvoicesbyprojectid(projectid) {
        const construction = new Construction();
        let invoices = false;
        let myproject = construction.getprojectbyid.call(this, projectid)
        if (myproject.hasOwnProperty("invoices")) {
            invoices = myproject.invoices.myinvoice;

        }
        return invoices;
    }
    getproposalsbyprojectid(projectid) {
        const construction = new Construction();
        let proposals = false;
        let myproject = construction.getprojectbyid.call(this, projectid)
        if (myproject.hasOwnProperty("proposals")) {
            proposals = myproject.proposals.myproposal;

        }
        return proposals;
    }
    getproposalbyid(projectid, proposalid) {
        const construction = new Construction();
        let proposals = false;
        let myproject = construction.getprojectbyid.call(this, projectid)
        if (myproject.hasOwnProperty("proposals")) {
            myproject.proposals.myproposal.map(myproposal => {
                if (myproposal.proposalid === proposalid) {
                    proposals = myproposal;
                }
            })

        }
        return proposals;
    }
    getproposalkeybyid(projectid, proposalid) {
        const construction = new Construction();
        let key = false;
        let myproject = construction.getprojectbyid.call(this, projectid)
        if (myproject.hasOwnProperty("proposals")) {
            myproject.proposals.myproposal.map((myproposal, i) => {
                if (myproposal.proposalid === proposalid) {
                    key = i;
                }
            })

        }
        return key;
    }
    getproposalitem(csiid, proposalid, projectid) {
        const construction = new Construction();
        let myproposal = construction.getproposalbyid.call(this, projectid, proposalid)
        let proposalitem = false;
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            myproposal.bidschedule.biditem.map((item) => {
                if (item.csiid === csiid) {
                    proposalitem = item
                }

            })
        }
        return proposalitem;

    }
    getproposalitemkey(csiid, proposalid, projectid) {
        const construction = new Construction();
        let myproposal = construction.getproposalbyid.call(this, projectid, proposalid)
        let key = false;
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            myproposal.bidschedule.biditem.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }

            })
        }
        return key;

    }
    getinvoicebyid(projectid, invoiceid) {
        const construction = new Construction();
        let invoices = false;
        let myproject = construction.getprojectbyid.call(this, projectid);
        if (myproject) {

            if (myproject.hasOwnProperty("invoices")) {
                myproject.invoices.myinvoice.map(myinvoice => {
                    if (myinvoice.invoiceid === invoiceid) {
                        invoices = myinvoice;
                    }
                })

            }

        }
        return invoices;
    }

    getinvoicekeybyid(projectid, invoiceid) {
        const construction = new Construction();
        let key = false;
        let myproject = construction.getprojectbyid.call(this, projectid)
        if (myproject.hasOwnProperty("invoices")) {
            myproject.invoices.myinvoice.map((myinvoice, i) => {
                if (myinvoice.invoiceid === invoiceid) {
                    key = i;
                }
            })

        }
        return key;
    }

    getinvoiceitem(csiid, invoiceid, projectid) {
        const construction = new Construction();
        let myinvoice = construction.getinvoicebyid.call(this, projectid, invoiceid)
        let invoiceitem = false;
        if (myinvoice.hasOwnProperty("bid")) {
            // eslint-disable-next-line
            myinvoice.bid.biditem.map((item) => {
                if (item.csiid === csiid) {
                    invoiceitem = item
                }

            })
        }
        return invoiceitem;

    }
    getinvoiceitemkey(csiid, invoiceid, projectid) {
        const construction = new Construction();
        let myinvoice = construction.getinvoicebyid.call(this, projectid, invoiceid)
        let key = false;
        if (myinvoice.hasOwnProperty("bid")) {
            // eslint-disable-next-line
            myinvoice.bid.biditem.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }

            })
        }
        return key;

    }
    validateCompany(params) {
        let validate = {};

        validate.validate = true;
        validate.message = '';
        const company = params.company;
        const myuser = params.myuser;

        if (myuser.hasOwnProperty("invalid")) {
            validate.validate = false;
            validate.message += myuser.invalid;
        }
        if (company.hasOwnProperty("equipment")) {
            // eslint-disable-next-line
            company.equipment.myequipment.map(myequipment => {
                if (!myequipment.accountid) {
                    validate.validate = false;
                    validate.message += `${myequipment.equipment} is missing AccountID `
                }
                if (myequipment.hasOwnProperty("ownership")) {

                    myequipment.ownership.cost.map(cost => {
                        if (!isNumeric(cost.cost)) {
                            validate.validate = false;
                            validate.message += `${myequipment.equipment} has a non numeric cost `
                        }
                    })
                }

            })
        }
        if (company.hasOwnProperty("materials")) {
            // eslint-disable-next-line
            company.materials.mymaterial.map(mymaterial => {
                if (!mymaterial.accountid) {
                    validate.validate = false;
                    validate.message += `${mymaterial.material} is missing AccountID `
                }
                if (!isNumeric(mymaterial.unitcost)) {
                    validate.validate = false;
                    validate.message += `${mymaterial.material} unit cost is not numeric `
                }
            })
        }
        if (company.office.hasOwnProperty("employees")) {
            // eslint-disable-next-line
            company.office.employees.employee.map(employee => {

                if (employee.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    employee.benefits.benefit.map(benefit => {
                        if (!benefit.accountid) {
                            validate.validate = false;
                            validate.message += `${benefit.benefit} is missing AccountID `
                        }
                        if (!isNumeric(benefit.amount)) {
                            validate.validate = false;
                            validate.message += `${benefit.benefit} has a non numeric value`
                        }
                    })
                }
            })
        }
        return validate;

    }
    getCompanyParams() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);

        let values = {}
        let newuser = {};
        let company = {};
        if (myuser) {
            if (myuser.hasOwnProperty("providerid")) {
                newuser = CreateUser(myuser.providerid, myuser.client, myuser.clientid, myuser.firstname, myuser.lastname, myuser.emailaddress, myuser.phonenumber, myuser.profileurl, myuser.profile)
            }
            if (myuser.hasOwnProperty("invalid")) {
                newuser.invalid = myuser.invalid;
            }
            if (myuser.hasOwnProperty("company")) {

                company.companyid = myuser.company.companyid;
                company.url = myuser.company.url;
                company.address = myuser.company.address;
                company.city = myuser.company.city;
                company.contactstate = myuser.company.contactstate;
                company.zipcode = myuser.company.zipcode;
                company.company = myuser.company.company;

                company.office = myuser.company.office;
                if (myuser.company.hasOwnProperty("materials")) {
                    company.materials = myuser.company.materials;
                }
                if (myuser.company.hasOwnProperty("equipment")) {
                    company.equipment = myuser.company.equipment;
                }


            }
        }
        values = { company, myuser: newuser }
        return values;
    }
    getbenefitkeybyid(employeeid, benefitid) {
        const construction = new Construction();
        let key = false;
        let employees = construction.getmyemployees.call(this);
        // eslint-disable-next-line
        employees.map(employee => {
            if (employee.providerid === employeeid) {

                if (employee.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    employee.benefits.benefit.map((benefit, i) => {
                        if (benefit.benefitid === benefitid) {
                            key = i;
                        }
                    })
                }

            }

        })

        return key
    }
    getbenefitbyid(employeeid, benefitid) {
        const construction = new Construction();
        let benefits = false;
        let employees = construction.getmyemployees.call(this);
        // eslint-disable-next-line
        employees.map(employee => {
            if (employee.providerid === employeeid) {

                if (employee.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    employee.benefits.benefit.map((benefit) => {
                        if (benefit.benefitid === benefitid) {
                            benefits = benefit;
                        }
                    })
                }

            }

        })

        return benefits;
    }
    getequipmentcostskeybyid(equipmentid, costid) {
        const construction = new Construction();
        let key = false;
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    key = i
                }

            })

        }

        return key;
    }

    getequipmentcostbyid(equipmentid, costid) {
        const construction = new Construction();
        let costs = false;
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    costs = cost;
                }

            })

        }

        return costs;
    }
    getmaterialkeybyid(materialid) {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        let key = false;
        if (company) {
            if (company.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                company.materials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        key = i;

                    }
                })
            }
        }
        return key;

    }
    handlecompanyids(response) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            if (response.hasOwnProperty("replaceids")) {
                if (response.replaceids.hasOwnProperty("accounts")) {
                    // eslint-disable-next-line
                    response.replaceids.accounts.map(replaceids => {

                        let oldaccountid = replaceids.oldaccountid;

                        let i = construction.getaccountkeybyid.call(this, oldaccountid);
                        myuser.company.office.accounts.account[i].accountid = replaceids.accountid;
                        if (this.state.activeaccountid === oldaccountid) {
                            this.setState({ activeaccountid: replaceids.accountid })
                        }
                    })

                }
                if (response.replaceids.hasOwnProperty("mymaterial")) {
                    // eslint-disable-next-line
                    response.replaceids.mymaterial.map(material => {
                        let oldmaterialid = material.oldmaterialid;
                        let materialid = material.materialid;
                        let j = construction.getmaterialkeybyid.call(this, oldmaterialid)
                        myuser.company.materials.mymaterial[j].materialid = material.materialid;
                        if (this.state.activematerialid === oldmaterialid) {
                            this.setState({ activematerialid: materialid })
                        }
                    })

                }
                if (response.replaceids.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    response.replaceids.equipment.map(equipment => {

                        let oldequipmentid = equipment.oldequipmentid;
                        let equipmentid = equipment.equipmentid;
                        let k = construction.getequipmentkeybyid.call(this, oldequipmentid)
                        myuser.company.equipment.myequipment[k].equipmentid = equipmentid;
                        if (this.state.activeequipmentid === oldequipmentid) {
                            this.setState({ activeequipmentid: equipmentid })
                        }
                    })

                }

                if (response.replaceids.hasOwnProperty("costid")) {
                    // eslint-disable-next-line
                    response.replaceids.costid.map(cost => {
                        let oldcostid = cost.oldcostid;
                        let costid = cost.costid;
                        let equipmentid = cost.equipmentid;
                        let l = construction.getequipmentkeybyid.call(this, equipmentid)
                        let m = construction.getequipmentcostskeybyid.call(this, equipmentid, oldcostid)

                        myuser.company.equipment.myequipment[l].ownership.cost[m].costid = costid;
                        if (this.state.activecostid === oldcostid) {
                            this.setState({ activecostid: costid })
                        }

                    })
                }
                if (response.replaceids.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    response.replaceids.benefits.map(benefit => {
                        let providerid = benefit.providerid;
                        let oldbenefitid = benefit.oldbenefitid;
                        let benefitid = benefit.benefitid;
                        let n = construction.getemployeekeybyid.call(this, providerid);
                        let o = construction.getbenefitkeybyid.call(this, providerid, oldbenefitid)
                        myuser.company.office.employees.employee[n].benefits.benefit[o].benefitid = benefitid;
                        if (this.state.activebenefitid === oldbenefitid) {
                            this.setState({ activebenefitid: benefitid })
                        }
                    })
                }
                this.props.reduxUser(myuser)
            }

        }
    }
    async saveCompany() {
        const construction = new Construction()
        const checkmanager = construction.checkmanager.call(this)
        if (checkmanager) {
            let params = construction.getCompanyParams.call(this)

            const validate = construction.validateCompany.call(this, params);
            if (validate.validate) {
                try {
                    console.log("SAVECOMPANY", "PARAMS", params)
                    let response = await SaveCompany(params);
                    // console.log("SAVECOMPANY", "response", response)
                    construction.handlecompanyids.call(this, response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);
                    }
                    if (response.hasOwnProperty("myuser")) {
                        this.props.reduxUser(response.myuser)
                    }

                    if (response.hasOwnProperty("message")) {
                        let dateupdated = inputUTCStringForLaborID(response.lastupdated)
                        this.setState({ message: `${response.message} Last Updated ${dateupdated}` })
                    }
                } catch (err) {
                    alert(err)
                }
            } else {
                this.setState({ message: validate.message })
            }
        } else {
            alert(`Only managers have access to save company`)
        }
    }
    getsavecompanyicon() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this);
        if (menu.open) {
            return ({ width: 153, height: 31 })
        } else {

            return ({ width: 243, height: 48 })
        }
    }
    showsavecompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const saveCompanyIcon = construction.getsavecompanyicon.call(this)

        return (<View style={styles.generalFlex}>
            <View style={styles.flex1}>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={styles.flex1}>
                        <Text style={[styles.regularFont, styles.alignCenter]}>{this.state.message}</Text>
                    </View>
                </View>

                <View style={styles.generalFlex, styles.bottomMargin10}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { construction.saveCompany.call(this) }}>
                            <Image source={require('./png/savecompany.png')}
                                resizeMethod='scale'
                                style={[saveCompanyIcon]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>)
    }

    validateSaveProfile() {
       
        let construction = new Construction();
        let myuser = construction.getuser.call(this)
        let errmsg = "";
        if(myuser.invalid) {
            errmsg += myuser.invalid;
        }
        if(myuser.invalidemail) {
            errmsg += myuser.invalidemail;
        }
        console.log("validatesaveprofile", errmsg)
        return errmsg;
    }

    async savemyprofile() {
        let construction = new Construction();
        let myuser = construction.getuser.call(this)
        let values = { providerid: myuser.providerid, firstname: myuser.firstname, lastname: myuser.lastname, emailaddress: myuser.emailaddress, phonenumber: myuser.phonenumber, profileurl: myuser.profileurl, profile: myuser.profile }
        let errmsg = construction.validateSaveProfile.call(this)

        if(!errmsg) {
        let response = await SaveProfile(values)
        console.log(response)
      
        if (response.hasOwnProperty("myuser")) {

            this.props.reduxUser(response.myuser)
        }


        if (response.hasOwnProperty("message")) {
            let lastupdated = inputUTCStringForLaborID(response.lastupdated)
            let message = `${response.message} Last updated ${lastupdated}`
            this.setState({ message })

        }

    } else {
        console.log("validatesaveprofile",errmsg)
        this.setState({ message:errmsg })
    }


    }

    getlagbymilestoneid(milestoneid) {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this);
        let lag = 0;
    
        const checklag = (startdate, enddate, i, lag) => {
            let replacelag = false;
    
    
            const check = Math.round((startdate-enddate)*(1/(1000*60*60*24)))
            
            
            if(i===0 && check>0) {
                replacelag = true;
            } else if(check < lag) {
                replacelag = true;
            }
    
        
    
            return replacelag;
        }
        
        if(milestones) {
            const mymilestone = construction.getmilestonebyid.call(this,milestoneid);
            if(mymilestone) {
    
            const startdate = getDateTime(mymilestone.start);
    
            if(mymilestone.hasOwnProperty("predessors")) {
                // eslint-disable-next-line
                mymilestone.predessors.map((predessor,i)=> {
    
                    const enddate = getDateTime(construction.getmilestonebyid.call(this,predessor.predessor).completion)
                 
                    if(startdate >= enddate && checklag(startdate,enddate,i,lag)) {
                        lag = Math.round((startdate-enddate)*(1/(1000*60*60*24)))
                    }
    
                })
            }
    
            }
        }
        return lag;
    }

    getfloatbymilestoneid(milestoneid) {
        const construction = new Construction();
        const paths = construction.getpaths.call(this)
        let float = 0;
        let i = 0;
        for (let mypath in paths[milestoneid]['paths']) {
    
            let floatcheck = paths[milestoneid]['paths'][mypath]['float']
    
            if (floatcheck < float || i === 0) {
                float = floatcheck
    
            }
    
            i += 1;
        }
        return float;
    
    }

    checkemptypathsbymilestoneid(milestoneid) {
        const construction = new Construction();
        const paths = construction.getpaths.call(this)
        const path = paths[milestoneid];
        let empty = false;
        if(checkemptyobject(path.paths)) {
           empty  = true;
        }
        return empty; 
        }


    calcTotalProjectFloat(milestoneid) {
        const construction = new Construction();
        const paths = construction.getpaths.call(this)
        let checkcalc = true
        let i =0;
        let activemilestoneid = milestoneid;
        while(checkcalc) {
       
       
          window[`checkfloat_${i.toString()}`] = 0;
              
              
              let j = 0;
               checkcalc = false;
               for (window[`mypath_${i.toString()}`] in paths[activemilestoneid]['paths']) {
                   
                if(!construction.checkemptypathsbymilestoneid.call(this,window[`mypath_${i.toString()}`])) {
                  checkcalc = true 
                 }
                    
                
                    if (j === 0 || window[`checkfloat_${i.toString()}`] > construction.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                       window[`checkfloat_${i.toString()}`] = construction.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])
                       activemilestoneid = window[`mypath_${i.toString()}`]
                   }
                j+=1
              }
          
               i+=1;
        
        }
       let float = construction.getfloatbymilestoneid.call(this, milestoneid)
       let projectfloat = 0;
       for(let k=0;k<i;k++) {
         projectfloat+= Number(window[`checkfloat_${k.toString()}`])
       }
       return float + projectfloat
       }
    
    

    getpaths() {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this)
        const projectinterval = construction.getprojectinterval.call(this);
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        let paths = {}
    
    
        const getmilestonebyid = (paths, milestoneid) => {
            let mymilestone = false;
            if (paths.hasOwnProperty(milestoneid)) {
    
                mymilestone = paths[milestoneid]
            }
    
            return mymilestone;
    
        }
    
        const getPathsbyMilestoneID = (milestones, milestoneid) => {
    
            let path = {};
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (milestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    milestone.predessors.map(predessor => {
                        if (predessor.predessor === milestoneid) {
                            path[`${milestone.milestoneid}`] = {};
                            path[`${milestone.milestoneid}`]['type'] = predessor.type
    
    
    
                        }
    
    
                    })
    
    
    
                }
    
    
            })
    
            return path;
        }
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                paths[`${milestone.milestoneid}`] = {};
                paths[`${milestone.milestoneid}`]['milestone'] = milestone.milestone
                paths[`${milestone.milestoneid}`]['start'] = milestone.start
                paths[`${milestone.milestoneid}`]['completion'] = milestone.completion;
                paths[`${milestone.milestoneid}`]['paths'] = getPathsbyMilestoneID(milestones, milestone.milestoneid)
    
            })
    
    
    
    
            let interval = getDateInterval(projectinterval.start, projectinterval.completion)
            let scale = getScale(interval)
            let mymilestones = [];
    
            // eslint-disable-next-line
            Object.getOwnPropertyNames(paths).map(path => {
                mymilestones.push(path)
            })
    
            // eslint-disable-next-line
            mymilestones.map((milestoneid, i) => {
    
                if ((paths[milestoneid]).hasOwnProperty("paths")) {
    
    
    
                    if (Object.getOwnPropertyNames(paths[milestoneid].paths).length > 0) {
    
                        // eslint-disable-next-line
                        Object.getOwnPropertyNames(paths[milestoneid].paths).map(prop => {
    
                            const milestone_2 = getmilestonebyid(paths, prop)
                            let params = {};
                            let params_2 = {};
                            if (milestone_2) {
    
                                if (scale === 'month') {
                                    params = calculatemonth(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculatemonth(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'year') {
                                    params = calculateyear(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateyear(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'day') {
                                    params = calculateday(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateday(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                }
                            }
                            const y1 = 80 + 100 * (construction.getmilestonekeybyid.call(this, activeparams.projectid,milestoneid));
                            const y2 = 80 + 100 * (construction.getmilestonekeybyid.call(this,activeparams.projectid, prop));
                            let x1 = "";
                            if (paths[milestoneid].paths[prop].type === 'start-to-finish') {
                                x1 = params.xo + params.width;
                            } else if (paths[milestoneid].paths[prop].type === 'start-to-start') {
                                x1 = params.xo;
                            }
                            paths[milestoneid].paths[prop]['x1'] = x1;
                            paths[milestoneid].paths[prop]['y1'] = y1
                            paths[milestoneid].paths[prop]['y2'] = y2
                            paths[milestoneid].paths[prop]['x2'] = params_2.xo
                            paths[milestoneid].paths[prop]['float'] = 'float';
    
    
                        })
    
                    }
    
    
                }
    
    
            })
        }
    
    
        let milestone_1 = "";
        let milestone_2 = "";
        for (let myprop in paths) {
            milestone_1 = getmilestonebyid(paths, myprop)
    
    
    
            for (let mypath in paths[myprop]['paths']) {
                milestone_2 = getmilestonebyid(paths, mypath)
                let float = calculateFloat(milestone_1.completion, milestone_2.start)
                paths[myprop]['paths'][mypath]['float'] = float
            }
    
        }
    
        return paths;
    }

    getprojectinterval() {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this)
        let interval = false;
        if (milestones) {
            milestones.sort((a, b) => {
                return sorttimes(a.start, b.start)
            }
            )
            const start = milestones[0].start;
            const completion = milestones[milestones.length - 1].completion;
            interval = { start, completion }
        }
        return interval;
    
    }

    showsaveprofile() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const saveProfileIcon = () => {
            if (menu.open) {
                return ({ width: 155, height: 39 })
            } else {

                return ({ width: 257, height: 65 })
            }

        }
        return (<View style={styles.generalFlex}>
            <View style={styles.flex1}>

                <View style={styles.generalFlex, styles.bottomMargin10}>
                    <View style={styles.flex1}>
                        <Text style={[styles.regularFont, styles.alignCenter]}>{this.state.message}</Text>
                    </View>
                </View>

                <View style={styles.generalFlex, styles.bottomMargin10}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { construction.savemyprofile.call(this) }}>
                            <Image source={require('./png/saveprofile.png')}
                                resizeMethod='scale'
                                style={saveProfileIcon()}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>)
    }

    getaccountbydestination(stripe) {
        const construction = new Construction();
        const myaccounts = construction.getmyaccounts.call(this);
        let myaccount = false;
        if (myaccounts) {
            // eslint-disable-next-line
            myaccounts.map(account => {
                if (account.stripe === stripe) {
                    myaccount = account;
                }
            })

        }
        return myaccount;
    }
    getSmallFont() {

        return ({ fontSize: 18 })


    }
    extraSmallFont() {

        return ({ fontSize: 14 })


    }
    getcheckicon() {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        if (menu.open) {
            return ({ width: 33, height: 19 })
        } else {
            return ({ width: 112, height: 76 })
        }

    }

    checkinvoice(projectid, invoiceid) {
        const construction = new Construction();
        const myinvoice = construction.getinvoicebyid.call(this, projectid, invoiceid)
        let checkinvoice = true;
        if (myinvoice) {
            if (myinvoice.approved) {
                checkinvoice = false;
            }
        }
        return checkinvoice;
    }


    checkinvoiceequipmentid(equipmentid) {
        const construction = new Construction();
        const myequipment = construction.findactualequipmentbyid.call(this, equipmentid);
        let checkinvoice = true;
        if (myequipment.settlementid) {

            checkinvoice = false;

        }
        return checkinvoice;

    }

    getemployeebyprofile(profile) {
        const construction = new Construction()
        let myemployees = construction.getmyemployees.call(this)
        console.log("checkmyemployees", myemployees, myemployees.length)
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                console.log("checkemployee", employee.profile, profile)
                if (employee.profile === profile) {
                    employees = employee;
                }
            })
        }
        return employees;
    }

    checkinvoicematerialid(materialid) {
        const construction = new Construction();
        const mymaterial = construction.findactualmaterialbyid.call(this, materialid);
        let checkinvoice = true;
        if (mymaterial.settlementid) {
            checkinvoice = false;

        }
        return checkinvoice;

    }

    checkinvoicelaborid(laborid) {
        const construction = new Construction();
        const mylabor = construction.findactuallaborbyid.call(this, laborid);
        let checkinvoice = true;

        if (mylabor.settlementid) {
            checkinvoice = false;
        }

        return checkinvoice;
    }


    handleprojectids(response) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this)
        const projectid = activeproject.projectid;
        if (myuser) {
            if (response.hasOwnProperty("projectids")) {
                const i = construction.getprojectkeybyid.call(this, projectid)
                if (response.projectids.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    response.projectids.scheduleequipment.map(myequipment => {
                        const j = construction.getscheduleequipmentkeybyid.call(this, myequipment.oldequipmentid);
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentid = myequipment.equipmentid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeequipmentid === myequipment.oldequipmentid) {
                            this.setState({ activeequipmentid: myequipment.equipmentid })
                        }

                    })

                }
                if (response.projectids.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    response.projectids.schedulematerials.map(mymaterial => {
                        const j = construction.getschedulematerialskeybyid.call(this, mymaterial.oldmaterialid);
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].materialid = mymaterial.materialid;
                        this.props.reduxUser(myuser);
                        if (this.state.activematerialid === mymaterial.oldmaterialid) {
                            this.setState({ activematerialid: mymaterial.materialid })
                        }

                    })
                }

                if (response.projectids.hasOwnProperty("schedulelabor")) {
                    // eslint-disable-next-line
                    response.projectids.schedulelabor.map(mylabor => {
                        const k = construction.getschedulelaborkeybyid.call(this, mylabor.oldlaborid);
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[k].laborid = mylabor.laborid;
                        this.props.reduxUser(myuser);
                        if (this.state.activelaborid === mylabor.oldlaborid) {
                            this.setState({ activelaborid: mylabor.laborid })
                        }

                    })
                }
                if (response.projectids.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    response.projectids.actualequipment.map(myequipment => {

                        const l = construction.getactualequipmentkeybyid.call(this, myequipment.oldequipmentid);
                        myuser.company.projects.myproject[i].actualequipment.myequipment[l].equipmentid = myequipment.equipmentid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeequipmentid === myequipment.oldequipmentid) {
                            this.setState({ activeequipmentid: myequipment.equipmentid })
                        }



                    })
                }
                if (response.projectids.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    response.projectids.actualmaterials.map(mymaterial => {
                        const m = construction.getactualmaterialskeybyid.call(this, mymaterial.oldmaterialid);
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[m].materialid = mymaterial.materialid;
                        this.props.reduxUser(myuser);
                        if (this.state.activematerialid === mymaterial.oldmaterialid) {
                            this.setState({ activematerialid: mymaterial.materialid })
                        }

                    })
                }


                if (response.projectids.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    response.projectids.actuallabor.map(mylabor => {
                        const n = construction.getactuallaborkeybyid.call(this, mylabor.oldlaborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[n].laborid = mylabor.laborid;
                        this.props.reduxUser(myuser);
                        if (this.state.activelaborid === mylabor.oldlaborid) {
                            this.setState({ activelaborid: mylabor.laborid })
                        }



                    })
                }

                if (response.projectids.hasOwnProperty("proposals")) {
                    // eslint-disable-next-line
                    response.projectids.proposals.map(myproposal => {
                        const o = construction.getproposalkeybyid.call(this, myproposal.oldproposalid);
                        myuser.company.projects.myproject[i].proposals.myproposal[o].proposalid = myproposal.proposalid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeproposalid === myproposal.oldproposalid) {
                            this.setState({ activeproposalid: myproposal.proposalid })
                        }

                    })
                }



                if (response.projectids.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    response.projectids.invoices.map(myinvoice => {
                        const p = construction.getinvoicekeybyid.call(this, projectid, myinvoice.oldinvoiceid);
                        myuser.company.projects.myproject[i].invoices.myinvoice[p].invoiceid = myinvoice.invoiceid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeinvoiceid === myinvoice.oldinvoiceid) {
                            this.setState({ activeinvoiceid: myinvoice.invoiceid })
                        }

                    })

                }

            }
        }
    }

    updateinvoice(invoiceid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid

        if (myuser) {
            const myproject = construction.getprojectbyid.call(this, projectid);
            if (myproject) {
                const i = construction.getprojectkeybyid.call(this, projectid)
                const myinvoice = construction.getinvoicebyid.call(this, projectid, invoiceid)
                if (myinvoice) {

                    const j = construction.getinvoicekeybyid.call(this, projectid, invoiceid)

                    myuser.company.projects.myproject[i].invoices.myinvoice[j].updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

    }

    validateProject(project) {
        let validate = {};
        validate.validate = true;
        validate.message = "";
        const construction = new Construction();
        if (project.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            project.schedulelabor.mylabor.map(mylabor => {
                if (!mylabor.csiid || !mylabor.milestoneid || !mylabor.providerid) {
                    validate.validate = false;
                    if (!mylabor.csiid) {
                        validate.message += `Schedule labor ${mylabor.description} is missing CSIID `
                    }
                    if (!mylabor.milestoneid) {
                        validate.message += `Schedule labor ${mylabor.description} is missing MilestoneID `
                    }
                    if (!mylabor.providerid) {
                        validate.message += `Schedule labor ${mylabor.description} is missing ProviderID `
                    }

                }
                if (!isNumeric(mylabor.profit)) {
                    validate.validate = false;
                    validate.message += `Schedule labor ${mylabor.description} has non numeric profit `
                }
                if (!isNumeric(mylabor.laborrate)) {
                    validate.validate = false;
                    validate.message += `Schedule labor ${mylabor.description} has non numeric labor rate `
                }
            })

        }


        if (project.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            project.actuallabor.mylabor.map(mylabor => {
                if (!mylabor.csiid || !mylabor.milestoneid || !mylabor.providerid) {
                    validate.validate = false;
                    if (!mylabor.csiid) {
                        validate.message += `Actual labor ${mylabor.description} is missing CSIID `
                    }
                    if (!mylabor.milestoneid) {
                        validate.message += `Actual labor ${mylabor.description} is missing MilestoneID `
                    }
                    if (!mylabor.providerid) {
                        validate.message += `Actual labor ${mylabor.description} is missing ProviderID `
                    }

                }

                if (!isNumeric(mylabor.profit)) {
                    validate.validate = false;
                    validate.message += `Actual labor ${mylabor.description} has non numeric profit `
                }

                if (!isNumeric(mylabor.laborrate)) {
                    validate.validate = false;
                    validate.message += `Actual labor ${mylabor.description} has non numeric labor rate `
                }
            })
        }

        if (project.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            project.schedulematerials.mymaterial.map(mymaterial => {
                let schedulematerial = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid)


                if (!schedulematerial || !mymaterial.mymaterialid || !mymaterial.csiid || !mymaterial.milestoneid) {
                    validate.validate = false;
                    if (!mymaterial.mymaterialid) {
                        validate.message += `Schedule Material is missing materialid `
                    }
                    if (!mymaterial.csiid) {
                        validate.message += `Schedule Material ${schedulematerial.material} is missing csiid `
                    }
                    if (!mymaterial.milestoneid) {
                        validate.message += `Schedule Material ${schedulematerial.material} is missing milestoneid `
                    }


                }
                if (!isNumeric(mymaterial.quantity)) {
                    validate.validate = false;
                    validate.message += `Schedule Material ${schedulematerial.material} has a non numeric quantity`
                }
                if (!isNumeric(mymaterial.unitcost)) {
                    validate.validate = false;
                    validate.message += `Schedule Material ${schedulematerial.material} has a non numeric unitcost`
                }

                if (!isNumeric(mymaterial.profit)) {
                    validate.validate = false;
                    validate.message += `Schedule Material ${schedulematerial.material} has a non numeric profit`
                }

            })
        }

        if (project.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            project.actualmaterials.mymaterial.map(mymaterial => {
                let myactualmaterial = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid);
                if (!mymaterial.mymaterialid || !mymaterial.csiid || !mymaterial.milestoneid) {
                    validate.validate = false;
                    if (!mymaterial.mymaterialid) {

                        validate.message += `Actual Material is missing materialid `
                    }
                    if (!mymaterial.csiid) {

                        validate.message += `Actual Material ${myactualmaterial.material} is missing csiid `
                    }
                    if (!mymaterial.milestoneid) {
                        validate.message += `Actual Material ${myactualmaterial.material} is missing milestoneid `
                    }
                }

                if (!isNumeric(mymaterial.quantity)) {
                    validate.validate = false;
                    validate.message += `Actual Material ${myactualmaterial.material} has a non numeric quantity`
                }
                if (!isNumeric(mymaterial.unitcost)) {
                    validate.validate = false;
                    validate.message += `Actual Material ${myactualmaterial.material} has a non numeric unitcost`
                }

                if (!isNumeric(mymaterial.profit)) {
                    validate.validate = false;
                    validate.message += `Actual Material ${myactualmaterial.material} has a non numeric profit`
                }
            })
        }
        if (project.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            project.scheduleequipment.myequipment.map(myequipment => {
                let myscheduleequipment = "";
                let scheduleequipment = construction.getmyequipmentbyid.call(this, myequipment.myequipmentid);
                if (scheduleequipment) {
                    myscheduleequipment = scheduleequipment.equipment;
                }
                if (!myequipment.myequipmentid || !myequipment.csiid || !myequipment.milestoneid) {
                    validate.validate = false;
                    if (!myequipment.myequipmentid) {
                        validate.message += `Schedule Equipment is missing Equipment ID `;
                    }
                    if (!myequipment.csiid) {
                        validate.message += `Schedule Equipment ${myscheduleequipment} is missing CSIID `;
                    }

                    if (!myequipment.milestoneid) {
                        validate.message += `Schedule Equipment ${myscheduleequipment} is missing MilestoneID `;
                    }

                }
                if (!isNumeric(myequipment.equipmentrate)) {
                    validate.validate = false;
                    validate.message += `Schedule Equipment ${myscheduleequipment}  has a non numeric equipoment rate `;
                }

                if (!isNumeric(myequipment.profit)) {
                    validate.validate = false;
                    validate.message += `Schedule Equipment ${myscheduleequipment}  has a non numeric profit `;
                }


            })

        }

        if (project.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            project.actualequipment.myequipment.map(myequipment => {
                let myactualequipment = "";
                let actualequipment = construction.getmyequipmentbyid.call(this, myequipment.myequipmentid);
                if (actualequipment) {
                    myactualequipment = actualequipment.equipment;
                }
                if (!myequipment.myequipmentid || !myequipment.csiid || !myequipment.milestoneid) {
                    validate.validate = false;
                    if (!myequipment.myequipmentid) {
                        validate.message += `Actual Equipment is missing Equipment ID `;
                    }
                    if (!myequipment.csiid) {
                        validate.message += `Actual Equipment ${myactualequipment} is missing CSIID `;
                    }

                    if (!myequipment.milestoneid) {
                        validate.message += `Actual Equipment ${myactualequipment} is missing MilestoneID `;
                    }

                }

                if (!isNumeric(myequipment.equipmentrate)) {
                    validate.validate = false;
                    validate.message += `Actual Equipment ${myactualequipment}  has a non numeric equipoment rate `;
                }

                if (!isNumeric(myequipment.profit)) {
                    validate.validate = false;
                    validate.message += `Actual Equipment ${myactualequipment}  has a non numeric profit `;
                }

            })


        }


        return validate;
    }

    async savemyproject() {
        let construction = new Construction();
        let values = construction.getCompanyParams.call(this);
        const activeproject = construction.getactiveproject.call(this)
        let myproject = construction.getprojectbyid.call(this, activeproject.projectid);
        values.project = myproject;
        let validatecompany = construction.validateCompany.call(this, values);
        let validateproject = construction.validateProject.call(this, values.project)

        if (validatecompany.validate && validateproject.validate) {
            try {
                let response = await SaveProject(values)
                console.log(response)
                construction.handlecompanyids.call(this, response)
                construction.handleprojectids.call(this, response)
                if (response.hasOwnProperty("allusers")) {
                    let companys = returnCompanyList(response.allusers);
                    this.props.reduxAllCompanys(companys)
                    this.props.reduxAllUsers(response.allusers);

                }
                if (response.hasOwnProperty("myuser")) {

                    this.props.reduxUser(response.myuser)
                }

                let message = "";
                if (response.hasOwnProperty("message")) {
                    let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                    message = `${response.message} Last updated ${lastupdated}`

                }
                this.setState({ message })
            } catch (err) {
                alert(err)
            }

        } else {
            let message = "";
            message += validatecompany.message;
            message += validateproject.message;
            this.setState({ message })
        }

    }
    showsaveproject() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const saveProfileIcon = () => {
            if (menu.open) {
                return ({ width: 148, height: 30 })
            } else {

                return ({ width: 254, height: 52 })
            }

        }
        return (<View style={styles.generalFlex, styles.bottomMargin10}>
            <View style={styles.flex1}>

                <View style={styles.generalFlex}>
                    <View style={styles.flex1}>
                        <Text style={[styles.regularFont, styles.alignCenter]}>{this.state.message}</Text>
                    </View>
                </View>

                <View style={styles.generalFlex}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { construction.savemyproject.call(this) }}>
                            <Image source={require('./png/saveproject.png')}
                                resizeMethod='scale'
                                style={saveProfileIcon()}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>)
    }
    getmilestonebyid(milestoneid) {
        let construction = new Construction();
        let milestones = construction.getmilestones.call(this)
        let milestone = false;
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(mymilestone => {
                if (mymilestone.milestoneid === milestoneid) {
                    milestone = mymilestone;
                }
            })
        }
        return milestone;
    }

    getcsis() {
        let csis = false;
        if (this.props.csis) {
            if (this.props.csis.hasOwnProperty("length")) {
                csis = this.props.csis;
            }
        }
        return csis;
    }


    getschedulebyproviderid(providerid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        let labor = [];
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.myproject.map(project => {
                        if (project.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            project.schedulelabor.mylabor.map(mylabor => {
                                if (mylabor.providerid === providerid) {
                                    labor.push(mylabor)
                                }
                            })
                        }
                    })
                }
            }
        }
        return labor;
    }


    getprojectbymilestoneid(milestoneid) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        let myproject = false;
        if (myuser.hasOwnProperty("company")) {
            if (myuser.company.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.company.projects.myproject.map(project => {
                    if (project.hasOwnProperty("projectmilestones")) {
                        // eslint-disable-next-line
                        project.projectmilestones.mymilestone.map(milestone => {
                            if (milestone.milestoneid === milestoneid) {
                                myproject = project;
                            }
                        })
                    }
                })
            }
        }
        return myproject;
    }
    getcsibyid(csiid) {
        let csi = false;
        let construction = new Construction();
        const csis = construction.getcsis.call(this)
        if (csis) {
            // eslint-disable-next-line
            csis.map(code => {
                if (code.csiid === csiid) {
                    csi = code;

                }
            })

        }

        return csi;
    }

    getampmicon() {

        return ({ width: 57, height: 33 })


    }

    getmymaterialbyid(materialid) {
        const construction = new Construction();
        let company = construction.getcompany.call(this);
        let material = false;
        if (company) {
            if (company.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                company.materials.mymaterial.map(mymaterial => {
                    if (mymaterial.materialid === materialid) {
                        material = mymaterial;
                    }
                })
            }
        }
        return material;
    }
    getmymaterials() {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        let materials = false;
        if (company.hasOwnProperty("materials")) {
            materials = company.materials.mymaterial;

        }
        return materials;
    }
    getequipmentcostsbyid(equipmentid) {
        const construction = new Construction();
        let equipmentcosts = false
        let equipment = construction.getmyequipmentbyid.call(this, equipmentid)
        if (equipment.hasOwnProperty("ownership")) {
            if (equipment.ownership.hasOwnProperty("cost")) {
                // eslint-disable-next-line
                equipmentcosts = equipment.ownership.cost;
            }

        }
        return equipmentcosts;
    }
    calculateequipmentratebyid(equipmentid, timein, timeout) {

        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid);
        let equipmentrate = 0;
        if (myequipment.ownershipstatus === 'owned') {
            equipmentrate = construction.calculateequipmentratebyownership.call(this, equipmentid)
        } else if (myequipment.ownershipstatus === 'rented') {
            equipmentrate = construction.getequipmentrentalratebyid.call(this, equipmentid, timein, timeout)
        }
        return equipmentrate;

    }

    calculateequipmentratebyownership(equipmentid) {
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid);
        const i = (Number(myequipment.ownership.loaninterest) / 100) / 12;
        const workinghours = Math.round(Number(myequipment.ownership.workinghours) / 12);
        let equipmentrate = 0;

        const P = () => {
            let P = 0;
            const costs = construction.getequipmentcostsbyid.call(this, myequipment.equipmentid)
            if (costs) {
                // eslint-disable-next-line
                costs.map(cost => {
                    let n = calculateTotalMonths(myequipment.ownership.purchasedate, cost.timein);
                    let F = Number(cost.cost)
                    P += FutureCostPresent(i, n, F);

                })
            }
            return (P)
        }
        const Period = () => {
            let purchasedate = myequipment.ownership.purchasedate;
            let saledate = myequipment.ownership.saledate;
            if (purchasedate && saledate) {
                let totalmonths = calculateTotalMonths(purchasedate, saledate)
                return (totalmonths)
            } else {
                return 0;
            }

        }
        const AFactor = () => {
            const T = Period();
            const i = Number(myequipment.ownership.loaninterest);
            console.log(T, i)
            if (T) {
                console.log(AmmortizeFactor(i, T))
                return (AmmortizeFactor(i, T))
            } else {

                return 0;
            }

        }

        const totalworkinghours = () => {
            let annual = Number(myequipment.ownership.workinghours);
            let years = Period() / 12;

            return (Math.round(annual * years))
        }

        if (i > 0) {
            equipmentrate = (P() * AFactor()) / (workinghours);
        } else {
            console.log(P(), totalworkinghours(), Period())
            equipmentrate = P() / (totalworkinghours())
        }

        return equipmentrate;
    }
    getequipmentrentalratebyid(equipmentid, timein, timeout) {
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid);
        const hourlyrate = Number(myequipment.rentalrates.hour);
        const dailyrate = Number(myequipment.rentalrates.day);
        const weeklyrate = Number(myequipment.rentalrates.week);
        const monthlyrate = Number(myequipment.rentalrates.month);
        const rentalObj = getEquipmentRentalObj(timein, timeout);

        const hours = rentalObj.hours;
        const days = rentalObj.days;
        const weeks = rentalObj.weeks;
        const months = rentalObj.months;
        let rentalcost = (hourlyrate * hours) + (days * dailyrate) + (weeks * weeklyrate) + (months * monthlyrate);
        let totalhours = calculatetotalhours(timeout, timein);
        let rentalrate = rentalcost / totalhours;
        return rentalrate;

    }
    gethourlyrate(providerid) {
        const construction = new Construction()
        let employee = construction.getemployeebyid.call(this, providerid)
        let workinghours = Number(employee.workinghours);
        let hourlyrate = 0;
        let totalbenefits = 0;

        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.benefit.map(benefit => {
                totalbenefits += Number(benefit.amount);

            })
        }

        if (workinghours && totalbenefits) {
            hourlyrate = Number(totalbenefits / workinghours)
        }
        return hourlyrate;

    }

    getnavigation() {

        if (this.props.hasOwnProperty("navigation")) {
            return this.props.navigation;
        } else {
            return false;
        }

    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }

        }
        return user;
    }
    loginMessage(component) {
        const styles = MyStylesheet();
        return (<View>
            <Text style={[styles.alignCenter, styles.regularFont]}>You need to be logged in to view {component}.</Text>
        </View>)
    }
}

export default Construction;