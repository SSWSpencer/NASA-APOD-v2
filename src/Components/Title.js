import React from "react";
import {Link} from "react-router-dom"

const Title = () =>{
    return(
        <div className="Title">
            <Link to="/"><h1>NASA Astronomy Photo of the Day</h1></Link>
        </div>
    )
}

export default Title;