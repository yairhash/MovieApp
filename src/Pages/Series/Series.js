import axios from "axios";
import React from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ContentInfo from "../../components/ContentInfo/ContentInfo";


export default function Series(){
    const [series,setSeries] = React.useState([])
    const [pages , setPages] = React.useState()
    const [opencontent,setopencontent] = React.useState({isOpen:false, id:'',mediaType:''})
    const [page, setPage] = React.useState(1)
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    const source = axios.CancelToken.source()

    const fetchSeries = async ()=>{
      try{
        const {data} = await axios.get(url,{cancelToken:source.token})
        setSeries(data.results)
        setPages(data.total_pages)
      }catch(error){
        if(axios.isCancel(error)){
            console.log("caught")
        }else{
            throw error
        }
      }  
    }

    React.useEffect(()=>{
        fetchSeries()
        return ()=>{
            source.cancel()
        } 
    },[page])


    return(
        <div>
            {opencontent.isOpen && <ContentInfo mediaType={opencontent.mediaType} id={opencontent.id} setopencontent={setopencontent}/>}
            <span className="page-title"> TV Series</span>
            <div className="content-wrap">
              {series && series.map((s)=>
                  <SingleContent
                    key={s.id}
                    id={s.id}
                    poster={s.poster_path}
                    title={s.title||s.nase}
                    date={s.first_air_date||s.release_date}
                    media_type="tv"
                    vote_average={s.vote_average}
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