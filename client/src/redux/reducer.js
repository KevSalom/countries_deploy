import {GETCOUNTRIES, GETACTIVITIES, UPDCURRENTCOUNTRIES, UPDCURRENTACTIVITIES, FILTERCOUNTRY, DELETEACTIVITY, COUNTRYBYACTIVITY} from './action'
const initialState = {
    allCountries: [],
    currentCountries: [],
    allActivities: [],
    currentActivities:[]
  };
  
  export const countriesReducer = (state = initialState, action) => {
     switch(action.type) {
        case GETCOUNTRIES :
         return { ...state,
            allCountries: action.payload,
            currentCountries: action.payload
         };
         case GETACTIVITIES :
         return { ...state,
            allActivities: action.payload,
            currentActivities: action.payload
         };
         case UPDCURRENTCOUNTRIES : {
            return { ...state,
                allCountries: [...state.allCountries],
                currentCountries: action.payload
             }
         };
      
         case UPDCURRENTACTIVITIES : {
            return { ...state,
                allActivities: [...state.allActivities],
                currentActivities: action.payload
             }
         };
         case FILTERCOUNTRY : 
            const countriesFiltred = state.allCountries.filter((c)=>
                c.continent === action.payload
            )
            return { ...state,
                allCountries: [...state.allCountries],
            currentCountries: countriesFiltred
            };
            case DELETEACTIVITY : 
            const activitiesFiltred = state.allActivities.filter((a)=>
                a.id !== action.payload
            )
            return { ...state,
                allActivities: activitiesFiltred,
                currentActivities: activitiesFiltred
            };
            case COUNTRYBYACTIVITY : 
            const countries = state.allCountries.filter((c) => 
               c.Activities.some((activity) => activity.name === action.payload)
            )
            return { ...state,
               currentCountries: countries
            };
         default:
            return {...state}
     }
  }