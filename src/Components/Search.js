import React, {useState} from "react";
import archive from "./ArchiveList.json";
import {connect} from "react-redux"

const Search = (props) =>{
    const [search, setSearch] = useState("");

    const handleChanges = (e) => {
        setSearch(e.target.value);
    }
    
    function getMonthFromString(mon){
        let month = new Date(Date.parse(mon +" 1, 2021")).getMonth()+1
        if(month<10){
            return(`0${month}`);
        }
        else{
            return month.toString();
        }
     }

    const handleSubmit = () =>{
        let results = [];
        for (const [key, value] of Object.entries(archive)) {
            if(value.includes(search)){

                let firstDigits = "00";
                let secondDigits = "00";
                let thirdDigits = "00";

                if(isNaN(key.substring(0,5))){
                    secondDigits = getMonthFromString(key.substring(0,key.length-6))
                    thirdDigits = key.substring(key.length-7, key.length-5)
                    firstDigits = key.substring(key.length-2, key.length)
                }
                else{
                    firstDigits = (key.substring(2,4))
                    secondDigits = getMonthFromString(key.substring(5, key.length-2))
                    thirdDigits = key.substring(key.length-2, key.length)  
                }

                results.push({
                    date: key,
                    name: value,
                    link: `https://apod.nasa.gov/apod/ap${firstDigits}${secondDigits}${thirdDigits}.html`
                })
            }
          }
          props.setSearch(results);
    }
    return(
        <div className="CarouselWrapper">
            <input id="SearchBar" type="text" value={search} onChange={handleChanges}/>
            <button id="SearchButton" onClick={()=>{handleSubmit()}}>Search</button>
            <div className="SearchResults">
                {props.data.searchData.map(item=>{
                    return(
                        <div key={item.name} className="SearchResult">
                            <p>{item.date}</p>
                            <a href={item.link} target="_blank" rel="noreferrer">{item.name}</a>
                        </div>
                    )
                })}
            </div>
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
        setSearch: (state) => { dispatch({type: "SET_SEARCH", data: state})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);