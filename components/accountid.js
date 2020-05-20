import React from 'react';
import {View,Text,TextInput} from 'react-native';
import {MyStylesheet} from './styles'
import Construction from './construction';


class AccountID {
getintitalindex() {
    return 0;
}
getaccounts() {
    const construction = new Construction();
    const myaccounts = construction.getmyaccounts.call(this)
    
    return (myaccounts)
}
showactiveaccount() {
        const construction = new Construction();
        const accountid = this.getaccountid();
        const account = construction.getaccountbyid.call(this,accountid);
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        if(account) {
            return(<Text style={[styles.activeBackground, regularFont]}>{account.accountname}</Text>)
        }  

}
    
showsearchaccount(account) {
    const styles = MyStylesheet();
    const construction = new Construction();
    const regularFont = construction.getRegularFont.call(this)
    return(
    <View style={[styles.generalFlex]} key={`search${account.accountid}`}>
    <View style={[styles.flex1]}>
        <Text style={[regularFont]} onPress={()=>{this.handleaccountid(account.accountid)}}>{account.accountname}</Text>
    </View>
    </View>)
}
showdropdown() {
    const search = this.state.accountname;
    let results = [];
    let accountids = [];
    const accountid = new AccountID();
    const accounts = accountid.getaccounts.call(this)
    if(accounts) {
        accounts.map(account=> {

            if(search && account.accountname.toLowerCase().startsWith(search.toLowerCase())) {
            results.push(account)
            }
        })
    }

    if(results.length>0) {
        results.map(acct=> {
            accountids.push(accountid.showsearchaccount.call(this,acct))

        })
    }
    return accountids;
}
showaccountid() {
    const styles = MyStylesheet();
    const accountid = new AccountID();
    const construction = new Construction();
    const regularFont = construction.getRegularFont.call(this)
    return(
    <View style={[styles.generalFlex]}>
        <View style={[styles.flex1]}>

        <View style={[styles.generalFlex]}>
        <View style={[styles.flex1]}>
            <Text style={[styles.regularFont]}>Account ID</Text>
            {accountid.showactiveaccount.call(this)} 
            <TextInput style={[styles.defaultInput,regularFont]} 
                value={this.state.accountname}
                onChangeText={text=>{this.setState({accountname:text})}}
            />
         
            
        </View>
    </View>

    {accountid.showdropdown.call(this)}
 

        </View>
    </View>)
}
showaccounts() {
    const accountid = new AccountID();
    const accounts = accountid.getaccounts.call(this)
    let accountids = [];
    if(accounts) {
        accounts.map(account=>{
            accountids.push(accountid.showid.call(this,account))
        })
    }
    return accountids;

}
}
export default AccountID;

