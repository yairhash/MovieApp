import React from "react";
import axios from "axios";
import {img_500 ,unavailable} from "../../config/config"


export default function ContentInfo({id,mediaType ,setopencontent}){
    const [content , setContent] = React.useState([])
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    const source = axios.CancelToken.source()
    console.log(id,mediaType)
    console.log(content)
    console.log(url)

    
    const fetchOpenContetnt = async()=>{
        try{
          const {data} = await axios.get(url,{cancelToken:source.token})
          console.log(data)
          setContent(data)
          console.log(content)
        }catch(error){
          if(axios.isCancel(error)){
              console.log("caught")
          }else{
              throw error
          }
        }  
    }


    React.useEffect(()=>{
        fetchOpenContetnt()
        return ()=>{
            source.cancel()
        } 
    },[id])

    const closeInfo = ()=>{
        setopencontent({isOpen:false, id:'',mediaType:''})

    }


    return(

        <div className="info-wrap">
            <div className="poster-div">
                <img className="poster-info" src={ content.poster_path ?`${img_500}/${content.poster_path}`:unavailable} alt={content.title||content.name}/>
            </div> 
            <div className="info-content">
                <h2> {content.title||content.name}</h2>
                <span>{content.tagline}</span><br></br>
                <span> Release date: {content.first_air_date||content.release_date} </span> <br></br>
                <spa>language: {content.original_language}</spa> <br></br>
                <span> Rating: {content.vote_average}</span><br></br>
                <section> Overview: {content.overview}</section>
            </div>
            <button className="x-btn" onClick={closeInfo} >Close </button>
        </div>
    )
}
