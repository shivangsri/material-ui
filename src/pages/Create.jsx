import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles({
  text: {
    // append the same classname to increase the specificity
    // output has something like: .makeStyles-field-5.makeStyles-field-5
    "&&": {
      marginBottom: 20,
      marginTop: 20,
      display: "block",
    },
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [category, setCategory] = useState("list");

  const handleSubmit = (e) => {
    e.preventDefault();
    setDetailError(false);
    setTitleError(false);

    if (title.length == 0) {
      setTitleError(true);
    }
    if (detail.length == 0) {
      setDetailError(true);
    }

    if (title && detail) {
      /**
       * POST Call from create page to notes page.....
       */

      // axios
      //   .post("http://localhost:8080/post", { category, detail, title })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });

      fetch("http://localhost:4000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ category, detail, title }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container align="left" maxWidth="false">
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Notes Title"
          fullWidth
          required
          error={titleError}
          className={classes.text}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          error={detailError}
          label="Details"
          fullWidth
          required
          multiline
          rows={4}
          className={classes.text}
          onChange={(e) => setDetail(e.target.value)}
        />

        <FormControl className={classes.text}>
          <FormLabel>Notes Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="Reminder"
              control={<Radio />}
              label="Reminder"
            />
            <FormControlLabel value="Note" control={<Radio />} label="Note" />
            <FormControlLabel value="TODO" control={<Radio />} label="TODO" />
            <FormControlLabel
              value="Birthday"
              control={<Radio />}
              label="Birthday"
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          align="left"
          endIcon={<ArrowForwardIosIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
