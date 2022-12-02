import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark p-3"
      style={{ background: "#000" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="material-icons">assignment </i> NotesApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Create Note
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
