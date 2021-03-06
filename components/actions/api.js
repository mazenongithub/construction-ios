import EnvironmentalVariables from '../functions/enviornmentalvariables'

export async function LoadSpecifications(projectid) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/construction/${projectid}/specifications`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadAllUsers() {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/construction/loadallusers`
    return fetch(APIURL, { credentials: 'include' }).then(resp => {
    if (!resp.ok) {
    if (resp.status >= 400 && resp.status < 500) {
    return resp.json().then(data => {
    throw data.message
    })
    }
    else {
    let err = 'Request failed or Server is not responding' ;
    throw err;
    }
    }
    return resp.json();
    })
    }

export async function LoadCSIs() {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;

    let APIURL = `${serverAPI}/construction/loadcsi`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function StripeDashboard(providerid, stripe) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/construction/${providerid}/getuserloginlink/${stripe}`
    console.log(APIURL)
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}
export async function UploadProfileImage(formdata,providerid) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    var APIURL = `${serverAPI}/construction/${providerid}/uploadprofilephoto`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        body: formdata
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        throw data.message
                    })
                }
                else {
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                }
            }

            return resp.json();
        })
}


export async function CheckUserLogin() {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;

    let APIURL = `${serverAPI}/construction/checkuser`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {

                    throw data.message;
                })
            }
            else {
                let err =  'No network connection or the Server is not responding!' ;
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LogoutUser(providerid) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/construction/${providerid}/logout`
    console.log(APIURL)

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}




export async function RegisterNewCompany(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    const providerid = values.providerid;
    const APIURL = `${serverAPI}/construction/${providerid}/createcompany`;
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                       throw data.message
                    })
                }
                else {
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function ClientLogin(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;

    let APIURL = `${serverAPI}/construction/clientlogin`;
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                }
            }

            return resp.json();
        })

}


export async function AppleLogin(values) {
   
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    var APIURL = `${serverAPI}/construction/applelogin`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function ValidateCompanyID(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI

    var APIURL = `${serverAPI}/construction/checknewcompanyid`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
        
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                
            }

            return resp.json();
        })
}

export async function CheckProviderID(profile) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;

    var APIURL = `${serverAPI}/construction/${profile}/checkprofile`

    return fetch(APIURL, { credentials: 'same-origin' })
        .then(resp => {

            if (!resp.ok) {
               
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                
            }

            return resp.json();
        })
}

export async function CheckEmailAddress(emailaddress) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;

    var APIURL = `${serverAPI}/construction/${emailaddress}/checkemail`

    return fetch(APIURL, {
        credentials: 'same-origin'

    })
        .then(resp => {

            if (!resp.ok) {
               
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                
            }

            return resp.json();
        })
}



export async function SaveCompany(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    const providerid = values.myuser.providerid;
    let APIURL = `${serverAPI}/construction/${providerid}/savecompany`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function SaveProject(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    const providerid = values.myuser.providerid;
    let APIURL = `${serverAPI}/construction/${providerid}/saveproject`;

    console.log(APIURL);
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function SaveProfile(values) {
    const providerid = values.providerid;
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/construction/${providerid}/saveprofile`;
    console.log(APIURL);
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify({ myuser: values })
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                }
            }

            return resp.json();
        })

}
export async function AddExistingCompany(values) {
    const providerid = values.providerid;
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/construction/${providerid}/addexistingcompany`;
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        throw data.message
                    })
                }
                else {
                    let err =  'No network connection or the Server is not responding';
                    throw err;
                }
            }

            return resp.json();
        })

}
