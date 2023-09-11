import axios from "axios";
export const GETCOUNTRIES = "GETCOUNTRIES";
export const GETACTIVITIES = "GETACTIVITIES";
export const DELETEACTIVITY = "DELETEACTIVITY";
export const UPDCURRENTCOUNTRIES = "UPDCURRENTCOUNTRIES";
export const UPDCURRENTACTIVITIES = "UPDCURRENTACTIVITIES";
export const FILTERCOUNTRY = "FILTERCOUNTRY";
export const COUNTRYBYACTIVITY = "COUNTRYBYACTIVITY";

export const getCountries = () => {
  const URL = "/countries";
  return async function (dispatch) {
    try {
      const { data } = await axios.get(URL);
      return dispatch({
        type: GETCOUNTRIES,
        payload: data,
      });
    } catch (error) {
      window.alert("No se pudieron obtener los paises");
    }
  };
};

export const getActivities = () => {
  const URL = "/activities";
  return async function (dispatch) {
    try {
      const { data } = await axios.get(URL);
      return dispatch({
        type: GETACTIVITIES,
        payload: data,
      });
    } catch (error) {
      window.alert("No se pudieron obtener los paises");
    }
  };
};


export const updCurrentCountries = (countries) => {
  return {
    type: UPDCURRENTCOUNTRIES,
    payload: countries,
  };
};

export const updCurrentActivities = (activities) => {
    return {
      type: UPDCURRENTACTIVITIES,
      payload: activities,
    };
  };


export const filterByContinet = (continent) => {
  return {
    type: FILTERCOUNTRY,
    payload: continent,
  };
};

export const deleteActivity = (id) => {
  return {
    type: DELETEACTIVITY,
    payload: id,
  };
};


export const getCountriesByActivity = (activity) =>{
  return{
    type: COUNTRYBYACTIVITY,
    payload:activity
  }
}