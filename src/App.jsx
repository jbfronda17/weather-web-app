import { useState } from 'react'
import './App.css'

function App() {
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [humidity, setHumidity] = useState('');
  const [icon, setIcon] = useState('');
  const [location, setLocation] = useState('Philippines');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [name, setName] = useState('');
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch weather data function
  const fetchWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      setName(data.name);
      setCountry(data.sys.country);
      setTemp(Math.round(data.main.temp));
      setIcon(data.weather[0].icon);
      setDescription(data.weather[0].description);
      setFeelsLike(Math.round(data.main.feels_like));
      setMinTemp(Math.round(data.main.temp_min));
      setMaxTemp(Math.round(data.main.temp_max));
      setHumidity(data.main.humidity);
      setWind(Math.round(data.wind.speed));
    })
    .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  // Fetch background image function
  const fetchBackgroundImage = () => {
    fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${import.meta.env.VITE_API_ACCESS_KEY}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("bg-image").style.background = 'url('+data["results"][0]["urls"]["regular"]+')';
    });
  };

  return (
    <div className="app h-screen w-full flex">
      <div className="main w-full" id="bg-image">
        <div className="h-screen w-full flex flex-col justify-between bg-dark">
          <div className="top flex justify-between items-center pt-5 mx-10">
            <p className="title">Weather App</p>
            <div className="input_container flex h-10 rounded-full">
              <div className="img_container flex items-center mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <div className="flex items-center me-5">
                <input className="search_box outline-none capitalize bg-transparent"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="upper flex items-center justify-around">
              <div className="upper_left w-4/12">
                <div className="location_container flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="location ms-2">City/Location Country</p>
                </div>
                <p className="temp">Temp</p>
                <div className="description flex items-center">
                  <p>Description</p>
                </div>
              </div>
              <div className="upper_right w-4/12 p-10 rounded-xl">
                <h1 className="heading mb-3">Weather Details</h1>
                <div className="details flex justify-around">
                  <div className="details_left flex flex-col">
                    <div className="parameter flex">
                      <div className="w-2/12 flex justify-center me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512" className="svg-icon">
                          <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/>
                        </svg>
                      </div>
                      <div className="flex-col">
                        <p>Feels Like:</p>
                        <p className="value">Temp</p>
                      </div>
                    </div>
                    <div className="parameter flex">
                      <div className="w-2/12 flex justify-center me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" className="svg-icon">
                          <path d="M224 0c13.3 0 24 10.7 24 24V70.1l23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-57 57v76.5l66.2-38.2 20.9-77.8c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4L373 142.2l37.1-21.4c11.5-6.6 26.2-2.7 32.8 8.8s2.7 26.2-8.8 32.8L397 183.8l31.5 8.4c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-77.8-20.9L272 256l66.2 38.2 77.8-20.9c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4L397 328.2l37.1 21.4c11.5 6.6 15.4 21.3 8.8 32.8s-21.3 15.4-32.8 8.8L373 369.8l8.4 31.5c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-20.9-77.8L248 297.6v76.5l57 57c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-23-23V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V441.9l-23 23c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l57-57V297.6l-66.2 38.2-20.9 77.8c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4L75 369.8 37.9 391.2c-11.5 6.6-26.2 2.7-32.8-8.8s-2.7-26.2 8.8-32.8L51 328.2l-31.5-8.4c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l77.8 20.9L176 256l-66.2-38.2L31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4L51 183.8 13.9 162.4c-11.5-6.6-15.4-21.3-8.8-32.8s21.3-15.4 32.8-8.8L75 142.2l-8.4-31.5c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l20.9 77.8L200 214.4V137.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23V24c0-13.3 10.7-24 24-24z"/>
                        </svg>
                      </div>
                      <div className="flex-col">
                        <p>Min Temp:</p>
                        <p className="value">Temp</p>
                      </div>
                    </div>
                    <div className="parameter flex">
                      <div className="w-2/12 flex justify-center me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" className="svg-icon">
                          <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/>
                        </svg>
                      </div>
                      <div className="flex-col">
                        <p>Max Temp:</p>
                        <p className="value">Temp</p>
                      </div>
                    </div>
                  </div>
                  <div className="details_right flex flex-col">
                    <div className="parameter flex">
                      <div className="w-2/12 flex justify-center me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" className="svg-icon">
                          <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                        </svg>
                      </div>
                      <div className="flex-col">
                        <p>Humidity:</p>
                        <p className="value">Humidity</p>
                      </div>
                    </div>
                    <div className="parameter flex">
                      <div className="w-2/12 flex justify-center me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" className="svg-icon">
                          <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
                        </svg>
                      </div>
                      <div className="flex-col">
                        <p>Wind:</p>
                        <p className="value">Wind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lower flex justify-between p-10 mt-10">
              <div className="date">
                <p>Current Date</p>
              </div>
              <div className="time">
                <p>Current Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;