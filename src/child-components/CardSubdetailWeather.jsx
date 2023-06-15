const CardSubDetailWeather = ({ iconPath, alt, desc, title }) => {
  return (
    <div className="border border-slate-300 bg-slate-50 bg-opacity-50 hover:bg-opacity-80 transition-all rounded-lg shadow-sm p-4 hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
      <img src={iconPath} className="w-9 m-auto" alt={alt} />
      <p className="text-center text-md sm:text-lg mt-2">{desc}</p>
      <p className="text-sm sm:text-md lg:text-lg text-center text-gray-700">{title}</p>
    </div>
   );
}

export default CardSubDetailWeather;