import React, { Component } from "react";

export const Footer = () => (
<>
	<footer className="site-footer">
	<div className="container">
	  <div className="row">
		<div className="col-sm-12 col-md-6">
		  <h6>Sobre nosotros</h6>
		  <p className="text-justify">
			Todos los juegos que necitas lo encuentras aqui.
		  </p>
		</div>

		<div className="col-xs-6 col-md-3">
		  <h6>Categorias</h6>
		  <ul className="footer-links">
			<li>
			  Arcade
			</li>
			<li>
			  Disparos 
			</li>
			<li>
			  Roles 
			</li>
			<li>
			  explorer 
			</li>
		  </ul>
		</div>

		<div className="col-xs-6 col-md-3">
		  <h6>Autores</h6>
		  <ul className="footer-links">
			<li>
			  <a href="https://github.com/OrlandoOroporte">Orlando Oroporte</a>
			</li>
		  </ul>
		</div>
	  </div>
	  <hr />
	</div>
	<div className="container">
	  <div className="row">
		<div className="col-md-4 col-sm-6 col-xs-12">
		  <ul className="social-icons">
			<li>
			  <a className="facebook" href="#">
				<i className="fa fa-facebook"></i>
			  </a>
			</li>
			<li>
			  <a className="twitter" href="#">
				<i className="fa fa-twitter"></i>
			  </a>
			</li>
			<li>
			  <a className="dribbble" href="#">
				<i className="fa fa-dribbble"></i>
			  </a>
			</li>
		  </ul>
		</div>
	  </div>
	</div>
  </footer>
</>
);
