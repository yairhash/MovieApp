import React from "react";
import "./Header.css"

export default function Header(){
    return(

        <div>
            <span onClick={()=>window.scroll(0,0)} className="header"> E - HUB</span>
        </div>
    )
}
