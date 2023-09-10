import CountryBar from "../../Components/CountryBar";
import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryCards from "../../Components/CountryCards";
import { getCountries } from "../../redux/action";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import style from "./index.module.css";

export default function HomePage() {
  const [searching, setSearching] = useState(true);
  const [message, setMessage] = useState(null);
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
    if(countries.length === 0){
        dispatch(getCountries()).then(setSearching(false)).catch((error) => console.log(error));
    }

  }, []);

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
        setSearching={setSearching}
        setMessage={setMessage}
        resetCurrentPage={setCurrentPage}
        setInfoCards={setInfoCards}
      />

      <div
        className={style.cardsContainer}
        onMouseEnter={() => setShowPagination(true)}
        onMouseLeave={() => setShowPagination(false)}
      >
        {searching ? <p>Buscando...</p> : null}
        {message ? <p>{message}</p> : null}
        {!searching &&
          countries &&
          countriesData.map((p) => {
            // Se manipula la información para enviar a CountryCards unicamente lo que se quiere renderizar e incluir los respectivos emojis
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
            showPagination
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
