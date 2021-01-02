import React, { useState, FormEvent ,SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import MenuDrawer from "../../components/MenuDrawer";

import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import "./styles.css";
import imagemGrande from "../../assets/heroes.png";

import api from "../../services/api";

import {
  ILogin,
} from "../../models/interface";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
interface IFeedbackMessage {
  type: "error" | "success";
  description: string;
}
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formValid, setFormValid] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState<IFeedbackMessage>({
    type: "error",
    description: "", 
  })

  const history = useHistory();

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (validationFields()) {
      try {
        const user: ILogin = await api.post("sessions", {
          email,
          password,
        });
        
        localStorage.setItem("token", user.data.token);

        history.push("feed");
      } catch (error) {
        
        setFeedbackMessage({
          type: "error",
          description: error.response.data.message
        })
        setOpenSnackBar(true)
        return;
      }
    }
  }

  function validationFields() {
    if (email && password !== "") {
      return true;
    } else {
      setFeedbackMessage({
        type: "error",
        description: "Preencha todos os campos!"
      })
      setFormValid(false)
      setOpenSnackBar(true)
      return false;
    }
  }

  return (
    <>
    <MenuDrawer arrowBack={""} appbarTitle={'Learning Today'}/>
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={feedbackMessage.type}>
          {feedbackMessage.description}
        </Alert>
      </Snackbar>
      <div className="main">
        <img src={imagemGrande} alt="Learning Today" className="login-image"/>
        <form onSubmit={handleLogin}>
          <div className="inputs-body-login">
            <TextField
              error={formValid === false && email === '' ? true : false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="text"
            />
            <TextField
              error={formValid === false && password === '' ? true : false}
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="button-form" type="submit">
              Entrar
            </button>
          </div>
        </form>
        <Link to="/cadastro" className="link-button-login">
          Cadastrar-se
        </Link>
      </div>
      </>
  );
}

export default Login;
