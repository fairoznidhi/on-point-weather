import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SavedLocation = {
  name: string
  country: string
  lat: number
  lon: number
}

interface WeatherState {
  locations: SavedLocation[]
  activeIndex: number
}

const initialState: WeatherState = {
  locations: [],
  activeIndex: 0,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<SavedLocation[]>) => {
      state.locations = action.payload
    },
    addLocation: (state, action: PayloadAction<SavedLocation>) => {
      // Avoid duplicates based on lat/lon
      const exists = state.locations.some(
        (loc) =>
          loc.lat === action.payload.lat && loc.lon === action.payload.lon,
      )
      if (!exists) {
        state.locations.push(action.payload)
      }
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations.splice(action.payload, 1)
      if (state.activeIndex >= state.locations.length) {
        state.activeIndex = Math.max(0, state.locations.length - 1)
      }
    },
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload
    },
  },
})

export const { setLocations, addLocation, removeLocation, setActiveIndex } =
  weatherSlice.actions
export default weatherSlice.reducer
