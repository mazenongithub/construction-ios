import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MyStylesheet } from './styles';
import Construction from './construction'
import Profile from './profile'

class Landing {

    getimages() {

        const myimages = [
            {
                imageid: 'main_slide',
                uri: require('../slides/main_slide.png'),
                capt: 'Construction Management by CivilEngineer.io',
                title: 'Construction Management'

            },
            {
                imageid: 'register',
                uri: require('../slides/register.png'),
                capt: 'Registration form after apple sign, email, and profile. Click Register to Create Profile',
                title: 'Register'

            },
            {
                imageid: 'profile',
                uri: require('../slides/profile.png'),
                capt: 'Profile after Registration and updating photo',
                title: 'Profile'

            },
            {
                imageid: 'company',
                uri: require('../slides/company.png'),
                capt: 'Create a new Company Profile',
                title: 'Company'

            },
            {
                imageid: 'company_1',
                uri: require('../slides/company_1.png'),
                capt: 'Updating Company Info',
                title: 'Company Info'

            },
            {
                imageid: 'accounts',
                uri: require('../slides/accounts.png'),
                capt: 'Adding Company Accounts',
                title: 'Accounts'

            },
            {
                imageid: 'viewaccounts',
                uri: require('../slides/showaccounts.png'),
                capt: 'Viewing all Accounts',
                title: 'Viewing Accounts'

            },
            {
                imageid: 'viewaccount',
                uri: require('../slides/viewaccount.png'),
                capt: 'Viewing of account connected to Stripe Dashboard for payments',
                title: 'View Account'

            },

            {
                imageid: 'employee',
                uri: require('../slides/employees.png'),
                capt: 'Adding Employees',
                title: 'Employees'

            },
            {
                imageid: 'employee_1',
                uri: require('../slides/employees_1.png'),
                capt: 'Determining Labor rate per working hours after adding benefits',
                title: 'Calculating Labor Rate '

            },
            {
                imageid: 'equipment',
                uri: require('../slides/equipment.png'),
                capt: 'Adding Company Equipment',
                title: 'Equipment'

            },
            {
                imageid: 'equipment_2',
                uri: require('../slides/equipment_2.png'),
                capt: 'Calculating Equipment Rate per working hour based on the cost of ownership',
                title: 'Calulating Equipment Rates'

            },
            {
                imageid: 'materials',
                uri: require('../slides/materials.png'),
                capt: 'Adding Company Materials',
                title: 'Materials'

            },
            {
                imageid: 'construction',
                uri: require('../slides/construction.png'),
                capt: 'List of construction specs built in to the program, there are 6,800 across 52 Divisions',
                title: 'Construction'

            },
            {
                imageid: 'project',
                uri: require('../slides/project.png'),
                capt: 'Project Component visable after Client Adds you to the Project',
                title: 'Project'

            },
            {
                imageid: 'labor_1',
                uri: require('../slides/labor_1.png'),
                capt: 'Schedule Labor Component',
                title: 'Schedule Labor'

            },
            {
                imageid: 'labor',
                uri: require('../slides/labor.png'),
                capt: 'Entered Schedule labor item',
                title: 'Schedule Labor Entered'

            },
            {
                imageid: 'schedulematerials',
                uri: require('../slides/schedulematerials.png'),
                capt: 'Schedule Materials Component',
                title: 'Entering Schedule Materials'

            },
            {
                imageid: 'scheduleequipment',
                uri: require('../slides/scheduleequipment.png'),
                capt: 'Schedule Equipment Component',
                title: 'Entering Schedule Equipment'

            },
            {
                imageid: 'proposals',
                uri: require('../slides/proposal.png'),
                capt: 'Proposal Component, adds Profit to schedule items',
                title: 'Proposals'

            },
            {
                imageid: 'proposals_1',
                uri: require('../slides/proposal_1.png'),
                capt: 'Saving project within proposal component',
                title: 'Proposals Save Project'

            },
            {
                imageid: 'viewproposal',
                uri: require('../slides/viewproposal.png'),
                capt: 'View proposal component adds quantity and unit to produce unit price',
                title: 'View Proposal'

            },
            {
                imageid: 'lem',
                uri: require('../slides/lem.png'),
                capt: 'Labor, Equipment, and Material breakdown for each pay item',
                title: 'lem'

            },
            {
                imageid: 'viewinvoice',
                uri: require('../slides/viewinvoice.png'),
                capt: 'Construction Invoice with summary of Transfer Payments',
                title: 'View Invoice'

            }

        ];
        return myimages;
    }

    showimage(image) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const menu = construction.getnavigation.call(this)
        const styles = MyStylesheet()
        const marginLeft = () => {
            if (menu.open) {
                return ({ marginLeft: 30 })
            } else {
                return ({ marginLeft: 60 })
            }

        }
        const slideimage = () => {
            if (menu.open) {
                return ({
                    width: 136,
                    height: 185
                })
            } else {
                return ({
                    width: 268,
                    height: 364
                })
            }
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1]}>
                    <Image source={image.uri}
                        resizeMethod='scale'
                        style={[slideimage(), marginLeft()]}
                        key={image.imageid}
                    />
                    <Text style={[headerFont, styles.alignCenter]}>{image.title}</Text>
                    <Text style={[regularFont, styles.alignCenter]}>{image.capt}</Text>
                </View>
            </View>)

    }

    showiconimage(image) {
        const styles = MyStylesheet()

        return (

            <TouchableOpacity onPress={() => { this.setState({ activeimage: image.imageid }) }}>
                <Image source={image.uri}
                    resizeMethod='scale'
                    style={[styles.iconimage]}
                    key={image.imageid}
                />
            </TouchableOpacity>)

    }
    getactiveimage() {
        const landing = new Landing();
        const images = landing.getimages.call(this)
        let myimage = false;
        images.map(image => {
            if (image.imageid === this.state.activeimage) {
                myimage = image;
            }
        })
        return myimage;
    }
    showactiveimage() {
        const landing = new Landing();
        const activeimage = landing.getactiveimage.call(this)
        if (activeimage) {
            return (landing.showimage.call(this, activeimage))
        }
    }
    showimages() {

        const landing = new Landing();
        const images = landing.getimages.call(this);
        let myimage = [];


        images.map(image => {

            myimage.push(landing.showimage.call(this, image))


        })


        return myimage;
    }

    showiconimages() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const landing = new Landing();
        const images = landing.getimages.call(this)
        const myimages = [];
        const regularFont = construction.getRegularFont.call(this)
        const menu = construction.getnavigation.call(this)
        images.map((image, i) => {
            if (!menu.open) {
                if (i % 2 === 0 || i == 0) {

                    if (i < images.length - 1) {

                        myimages.push(
                            <View style={[styles.generalFlex, styles.bottomMargin10]} key={image.imageid}>
                                <View style={[styles.flex1, styles.alignContentCenter]}>
                                    {landing.showiconimage.call(this, image)}
                                    <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                                </View>
                                <View style={[styles.flex1, styles.alignContentCenter]}>
                                    {landing.showiconimage.call(this, images[i + 1])}
                                    <Text style={[regularFont, styles.alignCenter]}>{images[i + 1].title}</Text>
                                </View>

                            </View>
                        )
                    } else {
                        myimages.push(
                            <View style={[styles.generalFlex, styles.bottomMargin10]} key={[image.imageid]}>
                                <View style={[styles.flex1, styles.alignContentCenter]}>
                                    {landing.showiconimage.call(this, image)}
                                    <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                                </View>
                                <View style={[styles.flex1]}>

                                </View>

                            </View>
                        )
                    }
                }

            } else {


                myimages.push(
                    <View style={[styles.generalFlex, styles.bottomMargin10]} key={[image.imageid]}>
                        <View style={[styles.flex1, styles.alignContentCenter]}>
                            {landing.showiconimage.call(this, image)}
                            <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                        </View>

                    </View>)
            }


        })


        return myimages;
    }
    showlanding() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const landing = new Landing();
        const profile = new Profile();

        const justify = () => {
            return ({ justifyContent: 'center' })
        }
        const myuser = construction.getuser.call(this);
        if (myuser) {
            return (profile.showmyprofile.call(this))
        } else {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>


                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, justify(), styles.topMargin35]}>

                                {landing.showactiveimage.call(this)}

                            </View>

                        </View>


                        {landing.showiconimages.call(this)}



                    </View>

                </View>


            )
        }
    }
}
export default Landing;