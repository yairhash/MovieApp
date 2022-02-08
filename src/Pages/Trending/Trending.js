import React, { useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ContentInfo from "../../components/ContentInfo/ContentInfo";




export default function Trending(){
    const [content , setContent] = React.useState()
    const [opencontent,setopencontent] = React.useState({isOpen:false, id:'',mediaType:''})
    console.log(opencontent.mediaType)
    const [page,setPage] = React.useState(1)
    const [pages , setPages] = React.useState()
    console.log(process.env.REACT_APP_API_KEY)
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    const source = axios.CancelToken.source()

    const fetchTrending = async ()=>{
        try{
          const {data} = await axios.get(url,{cancelToken:source.token})
          setContent(data.results)
          setPages(data.total_pages)
        }catch(error){
          if(axios.isCancel(error)){
              console.log("caught")
          }else{
              throw error
          }
        }  
    }
    useEffect(()=>{
        fetchTrending()
        return ()=>{
            source.cancel()
        }
    },[page])




   
    return(
        <div>

           {opencontent.isOpen && <ContentInfo mediaType={opencontent.mediaType} id={opencontent.id} setopencontent={setopencontent}/>}
            <span className="page-title">Trending</span>
            <div className="content-wrap">
                {content  &&content.map((item)=>
                <SingleContent
                    key={item.id}
                    id={item.id}
                    poster={item.poster_path}
                    title={item.title||item.name}
                    date={item.first_air_date||item.release_date}
                    media_type={item.media_type}
                    vote_average={item.vote_average}
                    setopencontent={setopencontent}
                />
                )}
            </div>
            <CustomPagination
                numOfPages={pages}
                setPage={setPage}
            />
        </div>
    )
}