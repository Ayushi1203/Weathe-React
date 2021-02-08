import React,{useState, useEffect} from 'react';
import{v4 as uuidv4} from 'uuid';
import {Bar} from 'react-chartjs-2';

const API =() => {
   
   

    const [search, setSearch] =useState([]);
    const [items, setItems] = useState("");
    const [select, setSelect]= useState([]);
    const [shows, setShow] = useState("");

    
    

     useEffect(() => {
       const getData =async ()=>{
  const data1 = await fetch(` https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json`);
  const jsonResponse = await data1.json();
  console.log(jsonResponse);
  console.log(jsonResponse.timeSeries);
  setItems(jsonResponse.timeSeries)
  
       } 
       getData();
    }, [search]);


    useEffect(() => {
        const getData =async ()=>{
   const data2 = await fetch(` https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json`);
   const jsonResponse = await data2.json();
   console.log(jsonResponse);
   console.log(jsonResponse.timeSeries);
   setShow(jsonResponse.timeSeries)
   console.log(jsonResponse.data)

   
        } 
        getData();
     }, [select]);
    
    return(<div>
   <h1>Weather station</h1>
   <div>
        Here you can see weather prognosis from SMHI.
    </div>


    <select 
    
    value={search}
    onChange={e => setSearch(e.target.value)}>
    <option value="[59.86, 17.64]">
      Uppsala
    </option>
    <option value="[63.8, 20.26]">Umeå</option>
    <option value="[59.33, 18.06]">Stockholm</option>
  </select>

  
    <button>Compare!</button>
   
       <select 
    
    value={select}
    onChange={e => setSelect(e.target.value)}>
    <option value="[59.86, 17.64]">
      Uppsala
    </option>
    <option value="[63.8, 20.26]">Umeå</option>
    <option value="[59.33, 18.06]">Stockholm</option>
  </select>



{!items == [] ? (items.map(item => 
             <div key={uuidv4()}>
            <tr>     
          <td>{search}{select}</td>
          <td value={item.value}>{item.validTime}</td>
              {
                  item.parameters.map(function(parameter, index){
                      return <div>
                      <td style={{ "width":"50px","height": 10, "position": "relative", "background": "purple"}}>{parameter.values}</td> 
                     
                      </div>
                  })
              }
            
          </tr>
          
          </div>  
           ) )
          :
          (<p>LocalDining..</p>)
          }


{!shows == [] ? (shows.map(show => 
             <div key={uuidv4()}>
            <tr>     
          <td>{select}</td>
          <td value={show.value}>{show.validTime}</td>
              {
                  show.parameters.map(function(parameter, index){
                      return <div>
                      <td style={{ "width":"50px","height": 10, "position": "relative", "background": "black"}}>{parameter.values}</td> 
                     
                      </div>
                  })
              }
            
          </tr>
          
          </div>  
           ) )
          :
          (<p>loading..</p>)
          }

  
    </div>
    )
}
export default API;