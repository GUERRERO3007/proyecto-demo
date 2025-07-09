import { ChangeEvent,useState } from "react" 
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Container,Row,Col,Form,FormGroup,Label,Input,Button} from "reactstrap"


const initialEmpleado={
    nombre:"",
    apellido:"",
    correo:"",
    puesto:"",
    ci:0
}

export function NuevoEmpleado(){

    const[empleado,setEmpleado]=useState<IEmpleado>(initialEmpleado);
    const navigate=useNavigate();

    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName=event.target.name;
        const inputValue=event.target.value;
        console.log(inputName,":",inputValue) //mostrar por cada letra que se escriva en el text

        setEmpleado({...empleado,[inputName]:inputValue})
    }


    //funcion para retroceder de pagina
    const volver =()=>{
        navigate("/")
    }


    //funcion para poder guardar los datos ingresados a nuetsra api
    const guardar = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Empleado/Nuevo`,{
            method:'POST',
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
            text:"No se pudo guaradr el empleado",
            icon:"warning"
        });
    }
        
    }


    //DISEÑO
    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                <h4>
                    Nuevo Empleado
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