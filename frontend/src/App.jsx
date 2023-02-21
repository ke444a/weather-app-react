import Header from './components/Header';
import MainContent from './components/MainContent';
import Forecast from './components/Forecast';
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorMessage from './components/ErrorMessage';
import convertWeatherCode from './helpers/convertWeatherCode';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [countryCode, setCountryCode] = useState('');
    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const queryClient = useQueryClient();

    useEffect(() => {
        const getGeolocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const [lat, lon] = [position.coords.latitude, position.coords.longitude];
                    setLatitude(lat);
                    setLongitude(lon);
                });
            }
        };

        window.addEventListener('load', getGeolocation);

        return () => {
            window.removeEventListener('load', getGeolocation);
        };
    }, []);


    const getWeatherData = async () => {
        const currentDate = new Date();
        const finalDate = new Date(currentDate);
        finalDate.setDate(finalDate.getDate() + 4);
        const currentIsoDate = currentDate.toISOString().split('T')[0];
        const finalIsoDate = finalDate.toISOString().split('T')[0];
        const url = 'https://api.open-meteo.com/v1/forecast';
        return await axios.get(url, { params: { latitude: latitude, longitude: longitude, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, current_weather: true, hourly: 'temperature_2m,relativehumidity_2m,apparent_temperature,pressure_msl,cloudcover,windspeed_10m,weathercode', windspeed_unit: 'ms', start_date: currentIsoDate, end_date: finalIsoDate } }).then(res => res.data);
    };

    const getGeolocationByCity = async () => {
        const url = 'https://geocoding-api.open-meteo.com/v1/search';
        return await axios.get(url, { params: { name: city, count: 1 } }).then(res => res.data.results[0]);
    };

    const getCityByGeolocation = async () => {
        const url = import.meta.env.VITE_WEATHER_BACKEND_URL;
        return await axios.get(url, { params: { lat: latitude, lon: longitude } }).then(res => res.data.features[0].properties);
    };

    const cityCoordsResult = useQuery(
        {
            queryKey: ['coordinates', latitude, longitude],
            queryFn: getCityByGeolocation,
            enabled: latitude !== null && longitude !== null && city === '',
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log('hereCoords!');
                setCity(data.city);
                setCountryCode(data.country_code.toUpperCase());
            }
        }
    );

    const weatherResult = useQuery(
        {
            queryKey: ['weather', latitude, longitude],
            queryFn: getWeatherData,
            enabled: latitude !== null && longitude !== null,
            onSuccess: (data) => {
                getCurrentWeather(data);
                getForecast(data);
            },
            refetchOnWindowFocus: false,
        }
    );

    const cityGeoResult = useQuery(
        {
            queryKey: ['city', city],
            queryFn: getGeolocationByCity,
            enabled: city !== '',
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log('here!');
                const [lat, lon, country_code] = [data.latitude, data.longitude, data.country_code];
                setLatitude(lat);
                setLongitude(lon);
                setCountryCode(country_code.toUpperCase());
                queryClient.invalidateQueries('weather');
            }
        }
    );

    const submitCity = (cityData) => {
        setCity(cityData.city);
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

    if (weatherResult.isFetching || cityGeoResult.isFetching || cityCoordsResult.isFetching) {
        return (
            <>
                <Header submitCity={submitCity} />
                <main>
                    <div className='flex'>
                        <ClipLoader
                            className='mx-auto mt-32'
                            color="#CDA280"
                            size={75}
                            speedMultiplier={0.8}
                        />
                    </div>
                </main>
            </>
        );
    }

    if (weatherResult.isError || cityGeoResult.isError || cityCoordsResult.isError) {
        return (
            <>
                <Header submitCity={submitCity} />
                <ErrorMessage />
            </>
        );
    }

    return (
        <>
            <Header submitCity={submitCity} />
            {weatherResult.isSuccess &&
                <main>
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
                </main>
            }
        </>
    );
};

export default App;