import React, {useEffect} from "react";
import './App.css';
import Title from "./Components/Title.js";
import SubTitle from "./Components/SubTitle.js";
import Carousel from "./Components/Carousel.js";
import Search from "./Components/Search.js"
import Nav from "./Components/Nav.js";
import {BrowserRouter as Router, Route} from "react-router-dom"
import axios from "axios";
import {connect} from "react-redux";

function App(props) {
  useEffect(()=>{
      let today = new Date(Date.now() - 1123e6);
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      let yyyy = today.getFullYear();
      let startDate = `${yyyy}-${(mm > 10) ? mm : `0${mm}`}-${(dd > 10) ? dd : `0${dd}`}`
      axios.get(`https://api.nasa.gov/planetary/apod?api_key=F0gllhQuMb7NNCfLvJjxjpiWvPHkwiuKUjLMYHZT&start_date=${startDate}`)
      .then(res=>{
          let tempArr = res.data;
          tempArr.unshift(res.data[res.data.length - 1]);
          tempArr.pop();
          props.setState(tempArr);
      })
      // props.setState(["test", "test"])
  },[])
    

    // console.log("PROPS", props.data.carouselData)
  return (
    <Router>
      <div className="App">
        <Title />
        <SubTitle />
        <Nav />
        <Route exact path = "/" component={Carousel} />
        <Route exact path = "/search" component={Search} />

      </div>
    </Router>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);