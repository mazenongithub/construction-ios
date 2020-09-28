this.updatedimesions = this.updatedimesions.bind(this)
   
}


componentDidMount() {

    Dimensions.addEventListener('change', this.updatedimesions);
    this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
  
}

componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updatedimesions)
}
updatedimesions() {
    this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
}



