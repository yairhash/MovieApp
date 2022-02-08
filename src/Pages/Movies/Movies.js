import axios from "axios";
import React from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ContentInfo from "../../components/ContentInfo/ContentInfo";


export default function Movies(){
    const [movies,setMovies] = React.useState([])
    const [opencontent,setopencontent] = React.useState({isOpen:false, id:'',mediaType:''})
    const [page, setPage] = React.useState(1)
    const [pages , setPages] = React.useState()
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    const source = axios.CancelToken.source()
    
    const fetchMovies = async ()=>{
      try{
        const {data} = await axios.get(url,{cancelToken:source.token})
        setMovies(data.results)
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
        fetchMovies()
        return ()=>{
            source.cancel()
        } 
    },[page])


    return(
        <div>
            {opencontent.isOpen && <ContentInfo mediaType={opencontent.mediaType} id={opencontent.id} setopencontent={setopencontent}/>}
            <span className="page-title"> Movies</span>
            <div className="content-wrap">
              {movies && movies.map((m)=>
                  <SingleContent
                    key={m.id}
                    id={m.id}
                    poster={m.poster_path}
                    title={m.title||m.name}
                    date={m.first_air_date||m.release_date}
                    media_type="movie"
                    vote_average={m.vote_average}
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