import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  time: string
}

interface WeatherResponse {
  latitude: number
  longitude: number
  current_weather: CurrentWeather
}

interface WeatherParams {
  latitude: number
  longitude: number
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.open-meteo.com/v1/',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, WeatherParams>({
      query: ({ latitude, longitude }) =>
        `forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    }),
  }),
})

export const { useGetWeatherQuery } = weatherApi
