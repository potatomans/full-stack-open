import { useState } from "react";
import { Button, TextField } from "@mui/material";

const NoteForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <TextField
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          author:{" "}
          <TextField
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          url:{" "}
          <TextField
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </div>
        <Button variant="contained" color="primary" type="submit" id="create">
          create
        </Button>
      </form>
    </div>
  );
};

export default NoteForm;
