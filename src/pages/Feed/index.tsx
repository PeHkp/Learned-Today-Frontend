import React, { useState } from "react";
import MenuDrawer from "../../components/MenuDrawer";
import { BiLike } from "react-icons/bi";

import "./styles.css";

import imagemPerfil from "../../assets/heroes.png";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { SyntheticEvent } from "react";
import { Chip } from "@material-ui/core";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
interface IFeedbackMessage {
  type: "error" | "success" | "warning";
  description: string;
}


const Feed: React.FC = () => {
  const imagelink =
    "https://img.ibxk.com.br/2020/01/30/30021141299110.jpg?w=1120&h=420&mode=crop&scale=both";
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState<IFeedbackMessage>({
    type: "error",
    description: "",
  });
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <>
      <MenuDrawer arrowBack="/" appbarTitle="Feed" />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={feedbackMessage.type}>
          {feedbackMessage.description}
        </Alert>
      </Snackbar>
      <div className="main">
        <div className="post-card">
          <div className="post-top">
            <img
              src={imagemPerfil}
              alt="imagemPerfil"
              className="post-image-profile"
            />
            <div className="name-title">
              <h6>Pedro Kirstein</h6>
              <p>CWB</p>
            </div>
          </div>
          <div className="post-image">
            <img src={imagelink} />
          </div>
          <div className="post-footer">
            <p className='post-description'>Q legal sa bosta fiandgibsdnijbnsinj n ojdngsdninsidnviusndi dodfnsjndgijsndj nfdjdnfusdn asdasdsad sadsadsadsad asdsadsadasdsadsa dsadasdsadasdas </p>
            <Chip avatar={<BiLike size={30} color={"#4343d0"} />} label="360 Likes" onClick={() =>{}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
