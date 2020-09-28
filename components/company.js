import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { Alert, View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LoadAllUsers, RegisterNewCompany, AddExistingCompany, ValidateCompanyID } from './actions/api';
import { returnCompanyList, CreateCompany, validateCompanyID, validateProviderID } from './functions';
import Construction from './construction';

class Company extends Component {
    constructor(props) {
        super(props)
        this.state = { render: '', url: '', company: '', urlcheck: false, message: '' }
        this.updatedimesions = this.updatedimesions.bind(this)
   
    }
    
    
    componentDidMount() {
    
        Dimensions.addEventListener('change', this.updatedimesions);
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
        const construction = new Construction();
        if(!this.props.allusers.hasOwnProperty("length")) {
            construction.loadallusers.call(this)
            }
      
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updatedimesions)
    }
    updatedimesions() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
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

  
    async validatecompanyid() {
      
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            let values = {};
            let url = "";
            if (myuser.hasOwnProperty("company")) {
                 url = myuser.company.url;
                values = { oldcompanyid: myuser.company.companyid, newcompanyid: url }

            } else {
               url = this.state.url;
                values = { oldcompanyid: "", newcompanyid: url }
            }
        
            let response = await ValidateCompanyID(values);
            console.log(response)
            if (response.hasOwnProperty("invalid")) {
                if (myuser.hasOwnProperty("company")) {
                    myuser.company.invalid = response.invalid;
                }
                this.props.reduxUser(myuser)
                this.setState({ urlcheck: false, message: response.invalid })

            } else if (response.hasOwnProperty("valid")) {

                if (myuser.hasOwnProperty("company")) {
                    if (myuser.company.hasOwnProperty("invalid")) {
                        delete myuser.company.invalid;
                        this.props.reduxUser(myuser);
                        let message = `Your Company Will be Hosted at http://construction.civilengineer.io/${myuser.profile}/company/${url}`
                        this.setState({ urlcheck: true, message })

                    }

                }


            }

        }
    }
    showcompanyid() {
        const styles = MyStylesheet();
        const construction = new Construction()
        const regularFont = construction.getRegularFont.call(this);
        const goIcon = construction.getgochecksmall.call(this)

        const urlicon = () => {
            if (this.state.urlcheck) {
                return (<Image source={require('./png/gocheck.png')}
                resizeMethod='scale'
                style={goIcon}
            />)
            }
        }
       
            return (<View style={{ ...styles.generalFlex }}>

                <View style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    <Text style={{...regularFont}}>Company URL </Text>
                    <TextInput
                        value={this.state.url}
                        onChangeText={text => { this.handleurl(text) }}
                        onBlur={() => { this.validatecompanyid() }}
                        style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.defaultInput }} />
                    {urlicon()}
                </View>

            </View>)
        
    }
    showcompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
       
            
            return (<View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                   <Text style={{...regularFont}}> Company </Text>
                   <TextInput style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.defaultInput }}
                        value={this.state.company}
                        onChangeText={text => { this.setState({ company: text }) }} />

                </View>
            </View>)
        
    }
    showcompanysearch() {
        let companysearch = [];
        if (this.props.allcompanys) {
            if (this.props.allcompanys.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.allcompanys.map(company => {
                    companysearch.push(this.showcompanyidsearch(company))
                })
            }
        }
        return companysearch;
    }
    getAddCompany() {
        
            return ({ width: 63, height: 37 })
        
    }
    showcompanyidsearch(company) {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        const addCompany = this.getAddCompany()

    
            return (<View style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }} key={company.companyid}>
                <View style={{ ...styles.flex2,...styles.generalFont }}>
                    <Text style={{...regularFont}}>Company: {company.url} Company: {company.company}</Text>
                </View>
                <View style={{ ...styles.flex1 }}>
                <TouchableOpacity onPress={()=>{this.confirmaddcompany(company)}}>
                                    <Image source={require('./png/addcompany.png')}
                                        resizeMethod='scale'
                                        style={addCompany}
                                    />
                                </TouchableOpacity>
                </View>
            </View>)
        
    }
    chooseacompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
       
            return (<View style={{ ...styles.generalFlex }}>
          
                <View style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <Text style={{...regularFont}}>Add an Existing Company</Text> 
                    {this.showcompanysearch()}
                </View>
            </View>)
        
    }

    getArrowHeight() {
        if (this.state.width > 800) {
            return (
                {
                    width: '55',
                    height: '48'
                })

        } else {
            return (
                {
                    width: '45',
                    height: '34'
                })
        }

    }


    confirmaddcompany(company) {

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

    async addexistingcompany(company) {
    const construction = new Construction()

            const myuser = construction.getuser.call(this)

            if (myuser) {

                let values = { providerid: myuser.providerid, companyid: company.companyid }

                try {
                    let response = await AddExistingCompany(values)
                    console.log(response)
                  
                    if (response.hasOwnProperty("myuser")) {
            
                        this.props.reduxUser(response.myuser)
                    }
                    if (response.hasOwnProperty("message")) {
                        this.setState({ message: response.message })
                    }


                } catch (err) {
                    alert(err)
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
    handleurl(url) {
        url = url.toLowerCase();
        this.setState({ url });
        let validate = validateCompanyID(url);
        if (validate) {
            this.setState({ urlcheck: false, message: validate })
        } else {
            let message = `Your Company Will be Hosted at ${process.env.REACT_APP_CLIENT_API}/company/${url}`
            this.setState({ urlcheck: true, message })
        }
    }
    confirmregisternewcompany(){

        Alert.alert(
            'Confirm Company',
            `Are you sure you want to register Company/ ${this.state.url}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Register Company'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.registernewcompany() } },
            ],
            { cancelable: false }
        )

    }

    async registernewcompany() {

        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        let validate = this.validatenewcompany();
        if (myuser) {
            if (validate.validate) {

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
                           
                            if (response.hasOwnProperty("myuser")) {

                                this.props.reduxUser(response.myuser);
                                this.setState({message:''})
                            }

                        } catch (err) {
                            alert(err)
                        }

                    
                }
            } else {
                this.setState({ message: validate.message })
            }

        
    }
    handleregisternewcompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const registerIcon = ()=> {
       
                if (menu.open) {
                    return ({ width: 174, height: 34 })
                } else {
                    return ({ width: 222, height: 43 })
                }
    
            
        }
        const regularFont = construction.getRegularFont.call(this)
        if (this.state.urlcheck) {
            return (
                <View style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignContentCenter }}>
                       <TouchableOpacity onPress={() => { this.registernewcompany() }}>
                                        <Image source={require('./png/registercompany.png')}
                                            resizeMethod='scale'
                                            style={registerIcon()}
                                        />
                        </TouchableOpacity> 
                    <Text style={{...regularFont}}>  {this.state.message} </Text>
                </View>
            )
        } else {
            return (<View style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                 <Text style={{...regularFont}}>  {this.state.message} </Text>
            </View>)
        }
    }
    showaddnewcompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this);
        const myuser = construction.getuser.call(this)
        if (myuser) {
            if (!myuser.hasOwnProperty("company")) {
                return (<View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1, ...styles.bottomMargin15 }}>

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter }}>
                                <Text style={{...styles.generalFont, ...headerFont}}>Create A New Company</Text>
                         </View>
                        </View>

                        {this.showcompanyid()}
                        {this.showcompany()}






                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter }}>

                                {this.handleregisternewcompany()}

                            </View>
                        </View>

                        {this.chooseacompany()}

                    </View>
                </View>)
            } else {
                return;
            }
        } else {
            return;
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
        let myuser = construction.getuser.call(this)
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
        const construction = new Construction()
        let myuser = construction.getuser.call(this)
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
        let myuser = construction.getuser.call(this)
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
        let myuser = construction.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.zipcode = zipcode;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    getmycompany() {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        if (company) {
            return company.company;
        }

    }
    handlemycompany(company) {
        const construction = new Construction()
        let myuser = construction.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.company = company;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    getmyurl() {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        if (company) {
            return company.url;
        }

    }

    handlemyurl(url) {
        const construction = new Construction()
        let myuser = construction.getuser.call(this)
        myuser.company.url = url;
        this.props.reduxUser(myuser);
        let errmsg = "";
        if (myuser) {
        errmsg += validateProviderID(url)
        if(!errmsg) {
       
      
            if (myuser.hasOwnProperty("company")) {
                if(myuser.company.hasOwnProperty("invalid")) {
                    delete myuser.company.invalid
                }

                this.props.reduxUser(myuser);
                this.setState({ message:'' })
            }
         
        } else {
            myuser.company.invalid = errmsg;
            this.props.reduxUser(myuser);
            this.setState({message:errmsg})
        }

    }

    
    }
    showmycompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const myuser = construction.getuser.call(this)
        const downIcon = construction.downIcon.call(this)
        const goIcon = construction.getgochecksmall.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {

                const urlicon = () => {
                    if (!myuser.company.hasOwnProperty("invalid")) {
                       return (<Image source={require('./png/gocheck.png')}
                        resizeMethod='scale'
                        style={goIcon}
                    />)
                    }
                }
                return (
                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>

                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex2, ...styles.bottomMargin15, ...regularFont }}>

                                    <Text style={{...regularFont}}>Company Info</Text>
                                    

                                </View>
                                <View style={{...styles.flex1}}>
                                <Image source={require('./png/downicon.png')}
                                        resizeMethod='scale'
                                        style={[downIcon]}
                                    />
                                </View>
                            </View>

                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                <Text style={{...regularFont}}>Company </Text>
                                    <TextInput style={{ ...styles.defaultInput, ...styles.regularFont, ...regularFont }}
                                        value={this.getmycompany()}
                                        onChangeText={text => { this.handlemycompany(text) }} />
                                </View>
                                <View style={{ ...styles.flex1, ...regularFont, ...styles.addMargin }}>
                                <Text style={{...regularFont}}>URL </Text>
                                    <TextInput style={{ ...styles.defaultInput,  ...regularFont }}
                                        value={this.getmyurl()}
                                        onChangeText={text => { this.handlemyurl(text) }}
                                        onBlur={() => { this.validatecompanyid() }} />

                                    {urlicon()}
                                </View>
                            </View>

                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1,  ...regularFont, ...styles.addMargin }}>
                                <Text style={{...regularFont}}>Address </Text>
                                    <TextInput style={{ ...styles.defaultInput,  ...regularFont }}
                                        value={this.getaddress()}
                                        onChangeText={text => { this.handleaddress(text) }} />
                                </View>
                                <View style={{ ...styles.flex1,  ...regularFont, ...styles.addMargin }}>
                                <Text style={{...regularFont}}>City</Text>
                                    <TextInput style={{ ...styles.defaultInput, ...regularFont }}
                                        value={this.getcity()}
                                        onChangeText={text => { this.handlecity(text) }} />
                                </View>
                            </View>

                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1,  ...regularFont, ...styles.addMargin }}>
                                <Text style={{...regularFont}}>State </Text>
                                    <TextInput style={{ ...styles.defaultInput,  ...regularFont }}
                                        value={this.getcontactstate()}
                                        onChangeText={text => { this.handlecontactstate(text) }}
                                    />
                                </View>
                                <View style={{ ...styles.flex1, ...regularFont, ...styles.addMargin }}>
                                <Text style={{...regularFont}}>Zipcode </Text>
                                    <TextInput style={{ ...styles.defaultInput,  ...regularFont }}
                                        value={this.getzipcode()}
                                        onChangeText={text => { this.handlezipcode(text) }} />
                                </View>
                            </View>
                        </View>
                    </View>)
            }
        }
    }
    handlesavecompany() {
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this);

        if (mycompany) {
            return (construction.showsavecompany.call(this))
        }
    }
    render() {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const myuser = construction.getuser.call(this)

        if (myuser) {
            const companyurl = () => {
                if (myuser.hasOwnProperty("company")) {
                    return (
                        <Text style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>/{myuser.company.url} </Text>)
                }
            }
            return (
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter }}>
                                
                                {companyurl()}
                            </View>
                        </View>

                        {this.showaddnewcompany()}

                        {this.showmycompany()}
                        {this.handlesavecompany()}
                    </View>
                </View>

            )
        } else {
            return (<View style={{ ...styles.generalContainer, ...regularFont }}>
                <Text style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Company </Text>
            </View>)
        }

    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        projectid: state.projectid,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Company);