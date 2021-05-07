import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { ToastAndroid,StyleSheet, Text, View, TouchableOpacity, Linking, Modal,TextInput,AsyncStorage,ScrollView } from 'react-native';
import { Icon,Slider} from 'react-native-elements';
import moment from 'moment';

//Custom Elements
import CustomButton from './src/components/CustomButton';
import CustomListItem from './src/components/CustomListItem';

//Theme
import {DarkTheme,LightTheme,themes} from './src/themes/theme';

//Global variable
const statusBarHeight = Constants.statusBarHeight;
var tick;
var slicedWord = [];

export default function App() {
  
  //#region text-comp  
  const [text,setText] = useState("");  
  const [index,setIndex] = useState(0);
  const [tempArray,setTempArray] = useState([]);
  //#endregion   
  
  //#region game-control
  const [letsPlay,setLetsPlay] = useState(false);
  const [isPause,setIsPause] = useState('ios-pause');   
  const [isVisiblePlayConsole, setIsVisiblePlayConsole] = useState(false);
  //#endregion

  //#region theme
  const [themeIcon,setThemeIcon] = useState('ios-sunny');
  const [theme, setTheme] = useState("dark");
  //#endregion 

  //#region add-new-text  
  const [newBookmarkTitle,setNewBookmarkTitle] = useState();
  const [newBookmarkText,setNewBookmarkText] = useState();
  const [isVisibleAddTextModal, setIsVisibleAddTextModal] = useState(false); 
  //#endregion  

  //#region bookmarks  
  const [bookmarks,setBookmarks] = useState([]);  
  const [isVisibleBookmarkModal, setIsVisibleBookmarkModal] = useState(false);
  //#endregion 

  //#region library  
  const [library,setLibrary] = useState([   
  {title:"Lorem Ipsum",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",timestamp:"2021-04-05T22:35:03.140Z"},
  {title:"Turkish News",text:"Alkol meselesi kendiliğinden çıkmış bir şey değil. 2 ay süreyle Avrupa'yı takip ettik. Onları takip ederek, onlar nasıl kapanıyorlar, hangi tedbirleri alıyorlar, işten kaçta çıkıyorlar. Bunlar bizim için örnek oldu, öğretici oldu. Kendi tecrübelerimizle bunları pekiştirdik ve kendimize bir yol haritası belirledik. Dünya Sağlık Örgütü, bu işin başında kuralı koymuş. Demiş ki, alkolden kaçınarak bağışıklık sisteminizi koruyun diyor. Ayık kalın diyor. Alkolün limitiyle alakalı, fazla bir alkol almayın diyor. Alkol kullanımı sırasında evde bile olsa sosyal mesafenin korunmama riski yüksektir diyor, temel derdi bu aslında. Hem kapanma hem yılbaşıyla ilgili. Bir araştırma şirketi araştırma yapmıştı. Vatandaşımızın yüzde 75'i ben bunu normal görüyorum dedi. Şimdi yüzde 78'i bunu normal görüyor.",timestamp:"2021-08-05T22:35:03.142Z"},
  {title:"Turkish Paragraph",text:"Düşündüklerinin doğru olduğuna inanan, düşüncelerine birer tutku gücü verebilmiş olan kişi, düşündüklerini bir engelle karşılaşmadan söyleyebilmeyi ister. Onu durduramazsınız ki! Sus dersiniz, korkutmaya kalkarsınız; her şeye katlanır, kellesini verir, yine söyler. Tutku engel tanımadığı, önüne çıkan her engeli yıkmaya kalktığı gibi tutku gücü edinmiş düşünce de engel tanımaz. O da her engeli yıkmaya kalkar. Ama kendi düşüncelerini söylemek, yaymak, çevresine işletmek isteyen her kişi özgürlük için çalışıyor demek değildir. Kendisinin özgür olmasına çalışıyor, o başka; kendi düşüncelerine uymayan düşüncelerin de özgürce söylenebilmesini istiyor mu? Onu da istiyorsa, onun için de çalışıyorsa ancak o zaman özgürlük için savaşıyor diyebiliriz",timestamp:"2021-08-05T22:35:04.146Z"},
  ]);    
  const [isVisibleLibraryModal, setIsVisibleLibraryModal] = useState(false);
  //#endregion 

  //#region settings  
  const [isVisibleSettingsModal, setIsVisibleSettingsModal] = useState(false);
  const [intervalTime,setIntervalTime] = useState(300); 
  //#endregion 

  useEffect(() => {
    priorty();  
  },[]);

  //#region Config
  const priorty = async () => {   
    setBookmarks([]);
    let value = await AsyncStorage.getItem('@bookmarks') || '[]';
    const tempValue = JSON.parse(value);
    //console.log(JSON.stringify(value));
    setBookmarks(tempValue);
    console.log("priorty in bookmarks");
    console.log(bookmarks)
   // bookmarks.map((item) => console.log(item))

  // const test = await AsyncStorage.getItem('@bookmarks') || '[]';
  // const value = JSON.parse(test);

  // console.log(test);
  // //console.log(value);
  // setBookmarks(value);
  // console.log("bookmarks↓");
  // console.log(bookmarks); //<--{JSONPARSE}
  // //console.log(JSON.parse(value));
  // bookmarks.map((data) => {
  //     console.log(data.timestamp)
  // })
  


  // const a = [{"title":"Test","text":"Evettttt","timestamp":"2021-05-04T08:37:46.859Z"},{"title":"Evet","text":"Gghhhh","timestamp":"2021-05-04T08:38:10.011Z"}]
  // console.log(a)
  // value.map((data) => {
  //   console.log(data.timestamp)
  // })

  // bookmarks.map((data) => {
  //     console.log(data.timestamp)
  //   })

  };
  //#endregion

  //#region Game-Control
  const prepareTheText = (readingText) => { 
    slicedWord = [];
    var str = readingText;
    var clearSpace = str.replace(/  +/g, ' ');
    var punctuationless = clearSpace.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

   
    var words = punctuationless.split(" ");
    words.forEach(element => {
      slicedWord.push(element);
    });
    console.log(slicedWord);
    setTempArray(slicedWord);
    setIndex(0);
    setText("");
    readyCycle();
    
  };

  const readyCycle = () => {
    setLetsPlay(true);
    var welcomeTextArray = ["3","2","1"]
    var i = 0;
    var readyInterval = setInterval(() => {
    if(i !== welcomeTextArray.length){  
      console.log(welcomeTextArray[i])
      setText(welcomeTextArray[i])  
      i++;   
    }else{
      clearInterval(readyInterval);
      setIsVisiblePlayConsole(true);       
      cycle();
      setIsPause('ios-pause')
    }  
  
    }, 800);
  }   

  const cycle = () => {
    var i = index;
    tick = setInterval(() => {
    // setText(textArray[i++])
    if(i !== slicedWord.length){
      console.log(slicedWord[i])    
      setText(slicedWord[i])
      i++;      
      setIndex(i);
    }else{
      console.log("Finished.")
      setText("Finished");
      setIndex(slicedWord.length); 
      clearInterval(tick);
      setIsPause('ios-play')
    }
   
  
    }, intervalTime);
  };
  //#endregion

  //#region Play-Control
  const handlePlayBack = () => {
    if(isPause == 'ios-pause'){
      clearInterval(tick);
      setIsPause('ios-play')
    }
    if(index > 0){      
      setIndex(index-1);
      setText(tempArray[index+-1])
      }
   };

   const handlePlayForward = () => {

    if(isPause == 'ios-pause'){
      clearInterval(tick);
      setIsPause('ios-play')
    }

    if(index < tempArray.length){      
    setIndex(index+1);
    setText(tempArray[index+1])
    }
    
   };

   const handlePlayPause = () => {

    
    if(isPause == 'ios-pause'){
      //durdur
      clearInterval(tick);
      setIsPause('ios-play')
    }else{
      //calistir
      cycle();
      setIsPause('ios-pause')
    }
   };

   const handlePlayStop = () => {    
      clearInterval(tick);
      setIsPause('ios-play')
      setIndex(0);
      setText(tempArray[0])    
   };

   const handlePlayClose = () => {     
    clearInterval(tick);    
    setIndex(0);
    setLetsPlay(false);
    setIsVisiblePlayConsole(false);
   };
  //#endregion

  //#region Global
  const addText = async() => {
    try {
      const timestamp = moment().toISOString();
      let temp = {title:newBookmarkTitle,text:newBookmarkText,timestamp:timestamp}
      let value = await AsyncStorage.getItem('@bookmarks') || '[]';
      value = JSON.parse(value);
      value.push(temp);
      //AsyncStorage.setItem('@bookmarks', JSON.stringify(value))
      AsyncStorage.setItem('@bookmarks', JSON.stringify(value))
      .then(() => {
        priorty();
        console.log('New bookmarks added.');
        closeAllModal();
        setNewBookmarkText();
        setNewBookmarkTitle();      
      });
    } catch(error) {
      console.log(error)
    }
  };

  const handleTheme = () => {
    if(theme == 'dark'){
      setThemeIcon('ios-moon')
      setTheme('light');
    }else{
      setThemeIcon('ios-sunny')
      setTheme('dark');
    }
   };

   const closeAllModal = () =>{    
    setIsVisibleAddTextModal(false);
    setIsVisibleBookmarkModal(false);
    setIsVisibleLibraryModal(false);
    setIsVisibleSettingsModal(false);
   }

  //#endregion

   //#region Handle-Library
   const handleDelete = async(timestamp) => {
     let list = await AsyncStorage.getItem('@bookmarks')
     console.log(list);
     list = JSON.parse(list);
     console.log(timestamp);     
     const newList = list.filter((item) => item.timestamp !== timestamp);
     console.log(newList)
     await AsyncStorage.setItem('@bookmarks', JSON.stringify(newList))
     priorty();
   };

   const handleStart = (readingText) =>{    
    closeAllModal();
    //console.log(readingText);
    //setTempText(readingText);
    prepareTheText(readingText);
   }
   //#endregion

   if(!letsPlay){
    return (
      <View style={[styles.container,{backgroundColor:themes[theme].background,marginTop:statusBarHeight}]}>
        <StatusBar backgroundColor={themes[theme].background} />  

        {/*begin::main */}
        <View style={{flex:1,flexDirection:'column',justifyContent: 'center', alignItems: 'center',borderWidth:0}}> 
        <TouchableOpacity onPress={() => setIsVisibleAddTextModal(true)}>
        <View style={[styles.box,{backgroundColor:themes[theme].box,borderColor:themes[theme].underline}]}>
        <Text style={[styles.text,{color:themes[theme].text}]}>Add Text</Text></View>
        </TouchableOpacity>
        </View>
        {/*end::main */}
  
  
        {/*begin::header */}
        <View style={{right:0,padding:10,position:'absolute',flexDirection:'row',borderColor:'lightblue',borderWidth:0}}>
          <CustomButton icon="ios-reader" onHandle={() => setIsVisibleLibraryModal(true)} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline}/>
          <CustomButton icon="bookmark" onHandle={() => setIsVisibleBookmarkModal(true)} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline}/>
          <CustomButton icon={themeIcon} onHandle={handleTheme} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline}/>
          <CustomButton icon="ios-ellipsis-horizontal-sharp" onHandle={() => setIsVisibleSettingsModal(true)} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline}/>
        </View>
        {/*end::header */}
  
  
        {/*begin::header */}
        <View style={{bottom:0,right:0,padding:10,position:'absolute',flexDirection:'row',borderColor:'green',borderWidth:0}}>
        <TouchableOpacity style={styles.link} onPress={() => Linking.openURL("https://www.linkedin.com/in/fikretsefa/")}><Icon name='ios-logo-linkedin' type='ionicon' color={themes[theme].link} size={20}/></TouchableOpacity>      
        <TouchableOpacity style={styles.link} onPress={() => Linking.openURL("https://github.com/fikretsefa")}><Icon name='ios-logo-github' type='ionicon' color={themes[theme].link} size={20}/></TouchableOpacity> 
        <TouchableOpacity style={styles.link} onPress={() => Linking.openURL("mailto:fikretsefa@gmail.com?")}><Icon name='ios-mail' type='ionicon' color={themes[theme].link} size={20}/></TouchableOpacity>       
        </View>
        {/*end::header */}
  
        {/*begin::add-text-modal */}
        <Modal animationType='slide' visible={isVisibleAddTextModal} transparent={true} style={{margin:0,padding:0,border:0}} onRequestClose={() => setIsVisibleAddTextModal(false)}>
          <View style={{backgroundColor:themes[theme].box,position:'absolute',bottom:0,width:'100%',height:'100%',borderTopWidth:3,borderColor:themes[theme].underline}}>
            <TextInput placeholder={'Title'} value={newBookmarkTitle} onChangeText={setNewBookmarkTitle} placeholderTextColor={themes[theme].box} style={[styles.text,{backgroundColor:themes[theme].background,padding:10,margin:10,color:themes[theme].text,}]}></TextInput>
            <TextInput placeholder={'Your Text'} value={newBookmarkText} onChangeText={setNewBookmarkText} placeholderTextColor={themes[theme].box}  numberOfLines={20} multiline={true} style={[styles.text,{textAlignVertical: 'top',backgroundColor:themes[theme].background,padding:10,margin:10,flex:1,color:themes[theme].text}]}></TextInput>
              <View style={{flexDirection:'row',marginBottom:10,marginRight:10}}>
                <TouchableOpacity onPress={() => setIsVisibleAddTextModal(false)} style={[styles.button,{flex:1,alignItems:'center',backgroundColor:themes[theme].danger,borderColor:themes[theme].darkDanger}]} >
                <Text style={[styles.text,{color:themes[theme].white}]}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={addText} style={[styles.button,{flex:1,alignItems:'center',backgroundColor:themes[theme].background,borderColor:themes[theme].underline}]} >
                <Text style={[styles.text,{color:themes[theme].text}]}>Save</Text></TouchableOpacity>
              </View>
          </View>
        </Modal>
        {/*end::add-text-modal */}

        {/*begin::bookmark-modal */}
        <Modal animationType='slide' visible={isVisibleBookmarkModal} transparent={true} style={{margin:0,padding:0,border:0}} onRequestClose={() => setIsVisibleBookmarkModal(false)}>
          <View style={{backgroundColor:themes[theme].box,position:'absolute',bottom:0,width:'100%',height:'100%',borderTopWidth:3,borderColor:themes[theme].underline}}>
            <View style={{flexDirection:'column',marginBottom:10,marginRight:10,marginTop:10,flex:1}}>
              <ScrollView>
              {bookmarks.length > 0 ?
              bookmarks.map((data) => {return (<CustomListItem handleStart={handleStart} theme={theme} index={data.timestamp} data={data} handleDelete={handleDelete} isDeleted={true}/>);})
              :
              (<View style={{justifyContent:"center",alignContent:"center",alignSelf:"center"}}>
              <Text style={[styles.darkText,{color:themes[theme].text,padding:10}]}>Oops, There is no any bookmark</Text>
              </View>)
              }
              </ScrollView>
            </View>
            <View style={{flexDirection:'row',marginBottom:10,marginRight:15,marginLeft:10}}>
              <TouchableOpacity onPress={() => setIsVisibleBookmarkModal(false)} style={[styles.button,{flex:1,alignItems:'center',backgroundColor:themes[theme].danger,borderColor:themes[theme].darkDanger}]} >
              <Text style={[styles.text,{color:themes[theme].white}]}>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/*end::bookmark-modal */}

        {/*begin::library-modal */}
        <Modal animationType='slide' visible={isVisibleLibraryModal} transparent={true} style={{margin:0,padding:0,border:0}} onRequestClose={() => setIsVisibleLibraryModal(false)}>
          <View style={{backgroundColor:themes[theme].box,position:'absolute',bottom:0,width:'100%',height:'100%',borderTopWidth:3,borderColor:themes[theme].underline}}>
            <View style={{flexDirection:'column',marginBottom:10,marginRight:10,marginTop:10,flex:1}}>
              <ScrollView>
              {library.length > 0 &&
              library.map((data) => {return (<CustomListItem theme={theme} index={data.timestamp} data={data} handleStart={handleStart} handleDelete={handleDelete} isDeleted={false}/>);})}
              </ScrollView>
            </View>
            <View style={{flexDirection:'row',marginBottom:10,marginRight:15,marginLeft:10}}>
            <TouchableOpacity onPress={() => setIsVisibleLibraryModal(false)} style={[styles.button,{flex:1,alignItems:'center',backgroundColor:themes[theme].danger,borderColor:themes[theme].darkDanger}]} >
            <Text style={[styles.text,{color:themes[theme].white}]}>Cancel</Text></TouchableOpacity>            
            </View>
          </View>
        </Modal>
        {/*end::library-modal */}

        {/*begin::settings-modal */}
        <Modal animationType='slide' visible={isVisibleSettingsModal} transparent={true} style={{margin:0,padding:0,border:0}} onRequestClose={() => setIsVisibleSettingsModal(false)}>
          <View style={{backgroundColor:themes[theme].box,position:'absolute',bottom:0,width:'100%',height:'100%',borderTopWidth:3,borderColor:themes[theme].underline}}>
            <View style={{flexDirection:'column',margin:10,flex:1}}>
              <View style={{backgroundColor:themes[theme].background,borderBottomWidth:3,borderBottomColor:themes[theme].underline,color:'#fff',margin:10,padding:10,justifyContent:'center',flexDirection:'column'}}>
                <Text style={[styles.text,{color:themes[theme].text,padding:10}]}>Ur Speed {intervalTime} ms</Text>
                <View style={{ flex: 1,padding:10,marginVertical:15,justifyContent: 'center' }}>
                <Slider
                value={intervalTime}
                onValueChange={setIntervalTime}
                maximumValue={1000}
                minimumValue={50}
                step={50}
                trackStyle={{height: 10, backgroundColor: 'transparent' }}
                thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{children: (<Icon name="ios-rocket" type="ionicon" size={15} reverse containerStyle={{ bottom: 15, right: 15 }} color={themes[theme].link}/>),}}/>
                </View>
              </View>

              <View style={{backgroundColor:themes[theme].background,borderBottomWidth:3,borderBottomColor:themes[theme].underline,color:'#fff',margin:10,padding:10,justifyContent:'center',flexDirection:'column'}}>
                <Text style={[styles.text,{color:themes[theme].text,padding:10}]}>Connect To Me</Text>            
                <View style={{flexDirection:'row',borderColor:'green',borderWidth:0}}>
                  <TouchableOpacity style={styles.visitMe} onPress={() => Linking.openURL("https://www.linkedin.com/in/fikretsefa/")}><Icon name='ios-logo-linkedin' type='ionicon' color={themes[theme].link} size={30}/></TouchableOpacity>      
                  <TouchableOpacity style={styles.visitMe} onPress={() => Linking.openURL("https://github.com/fikretsefa")}><Icon name='ios-logo-github' type='ionicon' color={themes[theme].link} size={30}/></TouchableOpacity> 
                  <TouchableOpacity style={styles.visitMe} onPress={() => Linking.openURL("mailto:fikretsefa@gmail.com?")}><Icon name='ios-mail' type='ionicon' color={themes[theme].link} size={30}/></TouchableOpacity>  
                  <TouchableOpacity style={styles.visitMe} onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.fikretsefa.herboku")}><Icon name='ios-logo-google-playstore' type='ionicon' color={themes[theme].link} size={30}/></TouchableOpacity>      
                </View> 
              </View>

            <View style={{backgroundColor:themes[theme].background,borderBottomWidth:3,borderBottomColor:themes[theme].underline,color:'#fff',margin:10,padding:10,justifyContent:'center',flexDirection:'column'}}>
              <Text style={[styles.text,{color:themes[theme].text,padding:10}]}>Buy Me A Coffee</Text>          
              <View style={{flexDirection:'row',borderColor:'green',borderWidth:0}}>
                <TouchableOpacity style={styles.visitMe} onPress={() => Linking.openURL("https://www.buymeacoffee.com/fikretsefa")}><Icon name='ios-cafe' type='ionicon' color={themes[theme].link} size={30}/></TouchableOpacity>     
                <TouchableOpacity style={styles.visitMe} onPress={() => ToastAndroid.show("My Papara Code: 1226518753", ToastAndroid.SHORT)}><Icon name='ios-wallet' type='ionicon' color={themes[theme].link} size={30}/></TouchableOpacity>     
              </View>            
              <Text style={[styles.darkText,{color:themes[theme].link,padding:10}]}>If you want contribute buy me a coffee or send over papara</Text>      
            </View>
          </View>
          
          <View style={{flexDirection:'row',marginBottom:10,marginRight:15,marginLeft:10}}>
            <TouchableOpacity onPress={() => setIsVisibleSettingsModal(false)} style={[styles.button,{flex:1,alignItems:'center',backgroundColor:themes[theme].danger,borderColor:themes[theme].darkDanger}]} >
            <Text style={[styles.text,{color:themes[theme].white}]}>Close</Text></TouchableOpacity>
          </View>

        </View>
      </Modal>
      {/*end::settings-modal */}
  
        
    </View>
    );
   }else{
    return (
      <View style={[styles.container,{backgroundColor:themes[theme].background,marginTop:statusBarHeight}]}>
         <StatusBar backgroundColor={themes[theme].background} />
       
        {/*begin::main */}
        <View style={{flex:1,flexDirection:'column',justifyContent: 'center', alignItems: 'center',borderWidth:0}}>
        <View style={[styles.box,{backgroundColor:themes[theme].box,borderColor:themes[theme].underline}]}>
        <Text style={[styles.text,{color:themes[theme].text}]}>{text}</Text>        
        </View>
        {isVisiblePlayConsole &&
        <View style={{position:'absolute',bottom:0,flexDirection:'row',padding:10}}>
        <CustomButton icon="ios-play-back" onHandle={handlePlayBack} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline} isMargin={false}/>
        <CustomButton icon={isPause} onHandle={handlePlayPause} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline}/>
        <CustomButton icon="ios-play-forward" onHandle={handlePlayForward} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline}/>
        <CustomButton icon="ios-stop" onHandle={handlePlayStop} iconColor={themes[theme].text} backgroundColor={themes[theme].box} borderColor={themes[theme].underline}/>
        <CustomButton icon="ios-close" onHandle={handlePlayClose} iconColor={themes[theme].white} backgroundColor={themes[theme].danger} borderColor={themes[theme].darkDanger}/>
        </View>}
        </View>
        {/*end::main */}
        
      </View>
    );
   }


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    fontSize: 25,
    fontWeight:'700'
  },  
  lightText:{
    fontSize: 25,
    color:'#353741',
    fontWeight:'700'
  },   
  darkText:{
    fontSize: 15,
    fontWeight:'700'
  },
  box:{
    alignItems:'center',
    padding:25,
    minWidth:230,
    minHeight:80,
    borderBottomWidth:3,
  },
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
  link:{
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',
    padding:5,  
    marginLeft:2,
  },    
  visitMe:{
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',
    padding:10,  
    marginRight:5,
  }
});
