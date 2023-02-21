import clearSky from '../assets/clear-sky.png';
import clouds from '../assets/clouds.png';
import drizzle from '../assets/drizzle.png';
import fog from '../assets/fog.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import thunderstorm from '../assets/thunderstorm.png';

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

export default convertWeatherCode;