import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View  , ScrollView} from 'react-native';
import apicompleteApiData  from '../data/data';
import { convertToSpaceSeparated, convertToTitleCase } from './helpers';

export default function TabLayout() {

  //------------------------------data and booleans for UI -------------------------------------------------

  const [completeApiData ,  setcompleteApiData] = useState<any>({});
  const [KeysOfAllDataForCategoryTabs , setKeysOfAllDataForCategoryTabs] = useState(Object?.keys(completeApiData));
  const [categoryActiveTabKeyName , setcategoryActiveTabKeyName] = useState(Object?.keys(completeApiData)?.[0]);
  const [DataAfterClickingCategoryTabs , setDataAfterClickingCategoryTabs] = useState<any>({});
  const [keysOfDataAfterClickingCategoryTabs , setKeysOfFirstObjectiveTabs] = useState(Object?.keys(DataAfterClickingCategoryTabs));
  const [activeNestedKey , setActiveNestedKey] = useState("");
  const [DataAfterClickingCategoryTabsCondition , setDataAfterClickingCategoryTabsCondition] = useState<any>({});
  const [dataToShowAfterClickingNestedKeys , setdataToShowAfterClickingNestedKeys] = useState([]);
  const [showDataOfNestedTabs , setShowDataOfNestedTabs] = useState(false);
  const [showDataNoInstructions , setshowDataNoInstructions] = useState(false);


  //-----------------------DUE TO CORS ERROR ON SERVER SIDE COULD NOT GET DATA FROM LOCAL HOST -------------------------------

  // useEffect(()=>{
  //   fetch("https://harpreetcd.github.io/reactnative.json" , {
  //     method: "GET",
  //     headers: {
  //       "access-control-allow-origin" : "*",
  //       "Content-type": "application/json" ,
  //     }})
  //   .then(response=>response.json())
  //   .then(result=>console.log(result , "result"));
  // },[]);

  //------------------------------------------- CORS ERROR FAKE CALL  --------------------------------------------------------

  useEffect(()=>{
    setcompleteApiData(apicompleteApiData);
    setKeysOfAllDataForCategoryTabs(Object?.keys(apicompleteApiData));
  }, []);


   //---------------------- FUNCTIONS FOR EVENTS (click tabs and categoris-----------------------------------------------------

  function handleCategoryChange(keys : string){
    setshowDataNoInstructions(true);
    // console.log(completeApiData?.[keys] , "nested default object");
    setcategoryActiveTabKeyName(keys);
    setActiveNestedKey("");
    setDataAfterClickingCategoryTabs(completeApiData?.[keys]);
    // nested object
    setDataAfterClickingCategoryTabsCondition(completeApiData?.[keys]?.[0]?.type);
    // undefined means it is an object => render keys
    // console.log(completeApiData?.[keys]?.[0]?.type , "condition");
    // condition
    {/*if undefined make tabs*/}
    {/*if value use components*/}
    setKeysOfFirstObjectiveTabs(Object?.keys(completeApiData?.[keys]))
    // asynchronus changes
    // if undefined make tabs of keys
    setShowDataOfNestedTabs(false);
  }

  function handleNEstedButons(key: string , index:number){
    setdataToShowAfterClickingNestedKeys(DataAfterClickingCategoryTabs?.[key]);
    setShowDataOfNestedTabs(true)
    setActiveNestedKey(key);
  }






  function RenderDataInKeyAndValue({dataGiven} : any){
    return (
      <View style={styles.container}>
      {/*@ts-ignore */}
     {Object.keys(dataGiven).map((key , index)  => (
         <View style={index%2 == 0 ? styles.rowBack : styles.row} key={key}>
           <Text style={styles.bold}>{convertToSpaceSeparated(key)}</Text>
            {/*@ts-ignore */}
           <Text style={styles.cell}>{dataGiven?.[key]}</Text>
         </View>
       ))}
 
 
     </View>

    )
  }

  function RenderKeyAndPara({dataGiven} : any){
    return (
      <View style={styles.container}>
       {Object.keys(dataGiven).map((key) => (
        <View key={key}>
          <Text style={styles.smallheading}>• {key}</Text>
          <Text>{dataGiven[key]}</Text>
        </View>
      ))}

     </View>
    )
  }




  //------------------------------------------------------------ UI PART  -------------------------------------------------------------

  return (
   <>
   <ScrollView style={styles.containerOfPage}>

  {/* -------------------------------------------------------category tabs UI----------------------------------------------------- */}
   <View style={styles.flex}>
   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <Text>Category :</Text>
    { KeysOfAllDataForCategoryTabs?.map((keys)=><>

      <TouchableOpacity 
        style={keys== categoryActiveTabKeyName ? styles.activeButton : styles.button} 
        onPressIn={()=>{handleCategoryChange(keys);}}
      >
        {convertToTitleCase(keys)}
    </TouchableOpacity> 

   </>
   )
   }
   </ScrollView>

   </View>

   {/* ---------------------TYPE TABS for [arrays DataAfterClickingCategoryTabsCondition is undefined]------------------------------------- */}

   {!showDataNoInstructions && <Text style={styles.press}>Please press buttons for data </Text>}

   {!DataAfterClickingCategoryTabsCondition && <View style={styles.flex}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
   <Text>Type :</Text>

   {keysOfDataAfterClickingCategoryTabs.map((keys , index)=> <>
   <>
   
  <TouchableOpacity 
   style={keys== activeNestedKey ? styles.activeButton : styles.button}
   onPressIn={()=>{handleNEstedButons(keys , index)
   }}
   >
    {convertToTitleCase(keys)}
   </TouchableOpacity>
    </>  
   </> )}
   </ScrollView>

   

   {/* ----data part for type tabs [showDataOfNestedTabs= false  and  DataAfterClickingCategoryTabsCondition]--------------------------- */}
   </View> }
   { !showDataOfNestedTabs  && <> 

{/* --------------------table---------------------- */}
  {DataAfterClickingCategoryTabsCondition == "TABLE" ? <>
  <Text style={styles.heading}>
  {convertToTitleCase(DataAfterClickingCategoryTabs?.[0]?.heading)} 
  </Text>

  <View style={styles.row}>
        <Text style={styles.threeTableHeading}>House</Text>
        <Text style={styles.threeTableHeading}>Degree</Text>
        <Text style={styles.threeTableHeading}>Sign</Text>
        <Text style={styles.threeTableHeading}>Sign Lord</Text>
  </View>


  {DataAfterClickingCategoryTabs?.[0]?.data.map((item:any, index:number
  ) => (
        <View style={index%2 == 0 ? styles.row: styles.rowBack } key={index}>
          <Text style={styles.cellLeft} ellipsizeMode="tail">{item.house}</Text>
          <Text style={styles.cell} ellipsizeMode="tail" >{item.degree}</Text>
          <Text style={styles.cell} ellipsizeMode="tail" >{item.sign}</Text>
          <Text style={styles.cell} ellipsizeMode="tail">{item.sign_lord}</Text>
        </View>
      ))} 
    </>  :   null } 

{/* ---------------------------------------------------special part----------------------------------------------------------- */}

    {DataAfterClickingCategoryTabsCondition == "SPECIAL" ? <>

    <Text style={styles.heading}>
    <Text>{DataAfterClickingCategoryTabs?.[0]?.heading}</Text>
    </Text>

    {Object?.keys(DataAfterClickingCategoryTabs?.[0]?.data)?.map(keys=><><Text style={styles.Midheading}>{keys}</Text>
    <RenderDataInKeyAndValue dataGiven =  {DataAfterClickingCategoryTabs?.[0]?.data[keys]} />
    </>) }
    </>  
    :   null } 
    
   </> }


{/* --------------------------------------------show data of nested tabs = true ----------------------------------------------------*/}
   

{showDataOfNestedTabs && <>

  {/* --------------------------------------paragraph type KEY_VALUE AND KEY_PARAGRAPH --------------------------------------------- */}

  {dataToShowAfterClickingNestedKeys?.map((data : any) =><>

  {data?.type !== "KEY_VALUE" ?  <> 
  <Text style={styles.heading}>
      {data?.heading}    
  </Text>

  <Text style={styles.bulletPoint}>{

    data?.type == "KEY_PARAGRAPH" ? <>
    {Object.keys(data?.data).map((key) => (
      <React.Fragment key={key}>
        <br></br>

        
        <Text style={styles.smallheading} > • {convertToSpaceSeparated(key)}</Text>
        <br></br>
        <Text> {
        Array?.isArray(data?.data?.[key]) || ( typeof data?.data?.[key] === 'object' && data?.data?.[key] !== null && !Array.isArray(data?.data?.[key]) )   
        ?
        JSON.stringify(data?.data?.[key])


        // divisioom



    // -------------------------------------paragraph type (to be resolved for nesting) -------------------------------------------------- */}
        :
        String(data?.data?.[key])
        }</Text>
      </React.Fragment>
    ))}

    </>
    :
    data?.data?.[0]
  }
  </Text></>   
  
  : 
  <>

    {/* ----------------------------------------- KEY_VALUE for nested --------------------------------------------- */}


    <View >
    <Text style={styles.heading}>
    {/*@ts-ignore */}
    {convertToTitleCase(dataToShowAfterClickingNestedKeys?.[0]?.heading)} 
    </Text>



    <View style={styles.container}>

     {/*@ts-ignore */}
    {Object.keys(dataToShowAfterClickingNestedKeys?.[0]?.data).map((key , index)  => (
        <View style={index%2 == 0 ? styles.rowBack : styles.row} key={key}>
          <Text style={styles.bold}>{convertToSpaceSeparated(key)}</Text>
           {/*@ts-ignore */}
          <Text style={styles.cell}>{dataToShowAfterClickingNestedKeys?.[0]?.data[key]}</Text>
        </View>
      ))}


    </View>
    </View>

  </>}

  {/* -----------------------------------------------------------complete nested tabs data------------------------------------------ */}
 
  
  </>)}



</>}

    </ScrollView>
   </>
  );
}

const styles = StyleSheet.create({
  containerOfPage :{
    paddingHorizontal : 10,
    backgroundColor:"white",
    paddingBottom : 100
  } ,
  flex :{
    justifyContent : "flex-start",
    alignContent :"center",
    flexDirection: "row",
    marginTop : 5
  },
  press :{
    textAlign : "center",
    marginTop: 100
  },
  button :{
    color :"#4a4a4a",
    borderRadius :10 ,
    borderColor :"#4a4a4a" ,
    backgroundColor :"light#4a4a4a",
    paddingHorizontal: 10 ,
    paddingVertical : 5,
    borderWidth : 2 ,
    marginLeft : 5
  },
  activeButton :{
    color :"blue",
    borderRadius :10 ,
    borderColor :"blue" ,
    backgroundColor :"lightblue",
    paddingHorizontal: 10 ,
    paddingVertical : 5,
    borderWidth : 2 ,
    marginLeft : 5
  } ,
  heading : {
    fontSize : 20 ,
    fontWeight : "500",
    marginTop:20,
  } ,
  smallheading :{
    fontSize : 16 ,
    fontWeight :"500",
    marginTop:20 ,
    marginBottom: 20
  },
  bulletPoint : {
    fontSize: 14,
    marginRight: 10,
  } ,
  Midheading : {
    fontSize : 14 ,
    fontWeight : "500",
    textAlign : "center" ,
    marginTop: 30,
    marginBottom :20
  },
  container: {
    justifyContent: 'center', 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  rowBack :{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:"rgb(248,248,248)"
  },
  cell: {
    flex: 1,
    padding: "auto",
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    paddingVertical:10
  },
  cellLeft:{
    flex: 1,
    padding: "auto",
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'left',

  },
  threeTableHeading:{
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'left',
    fontWeight:"500",
    backgroundColor:"rgb(248,248,248)"
  },
  bold :{
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontWeight :"500"

  }
});