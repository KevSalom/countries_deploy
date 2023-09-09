export const GETCOUNTRIES = "GETCOUNTRIES";
export const UPDCURRENTCOUNTRIES = "UPDCURRENTCOUNTRIES";
export const FILTERCOUNTRY = "FILTERCOUNTRY";


export const getCountries = (countries) => {
    return {
        type: GETCOUNTRIES,
        payload: countries
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