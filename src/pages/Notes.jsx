import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import NoteCard from "../component/NoteCard";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:4000/notes/" + id, {
      method: "DELETE",
    });
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard noteData={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default Notes;
