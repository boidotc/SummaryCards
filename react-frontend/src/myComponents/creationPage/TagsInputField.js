import { TagsInput } from "react-tag-input-component";
import { WithContext as ReactTags } from 'react-tag-input';
import React from "react";

import './TagsInputField.css'

function TagsInputField(props){
    var tagsNameTxt = "Press enter to add new " + props.tagsName;
    const [tags, setTags] = React.useState([]);

    const KeyCodes = {
      comma: 188,
      enter: 13
    };
    
    const delimiters = [KeyCodes.comma, KeyCodes.enter];
      
  const handleDelete = i => {
      setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
      setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      setTags(newTags);
  };

  const handleTagClick = index => {
      console.log('The tag at index ' + index + ' was clicked');
  };

    return(
    <div>
      <ReactTags inline = {true}
            tags={tags}
            // suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            placeholder={tagsNameTxt}
            inputFieldPosition="top"
            autocomplete
            />
    </div>
    );
}

export default TagsInputField;