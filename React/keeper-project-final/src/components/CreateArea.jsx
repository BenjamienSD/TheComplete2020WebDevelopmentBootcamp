import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {

  const [expanded, setExpanded] = useState(false)

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  const expand = () => {
    setExpanded(true)
  }

  return (
    <div>
      <form className="create-note">
        {expanded
          &&
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoFocus
          />
        }

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."

          rows={expanded ? "3" : "1"}
        />
        {
          expanded
          &&
          <Zoom in={true}><Fab onClick={submitNote}><AddIcon /></Fab></Zoom>
        }


      </form>
    </div>
  );
}

export default CreateArea;
