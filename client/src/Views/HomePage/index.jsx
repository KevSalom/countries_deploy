import CountryBar from "../../Components/CountryBar";
import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryCards from "../../Components/CountryCards";
import { getCountries} from "../../redux/action";
import Pagination from "../../Components/Pagination";
import style from "./index.module.css";
import MiniLoader from "../../Components/MiniLoader";


export default function HomePage() {
  const [searching, setSearching] = useState(true);
  const [message, setMessage] = useState('Buscando países...');
  const countries = useSelector((state) => state.currentCountries);

  const [countriesData, setCountriesData] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);
  const [infoCards, setInfoCards] = useState("");
  const dispatch = useDispatch();

  const PageSize = 10;
  const totalItems = countries ? countries.length : 0;
  const totalPages = totalItems ? Math.ceil(totalItems / PageSize) : 1;


  useEffect(() => {
        dispatch(getCountries()).then(() => {
          setSearching(false);
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
        })
  }, []);

  useEffect(()=>{
    if(countries.length === 0 && !searching){
      setMessage('Ups, no hay países para mostrar...')
    } else if((countries.length === 0 && searching )){
      setMessage('Buscando Países...')
    } else{
      setMessage('')
    }
  },[countries])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCountriesData(
      countries && countries.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, countries]);

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
      />
      {message ? <p>{message}</p> : undefined}
      {searching ? <MiniLoader /> : undefined}
      

      <div
        className={style.cardsContainer}
        onMouseEnter={() => setShowPagination(true)}
        onMouseLeave={() => setShowPagination(false)}
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
                ? `👫 ${p.population}`
                : `🌎 ${p.area}`;

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
            showPagination && countries.length > 6
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
