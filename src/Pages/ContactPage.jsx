import React from "react";
import Layout from "../Components/Layouts";

function ContactPage() {
  return (
    <Layout>
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-10 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            At BharatBenz we believe in transparent communication and have built
            various touchpoints through which our customers can get in touch
            with us.
          </p>
        </div>

        {/* Address Section */}
        <div className="flex flex-col md:flex-row justify-around gap-8">
          <div className="bg-gray-500 p-8 rounded-2xl flex-1 max-w-xl">
            <h2 className="text-3xl font-semibold mb-3">Corporate Office</h2>
            <h3 className="text-xl font-bold mb-2">
              Daimler India Commercial Vehicles Pvt. Ltd.,
            </h3>
            <p>
              RMZ Millennia Business Park Campus II, Building 2A, 10th Floor
              No.143, Dr, MGR Main Rd, Kandhanchavadi, Perungudi, Chennai, Tamil
              Nadu 600096
            </p>
          </div>
          <div className="bg-gray-500 p-8 rounded-2xl flex-1 max-w-xl">
            <h2 className="text-3xl font-semibold mb-3">Registered Office</h2>
            <h3 className="text-xl font-bold mb-2">
              Daimler India Commercial Vehicles Pvt. Ltd.,
            </h3>
            <p>
              Oragadam, Sriperumbudur, Singaperumalkoil Sriperumbadur, Ambattur
              Red Hills Rd, Kanchipuram, Tamil Nadu 602105
            </p>
          </div>
        </div>

        {/* Toll Free Section */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-6 mt-12 mr-0 sm:mr-20">
          <p className="text-2xl font-semibold">Toll Free</p>
          <p className="text-5xl font-bold">1800 300 12345</p>
        </div>
      </div>
    </Layout>
  );
}

export default ContactPage;
