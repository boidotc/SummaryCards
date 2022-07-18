import './CardCreationPage.css';

import React from "react";
import { useForm } from "react-hook-form";

import CardService  from '../../services/card.service.js';
import { Container, Toast } from 'react-bootstrap';

function CardCreationPage(){

    const [content, setContent] = React.useState();
    const [inputList, setInputList] = React.useState([{ paragraphTitle: "", paragraphContent: "" }]);

    var card;

    /** form add/remove input methods **/

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { paragraphTitle: "", paragraphContent: "" }]);
    };

    function save(card){
        if(card){
            try {
                CardService.create(card).then((response) => {
                    if(response.status === 200){
                        setContent(
                            // <Alert variant='sucess'>The card was created!</Alert>
                            <Toast bg={"success"}>
                                <Toast.Body>
                                    Card successfully created!
                                </Toast.Body>
                             </Toast>
                        );
                    }
                    else {
                        setContent(
                            <Toast bg={"danger"}>
                                <Toast.Body>
                                    Something went wrong.
                                </Toast.Body>
                             </Toast>
                        );
                    }
                });
            } catch (error) {
                setContent(
                    <Toast bg={"danger"}>
                        <Toast.Body>
                            Something went wrong: error= {error}
                        </Toast.Body>
                     </Toast>
                );
            }
            setTimeout(() => { setContent(); }, 5000)      
        }
    }

    const {
        register,
        handleSubmit,
        watch, //to check if the value has changed
        formState: { errors }
      } = useForm();


      const onSubmit = (data) => {         
        card=data;
        card.content=inputList;
        console.log(JSON.stringify(card));
        save(card);
      }; 
    
      console.log(watch("title")); // you can watch individual input by pass the name of the input

      return (
        <Container>
            <h1 id="wdylt">What did you learn today?</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <h2>Title of the Card</h2>
                <input defaultValue="title" key={ 'title'} {...register("title", { required: true })} />
                {errors.exampleRequired && <p id="required">This field is required!</p>}
            
                <h2>Descrition of the Card</h2>
                <input defaultValue="desc" key={ 'desc'} {...register("description", { required: true })} />
                {errors.exampleRequired && <p id="required">This field is required!</p>}

                {inputList.map((x, i) => {

                    return (
                    <div className="box" key={ 'section-${ i }'}>
                        <input key={ 'sectionTitle-${ i }'}
                        name="paragraphTitle"
                        placeholder="Section Title"
                        value={x.title}
                        onChange={e => handleInputChange(e, i)}
                        />
                        <input key={ 'sectionDesc-${ i }'}
                        className="ml10"
                        name="paragraphContent"
                        placeholder="Section Content"
                        value={x.content}
                        onChange={e => handleInputChange(e, i)}
                        />
                        <div className="btn-box">
                            {inputList.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick(i)}>Remove section</button>}
                            {inputList.length - 1 === i && <button onClick={handleAddClick}>Add section</button>}
                        </div>
                    </div>
                    );
                })}
                <input type="submit" />
                {content}
            </form>
        </Container>
      );
}

export default CardCreationPage;