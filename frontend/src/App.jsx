import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Forecast from './components/Forecast';
import ClipLoader from 'react-spinners/ClipLoader';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faXmark, faTemperatureLow, faWater, faWind, faCloud, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
library.add(faMagnifyingGlass, faMoon, faSun, faXmark, faTemperatureLow, faWater, faWind, faCloud, faTemperatureHalf);

import clearSky from './assets/clear-sky.png';
import clouds from './assets/clouds.png';
import drizzle from './assets/drizzle.png';
import fog from './assets/fog.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import thunderstorm from './assets/thunderstorm.png';

export default function App() {
    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [currentWeather, setCurrentWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const convertWeatherCode = (code) => {
        let [iconSrc, description] = ['', ''];
        if ([0].includes(code)) {
            iconSrc = clearSky;
            description = 'Clear sky';
        }
        else if ([1, 2, 3].includes(code)) {
            iconSrc = clouds;
            description = 'Clouds';
        }
        else if ([45, 48].includes(code)) {
            iconSrc = fog;
            description = 'Fog';
        } else if ([51, 53, 55, 56, 57].includes(code)) {
            iconSrc = drizzle;
            description = 'Drizzle';
        } else if ([61, 63, 65, 66, 67, 80, 81, 82, 85, 86].includes(code)) {
            iconSrc = rain;
            description = 'Rain';
        } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
            iconSrc = snow;
            description = 'Snow';
        } else if ([95, 96, 99].includes(code)) {
            iconSrc = thunderstorm;
            description = 'Thunderstorm';
        }
        return [iconSrc, description];
    };

    const getCityByGeolocation = async (lat, lon) => {
        const url = `/api?lat=${lat}&lon=${lon}`;

        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    const getGeolocationByCity = async (cityName) => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;

        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    const getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const [lat, lon] = [position.coords.latitude, position.coords.longitude];
                setLatitude(lat);
                setLongitude(lon);

                setIsFetching(true);
                const dataCity = await getCityByGeolocation(lat, lon);
                setCity(dataCity.features[0].properties.city);
                setCountryCode(dataCity.features[0].properties.country_code.toUpperCase());

                const dataWeather = await getWeatherData(lat, lon);
                getCurrentWeather(dataWeather);
                getForecast(dataWeather);
                setIsFetching(false);
            });
        }
    };

    useEffect(() => {
        window.addEventListener('load', getGeolocation);
    
        return () => {
            window.removeEventListener('load', getGeolocation);
        };
    }, [navigator.geolocation]);

    const handleCitySubmit = async (cityName) => {
        setCity(cityName);

        setIsFetching(true);
        const geoData = await getGeolocationByCity(cityName);
        const [lat, lon, country_code] = [geoData.results[0].latitude, geoData.results[0].longitude, geoData.results[0].country_code];
        setLatitude(lat);
        setLongitude(lon);
        setCountryCode(country_code.toUpperCase());

        const dataWeather = await getWeatherData(lat, lon);
        getCurrentWeather(dataWeather);
        getForecast(dataWeather);
        setIsFetching(false);
    };
    

    const getWeatherData = async (lat, lon) => {
        const currentDate = new Date();
        const finalDate = new Date(currentDate);
        finalDate.setDate(finalDate.getDate() + 4);
        const currentIsoDate = currentDate.toISOString().split('T')[0];
        const finalIsoDate = finalDate.toISOString().split('T')[0];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,pressure_msl,cloudcover,windspeed_10m,weathercode&windspeed_unit=ms&start_date=${currentIsoDate}&end_date=${finalIsoDate}`;

        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    const getCurrentWeather = (data) => {
        const currentHourIndex = data.hourly.time.findIndex(item => item === data.current_weather.time);
                
        setCurrentWeather({
            currentTemp: Math.round(data.hourly.temperature_2m[currentHourIndex]),
            description: convertWeatherCode(data.current_weather.weathercode)[1],
            apparentTemp: Math.round(data.hourly.apparent_temperature[currentHourIndex]),
            cloudiness: data.hourly.cloudcover[currentHourIndex],
            humidity: data.hourly.relativehumidity_2m[currentHourIndex],
            windSpeed: Math.round(data.hourly.windspeed_10m[currentHourIndex]),
            pressure: Math.round(data.hourly.pressure_msl[currentHourIndex])
        });
    };

    const getForecast = (data) => {
        const dailyForecast = [];
        for (let i = 0; i < data.hourly.time.length; i += 12) {

            const [icon, desc] = convertWeatherCode(data.hourly.weathercode[i]);
            dailyForecast.push({
                date: data.hourly.time[i],
                temp: Math.round(data.hourly.temperature_2m[i]),
                description: desc,
                apparentTemp: Math.round(data.hourly.apparent_temperature[i]),
                cloudiness: data.hourly.cloudcover[i],
                humidity: data.hourly.relativehumidity_2m[i],
                windSpeed: Math.round(data.hourly.windspeed_10m[i]),
                pressure: Math.round(data.hourly.pressure_msl[i]),
                icon: icon
            });
        }
        setForecast(dailyForecast);
    };

    return (
        <>
            <Header handleCitySubmit={handleCitySubmit} />
            {latitude && longitude && (
                <main>
                    {isFetching ?
                        <div className='flex'>
                            <ClipLoader
                                className='mx-auto mt-32'
                                color="#CDA280"
                                size={75}
                                speedMultiplier={0.8}
                            />
                        </div>
                        :
                        <div>
                            <div className='bg-wild-sand'>
                                <div className='container mx-auto'>
                                    <MainContent
                                        city={city}
                                        countryCode={countryCode}
                                        currentWeather={currentWeather}
                                        location={{
                                            latitude: latitude,
                                            longitude: longitude
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='container mx-auto'>
                                <Forecast
                                    forecast={forecast}
                                />
                            </div>
                        </div>
                    }
                </main>
            )
            }
        </>
    );
}