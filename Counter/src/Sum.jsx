import React from "react";
import{memo} from 'react';
const Sum=React.memo(()=>{
    function Totalsum()
    {
        console.log("Sum is rendring");
        let sum=0;
        for(let i=0;i<=1000;i++)
        {
            sum+=i;
        }
        return sum;
    }
    return(
        <div>
            <h2>Sum is:{Totalsum()}</h2>
        </div>
    )
})

export default Sum;