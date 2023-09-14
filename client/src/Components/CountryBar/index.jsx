import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updCurrentCountries,
  filterByContinet,
  getActivities,
  getCountriesByActivity, sortCountriesByActivity, filterContinentAndActivity, filterSetup
} from "../../redux/action";
import Button from "../Button";
import DropDown from "../DropDown";
import axios from "axios";
import style from "./index.module.css";




export default function CountryBar({
  setMessage,
  resetCurrentPage,
  setInfoCards,
  aux,
  setAux
}) {


  const dispatch = useDispatch();

//Estados de Redux nenecarios para el filtrado
  const backFilter = {continentFilter: '', activityFilter:'', inputSearchBar:'', currentSort:''};
  const currentFilterSetup = useSelector((state) => state.currentFiltersSetUp);
  const countries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.allActivities);



//Estados para el control del componente DropDown de Continente y Tipo de Actividades
    const [dropDownValueContinent, setDropDownValueContinent] = useState((currentFilterSetup.continentFilter)?currentFilterSetup.continentFilter:'');
    const [dropDownValueActivity, setDropDownValueActivity] = useState((currentFilterSetup.activityFilter)?currentFilterSetup.activityFilter:'');
    const [continentBy, setContinentBy] = useState('');
    const [activityBy, setActibityBy] = useState('');



//Cargamos las actividades si no aun no lo estan
  useEffect(() => {
    if(activities.length === 0){
      dispatch(getActivities()).catch((error) => console.log(error))}
      
      //Para mantener el ordenamiento previo si venimos de otra vista
      setInfoCards((currentFilterSetup.currentSort)?currentFilterSetup.currentSort:'')
  }, []);



// Lógica del buscador
  const [searchTerm, setSearchTerm] = useState((currentFilterSetup.inputSearchBar)?currentFilterSetup.inputSearchBar:'');
  const debounceTimeoutRef = useRef(null); //Para controlar las peticiones a medida que el usuario escribe

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    dispatch(filterSetup({...currentFilterSetup, inputSearchBar:event.target.value}))
    resetCurrentPage(1);
  };

  //Para el control del buscador y los resultados que arroja
  useEffect(() => {
    if (searchTerm === '') {
      setMessage(null);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        dispatch(updCurrentCountries(countries))
      }
    } else {
  
    setContinentBy(null);
    setDropDownValueContinent("");

    setActibityBy(null);
    setDropDownValueActivity("");

    dispatch(filterSetup({...currentFilterSetup, continentFilter: '', activityFilter:''}))
    setMessage(null);
  
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      debounceTimeoutRef.current = setTimeout(() => {
        // Se ahce la petición a la API con el valor actual de searchTerm
        // y se actualiza el estado con los resultados de la búsqueda
        axios
          .get(`/countries?name=${searchTerm}`)
          .then(({ data }) => {
            
            dispatch(updCurrentCountries(data));
          })
          .catch(({ response }) => {
            dispatch(updCurrentCountries([]));
            setMessage(response.data.error);
          });
      }, 300);
    } // 300ms de retraso
  }, [searchTerm]);



  // Para responder a los cambios del dropdown de contintente
  useEffect(() => {
    function handleValue(continent) {
      setContinentBy(continent);
      dispatch(filterSetup({...currentFilterSetup, continentFilter:dropDownValueContinent}))
      if(activityBy && dropDownValueActivity){
        dispatch(filterContinentAndActivity(activityBy,continent))
        setAux(!aux)
        setSearchTerm("");
      } else if (!activityBy && !dropDownValueActivity){
        dispatch(filterByContinet(continent));
        setAux(!aux)
        setSearchTerm("");
      }
    }

    if (dropDownValueContinent === "África") {
      handleValue("Africa");
    } else if (dropDownValueContinent === "Europa") {
      handleValue("Europe");
    } else if (dropDownValueContinent === "Oceanía") {
      handleValue("Oceania");
    } else if (dropDownValueContinent === "América del Sur") {
      handleValue("South America");
    } else if (dropDownValueContinent === "América del Norte") {
      handleValue("North America");
    } else if (dropDownValueContinent === "Antártida") {
      handleValue("Antarctica");
    } else if (dropDownValueContinent === "Asia") {
      handleValue("Asia");
    } else if(dropDownValueContinent === "🧹 SIN FILTRO" || dropDownValueContinent === ""){
      if(activityBy){
        setContinentBy('');
        dispatch(filterSetup({...currentFilterSetup, continentFilter:''}))
        dispatch(getCountriesByActivity(dropDownValueActivity));
        setAux(!aux)
        setDropDownValueContinent('')
        setSearchTerm("");
      } else if(!activityBy && !searchTerm){
        setContinentBy('');
        setDropDownValueContinent('')
        dispatch(filterSetup({...currentFilterSetup, continentFilter:''}))
        dispatch(updCurrentCountries(countries));
        setAux(!aux)
        setSearchTerm("");
      }
     
    }
    setMessage(null);
    resetCurrentPage(1);
  }, [dropDownValueContinent]);

  

  // Para responder a los cambios del dropdown de tipo de actividad
  useEffect(() => {
    
    if (dropDownValueActivity !== "" && dropDownValueActivity !== "🧹 SIN FILTRO" && !continentBy && !dropDownValueContinent) {
     dispatch(getCountriesByActivity(dropDownValueActivity))
      setActibityBy(dropDownValueActivity);
      setMessage(null);
      setSearchTerm("");
      dispatch(filterSetup({...currentFilterSetup, activityFilter:dropDownValueActivity}))

    } else if (dropDownValueActivity !== "" && dropDownValueActivity !== "🧹 SIN FILTRO" && continentBy) {
      dispatch(filterContinentAndActivity(dropDownValueActivity,continentBy))
      setActibityBy(dropDownValueActivity);
      dispatch(filterSetup({...currentFilterSetup, activityFilter:dropDownValueActivity}))
    } else if(dropDownValueActivity === "🧹 SIN FILTRO" && continentBy){
      dispatch(filterByContinet(continentBy));
      setDropDownValueActivity("");
      setActibityBy('');
    } else if(dropDownValueActivity === "🧹 SIN FILTRO" && !continentBy ){
      dispatch(updCurrentCountries(countries));
      setDropDownValueActivity("");
      setActibityBy('');
      dispatch(filterSetup({...currentFilterSetup, activityFilter:''}))
    }

    setActibityBy(dropDownValueActivity); //Para asegurarnos de tomar las configuraciones previas si venimos de otra vista
    setAux(!aux)
    resetCurrentPage(1);
    
  }, [dropDownValueActivity]);

 
  //Lógica para ordenamientos 
  const handleSort = async (order, sort) => {
    
    // Si el usuario filtra por Tipo de Actividad hago los ordenamientos por redux ya que son pocos paises
    if(activityBy){
      dispatch(sortCountriesByActivity(order, sort))
      setAux(!aux)
      setInfoCards(order);
      dispatch(filterSetup({...currentFilterSetup, currentSort:order}))
      setSearchTerm("");
      setMessage(null);
      resetCurrentPage(1);
    }  else {
    // Si el usuario filtra por Continente o general, hago los ordenamientos por base de datos
      try {
      const URL = "/countries/sort";
      const querySort = sort ? `&sort=${"ASC"}` : `&sort=${"DESC"}`; //Para definir el orden que le pediré a la base de datos
      const queryContinent = continentBy ? `&continent=${continentBy}` : ""; //Para definir el contiente que le pediré a la base de datos

      const countriesDb = await axios.get(
        `${URL}?type=${order}${querySort}${queryContinent}`
      );
      setInfoCards(order);
      dispatch(filterSetup({...currentFilterSetup, currentSort:order}))
      dispatch(updCurrentCountries(countriesDb.data));
      setSearchTerm("");
      setMessage(null);
      resetCurrentPage(1);
    } catch (error) {
      console.log(error.message);
    }}
  };

  //Botón para limpiar los filtros y searchbar
  const cleanFilters = () => {
    setSearchTerm("");
    setContinentBy(null);
    setMessage(null);
    resetCurrentPage(1);
    setDropDownValueContinent("");
    setDropDownValueActivity("");
    dispatch(updCurrentCountries(countries));
    setActibityBy(null)
    dispatch(filterSetup(backFilter))
  };


  return (
    <div className={style.countryBarCointainer}>
      
      {/*Filtro por continente */}
      <div className={style.continetCointainer}>
        <DropDown
          options={[
            "África",
            "Europa",
            "Oceanía",
            "Asia",
            "América del Sur",
            "América del Norte",
            "Antártida",
            "🧹 SIN FILTRO"
          ]}
          dropDownValue={dropDownValueContinent}
          setDropDownValue={setDropDownValueContinent}
          defaultText={"🌐 Continentes"}
        />


        {/*Filtro por Tipo de actividad y Boton de Limpieza */}
        <div className={style.activityAndCleaner}>
          {activities.length > 0 && (
            <DropDown
              options={[...activities.map((a) => a.name), "🧹 SIN FILTRO"]}
              dropDownValue={dropDownValueActivity}
              setDropDownValue={setDropDownValueActivity}
              defaultText={"🛍️ Tipos de Actividades"}
            />
          )}

          <Button text={"🧹 LIMPIAR"} onclick={cleanFilters} />
        </div>
      </div>


      {/* Buscador */}
      <div className={style.search}>
        <label htmlFor="search">
        <span>🔍︎</span>
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Busca un país"
          />
        </label>
      </div>


      <div className={style.containerSort}>


        {/* Orden por población */}
        <div className={style.itemSort}>
          <Button
            text={"👫 Población"}
            onclick={() => handleSort("population")}
          />
          <Button
            text={<span>↑</span>}
            onclick={() => handleSort("population", true)}
          />
          <Button
            text={<span>↓</span>}
            onclick={() => handleSort("population", false)}
          />
        </div>


        {/* Orden por área */}
        <div className={style.itemSort}>
          <Button text={"🌎 Área"} onclick={() => handleSort("area")} />
          <Button
            text={<span>↑</span>}
            onclick={() => handleSort("area", true)}
          />
          <Button
            text={<span>↓</span>}
            onclick={() => handleSort("area", false)}
          />
        </div>


        {/* Orden por Actividades */}
        <div className={style.itemSort}>
          <Button
            text={"🛍️ Actividades"}
            onclick={() => handleSort("totalActivities")}
          />
          <Button
            text={<span>↑</span>}
            onclick={() => handleSort("totalActivities", true)}
          />
          <Button
            text={<span>↓</span>}
            onclick={() => handleSort("totalActivities", false)}
          />
        </div>


        {/* Orden alfabético */}
        <div className={style.itemSort}>
          <Button text={"A - Z"} onclick={() => handleSort("name", true)} />
          <Button
            text={<span>↑</span>}
            onclick={() => handleSort("name", true)}
          />
          <Button
            text={<span>↓</span>}
            onclick={() => handleSort("name", false)}
          />
        </div>
      </div>
    </div>
  );
}
