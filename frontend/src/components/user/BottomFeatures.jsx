const BottomFeatures = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      bgColor: "bg-blue-100",
      title: "Secure Payments",
      description: "All transactions are encrypted and secure with multiple payment options."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: "bg-green-100",
      title: "Verified Travelers",
      description: "All our travelers are verified with background checks and reviews."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: "bg-purple-100",
      title: "Fast Delivery",
      description: "Quick and reliable delivery with real-time tracking updates."
    }
  ];

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
          <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
            {feature.icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BottomFeatures;