import React from "react";
import { Pagination } from "@mui/material";


export default function CustomPagination({setPage,numOfPages}){
    const handleChange = (page)=>{
        setPage(page)
        window.scroll(0,0)
    }
    return(
        <div className="pagination">
            <Pagination 
                count={numOfPages}
                onChange={(e)=>handleChange(e.target.textContent)}
                hideNextButton
                hidePrevButton
                color="primary"
            />
        </div>
    )
}