import React, { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay un token en localStorage al cargar la página
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const { token } = data;

        localStorage.setItem("token", token);
        setMessage("Inicio de sesión exitoso");
        setIsLoggedIn(true);
      } else {
        setMessage("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } catch (error) {
      setMessage("Error en la solicitud al servidor.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMessage("Sesión cerrada exitosamente");
    setEmail("");
    setPassword("");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-25 text-center">
          <div className="card-body d-flex flex-column align-items-center">
            <a href="http://localhost:5173/matches" className="btn btn-primary mb-2 w-50">Editar Partidos</a>
            <button className="btn btn-danger mb-2 w-50" onClick={handleLogout}>Cerrar Sesión</button>
            {message && <p className="mb-0">{message}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 text-center w-25 ">
        <h4>Iniciar Sesión como ADMIN</h4>
        <form onSubmit={handleLogin}>
          <div className="mt-4 d-flex justify-content-between">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100 mt-4" type="submit">Iniciar Sesión</button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default Login;