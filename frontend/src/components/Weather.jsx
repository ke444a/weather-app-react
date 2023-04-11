import Map from "./Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTemperatureLow,
    faWater,
    faWind,
    faCloud,
    faTemperatureHalf,
} from "@fortawesome/free-solid-svg-icons";

const Weather = (props) => {
    const capitalize = (str) => {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className="flex flex-wrap py-4 sm:py-7 lg:py-12 justify-center items-center">
            <div className="weather-card py-3 px-2 text-center text-tan">
                <h3 className="font-bold text-lg sm:text-2xl mb-2">
                    {capitalize(props.city)}
                    {props.countryCode && `, ${props.countryCode}`}
                </h3>
                <h2 className="font-bold text-5xl sm:text-7xl mb-1">
                    {props.currentWeather.currentTemp}°C
                </h2>
                <p className="font-medium text-base sm:text-lg">
                    {props.currentWeather.description}
                </p>
            </div>
            <div className="weather-card py-1 px-4 bg-tan">
                <div className="text-wild-sand">
                    <p className="font-bold text-sm leading-[18px] sm:text-base my-1 sm:my-2">
                        <FontAwesomeIcon icon={faTemperatureLow} fixedWidth />{" "}
                        Feels like:{" "}
                        <span className="ml-2">
                            {props.currentWeather.apparentTemp}°C
                        </span>
                    </p>
                    <p className="font-bold text-sm leading-[18px] sm:text-base my-1 sm:my-2">
                        <FontAwesomeIcon icon={faWater} fixedWidth /> Humidity:{" "}
                        <span className="ml-2">
                            {props.currentWeather.humidity}%
                        </span>
                    </p>
                    <p className="font-bold text-sm leading-[18px] sm:text-base my-1 sm:my-2">
                        <FontAwesomeIcon icon={faWind} fixedWidth /> Wind speed:{" "}
                        <span className="ml-2">
                            {props.currentWeather.windSpeed} m/s
                        </span>
                    </p>
                    <p className="font-bold text-sm leading-[18px] sm:text-base my-1 sm:my-2">
                        <FontAwesomeIcon icon={faTemperatureHalf} fixedWidth />{" "}
                        Pressure:{" "}
                        <span className="ml-2">
                            {props.currentWeather.pressure} hPa
                        </span>
                    </p>
                    <p className="font-bold text-sm leading-[18px] sm:text-base my-1 sm:my-2">
                        <FontAwesomeIcon icon={faCloud} fixedWidth />{" "}
                        Cloudiness:{" "}
                        <span className="ml-2">
                            {props.currentWeather.cloudiness}%
                        </span>
                    </p>
                </div>
            </div>
            <div className="weather-card z-0">
                <Map location={props.location} />
            </div>
        </div>
    );
};

export default Weather;
