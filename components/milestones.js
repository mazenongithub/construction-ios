
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import {  milestoneformatdatestring } from './functions';
import Construction from './construction';
import CriticalPath from './criticalpath'
import {View, Text} from 'react-native';
class Milestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            message: '',
            activemilestoneid: "",
            width: '',
            height: '',
       

        }
   
    }


    loadmilestoneids() {
        const construction = new Construction();
        const projectid = construction.getactiveprojectid.call(this)
        const myproject = construction.getprojectbyid.call(this, projectid)
        let ids = [];
        if (myproject) {

            if (myproject.hasOwnProperty("projectmilestones")) {
                // eslint-disable-next-line
                myproject.projectmilestones.mymilestone.map(mymilestone => {
                    ids.push(this.showmilestone(mymilestone))
                })

            }

        }
        return ids;
    }
    makemilestoneactive(milestoneid) {

        if (this.state.activemilestoneid === milestoneid) {
            this.setState({ activemilestoneid: false })
        } else {
         
            this.setState({ activemilestoneid: milestoneid })
        }
    }
  
    showmilestone(mymilestone) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);

        const activebackground = (milestoneid) => {
            if (milestoneid === this.state.activemilestoneid) {
                return ({ backgroundColor: '#89F786' })
            } else {
                return;
            }
        }
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...activebackground(mymilestone.milestoneid) }} key={mymilestone.milestoneid}>
                <View style={{ ...styles.flex5 }} >
                   <Text style={{...styles.generalFont, ...regularFont}} onPress={() => { this.makemilestoneactive(mymilestone.milestoneid) }}>{mymilestone.milestone} From {milestoneformatdatestring(mymilestone.start)} to {milestoneformatdatestring(mymilestone.completion)}</Text> 
                </View>
              
            </View>
        )
    }

    render() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        const headerFont = construction.getHeaderFont.call(this);
        const criticalpath = new CriticalPath();
        const myuser = construction.getuser.call(this)
        const activeparams = construction.getactiveproject.call(this)
        const project = construction.getprojectbyid.call(this, activeparams.projectid)
        if(myuser) {
        return (
            <View style={{ ...styles.generalFlex, ...styles.addLeftMargin15}}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>/{project.title} </Text>
                            <Text style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>Project Milestones</Text>
                        </View>
                    </View>

    

                    {this.loadmilestoneids()}

                    {criticalpath.showpath.call(this)}


                </View>
            </View>

        )

        } else {
            return(<View style={{...styles.generalContainer, ...styles.alignCenter}}>
                <Text style={{...styles.generalFont,...regularFont}}>Please Login to View Milestones</Text>
            </View>)

        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
    }
}

export default connect(mapStateToProps, actions)(Milestones)