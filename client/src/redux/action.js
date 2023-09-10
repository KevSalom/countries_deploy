import axios from "axios";
export const GETCOUNTRIES = "GETCOUNTRIES";
export const UPDCURRENTCOUNTRIES = "UPDCURRENTCOUNTRIES";
export const FILTERCOUNTRY = "FILTERCOUNTRY";

const URL = "/countries";


export const getCountries = () => {
  
    return async function (dispatch) {
        try {
            const {data} = await axios.get(URL)
            return dispatch({
                type: GETCOUNTRIES,
                payload: data
            })
            } catch (error) {
                window.alert('No se pudieron obtener los paises')
            }
    }
  
}


export const updCurrentCountries = (countries) => {
    return {
        type: UPDCURRENTCOUNTRIES,
        payload: countries
    }
}


export const filterByContinet = (continent) => {
    return {
        type: FILTERCOUNTRY,
        payload: continent
    }
}