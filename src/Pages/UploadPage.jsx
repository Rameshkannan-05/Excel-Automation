import React from "react";
import Layout from "../Components/Layouts";

function UploadPage() {
  return (
    <Layout>
      <div className="flex justify-center px-4 sm:px-10">
        <div className="w-full max-w-7xl rounded-2xl">
          <div className="container px-2 sm:px-6 py-8 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              Upload File
            </h1>

            <p className="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6 dark:text-gray-300">
              Upload .xlsx or .csv files with respective forms
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 xl:mt-12">
              {["Small", "Medium", "Large"].map((size) => (
                <div
                  key={size}
                  className="w-full p-6 sm:p-8 space-y-6 text-center border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-500 hover:border-amber-400 hover:shadow-lg hover:scale-105 transform transition duration-300 hover:bg-gray-400"
                >
                  <p className="font-medium text-black uppercase">{size}</p>
                  <p>upload {size.toLowerCase()} sized files</p>
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    className="w-full px-4 py-2 mt-3 text-white bg-black rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UploadPage;
