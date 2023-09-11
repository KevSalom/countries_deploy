import { useEffect, useState } from "react";
import Autocomplete from "../AutoComplete";
import DifficultySlider from "../DifficultySlider";
import Button from "../Button";
import DropDown from "../DropDown";
import Emojis from "../Emojis";
import style from "./index.module.css";

export default function ActivityForm({
  handleSubmit,
  errorMessage,
  setMessage,
  error
}) {
  const patternData = {
    name: "",
    description: "",
    difficulty: 1,
    duration: "",
    emoji: "",
    season: "",
    countries: [],
  };

  const [countriesSelected, setCountriesSelected] = useState([]);
  const [sliderValue, setSliderValue] = useState(1);
  const [errors, setErrors] = useState(patternData);
  const [showEmojis, setShowEmojis] = useState(false)
  const [emoji, setEmoji] = useState(false)
  const [data, setData] = useState(patternData);

  const validate = (element) => {
    if (element.name === "name") {
      if (!element.value) {
        setErrors({ ...errors, name: "La actividad debe tener un nombre" });
      } else if (
        element.value.charAt(0) !== element.value.charAt(0).toUpperCase()
      ) {
        setErrors({
          ...errors,
          name: "La primera letra del nombre en mayúscula",
        });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

    if (element.name === "duration") {
      if (element.value <= 0 ||  element.value === '') {
        setErrors({
          ...errors,
          duration: "La actividad debe durar mínimo un Día",
        });
      } else {
        setErrors({ ...errors, duration: "" });
      }
    }

    if (element.name === "difficulty") {
      if (element.value > 0) {
        setErrors({ ...errors, difficulty: "" });
      }
    }
  };

 
  // Para actualizar los paises seleccionandos
  useEffect(() => {
    const countriesId = countriesSelected.map((c) => c.id);

    setData((prevState) => ({
      ...prevState,
      countries: countriesId,
    }));
  }, [countriesSelected]);


  const handleChange = (e) => {
    setMessage("");
    let element = e.target.name;
    let value = e.target.value;

    if (e.target.name === "difficulty" || e.target.name === "duration") {
      if(value !== '') value = parseInt(e.target.value);
    }

    setData((prevState) => ({
      ...prevState,
      [element]: value,
    }));

    validate(e.target);
  };

  const handleEmoji = (emoji) => {
    setShowEmojis(false)
    setEmoji(emoji)
    validate(emoji);
    setData((prevState) => ({
      ...prevState,
      emoji: emoji
    }));
  }

  const handleForm = async (ev) => {
    ev.preventDefault();

    const errorEmpty = Object.values(errors).every((valor) => valor === "" || valor === 1);
    const countriesEmpty = data.countries.length === 0;
    const dataEmpty = Object.values(data).every((valor) => valor !== "")


    if (errorEmpty && !countriesEmpty && dataEmpty) {
      if (await handleSubmit(data))
      setData(patternData);
      setCountriesSelected([]);
      setSliderValue(0);
      errorMessage("");
      setMessage("");
      setEmoji(false);
      setDropDownValue("");
    } else {
      errorMessage("Los campos con (*) son obligatorios, por favor completalos");
    }
  };


  //DropDown
  const [dropDownValue, setDropDownValue] = useState("");

  useEffect(() => {
    setMessage("");

    setData((prevState) => ({
      ...prevState,
      season: dropDownValue,
    }));

    validate(dropDownValue);
  }, [dropDownValue]);



  return (
    <form onSubmit={handleForm} className={style.formContaioner}>
      <div className={style.search}>
        <label htmlFor="name">
          <p>Nombre de la Actividad(*)</p>
          <input
            type="text"
            placeholder="Tour europeo"
            id="name"
            value={data.name}
            name="name"
            onChange={handleChange}
          />
         
        </label>
        {errors.name && <span className={style.messageError} >{errors.name}</span>}
        {(error && !errors.name && !data.name)?<span className={style.messageError}>La actividad debe tener un nombre</span>:undefined}
      </div>

      <div className={style.search}>
        <label htmlFor="description">
          <p>Descripción:</p>
          <textarea
            id="description"
            name="description"
            cols="30"
            rows="4"
            placeholder="Viaje en Familia por toda Europa"
            value={data.description}
            onChange={handleChange}
          />
        </label>
      </div>


      <div className={style.seasonContainer}>
        <label htmlFor="season">
          <p>Temporada(*):</p>

          <DropDown
            options={["Verano", "Invierno", "Primavera", "Otoño"]}
            setDropDownValue={setDropDownValue}
            dropDownValue={dropDownValue}
            defaultText={'Escoje una temporada 🌡️'}
          />
          
        </label>
        {errors.season && <span className={style.messageError}>{errors.season}</span>}
        {(error && !errors.season && !data.season)?<span className={style.messageError}>Debes escoger una temporada</span>:undefined}
      </div>

      <div className={style.search}>
        <label htmlFor="emoji">
        <p>
            Emoji de la Actividad(*):
          </p>
          <Button text={(!emoji)?'Escoje un Emoji 😀':`Tu Emoji: ${emoji}`} onclick={()=>setShowEmojis(!showEmojis)}/> 
        {showEmojis && <div className={style.emojiContainer}> <Emojis handleEmoji={handleEmoji} /> </div> }

{(error && !data.emoji)?<span className={style.messageError}>Debe escoger un emoji</span>:undefined}
        </label>
     
      </div>

      <div className={style.search}>
        <label htmlFor="duration">
          <p>
            Días que durará la actividad(*):
          </p>
          <input
            type="number"
            id="duration"
            name="duration"
            placeholder="21"
            onChange={handleChange}
            value={data.duration}
            min="0"
            required
          />
          {errors.duration && <span className={style.messageError} >{errors.duration}</span>}
        </label>
      </div>

      <div className={style.slideContainer}>
        <label htmlFor="difficulty">
          <p>Dificultad</p>
          <DifficultySlider
            onChange={handleChange}
            setSliderValue={setSliderValue}
            sliderValue={sliderValue}
          />
        </label>
      </div>

      
<div className={style.countriesContainer}>
      <label htmlFor="countries">
        <p>Países(*)</p>
        <Autocomplete
          setCountriesSelected={setCountriesSelected}
          countriesSelected={countriesSelected}
          setErrors={setErrors}
          errors={errors}
        />
        {(error && errors.countries.length === 0 && data.countries.length === 0)?<span className={style.messageError}>Debes seleccionar mínimo un país</span>:undefined}
        {errors.countries && <span className={style.messageError}>{errors.countries}</span>}
      </label>
      </div>
      <Button text={"Crear"} type={'submit'} />
    </form>
  );
}
