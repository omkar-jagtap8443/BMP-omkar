import { useState } from 'react';

const TravelerStatusToggle = () => {
  const [isOnline, setIsOnline] = useState(false);

  const handleToggle = () => {
    setIsOnline(!isOnline);
    // API call to update traveler online status will be added here
    // axios.put('/api/traveler/status', { isOnline: !isOnline })
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Availability Status</h3>
          <p className="text-gray-600 mt-1">
            {isOnline ? 'You are visible to users looking for travelers' : 'You are currently offline'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span className="font-medium">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              isOnline ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                isOnline ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelerStatusToggle;