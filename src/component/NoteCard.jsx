import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import { Avatar, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { blue, green, red, yellow } from "@mui/material/colors";

const useStyles = makeStyles({
  test: {
    border: (note) => {
      if (note.category == "Reminder") {
        return "1px solid red";
      }
      if (note.category == "Note") {
        return "1px solid yellow";
      }
      if (note.category == "TODO") {
        return "1px solid green";
      }
      if (note.category == "Birthday") {
        return "1px solid blue";
      }
    },
  },
  avatar: {
    "&&": {
      backgroundColor: (note) => {
        if (note.category == "Reminder") {
          return red[700];
        }
        if (note.category == "Note") {
          return yellow[700];
        }
        if (note.category == "TODO") {
          return green[700];
        }
        if (note.category == "Birthday") {
          return blue[700];
        }
      },
    },
  },
});

export default function NoteCard(props) {
  const classes = useStyles(props.noteData);
  return (
    <Card
      elevation={2}
      className={classes.test}
      onClick={() => alert("clicked")}
    >
      <CardHeader
        action={
          <IconButton onClick={() => props.handleDelete(props.noteData.id)}>
            <DeleteOutline />
          </IconButton>
        }
        avatar={
          <Avatar className={classes.avatar}>
            {props.noteData.category[0].toUpperCase()}
          </Avatar>
        }
        title={props.noteData.title}
        subheader={props.noteData.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {props.noteData.detail}
        </Typography>
      </CardContent>
    </Card>
  );
}
