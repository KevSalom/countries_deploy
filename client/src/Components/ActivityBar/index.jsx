import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updCurrentActivities } from "../../redux/action";
import axios from "axios";
import Button from "../Button";
import DropDown from "../DropDown";
import style from "./index.module.css";

export default function ActivityBar({
  resetCurrentPage,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activitiesBy, setActivitiesBy] = useState(null);
  const debounceTimeoutRef = useRef(null);
  const allActivities = useSelector((state) => state.allActivities);
  const dispatch = useDispatch();
  
  // Lógica Buscador
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    resetCurrentPage(1)
  };

  useEffect(() => {
   
    if(!searchTerm){
      if(debounceTimeoutRef.current){
        clearTimeout(debounceTimeoutRef.current)
      }
      dispatch(updCurrentActivities(allActivities))
    } else{
      if(debounceTimeoutRef.current){
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        // Aquí puedes enviar la petición a la API con el valor actual de searchTerm
        // y actualizar el estado con los resultados de la búsqueda
        axios
          .get(`/activityname?name=${searchTerm}`)
          .then(({ data }) => {
            dispatch(updCurrentActivities(data))
          });
      }, 300)
    }
    // 300ms de retraso
  }, [searchTerm]);

  //Lógica para filtros por estación

  const [dropDownValue, setDropDownValue] = useState("");

  useEffect(() => {
    if(dropDownValue){setSearchTerm("");
    setActivitiesBy(dropDownValue);

    const newActivities = allActivities && allActivities.filter((a) => a.season === dropDownValue);
    dispatch(updCurrentActivities(newActivities))

    resetCurrentPage(1);}
  }, [dropDownValue]);


  //Lógica para ordenamientos
  const URL = "/activities";

  const handleSort = async (type, sort) => {
    try {
      const querySort = sort ? `&sort=${"ASC"}` : `&sort=${"DESC"}`;
      const querySeason = activitiesBy ? `&season=${activitiesBy}` : "";
      const activitiesDb = await axios.get(
        `${URL}?type=${type}${querySort}${querySeason}`
      );
      dispatch(updCurrentActivities(activitiesDb.data))
      setSearchTerm("");
    } catch (error) {
      console.error(error)
    }
  };

  //Botón para limpiar los filtros y searchbar
  const cleanFilters = () => {
    resetCurrentPage(1);
    dispatch(updCurrentActivities(allActivities))
    setSearchTerm("");
    setActivitiesBy(null);
    setDropDownValue("");
    
  };

  return (
    <div className={style.activityBarContainer} >

      <div className={style.activityDropClean} >
<DropDown
        options={["Verano", "Invierno", "Primavera", "Otoño"]}
        setDropDownValue={setDropDownValue}
        dropDownValue={dropDownValue}
        defaultText={'🌡️ Temporadas'}
      />

        <Button text={"🧹 Limpiar Filtros"} onclick={cleanFilters} />
      </div>



      <div className={style.search}>
        <label htmlFor="search">
          <ion-icon name="search"></ion-icon>
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Busca tu actividad por nombre, descripción o país"
          />
        </label>
      </div>
      


<div className={style.containerSort}> 
      <div className={style.itemSort}>
        <Button text={"⌚ Duración"} onclick={() => handleSort("duration")} />
        <Button
          text={<ion-icon name="arrow-up-outline"></ion-icon>}
          onclick={() => handleSort("duration", true)}
        />
        <Button
          text={<ion-icon name="arrow-down-outline"></ion-icon>}
          onclick={() => handleSort("duration", false)}
        />
      </div>

      <div className={style.itemSort}>
        <Button text={"⚡ Dificultad"} onclick={() => handleSort("difficulty")} />
        <Button
          text={<ion-icon name="arrow-up-outline"></ion-icon>}
          onclick={() => handleSort("difficulty", true)}
        />
        <Button
          text={<ion-icon name="arrow-down-outline"></ion-icon>}
          onclick={() => handleSort("difficulty", false)}
        />
      </div>

      <div className={style.itemSort}>
        <Button text={'A - Z'} onclick={() => handleSort("name", true)} />
        <Button
          text={<ion-icon name="arrow-up-outline"></ion-icon>}
          onclick={() => handleSort("name", true)}
        />
        <Button
          text={<ion-icon name="arrow-down-outline"></ion-icon>}
          onclick={() => handleSort("name", false)}
        />
      </div>
      </div>
      
    </div>
  );
}
