import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCountry from "../../Components/InfoCountry";
import style from "./index.module.css";

export default function CountryDetail() {
  const { id } = useParams();
  const [countryData, serCountryData] = useState();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const URL = `http://localhost:3001/countries/${id}`;
    axios
      .get(URL)
      .then(({ data }) => {
        serCountryData(data);
      })
      .catch(({ response }) => setMessage(response.data.error));
  }, []);

  return (
    <div className={style.container}>
      
      <div
        style={{
          backgroundImage: `url(${countryData ? countryData.flag : undefined})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(2px) brightness(0.25)",
          width: "102%",
          height: "115%",
          backgroundPosition: "center",
          position: "absolute",
          top: "-32px",
          left: "-10px",
        }}
      >
      </div>
      <div><h1 className={style.name}>{countryData && countryData.name}</h1>
      <h2 className={style.capital}>{countryData && countryData.capital && countryData.capital[0]}</h2>
      </div>
      
    <div className={style.infoContainer} >
    <InfoCountry  logo={'🗺️'} title={'CONTINENTE'} text={countryData && countryData.continent}  border={'6px solid #009cb7'} color={'#009cb7'} />
    <InfoCountry  logo={'👨‍👩‍👧‍👦'} title={'POBLACIÓN'} text={countryData && countryData.population} border={'6px solid #f97129'} color={'#f97129'} />
    <InfoCountry  logo={'㊙️'} title={'IDIOMA'} text={countryData && countryData.languages[0]} border={'6px solid rgb(254, 23, 132)'} color={'rgb(254, 23, 132)'}/>
    <InfoCountry  logo={'💵'} title={'MONEDA'} text={countryData && Object.values(countryData.currencies)[0].name} border={'6px solid #6f099d'} color={'#6f099d'}/>
    <InfoCountry  logo={'🌎'} title={'ÁREA'} text={countryData && countryData.area} border={'6px solid #17189d'} color={'#17189d'}/>
    </div>
      
    </div>
  );
}


