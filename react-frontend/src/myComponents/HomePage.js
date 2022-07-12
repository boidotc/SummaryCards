import React from "react";
import {Button} from 'react-bootstrap';
import './HomePage.css';

import CardService  from '../services/card.service';
import CardsTable from "./CardsTable";

function HomePage() {
  
    const [post, setPost] = React.useState([]);
    
    function getAllCards() {
      CardService.getAll()
        .then((response) => {
          setPost(response.data);
        });
        
    }

    return (
        
        <div>
            
            <CardsTable cardsList={post}/>
            <Button onClick={getAllCards()}>Try this</Button> 
        </div>
    );
}

export default HomePage;
