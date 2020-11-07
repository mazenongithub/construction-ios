import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { sortpart, LetterCounter, getListNumber } from './functions'
import { View, Text } from 'react-native'

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

    showspecification() {
        const construction = new Construction();
        const activeparams = construction.getactiveproject.call(this);
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();

        if (myuser) {

            const projectid = activeparams.projectid;
            const project = construction.getprojectbyid.call(this, projectid);


            if (project) {
                const csiid = activeparams.specifications.csiid;
                if (!project.hasOwnProperty("specifications")) {
                    construction.loadprojectspecs.call(this, project.projectid)
                }
                const spec = construction.getspecificationbycsi.call(this, projectid, csiid)

                if (spec) {

                    const activebackground = (contentid) => {
                        if (this.state.activecontentid === contentid) {

                            return { backgroundColor: '#D7A22A' }
                        }
                    }




                    const showparagraph = () => {
                        let paragraphs = [];

                        if (spec.hasOwnProperty("paragraph")) {

                            if (spec.paragraph.hasOwnProperty("list")) {
                                // eslint-disable-next-line
                                spec.paragraph.list.map((list, i) => {

                                    const listtype_1 = () => {

                                        return (` ${getListNumber(spec.paragraph.listType, i + 1, false)} `)

                                    }

                                    paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.bottomMargin10 }} key={list.contentid}>
                                        <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid) }} onClick={() => { this.makelistactive(list.contentid) }}> {listtype_1()}
                                            {list.content}</Text>

                                    </View>)



                                    if (list.hasOwnProperty("sublist")) {
                                        if (list.sublist.hasOwnProperty("list")) {
                                            // eslint-disable-next-line
                                            list.sublist.list.map((sublist, j) => {

                                                const listtype_2 = () => {

                                                    return (` ${getListNumber(list.sublist.listType, j + 1, i + 1)} `)
                                                }

                                                paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft30, ...styles.bottomMargin10 }} key={sublist.contentid}>
                                                    <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist.contentid) }} onClick={() => { this.makelistactive(sublist.contentid) }}> {listtype_2()}
                                                        {sublist.content}</Text>

                                                </View>)


                                                if (sublist.hasOwnProperty("sublist")) {
                                                    if (sublist.sublist.hasOwnProperty("list")) {
                                                        // eslint-disable-next-line
                                                        sublist.sublist.list.map((sublist_1, k) => {

                                                            const listtype_3 = () => {

                                                                return (` ${getListNumber(sublist.sublist.listType, k + 1, j + 1)} `)
                                                            }


                                                            paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft60, ...styles.bottomMargin10 }} key={sublist_1.contentid}>
                                                                <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_1.contentid) }} onClick={() => { this.makelistactive(sublist_1.contentid) }}> {listtype_3()}
                                                                    {sublist_1.content}</Text>

                                                            </View>)


                                                            if (sublist_1.hasOwnProperty("sublist")) {
                                                                if (sublist_1.sublist.hasOwnProperty("list")) {
                                                                    // eslint-disable-next-line
                                                                    sublist_1.sublist.list.map((sublist_2, l) => {

                                                                        const listtype_4 = () => {

                                                                            return (` ${getListNumber(sublist_1.sublist.listType, l + 1, k + 1)} `)
                                                                        }

                                                                        paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft90, ...styles.bottomMargin10 }} key={sublist_2.contentid}>
                                                                            <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_2.contentid) }} onClick={() => { this.makelistactive(sublist_2.contentid) }}> {listtype_4()}
                                                                                {sublist_2.content}</Text>

                                                                        </View>)


                                                                        if (sublist_2.hasOwnProperty("sublist")) {
                                                                            if (sublist_2.sublist.hasOwnProperty("list")) {
                                                                                // eslint-disable-next-line
                                                                                sublist_2.sublist.list.map((sublist_3, m) => {

                                                                                    const listtype_5 = () => {

                                                                                        return (` ${getListNumber(sublist_2.sublist.listType, m + 1, k + 1)} `)
                                                                                    }




                                                                                    paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft120, ...styles.bottomMargin10 }} key={sublist_3.contentid}>
                                                                                        <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_3.contentid) }}> {listtype_5()}
                                                                                            {sublist_3.content}</Text>

                                                                                    </View>)

                                                                                })


                                                                            }
                                                                        }



                                                                    })




                                                                }
                                                            }




                                                        })




                                                    }
                                                }



                                            })

                                        }





                                    }


                                })




                            }

                        }




                        return paragraphs;
                    }




                    return (
                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1 }}>

                                {showparagraph()}
                            </View>
                        </View>
                    )

                }

            }
        }

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
        if (myuser) {

            if (myproject) {
                const csiid = activeproject.specifications.csiid;
                const csi = construction.getcsibyid.call(this, csiid)

                return (<View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...headerFont, ...styles.boldFont, ...styles.alignCenter }}> /{myproject.title} </Text>
                                <Text style={{ ...headerFont, ...styles.boldFont, ...styles.alignCenter }}> Specifications  </Text>
                                <Text style={{ ...headerFont, ...styles.boldFont, ...styles.alignCenter }}> CSI {csi.csi} {csi.title} </Text>
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
            return (<Text style={[regularFont]}>You have to be logged in to view Specification</Text>)
        }



    }



}


export default Specification;