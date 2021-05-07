import React from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const CustomButton = ({icon,onHandle,iconColor,backgroundColor,borderColor,isMargin=true}) => {

    var marg = 10;
    if(!isMargin){marg = 0;}
    return (
        <TouchableOpacity style={[styles.button,{backgroundColor:backgroundColor,borderColor:borderColor,marginLeft:marg}]} onPress={onHandle}><Icon name={icon} type='ionicon' color={iconColor} size={30}/></TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button:{
      alignSelf:'center',
      alignContent:'center',
      justifyContent:'center',
      width:60,
      height:60,
      padding:10,
      borderBottomWidth:3,
    }
});
  
export default CustomButton; 