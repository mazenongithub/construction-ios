import React from 'react'
import { View, Text } from 'react-native'
import { MyStylesheet } from './styles'
import Construction from './construction'

class Project {
  
    showproject() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const projectid = construction.getactiveprojectid.call(this)
        const project = construction.getprojectbyid.call(this, projectid)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
       
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{project.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>Location {project.address} {project.city} {project.projectstate} {project.zipcode} </Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}>{project.scope} </Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { this.handleproposals() }}> /proposals (Schedule)</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { this.handleschedulelabor() }}> /labor</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { this.handlescheduleequipment() }}> /equipment</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { this.handleschedulematerials() }}> /materials</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}> /bidschedule</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={()=>{this.handleinvoices()}}> /invoices (Actual)</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { this.handleactualabor() }}> /labor</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { this.handleactualequipment() }}> /equipment</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]} onPress={() => { this.handleactualmaterials() }}> /materials</Text>
                        </View>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont]}> /bid</Text>
                        </View>
                    </View>


                </View>
            </View>
        )
    }
}

export default Project
