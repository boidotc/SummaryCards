import React from "react";
import {Button} from 'react-bootstrap';
import './CheckAllCardsPage.css';

import CardService  from '../../services/card.service';
import CardsTable from "./CardsTable";

function CheckAllCardsPage() {
  
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
            <Button id = "createCardButton" onClick={getAllCards()}>Create a new Card</Button> 
        </div>
    );
}

export default CheckAllCardsPage;
