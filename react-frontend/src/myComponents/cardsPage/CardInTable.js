import './CardInTable.css';
import { DbAddressApi } from '../../config';

function CardInTable({ title, id, description }) {

    const textId = String(id);

    return(
      <tr>
        <td id = "title"><a href={DbAddressApi+textId}>{title}</a></td>
        <td id = "description">{description}</td>
      </tr>
    );

}

export default CardInTable;
