import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const GameRegister = () => {
  let navigate = useNavigate();
  let initialState = {
    image: "",
    name: "",
    precio: "",
    descripcion: "",
    cantidad: "",
  };

  const [gameRegisters, setGameRegister] = useState(initialState);
  const { actions, store } = useContext(Context);
  const handleChange = (event) => {
    setGameRegister({
      ...gameRegisters,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    event.preventDefault();
    if (
      gameRegisters.image.trim() != "" &&
      gameRegisters.name.trim() != "" &&
      gameRegisters.precio.trim() != "" &&
      gameRegisters.descripcion.trim() != "" &&
      gameRegisters.cantidad.trim() != ""
    ) {
      let response = await actions.gameRegister(gameRegisters);
      if (response) {
        setGameRegister({ initialState });
        Swal.fire(
          "¡Bien Hecho!",
          "¡Se ha creado el servicio con exito!",
          "success"
        );
          actions.getGame();
          navigate("/worksheet");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Ocurrio un error al crear el servicio!"
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Todos los campos son necesarios!",
      });
    }
  };

  return (
    <>
      <div className="container reg-game">
        <div className="flex-container">
          <div className="row full">
            <div className="col-md-12">
              <div className="form-container">
                <div className="form-container-in"></div>
                <div className="row">
                  <div className="left-divider"></div>
                  <div className="col-md-6">
                    <form action="">
                      <div className="form-group">
                        <label htmlFor="fname">Imagen :</label>
                        <input
                          id="fname"
                          type="text"
                          className="form-control"
                          name="image"
                          onChange={handleChange}
                          value={gameRegisters.image}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fname">Nombre :</label>
                        <input
                          id="fname"
                          type="text"
                          className="form-control"
                          name="name"
                          value={gameRegisters.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fname">Precio :</label>
                        <input
                          id="fname"
                          type="text"
                          className="form-control"
                          name="precio"
                          value={gameRegisters.precio}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fname">Descripcion :</label>
                        <input
                          id="fname"
                          type="text"
                          className="form-control"
                          name="descripcion"
                          value={gameRegisters.descripcion}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fname">Cantidad :</label>
                        <input
                          id="fname"
                          type="text"
                          className="form-control"
                          name="cantidad"
                          value={gameRegisters.cantidad}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          value="submit"
                          className="btn btn-outline-success button-reg"
                          onClick={() => handleSubmit()}
                        >
                          Registrar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
