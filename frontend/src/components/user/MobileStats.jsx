const MobileStats = () => {
  return (
    <div className="md:hidden bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">1000+</div>
            <div className="text-xs text-gray-500">Customers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-500">Success</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">50+</div>
            <div className="text-xs text-gray-500">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStats;