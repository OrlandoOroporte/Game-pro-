import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Register = () => {
  let initialState = {
    email: "",
    password: "",
    verify: "",
  };

  let navigate = useNavigate();

  const { actions, store } = useContext(Context);
  const [userRegister, setUserRegister] = useState(initialState);

  const handleChange = ({ target }) => {
    setUserRegister({
      ...userRegister,
      [target.name]: target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userRegister.email.trim() == "" ||
    userRegister.password.trim() == "" ||
    userRegister.verify.trim() == ""){
      Swal.fire("Todos los campos son necesarios","", "info");
    }
    else if (
      userRegister.email.trim() != "" &&
      userRegister.password.trim() != "" &&
      userRegister.verify.trim() != store.verify
      ) {
        Swal.fire("Verificador incorrecto","Solicitelo al administrador", "info");
      }
    else if (
        userRegister.email.trim() != "" &&
        userRegister.password.trim() != "" &&
        userRegister.verify.trim() == store.verify
        ){
        let response = await actions.userRegister(userRegister);
        if (response) {
          setUserRegister({ initialState });
          Swal.fire("Ha sido registrado con exito", "A continuacion inicie sesion", "success");
          navigate("/login");
        } else {
        Swal.fire("No pudo ser registrado", "Intentelo de Nuevo", "error");
        }
    }   
  };

  return (
    <>
      <div id="contenedor">
        <div id="contenedorcentrado">
          <div id="login">
            <form>
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                id="usuario"
                type="email"
                name="email"
                onChange={handleChange}
                value={userRegister.email}
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder=""
                name="password"
                onChange={handleChange}
                value={userRegister.password}
              />
              <label htmlFor="password">Verify</label>
              <input
                id="verify"
                type="verify"
                placeholder=""
                name="verify"
                onChange={handleChange}
                value={userRegister.verify}
              />

              <button
                type="submit"
                title="Ingresar"
                name="Ingresar"
                onClick={handleSubmit}
              >
                Register
              </button>
            </form>
          </div>
          <div id="derecho">
            <div className="titulo">Welcome</div>
            <hr />
            <div className="pie-form">
              <a href="/login">do you already have an account? Login</a>
              <hr />
              <a href="/">« Back </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
