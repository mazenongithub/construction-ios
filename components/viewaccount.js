import React from 'react';
import { TouchableOpacity, View, Text, TextInput, Image, Linking } from 'react-native';
import { MyStylesheet } from './styles';
import Construction from './construction';
import EnvironmentalVariables from './functions/enviornmentalvariables';
import {inputUTCStringForLaborID, calculatetotalhours,formatDateStringDisplay} from './functions'
class ViewAccount {
    getaccountname() {
        const construction = new Construction();
        const accountid = construction.getactiveaccountid.call(this);
        const account = construction.getaccountbyid.call(this, accountid)
        return (account.accountname)
    }
    async opendashboard(url) {
        try{
            let dashboard = await Linking.openURL(url);

        } catch(err) {
            alert(err)
        }
       
    }
     async openAccount(accountid) {
         const variables = new EnvironmentalVariables();
         const clientAPI = variables.getvariables.call(this).clientAPI;
         const construction = new Construction();
         const myuser = construction.getuser.call(this)
         if(myuser) {
            const providerid = myuser.profile;
            const companyid = myuser.company.url;

         const url = `${clientAPI}/${providerid}/company/${companyid}/accounts/${accountid}`
        try{
            let dashboard = await Linking.openURL(url);

        } catch(err) {
            alert(err)
        }


    }
        
    }
    showcharges() {
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const accountid = construction.getactiveaccountid.call(this);
        const charges = construction.showchargesbyaccountid.call(this,accountid)
        const viewaccount = new ViewAccount();
        let amount = 0;
        const calculatelabor = (mylabor) => {
            let hours = calculatetotalhours(mylabor.timeout, mylabor.timein);
            let ratio = construction.getemployeeaccountratio.call(this,mylabor.providerid,accountid)
            let labor = hours * mylabor.laborrate * (1 + (mylabor.profit / 100))*ratio;
            return labor;

        }
        const calculatematerialamount = (mymaterial) => {
            let materialamount = mymaterial.quantity * mymaterial.unitcost * (1 + (mymaterial.profit / 100))
            return materialamount;
        }
        const calculateequipmentamount = (myequipment) => {
            let hours = calculatetotalhours(myequipment.timeout, myequipment.timein)
            let equipment = hours * myequipment.equipmentrate * (1 + (myequipment.profit / 100))
            return equipment;
        }

    
        let mycharges = [];
        if(charges.hasOwnProperty("project")) {
            if(charges.project.hasOwnProperty("myproject")) {
                // eslint-disable-next-line
                charges.project.myproject.map(myproject=> {
                    const project = construction.getprojectbyid.call(this,myproject.projectid)
                    mycharges.push(<Text key={project.projectid} style={[headerFont]}>project: /{project.title}</Text>)
                    if(myproject.hasOwnProperty("charges")) {
                        if(myproject.charges.hasOwnProperty("charge")) {
                            // eslint-disable-next-line
                            myproject.charges.charge.map(charge=> {
                                if(charge.hasOwnProperty("laborid")) {
                                    let mylabor = construction.findactuallaborbyid.call(this,charge.laborid)
                                    amount +=calculatelabor(mylabor)
                                    mycharges.push(viewaccount.showlaborid.call(this,charge.laborid))
                                } else if (charge.hasOwnProperty("materialid")) {
                                   let mymaterial = construction.findactualmaterialbyid.call(this,charge.materialid)
                                    amount +=calculatematerialamount(mymaterial)
                                    mycharges.push(viewaccount.showmaterialid.call(this,charge.materialid))
                                } else if (charge.hasOwnProperty("equipmentid")) {
                                    let equipment = construction.findactualequipmentbyid.call(this,charge.equipmentid)
                                    amount +=calculateequipmentamount(equipment)
                                    mycharges.push(viewaccount.showequipmentid.call(this,charge.equipmentid))
                                }
                            })
                        }
                    }
                
                
                })
                
            }
        }
    
        return mycharges;
    }
    showlaborid(laborid) {
       
        const construction = new Construction();
        const mylabor = construction.findactuallaborbyid.call(this,laborid)
        const accountid = construction.getactiveaccountid.call(this); 
        const amount = () => {
            let hours = calculatetotalhours(mylabor.timeout, mylabor.timein);
            let ratio = construction.getemployeeaccountratio.call(this,mylabor.providerid,accountid)
            let labor = hours * mylabor.laborrate * (1 + (mylabor.profit / 100))*ratio;
            return labor;

        }
 
        const regularFont = construction.getRegularFont.call(this);
        const csi = construction.getcsibyid.call(this, mylabor.csiid);
        let employee = construction.getemployeebyproviderid.call(this,mylabor.providerid)
        let hourlyrate = construction.gethourlyrate.call(this, employee.providerid)
        let ratio = construction.getemployeeaccountratio.call(this,mylabor.providerid,accountid)
     

    if(mylabor) {
        return (
            <Text key={mylabor.laborid} style={ regularFont}>
        
                    {employee.firstname} {employee.lastname}: {mylabor.description} CSI:{csi.csi}-{csi.title}
                    From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                    ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs x {ratio} = ${Number(amount().toFixed(2))}
                    
            </Text>)
}
    }
    showmaterialid(materialid) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const mymaterial = construction.findactualmaterialbyid.call(this,materialid)
        const csi = construction.getcsibyid.call(this,mymaterial.csiid);
        const milestone = construction.getmilestonebyid.call(this,mymaterial.milestoneid)
        const material = construction.getmymaterialbyid.call(this,mymaterial.mymaterialid)
        return (<Text style={[regularFont]} key={mymaterial.materialid}>
                {formatDateStringDisplay(mymaterial.timein)} 
                {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} 
                {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost * (1 + (mymaterial.profit/100))).toFixed(2)} 

        </Text>)

    }
    showtransfer(transfer) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const created = inputUTCStringForLaborID(transfer.created);
        const invoiceid = construction.getinvoiceidfromtransferid.call(this,transfer.transferid)
        return(<Text style={[regularFont]} key={transfer.transferid}>
            Transfer Created {created} for the Amount ${transfer.amount} reference Invoice ID {invoiceid}
        </Text>)
    }

    showpayments() {
        const construction = new Construction();
        const accountid =construction.getactiveaccountid.call(this)
        const transfers = construction.gettransfersbyaccountid.call(this,accountid)
        const viewaccount = new ViewAccount();
        let showtransfers = [];
        if(transfers.length > 0) {
            // eslint-disable-next-line
            transfers.map(transfer=> {
                showtransfers.push(viewaccount.showtransfer.call(this,transfer))
            })
        }
      
        return showtransfers;
    }

    showequipmentid(equipmentid) {

    
        const construction = new Construction();
        const equipment = construction.findactualequipmentbyid.call(this,equipmentid)
        const regularFont = construction.getRegularFont.call(this);
        const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid);
        const milestone = construction.getmilestonebyid.call(this, equipment.milestoneid)
        const csi = construction.getcsibyid.call(this, equipment.csiid)
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate) * (1 + (equipment.profit/100)))
        return (
        <Text style={[regularFont ]} key={equipment.equipmentid}>
           
           {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
            CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone} 
            Total Hours: {totalhours} x  {equipmentrate}  x {1+(equipment.profit/100)} = ${amount.toFixed(2)}
        </Text>
        )

    }
    getsumofcharges() {

        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const accountid = construction.getactiveaccountid.call(this);
        const charges = construction.showchargesbyaccountid.call(this,accountid)
        const viewaccount = new ViewAccount();
        let amount = 0;
        const calculatelabor = (mylabor) => {
            let hours = calculatetotalhours(mylabor.timeout, mylabor.timein);
            let ratio = construction.getemployeeaccountratio.call(this,mylabor.providerid,accountid)
            let labor = hours * mylabor.laborrate * (1 + (mylabor.profit / 100))*ratio;
            return labor;

        }
        const calculatematerialamount = (mymaterial) => {
            let materialamount = mymaterial.quantity * mymaterial.unitcost * (1 + (mymaterial.profit / 100))
            return materialamount;
        }
        const calculateequipmentamount = (myequipment) => {
            let hours = calculatetotalhours(myequipment.timeout, myequipment.timein)
            let equipment = hours * myequipment.equipmentrate * (1 + (myequipment.profit / 100))
            return equipment;
        }

    
        let mycharges = [];
        if(charges.hasOwnProperty("project")) {
            if(charges.project.hasOwnProperty("myproject")) {
                // eslint-disable-next-line
                charges.project.myproject.map(myproject=> {
                    const project = construction.getprojectbyid.call(this,myproject.projectid)
                    mycharges.push(<Text key={project.projectid} style={[headerFont]}>project: /{project.title}</Text>)
                    if(myproject.hasOwnProperty("charges")) {
                        if(myproject.charges.hasOwnProperty("charge")) {
                            // eslint-disable-next-line
                            myproject.charges.charge.map(charge=> {
                                if(charge.hasOwnProperty("laborid")) {
                                    let mylabor = construction.findactuallaborbyid.call(this,charge.laborid)
                                    amount +=calculatelabor(mylabor)
                            
                                } else if (charge.hasOwnProperty("materialid")) {
                                   let mymaterial = construction.findactualmaterialbyid.call(this,charge.materialid)
                                    amount +=calculatematerialamount(mymaterial)
                               
                                } else if (charge.hasOwnProperty("equipmentid")) {
                                    let equipment = construction.findactualequipmentbyid.call(this,charge.equipmentid)
                                    amount +=calculateequipmentamount(equipment)
                                   
                                }
                            })
                        }
                    }
                
                
                })
                
            }
        }
    
        return amount

    }

    getsumoftransfers() {
        const construction = new Construction();
        const accountid =construction.getactiveaccountid.call(this)
        const transfers = construction.gettransfersbyaccountid.call(this,accountid)
        let amount =0;
        if(transfers.length > 0) {
            // eslint-disable-next-line
            transfers.map(transfer=> {
               amount+=Number(transfer.amount)
            })
        }
        return amount;
    }
    showaccount() {
        const construction = new Construction();
        const accountid = construction.getactiveaccountid.call(this);
        const account = construction.getaccountbyid.call(this, accountid);
        const myuser = construction.getuser.call(this)
        const viewaccount = new ViewAccount();
        const sumofcharges = Number(viewaccount.getsumofcharges.call(this)).toFixed(2)
        const sumoftransfers = Number(viewaccount.getsumoftransfers.call(this)).toFixed(2)
        let balance = Number(sumofcharges) - Number(sumoftransfers);
        balance = Number(balance).toFixed(2)
        if(myuser) {
            const providerid = myuser.profile;
            const companyid = myuser.company.url
        if (account) {
            const headerFont = construction.getHeaderFont.call(this)
            const regularFont = construction.getRegularFont.call(this)
            const viewaccount = new ViewAccount();
            const styles = MyStylesheet();
            const accountname = viewaccount.getaccountname.call(this)
            const mycompany = construction.getcompany.call(this);
            const variables = new EnvironmentalVariables();
            const clientAPI = variables.getvariables.call(this).clientAPI;

            const stripe = () => {
                if (account.stripedashboard) {
                    return (
                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1]}>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}>Account Dashboard URL</Text>
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]} onPress={()=>{viewaccount.opendashboard.call(this,account.stripedashboard)}}>{account.stripedashboard} </Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    )
                } else {
                    return (

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1]}>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]}>Open Account URL to Connect Account </Text>
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[regularFont]} onPress={()=>{viewaccount.openAccount.call(this,account.accountid)}}>{`${clientAPI}/${providerid}/company/${companyid}/accounts/${accountid}`}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>)
                }

            }

            return (<View style={[styles.generalFlex]}>
                            <View style={[styles.flex1]}>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={[headerFont, styles.alignCenter]}>/{mycompany.url}/accounts</Text>
                                        <Text style={[headerFont,styles.alignCenter]}>{accountname}</Text>
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                        {stripe()}
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                    <Text style={headerFont}>Summary of Charges</Text>
                                        {viewaccount.showcharges.call(this)}
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                    <Text style={headerFont}>Summary of Payments</Text>
                                        {viewaccount.showpayments.call(this)}
                                    </View>
                                </View>

                                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                                    <View style={[styles.flex1]}>
                                    <Text style={headerFont}>Sum of Charges ${sumofcharges}</Text>
                                    <Text style={headerFont }>Sum of Transfers ${sumoftransfers}</Text>
                                    <Text style={headerFont }>Account Balance ${balance} </Text>
                                    </View>
                                </View>



                            </View>
                        </View>
            )
        }
    }
    }
}
export default ViewAccount;