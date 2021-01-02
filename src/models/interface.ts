export interface ILogin {
  data: {
    user : {
      id: string;
      name: string;
      perfil_image: string;
      email: string;
      follow: string;
    }
    token: string;
  }
}

export interface IRegister {
  data: {
    user : {
      id: string;
      name: string;
      perfil_image: string;
      email: string;
      follow: string;
    }
  }
}