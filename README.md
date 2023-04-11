# Weather Application

This is a web application built with React/Vite that displays the current weather and 5 days forecast for a provided location. To retrieve the weather data, the frontend of the application sends requests to a backend server, built using Node.js, which in turn queries multiple third party APIs. This web application supports Progressive Web Application (PWA). Both the static website and the web server are deployed on Render.

## Table of Contents
- [Features](#features)
- [Demonstration](#demonstration)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contact](#contact)
- [Sources](#sources)

## Features
1. Requests user to either enter a city or use their current location to get the weather data.
2. Displays the current weather for the provided location
3. Displays forecast for upcoming 5 days for the provided location.
4. Displays additional weather information such as apparent temperature, humidity, cloudness, wind speed, and pressure.
5. Shows the weather data in a responsive manner for different screen sizes.
6. Visualizes the map of the provided location using Bing Maps API.
7. Progressive Web App (PWA) support.

## Demonstration
### [View website](https://weather-application-rltf.onrender.com/)
![weather-gif](https://user-images.githubusercontent.com/81090139/220726512-04c27df6-2e48-4f35-ad76-d86e4704c523.gif)


## Technologies
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Progressive Web App](https://img.shields.io/badge/Progressive%20Web%20App-%2320232a.svg?style=for-the-badge&logo=google-chrome&logoColor=white)

## Setup
Follow the instructions below to run the application locally.
### Getting an API Keys
Create an account and generate an API key on the following websites:
* [Geoapify API](https://apidocs.geoapify.com/)
* [Bing Maps API](https://www.bingmapsportal.com/)

### Installation
Clone the repository:
```bash
$ git clone https://github.com/ke444a/weather-app-react.git
```
Install all the dependencies:
```bash
$ cd weather-app-react/
$ npm install

# Install the dependencies for the frontend and backend separately
$ cd weather-app-react/frontend/
$ npm install

$ cd weather-app-react/backend/
$ npm install
```
Run the application:
```bash
$ cd frontend/
$ npm run dev
```
### Environment Variables
Create a `.env` file in the root directory of the project 
```bash
$ touch .env
```
Add the following environment variables:
```bash
VITE_BINGMAPS_API_KEY="ADD YOUR BING MAPS API KEY HERE"
GEOAPIFY_KEY_VALUE="ADD YOUR GEOAPIFY API KEY HERE"
GEOAPIFY_BASE_URL ="https://api.geoapify.com/v1/geocode/reverse"
GEOAPIFY_KEY_NAME="apiKey"
```

## Contact
- LinkedIn: [Danyl Kecha](https://www.linkedin.com/in/danylkecha//)
- Mail: danyl.kecha.uk@gmail.com
- GitHub: [ke444a](https://github.com/ke444a)
- Twitter: [@ke444a](https://twitter.com/ke444a)

## Sources
- [Weather Icons](https://www.flaticon.com/packs/weather-173)
- [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Geoapify API](https://apidocs.geoapify.com/)
- [Bing Maps API](https://www.bingmapsportal.com/)
