import React from "react";

export const Card = (props) => { 
  return (
    <>
      <div className="blog-card">
        <img className="blog-card-img" src={props.image}></img>
        <div className="card-info">
        {props.name}

        </div>
        <div className="utility-info">
          <ul className="utility-list">
            <li>
            <i className="fa-regular fa-money-bill-1 fa-x10"></i>
              <a href="#">     {props.precio}</a>
            </li>
            <li>
            <i className="fa-solid fa-icons fa-x5"></i>
              <a href="#">   {props.descripcion} </a>
            </li>
            <li>
            <i class="fa-solid fa-tags"></i>
              <a href="#">   {props.cantidad} </a>
            </li>
          </ul>
        </div>
        <div className="gradient-overlay"></div>
        <div className="color-overlay"></div>
      </div>
    </>
  );
};
