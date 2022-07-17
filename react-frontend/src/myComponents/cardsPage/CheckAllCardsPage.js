import React from "react";
import {Button, Container, Row, Col} from 'react-bootstrap';
import './CheckAllCardsPage.css';

import CardService  from '../../services/card.service';
import CardsTable from "./CardsTable";

function CheckAllCardsPage() {
  
    const [post, setPost] = React.useState([]);
    
    function getAllCards() {
      CardService.getAll()
        .then((response) => {
          if(response.status === 200){
            setPost(response.data);
          } else {
            console.log("Couldn't get all cards.");
          }
        });
    }

    return (
        <div>
            {getAllCards()}
            <CardsTable cardsList={post}/>
            <Button id = "createCardButton" href="/create">Create a new Card</Button> 
        </div>
    );
}

export default CheckAllCardsPage;
