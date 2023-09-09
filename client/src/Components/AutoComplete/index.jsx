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
  const countriesFromRedux = useSelector((state) => state.allCountries);

  const handleCountrySelect = (country) => {
    setCountriesSelected((prevSelected) => [...prevSelected, country]);
    setErrors({ ...errors, countries: "" });
    setInputValue("");
  };

  const deleteCountrySelected = (countryToDelete) => {
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
      setTimeId = setTimeout(() => {
        const filteredSuggestions = countries.filter((country) => {
          const inputNoAccent = inputValue
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const actualCountryNoAccent = country.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          return actualCountryNoAccent
            .toLowerCase()
            .includes(inputNoAccent.toLowerCase());
        });
        setSuggestions(filteredSuggestions);
      }, 300);
    }

    return () => clearTimeout(setTimeId);
  }, [inputValue, countries]);

  return (
    <div className={style.autocompleteContainer}>


{(suggestions.length > 0 &&  inputValue) && <ul className={style.suggestions}>
        {inputValue &&
          suggestions.map((country) => (
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


      

      {/* Div para mostrar las banderas seleccionadas */}
      {countriesSelected.length > 0 && <div className={style.selectedCountries}>
        {countriesSelected &&
          countriesSelected.map((country, index) => (
            <span key={index} className={style.flag}>
              <img className={"itemFlag"} src={country.flag} />
                <ion-icon name="close-circle-outline" onClick={(ev) => {
                  ev.preventDefault();
                  deleteCountrySelected(country);
                }}></ion-icon>
            </span>
          ))}
      </div>}
    </div>
  );
}
