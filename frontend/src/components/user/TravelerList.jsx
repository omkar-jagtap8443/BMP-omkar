import TravelerCardNew from './TravelerCardNew';

const TravelerList = () => {
  // Mock data - will be replaced with API call
  const travelers = [
    {
      id: 1,
      name: 'John Smith',
      rating: 4.8,
      route: 'New York → London',
      travelDate: '2024-01-15',
      capacity: 5,
      price: 25,
      verified: true,
      trips: 45
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 4.9,
      route: 'New York → London',
      travelDate: '2024-01-16',
      capacity: 3,
      price: 30,
      verified: true,
      trips: 62
    },
    {
      id: 3,
      name: 'Mike Wilson',
      rating: 4.7,
      route: 'New York → London',
      travelDate: '2024-01-17',
      capacity: 8,
      price: 20,
      verified: true,
      trips: 38
    }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-linear-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Available Travelers</h2>
        </div>
        <div className="text-sm text-gray-500">
          {travelers.length} travelers found
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {travelers.map(traveler => (
          <TravelerCardNew key={traveler.id} traveler={traveler} />
        ))}
      </div>
      
      {travelers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium mb-2">No travelers found</p>
          <p className="text-gray-400 text-sm">Submit your parcel details to find matches</p>
        </div>
      )}
    </div>
  );
};

export default TravelerList;