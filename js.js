
let p1 = document.getElementById("one");
let p2 = document.getElementById("two");
let p3 = document.getElementById("tree");


let data = `["LoRa Receiver"]["25.81","764","87353","-560.53","-1662.66","656.44"]["25.81","775","87357","-558.02","-1738.47","703.73"]["25.81","775","87347","-580.33","-1804.08","730.65"]["27.31","707","87305","10.54","-34.39","-24.91"]["27.31","757","87382","-108.27","-45.42","-30.78"]["27.31","438","87341","-44.30","-178.69","69.93"]["27.31","697","87355","78.65","-335.07","-112.82"]["27.31","886","87343","84.78","-401.32","19.59"]["27.94","856","87346","67.57","-61.26","-207.71"]["LoRa Receiver"]["26.31","950","87281","-6.52","-33.11","6.50"]["26.31","952","87285","-117.68","-77.46","-459.54"]["26.31","667","87293","-223.23","-27.64","-574.25"]["26.31","804","87290","-192.47","-80.83","-528.22"]["26.31","855","87286","-247.31","-146.39","-564.13"]["26.31","885","87295","-265.31","-240.56","-603.91"]["26.31","769","87287","-255.60","-288.62","-567.97"]["26.31","777","87295","-267.80","-363.03","-519.54"]["26.31","766","87396","-742.22","-840.14","-295.67"]["26.31","765","87389","-764.45","-906.04","-266.82"]["26.31","765","87398","-787.22","-971.88","-238.23"]["26.31","765","87391","-808.10","-1038.04","-209.61"]`;
p1.innerHTML = data;

let filteredArrPressure = [];

for(let i = 0; i < data.length; i++){
    if(data[i] == "["){
        let endScopre = data.indexOf("]",i);
        let itemArr = eval(data.slice(i , endScopre+ 1)) 
        // console.log(itemArr);
        if(itemArr[0] == "LoRa Receiver"){
            // console.log("LoRa Receiver" ,"<----");
        }else{
            filteredArrPressure.push(itemArr[2])
        }
    }
}

p2.innerHTML = filteredArrPressure.join(", ");


const calculateAltitude = (pressure) => {
    const T0 = 288.15;        // Standard temperature at sea level in Kelvin
    const L = 0.0065;         // Temperature lapse rate in K/m
    const P0 = 101325;        // Standard pressure at sea level in Pascal
    const R = 287.05;         // Universal gas constant for dry air in J/(kg·K)
    const g = 9.8;            // Acceleration due to gravity in m/s²

    const altitude = (T0 / L) * ((pressure / P0) ** (-R * L / g) - 1);
    return altitude.toFixed();
};

let altitudeArray = [];

filteredArrPressure.forEach((i)=>{
    // let pressData8000 = (i /10).toFixed();
    // console.log(pressData8000);
    altitudeArray.push(calculateAltitude(i))   
// console.log(`Altitude: ${altitude.toFixed(2)} meters`);

})

p3.innerHTML = altitudeArray.join(", ");


console.log(filteredArrPressure);
console.log(altitudeArray);

let countTimeForChatr = Array(filteredArrPressure.length).fill("14s"); 

// _________________________________________________________chart for pressure data
const pressureData = filteredArrPressure;
const timestamps = countTimeForChatr;

function createPressureChart() {
    const ctx = document.getElementById('pressureChart').getContext('2d');

    const pressureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Pressure Data',
                data: pressureData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }],
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Pressure (Pascal)',
                    },
                },
            },
        },
    });
}

createPressureChart();


// _________________________________________________________chart for Altitude data

const altitudeData = altitudeArray;
// const timestamps_Altitude = ['12:00', '12:14', '12:28', '12:42', '12:56'];

function createAltitudeChart() {
    const ctx = document.getElementById('altitudeChart').getContext('2d');

    const altitudeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: countTimeForChatr,
            datasets: [{
                label: 'Altitude Data',
                data: altitudeData.map((altitude, index) => ({ x: index, y: altitude })),
                borderColor: 'rgb(186, 192, 75)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(186, 192, 75)',
                pointRadius: 5,
                fill: false,
            }],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Altitude (meters)',
                    },
                },
            },
        },
    });
}

createAltitudeChart();
