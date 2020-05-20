import { makeID } from './functions';
import Construction from './construction';
class MakeID {
    benefitid() {
        const construction = new Construction();
        const employees = construction.getmyemployees.call(this);
        let benefitid = false;
        if (employees) {
            // eslint-disable-next-line
            employees.map(employee => {
                if (employee.hasOwnProperty("benefits")) {
                    while (benefitid === false) {
                        benefitid = makeID(16);
                        // eslint-disable-next-line
                        employee.benefits.benefit.map(benefit => {
                            if (benefit.benefitid === benefitid) {
                                benefitid = false;
                            }
                        })
                    }

                } else {
                    benefitid = makeID(16)
                }
            })

        } else {
            benefitid = makeID(16)
        }
        return benefitid;
    }
    materialid() {
        const construction = new Construction();
        const mymaterial = construction.getmymaterials.call(this)
        let materialid = false;
        if (mymaterial) {
            while (materialid === false) {
                materialid = makeID(16)
                // eslint-disable-next-line
                mymaterial.map(material => {
                    if (material.materialid === materialid) {
                        materialid = false;
                    }
                })

            }

        } else {
            materialid = makeID(16);
        }
        return materialid;

    }
    costid() {
        const construction = new Construction();
        const myequipment = construction.getmyequipment.call(this);
        let costid = false;
        while (!costid) {
            costid = makeID(16)
            if (myequipment) {
                // eslint-disable-next-line
                myequipment.map(equipment => {
                    if (equipment.hasOwnProperty("ownership")) {
                        if (equipment.ownership.hasOwnProperty("cost")) {
                            // eslint-disable-next-line
                            equipment.ownership.cost.map(cost => {
                                if (cost.costid === costid) {
                                    costid = false;
                                }
                            })
                        }
                    }
                })
            } else {
                costid = makeID(16)
            }
        }
        return costid;
    }
    equipmentid() {
        const construction = new Construction();
        const myequipment = construction.getmyequipment.call(this)
        let equipmentid = false;
        if (myequipment) {
            while (equipmentid === false) {
                equipmentid = makeID(16)
                // eslint-disable-next-line
                myequipment.map(equipment => {
                    if (equipment.equipmentid === equipmentid) {
                        equipmentid = false;
                    }
                })

            }

        } else {
            equipmentid = makeID(16);
        }
        return equipmentid;

    }
    invoiceid() {
        const construction = new Construction();
        const activeproject= construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const invoices = construction.getinvoicesbyprojectid.call(this,projectid);
        let invoiceid = false;
        if (invoices) {
            while (!invoiceid) {
                invoiceid = makeID(4);

                if (invoices) {
                    // eslint-disable-next-line
                    invoices.map(myinvoice => {
                        if (myinvoice.invoiceid === invoiceid) {
                            invoiceid = false;
                        }
                    })
                }
            }
        } else {
            invoiceid = makeID(4);
        }
        return invoiceid;
    }

    proposalid() {
        const construction = new Construction();
        const activeproject= construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const proposals = construction.getproposalsbyprojectid.call(this,projectid);

        let proposalid = false;
        if (proposals) {
            while (!proposalid) {
                proposalid = makeID(4);

                if (proposals) {
                    // eslint-disable-next-line
                    proposals.map(myproposal => {
                        if (myproposal.proposalid === proposalid) {
                            proposalid = false;
                        }
                    })
                }
            }
        } else {
            proposalid = makeID(4);
        }
        return proposalid;
    }
    actualmaterialid() {
        const construction = new Construction();
        const activeproject= construction.getactiveproject.call(this);
        const projectid = activeproject.projectid;
        const actualmaterials = construction.getactualmaterials.call(this,projectid);
        let materialid = false;
        if (actualmaterials) {
            while (!materialid) {
                materialid = makeID(16);

                if (actualmaterials) {
                    // eslint-disable-next-line
                    actualmaterials.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            materialid = false;
                        }
                    })
                }
            }
        } else {
            materialid = makeID(16)
        }
        return materialid;
    }

    schedulematerialid() {
        const construction = new Construction();
        const schedulematerials = construction.getschedulematerials.call(this);

        let materialid = false;
        if (schedulematerials) {
            while (!materialid) {
                materialid = makeID(16);

                if (schedulematerials) {
                    // eslint-disable-next-line
                    schedulematerials.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            materialid = false;
                        }
                    })
                }
            }
        } else {
            materialid = makeID(16);
        }
        return materialid;
    }

    actuallaborid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this);
        const actuallabor = construction.getactuallabor.call(this,myproject.projectid);

        let laborid = false;
        if (actuallabor) {
            while (!laborid) {
                laborid = makeID(16);

                if (actuallabor) {
                    // eslint-disable-next-line
                    actuallabor.map(mylabor => {
                        if (mylabor.laborid === laborid) {
                            laborid = false;
                        }
                    })
                }
            }
        } else {
            laborid = makeID(16)
        }
        return laborid;
    }
    schedulelaborid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this);
        const schedulelabor = construction.getschedulelabor.call(this,myproject.projectid);
         
        let laborid = false;
        if (schedulelabor) {
            while (!laborid) {
                laborid = makeID(16);

                if (schedulelabor) {
                    // eslint-disable-next-line
                    schedulelabor.map(mylabor => {
                        if (mylabor.laborid === laborid) {
                            laborid = false;
                        }
                    })
                }
            }
        } else {
            laborid = makeID(16);
        }
        return laborid;
    }


    scheduleequipmentid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this);
        const scheduleequipment = construction.getscheduleequipment.call(this,myproject.projectid);

        let equipmentid = false;
        if (scheduleequipment) {
            while (!equipmentid) {
                equipmentid = makeID(16);

                if (scheduleequipment) {
                    // eslint-disable-next-line
                    scheduleequipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {
                            equipmentid = false;
                        }
                    })
                }
            }
        } else {
            equipmentid = makeID(16);
        }
        return equipmentid;
    }

    actualequipmentid() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this);
        const actualequipment = construction.getactualequipment.call(this,myproject.projectid);

        let equipmentid = false;
        if (actualequipment) {
            while (!equipmentid) {
                equipmentid = makeID(16);

                if (actualequipment) {
                    // eslint-disable-next-line
                    actualequipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {
                            equipmentid = false;
                        }
                    })
                }
            }
        } else {
            equipmentid = makeID(16);
        }
        return equipmentid;
    }

    accountid() {
        const construction = new Construction();
        const accounts = construction.getmyaccounts.call(this)
        let accountid = false;
        if (accounts) {
            while (!accountid) {
                accountid = makeID(16);
                if (accounts) {
                    // eslint-disable-next-line
                    accounts.map(account => {
                        if (account.accountid === accountid) {
                            accountid = false;
                        }
                    })
                }

            }
        } else {
            accountid = makeID(16);
        }
        return accountid;

    }

}
export default MakeID;