import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useApi from '../hooks/useApi'

import toast from 'react-hot-toast'

import {
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

const AddPolicy = () => {

  const navigate = useNavigate()

  const { post: createPolicy, loading } = useApi()

  const [formData, setFormData] = useState({
    type: 'LIFE',
    policyHolder: '',
    coverageAmount: '',
    age: '',
    preExistingConditions: '',
    vehicleType: 'CAR',
    vehicleValue: ''
  })

  const [errors, setErrors] = useState({})

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Form Validation
  const validateForm = () => {

    const newErrors = {}

    if (!formData.policyHolder.trim()) {

      newErrors.policyHolder =
        'Policy holder name is required'
    }

    if (
      !formData.coverageAmount ||
      Number(formData.coverageAmount) < 1000
    ) {

      newErrors.coverageAmount =
        'Coverage must be at least ₹1,000'
    }

    // LIFE Validation
    if (
      formData.type === 'LIFE' &&
      (
        !formData.age ||
        Number(formData.age) < 18 ||
        Number(formData.age) > 80
      )
    ) {

      newErrors.age =
        'Age must be between 18-80'
    }

    // VEHICLE Validation
    if (
      formData.type === 'VEHICLE' &&
      (
        !formData.vehicleType ||
        !formData.vehicleValue
      )
    ) {

      newErrors.vehicle =
        'Vehicle details required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Submit Handler
  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validateForm()) {

      toast.error(
        'Please fix the form errors'
      )

      return
    }

    try {

      // Dynamic Payload
      const payload = {
        type: formData.type,
        policyHolder: formData.policyHolder,
        coverageAmount: Number(
          formData.coverageAmount
        )
      }

      // LIFE POLICY
      if (formData.type === 'LIFE') {

        payload.age = Number(
          formData.age
        )
      }

      // HEALTH POLICY
      if (formData.type === 'HEALTH') {

        payload.preExistingConditions =
          formData.preExistingConditions
            ? formData.preExistingConditions
                .split(',')
                .map((c) => c.trim())
            : []
      }

      // VEHICLE POLICY
      if (formData.type === 'VEHICLE') {

        payload.vehicleType =
          formData.vehicleType.toUpperCase()

        payload.vehicleValue =
          Number(formData.vehicleValue)
      }

      await createPolicy(
        '/policies',
        payload
      )

      toast.success(
        'Policy created successfully 🎉'
      )

      navigate('/')

    } catch (error) {

      console.error(error)

      toast.error(
        error?.message ||
        'Failed to create policy'
      )
    }
  }

  // Premium Estimate
  const getPremiumEstimate = () => {

    try {

      const coverage =
        parseFloat(formData.coverageAmount) || 0

      let rate = 0.005

      if (
        formData.type === 'LIFE' &&
        formData.age
      ) {

        rate += (
          parseInt(formData.age) / 1000
        )

      } else if (
        formData.type === 'HEALTH'
      ) {

        rate = 0.008

      } else if (
        formData.type === 'VEHICLE'
      ) {

        rate = 0.02
      }

      return Math.round(
        coverage * rate
      )

    } catch {

      return 0
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">

      {/* Header */}
      <div className="flex items-center mb-12">

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 mr-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />

          <span>
            Back to Dashboard
          </span>
        </button>

        <div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            New Insurance Policy
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Fill in details to create policy
          </p>

        </div>

      </div>

      {/* Form */}
      <div className="glass p-8 rounded-3xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Policy Type */}
          <div>

            <label className="block mb-2 font-medium">
              Policy Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-gray-800"
            >
              <option value="LIFE">
                Life Insurance
              </option>

              <option value="HEALTH">
                Health Insurance
              </option>

              <option value="VEHICLE">
                Vehicle Insurance
              </option>

            </select>

          </div>

          {/* Policy Holder */}
          <div>

            <label className="block mb-2 font-medium">
              Policy Holder Name
            </label>

            <input
              type="text"
              name="policyHolder"
              value={formData.policyHolder}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-gray-800"
              placeholder="Enter name"
            />

            {errors.policyHolder && (
              <p className="text-red-500 text-sm mt-1">
                {errors.policyHolder}
              </p>
            )}

          </div>

          {/* Coverage Amount */}
          <div>

            <label className="block mb-2 font-medium">
              Coverage Amount
            </label>

            <input
              type="number"
              name="coverageAmount"
              value={formData.coverageAmount}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-gray-800"
              placeholder="Enter amount"
            />

            {errors.coverageAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverageAmount}
              </p>
            )}

          </div>

          {/* Age */}
          {formData.type === 'LIFE' && (

            <div>

              <label className="block mb-2 font-medium">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border dark:bg-gray-800"
                placeholder="Enter age"
              />

              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age}
                </p>
              )}

            </div>

          )}

          {/* Health Conditions */}
          {formData.type === 'HEALTH' && (

            <div>

              <label className="block mb-2 font-medium">
                Pre Existing Conditions
              </label>

              <input
                type="text"
                name="preExistingConditions"
                value={formData.preExistingConditions}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border dark:bg-gray-800"
                placeholder="Diabetes, BP etc"
              />

            </div>

          )}

          {/* Vehicle Fields */}
          {formData.type === 'VEHICLE' && (

            <>

              <div>

                <label className="block mb-2 font-medium">
                  Vehicle Type
                </label>

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border dark:bg-gray-800"
                >
                  <option value="CAR">
                    CAR
                  </option>

                  <option value="BIKE">
                    BIKE
                  </option>

                  <option value="TRUCK">
                    TRUCK
                  </option>

                </select>

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Vehicle Value
                </label>

                <input
                  type="number"
                  name="vehicleValue"
                  value={formData.vehicleValue}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border dark:bg-gray-800"
                  placeholder="Vehicle value"
                />

              </div>

              {errors.vehicle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehicle}
                </p>
              )}

            </>

          )}

          {/* Premium Estimate */}
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-gray-800">

            <p className="text-lg font-semibold">
              Estimated Premium:
            </p>

            <p className="text-3xl font-bold text-indigo-600">
              ₹{getPremiumEstimate()}
            </p>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl hover:scale-[1.01] transition-all duration-300"
          >

            <CheckIcon className="w-5 h-5" />

            {loading
              ? 'Creating Policy...'
              : 'Create Policy'}

          </button>

        </form>

      </div>

    </div>
  )
}

export default AddPolicy