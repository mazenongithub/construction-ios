import React from 'react';
import { Alert, View, Text, TextInput, Image,TouchableOpacity } from 'react-native';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { CreateAccount } from './functions';
import MakeID from './makeids';


class Accounts {

    
    showaccountids() {
        const accounts = new Accounts();
        const styles = MyStylesheet();
        const construction = new Construction();
        const myaccounts = construction.getmyaccounts.call(this);
        let accountids = [];
        if (myaccounts) {
            myaccounts.map(account => {
                accountids.push(accounts.showaccountid.call(this, account))

            })
        }
        return accountids;

    }
    makeaccountactive(accountid) {
        if (this.state.activeaccountid === accountid) {
            this.setState({ activeaccountid: false })

        } else {
            this.setState({ activeaccountid: accountid })
        }

    }
    validateDeleteAccount(account) {
        const construction = new Construction();
        let deleteaccount = true;
        let deletemessage = "";
        const accountid = account.accountid;
        const myuser = construction.getuser.call(this);
        if (myuser) {
            const myemployees = construction.getmyemployees.call(this);
            if (myemployees.hasOwnProperty("length")) {
                // eslint-disable-next-line
                myemployees.map(employee => {
                    if (employee.hasOwnProperty("benefits")) {
                        // eslint-disable-next-line
                        employee.benefits.benefit.map(benefit => {
                            if (benefit.accountid === accountid) {
                                deleteaccount = false;
                                deletemessage += `Account ID is associated to employee ${employee.providerid}`
                            }
                        })
                    }
                })
            }

        }
        let mymaterials = construction.getmymaterials.call(this);
        if (mymaterials.hasOwnProperty("length")) {
            // eslint-disable-next-line
            mymaterials.map(mymaterial => {
                if (mymaterial.accountid === accountid) {
                    deleteaccount = false;
                    deletemessage += `Account ID is associated to materials ${mymaterial.material}`

                }
            })

        }
        let myequipment = construction.getmyequipment.call(this);
        if (myequipment.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                if (equipment.accountid === accountid) {
                    deleteaccount = false;
                    deletemessage += `Account ID is associated to equipment ${equipment.equipment}`
                }
            })
        }

        return { deleteaccount, deletemessage }
    }

    confirmremoveaccount(account) {
        let construction = new Construction();
        const accounts = new Accounts();
        let validate = accounts.validateDeleteAccount.call(this, account);
        if (validate.deleteaccount) {
            const myuser = construction.getuser.call(this);
            
            if (myuser) {
                const checkmanager = construction.checkmanager.call(this);
                if(checkmanager) {

                const i = construction.getaccountkeybyid.call(this, account.accountid)
                myuser.company.office.accounts.account.splice(i, 1);
                this.props.reduxUser(myuser)
                this.setState({activeaccountid:false})



            } else {
                alert(`Only Managers can remove account`)
            }
        }

        } else {
            const message = validate.deletemessage;
            this.setState({ message })
        }




    }
    removeaccount(account) {
        const accounts = new Accounts();
        Alert.alert(
            'Delete Account',
            `Are you sure you want to remove ${account.accountname}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove accout '), style: 'cancel' },
                { text: 'OK', onPress: () => { accounts.confirmremoveaccount.call(this, account) } },
            ],
            { cancelable: false }
        )
    }
    showaccountid(account) {
        const accounts = new Accounts();
        const construction = new Construction();
        const removeIconSize = construction.getremoveicon.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        const checkmanager = construction.checkmanager.call(this)
        const activeBackground = () => {
            if (account.accountid === this.state.activeaccountid) {
                return (styles.activeBackground)
            } else {
                return;
            }
        }

        const remove = () => {
            if(checkmanager) {
                return(<TouchableOpacity onPress={() => { accounts.removeaccount.call(this, account) }}>
                <Image source={require('./png/removeIcon.png')}
                    style={removeIconSize}
                    resizeMethod='scale'
                />
            </TouchableOpacity>
)
            }
        }


        return (
            <View style={[styles.generalFlex]} key={account.accountid}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]} >
                        <View style={[styles.flex3]}>
                            <Text style={[regularFont, activeBackground()]} onPress={() => { accounts.makeaccountactive.call(this, account.accountid) }}> {account.accountname}</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            {remove()}
                        </View>
                    </View>

                    <View style={[styles.generalFlex,styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[styles.regularFont]} onPress={()=>{this.handleviewaccount(account.accountid)}}>View Account</Text>
                        </View>
                    </View>
                </View>
            </View>
        )


    }
    handleaccountname(accountname) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            const checkmanager = construction.checkmanager.call(this)
            if(checkmanager) {
            if (this.state.activeaccountid) {

                let i = construction.getaccountkeybyid.call(this, this.state.activeaccountid)
                if (myuser.hasOwnProperty("company")) {
                    if (myuser.company.hasOwnProperty("office")) {
                        if (myuser.company.office.hasOwnProperty("accounts")) {
                            myuser.company.office.accounts.account[i].accountname = accountname;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    }
                }
            } else {
                let accountid = makeID.accountid.call(this)

                let newaccount = CreateAccount(accountid, accountname)

                if (myuser.company.office.hasOwnProperty("accounts")) {
                    myuser.company.office.accounts.account.push(newaccount)
                } else {
                    let accounts = { account: [newaccount] }
                    myuser.company.office.accounts = accounts;
                }
                this.props.reduxUser(myuser)
                this.setState({ activeaccountid: accountid })

            }
        } else {
            alert(`Only Managers can update accounts`)
        }
        }
    }
    getaccountname() {
        const construction = new Construction();
        if (this.state.activeaccountid) {
            let account = construction.getaccountbyid.call(this, this.state.activeaccountid)
            return (account.accountname)
        } else {
            return (this.state.accountname)
        }
    }
    showaccounts() {
        const accounts = new Accounts();
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this)
        const styles = MyStylesheet();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this);
        const checkmanager = construction.checkmanager.call(this)
        const Account = () => {
            return (<View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.alignCenter, styles.boldFont]}>/{mycompany.url}</Text>
                            <Text style={[headerFont, styles.alignCenter, styles.boldFont]}>/accounts</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}> Account Name </Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                value={accounts.getaccountname.call(this)}
                                onChangeText={text => { accounts.handleaccountname.call(this, text) }}
                            />
                        </View>
                    </View>

                    {accounts.showaccountids.call(this)}

                    {construction.showsavecompany.call(this)}

                </View>
            </View>)
        }
        if (myuser) {
            if(checkmanager) {
            return (Account())
            } else {
                return (<Text style={[regularFont]}>You have to be a Manager to view Accounts</Text>)
            }
        } else {
            return (construction.loginMessage.call(this, "Employees"))
        }

    }
}

export default Accounts