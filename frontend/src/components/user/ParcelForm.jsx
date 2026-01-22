import { useState } from 'react';
import FormHeader from './FormHeader';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import SubmitButton from './SubmitButton';

const ParcelForm = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    pickupAddress: '',
    dropLocation: '',
    dropAddress: '',
    itemName: '',
    itemWeight: '',
    itemDescription: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API integration will happen here
    // axios.post('/api/order/create', formData)
    console.log('Form submitted:', formData);
  };

  const locationIcon = (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    </svg>
  );

  const packageIcon = (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );

  const searchIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <FormHeader title="Parcel Details" icon={packageIcon} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Pickup Location"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Enter pickup city"
            required
            icon={locationIcon}
          />
          
          <InputField
            label="Drop Location"
            name="dropLocation"
            value={formData.dropLocation}
            onChange={handleChange}
            placeholder="Enter destination city"
            required
            icon={locationIcon}
          />
        </div>
        
        <TextAreaField
          label="Pickup Address"
          name="pickupAddress"
          value={formData.pickupAddress}
          onChange={handleChange}
          placeholder="Enter complete pickup address"
          required
        />

        <TextAreaField
          label="Drop Address"
          name="dropAddress"
          value={formData.dropAddress}
          onChange={handleChange}
          placeholder="Enter complete delivery address"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="What are you sending?"
            required
          />

          <InputField
            label="Weight (kg)"
            name="itemWeight"
            type="number"
            value={formData.itemWeight}
            onChange={handleChange}
            placeholder="0.0"
            required
            icon={<span className="text-gray-400 text-sm">kg</span>}
          />
        </div>

        <TextAreaField
          label="Item Description"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          placeholder="Describe your item (size, fragility, special instructions...)"
          rows={3}
          required
        />

        <SubmitButton text="Find Traveler" icon={searchIcon} />
      </form>
    </div>
  );
};

export default ParcelForm;