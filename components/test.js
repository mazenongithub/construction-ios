const showmaterialquantity = () => {
    if (this.state.active === 'materials') {
        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1, ...styles.addMargin }}>
                    <View style={{ ...styles.generalContainer }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}>Quantity</Text>
                    </View>
                    <View style={{ ...styles.generalContainer }}>
                        <TextInput style={{ ...styles.generalFont, ...regularFont }}
                            value={this.getquantity()}
                            onChangeText={text => { this.handlequantity(text) }}
                        />
                    </View>

                </View>
                <View style={{ ...styles.flex1, ...styles.addMargin }}>

                    <View style={{ ...styles.generalContainer }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}>Unit</Text>
                    </View>
                    <View style={{ ...styles.generalContainer }}>
                        <TextInput style={{ ...styles.generalFont, ...regularFont }}
                            value={this.getunit()}
                            onChangeText={text => { this.handleunit(text) }}
                        />
                    </View>

                </View>
                <View style={{ ...styles.flex1, ...styles.addMargin }}>

                    <View style={{ ...styles.generalContainer }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}>Unit Cost</Text>
                    </View>
                    <View style={{ ...styles.generalContainer }}>
                        <TextInput style={{ ...styles.generalFont, ...regularFont }}
                            value={this.getunitcost()}
                            onChangeText={text => { this.handleunitcost(text) }}
                        />
                    </View>

                </View>

            </View>
        )

    }
}

