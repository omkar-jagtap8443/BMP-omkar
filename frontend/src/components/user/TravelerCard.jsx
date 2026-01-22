const TravelerCard = ({ traveler }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {traveler.name.charAt(0)}
          </span>
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900">{traveler.name}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">{traveler.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-medium">Route:</span> {traveler.route}</p>
        <p><span className="font-medium">Travel Date:</span> {traveler.travelDate}</p>
        <p><span className="font-medium">Capacity:</span> {traveler.capacity}kg</p>
        <p><span className="font-medium">Price:</span> ${traveler.price}</p>
      </div>
      
      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
        Track
      </button>
    </div>
  );
};

export default TravelerCard;