import React, { useContext} from "react";
import { Context } from "../store/appContext";
import { Card } from "./Card.jsx";
export const Home = () => {
  const { store } = useContext(Context);
  let game = store.game;
  return (
    <>
    <div className="slider">
			   <div className="div-ul">

         <ul className="slider-ul">
          
			   	<li className="slider-li" >{game.map((game) => {
                  return <Card key={game.id} image={game.image} name={game.name} precio={game.precio} descripcion={game.descripcion} cantidad={game.cantidad}/>;
                })}</li>
			   </ul>
         </div>
			   </div>
    
    </>
  );
};
