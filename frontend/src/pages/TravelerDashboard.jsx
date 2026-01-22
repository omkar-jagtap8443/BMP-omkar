import TravelerStatusToggle from '../components/traveler/TravelerStatusToggle';
import OrderList from '../components/traveler/OrderList';

const TravelerDashboard = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Traveler Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage your delivery requests and availability</p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$2,450</div>
                <div className="text-sm text-gray-500">Total Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">47</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4.9</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="md:hidden bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">$2,450</div>
              <div className="text-xs text-gray-500">Earned</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">47</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">4.9</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <TravelerStatusToggle />
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default TravelerDashboard;