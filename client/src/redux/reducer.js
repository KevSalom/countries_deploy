import {GETCOUNTRIES, GETACTIVITIES, UPDCURRENTCOUNTRIES, UPDCURRENTACTIVITIES, FILTERCOUNTRY, DELETEACTIVITY, COUNTRYBYACTIVITY, SORTCOUNTRYBYACTIVITIES, FILTERCONTINENANDACTIVITY, FILTERSETUP} from './action'

const initialState = {
    allCountries: [],
    currentCountries: [],
    allActivities: [],
    currentActivities:[],
    currentFiltersSetUp:{continentFilter: '', activityFilter:'', inputSearchBar:'', currentSort:''}
   
  };
  
  export const countriesReducer = (state = initialState, action) => {
     switch(action.type) {
        case GETCOUNTRIES :
         return { ...state,
            allCountries: action.payload,
            // currentCountries: action.payload
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

         case SORTCOUNTRYBYACTIVITIES : 

         const {order, sort} = action.payload;
         let countriesSorted = [];

         if(order === 'name'){
            countriesSorted = state.currentCountries.sort((a,b) => 
            sort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)) 

         } else {
            countriesSorted = state.currentCountries.sort((a,b) => sort ?  a[order]- b[order] :  b[order] - a[order])
         }
            return { ...state,
             currentCountries:   countriesSorted
            };

      case FILTERCONTINENANDACTIVITY : 

           const {activity, continent} = action.payload;

           const countriesWithBothFilters = state.allCountries.filter((c)=>
           c.Activities.some((a) => a.name === activity) && c.continent === continent
           )
            return { ...state,
               currentCountries: countriesWithBothFilters
            };

     case FILTERSETUP : 

            return { ...state,
               currentFiltersSetUp: action.payload
            };

         default:
            return {...state}
     }
  }