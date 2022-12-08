import { configureStore } from '@reduxjs/toolkit'
import drawerSlice from './drawerSlice'
import globalSlice from './globalSlice'

export default configureStore({
  reducer: {
    global: globalSlice,
    drawer: drawerSlice,
  },
})
