import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import {View, Text} from 'react-native'

class Specifications {


    showspecification(spec) {
        const construction = new Construction();
        const csiid = spec.csiid;
        const csi = construction.getcsibyid.call(this, csiid)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)

    
        return (
        <View style={{ ...styles.generalContainer }} key={spec.specid}>
        <Text style={{...styles.generalFont, ...regularFont,...styles.generalLink}} 
         onPress={()=>{this.handlespecification(csiid)}}>{csi.csi} - {csi.title}</Text>
        </View>
        )

    }

    showspecifications() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this);
        const projectid = activeparams.projectid;
        const myproject = construction.getprojectbyid.call(this,projectid);
        const specifications = new Specifications();
        let specids = [];
        if(myproject) {
        const specs = construction.getspecficationsbyprojectid.call(this, myproject.projectid)
   
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                specids.push(specifications.showspecification.call(this,spec))
            })
        }
    }
        return specids;
    }

    getspecifications() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this);
        const activeparams = construction.getactiveproject.call(this);
        const projectid = activeparams.projectid;
        const specifications = new Specifications();
        const myuser = construction.getuser.call(this)
   
        if (myuser) {
            const myproject = construction.getprojectbyid.call(this,projectid);
            
            if(myproject) {
              

                if(!myproject.hasOwnProperty("specifications")) {
                    construction.loadprojectspecs.call(this,myproject.projectid) 
                }

        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1 }}>
                    
                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1}}>
                            <Text style={{ ...styles.boldFont, ...headerFont, ...styles.alignCenter }}>/{myproject.title}</Text>
                            <Text style={{ ...styles.boldFont, ...headerFont, ...styles.alignCenter }}> Specifications</Text>
                        </View>
                    </View>

                    {specifications.showspecifications.call(this)}
               
                </View>
            </View>)

        }


} else {
    return (<Text style={[regularFont]}>You have to be logged in to view Specification</Text>)
}
    }

}



export default Specifications