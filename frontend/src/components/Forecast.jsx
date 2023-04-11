import ForecastCard from "./ForecastCard";

export default function Forecast(props) {
    const forecastCards = [];
    for (let index = 0; index < props.forecast.length - 1; index += 2) {
        forecastCards.push(
            <ForecastCard
                key={index}
                nightTemp={props.forecast[index].temp}
                noonTemp={props.forecast[index + 1].temp}
                date={props.forecast[index].date}
                icon={props.forecast[index + 1].icon}
                apparentTemp={props.forecast[index + 1].apparentTemp}
                cloudiness={props.forecast[index + 1].cloudiness}
                humidity={props.forecast[index + 1].humidity}
                pressure={props.forecast[index + 1].pressure}
                windSpeed={props.forecast[index + 1].windSpeed}
            />
        );
    }

    return (
        <div className="flex flex-wrap py-4 sm:py-7 lg:py-12 justify-center">
            {forecastCards}
        </div>
    );
}
