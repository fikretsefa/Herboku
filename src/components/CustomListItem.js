import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//Custom Elements
import CustomButton from './CustomButton';
//Theme
import {DarkTheme,LightTheme,themes} from '../themes/theme';


const CustomListItem = ({theme, index, data,handleDelete,handleStart,isDeleted}) => {
  return (
        <View style={{color:'#fff',height:60,paddingLeft:10,margin:10,marginTop:10,justifyContent:'center',flexDirection:'row'}} key={index}>
          <View style={{backgroundColor:themes[theme].background,flex:1,justifyContent:'center',borderBottomWidth:3,borderBottomColor:themes[theme].underline}}>
            <Text style={[styles.text,{color:themes[theme].text,padding:10}]}>{data.title}</Text>
          </View>
          <CustomButton icon="ios-eye" onHandle={() => handleStart(data.text)} iconColor={themes[theme].text} backgroundColor={themes[theme].background} borderColor={themes[theme].underline}/>
          {isDeleted && <CustomButton icon="ios-trash" onHandle={() => handleDelete(data.timestamp)} iconColor={themes[theme].white} backgroundColor={themes[theme].danger} borderColor={themes[theme].darkDanger}/>}
        </View>
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
      marginLeft:10,
    },
    text:{
        fontSize: 25,
        fontWeight:'700'
      },  
});
  
export default CustomListItem; 