import { MYUSERMODEL, NAVIGATION, PROJECT, ALLUSERS, ALLCOMPANYS, CSIS } from './types';

export const reduxUser = (myusermodel) => async dispatch => {

    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}

export function sortpart(b, a) {
    if (Number(b.part) < Number(a.part)) {
        return -1

    } else {
        return 1;
    }

}

export const reduxCSIs = (csis) => async dispatch => {
    dispatch({ type: CSIS, payload:csis })
}

export const reduxNavigation = (navigation) => async dispatch => {
    dispatch({ type: NAVIGATION, payload: navigation })
}

export const reduxProject = (project) => async dispatch => {
    dispatch({ type: PROJECT, payload: project })
}
export const reduxAllUsers = (allusers) => async dispatch => {
    dispatch({ type: ALLUSERS, payload: allusers })
}
export const reduxAllCompanys = (allcompanys) => async dispatch => {
    dispatch({ type: ALLCOMPANYS, payload: allcompanys })
}