
import { combineReducers } from 'redux'
import blog from './blog'
import login from './login'
import sys from './sys'

export default combineReducers({
  blog,
  login,
  sys,
})
