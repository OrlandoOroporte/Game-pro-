import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login  = () => {
  let initialState = {
    email: "",
    password: "",
  };

  let navigate = useNavigate();
  
  const {actions } = useContext(Context);
  const [userLogin, setUserLogin] = useState(initialState);
  const handleChange = ({ target }) => {
    setUserLogin({
      ...userLogin,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(userLogin.email.trim() != "" && userLogin.password.trim() != ""){
      let resposnse = await actions.login(userLogin);
      if (resposnse){
        navigate("/worksheet")
      }
      else{
        Swal.fire(
          'Datos invalidos',
          'Intentelos de Nuevo',
          'error'
        )
      }
    }
    else{
      Swal.fire(
        'Todos los campos son necesarios',
        '',
        'info'
      )
    }
  }

  return (
    <>
      <div id="contenedor">
        <div id="contenedorcentrado">
          <div id="login">
            <form onSubmit={handleSubmit}>
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                id="usuario"
                type="email"
                name="email"
                placeholder=""
                onChange={handleChange}
                value={userLogin.email}
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder=""
                name="password"
                onChange={handleChange}
                value={userLogin.password}
              />

              <button type="submit" title="Ingresar" name="Ingresar">
                Login
              </button>
            </form>
          </div>
          <div id="derecho">
            <div className="titulo">Bienvenido</div>
            <hr />
            <div className="pie-form">
              <a href="/register">¿No tienes Cuenta? Registrate</a>
              <hr />
              <a href="/">« Volver</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};