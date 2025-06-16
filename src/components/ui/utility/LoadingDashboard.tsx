import React from 'react'

const LoadingSkeleton = () => {
  return (
    <main className="flex min-h-screen flex-col px-16 py-12">
        <div role="status" className="w-full animate-pulse">
            <div className="box mb-4 p-6 flex flex-col gap-y-5 rounded-xl bg-white">
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <span className="sr-only">Loading...</span>
            </div>
            <div className="box mb-4 p-6 flex flex-col gap-y-5 rounded-xl bg-white">
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-400 w-64"></div>
                    <span className="sr-only">Loading...</span>
            </div>
        </div>
    </main>
  )
}

export default LoadingSkeleton