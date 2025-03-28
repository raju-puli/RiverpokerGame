import React from 'react'

 
function ActiveAlert(props){ 

    console.log("props from theeeeeeeee alert")
    console.log(props);

    const styleActive = {
        width:'350px',
    height:'180px',
    backgroundColor: '#0a363c',
    border: '2px solid rgba(255, 229, 85, 0.5)',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '10',

    }
        return (
           <div className="activeAlert" style={styleActive} >
               <div>Do you wish to join the ongoing table..!
                   </div>
                   <div>
                       <button onClick={(e)=>{
                           e.preventDefault();
                           		
                           let tablewindow = window.open(`${window.location}`, `tableid0=${props.data.id}`, `width=${props.tableWidth},height=${props.tableHeight},status=no,toolbar=no,titlebar=no,location=no,scrollbars=no`); //name sorting
                           tablewindow.sessionStorage.setItem(props.data.id, JSON.stringify(props.data.value));


                           }}>OK</button>
                       </div>
               </div>
        )
    
            }
            
export default ActiveAlert