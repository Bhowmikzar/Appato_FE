import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import Data from "../Folder-structure";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Navigation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const addItem = () => {
    setInput(true);
  };

  const addInputHandler = (e) => {
    if (e.key === "Enter") {
      alert("Hello World!");
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div onClick={addItem} className="plus">
        +
      </div>
      {input ? (
        <div>
          {" "}
          <input
            type="text"
            placeholder=""
            className="input"
            onKeyPress={(e) => addInputHandler(e)}
          />{" "}
        </div>
      ) : null}
      {/* <Toolbar /> */}
      <div className={classes.drawerContainer}>
        <List>
          {Data.map((item) => (
            <>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <MailIcon />
                        </ListItemIcon>
                        <Link to="/test">
                          <ListItemText primary={child.name}></ListItemText>
                        </Link>
                      </ListItem>
                      <Divider></Divider>
                    </>
                  ))}
                </List>
              </Collapse>
            </>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default Navigation;
