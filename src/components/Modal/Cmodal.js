import React from "react";
import axios from "axios";
import {img_300 ,unavailable} from "../../config/config"


export default function Cmodal({setIsOpen , id , media_type}){
    const [content, setContent] = React.useState([]);
    const [video, setVideo] = React.useState();
    const contentUrl =`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US` 
    const movietUrl =`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US` 
    const source = axios.CancelToken.source()


    const fetchData = async () => {
        try{
            const { data } = await axios.get(contentUrl,{cancelToken:source.token});
            setContent(data.results);
        }catch(error){
            if(axios.isCancel(error)){
                console.log("caught")
            }else{
                throw error
            }
        }
    
      };
    
    const fetchVideo = async () => {
    try{
        const { data } = await axios.get(movietUrl,{cancelToken:source.token});
        setVideo(data.results[0]?.key);
    }catch(error){
        if(axios.isCancel(error)){
            console.log("caught")
        }else{
            throw error
        }
    }
    } 
    
    React.useEffect(() => {
        fetchData();
        fetchVideo();
        return ()=>{
            source.cancel()
        }   
    }, [id]);


  
    return(
            <div className="modalBackground">
             {content &&  [content].map((item)=>{
                if(item.id === id && item.media_type === media_type){
                    <div className="modalContainer">
                        <div className="closeBtn"> 
                            <button onClick={()=>{setIsOpen(false)}}>x</button>
                        </div>
                        <span className="modalTitle">{item.title||item.name}</span>
                        <section className="modalBody">
                            <img className="poster" src={item.poster ?`${img_300}/${item.poster}`:unavailable} alt={item.title||item.name}/>
                            <p>{content.overview}dsfsdfsdf</p>
                        </section>
                        <section className="footer" >
                            {media_type==="movie"? "Movie":"TV Series"} 
                        </section>
                    </div>
                }})}
            </div> 
        );  
        
};
    
  