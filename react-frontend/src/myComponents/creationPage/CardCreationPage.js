import './CardCreationPage.css';

import React from "react";
import { useForm } from "react-hook-form";

import CardService  from '../../services/card.service.js';
import { Container, Toast, Button} from 'react-bootstrap';

import {BsPlusLg} from 'react-icons/bs';
import {AiOutlineMinus} from 'react-icons/ai';

function CardCreationPage(){

    const [content, setContent] = React.useState();
    const [inputList, setInputList] = React.useState([{ paragraphTitle: "", paragraphContent: "" }]);

    var card;

    // window.addEventListener('keydown',function(e){
    //     if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
    //         if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
    //             e.preventDefault();
    //             return false;
    //         }
    //     }
    // },true);

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
            setTimeout(() => { 
                setContent();
                window.location.replace("/cards");
             }, 2000)      
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
        let usefullcontent  = [];
        for(let i=0; i<inputList.length; i++){

            if((inputList[i].paragraphTitle !== "") || (inputList[i].paragraphContent !== "")){
                usefullcontent.push(inputList[i]);
            }
        }
        card.content=usefullcontent;
        save(card);
      }; 
    
      console.log(watch("title")); // you can watch individual input by pass the name of the input

      return (
        <Container fluid>
            <h1 id="wdylt">What did you learn today?</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <h2>Title of the Card</h2>
                <input placeholder="Title" key={ 'title'} {...register("title", { required: true })} />
                {errors.exampleRequired && <p id="required">This field is required!</p>}
            
                <h2>Description of the Card</h2>
                <textarea placeholder="Description" id="content" key={ 'desc'} {...register("description", { required: true })} />
                {errors.exampleRequired && <p id="required">This field is required!</p>}
                
                <h2>Content of the Card</h2>

                {inputList.map((x, i) => {

                    return (
                    <div className="box" key={"section-"+{i}}>
                        <input
                        name="paragraphTitle"
                        placeholder="Section Title"
                        value={x.title}
                        onChange={e => handleInputChange(e, i)}
                        />
                        <textarea 
                        id="content"
                        className="ml10"
                        name="paragraphContent"
                        placeholder="Section Content"
                        value={x.content}
                        onChange={e => handleInputChange(e, i)}
                        />
                        <div className="btn-box">
                            {inputList.length !== 1 && <Button variant="danger" style={{marginLeft: "20px", marginBottom: "10px"}} className="mr10" onClick={() => handleRemoveClick(i)}><AiOutlineMinus/></Button>}
                            {inputList.length - 1 === i && <Button variant="success" style={{marginLeft: "20px", marginBottom: "10px"}}onClick={handleAddClick}><BsPlusLg/></Button>}
                        </div>
                    </div>
                    );
                })}
                {content}
                <input value="Create Card" type="submit"/>
            </form>
        </Container>
      );
}

export default CardCreationPage;