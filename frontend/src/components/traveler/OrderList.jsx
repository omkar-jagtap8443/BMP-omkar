import OrderCard from './OrderCard';

const OrderList = () => {
  // Mock data - will be replaced with API call
  const orders = [
    {
      id: 1,
      itemName: 'Electronics Package',
      itemDescription: 'Laptop and accessories in protective case',
      pickupLocation: 'New York, NY',
      dropLocation: 'London, UK',
      itemWeight: 3.5,
      price: 85,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      itemName: 'Documents',
      itemDescription: 'Important business documents in sealed envelope',
      pickupLocation: 'New York, NY',
      dropLocation: 'Paris, FR',
      itemWeight: 0.5,
      price: 45,
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      itemName: 'Gift Package',
      itemDescription: 'Birthday gift for family member',
      pickupLocation: 'Boston, MA',
      dropLocation: 'London, UK',
      itemWeight: 2.0,
      price: 60,
      timeAgo: '6 hours ago'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Available Orders</h2>
        </div>
        <div className="text-sm text-gray-500">
          {orders.length} orders available
        </div>
      </div>
      
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium mb-2">No orders available</p>
          <p className="text-gray-400 text-sm">Check back later for new delivery requests</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;