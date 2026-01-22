const Hero = () => {
  return (
    <section className="bg-linear-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Send Parcels Worldwide
            <span className="block text-blue-600">Through Trusted Travelers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with verified travelers to deliver your parcels safely and affordably. 
            Fast, secure, and cost-effective parcel delivery across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
              Book a Parcel
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Become a Traveler
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;