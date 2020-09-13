import React from 'react';
import { View, Text, TextInput} from 'react-native';
import Construction from './construction'
import { MyStylesheet } from './styles'
class MaterialID {
    searchresult(mymaterial) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]} key={[mymaterial.materialid]}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]} onPress={()=>{this.handlemymaterialid.call(this,mymaterial.materialid)}}>{mymaterial.material}</Text>
            </View>
        </View>
        )

    }

  showsearchresults(){
    const construction = new Construction();
    const materialid = new MaterialID();
    const mymaterials = construction.getmymaterials.call(this);
    const search = this.state.material.toLowerCase();
    let materialids = [];
    if(mymaterials) {
        mymaterials.map(mymaterial=> {
            if(mymaterial.material.toLowerCase().startsWith(search) && search) {
            materialids.push(materialid.searchresult.call(this,mymaterial))
            } else if (!search) {
            materialids.push(materialid.searchresult.call(this,mymaterial))
            }
        })
    }
    return materialids;

  }
    showmaterialid() {
        const construction = new Construction();
        const materialid = new MaterialID()
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const activematerial = () => {
            const mymaterialid = this.getmymaterialid()
          
            if(mymaterialid) {
              
                const mymaterial = construction.getmymaterialbyid.call(this, mymaterialid)
                
                return(<Text style={[styles.activeBackground,regularFont]}>{mymaterial.material}</Text>)
            }

        }

        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1]}>
                    <Text style={[regularFont]}> MaterialID</Text>
                    {activematerial()}
                    <TextInput style={[regularFont, styles.defaultInput]} value={this.state.material} onChangeText={text=>{this.setState({material:text})}}/>
                    
                    <View style={{...styles.generalContainer, ...styles.maxHeight140}}>
                    {materialid.showsearchresults.call(this)}
                    </View>
    
                </View>
            </View>
        )

    }
}
export default MaterialID;