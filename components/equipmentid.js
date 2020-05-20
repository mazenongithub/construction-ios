import React from 'react';
import {View, Text, TextInput } from 'react-native';
import Construction from './construction'
import { MyStylesheet } from './styles'
class EquipmentID {
    showresult(myequipment) {
        const styles =MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]} key={myequipment.equipmentid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]} onPress={()=>{this.handlemyequipmentid(myequipment.equipmentid)}}>{myequipment.equipment}</Text>
            </View>

        </View>
        )
    }
    showresults() {
        const construction = new Construction();
        const myequipments = construction.getmyequipment.call(this)
        const equipment = this.state.equipment;
        const equipmentid = new EquipmentID();
        let results = [];
        let equipmentids = [];
        if(myequipments && equipment) {
            myequipments.map(myequipment => {
                if(myequipment.equipment.toLowerCase().startsWith(equipment.toLowerCase()) && equipment) {
                    results.push(myequipment)
                }
            })
        }
        if(results.length>0) {
            results.map(result=>{
                equipmentids.push(equipmentid.showresult.call(this,result))
            })
        }
        return (equipmentids)
    }
    showequipmentid() {
        const construction = new Construction();
        const equipmentid = new EquipmentID()
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const activeproject = construction.getactiveproject.call(this)
        const activeequipment = () => {
            if(this.state.activeequipmentid) {
                const myequipment = construction.getmyequipmentbyid.call(this,this.getmyequipmentid())
                return(<Text style={[regularFont, styles.activeBackground]} onPress={()=>{this.handleequipmentid()}}>{myequipment.equipment}</Text>)
            }
        }

        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1]}>
                    <Text style={[regularFont]}> Equipment</Text>
                    {activeequipment()}
                    <TextInput style={[regularFont,styles.defaultInput]} value={this.state.equipment} onChangeText={text=>{this.setState({equipment:text})}}/>
                    {equipmentid.showresults.call(this)}
                </View>
            </View>
        )

    }
}
export default EquipmentID;