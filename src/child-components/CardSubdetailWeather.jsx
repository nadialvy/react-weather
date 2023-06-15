const CardSubDetailWeather = ({ iconPath, alt, desc, title }) => {
  return (
    <div className="w-1/4 border border-slate-300 bg-slate-50 bg-opacity-50 hover:bg-opacity-80 transition-all rounded-lg shadow-sm p-4 hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
      <img src={iconPath} className="w-9 m-auto" alt={alt} />
      <p className="text-center text-lg mt-2">{desc}</p>
      <p className="text-md text-center text-gray-700">{title}</p>
    </div>
   );
}

export default CardSubDetailWeather;