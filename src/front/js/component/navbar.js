import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
<>
<nav className="navbar bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to='/'>Game Pro</Link>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    <Link className="btn btn-outline-success me-5" to='/login'>Admin</Link>
  </div>
</nav>
</>
	);
};
