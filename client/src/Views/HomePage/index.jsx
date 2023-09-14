import CountryBar from "../../Components/CountryBar";
import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryCards from "../../Components/CountryCards";
import { getCountries, updCurrentCountries} from "../../redux/action";
import Pagination from "../../Components/Pagination";
import style from "./index.module.css";
import MiniLoader from "../../Components/MiniLoader";


export default function HomePage({firstUpdate}) {

  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const countries = useSelector((state) => state.currentCountries);
  const [aux, setAux] = useState(true)

  //Estados para el control de mensajes y loader
  const [searching, setSearching] = useState(true);
  const [message, setMessage] = useState('Buscando países...');


  //Para renderizar en las tarjetas Actividad, Población o área segun el orden seleccioinado.
  const [infoCards, setInfoCards] = useState(""); 


  //Estados necesarios para el control del componente de paginación
  const PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = countries ? countries.length : 0;
  const totalPages = totalItems ? Math.ceil(totalItems / PageSize) : 1;

  //Estado que se usara para renderizar las tarjetas
  const [countriesData, setCountriesData] = useState('');


  //Para la cargar de paises y llenar el estado de redux
  useEffect(() => {
       
    if(countries.length === 0){
      dispatch(getCountries()).then(() => {
          setSearching(false);
          setAux(!aux)
          }).catch((error) => {
          if (error.response) {
            // El servidor respondió con un código distinto de 2xx
              setSearching(false);
              setMessage(
                "Lo sentimos, parece que tenemos problemas técnicos. Contacta a soporte si el problema continúa."
              );
          } else if (error.request) {
            // No se recibió respuesta del servidor o No hay internet
            setSearching(false);
            setMessage(
              "No se pudieron cargar los países. Por favor, verifica tu conexión a Internet y, si el problema persiste, es posible que haya problemas nuestro servidor."
            );
          }
        })}
        
  }, []);

  useEffect(()=>{

    if(allCountries.length > 0 && allCountries.length !== countries.length && firstUpdate.current){
      console.log('entreeeeeeeee')
      dispatch(updCurrentCountries(allCountries))
    firstUpdate.current = false;  }
  }, [allCountries])


  //Para controlar el mensaje mostrado
  useEffect(()=>{
    if(countries.length === 0 && !searching){
      setMessage('Ups, no hay países para mostrar o que coincidan con el filtrado indicado...')
    } else if((countries.length === 0 && searching )){
      setMessage('Buscando Países...')
    } else{
      setMessage('');
      setSearching(false);
    }
  },[countries])


  //Se cálcula la paginación
  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCountriesData(
      countries && countries.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, countries, aux]);

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };


  return (
    <div className={style.homeContainer}>
      <h1>Explora Nuevos Países</h1>

      <CountryBar
        setMessage={setMessage}
        resetCurrentPage={setCurrentPage}
        setInfoCards={setInfoCards}
        setAux={setAux} 
        aux={aux}
      />
      {message ? <p>{message}</p> : undefined}
      {searching ? <MiniLoader /> : undefined}
      

      <div
        className={style.cardsContainer}
      >
        {!searching &&
          countries &&
          countriesData.map((p) => {
            // Se manipula la información para enviar a CountryCards unicamente lo que se quiere renderizar segun el filtro e incluir los respectivos emojis
            const info =
              !infoCards ||
              infoCards === "totalActivities" ||
              infoCards === "name"
                ? ` 🛍️ ${p.totalActivities} Actividades`
                : infoCards === "population"
                ? `👫 ${p.population.toLocaleString('en-US')} habs`
                : `🌎 ${p.area.toLocaleString('en-US')} Km2`;

            return (
              <CountryCards
                key={p.id}
                id={p.id}
                name={p.name}
                capital={p.capital}
                info={info}
                flag={p.flag}
              />
            );
          })}
        <div
          className={
            countries.length > 6
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
