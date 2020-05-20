import React, { Component } from 'react';
import { TouchableOpacity, Alert, View, Text, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import AccountID from './accountid'
import { CreateMaterial, isNumeric } from './functions';
import MakeID from './makeids'


class Materials extends Component {
    constructor(props) {
        super(props)
        this.state = this.state = { render: '', accountname:'', activematerialid: '', materialid: '', material: '', accountid: '', unit: '', unitcost: '', message: '' }
    }

    
    makematerialactive(materialid) {
        const construction = new Construction();
        const material = construction.getmymaterialbyid.call(this,materialid);
        const accountid = material.accountid;
        const account = construction.getaccountbyid.call(this,accountid)
        const accountname = account.accountname;
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false, accountname:''})
        } else {
            this.setState({ activematerialid: materialid, accountname })
        }

    }


    getmaterial() {
        const construction = new Construction();
        if (this.state.activematerialid) {
            let mymaterial = construction.getmymaterialbyid.call(this, this.state.activematerialid)
            if (mymaterial) {
                return mymaterial.material;
            }
        } else {
            return this.state.material;
        }
    }

    handlematerial(material) {
        const construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            if (this.state.activematerialid) {
                let i = construction.getmaterialkeybyid.call(this, this.state.activematerialid)
                myuser.company.materials.mymaterial[i].material = material;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render', material: '' })


            } else {
                let materialid = makeID.materialid.call(this)
                let accountid = this.state.accountid;
                let unit = this.state.unit;
                let unitcost = this.state.unitcost;
                let newMaterial = CreateMaterial(materialid, material, accountid, unit, unitcost)
                if (myuser.company.hasOwnProperty("materials")) {
                    myuser.company.materials.mymaterial.push(newMaterial)
                } else {
                    let materials = { mymaterial: [newMaterial] }
                    myuser.company.materials = materials;
                }
                this.props.reduxUser(myuser)
                this.setState({ activematerialid: newMaterial.materialid })
            }
        }
    }

    getunit() {
        const construction = new Construction();
        if (this.state.activematerialid) {
            let mymaterial = construction.getmymaterialbyid.call(this, this.state.activematerialid)
            if (mymaterial) {
                return mymaterial.unit;
            }
        } else {
            return this.state.unit;
        }
    }

    handleunit(unit) {
        const construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            if (this.state.activematerialid) {
                let i = construction.getmaterialkeybyid.call(this, this.state.activematerialid)
                myuser.company.materials.mymaterial[i].unit = unit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render', material: '' })


            } else {
                let materialid = makeID.materialid.call(this)
                let accountid = this.state.accountid;
                let material = this.state.material;
                let unitcost = this.state.unitcost;
                let newMaterial = CreateMaterial(materialid, material, accountid, unit, unitcost)
                if (myuser.company.hasOwnProperty("materials")) {
                    myuser.company.materials.mymaterial.push(newMaterial)
                } else {
                    let materials = { mymaterial: [newMaterial] }
                    myuser.company.materials = materials;
                }
                this.props.reduxUser(myuser)
                this.setState({ activematerialid: newMaterial.materialid })
            }
        }
    }

    getunitcost() {
        const construction = new Construction();
        if (this.state.activematerialid) {
            let mymaterial = construction.getmymaterialbyid.call(this, this.state.activematerialid)
            if (mymaterial) {
                return mymaterial.unitcost;
            }
        } else {
            return this.state.unitcost;
        }
    }

    handleunitcost(unitcost) {
        if(isNumeric(unitcost)) {
        const construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this)
        if (myuser) {
            if (this.state.activematerialid) {
                let i = construction.getmaterialkeybyid.call(this, this.state.activematerialid)
                myuser.company.materials.mymaterial[i].unitcost = unitcost;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render', material: '' })


            } else {
                let materialid = makeID.materialid.call(this)
                let accountid = this.state.accountid;
                let material = this.state.material;
                let unit = this.state.unit;
                let newMaterial = CreateMaterial(materialid, material, accountid, unit, unitcost)
                if (myuser.company.hasOwnProperty("materials")) {
                    myuser.company.materials.mymaterial.push(newMaterial)
                } else {
                    let materials = { mymaterial: [newMaterial] }
                    myuser.company.materials = materials;
                }
                this.props.reduxUser(myuser)
                this.setState({ activematerialid: newMaterial.materialid })
            }
        }
    } else {
        alert(`Unit Cost should be a number `)
    }
    }

    getaccountid() {
        const construction = new Construction();
        if (this.state.activematerialid) {
            let mymaterial = construction.getmymaterialbyid.call(this, this.state.activematerialid)
            if (mymaterial) {
                return mymaterial.accountid;
            }
        } else {
            return this.state.accountid;
        }
    }

    handleaccountid(accountid) {
        const construction = new Construction();
        const makeID = new MakeID();
        let myuser = construction.getuser.call(this)
        const account = construction.getaccountbyid.call(this,accountid)
        const accountname = account.accountname;
        if (myuser) {
            if (this.state.activematerialid) {
                let i = construction.getmaterialkeybyid.call(this, this.state.activematerialid)
                myuser.company.materials.mymaterial[i].accountid = accountid;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render', material: '', accountname })


            } else {
                let materialid = makeID.materialid.call(this)
                let unitcost = this.state.unitcost;
                let material = this.state.material;
                let unit = this.state.unit;
                let newMaterial = CreateMaterial(materialid, material, accountid, unit, unitcost)
                if (myuser.company.hasOwnProperty("materials")) {
                    myuser.company.materials.mymaterial.push(newMaterial)
                } else {
                    let materials = { mymaterial: [newMaterial] }
                    myuser.company.materials = materials;
                }
                this.props.reduxUser(myuser)
                this.setState({ activematerialid: newMaterial.materialid, accountname })
            }
        }
    }
    validatematerial(material) {
        const construction = new Construction();
        const myprojects = construction.getmyprojects.call(this);
        let validate = true;
        let validatemessage = "";
        const materialid = material.materialid;
        if (myprojects.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map(mymaterial => {
                        if (mymaterial.mymaterialid === materialid) {
                            validate = false;
                            validatemessage += `Could not delete material ${material.material}, exists inside schedule materials Project ID ${myproject.title}. `
    
                        }
                    })
    
                }
    
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
                        if (mymaterial.mymaterialid === materialid) {
                            validate = false;
                            validatemessage += `Could not delete material ${material.material}, exists inside actual materials Project ID ${myproject.title}. `
    
                        }
                    })
    
                }
            })
        }
        return { validate, validatemessage }
    }
    
    confirmremovematerial(material) {
        const construction = new Construction();
            const validate = this.validatematerial(material);
            if (validate.validate) {
                let myuser = construction.getuser.call(this);
                const i = construction.getmaterialkeybyid.call(this, material.materialid);
                myuser.company.materials.mymaterial.splice(i, 1);
                this.props.reduxUser(myuser);
                this.setState({ activematerialid: false, message: '' })
            } else {
                this.setState({ message: validate.validatemessage })
            }
    }
    removematerial(material) {
        Alert.alert(
            'Delete Material',
            `Are you sure you want to remove ${material.material}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove Material '), style: 'cancel' },
                { text: 'OK', onPress: () => { this.confirmremovematerial(material) } },
            ],
            { cancelable: false }
        )
    }
    showmaterialid(mymaterial) {
        const construction = new Construction();
        const menu = construction.getnavigation.call(this)
        const removeIconSize = construction.getremoveicon.call(this)
        const account = construction.getaccountbyid.call(this, mymaterial.accountid)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
   const activeBackground = () => {
       if(this.state.activematerialid === mymaterial.materialid) {
        return (styles.activeBackground)
       } else {
        return;
       }
   }
        if (menu.open) {
            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={mymaterial.materialid}>
                    <View style={[styles.flex1, styles.flexDirection]}>
                        <Text style={[regularFont, activeBackground()]} onPress={() => { this.makematerialactive(mymaterial.materialid) }}>{mymaterial.material}  {mymaterial.unitcost}/{mymaterial.unit} Account:{account.accountname}</Text>
                        <TouchableOpacity onPress={()=>{this.removematerial(mymaterial)}}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                        </TouchableOpacity>

                    </View>
                </View>)
        } else {
            return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={mymaterial.materialid}>
                <View style={[styles.flex4]}>
                    <Text style={[regularFont, activeBackground()]} onPress={() => { this.makematerialactive(mymaterial.materialid) }}> {mymaterial.material}  {mymaterial.unitcost}/{mymaterial.unit} Account:{account.accountname}</Text>
                </View>
                <View style={[styles.flex1]}>
                <TouchableOpacity onPress={()=>{this.removematerial(mymaterial)}}>
                    <Image source={require('./png/removeIcon.png')}
                        style={removeIconSize}
                        resizeMethod='scale'
                    />
                </TouchableOpacity>

                </View>
            </View>)
        }
    }
    showmaterialids() {
        const construction = new Construction();
        const mymaterials = construction.getmymaterials.call(this);
        let materialids = []
        if (mymaterials) {
            mymaterials.map(mymaterial => {
                materialids.push(this.showmaterialid(mymaterial))
            })
        }
        return materialids;
    }
    render() {
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this)
        const styles = MyStylesheet();
        const accountid = new AccountID()
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        if(myuser) {
            return(  <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.alignCenter]}>/{mycompany.url}/materials</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}> Create A Material </Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { this.handlematerial(text) }}
                                value={this.getmaterial()}
                            />
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}> Unit </Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                value={this.getunit()}
                                onChangeText={text => { this.handleunit(text) }}
                            />
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}> Unit Cost</Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                value={this.getunitcost()}
                                onChangeText={text => { this.handleunitcost(text) }} />
                        </View>
                    </View>

                    {accountid.showaccountid.call(this)}

                    {construction.showsavecompany.call(this)}

                    {this.showmaterialids()}

                </View>
            </View>)
        } else {
    
            return(construction.loginMessage.call(this,"Materials"))
          

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

export default connect(mapStateToProps, actions)(Materials)