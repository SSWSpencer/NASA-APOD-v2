import React, {useState} from "react"
import {connect} from "react-redux";
import axios from "axios";
import {Link, useHistory, useLocation} from "react-router-dom";

const Nav = (props) =>{
    let today = new Date(Date.now());
    let earliestDate = new Date("1995-06-16");
    const history = useHistory();
    const location = useLocation().pathname;

    // console.log(earliestDate.getTime());
    // console.log(today.getTime());
    let todayDate = `${today.getFullYear()}-${((today.getMonth()+1) > 10) ? today.getMonth()+1 : `0${today.getMonth()+1}`}-${(today.getDate() > 10) ? today.getDate() : `0${today.getDate()}`}`
    const [formDate, setFormDate] = useState(todayDate)

    const reRoute = () =>{
        if(location !== "/"){
            history.push("/")
        }
    }

    const handleFormSubmit = (e) => {
        setFormDate(e.target.value);
        let selectedDate = new Date(e.target.value);
        // console.log('submit')
        if(selectedDate.getTime() >= earliestDate.getTime() && selectedDate.getTime() <= today.getTime()){
            axios.get(`https://api.nasa.gov/planetary/apod?api_key=F0gllhQuMb7NNCfLvJjxjpiWvPHkwiuKUjLMYHZT&date=${e.target.value}`)
            .then(res=>{
                let newData = [res.data]
                props.setState(newData);
            })
        }
        else if (selectedDate.getTime() < earliestDate.getTime()){
            alert("Error: NASA's APOD only has records between 06/16/1995 and today's date");
            setFormDate("1995-06-16");
        }
        else if(selectedDate.getTime() > today.getTime()){
            alert("Error: NASA's APOD only has records between 06/16/1995 and today's date");
            setFormDate(todayDate);
        }
    }
    return(
        <div className="NavWrapper">
            <input type="date" value={formDate} onChange={handleFormSubmit} onKeyDown={(e) => e.preventDefault()} onClick={()=>{reRoute()}}/>
            <p>or <Link to="/search">Search for a Specific Picture</Link></p>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        data: state
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return {
        setState: (state) => { dispatch({type: "SET_STATE", data: state})}
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Nav);