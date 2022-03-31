import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  List,
  
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const drawerWidth = 240;
const useStyles = makeStyles({
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
  },
  text: {
    padding: "15px",
  },
  activeButton: {
    "&&": {
      background: "#f4f4f4",
    },
  },
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const listItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];
  return (
    <div className={classes.root}>
      {/* {appbar} */}

      {/* {slide drawer} */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.text}>
            Notes
          </Typography>
        </div>
        <List>
          {listItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname == item.path ? classes.activeButton : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* {Create and Notes component as children} */}
      <div className={classes.page}>{children}</div>
    </div>
  );
}
