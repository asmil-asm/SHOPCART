import { configureStore,createListenerMiddleware,  isAnyOf } from '@reduxjs/toolkit'
import ProductReducer from '@store/Products/ProductSlice'
import CategoryReducer from '@store/Categories/CategoriesSlice'
import TopBrandReducer from '@store/TopBrand/TopBrand'
import CartReducer from '@store/Cart/CartSlice'
import FavoriteReducer from '@store/Favorite/FavoriteSlice'
import BlogsReducer from '@store/Blogs/BlogSlice'
import AuthReducer from '@store/Auth/AuthSlice'
import LoginReducer from '@store/Auth/LoginSlice'
import FilterReducer from '@store/Filter/FilterSlice'
import ContactRducer from '@store/Contact/ContactSlice'
import OrderReducer from '@store/order/orderSlice'
import { LoginAction } from './actions/LoginAction'
import { updateActivity } from '@store/Auth/LoginSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER } from 'redux-persist'
import { combineReducers } from 'redux'

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key))
}
const Time=60*60*100;




const persistConfigLogin = {
  key: 'login',
  storage,
  whitelist: ['user', 'token','lastActivity']
}


const rootReducer = combineReducers({
  products: ProductReducer,
  category: CategoryReducer,
  top_brand: TopBrandReducer,
  cart: CartReducer,
  favorite:  FavoriteReducer,
  blogs: BlogsReducer,
  auth: AuthReducer,
  login: persistReducer(persistConfigLogin, LoginReducer),
  contact: ContactRducer,
  filter: FilterReducer,
  order:OrderReducer
})

// time for login
const listenerLogin=createListenerMiddleware()
listenerLogin.startListening({
    matcher: isAnyOf(LoginAction.fulfilled, updateActivity),
  effect: async (action, listenerApi) => {
     listenerApi.cancelActiveListeners()

    const state = listenerApi.getState() as RootState
    if (!state.login?.token) return

    try {
      await listenerApi.delay(Time)
    } catch {
      return
    }
  }
   
})



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER],
      }
    }),
})

const presistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { presistor, store }