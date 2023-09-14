import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./index.module.css";

export default function Autocomplete({
  setCountriesSelected,
  countriesSelected,
  setErrors,
  errors,
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('')
  const countriesFromRedux = useSelector((state) => state.allCountries);

  const handleCountrySelect = (country) => {
   
   if(countriesSelected.some(c => c.name === country.name)){
     setMessage(`El país "${country.name}" ya fue seleccionado`)
     setTimeout(function() {
      setMessage('')
    }, 3500);
     setInputValue("")
   } else {
    setCountriesSelected((prevSelected) => [...prevSelected, country]);
    setErrors({ ...errors, countries: "" });
    setInputValue("")}
  };

  const deleteCountrySelected = (countryToDelete) => {
    setMessage('')
    const newCountriesSelected = countriesSelected.filter(
      (country) => country.id !== countryToDelete.id
    );
    if (newCountriesSelected.length === 0) {
      setErrors({ ...errors, countries: "Debes seleccionar mínimo un país" });
    }
    setCountriesSelected(newCountriesSelected);
  };

  useEffect(() => {
    setCountries(countriesFromRedux);
  }, []);

  useEffect(() => {
    let setTimeId;

    if (inputValue) {

      setMessage('')
      setTimeId = setTimeout(() => {
        const filteredSuggestions = countries.filter((country) => {
          const inputNoAccent = inputValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const actualCountryNoAccent = country.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return actualCountryNoAccent.toLowerCase().includes(inputNoAccent.toLowerCase());
        });
        setSuggestions(filteredSuggestions);
      }, 300);
    }

    return () => clearTimeout(setTimeId);
  }, [inputValue, countries]);

  return (
    <div className={style.autocompleteContainer}>


{(suggestions.length > 0 &&  inputValue) && <ul className={style.suggestions}>
        {suggestions.map((country) => (
            <li key={country.id} onClick={() => handleCountrySelect(country)}>
              <span>{country.name} </span>{" "}
              <img className={"itemFlag"} src={country.flag} />
            </li>
          ))}
      </ul>}


      <div className={style.search}>
        <label htmlFor="description">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un país..."
          />
        </label>
      </div>


      
        {message && <span>{message}</span>}
      {/* Div para mostrar las banderas seleccionadas */}
      {countriesSelected.length > 0 && <div className={style.selectedCountries}>
        {countriesSelected.map((country, index) => (
            <span key={index} className={style.flag}>
              <img className={"itemFlag"} src={country.flag} />
                <span onClick={(ev) => {
                  ev.preventDefault();
                  deleteCountrySelected(country);
                }}>x</span>
            </span>
          ))}
      </div>}
    </div>
  );
}
