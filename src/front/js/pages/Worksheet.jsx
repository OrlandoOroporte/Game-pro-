import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { List } from "./List.jsx";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Worksheet = () => {
  const { store } = useContext(Context);
  let game = store.game;
  return (
    <>
      <div className="container-fluid">
      {game.map((game) => {
                  return <List key={game.id} name={game.name} precio={game.precio} descripcion={game.descripcion} id={game.id} cantidad={game.cantidad}/>;
                })}
    

        <div className="d-grid gap-2 col-6 mx-auto">
          <Link className="btn btn-outline-success mb-3" to="/gameregister">
            Agregar Juego
          </Link>
        </div>
      </div>
    </>
  );
};
