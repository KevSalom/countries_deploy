import axios from "axios";

//Constantes para el control de paises
export const GETCOUNTRIES = "GETCOUNTRIES";
export const UPDCURRENTCOUNTRIES = "UPDCURRENTCOUNTRIES";
export const FILTERCOUNTRY = "FILTERCOUNTRY";
export const COUNTRYBYACTIVITY = "COUNTRYBYACTIVITY";
export const SORTCOUNTRYBYACTIVITIES = "SORTCOUNTRYBYACTIVITIES"
export const FILTERCONTINENANDACTIVITY = "FILTERCONTINENANDACTIVITY";
export const FILTERSETUP = "FILTERSETUP";

//Constantes para el control de actividades
export const GETACTIVITIES = "GETACTIVITIES";
export const UPDCURRENTACTIVITIES = "UPDCURRENTACTIVITIES";

export const DELETEACTIVITY = "DELETEACTIVITY";



//Actions para el control de paises
export const getCountries = () => {
  const URL = "/countries";
  return async function (dispatch) {
    const { data } = await axios.get(URL);
    return dispatch({
      type: GETCOUNTRIES,
      payload: data,
    });
  };
};

export const updCurrentCountries = (countries) => {
  return {
    type: UPDCURRENTCOUNTRIES,
    payload: countries,
  };
};

export const filterByContinet = (continent) => {
  return {
    type: FILTERCOUNTRY,
    payload: continent,
  };
};

export const getCountriesByActivity = (activity) => {
  return {
    type: COUNTRYBYACTIVITY,
    payload: activity,
  };
};

export const sortCountriesByActivity = (order, sort) => {
  return {
    type: SORTCOUNTRYBYACTIVITIES,
    payload: {order, sort}
  };
};

export const filterContinentAndActivity = (activity, continent) =>{
  return {
    type: FILTERCONTINENANDACTIVITY,
    payload: {activity, continent}
  };

}

export const filterSetup = ({continentFilter, activityFilter, inputSearchBar, currentSort}) =>{

  return{
    type:FILTERSETUP,
    payload: {continentFilter, activityFilter, inputSearchBar, currentSort}
  }
}





//Actions para el control de actividades
export const getActivities = () => {
  const URL = "/activities";
  return async function (dispatch) {
    const { data } = await axios.get(URL);
    return dispatch({
      type: GETACTIVITIES,
      payload: data,
    });
  };
};


export const updCurrentActivities = (activities) => {
  return {
    type: UPDCURRENTACTIVITIES,
    payload: activities,
  };
};



export const deleteActivity = (id) => {
  return {
    type: DELETEACTIVITY,
    payload: id,
  };
};


