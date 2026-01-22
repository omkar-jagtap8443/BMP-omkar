const OrderCard = ({ order }) => {
  const handleAcceptOrder = () => {
    // API call to accept order will be added here
    // axios.post('/api/traveler/accept-order', { orderId: order.id })
    console.log('Accepting order:', order.id);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{order.itemName}</h3>
          <p className="text-gray-600 text-sm">{order.itemDescription}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">${order.price}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center text-blue-700 mb-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-xs font-semibold">From</span>
          </div>
          <p className="text-sm font-medium text-gray-800">{order.pickupLocation}</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center text-green-700 mb-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-xs font-semibold">To</span>
          </div>
          <p className="text-sm font-medium text-gray-800">{order.dropLocation}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-sm font-medium">Weight: {order.itemWeight}kg</span>
        </div>
        <div className="text-sm text-gray-500">
          Posted {order.timeAgo}
        </div>
      </div>

      <button
        onClick={handleAcceptOrder}
        className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
      >
        Accept Order
      </button>
    </div>
  );
};

export default OrderCard;