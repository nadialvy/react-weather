import { useEffect, useState, } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardSubDetailWeather from "../child-components/CardSubdetailWeather";

const WeatherDetail = () => {
  const params = new URLSearchParams(useLocation().search);
  const latitude = params.get('lat');
  const longitude = params.get('long');
  const region = params.get('region');
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const aborter = new AbortController();
    async function fetchData(){
      setLoading(true);
      try{
        const res = await fetch(`https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`, {
          headers: {
            'x-api-key': 'L6rl0+ZwmtQuuqvkCa+8RA==w0nhShb8KMbkvbTv'
          },
          signal: aborter.signal
        });
        setLoading(false);
        setError(null);
        const data = await res.json();
        setWeather(data);
        if(data.error) setError(data.error);
      }catch(err){
        if(err.name === 'AbortError'){
          console.log('Fetch aborted');
          return;
        }else{
          setLoading(false);
          setError(err);
        }
      }
    }

    if (latitude && longitude && !weather) {
      fetchData();
    }

    return () => aborter.abort();

  }, [latitude, longitude, weather, error])


  const getWeatherCondition = (weather) => {
    const cloudPct = weather.cloud_pct;
    const temp = weather.temp;
    const feelsLike = weather.feels_like;
    const sunrise = weather.sunrise;
    const sunset = weather.sunset;

    if (cloudPct > 50) {
      return {
        main: "Cloudy",
        description: "It's cloudy today. The sky is filled with thick clouds, creating a cozy atmosphere. You might want to stay indoors or enjoy a warm cup of tea.",
        iconPath: "/icon/cloudy.svg",
        additionalInfo: "Don't forget your umbrella, just in case it starts raining.",
      };
    } else if (temp > 30 && feelsLike > 30) {
      return {
        main: "Hot and Sunny",
        description: "It's a hot and sunny day. The sun is shining brightly, radiating warmth throughout the day. It's the perfect weather for a refreshing swim or relaxing at the beach.",
        iconPath: "/icon/sunny.svg",
        additionalInfo: "Stay hydrated and wear sunscreen to protect your skin from the scorching sun.",
      };
    } else if (temp < 20 && feelsLike < 20) {
      return {
        main: "Cold and Sunny",
        description: "It's cold but sunny outside. The sun is casting a gentle glow, making the surroundings look picturesque. Embrace the chill and enjoy outdoor activities like hiking or building snowmen.",
        iconPath: "/icon/cloudsunny.svg",
        additionalInfo: "Don't forget your warm coat, gloves, and a hot beverage to keep yourself cozy.",
      };
    } else if (temp < 20 && feelsLike > 30) {
      return {
        main: "Rain and Sunny",
        description: "Expect rain showers with occasional sunshine. The weather is dynamic, alternating between light rain and bursts of sunshine. It creates a unique atmosphere where you can witness the beauty of rainbows.",
        iconPath: "/icon/rainsunny.svg",
        additionalInfo: "Carry an umbrella and raincoat to stay dry during the rain showers.",
      };
    } else if (temp < 20 && feelsLike < 30) {
      return {
        main: "Cloud and Snow",
        description: "It's snowy with cloudy skies. The landscape is covered in a white blanket, creating a serene and magical ambiance. It's a great time for winter activities like skiing or building snow forts.",
        iconPath: "/icon/cloudsnow.svg",
        additionalInfo: "Stay warm with layered clothing and enjoy the beauty of snowflakes falling around you.",
      };
    } else if (sunrise < sunset) {
      return {
        main: "Lightning and Sun",
        description: "Expect lightning and sunshine today. The contrasting elements of thunderstorms and sunshine create a dramatic and awe-inspiring display in the sky. Witness the power of nature while enjoying the brightness of the sun.",
        iconPath: "/icon/lightning.svg",
        additionalInfo: "Take precautions during thunderstorms and find safe shelter when lightning is nearby.",
      };
    } else {
      return {
        main: "Sunny",
        description: "It's a sunny day. The sky is clear, and the sun is shining brightly. Enjoy the beautiful weather and soak in the warm rays of sunshine.",
        iconPath: "/icon/sunny.svg",
        additionalInfo: "Make the most of the sunshine by engaging in outdoor activities or simply relaxing in the fresh air.",
      };
    }

  }

  const getFormattedTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  return (
    <div className="flex items-center justify-center overflow-hidden bg-[#D2D8E3] relative">
      { error &&
        <div className="text-center flex items-center m-auto lg:h-screen text-lg">
          <div>
            <p className="text-red-700">{error}</p>
            <p className="font-semibold hover:cursor-pointer" onClick={() => navigate('/')}>Back to home</p>
          </div>
        </div>}
      {loading && <div className="flex justify-center items-center h-screen text-lg text-blue-700 font-semibold">Loading...</div>}
      {weather != null && !weather.error &&
        <div className="z-40 mx-10 my-12 sm:mx-24 sm:my-16 md:mx-36 lg:mx-48 w-full lg:max-w-lg border border-slate-400 border-opacity-40 bg-white bg-opacity-20 rounded-xl p-4 sm:p-8 xl:my-12">
          {/* title */}
          <div className="flex items-center justify-between">
            <img onClick={() => navigate('/')} src="/icon/left-arrow.png" alt="Back" className="w-3 sm:w-5 md:w-6 hover:cursor-pointer" />
            <p className="text-2xl sm:text-3xl lg:text-3xl text-center font-semibold">{region}</p>
            <p></p>
          </div>

          <img src={getWeatherCondition(weather).iconPath} alt="Weather Icon" className="w-3/4 m-auto my-4 md:my-6 lg:my-10"/>
          <div className="flex items-start justify-center">
            <p className="text-5xl sm:text-6xl lg:text-8xl font-semibold text-center">{weather.temp}</p>
            <p className="text-3xl lg:text-5xl">°</p>
          </div>

          <p className="text-center text-xl lg:text-2xl text-gray-600">{getWeatherCondition(weather).main}</p>
          <p className="text-center lg:text-xl mt-5 px-2 text-gray-800">{getWeatherCondition(weather).description}</p>

          <div className="grid grid-cols-2 xl:grid-cols-4 xl:gap-1 gap-4 mt-10 my-2">
            <CardSubDetailWeather iconPath="/icon/humidity.png" alt="Humidity" desc={weather.humidity} title="Humidity"/>
            <CardSubDetailWeather iconPath="/icon/wind.png" alt="Wind" desc={weather.wind_speed} title="Wind"/>
            <CardSubDetailWeather iconPath="/icon/sunrise.png" alt="Sunrise" desc={getFormattedTime(weather.sunrise)} title="Sunrise"/>
            <CardSubDetailWeather iconPath="/icon/sunset.png" alt="Sunset" desc={getFormattedTime(weather.sunset)} title="Sunset"/>
          </div>


        </div>
      }
      <img src="/bg/orange-ellipse.svg" alt="" className="opacity-75 scale-150 absolute right-[180px] bottom-[630px] xl:right-[750px] xl:bottom-[10px]"/>
      <img src="/bg/blue-ellipse.svg" alt="" className="absolute scale-150 left-[180px] top-[630px] xl:left-[750px] xl:top-[10px]"/>
    </div>
  );
}

export default WeatherDetail;
