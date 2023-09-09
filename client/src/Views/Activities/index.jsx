import { useState, useEffect, useRef } from "react";
import ActivityBar from "../../Components/ActivityBar";
import ActivityCard from "../../Components/ActivityCards";
import Pagination from "../../Components/Pagination";
import Modal from "../../Components/Modal";
import Loader from "../../Components/Loader";
import MiniLoader from "../../Components/MiniLoader";
import axios from "axios";
import style from "./index.module.css";

export default function Activities() {
  const PageSize = 6;
  const [backActivities, setBackActivities] = useState("");
  const [activities, setActivities] = useState("");
  const [currentActivities, setCurrentActivities] = useState("");
  const [showPagination, setShowPagination] = useState(false);



  // Lógica de carga de actividades y Mensages

  const [searching, setSearching] = useState(true);
  const [message, setMessage] = useState(true);
 
  const URL = "http://localhost:3001/activities";

  useEffect(() => {
    axios
      .get(URL)
      .then(({ data }) => {
        
        setBackActivities(data);
        setActivities(data);
        setSearching(false);
        setMessage('')

        if(data.length === 0){
          setSearching(false);
          setMessage('Ups, aún no hay actividades para mostrar...')
        }
      })
      .catch((error) => {
      if (error.response) {
        // El servidor respondió con un código distinto de 2xx
        { 
          setSearching(false);
          setMessage('Lo sentimos, parece que tenemos problemas técnicos. Contacta a soporte si el problema continúa.')
        }
      } else if (error.request) {
        // No se recibió respuesta del servidor o No hay internet
        setSearching(false);
        setMessage('No se pudieron cargar las actividades. Por favor, verifica tu conexión a Internet y, si el problema persiste, es posible que haya problemas nuestro servidor.')
      }} );
  }, []);

  //Pagianción

  const totalItems = activities ? activities.length : 0;
  const totalPages = totalItems ? Math.ceil(totalItems / PageSize) : 1;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrentActivities(
      activities && activities.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, activities]);

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  //Control del Modal y Loader
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModaMessage] = useState("");
  const [inLoanding, setIsLoading] = useState(false);
  const [modalOption, setModalOption] = useState(false);
  const [activityForDelete, setActivityForDelete] = useState()
  const handleOptionRef = useRef(false);


  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalOption = (option) => {
    handleOptionRef.current = option;
  };

//Handler para modal de confirmación antes de eliminar una actividad

const handleDeleteConfirmation = (id, name)=>{

  setModalType('alert')
  setModalTitle('ALERT')
  setModaMessage(`¿Estas seguro/a que quieres eliminar la actividad ${name}?`)
  setModalOption(true)
  setModalOpen(true)
  setActivityForDelete(id)
}


//Handler para eliminar la actividad

const handleDeleteAcitivty = async () => {

  setIsLoading(true)
  const URL = "http://localhost:3001/activities";
  const data = { id : activityForDelete }

  try {
    const response = await axios.delete(
      URL, { data }, {timeout: 10000}
    );

    if (response.status === 200) {

      const newActivities = activities.filter(
        (activity) => activity.id !== activityForDelete
      );
      setBackActivities(newActivities);
      setActivities(newActivities);
      setCurrentActivities(newActivities);


      // Si ya no quedana actividades muestros mensaje
      if(newActivities.length === 0){
        setSearching(false);
        setMessage('Ups, aún no hay actividades para mostrar...')
      }

      //Lógica de Modal y cancelación de Loader
      setIsLoading(false)
      setModalType('success')
      setModalTitle('EXCELENTE')
      setModaMessage('¡La actividad fue eliminada con éxito!')
      setModalOption(false)
      setModalOpen(true)
    } 

  } catch (error) {
    if (error.response)  {
      // Manejar la falta de conexión a Internet u otros errores de red
        setIsLoading(false)
        setModalOption(false)
        setModalOpen(true)
        setModalType('error')
        setModalTitle('ERROR')
        setModaMessage('Lo sentimos, parece que hay un problema técnico en nuestra plataforma. Por favor, contacta a nuestro equipo de soporte técnico para obtener ayuda')
    } else if (error.request) {
      // Manejar otros tipos de errores, como problemas del servidor
        setIsLoading(false)
        setModalOption(false)
        setModalOpen(true)
        setModalType('error')
        setModalTitle('ERROR')
        setModaMessage('No se pudo eliminar la actividad. Por favor, verifica tu conexión a Internet y, si el problema persiste, es posible que haya problemas con nuestro servidor.')
    }
  }



};


// Si el usuario confirma que quiere eliminar una actividad borramos la actividad

useEffect(()=>{
  
  if(handleOptionRef.current) {
    async function deleteActivity(){
      await handleDeleteAcitivty();
      handleOptionRef.current = false;
    }
    deleteActivity()
}
}, [handleOptionRef.current])



  return (
    <div className={style.activityContainer}>
      
      {(inLoanding) ? <Loader/> : undefined}
    <Modal    modalOpen={modalOpen} onClose={handleCloseModal} title={modalTitle} type={modalType}   content={modalMessage} options={modalOption} handleOptions={(modalOption) ? handleModalOption : undefined}  />
      <h1>Tus Actividades</h1>
      <ActivityBar
        backActivities={backActivities}
        setActivities={setActivities}
        resetCurrentPage={setCurrentPage}
      />
      {searching ? <p>Buscando Actividades...</p> : null}
      {(searching)? <MiniLoader /> : undefined}
      {(message)? <p>{message}</p> : undefined}
      <div
        className={style.cardsContainer}
        onMouseEnter={() => setShowPagination(true)}
        onMouseLeave={() => setShowPagination(false)}
      >
      
        {currentActivities &&
          currentActivities.map((a) => (
            <div className={style.cardWrapper}>
            <ActivityCard
              key={a.id}
              id={a.id}
              name={a.name}
              description={a.description}
              countries={a.Countries}
              season={a.season}
              duration={a.duration}
              difficulty={a.difficulty}
              emoji={a.emoji}
              handleDeleteConfirmation={handleDeleteConfirmation}
            /> </div>
          ))}
        <div
          className={
            (showPagination && currentActivities.length > 6)
              ? style.showPaginationContainer
              : style.paginationContainer
          }
        >
          <Pagination
            onPrevious={onPrevious}
            onNext={onNext}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
      
    </div>
  );
}
