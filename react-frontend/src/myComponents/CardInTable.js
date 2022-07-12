import './CardInTable.css'
function CardInTable({ title, id, description }) {

    const textId = String(id);

    //
    const cardLink = 'http://localhost:8080/api/cards/'+textId;

    return(
        <tr>
        <td id = "title"><a href={cardLink}>{title}</a></td>
        <td id = "description"><a href={cardLink}>{description}</a></td>
        {/* <td id = "id">{typeof id + "/" +typeof textId}</td> */}
      </tr>
    );

}

export default CardInTable;
