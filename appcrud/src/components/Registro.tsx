import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";

export function Registro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Swal.fire("Error", "Completa todos los campos", "warning");
      return;
    }

    const response = await fetch(`${appsettings.apiUrl}Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      Swal.fire("Éxito", "Usuario creado, ya puedes iniciar sesión", "success");
      navigate("/login");
    } else {
      Swal.fire("Error", "No se pudo crear el usuario", "error");
    }
  };

  return (
    <div>
      <h3>Registro</h3>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}
