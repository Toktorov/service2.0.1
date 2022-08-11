import axios from "axios";


const GET_ITEMS = 'GET_ITEMS';

const CHANGE_STATUS = 'CHANGE_STATUS';

const GET_CATEGORY = 'GET_CATEGORY';

const GET_SERVICE = 'GET_SERVICE';

const SET_APP = 'SET_APP';

const GET_LOCATIONS = 'GET_LOCATIONS';

const initState = {
    items: [],
    status: 'home',
    service: {},
    categories:[],
    locations: [],
    app: ''
};


export default (state = initState, action) => {
    switch (action.type) {

        case CHANGE_STATUS : {
            return {
                ...state,
                status: action.change
            }
        }


        case GET_ITEMS : {
            return {
                ...state,
                items: action.arr
            }
        }

        case GET_CATEGORY : {
            return {
                ...state,
                categories: action.arr
            }
        }

        case GET_SERVICE : {
            return {
                ...state,
                service: action.service
            }
        }
        case SET_APP :{
            return {
                ...state,
                app: action.change
            }
        }
            case GET_LOCATIONS:{
                return {
                    ...state,
                    locations: action.locations
                }
            }


        default:
            return state
    }
};

export const setStatus = (state) =>{
    return(dispatch) => {
        return dispatch({type: CHANGE_STATUS, change: `${state}`})
    }
};

export const getItems = () => {
    return (dispatch) => {
        axios('/api/users/')
            .then(({data}) => {
                return dispatch({type: GET_ITEMS, arr: data.filter(item => item.status_user !== 'Free')})
            })
    }

};

export const getCategories = () => {
    return (dispatch) => {
        axios('/api/category/category/')
        .then(({data}) => {
            return dispatch({type: GET_CATEGORY, arr: data})
        }).catch(error => console.log(error.response))
    }

};

export const getService = (id) =>{
  return (dispatch) =>{
      axios('/api/users/')
          .then(({data}) =>{
              return dispatch({type: GET_SERVICE, service: data.filter(item =>{
                  return item.id == id
                  })[0]})
      })
  }
};

export const getLocations = () =>{
  return (dispatch)=>{
      axios.get("/api/category/location/")
          .then(({data})=> dispatch({type: GET_LOCATIONS, locations: data}))
  }
};

export const setApp = (app) =>{
    return(dispatch) => {
        return dispatch({type: SET_APP, change: `${app}`})
    }
};


