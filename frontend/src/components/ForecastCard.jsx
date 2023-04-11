import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import {
    faXmark,
    faTemperatureLow,
    faWater,
    faWind,
    faTemperatureHalf,
    faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getFormattedDate } from "../utils/getFormattedDate";

export default function ForecastCard(props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Closing the forecast details popup when clicking outside of it
        const closeForecastDetails = (event) => {
            if (
                event.target.closest(".forecast-popup") ||
                event.target.closest(".forecast-card")
            ) {
                return;
            }
            setIsVisible(false);
        };
        window.addEventListener("click", closeForecastDetails);

        return () => {
            window.removeEventListener("click", closeForecastDetails);
        };
    }, []);

    return (
        <>
            <div
                className="m-4 w-[150px] xs:w-1/4 lg:w-1/6 py-3 px-4 forecast-card"
                onClick={() => setIsVisible(true)}
            >
                <h3 className="font-medium text-xs leading-[14px] xs:font-bold xs:text-sm xs:leading-[18px] lg:text-base lg:leading-5 tracking-wide bg-tan text-wild-sand rounded-md p-1">
                    {getFormattedDate(props.date)}
                </h3>
                <div className="my-1 xs:my-2 mx-auto w-1/2 xs:w-full">
                    <img className="w-full" src={props.icon} />
                </div>
                <div className="flex flex-col xs:flex-row justify-between font-medium text-sm sm:text-base">
                    <p className="xs:mb-2">
                        <FontAwesomeIcon className="pr-1" icon={faSun} />
                        {props.noonTemp}°C
                    </p>
                    <p>
                        <FontAwesomeIcon className="pr-1" icon={faMoon} />
                        {props.nightTemp}°C
                    </p>
                </div>
            </div>

            {isVisible && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-white opacity-50 z-10" />
                    <div className="forecast-popup min-w-[220px] xs:min-w-[250px] sm:min-w-[300px] pt-3 pb-4 sm:pb-6 px-2 sm:px-5 animate-wiggle z-20">
                        <h3
                            className="flex justify-between font-bold text-base xs:text-lg tracking-wide bg-tan text-wild-sand py-1 px-3 rounded-md mb-3 cursor-pointer items-center"
                            onClick={() => setIsVisible(false)}
                        >
                            {getFormattedDate(props.date)}
                            <FontAwesomeIcon
                                className="font-bold"
                                size="lg"
                                icon={faXmark}
                            />
                        </h3>
                        <div className="flex">
                            <div className="text-left float-left rounded-lg px-2 max-w-[75%]">
                                <p className="font-medium text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    <FontAwesomeIcon
                                        icon={faTemperatureLow}
                                        fixedWidth
                                    />{" "}
                                    Feels like:
                                </p>
                                <p className="font-medium text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    <FontAwesomeIcon
                                        icon={faWater}
                                        fixedWidth
                                    />{" "}
                                    Humidity:
                                </p>
                                <p className="font-medium text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    <FontAwesomeIcon icon={faWind} fixedWidth />{" "}
                                    Wind speed:
                                </p>
                                <p className="font-medium text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    <FontAwesomeIcon
                                        icon={faTemperatureHalf}
                                        fixedWidth
                                    />{" "}
                                    Pressure:
                                </p>
                                <p className="font-medium text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    <FontAwesomeIcon
                                        icon={faCloud}
                                        fixedWidth
                                    />{" "}
                                    Cloudiness:
                                </p>
                            </div>
                            <div className="ml-2 sm:ml-5">
                                <p className="font-bold text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    {props.apparentTemp}°C
                                </p>
                                <p className="font-bold text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    {props.humidity}%
                                </p>
                                <p className="font-bold text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    {props.windSpeed} m/s
                                </p>
                                <p className="font-bold text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    {props.pressure} hPa
                                </p>
                                <p className="font-bold text-sm leading-4 sm:text-base sm:leading-5 my-1 sm:my-2">
                                    {props.cloudiness}%
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
