import { useState } from 'react'
import Sum from './Sum'

 function App() {

  const [counter,setCounter]=useState({count:0});
  console.log("App is rendering");
  const resetElement=()=>{
    console.log("Item reset");
    setCounter({...counter,count:0});
  }


  
  const addElement=()=>{
    console.log("Item added");
    setCounter({...counter,count:counter.count+1});
  }

  const removeElement=()=>{
    console.log("Item removed");
     setCounter({...counter,count:counter.count-1});
  }

 

  return (
    <>
    <h1>My Counter</h1>
    <h3>Counter={counter.count}</h3>
    <br></br>
    <div
  style={{
    
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  }}
>
  
    <button onClick={addElement}>Add</button>
    <button onClick={removeElement}>Remove</button>
    <button onClick={resetElement}>Reset</button>
    <Sum/>
    </div>
   
    </>
  )
} 
  
export default App;
