import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

export default function App() {
  const [formData, setFormData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(formData);
      } catch (parseError) {
        console.error('Invalid JSON:', parseError);
        alert('Please enter valid JSON data');
        return;
      }
      
      const response = await axios.post('http://localhost:5000/bfhl', parsedData);
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Bajaj Data Processor</h2>
                <div className="relative">
                  <textarea
                    className="peer h-32 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="Enter JSON data"
                    value={formData}
                    onChange={handleInputChange}
                  ></textarea>
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Enter JSON data
                  </label>
                </div>
                <button
                  className="bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                  onClick={handleSubmit}
                >
                  Process Data
                </button>
              </div>
              {responseData && (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h3 className="text-2xl font-bold text-gray-900">Results</h3>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    multiple
                    onChange={handleOptionChange}
                  >
                    <option value="alphabets">Alphabets</option>
                    <option value="numbers">Numbers</option>
                    <option value="highest_alphabet">Highest Alphabet</option>
                  </select>
                  <div className="bg-gray-100 p-4 rounded-md">
                    {selectedOptions.includes('alphabets') && (
                      <p>Alphabets: {responseData.alphabets.join(', ')}</p>
                    )}
                    {selectedOptions.includes('numbers') && (
                      <p>Numbers: {responseData.numbers.join(', ')}</p>
                    )}
                    {selectedOptions.includes('highest_alphabet') && (
                      <p>Highest Alphabet: {responseData.highest_alphabet.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}