import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updCurrentCountries, filterByContinet, getActivities, getCountriesByActivity } from "../../redux/action";
import Button from "../Button";
import DropDown from "../DropDown"
import axios from "axios";
import style from './index.module.css'

export default function CountryBar({setSearching, setMessage, resetCurrentPage, setInfoCards}) {
  // Loógica del buscador
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.allActivities);
  

  useEffect(() => {
    if(activities.length === 0){
      dispatch(getActivities()).catch((error) => console.log(error))
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSearching(true);
    resetCurrentPage(1)
  };

  useEffect(() => {
    if(!searchTerm){
      setMessage(null)
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
  
      dispatch(updCurrentCountries(countries));
      setSearching(false)
    } else{
      setMessage(null)
      if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      // Aquí puedes enviar la petición a la API con el valor actual de searchTerm
      // y actualizar el estado con los resultados de la búsqueda
      axios.get(`/countries?name=${searchTerm}`)
        .then(({data}) => {
          dispatch(updCurrentCountries(data));
          setSearching(false)
        }).catch(({response}) => {
         dispatch(updCurrentCountries([]));
         setSearching(false)
         setMessage(response.data.error)});
         
    }, 300)}; // 300ms de retraso
  }, [searchTerm]);
  

  //DropDown
  const [dropDownValueContinent, setDropDownValueContinent] = useState('')
  const [dropDownValueActivity, setDropDownValueActivity] = useState('')

  useEffect(()=>{
    
    function handleValue (continent){
      setContinentBy(continent)
      dispatch(filterByContinet(continent));
    }

    if(dropDownValueContinent === 'África'){
      handleValue('Africa')
    } else if(dropDownValueContinent === 'Europa') {
      handleValue('Europe')
    } else if((dropDownValueContinent === 'Oceanía')){
      handleValue('Oceania')
    } else if(dropDownValueContinent === 'América del Sur'){
      handleValue('South America')
    } else if(dropDownValueContinent === 'América del Norte'){
      handleValue('North America')
    } else if (dropDownValueContinent === 'Antártida'){
      handleValue('Antarctica')
    } else if(dropDownValueContinent === 'Asia'){
      handleValue('Asia')
    }

    setMessage(null)
    setSearchTerm("")
    resetCurrentPage(1)

  }, [dropDownValueContinent])



  useEffect(()=>{

    if(dropDownValueActivity !== ''){dispatch(getCountriesByActivity(dropDownValueActivity));
    setMessage(null)
    setSearchTerm("")
    resetCurrentPage(1)}

  }, [dropDownValueActivity])



  //Lógica para ordenamientos
  const [continentBy, setContinentBy] = useState(null);
  const URL = "/countries/sort";


  const handleSort = async (order, sort) => { 
    try {
      const querySort = sort ? `&sort=${'ASC'}` : `&sort=${'DESC'}`;
      const queryContinent = continentBy ? `&continent=${continentBy}` : "";
      
      const countriesDb = await axios.get(
        `${URL}?type=${order}${querySort}${queryContinent}`
      );

      setInfoCards(order)
      dispatch(updCurrentCountries(countriesDb.data));
      setSearchTerm("")
      setMessage(null)
      resetCurrentPage(1)
      
      
  
    } catch (error) {
      console.log(error.message)
    }
  };


//Botón para limpiar los filtros y searchbar
const countries = useSelector((state)=> state.allCountries)

const cleanFilters = () => {
  dispatch(updCurrentCountries(countries));
  setSearchTerm('')
  setContinentBy(null);
  setMessage(null)
  resetCurrentPage(1)
  setDropDownValueContinent("");
  setDropDownValueActivity('')
}

  return (
      <div className={style.countryBarCointainer} >
      
       <div className={style.continetCointainer}>
        <DropDown options={['África', 'Europa', 'Oceanía', 'Asia', 'América del Sur', 'América del Norte', 'Antártida' ]} dropDownValue={dropDownValueContinent} setDropDownValue={setDropDownValueContinent} defaultText={'🌐 Continentes'} />
    
<div className={style.activityAndCleaner} >
        { activities.length > 0 && <DropDown options={activities.map((a)=> a.name)} dropDownValue={dropDownValueActivity} setDropDownValue={setDropDownValueActivity} defaultText={'🛍️ Tipos de Actividades'} />}

          <Button text={'🧹'} onclick={cleanFilters}/>
          </div>
        </div >

          <div className={style.search}>
        <label htmlFor="search">
        <ion-icon name="search"></ion-icon>
        <input type="text" id="search" name="search" value={searchTerm} onChange={handleSearch} placeholder="Busca un país" />
        </label>
      </div>


        <div className={style.containerSort}>
          <div className={style.itemSort} >
          <Button text={'👫 Población'} onclick={() => handleSort("population")}/>
          <Button text={<ion-icon name="arrow-up-outline"></ion-icon>} onclick={() => handleSort("population", true)}/>
          <Button text={<ion-icon name="arrow-down-outline"></ion-icon>} onclick={() => handleSort("population", false)}/>
          </div>
          
          <div className={style.itemSort} >

          <Button text={'🌎 Área'} onclick={() => handleSort("area")}/>
          <Button text={<ion-icon name="arrow-up-outline"></ion-icon>} onclick={() => handleSort("area", true)}/>
          <Button text={<ion-icon name="arrow-down-outline"></ion-icon>} onclick={() => handleSort("area", false)}/>
          
          </div>

          <div className={style.itemSort} >
          <Button text={'🛍️ Actividades'} onclick={() => handleSort("totalActivities")}/>
          <Button text={<ion-icon name="arrow-up-outline"></ion-icon>} onclick={() => handleSort("totalActivities", true)}/>
          <Button text={<ion-icon name="arrow-down-outline"></ion-icon>} onclick={() => handleSort("totalActivities", false)}/>
          </div>

          <div className={style.itemSort} >
          <Button text={'A - Z'} onclick={() => handleSort("name", true)}/>
          <Button text={<ion-icon name="arrow-up-outline"></ion-icon>} onclick={() => handleSort("name", false)}/>
          <Button text={<ion-icon name="arrow-down-outline"></ion-icon>} onclick={() => handleSort("name", true)}/>
          </div>

          
        </div>
      </div>

  );
}
