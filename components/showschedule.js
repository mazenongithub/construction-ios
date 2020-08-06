import React from 'react';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { getDayfromDateString, formatDateStringDisplay, dateStringFromUTCTime, scheduleBox, initfromtimeout, getOffsetDate, inputUTCStringForLaborID } from './functions'
import { View, Text } from 'react-native'
import Svg, {
    Rect,
    Text as TextSvg,
    G,
    ForeignObject
} from 'react-native-svg';

class ShowSchedule {
    getschedule() {
        const construction = new Construction();
        const schedules = this.getschedule();
        const regularFont = construction.extraSmallFont.call(this)
        console.log("myschedule", schedules)
        let schedulejsx = [];
        if (schedules) {
            
            schedules.map(schedule => {
                const csi = construction.getcsibyid.call(this,schedule.csiid)
                const project = construction.getprojectbymilestoneid.call(this,schedule.milestoneid)
                if (
                    (dateStringFromUTCTime(schedule.timein) === `${this.state.year}-${this.state.month}-${this.state.day}`)
                ) {
                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;

                    if (dateStringFromUTCTime(schedule.timeout) === dateStringFromUTCTime(schedule.timein)) {

                        console.log("initparams", params, schedule.timein, schedule.timeout)
                        schedulejsx.push(<G key={schedule.laborid}>
                       
                        <Rect  fill="#6BB9F0" strokeWidth="1" stroke="rgb(0,0,0)" x="99" y={1 + init} width="298.16" height={params.height} />
                        <ForeignObject x="99" y={1 + init}  width={298} height={120}>
                        <View>
                        <Text style={{...regularFont}}>{inputUTCStringForLaborID(schedule.timein)}- </Text>
                        <Text style={{...regularFont}}>{inputUTCStringForLaborID(schedule.timeout)}</Text> 
                        <Text style={{...regularFont}}>{project.title}</Text>
                        <Text style={{...regularFont}}>{csi.csi} {csi.title}</Text>  
                        </View>
                        </ForeignObject>
                       </G>)

                    } else {
                       
                        schedulejsx.push(<Rect key={schedule.laborid} fill="#6BB9F0" strokeWidth="1" stroke="rgb(0,0,0)" x="99" y={1 + init} width="298.16" height={2400 - init} />)
                    }
                }

            })
        }
        return schedulejsx;
    }
    handleday(datestring) {
        const dates = datestring.split('-');
        this.setState({ year: dates[0], month: dates[1], day: dates[2] })
        console.log("handleday", datestring)
    }



    showschedule(type) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const showschedule = new ShowSchedule();
        const smallFont = construction.getSmallFont.call(this)
        const activebackground = (val) => {

            if (val === `${this.state.year}-${this.state.month}-${this.state.day}`) {

                return ({ ...styles.activeBackground, ...styles.addRadius })
            }
        }




        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>


                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...activebackground(this.state.day_1), ...styles.alignCenter }}>
                            <Text style={{ ...regularFont, ...styles.alignCenter }}
                                onPress={() => { showschedule.handleday.call(this, this.state.day_1) }}
                            >{getDayfromDateString(this.state.day_1)}</Text>
                        </View>
                        <View style={{ ...styles.flex1, ...activebackground(this.state.day_2), ...styles.alignCenter }}>
                            <Text style={{ ...regularFont, ...styles.alignCenter }}
                                onPress={() => { showschedule.handleday.call(this, this.state.day_2) }}
                            >{getDayfromDateString(this.state.day_2)}</Text>
                        </View>
                        <View style={{ ...styles.flex1, ...activebackground(this.state.day_3), ...styles.alignCenter }}>
                            <Text style={{ ...regularFont, ...styles.alignCenter }}
                                onPress={() => { showschedule.handleday.call(this, this.state.day_3) }}
                            >{getDayfromDateString(this.state.day_3)}</Text>
                        </View>
                        <View style={{ ...styles.flex1, ...activebackground(this.state.day_4), ...styles.alignCenter }}>
                            <Text style={{ ...regularFont, ...styles.alignCenter }}
                                onPress={() => { showschedule.handleday.call(this, this.state.day_4) }}
                            >{getDayfromDateString(this.state.day_4)}</Text>
                        </View>
                        <View style={{ ...styles.flex1, ...activebackground(this.state.day_5), ...styles.alignCenter }}>
                            <Text style={{ ...regularFont, ...styles.alignCenter }}
                                onPress={() => { showschedule.handleday.call(this, this.state.day_5) }}
                            >{getDayfromDateString(this.state.day_5)}</Text>
                        </View>
                        <View style={{ ...styles.flex1, ...styles.alignCenter, ...activebackground(this.state.day_6) }}>
                            <Text style={{ ...regularFont, ...styles.alignCenter }}
                                onPress={() => { showschedule.handleday.call(this, this.state.day_6) }}
                            >{getDayfromDateString(this.state.day_6)}</Text>
                        </View>
                        <View style={{ ...styles.flex1, ...activebackground(this.state.day_7) }}>
                            <Text style={{ ...regularFont, ...styles.alignCenter }}
                                onPress={() => { showschedule.handleday.call(this, this.state.day_7) }}
                            >{getDayfromDateString(this.state.day_7)}</Text>
                        </View>
                    </View>

                    <Svg width="398"
                        height="2402"
                        viewBox="0 0 397.67 2402">

                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="26" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="51" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="76" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="101" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="126" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="151" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="176" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="201" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="226" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="251" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="276" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="301" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="326" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="351" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="376" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="401" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="426" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="451" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="476" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="501" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="526" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="551" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="576" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="601" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="626" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="651" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="676" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="701" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="726" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="751" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="776" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="801" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="826" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="851" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="876" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="901" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="926" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="951" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="976" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1001" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1026" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1051" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1076" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1101" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1126" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1151" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1176" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1201" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1226" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1251" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1276" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1301" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1326" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1351" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1376" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1401" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1426" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1451" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1476" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1501" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1526" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1551" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1576" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1601" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1626" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1651" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1676" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1701" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1726" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1751" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1776" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1801" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1826" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1851" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1876" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1901" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1926" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1951" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="1976" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2001" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2026" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2051" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2076" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2101" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2126" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2151" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2176" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2201" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2226" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2251" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2276" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2301" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2326" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2351" width="80" height="25" />
                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2376" width="80" height="25" />

                        <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x="1" y="2376" width="80" height="25" />
                        <TextSvg x="8.12" y="95.45" fill="black" stroke="none" fontSize="16">1:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.12" y="195.47">2:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.12" y=" 295.48">3:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.12" y=" 395.47">4:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.12" y=" 497.41">5:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.13" y=" 592.08">6:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.12" y=" 695.47">7:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.12" y=" 795.47">8:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="8.12" y=" 895.47">9:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="2.72" y=" 992.08">10:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="2.72" y="1095.47">11:00 am</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="2.25" y="1195.47">12:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="1294.72">1:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="1394.74">2:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="1494.76">3:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="1594.74">4:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="1696.68">5:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.66" y="1791.35">6:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="1894.74">7:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="1994.74">8:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="7.65" y="2094.74">9:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="2.25" y="2191.35">10:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="2.25" y="2294.74">11:00 pm</TextSvg>
                        <TextSvg fontSize="16" fill="black" stroke="none" x="2.72" y="2394.74">12:00 am</TextSvg>
                        {showschedule.getschedule.call(this)}
                    </Svg>




                </View>
            </View>
        )


    }


}



export default ShowSchedule;