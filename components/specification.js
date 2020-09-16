import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { sortpart, LetterCounter } from './functions';
import {View, Text} from 'react-native'

class Specification {

    showpart(section) {
        const construction = new Construction()
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)

        const extra = () => {
            switch (Number(section.part)) {
                case 1:
                    return ("GENERAL INFORMATION")
                case 2:
                    return ('MATERIALS')
                case 3:
                    return ('EXECUTION')
                default:
                    break;
            }
        }

        return (<View style={{ ...styles.generalContainer }} key={`${section.sectionid}part`}><Text style={{ ...styles.generalFont, ...headerFont }}>Part {section.part} {extra()}</Text></View>)
    }

    showcontent(content, i) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        const counter = LetterCounter(i + 1)


        return (
            <View style={{ ...styles.generalContainer, ...styles.marginLeft30 }} key={content.contentid}>
                <Text style={{ ...styles.generalFont, ...regularFont }}> {counter}. {content.content}</Text>
            </View>
        )


    }

    showspecsection(section, i) {

        const construction = new Construction()
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const project = construction.getprojectbyid.call(this, projectid)
        const csiid = activeproject.specifications.csiid;
        const sectionnumber = construction.getsectionnumberbyid.call(this, projectid, csiid, section.sectionid);


        return (<View style={{ ...styles.generalContainer }} key={`${section.sectionid}section`} ><Text style={{ ...styles.generalFont, ...headerFont }}>{section.part}.{sectionnumber} {section.title} </Text></View>)
    }

    showsubcontent(subcontent, j) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();

        return (<View style={{ ...styles.generalContainer, ...styles.marginLeft60 }} key={subcontent.subcontentid}
        ><Text style={{ ...styles.generalFont, ...regularFont }}
        >{j + 1}. {subcontent.subcontent} </Text>
        </View>
        )

    }

    showspecification() {
        const construction = new Construction();
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const myproject = construction.getprojectbyid.call(this, projectid);
        const specification = new Specification();
        let myspec = [];
        if (myproject) {
            const csiid = activeproject.specifications.csiid;
            const spec = construction.getspecificationbycsi.call(this, projectid, csiid)
            console.log(spec)


            if (spec) {



                if (spec.hasOwnProperty("sections")) {

                    spec.sections.sort((b, a) => {
                        return sortpart(b, a)
                    })

                    // eslint-disable-next-line
                    spec.sections.map((section, i) => {

                        if (i === 0) {
                            myspec.push(specification.showpart.call(this, section))
                        } else if (section.part !== spec.sections[i - 1].part) {
                            myspec.push(specification.showpart.call(this, section))
                        }

                        myspec.push(specification.showspecsection.call(this, section, i))

                        if (section.hasOwnProperty("content")) {
                            // eslint-disable-next-line
                            section.content.map((content, i) => {
                                myspec.push(specification.showcontent.call(this, content, i))

                                if (content.hasOwnProperty("subcontent")) {
                                    // eslint-disable-next-line
                                    content.subcontent.map((subcontent, j) => {
                                        myspec.push(specification.showsubcontent.call(this, subcontent, j))
                                    })
                                }


                            })





                        }



                    })
                }

            }



        }
        return myspec;
    }

    getspecification() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this);
        const activeproject = construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const myproject = construction.getprojectbyid.call(this, projectid);
        const specification = new Specification();
        const myuser = construction.getuser.call(this);
        if(myuser) {
        
        if (myproject) {
            const csiid = activeproject.specifications.csiid;
            const csi = construction.getcsibyid.call(this, csiid)

            return (<View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...headerFont, ...styles.boldFont, ...styles.alignCenter }}> /{myproject.title} </Text>
                            <Text style={{ ...headerFont,  ...styles.boldFont,...styles.alignCenter }}> Specifications  </Text>
                            <Text style={{ ...headerFont, ...styles.boldFont, ...styles.alignCenter }}> CSI {csi.csi}
                                {csi.title} </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>

                            {specification.showspecification.call(this)}

                        </View>
                    </View>


                </View>
            </View>
            )

        }

    

    } else {
        return(<Text style={[regularFont]}>You have to be logged in to view Specification</Text>)
    }



    }



}


export default Specification;