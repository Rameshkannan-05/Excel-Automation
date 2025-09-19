import React from 'react'
import Layout from '../Components/Layouts'
import Banner from '../assets/About_banner.jpg'

function AboutPage() {
  return (
    <Layout>
      <div className="text-white mx-auto">
        <div className='m-10'>
          <h1 className='text-4xl ml-10'>About Us</h1>
          <p className='text-xl ml-10 mt-3'>
            Transforming Indian Commercial Vehicle Industry through Adaptive
            Mobility Solutions
          </p>
        </div>
        <div>
          <img src={Banner} alt="banner" />
        </div>
        <div className='text-xl m-20'>
          <p className='mt-5'>
            First unveiled in February 2011, BharatBenz celebrated its market
            launch in September 2012. Within Twelve years of our market entry,
            we delivered over 1,77,500+ BharatBenz trucks and buses to our
            customers, an unprecedented ramp-up in the Indian CV industry.
          </p>
          <p className='mt-10'>
            The BharatBenz brand offers a range of ultra-modern trucks in all
            weight categories from 10 to 55 tones. In addition to our portfolio
            of trucks, we also supply school and staff buses. These vehicles are
            specifically tailored for the Indian market.
          </p>
          <p className='mt-10'>
            BharatBenz trucks and buses are sold and serviced through a
            pan-Indian network of more than 300 touch points which is
            continuously expanded further also beyond the tier-2 and tier-3
            cities.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage