import {useEffect,useState } from "react" 
import { appsettings } from "../settings/appsettings"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Container,Row,Col,Table,Button} from "reactstrap"



export function Lista(){
    const[empleados,setEmpleados] = useState<IEmpleado[]>([]);

    //listar los empleados
    const obtenerEmpleados=async()=>{
        const response = await fetch(`${appsettings.apiUrl}Empleado/Lista`)
        if(response.ok){
            const data = await response.json();
            setEmpleados(data);
        }
    }

    useEffect(()=>{
        obtenerEmpleados()

    },[])

  
    //aliminar los empleados
    const Eliminar=(id:number)=>{
        Swal.fire({
            title:"estas seguro?",
            text:"eliminar empleado",
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:"#3085d6",
            cancelButtonColor:"#d33",
            confirmButtonText:"si,eliminar"
        }).then(async(result)=>{
            if(result.isConfirmed){
                const response=await fetch(`${appsettings.apiUrl}Empleado/Eliminar/${id}`,{method:"DELETE"})
                if(response.ok)await obtenerEmpleados()
            }

        });
    }

    //diseño
    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                   <h4>Lista de Empleados</h4>
                   <hr />
                   <Link className="btn btn-success mb-3" to="/nuevoempleado">Nuevo Empleado</Link>
                   <Table bordered>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Puesto</th>
                            <th>CI</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            empleados.map((item)=>(
                            <tr key={item.idEmpleado}>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.correo}</td>
                                <td>{item.puesto}</td>
                                <td>{item.ci}</td>
                                <td>
                                    <Link className="btn btn-primary mb-3" to={`/editarempleado/${item.idEmpleado}`}>EDITAR</Link>

                                    <Button color="danger" onClick={()=>{Eliminar(item.idEmpleado!)}}>ELIMINAR</Button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                   </Table>
                </Col>
            </Row>
        </Container>
    )
}