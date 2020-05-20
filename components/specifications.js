import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import CSI from './csi'

class Specifications extends Component {
    constructor(props) {
        super(props);
        this.state = {csiid:false,csi_1:'', csi_2:'',csi_3:''}
    }
    getcsiid() {
        const construction = new Construction();
        const csi = construction.getcsibyid.call(this,this.state.csiid)
        if (csi) {
            return (`${csi.csi}-${csi.title}`)
        } else {
            return ""
        }
       
    }
handlecsiid(csiid) {
    const construction = new Construction();
    const csi = construction.getcsibyid.call(this,csiid)
    let csi_1 = "";
    let csi_2 = "";
    let csi_3 = "";
    if(csi) {
    csi_1 = csi.csi.substr(0, 2)
                csi_2 = csi.csi.substr(2, 2)
                csi_3 = csi.csi.substr(4, 2)
    }
    this.setState({csiid,csi_1,csi_2,csi_3})
}
    render() {
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this)
        const styles = MyStylesheet();
        const csi = new CSI();
        const headerFont = construction.getHeaderFont.call(this)
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.alignCenter]}>/{mycompany.url}/construction</Text>
                        </View>
                    </View>

                   {csi.showcsi.call(this)}
                    
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
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Specifications)