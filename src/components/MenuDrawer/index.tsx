import React, { useState, KeyboardEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose, AiFillHome } from "react-icons/ai";
import { IoMdHelp } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import "./styles.css";
interface IMenuDrawer {
  appbarTitle: string;
  arrowBack: string;
}

const MenuDrawer: React.FC<IMenuDrawer> = ({ appbarTitle, arrowBack }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" ||
        (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <div id="page-MenuDrawer">
      <AppBar className="header">
        {arrowBack ? (
          <Link to={arrowBack}>
            <FaArrowLeft size={30} color={"#FFF"} />
          </Link>
        ) : null}

        <div className="logo-header">
          <h1>{appbarTitle}</h1>
        </div>
        <button onClick={toggleDrawer(true)}>
          <HiMenu size={30} color={"#FFF"} />
        </button>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        className="drawer"
        onClose={toggleDrawer(false)}
      >
        <div className="appBar-drawer">
          <h1>Learning Today</h1>
          <button onClick={toggleDrawer(false)}>
            <AiOutlineClose size={30} color={"#FFF"} />
          </button>
        </div>
        <div className="menu-drawer">
          <List>
            <ListItem button>
              <ListItemIcon>
                <AiFillHome size={25} color={"#4343d0"} />
              </ListItemIcon>
              <Link to="/" className="link-button">
                Inicio
              </Link>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <FiLogIn size={25} color={"#4343d0"} />
              </ListItemIcon>
              <Link to="/cadastro" className="link-button">
                Cadastro
              </Link>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <IoMdHelp size={25} color={"#4343d0"} />
              </ListItemIcon>
              <Link to="/about" className="link-button">
                Help
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};
export default MenuDrawer;
