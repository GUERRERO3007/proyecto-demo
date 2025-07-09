import { useState } from "react";
import { ILogin } from "../Interfaces/ILogin";
import Swal from "sweetalert2";
import { appsettings } from "../settings/appsettings";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const [formData, setFormData] = useState<ILogin>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      Swal.fire("Campos vacíos", "Completa todos los campos", "warning");
      return;
    }

    const response = await fetch(`${appsettings.apiUrl}Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      Swal.fire("Error", "Usuario o contraseña incorrecta", "error");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center mb-4">Iniciar Sesión</h3>
      <div className="form-group mb-3">
        <label>Usuario</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
        Ingresar
      </button>

      {/* Enlace para ir a la página de registro */}
      <p className="text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-decoration-none">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
