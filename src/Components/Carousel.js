import React, {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {connect} from "react-redux";

const Carousel = (props) =>{

    const sliderRef = useRef();

    const goToToday = () =>{
        if(props.data.carouselData.length > 1){
            sliderRef.current.slickGoTo(0);
        }
        else{
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
        }
    }

    const settings = {
        dots: false,
        arrows: false,
        swipe: false
    }
    return(
        <div className="CarouselWrapper">
            <Slider {...settings} ref={sliderRef}>
            {props.data.carouselData.map(item=>{
                if(item.media_type === "image"){
                    return(
                        <div className="CarouselSlide" key={item.title}>
                            <h5>{item.date}</h5>
                            <img src={item.url} alt={item.title} />
                            <a href={item.hdurl}>View Full Size Image</a>
                            {(item.copyright) ? <h6>{item.title}&nbsp;&nbsp;&nbsp;—&nbsp;{item.copyright}</h6> : <h6>{item.title}</h6>}
                            <p>{item.explanation}</p> 
                        </div>
                    )
                }
                if(item.media_type === "video"){
                    return(
                        <div className="CarouselSlide" key={item.title}>
                            <h5>{item.date}</h5>
                            <iframe title={item.title} width="800px" height="600px" src={item.url}/>
                            {(item.copyright) ? <h6>{item.title}&nbsp;&nbsp;&nbsp;—&nbsp;{item.copyright}</h6> : <h6>{item.title}</h6>}
                            <p>{item.explanation}</p> 
                        </div>
                    )
                }
            })}
            </Slider>
            
            <div className="CarouselButtons">
                <button className={props.data.carouselData.length > 1 ? "CarouselButton" : "hidden"} onClick={()=>{sliderRef.current.slickPrev()}}>Previous Day</button>
                <button className="CarouselButton" onClick={()=>{goToToday()}}>Today</button>
                <button className={props.data.carouselData.length > 1 ? "CarouselButton" : "hidden"} onClick={()=>{sliderRef.current.slickNext()}}>Next Day</button>
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
        setState: (state) => { dispatch({type: "SET_STATE", data: state})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);