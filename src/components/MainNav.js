import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@material-ui/core';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import { useNavigate } from "react-router-dom";




const useStyles = makeStyles({
    root:{
        width:"100%",
        position:"fixed",
        bottom:0,
        backgroundColor:"#5b5bbe"
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(value===0) navigate('/ ');
        else if (value === 1) navigate('/Movies')
        else if (value === 2) navigate('/Series')
        else if (value === 3) navigate('/Search')

    },[value,navigate])



  return (
  
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} className={classes.root}>

        <BottomNavigationAction 
            label="Trending"
            icon={< WhatshotIcon />}
            style={{color:"white"}}
        />

        <BottomNavigationAction
            label="movies"
            icon={<MovieIcon />}
            style={{color:"white"}}
        />

        <BottomNavigationAction
            label="TV series"
            icon={<TvIcon />}
            style={{color:"white"}}
        />

        <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            style={{color:"white"}}
        />

      </BottomNavigation>
  );
}