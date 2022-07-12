import CardsInTable from "../myComponents/CardInTable";
import './CardsTable.css';

function CardsTable(cardsList){

    const cardsTable = [];

    function prepareCardsTableElements(){        
        if(cardsList.cardsList!==[]){
            for(let i = 0; i < cardsList.cardsList.length; i++) {
                let title = cardsList.cardsList[i].title;
                let description = cardsList.cardsList[i].description;
                let id = cardsList.cardsList[i].id;
                cardsTable.push(<CardsInTable title={title} description={description} id={id}/>);
            }
        }
        return cardsTable;
    }

    return(
        <table id = "cards">
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    {/* <th>Id</th> */}
                </tr>
                {prepareCardsTableElements()}
            </tbody>
        </table>
    );
}

export default CardsTable;
