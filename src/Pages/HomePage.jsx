import React from "react";
import Logo from "../assets/Logo3.png";
import { useNavigate } from "react-router-dom";
import Truck from "../assets/Truck.jpg";
import Layout from "../Components/Layouts";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-10 py-10 gap-10 max-w-7xl mx-auto">
        <div className="bg-black text-white p-6 sm:p-10 rounded-2xl max-w-xl w-full">
          <h1 className="text-3xl sm:text-5xl font-bold">
            Welcome to BharatBenz!
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed">
            BharatBenz trucks and buses are tailored for India by Daimler Truck
            AG, the world’s leading CV manufacturer. Engineered with globally
            proven technology, the best-in-class safety, unmatched reliability,
            and the lowest total cost of ownership, BharatBenz leads the
            transformation in the Indian CV Industry.
          </p>
        </div>
        <div className="w-full max-w-xl">
          <img
            src={Truck}
            alt="Truck"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 max-w-7xl mx-auto px-4 sm:px-10">
        <button
          className="bg-gray-500 text-white text-xl w-60 py-3 rounded-full hover:bg-gray-600"
          onClick={() => navigate("/upload")}
        >
          Upload
        </button>
        <button
          className="bg-gray-500 text-white text-xl w-60 py-3 rounded-full hover:bg-gray-600"
          onClick={() => navigate("/chat")}
        >
          View
        </button>
      </div>
    </Layout>
  );
}

export default HomePage;
