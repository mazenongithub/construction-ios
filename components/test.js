createnewinvoice() {
    const construction = new Construction();
    const makeID = new MakeID();
    let myuser = construction.getuser.call(this);
    if (myuser) {
        let invoiceid = makeID.invoiceid.call(this);
        let providerid = myuser.providerid;
        let updated = inputDateObjOutputAdjString(this.state.updated);
        let approved = this.state.approved;
        let newinvoice = CreateInvoice(invoiceid, providerid, updated, approved);
        let activeproject = construction.getactiveproject.call(this);
        const myproject =construction.getprojectbyid.call(this,activeproject.projectid)
        let i = construction.getprojectkeybyid.call(this, activeproject.projectid);
        if (myproject.hasOwnProperty("invoices")) {
            myuser.company.projects.myproject[i].invoices.myinvoice.push(newinvoice)

        } else {
            myuser.company.projects.myproject[i].invoices = { myinvoice: [newinvoice] }

        }
        this.props.reduxUser(myuser);
        this.setState({ activeinvoiceid: invoiceid })
    }

}