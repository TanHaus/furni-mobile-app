import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";

export default function configureStore() {
  const persistConfig = {
    key: "root",
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
  const persistor = persistStore(store);
  return { store, persistor };
}
