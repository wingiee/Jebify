"use client";
import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar } from 'lucide-react';

const RetirementCalculator = () => {
  const [inputs, setInputs] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    inflationRate: 2,
  });

  const [result, setResult] = useState(null);

  const calculateRetirement = () => {
    const years = inputs.retirementAge - inputs.currentAge;
    const monthlyRate = (inputs.expectedReturn - inputs.inflationRate) / 100 / 12;
    let futureValue = inputs.currentSavings;

    for (let i = 0; i < years * 12; i++) {
      futureValue += inputs.monthlyContribution;
      futureValue *= (1 + monthlyRate);
    }

    setResult(Math.round(futureValue));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Retirement Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Age</label>
            <div className="mt-1 relative">
              <input
                type="number"
                name="currentAge"
                value={inputs.currentAge}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
            <div className="mt-1 relative">
              <input
                type="number"
                name="retirementAge"
                value={inputs.retirementAge}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Current Savings (₹)</label>
            <div className="mt-1 relative">
              <input
                type="number"
                name="currentSavings"
                value={inputs.currentSavings}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <DollarSign className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Contribution (₹)</label>
            <div className="mt-1 relative">
              <input
                type="number"
                name="monthlyContribution"
                value={inputs.monthlyContribution}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <DollarSign className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
            <input
              type="number"
              name="expectedReturn"
              value={inputs.expectedReturn}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
            <input
              type="number"
              name="inflationRate"
              value={inputs.inflationRate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={calculateRetirement}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate Retirement Savings
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Estimated Retirement Savings</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ₹{result.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This is an estimate based on your current inputs and assumes consistent contributions and returns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetirementCalculator;
