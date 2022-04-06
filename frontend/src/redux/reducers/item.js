import axios from "axios";


const GET_ITEMS = 'GET_ITEMS';

const CHANGE_STATUS = 'CHANGE_STATUS';

const GET_BTNS = 'GET_BTNS';

const GET_PROFILE = 'GET_PROFILE';

const SET_APP = 'SET_APP';

const ADD_ITEM = 'ADD_ITEM';

const initState = {
    items: [],
    status: 'home',
    profile: [],
    btns:[],
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

        case GET_BTNS : {
            return {
                ...state,
                btns: action.arr
            }
        }

        case GET_PROFILE : {
            return {
                ...state,
                profile: action.arr
            }
        }
        case SET_APP :{
            return {
                ...state,
                app: action.change
            }
        }
        case GET_ITEMS :{
            return {
                ...state
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
        axios('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/product/product/')
            .then(({data}) => {
                return dispatch({type: GET_ITEMS, arr: data})
            })
    }

};

export const getBtns = () => {
    return (dispatch) => {
        axios('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/category/')
        .then(({data}) => {
            return dispatch({type: GET_BTNS, arr: data})
        }).catch(error => console.log(error.response))
    }

};

export const getProfile = (idx) =>{
  return (dispatch) =>{
      axios('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/product/product/')
          .then(({data}) => {
              return dispatch({
                  type: GET_PROFILE, arr: data.filter((item) => {
                      return item.id === `${idx}`
                  })
              })
          });
  }
};

export const setApp = (app) =>{
    return(dispatch) => {
        return dispatch({type: SET_APP, change: `${app}`})
    }
};


// export const addItem = ( description, tel, email, location, category) =>{
//     return(dispatch) => {
//         const data = {
//             description,
//             tel,
//             email,
//             location,
//             category
//         };
//         axios
//             .post('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/order/create_order/', data)
//             .then((data) => console.log(data))
//             .catch(error => {
//                 console.log(error.response);
//                 console.log("Произошла ошибка Кубаныч")
//             });
//         return dispatch({type: ADD_ITEM})
//     }
// };
