import React, { useState } from "react";

function CreateArea(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setContent(value);
    }
  };

  return (
    <div>
      <form>
        <input
          name="title"
          value={title}
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          name="content"
          value={content}
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
        />
        <button
          onClick={(e) => {
            props.addNote({ title: title, content: content });
            setTitle("")
            setContent("")
            e.preventDefault()
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
