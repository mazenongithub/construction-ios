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
                capt: 'Construction Management by CivilEngineer.io. This app does Construction Management and Project Management. Free Project Engineering Service by Joining.  See the Slideshow, then Join',
                title: 'Construction Management'

            },
            {
                imageid: 'register',
                uri: require('../slides/register.png'),
                capt: 'Registration is simple and Quick. You will need your apple id, your email address, and to create a Profile URL. When this criteria has been met the Register Button will appear. It will automatically Register you when this criteria has been met during apple signin. ',
                title: 'Register'

            },
            {
                imageid: 'profile',
                uri: require('../slides/profile.png'),
                capt: 'After Registration, you have access to Profile and to your Company Components',
                title: 'Profile'

            },
            {
                imageid: 'company',
                uri: require('../slides/company.png'),
                capt: 'Create Company API allows you to create an company or add yourself to an existing company ',
                title: 'Company'

            },
       
            {
                imageid: 'viewaccounts',
                uri: require('../slides/showaccounts.png'),
                capt: 'Create accounts for your employees, equipment and materials. Employees can hold multiple accounts. It is one account per equipment. One account per material.',
                title: 'Create Accounts '

            },
            {
                imageid: 'viewaccount',
                uri: require('../slides/viewaccount.png'),
                capt: 'View of Account Summary. Containing Live Link to Stripe Dashboard for payments. Each Account receive transfers from the PM when they settle your invoice',
                title: 'View Account'

            },

            {
                imageid: 'employee',
                uri: require('../slides/employees.png'),
                capt: 'Adding myself as the first employee to the company',
                title: 'Add Employees'

            },
            {
                imageid: 'employee_1',
                uri: require('../slides/employees_1.png'),
                capt: 'Entering employee information is important to calculate the labor rates',
                title: 'Calculating Labor Rate '

            },
            {
                imageid: 'viewschedule',
                uri: require('../slides/viewschedule.png'),
                capt: 'View Employees schedule. Output time chart by employee.',
                title: 'View Schedule'

            },

            {
                imageid: 'equipment',
                uri: require('../slides/myequipment.png'),
                capt: 'Add company equipment and enter the variables for ownership and rentals',
                title: 'Company Equipment'
            
            },
            {
                imageid: 'equipment_1',
                uri: require('../slides/myequipment_1.png'),
                capt: 'After entering the ownership information, the program calculates what the equipment rate cost is per working hour',
                title: 'Equipment Rates'
            
            },
            {
                imageid: 'materials',
                uri: require('../slides/materials.png'),
                capt: 'Add your company materials, unit, and unit prices. They can still be adjusted for each item on the project. ',
                title: 'Materials'

            },
   
            {
                imageid: 'project',
                uri: require('../slides/project.png'),
                capt: 'Project Component contains the links to the different project components and shows the basic project information',
                title: 'Project'

            },
            {
                imageid: 'labor_1',
                uri: require('../slides/labor_1.png'),
                capt: 'Schedule labor component used for entering labor on the project ',
                title: 'Labor '

            },
            {
                imageid: 'labor',
                uri: require('../slides/labor.png'),
                capt: 'Schedule labor components enters timein, timeout, labor rate for labor. ',
                title: 'Labor Time '

            },
            {
                imageid: 'schedulematerials',
                uri: require('../slides/schedulematerials.png'),
                capt: 'Schedule Material Component used for scheduling materials ',
                title: 'Schedule Materials'

            },
            {
                imageid: 'scheduleequipment',
                uri: require('../slides/scheduleequipment.png'),
                capt: 'Schedule Material Component used for scheduling equipment ',
                title: 'Schedule Equipment'

            },
            {
                imageid: 'scheduleview',
                uri: require('../slides/scheduleview.png'),
                capt: 'Schedule View Time Charts helps with scheduling.  ',
                title: 'Schedule View'

            },
            {
                imageid: 'actual',
                uri: require('../slides/actual.png'),
                capt: 'Actual Cost component matches schedule component. For entering your actual costs. ',
                title: 'Enter Actual Costs'

            },  
            {
                imageid: 'actual_1',
                uri: require('../slides/actual_1.png'),
                capt: 'Actual Cost labor item cannot be modified after it has been invoiced and setted   ',
                title: 'Actual Cost Item'

            },
         
            {
                imageid: 'proposals',
                uri: require('../slides/proposals.png'),
                capt: 'Create a proposal. Attach your scheduled pay items to it by clicking on the item. Adjust your profit factor. ',
                title: 'Proposals'

            },
          
            {
                imageid: 'viewproposal',
                uri: require('../slides/viewproposal.png'),
                capt: 'View proposal component is the proposal. You can adjust the quantity and unit to produce unit prices. Profit is calculated from the payitems. When you change it this adjusts the profit for each item. ',
                title: 'View Proposal'

            },
            {
                imageid: 'invoices',
                uri: require('../slides/invoices.png'),
                capt: 'Create an Invoice. Add your actual pay items by touching it when the invoice id is active. Adjust your profit factors',
                title: 'Invoice'

            },
           
            {
                imageid: 'viewinvoice',
                uri: require('../slides/viewinvoice.png'),
                capt: 'View Invoice is the invoice. It shows the payment and transfer status while the invoice is being settled. Adjusting the profit for invoice item adjusts the profit for each pay item',
                title: 'View Invoice'

            },
            {
                imageid: 'lem',
                uri: require('../slides/lem.png'),
                capt: 'Labor, Equipment, and Material breakdown for each pay item. This should be done for both schedule and actual',
                title: 'Labor, Equipment, Materials'

            },
            {
                imageid: 'specification',
                uri: require('../slides/specification.png'),
                capt: 'Specifications written by Engineers provided for the Project',
                title: 'Specification'

            },
            {
                imageid: 'costestimate',
                uri: require('../slides/costestimate.png'),
                capt: 'Engineers provider quantity take-off schedule for the Project for Bid',
                title: 'Cost Estimate'

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
                    <Text style={[regularFont, styles.alignCenter, styles.width90]}>{image.capt}</Text>
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