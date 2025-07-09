import { ChangeEvent,use,useEffect,useState } from "react" 
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Container,Row,Col,Form,FormGroup,Label,Input,Button} from "reactstrap"


const initialEmpleado={
    idEmpleado:0,
    nombre:"",
    apellido:"",
    correo:"",
    puesto:"",
    ci:0
}

export function EditarEmpleado(){

    const{id} = useParams<{id:string}>()
    const[empleado,setEmpleado] = useState<IEmpleado>(initialEmpleado)
    const navigate = useNavigate()

    useEffect(()=>{
        const obtenerEmpleado=async()=>{
            const response = await fetch(`${appsettings.apiUrl}Empleado/Optener/${id}`)
            if(response.ok){
                const data = await response.json();
                setEmpleado(data);
            }
        }
        obtenerEmpleado()
    },[])

    //para poder actualizar el empleado
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName=event.target.name;
        const inputValue=event.target.value;

        setEmpleado({...empleado,[inputName]:inputValue})
    }


    //funcion para poder guardar los datos ingresados a nuetsra api
        const guardar = async()=>{
            const response = await fetch(`${appsettings.apiUrl}Empleado/Editar`,{
                method:'PUT',
                headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(empleado)
        })
        if (response.ok){
            navigate("/")
        }else{
            Swal.fire({
                title:"Error!",
                text:"No se pudo Editar el empleado",
                icon:"warning"
            });
        }     
    }
    //funcion para retroceder de pagina
    const volver =()=>{
        navigate("/")
    }

    //diseño
    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                <h4>
                    Editar Empleado
                </h4>
                <hr />
                <form>
                    <FormGroup>
                        <label>Nombre</label>
                        <input type="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre} />
                    </FormGroup>

                    <FormGroup>
                        <label>Apellido</label>
                        <input type="text" name="apellido" onChange={inputChangeValue} value={empleado.apellido} />
                    </FormGroup>

                    <FormGroup>
                        <label>Correo</label>
                        <input type="text" name="correo" onChange={inputChangeValue} value={empleado.correo} />
                    </FormGroup>

                    <FormGroup>
                        <label>Puesto</label>
                        <input type="text" name="puesto" onChange={inputChangeValue} value={empleado.puesto} />
                    </FormGroup>

                    <FormGroup>
                        <label>CI</label>
                        <input type="number" name="ci" onChange={inputChangeValue} value={empleado.ci} />
                    </FormGroup>

                </form>


                <button color="primary" className="me-4" onClick={guardar}>GUARDAR</button>
                <button color="secondary" onClick={volver}>VOLVER</button>


                </Col>
            </Row>

        </Container>
    )
}