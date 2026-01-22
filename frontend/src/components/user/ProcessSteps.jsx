const ProcessSteps = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
          <span className="ml-2 text-sm font-medium text-gray-700">Fill Details</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
          <span className="ml-2 text-sm font-medium text-gray-500">Choose Traveler</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
          <span className="ml-2 text-sm font-medium text-gray-500">Track & Deliver</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;