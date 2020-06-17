import React from 'react'
import { View, Text, TextInput} from 'react-native';
import { MyStylesheet } from './styles';
import Construction from './construction';
import {sortcode} from './functions'


class CSI {

    getsearchresults() {
        const construction = new Construction();
        let csi_1 = this.state.csi_1;
        let csi_2 = this.state.csi_2;
        let csi_3 = this.state.csi_3;
        let searchcsi = "";
        let results = [];
        const validatecode = (results, code) => {
    
            let validate = true;
            if (results.hasOwnProperty("length")) {
                // eslint-disable-next-line
                results.map(result => {
                    if (result.csiid === code.csiid) {
                        validate = false;
                    }
                })
            }
            return validate;
        }
        if (csi_1.length === 2) {
            searchcsi += csi_1.substr(0, 2)
        }
        if (csi_2.length === 2) {
            searchcsi += csi_2.substr(0, 2)
        }
        if (csi_3.length === 2) {
            searchcsi += csi_3.substr(0, 2)
        }
    
        if (searchcsi) {
            const codes = construction.getallcsicodes.call(this)
    
            if (codes) {
                if (codes.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    codes.map(code => {
    
                        if (code.csi.startsWith(searchcsi)) {
    
                            if (validatecode(results, codes)) {
                                results.push(code)
                            }
    
    
                        }
    
    
    
                    })
    
                }
    
            }
    
            results.sort((codeb, codea) => {
    
                return sortcode(codeb, codea)
            })
    
        }
        let myresults = [];
        // eslint-disable-next-line
        results.map(result => {
            if (validatecode(myresults, result)) {
                myresults.push(result)
            }
        })
    
        return myresults;
    }
    showcsiid(code) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
    
    
        return (<View style={[styles.generalFlex, styles.bottomMargin10]} key={code.csiid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]} onPress={()=>{this.handlecsiid(code.csiid)}}> {code.csi} - {code.title}</Text>
            </View>
        </View>)
    
    
    }
    
    showsearchresults() {
        const csi = new CSI();
        let results = csi.getsearchresults.call(this)
    
        let csiids = [];
        // eslint-disable-next-line
        results.map(code => {
            csiids.push(csi.showcsiid.call(this, code))
    
        })
        return csiids;
    }
    
    showcsi() {
        const styles = MyStylesheet();
        const construction = new Construction()
        const regularFont = construction.getRegularFont.call(this)
        const csi = new CSI();
        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1]}>
    
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Construction Specification </Text>
                        </View>
                    </View>
    
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>
                            <TextInput style={[styles.defaultInput, regularFont]} 
                            value={this.state.csi_1}
                            onChangeText={text=>{this.setState({csi_1:text})}}
                               
                            />
                        </View>
                        <View style={[styles.flex1]}>
                            <TextInput style={[styles.defaultInput, regularFont]} 
                             value={this.state.csi_2}
                            onChangeText={text=>{this.setState({csi_2:text})}}
                          
                            />
                        </View>
                        <View style={[styles.flex1]}>
                            <TextInput style={[styles.defaultInput, regularFont]}
                             value={this.state.csi_3}
                            onChangeText={text=>{this.setState({csi_3:text})}} />
                             
                        </View>
                    </View>
                    <TextInput style={[regularFont, styles.defaultInput]}
                        value={this.getcsiid()}
                    />

                    {csi.showsearchresults.call(this)}
    
    
                </View>
            </View>
        )
}
}
export default CSI