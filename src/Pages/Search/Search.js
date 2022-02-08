import React from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import {Tabs,Tab} from "@material-ui/core"
import ContentInfo from "../../components/ContentInfo/ContentInfo";




export default function Search(){
    const [content,setContent] = React.useState([])
    const [type,setType] = React.useState(0)
    const [page,setPage] = React.useState(1)
    const [pages,setPages] = React.useState()
    const [searchWord,setSearchWord] = React.useState()
    const [opencontent,setopencontent] = React.useState({isOpen:false, id:'',mediaType:''})
    const source = axios.CancelToken.source()
    const url = `https://api.themoviedb.org/3/search/${type ? "movie": "tv"}?api_key=${process.env.REACT_APP_API_KEY}&
                 language=en-US&query=${searchWord}&page=${page}&include_adult=false`

    const fetchResults = async ()=>{
        try{
          const {data} = await axios.get(url,{cancelToken:source.token})
          setContent(data.results)
          console.log(data.results)
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
        fetchResults()
        return ()=>{
            source.cancel()
        }
    },[type,page])

    
    return(
        <div>
            <div className="search-div">
                    <input
                    className="search"
                    type="text" 
                    placeholder="Search" 
                    onChange={(e)=>setSearchWord(e.target.value)} 
                    value={searchWord}
                    />
                    <button className="search-button" onClick={fetchResults}  type="submit">
                        <i className="fas fa-search"></i>
                    </button>  
            </div>
            <div className="tabs">
                <Tabs 
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);}}
                    style={{ paddingBottom: 5}}
                    centered
                    aria-label="disabled tabs example"
                >
                    <Tab style={{ width: "50%" }} label="Search series"/>
                    <Tab style={{ width: "50%" }} label="Search movie"/>
        
                </Tabs>
            </div>

            {opencontent.isOpen && <ContentInfo mediaType={opencontent.mediaType} id={opencontent.id} setopencontent={setopencontent}/>}            
            <div className="content-wrap">
                {content &&content.map((r)=>
                <SingleContent
                    key={r.id}
                    id={r.id}
                    poster={r.poster_path}
                    title={r.title||r.name}
                    date={r.first_air_date||r.release_date}
                    media_type={type ? "movie":"tv"}
                    vote_average={r.vote_average}
                    setopencontent={setopencontent}
                />  
                )}
            </div>
            {searchWord &&  !content && (type ? <h2>No Movie found</h2> : <h2>No Series found</h2> )}
            {pages>1 && (
                <CustomPagination
                numOfPages={pages}
                setPage={setPage}
            />)}
            
        </div>
        
    )
}



