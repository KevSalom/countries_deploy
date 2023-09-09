import {GETCOUNTRIES, UPDCURRENTCOUNTRIES, FILTERCOUNTRY} from './action'
const initialState = {
    allCountries: [],
    currentCountries: [],
  };
  
  export const countriesReducer = (state = initialState, action) => {
     switch(action.type) {
        case GETCOUNTRIES :
         return {
            allCountries: action.payload,
            currentCountries: action.payload
         };
         case UPDCURRENTCOUNTRIES : {
            return {
                allCountries: [...state.allCountries],
                currentCountries: action.payload
             }
         };
         case FILTERCOUNTRY : 
            const countriesFiltred = state.allCountries.filter((c)=>
                c.continent === action.payload
            )
            return {
                allCountries: [...state.allCountries],
            currentCountries: countriesFiltred
            };
         default:
            return {...state}
     }
  }