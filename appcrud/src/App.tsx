import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NuevoEmpleado } from "./components/NuevoEmpleado"
import { Lista } from "./components/Lista"
import { EditarEmpleado } from "./components/EditarEmpleado"

import { Login } from "./components/Login";
import { Registro } from "./components/Registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista/>}/>
        <Route path="/nuevoempleado" element={<NuevoEmpleado/>}/>
        <Route path="/editarempleado/:id" element={<EditarEmpleado/>}/>


        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
