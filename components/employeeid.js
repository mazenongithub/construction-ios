import React from 'react';
import {FlatList, View,Text,TouchableOpacity} from 'react-native';
import Construction from './construction'
import {MyStylesheet} from './styles'
import { TextInput } from 'react-native-gesture-handler';
class EmployeeID {
   
    showemployeesearch() {
        const employeeid = new EmployeeID();
        const construction = new Construction();
        const myemployees = construction.getmyemployees.call(this)
        const search = this.state.employee;
        const checkmanager = construction.checkmanager.call(this)
        let results = [];
        let myusers = [];
        const myuser = construction.getuser.call(this)
        if(myuser) {

        if(myemployees) {
            myemployees.map(myemployee=> {
                if(checkmanager || myemployee.providerid === myuser.providerid )
                myusers.push(construction.getemployeebyid.call(this,myemployee.providerid))
            })
        }
        if(myusers.length>0) {
            myusers.map(myuser=> {
                

                if (myuser.firstname.toLowerCase().startsWith(search.toLowerCase()) || myuser.lastname.toLowerCase().startsWith(search.toLowerCase()) || `${myuser.firstname.toLowerCase()} ${myuser.lastname.toLowerCase()}`.startsWith(search.toLowerCase()) && search) {
                    results.push(employeeid.showsearchids.call(this, myuser))
                } else if(!search) {
                    results.push(employeeid.showsearchids.call(this, myuser))
                }
            })

            
        }
    }
        return results;
    }
    showsearchids(myuser) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]} key={myuser.providerid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]} onPress={()=>{this.handleemployeeid(myuser.providerid)}}>{myuser.firstname} {myuser.lastname} </Text>
            </View>
        </View>
        )
    }
        showemployeeid() {
            const construction = new Construction();
            const employeeid = new EmployeeID()
            const styles = MyStylesheet();
            const regularFont = construction.getRegularFont.call(this)
            const activeemployee = () => {
                const myemployeeid = this.getemployeeid();
                const myuser = construction.getemployeebyid.call(this, myemployeeid)
                if(myuser) {
                    return(<Text style={[styles.activeBackground,regularFont]}>{myuser.firstname} {myuser.lastname}</Text>)
                }
            }

            return( 
                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1]}>
                    <Text style={[regularFont]}> EmployeeID</Text>
                    {activeemployee()}
                    <TextInput style={[styles.regularFont,styles.defaultInput]} 
                        value={this.state.employee}
                        onChangeText={text=>{this.setState({employee:text})}}
                    />
                    <View style={{...styles.generalContainer, ...styles.maxHeight140}}>
                    {employeeid.showemployeesearch.call(this)}
                    </View>
                </View>
            </View>
           )
    
        }
}
export default EmployeeID;