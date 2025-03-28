
import mobileproperties from './DevicesJson/mobile';
import desktopproperties from './DevicesJson/desktop';

function getDeviceType() {

    const width = window.innerWidth;
    // const height = window.innerHeight;

    if (width >= 0 && width <= 768) {
        return mobileproperties();
    } else if (width >= 769 && width <= 992) {
        // return tabletproperties();
        return desktopproperties();
    } else if (width >= 993 && width <= 1200) {
        return desktopproperties();
    } else if (width >= 1201 && width <= window.innerWidth) {
        return desktopproperties();
    }

    // if (width <= 768) {
    //     // let Devicedetails={name:'Mobile',width:500,height:880,style:{gameBox:"gameBox",image:"backPixTable",Background:MobileImage}}
    //     return mobileproperties();
    //     // } else if (width <= 1024) {
    // } else if (width < 1124) {
    //     // let Devicedetails={name:'Tablet',width:1000,height:650,style:{gameBox:"gameBox",image:"backPixTable",Background:MobileImage}}
    //     return desktopproperties();
    // } else {
    //     // let Devicedetails={name:'Desktop',width:1000,height:650,style:{gameBox:"gameBox1",image:"backPixTable1",Background:DeskTopImage}}
    //     return desktopproperties();
    // }
}

function getOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches) {
        return 'Portrait';
    } else if (window.matchMedia('(orientation: landscape)').matches) {
        return 'Landscape';
    } else {
        return 'Unknown';
    }
}
// async function fetchAndConvert(data) {
//     try {
//       const response = await fetch(data); // Relative path
//       const xmlText = await response.text();

//       parseString(xmlText, (err, jsonData) => {
//         if (err) {
//           console.error('Error parsing XML to JSON:', err);
//           return;
//         }

//         // document.getElementById('jsonResult').textContent = JSON.stringify(jsonData, null, 2);
//         // console.log(JSON.stringify(jsonData, null, 2));
//         return JSON.stringify(jsonData, null, 2)
//       });
//     } catch (error) {
//       console.error('Error fetching or parsing XML data:', error);
//     }
//   }
const Screen = { getDeviceType, getOrientation }

export default Screen;