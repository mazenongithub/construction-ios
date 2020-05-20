import React, { Component } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { returnCompanyList, CreateCompany, validateCompanyID } from './functions';
import { RegisterNewCompany, ValidateCompanyID,AddExistingCompany } from './actions/api'
import { thisTypeAnnotation } from '@babel/types';
class Company extends Component {
    constructor(props) {
        super(props)
        this.state = { render: '', url: '', company: '', urlcheck: true, message: '' }
    }
    handleurl(url) {
        url = url.toLowerCase();
        this.setState({ url });
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            let validate = validateCompanyID(url);
            if (validate) {
                this.setState({ urlcheck: false, message: validate })
            } else {
                let message = `Your Company Will be Hosted at http://construction.civilengineer.io/${myuser.profile}/company/${url}`
                this.setState({ message })
            }
        }
    }
    async validatecompanyid() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const url = this.state.url;
        if (myuser) {
            let response = await ValidateCompanyID(url);
            console.log("CHECKCOMPANY", response)
            if (response.hasOwnProperty("invalid")) {
                this.setState({ urlcheck: false, message: response.message })
            } else if (response.hasOwnProperty("valid")) {
                let message = `Your Company Will be Hosted at http://construction.civilengineer.io/${myuser.profile}/company/${url}`
                this.setState({ urlcheck: true, message })
            }

        }
    }
    validatenewcompany() {
        let validate = {};
        validate.validate = true;
        validate.message = ""
        if (!this.state.urlcheck) {
            validate.validate = false;
            validate.message += this.state.message;
        }
        if (!this.state.company) {
            validate.validate = false;
            validate.message += `Company Name is required `
        }
        return validate;

    }
    async registercompany() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        if (myuser) {

            let url = this.state.url;
            let company = this.state.company;
            let address = "";
            let city = "";
            let contactstate = "";
            let zipcode = "";
            let newCompany = CreateCompany(url, company, address, city, contactstate, zipcode)
            newCompany.providerid = myuser.providerid;
            try {

                let response = await RegisterNewCompany(newCompany);
                console.log(response)
                if (response.hasOwnProperty("allusers")) {
                    let companys = returnCompanyList(response.allusers);
                    this.props.reduxAllCompanys(companys)
                    this.props.reduxAllUsers(response.allusers);

                }
                if (response.hasOwnProperty("myuser")) {

                    this.props.reduxUser(response.myuser)
                }
                if(response.hasOwnProperty("message")) {
                    this.setState({message:response.message})
                }

            } catch (err) {
                alert(err)
            }

        }
    }
    async addexistingcompany(company) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
            if (myuser) {

                let values = { providerid: myuser.providerid, companyid: company.companyid }

                try {
                    let response = await AddExistingCompany(values)
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);

                    }
                    if (response.hasOwnProperty("myuser")) {
                        console.log(response.myuser)
                        this.props.reduxUser(response.myuser)
                    }
                    if(response.hasOwnProperty("message")) {
                        this.setState({message:response.message})
                    }


                } catch (err) {
                    alert(err)
                }

            }
        

    }

    addcompany(company) {

        const construction = new Construction();
        let myuser = construction.getuser.call(this)

        if (myuser) {
         
                Alert.alert(
                    'Confirm Company',
                    `Are you sure you want to Add Yourself to Company ID ${company.company}?`,
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Add Existing Company'), style: 'cancel' },
                        { text: 'OK', onPress: () => { this.addexistingcompany(company) } },
                    ],
                    { cancelable: false }
                )



        }
    }
    registernewcompany() {

        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        let validate = this.validatenewcompany();
        if (myuser) {
            if (validate.validate) {
                Alert.alert(
                    'Confirm Company',
                    `Are you sure you want to register CompanyID: ${this.state.url} Company: ${this.state.company}?`,
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Register Company'), style: 'cancel' },
                        { text: 'OK', onPress: () => { this.registercompany() } },
                    ],
                    { cancelable: false }
                )



            } else {
                this.setState({ message: validate.message })
            }

        }
    }
    getcompanys() {
        const construction = new Construction();
        const companys = construction.getcompanys.call(this)
        let companyids = []
        if (companys) {
            companys.map(company => {
                companyids.push(this.showcompanyidsearch(company))

            })
        }
        return companyids;
    }
    showcompanyidsearch(company) {
        const construction = new Construction()
        const menu = construction.getnavigation.call(this)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const addcompany = () => {
            return ({ width: 83, height: 50 })
        }
        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={company.companyid}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont, styles.alignCenter]}>Company URL: {company.url} Company: {company.company}</Text>
                            </View>
                        </View>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <TouchableOpacity onPress={()=>{this.addcompany(company)}}>
                                    <Image source={require('./png/addcompany.png')}
                                        resizeMethod='scale'
                                        style={addcompany()}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                </View>)

        } else {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={company.companyid}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont, styles.alignCenter]}>Company URL: {company.url} Company: {company.company}</Text>
                </View>
                <View style={[styles.flex1]}>
                    <TouchableOpacity>
                        <Image source={require('./png/addcompany.png')}
                            resizeMethod='scale'
                            style={addcompany()}
                        />
                    </TouchableOpacity>
                </View>

            </View>)
        }
    }
    getaddress() {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        if (company) {
            return company.address;
        }
    
    }
    handleaddress(address) {
        const construction = new Construction()
        const myuser = construction.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.address = address;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getcity() {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        if (company) {
            return company.city;
        }
    
    }
    handlecity(city) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.city = city;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getcontactstate() {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        let contactstate = "";
        if (company) {
            contactstate = company.contactstate;
        }
        return contactstate;
    
    }
    handlecontactstate(contactstate) {
    
        const construction = new Construction()
        const myuser = construction.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.contactstate = contactstate;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getzipcode() {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        if (company) {
            return company.zipcode;
        }
    
    }
    handlezipcode(zipcode) {
        const construction = new Construction()
        const myuser = construction.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.zipcode = zipcode;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    render() {
        const construction = new Construction();
        const styles = MyStylesheet()
        const menu = construction.getnavigation.call(this)
        const downIcon = construction.downIcon.call(this)
        const mycompany = construction.getcompany.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const registerIcon = () => {
            if (menu.open) {
                return ({ width: 174, height: 34 })
            } else {
                return ({ width: 222, height: 43 })
            }

        }
        const addresscity = () => {
            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>Address</Text>
                                    <TextInput style={[styles.defaultInput, regularFont]}
                                    onChangeText={text=>{this.handleaddress(text)}}
                                    value={this.getaddress()} />
                                </View>
                            </View>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>City </Text>
                                    <TextInput style={[styles.defaultInput, regularFont]} 
                                        onChangeText={text=>{this.handlecity(text)}}
                                        value={this.getcity()}
                                    />
                                </View>
                            </View>

                        </View>
                    </View>
                )

            } else {
                return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>Address</Text>
                        <TextInput style={[styles.defaultInput, regularFont]}
                        onChangeText={text=>{this.handleaddress(text)}}
                                    value={this.getaddress()} />
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>City </Text>
                        <TextInput style={[styles.defaultInput, regularFont]} 
                            onChangeText={text=>{this.handlecity(text)}}
                                        value={this.getcity()}
                        />
                    </View>

                </View>)
            }

        }

        const statezip = () => {
            if (menu.open) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>State </Text>
                                    <TextInput style={[styles.defaultInput, regularFont]} 
                                        onChangeText={text=>{this.handlecontactstate(text)}}
                                        value={this.getcontactstate()}
                                    />
                                </View>
                            </View>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>Zipcode </Text>
                                    <TextInput style={[styles.defaultInput, regularFont]}
                                    onChangeText={text=>{this.handlezipcode(text)}} 
                                        value={this.getzipcode()}
                                    />
                                </View>
                            </View>

                        </View>
                    </View>
                )

            } else {
                return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>State</Text>
                        <TextInput style={[styles.defaultInput, regularFont]} 
                             onChangeText={text=>{this.handlecontactstate(text)}}
                                        value={this.getcontactstate()}
                        />
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>Zipcode </Text>
                        <TextInput style={[styles.defaultInput, regularFont]}
                         onChangeText={text=>{this.handlezipcode(text)}} 
                                        value={this.getzipcode()} />
                    </View>

                </View>)
            }

        }
        newCompanyForm = () => {

            if (!mycompany) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[headerFont]}>Register New Company</Text>

                                </View>
                            </View>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>Create A Company ID</Text>
                                    <TextInput style={[styles.defaultInput, regularFont]}
                                        value={this.state.url}
                                        onChangeText={text => { this.handleurl(text) }}
                                        onBlur={() => { this.validatecompanyid() }}
                                    />
                                </View>
                            </View>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>Company Name</Text>
                                    <TextInput style={[styles.defaultInput, regularFont]}
                                        value={this.state.company}
                                        onChangeText={text => { this.setState({ company: text }) }}
                                    />
                                </View>
                            </View>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1, styles.alignContentCenter]}>
                                    <TouchableOpacity onPress={() => { this.registernewcompany() }}>
                                        <Image source={require('./png/registercompany.png')}
                                            resizeMethod='scale'
                                            style={registerIcon()}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[regularFont]}>{this.state.message}</Text>
                                </View>
                            </View>

                        </View>
                    </View>)
            } else {
                return;
            }
        }
        const companyForm = () => {
            if (mycompany) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1, styles.flexDirection]}>
                                    <Text style={[headerFont]}>Additional Info </Text>
                                    <Image source={require('./png/downicon.png')}
                                        resizeMethod='scale'
                                        style={[downIcon]}
                                    />

                                </View>
                            </View>

                            {addresscity()}

                            {statezip()}

                            {construction.showsavecompany.call(this)}

                    </View>
                    </View>)
            } else {
                return;
            }
        }
        addExistingCompany = () => {
            if (!mycompany) {
                return (
                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[headerFont]}>Add Existing Company </Text>

                                </View>
                            </View>

                            {this.getcompanys()}
                        </View>
                    </View>

                )
            } else {
                return;
            }
        }
        const myuser = construction.getuser.call(this)
        if(myuser) {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[styles.alignCenter, headerFont, styles.boldFont]}>/company</Text>

                        </View>
                    </View>

                    {newCompanyForm()}
                    {addExistingCompany()}

                    {companyForm()}

                </View>
            </View>
        )
        } else {
            return(construction.loginMessage.call(this,'Company'))
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

export default connect(mapStateToProps, actions)(Company)