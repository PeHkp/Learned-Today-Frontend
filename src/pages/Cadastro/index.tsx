import React, { useState, FormEvent, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
// import { FiArrowLeft } from "react-icons/fi";
import Dropzone from "../../components/Dropzone";


import MenuDrawer from "../../components/MenuDrawer";

import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import "./styles.css";

import api from "../../services/api";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
interface IFeedbackMessage {
  type: "error" | "success" | "warning" ;
  description: string;
}

function Cadastro() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formValid, setFormValid] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState<IFeedbackMessage>({
    type: "error",
    description: "", 
  })

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();

    if (validationFields()) {

      if (password !== confirmPassword) {
        setFeedbackMessage({
          type: "warning",
          description: "As senhas não são correspondentes!"
        })
        setOpenSnackBar(true)
        return;
      }
      data.append("name",name)
      data.append("email",email)
      data.append("password",password)
      if (selectedFile) {
        data.append("perfil_image",selectedFile)
      }
      try {
        await api.post('users',data)

        setFeedbackMessage({
          type: "success",
          description: 'Usuario cadastrado com sucesso!'
        })

      } catch (error) {
        setFeedbackMessage({
          type: "error",
          description: error.response.data.message
        })
      } finally {
        setOpenSnackBar(true)
      }
    }
  }

  function validationFields() {
    if (name && email && password && confirmPassword && selectedFile) {
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
     <MenuDrawer arrowBack='/' appbarTitle="Cadastro"/>
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={feedbackMessage.type}>
          {feedbackMessage.description}
        </Alert>
      </Snackbar>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="inputs-body-cadastro">
          <TextField
              error={formValid === false && email === '' ? true : false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nome"
              type="text"
            />
            <TextField
              error={formValid === false && email === '' ? true : false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
            />
            <TextField
              error={formValid === false && password === '' ? true : false}
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <TextField
              error={formValid === false && password === '' ? true : false}
              label="Corfirme sua senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Dropzone onFileUploaded={setSelectedFile} />
            <button className="button-form" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
        <Link to="/" className="link-button-cadastro">
          Já tenho conta!
        </Link>
      </div>
    </>
  );
}

export default Cadastro;
