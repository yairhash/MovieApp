import React from "react"
import {img_300 ,unavailable} from "../../config/config"
import "./SingleContent.css"


export default function SingleContent({id,poster,title,date,media_type,vote_average,setopencontent}){
    const handelOpen=()=>{
        setopencontent({
            isOpen:true,
            id:id,
            mediaType:media_type
        })
        window.scroll(0,0)
        console.log('hhh')
    }

    return(
        <>
            <div className="media">
                <span className={vote_average >= 6 ? "rating-green" :"rating-red" }>{vote_average}</span>
                <img className="poster" src={ poster ?`${img_300}/${poster}`:unavailable} alt={title}/>
                <b className="title">{title}</b>
                <span className="second-title" >
                    {media_type==="movie"? "Movie":"TV Series"}
                    <span className="second-title">{date}</span> 
                </span>
                <button onClick={handelOpen}>Click for more info</button>
            </div>

        </>
    )       
}