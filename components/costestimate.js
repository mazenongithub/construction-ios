import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { View, Text } from 'react-native';

class CostEstimate {


    getbiditems() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        let bidschedule = false;
        if (myuser) {
            const activeproject = construction.getactiveproject.call(this);
            const projectid = activeproject.projectid;
            const project = construction.getprojectbyid.call(this, projectid);
            console.log(project)
            if (project) {
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("bidschedule")) {
                        // eslint-disable-next-line
                        bidschedule = project.costestimate.bidschedule;

                    }






                }
            }
        }

        return bidschedule;


    }


    showbiditem(biditem) {

        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const csi = construction.getcsibyid.call(this, biditem.csiid);



        const myuser = construction.getuser.call(this)
        if (myuser) {
            const activeproject = construction.getactiveproject.call(this);
            const projectid = activeproject.projectid;
            const project = construction.getprojectbyid.call(this, projectid);
            if (project) {

                const quantity = biditem.quantity;
                const unit = biditem.unit;



                return (
                    <View style={{ ...styles.generalFlex }} key={biditem.csiid}>
                        <View style={{ ...styles.flex1 }}>

                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                    <Text style={{ ...styles.generalFont, ...regularFont }}>{csi.csi}-{csi.title}</Text>
                                </View>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <Text style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        {quantity}
                                    </Text>

                                </View>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <Text style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        {unit}
                                    </Text>

                                </View>

                            </View>




                        </View>

                    </View>
                )


            }
        }
    }

    showbiditems() {
        const costestimate = new CostEstimate();
        const biditems = costestimate.getbiditems.call(this);
        console.log(biditems)
        let items = [];
        if (biditems) {
            // eslint-disable-next-line
            biditems.map(biditem => {
                items.push(costestimate.showbiditem.call(this, biditem))

            })
        }
        return items;

    }

    showestimate() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const costestimate = new CostEstimate();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const project = construction.getprojectbyid.call(this, projectid);
        if(project) {

        
        return (
            <View style={{ ...styles.generalFont }}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <Text style={{ ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>/{project.title} </Text>
                            <Text style={{ ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>Engineer Estimate </Text>
                        </View>
                    </View>



                    {costestimate.showbiditems.call(this)}




                </View>
            </View>)

        }
    }

}


export default CostEstimate;