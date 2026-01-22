const CallToAction = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Send Your Parcel?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust BookMyParcel for simple, 
          secure, and affordable parcel delivery worldwide.
        </p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CallToAction;