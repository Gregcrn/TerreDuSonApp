import {createStore} from 'redux'
import toggleFavorite from './reducers/favoritesReducers'

export default createStore(toggleFavorite)