import ActivityForm from '../../Components/ActivityForm'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getCountries, getActivities  } from "../../redux/action";
import Modal from "../../Components/Modal"
import Loader from "../../Components/Loader"
import axios from 'axios'
import style from './index.module.css'


export default function CreateActivity() {

const countriesFromRedux = useSelector(state => state.allCountries);
const dispatch = useDispatch()

const URL = "/countries";

  useEffect(() => {
    if(countriesFromRedux.length === 0){
      axios
      .get(URL)
      .then(({ data }) => {
        dispatch(getCountries(data));
      }).catch((error) => console.log(error));
    }
  }, []);



  //Control del Modal y Loader
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModaMessage] = useState('')
  const [inLoanding, setIsLoading] = useState(false)


  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (data) => {
    setIsLoading(true)

    try {
      const URL = '/activities';
      const response = await axios.post(URL, data);
      
      if(response.status === 201){
        await dispatch(getActivities()); //Actualizar el estado de actividades con la nueva información
        await dispatch(getCountries()) ;//Actualizar el estado de paises con la nueva información
        setIsLoading(false)
        setModalOpen(true)
        setModalType('success')
        setModalTitle('EXCELENTE')
        setModaMessage('¡Actividad Creada con éxito!')
        
        return true
      } 
      
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código distinto de 2xx
        if(error.response.data.error === "Verifica los datos"){
      
        setIsLoading(false)
        setModalOpen(true)
        setModalType('error')
        setModalTitle('ERROR')
        setModaMessage('Lo sentimos, parece que hay un problema técnico en nuestra plataforma. Por favor, contacta a nuestro equipo de soporte técnico para obtener ayuda')
        return false
        } else { 
        setIsLoading(false)
        setModalOpen(true)
        setModalType('error')
        setModalTitle('ERROR')
        setModaMessage(error.response.data.error)
        return false
        }
      } else if (error.request) {
        // No se recibió respuesta del servidor o No hay internet
        setIsLoading(false)
        setModalOpen(true)
        setModalType('error')
        setModalTitle('ERROR')
        setModaMessage('No se pudo enviar el formulario. Por favor, verifica tu conexión a Internet y, si el problema persiste, es posible que haya problemas con nuestro servidor.')
        return false
      } 
    
    }}

  return ( 
    <div className={style.createContainer}>
    <h1>Crea Tu Nueva Actividad</h1>
    <div>
    {(inLoanding) ? <Loader/> : undefined}
    <Modal    modalOpen={modalOpen} onClose={handleCloseModal} title={modalTitle} type={modalType}   content={modalMessage} />
    {countriesFromRedux.length > 0 ? <ActivityForm handleSubmit={handleSubmit}/> : undefined}
    </div>
    </div>
  )
}