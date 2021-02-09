import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';


const Station = () => {
    const [chartData, setChartData] = useState([]);
    const [activeQuery, setActiveQuery] = useState({});
    const [activeQuery2, setActiveQuery2] = useState({});
    const [show, setShow] = useState(false);



    const chart = () => {
        let Time = [];
        let parameter = []
        Axios
            .get("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json")
            .then(res => {
                console.log(res.data);
                for (const dataobj of res.data.timeSeries) {
                    for (var j = 0; j < dataobj.parameters.length; j++) {
                        if (dataobj.parameters[j].name == "t") {
                            Time.push(parseInt(dataobj.validTime.slice(0, 16).replace('T', ', ')));
                            parameter.push(parseInt(dataobj.parameters[j].values[0]));
                        }
                    }

                }

            })
            .catch(err => {
                console.log(err);
            });
        console.log(Time, parameter);

        let Time2 = [];
        let parameter2 = []
        Axios
            .get("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json")
            .then(res => {
                console.log(res.data);
                for (const dataobj2 of res.data.timeSeries) {
                    for (var j = 0; j < dataobj2.parameters.length; j++) {
                        if (dataobj2.parameters[j].name == "t") {
                            Time2.push(parseInt(dataobj2.validTime.slice(0, 16).replace('T', ', ')));
                            parameter2.push(parseInt(dataobj2.parameters[j].values[0]));
                        }
                    }

                }

    setChartData({
        labels: Time,
        datasets:


            [{
                label: "Weather station1",
                data: parameter,
                fill: true,
                backgroundColor: "rgba(128,0,128)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Weather station2",
                data: parameter2,
                fill: false,
                borderColor: "rgba(106, 90, 205)",
            }
        ]


    });


            })
    };
    useEffect(() => {
        chart();
    }, [activeQuery]);

    return ( <div className = "App" >
        <h1 > Weather station </h1> 
        <div className = "search-form">

        <form>
        <label>
        Select city:
        <select value = { activeQuery }
        onChange = { e => setActiveQuery(e.target.value) }>

        <option value = "[59.86, 17.64]" >
        Uppsala 
        </option> 
        <option value = "[63.8, 20.26]" > Umeå </option> 
        <option value = "[59.33, 18.06]" > Stockholm </option>
        <option value = "[55.7,13.12]" > Lund </option>
        <option value = " [67.967, 20.309]" > Kiruna </option>
        </select> 
        </label > 
        </form>
         <form>
        <label>

        <select value = { activeQuery2 }
        onChange = { e => setActiveQuery2(e.target.value) }>

        <option value = "[59.86, 17.64]" >
        Uppsala </option> 
        <option value = "[63.8, 20.26]" > Umeå </option>
         <option value = "[59.33, 18.06]" > Stockholm </option>
         <option value = "[55.7,13.12]" > Lund </option>
        <option value = " [67.967, 20.309]" > Kiruna </option>
        </select> 
        </label> 
        </form>

        <button onClick = {
            () => setShow(!show)
        } > Compare </button> {
        show &&  <div className = "weather">
          < Bar 

        data = { chartData }
        options = {
            {
                responsive: true,
                title: { text: "Here you can see weather prognosis from SMHI.", display: true },
                scales: {
                    yAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,
                            beginAtZero: true,
                            display: false

                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                            display: false,
                            gridLines: {
                                display: false,
                            }
                        }

                    ]

                }
            }
        }

        />
        </div>}

        </div> 
        </div >

    )
}
export default Station;