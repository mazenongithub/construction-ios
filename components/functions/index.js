export function validateMinutes(min) {
    const reg_ex = /^[0-5][0-9]$/;
return(reg_ex.test(min));
}
export function  validateYear(year) {
    const reg_ex = /^[12][0-9]{3}$/;
return(reg_ex.test(year));
}
export function validateDate(date) {
    const reg_ex = /^(0?[1-9]|[12][0-9]|3[01])$/;
return(reg_ex.test(date));

}
export function validateMonth(mon) {
const reg_ex = /^0[1-9]|1[0-2]$/;
return(reg_ex.test(mon))
}

export function getYearfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
timein = timein.replace(/-/g, '/');
const newDate = new Date(`${timein} UTC`)
return newDate.getFullYear();

}

export function getFirstIsOnDate(datein) {

    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}


export function check_31_date(dateobj) {

    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30_date(dateobj) {

    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyear_date(dateobj)  {

    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}


export function check_31_time(timein) {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30_time(timein) {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyear_time(timein)  {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}
export function getFirstIsOnTime(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}


export function getDayString(day) {

    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return;
    }
}
export function UTCStringFormatDateforProposal(timeout) {


    let newDate = new Date(`${timeout.replace(/-/g, '/')}-00:00`)
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let century = Math.floor(year / 100) * 100;
    year = year - century;
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let timeofday = "";
    if (hours >= 12) {
        timeofday = "pm"
    }
    else {
        timeofday = "am"
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    return (`${month}/${day}/${year} on ${hours}:${minutes} ${timeofday}`)
}
export function UTCTimefromCurrentDate() {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = newDate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    year = fakedate.getFullYear();
    month = fakedate.getMonth() + 1;
    day = fakedate.getDate();
    hours = fakedate.getHours();
    minutes = fakedate.getMinutes();
    seconds = fakedate.getSeconds();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}
export function validatePassword(val) {
    let validate = {};
    validate.validate = true;
    validate.message = '';
    const reg_ex = /^[a-zA-Z0-9!#$%&?"]{6,}$/
    let test = reg_ex.test(val)
    if (val.length < 6) {
        validate.message = `Password min length is 6 `;
        validate.validate = false;
    } else if (!test) {
        validate.message = `Invalid Password format`;
        validate.validate = false;
    }

    return validate;
}

export function returnCompanyList(allusers) {
  
    let companys = [];

    if (allusers.hasOwnProperty("myuser")) {
        // eslint-disable-next-line
        allusers.myuser.map(myuser => {
          
            if (myuser.hasOwnProperty("company")) {
              
                let checkcompany = true;
                let companyid = myuser.company.companyid;
                if (companys.length > 0) {
                    // eslint-disable-next-line
                    companys.map(company => {
                        if (company.companyid === companyid) {
                            checkcompany = false;
                        }
                    })
                }
                if (checkcompany) {

                    companys.push(myuser.company)
                }
            }

        })

    }

    return companys;
}
export function getOffset(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00`)
let offset = datein.getTimezoneOffset() / 60;

    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
 return(`${sym}${offset}:00`)

}

export function inputUTCStringForMaterialIDWithTime(timein) {
    let newDate = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let date = newDate.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }

    return (`${month}/${date}/${year}`);

}
export function calculatetotalhours(timeout, timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}`)
    let dateout = new Date(`${timeout.replace(/-/g, '/')}`)
    let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60))
    return totalhours;
}
export function inputUTCStringForLaborID(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear()
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${date}/${year} ${hours}:${minutes} ${ampm}`)

}


export function milestoneformatdatestring(datein) {

    let dateinArray = datein.split('-');
    if (dateinArray.length === 3) {
        let newDate = `${dateinArray[1]}/${dateinArray[2]}/${dateinArray[0]}`
        return newDate;
    } else {
        return datein;
    }

}
export function sorttimes(timeina, timeinb) {
    timeina = new Date(timeina.replace(/-/g, '/'))
    timeinb = new Date(timeinb.replace(/-/g, '/'))
    if (timeina < timeinb) {
        return -1;
    }
    else if (timeinb > timeina) {
        return 1;
    }
    else {
        return 0;
    }
}
export function sortcode(codeb, codea) {

    //console.log(codea, codeb)
    if (Number(codea.csi) < Number(codeb.csi)) {

        return 1;
    }
    else if (Number(codeb.csi) < Number(codea.csi)) {

        return -1;
    }
    else {
        return 0;
    }
}

export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    let errmsg = ""
    if (!value) {
        errmsg += `Email Address is required `

    }

    else if (!test) {

        errmsg += ` Email Address ${value} format is invalid `;

    }
    return errmsg;
}
export function CreateOwnwership(purchasedate,loaninterest,saledate, resalevalue) {
    return ({purchasedate, loaninterest,saledate, resalevalue})
}
export function CreateRentalRate(month, week, day, hour) {
    return ({ month, week, day, hour })
}

export function LetterCounter(num) {

    const numericAlpha = (num) => {
        switch (Number(num)) {
            case 1:
                return 'A'
            case 2:
                return 'B'
            case 3:
                return 'C'
            case 4:
                return 'D'
            case 5:
                return 'E'
            case 6:
                return 'F'
            case 7:
                return 'G'
            case 8:
                return 'H'
            case 9:
                return 'I'
            case 10:
                return 'J'
            case 11:
                return 'K'
            case 12:
                return 'L'
            case 13:
                return 'M'
            case 14:
                return 'N'
            case 15:
                return 'O'
            case 16:
                return 'P'
            case 17:
                return 'Q'
            case 18:
                return 'R'
            case 19:
                return 'S'
            case 20:
                return 'T'
            case 23:
                return 'U'
            case 22:
                return 'V'
            case 23:
                return 'W'
            case 24:
                return 'X'
            case 25:
                return 'Y'
            case 26:
                return 'Z'
            default:
                return ''
                break;

        }



    }

    let Zs = 0;
    let newnum = "";
    let Z = "";
    if (num > 26) {

        Zs = Math.floor(num / 26);

        for (let i = 0; i < Zs; i++) {

            Z += `Z`

        }
        newnum = num % 26

    } else {
        newnum = num;
    }

    return `${Z}${numericAlpha(newnum)}`

}

export function sortpart(b, a) {
    if (Number(b.part) < Number(a.part)) {
        return -1

    } else {
        return 1;
    }

}


export function getMinutesfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
timein = timein.replace(/-/g, '/');
const newDate = new Date(`${timein} UTC`)
let  minutes = newDate.getMinutes();
if(minutes < 10) {
 minutes =`0${minutes}` 
}
return(minutes);
}

export function getHoursfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
timein = timein.replace(/-/g, '/');
const newDate = new Date(`${timein} UTC`)
let hours = newDate.getHours();
if(hours > 12) {
  hours = hours - 12;
 
}
if(hours < 10) {
 hours =`0${hours}` 
}
return(hours);

}

export function getDayfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
     timein = timein.replace(/-/g, '/');
     const newDate = new Date(`${timein} UTC`)
     let date = newDate.getDate();
     if(date <10) {
     date = `0${date}`
       
     }
     return date;
 }

 export function makeTimeString(year,month,day,hours,minutes,time) {
    return `${year}-${month}-${day} ${hours}:${minutes} ${time}`
}


export function UTCTimeStringfromTime(timein) {
    //let timein = '2020-06-02 04:01 pm'
    const time = timein.substring(17,19)
    let hours = timein.substring(11,13);
    if(time === 'pm') {
     hours = Number(hours) + 12
    }
    const sym = () => {
      let myoffset = new Date().getTimezoneOffset()/60
      let sym = "+";
      if(myoffset > 0) {
        sym = "-"
      }
      return sym;
      
    }
    const extraoffset = () => {
     let myoffset = (new Date().getTimezoneOffset()/60)*2
    
      if(myoffset <10) {
        myoffset =`0${myoffset}`
      }
      return myoffset;
    }
    let minutes = timein.substring(14,16)
    let year = timein.substring(0,4)
    let month = timein.substring(5,7);
    let day = timein.substring(8,10)
    
    timein = `${year}/${month}/${day} ${hours}:${minutes}:00${sym()}${extraoffset()}:00`
    const newDate = new Date(timein)
    hours = newDate.getHours();
    if(hours < 10) {
      hours = `0${hours}`
    }
    minutes = newDate.getMinutes();
    if(minutes<10) {
      minutes = `0${minutes}`
    }
    year = newDate.getFullYear();
    day = newDate.getDate();
    if(day < 10) {
      day=`0${day}`
    }
    month = newDate.getMonth()+1;
    if(month<10) {
     month = `0${month}`
    }
   return( `${year}-${month}-${day} ${hours}:${minutes}:00`);
}


 export function getAMPMfromTimeIn(timein) {
    //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let hours = newDate.getHours();
    let ampm = "";
    if(hours > 12) {
      ampm ='pm'
     
    } else {
      ampm='am'
    }
    
    return(ampm); 
}

export function getMonthfromTimein(timein) {
    console.log(timein)
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
     let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`

    }
    console.log(timein, month)
    return month;
}

export function CreateEquipment(equipmentid, equipment, ownershipstatus, accountid) {
    return ({ equipmentid, equipment, ownershipstatus, accountid})
}
export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function monthstring(month) {

    
    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}
export function CreateAccount(accountid, accountname) {
    return ({ accountid, accountname })
}
export function CreateCostID(costid, cost, detail, timein) {
    return ({ costid, cost, detail, timein })
}
export function CreateBenefit(benefitid, benefit, accountid, amount) {
    return ({ benefitid, benefit, accountid, amount })
}
export function CreateCompany(url, company, address, city, contactstate, zipcode) {
    return ({ url, company, address, city, contactstate, zipcode })
}
export function CreateProposal(proposalid, providerid, updated, approved) {
    return ({ proposalid, providerid, updated, approved })
}
export function CreateInvoice(invoiceid, providerid, updated, approved) {
    return ({ invoiceid, providerid, updated, approved })
}
export function CreateMaterial(materialid, material, accountid, unit, unitcost) {
    return ({ materialid, material, accountid, unit, unitcost})
}
export function CreateUser(providerid, client, clientid, firstname, lastname, emailaddress, phonenumber, profileurl, profile) {
    return ({ providerid, client, clientid, firstname, lastname, emailaddress, phonenumber, profileurl, profile })
}
export function CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit) {
    return ({ laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit })
}
export function CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, invoiceid, profit) {
    return ({ laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, invoiceid, profit })
}
export function CreateScheduleMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit) {
    return ({ materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit })
}
export function CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit) {
    return ({ materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit })
}
export function CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit) {
    return ({ equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit })
}
export function CreateActualEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, invoiceid, profit) {
    return ({ equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, invoiceid, profit })
}
export function getEquipmentRentalObj(timein, timeout) {
    // let timein = '2021-03-06 17:52:33';
    // let timeout = '2021-04-17 19:52:33';

    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let offset = datein.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    } else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    offset = `${sym}${offset}:00`
    let dateout = new Date(`${timeout.replace(/-/g, '/')} UTC`);
    let dateinYear = datein.getFullYear();
    let dateoutYear = dateout.getFullYear();
    let dateinMonth = datein.getMonth() + 1;
    let dateoutMonth = dateout.getMonth() + 1;
    let dateoutDate = dateout.getDate();
    let dateinDate = datein.getDate();
    let months = 0;
    let weeks = 0;
    let days = 0;
    let hours = 0;
    hours = (dateout.getTime() - datein.getTime()) / (1000 * 3600);


    if (dateoutYear !== dateinYear) {


        months += (dateoutYear - dateinYear) * 12;
        months += dateoutMonth - dateinMonth;
        if (dateoutDate < dateinDate) {
            months -= 1
        }
    } else if (dateoutMonth !== dateinMonth) {
        if (dateoutDate > dateinDate) {
            months += 1
        }
    }

    if (months > 0) {

        let monthCutoff = dateoutMonth;
        if (monthCutoff < 10) {
            monthCutoff = `0${monthCutoff}`
        }
        let dayCutoff = dateinDate
        if (dayCutoff < 10) {
            dayCutoff = `0${dayCutoff}`
        }
        let yearCutoff = dateoutYear
        let hourCutoff = datein.getHours()
        if (hourCutoff < 10) {
            hourCutoff = `0${hourCutoff}`
        }
        let minuteCutoff = datein.getMinutes();
        if (minuteCutoff < 10) {
            minuteCutoff = `0${minuteCutoff}`
        }
        let secondCutoff = datein.getSeconds();
        if (secondCutoff < 10) {
            secondCutoff = `0${secondCutoff}`
        }
        let cutDate = `${yearCutoff}-${monthCutoff}-${dayCutoff} ${hourCutoff}:${minuteCutoff}:${secondCutoff}`
        let cutOffDate = new Date(`${cutDate.replace(/-/g, '/')}${offset}`)
        let timecutoff = cutOffDate.getTime();
        hours = (dateout.getTime() - timecutoff) / (1000 * 3600)
    }


    if (hours > (24 * 7)) {
        weeks = Math.floor(hours / (24 * 7))
        hours = hours - (weeks * 24 * 7);
    }
    if (hours > 24) {
        days = Math.floor(hours / 24)
        hours = hours - (24 * days)
    }

    let obj = { hours, days, weeks, months }

    return (obj)
}
export function AmmortizeFactor(i, n) {
    i = ((i / 1200));
    // let n = 80;

    const num = i * Math.pow((1 + i), n)

    const deno = Math.pow((1 + i), n) - 1;

    const factor = num / deno;

    return factor;
}
export function calculateTotalMonths(purchasedate, saledate) {
    //     let purchasedate = '2018-05-24';
    // let saledate = '2025-01-24'
    const datePurchase = new Date(`${purchasedate.replace(/-/g, '/')} UTC`);
    const saleDate = new Date(`${saledate.replace(/-/g, '/')} UTC`);
    const datePurchaseYear = datePurchase.getFullYear();
    const purchaseMonth = datePurchase.getMonth() + 1;
    const saleDateYear = saleDate.getFullYear();
    const saleMonth = saleDate.getMonth() + 1;
    const yearsinterval = saleDateYear - datePurchaseYear;
    const monthInterval = saleMonth - purchaseMonth;
    const totalMonths = (yearsinterval) * 12 + monthInterval;
    return (totalMonths)
}
export function FutureCostPresent(i, n, F) {
    // let F=540;
    // let i=(.058/12);
    // let n = 40;
    return (F * (Math.pow((1 + i), n)))

}
export function validateCompanyID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = false;
    if (!value) {
        errmsg = " Company URL is required ";

    }
    else if (value.length > 36) {
        errmsg = " Company URL should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Company URL format ${value} `;
    }

    return errmsg;
}
export function validateProviderID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = ""
    if (!value) {
        errmsg = " ProviderID is required ";

    }
    else if (value.length > 36) {
        errmsg = " ProviderID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}
export function formatDateStringDisplay(timein) {
    timein.replace(/-/g, '/')
    timein = timein.split('-')
    let year = "";
    let month = "";
    let day = "";

    if (timein.length === 3) {
        year = timein[0]
        month = timein[1]
        day = timein[2]
    }
    return (`${month}/${day}/${year}`)
}
export function CreateBidScheduleItem(csiid, unit, quantity) {
    return ({ csiid, unit, quantity })
}
export function DirectCostForMaterial(item) {
    return (Number(item.quantity) * Number(item.unitcost))
}
export function DirectCostForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
}
export function DirectCostForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate))
}
export function ProfitForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate)) * (Number(item.profit) / 100)
}
export function ProfitForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate)) * (Number(item.profit) / 100)
}
export function ProfitForMaterial(item) {
    return (Number(item.quantity) * Number(item.unitcost)) * (Number(item.profit) / 100)
}

export function DateStringfromObj(dateobj) {

    let year = dateobj.getFullYear();
    let month = dateobj.getMonth()+1;
    let day = dateobj.getDate();
    if(month <10) {
     month=`0${month}`
    }
    if(day<10) {
     day=`0${day}`
    }
    return(`${year}-${month}-${day}`)
    }
    
    export function DateObjfromString(start) {
        //let start = '2019-08-09'
    let offset = getOffset(start)
    return(new Date(`${start.replace(/-/g,'/')} 00:00:00${offset}`))
    
    }
export function isNumeric(val) {
 
        if(val) {
          return(!isNaN(val))
        } else {
         return(true);
        }
        
      
}

export function DateObjfromTimeString(timein) {

    let offset = getOffset(timein)
    return(new Date(`${timein.replace(/-/g,'/')}${offset}`))
    }
    export function DateobjfromUTCString(timein) {
  
        return(new Date(`${timein.replace(/-/g,'/')} UTC`))
        }
    export function inputDateObjOutputAdjString(datein) {

        let offset = datein.getTimezoneOffset() / 60
        let sym = "-";
        if (offset < 0) {
            sym = "+";
            offset = -offset;
        }
        if (offset < 10) {
            offset = `0${offset}`
        }
        let year = datein.getFullYear();
    
    
        let month = datein.getMonth() + 1;
        let day = datein.getDate();
        let hours = datein.getHours();
        let minutes = datein.getMinutes();
        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        if (hours < 10) {
            hours = `0${hours}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        let newDate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:00${sym}${2 * offset}:00`)
    
        hours = newDate.getHours()
        month = newDate.getMonth() + 1;
        day = newDate.getDate();
        minutes = newDate.getMinutes();
        year = newDate.getFullYear();
        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        if (hours < 10) {
            hours = `0${hours}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
      
        return (`${year}-${month}-${day} ${hours}:${minutes}:00`)
    }
export function timeStringfromDateObj(newDate) {

    let hours = newDate.getHours();
    let year = newDate.getFullYear();
    let day =newDate.getDate();
    if(day<10) {
     day=`0${day}`
    }
    if(hours<10) {
     hours=`0${hours}`
    }
    let minutes = newDate.getMinutes();
    if(minutes<10) {
     minutes=`0${minutes}`
    }
    let seconds = newDate.getSeconds();
    if(seconds<10) {
     seconds=`0${seconds}`
    }
    let month = newDate.getMonth()+1;
    if(month <10) {
     month =`0${month}`
    }
    
             
    return(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
    }