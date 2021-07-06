import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 p-8">
      <div className="bg-primary-800 w-full px-6 py-4 rounded-lg flex justify-between">
        <div>
          <span className="text-sm">Starnet v0.0.5</span>
        </div>
        <div>
          <span className="text-sm">14:23:43 UTC+1</span>
        </div>
      </div>
      <div className="flex">
        <div className="mt-5 bg-primary-800 w-3/12 px-6 py-4 rounded-lg text-center">
          <h1>04:20</h1>
          <span className="text-sm">Sunrise Time</span>
        </div>
        <div className="mt-5 bg-primary-800 w-3/12 px-6 py-4 rounded-lg text-center ml-5">
          <h1>22:51</h1>
          <span className="text-sm">Sunset Time</span>
        </div>
      </div>
    </div>
  )
}
