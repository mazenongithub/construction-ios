import React from 'react';
import {View,Text, TextInput} from 'react-native';
import Construction from './construction'
import {MyStylesheet} from './styles'
import {milestoneformatdatestring} from './functions'
class MilestoneID {
    showmilestone(mymilestone) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        return(
        <View style={[styles.generalFlex]} key={[mymilestone.milestoneid]}>
        <View style={[styles.flex1]}>
            <Text style={[regularFont]} onPress={()=> {this.handlemilestoneid(mymilestone.milestoneid)}}>{mymilestone.milestone} </Text>
        </View>
        </View>
        )
    }
    showmilestones(){
        const construction = new Construction();
        const mymilestones = construction.getmilestones.call(this)
        const milestoneid = new MilestoneID()
        let milestoneids = [];
        if(mymilestones) {
            mymilestones.map(milestone=> {
                if(this.state.milestone) {
                            if(milestone.milestone.trim().toLowerCase().startsWith(this.state.milestone.trim().toLowerCase())) {
                                milestoneids.push(milestoneid.showmilestone.call(this,milestone))
                            }
                } else {
                    milestoneids.push(milestoneid.showmilestone.call(this,milestone))
                }
           
            })

        }
        return milestoneids;
    }
    
        showmilestoneid() {
            const construction = new Construction();
            const milestoneid = new MilestoneID()
            const styles = MyStylesheet();
            const regularFont = construction.getRegularFont.call(this)
            const activemilestone = () => {
                const milestoneid = this.getmilestoneid()
                const mymilestone = construction.getmilestonebyid.call(this, milestoneid)
                if(mymilestone) {
                    return(<Text style={[regularFont, styles.activeBackground]}>{mymilestone.milestone} From {milestoneformatdatestring(mymilestone.start)} to {milestoneformatdatestring(mymilestone.completion)}</Text>)
                }
            }
            return( 
                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1]}>
                    <Text style={[regularFont]}> MilestoneID</Text>
                    {activemilestone()}
                    <TextInput style={{...regularFont, ...styles.defaultInput}} 
                        value={this.state.milestone}
                        onChangeText={text=>{this.setState({milestone:text})}}
                    />
                    <View style={{...styles.generalContainer, ...styles.maxHeight140}}>
                    {milestoneid.showmilestones.call(this)}
                    </View>
                </View>
            </View>
           )
    
        }
}
export default MilestoneID;