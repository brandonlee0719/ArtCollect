// import { combineReducers } from "redux"
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// const persistConfig = {
// 	key: "root",
// 	storage,
// };

// const contractStorageReducer = (state=0, action) => {
//     switch(action.type){
//         case "SET_VALUE":
//             return action.payload;
//         default:
//             return state;
//     }
// }

// const tokenDataReducer = (state = [], action) => {
//   switch (action.type) {
//     case "SET_TOKEN_DATA":
//       return action.payload;
//     default:
//       return state;
//   }
// };


// const reducers = combineReducers({
//   contractStorage: contractStorageReducer,
//   tokenData: tokenDataReducer,
// });
// const persistedReducer = persistReducer(persistConfig, reducers);
// export default persistedReducer;