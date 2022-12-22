import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const List = (props) => {
  const {actions } = useContext(Context)
  const handleDeleteGame = async (game) => {
    Swal.fire({
      title: "¿Estás seguro de eliminarlo?",
      text: "Esta acción no es reversible...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await actions.deleteGame(game);
        if (response) {
          Swal.fire(
            "¡Bien Hecho!",
            "¡Se ha eliminado el servicio con exito!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              actions.getGame();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Ocurrio un error al modificar el servicio!",
          });
        }
      }
    });
  };
  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 ">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <ul className="list-group list-group-horizontal ">
                  <li className="list-group-item list">{props.name}</li>
                  <li className="list-group-item list">{props.descripcion}</li>
                  <li className="list-group-item list">{props.precio}</li>
                  <li className="list-group-item list">{props.cantidad}</li>

                  <div className="col align-self-end text-end ">
                    <Link
                      className="link-icon"
                      to=""
                      onClick={() => handleDeleteGame(props.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </Link>
                    <Link className="link-icon" to="/gameregister">
                      <i className="fa-solid fa-file-invoice"></i>
                    </Link>
                    <Link className="link-icon" to="">
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                  </div>
                </ul>
              </li>
            </ul>
          <hr />
          </div>
        </div>
      </div>
    </>
  );
};

