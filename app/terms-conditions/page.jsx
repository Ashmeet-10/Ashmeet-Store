import React from 'react'

const page = () => {
  return (
    <div className='mx-auto min-h-[90vh] max-w-5xl px-4'>
      <h1 className='my-6 text-6xl font-bold lg:mb-10 lg:mt-12 xl:mt-16 xl:text-7xl'>
        Terms and Conditions
      </h1>

      <div className='flex flex-col text-xl space-y-4 text-gray-600 xl:text-2xl'>
        <p>
          Welcome to Ashmeet Store. By accessing and using our
          website, you agree to comply with and be bound by the following terms
          and conditions. If you disagree with any part of these terms, please
          do not use our website.
        </p>

        <h2 className='font-semibold text-black'>Use of Website</h2>
        <p>
          The content of this website is for general information and use only.
          It is subject to change without notice.
        </p>

        <h2 className='font-semibold text-black'>Intellectual Property</h2>
        <p>
          All content, design, graphics, and text on this website are the
          intellectual property of Ashmeet Store and may not be
          reproduced without permission.
        </p>

        <h2 className='font-semibold text-black'>Product Descriptions</h2>
        <p>
          We strive to provide accurate product descriptions, but we do not
          warrant that product information is error-free or complete. Please
          review the product details before making a purchase.
        </p>

        <h2 className='font-semibold text-black'>Limitation of Liability</h2>
        <p>
          Ashmeet Store is not liable for any direct, indirect,
          incidental, consequential, or special damages arising from the use of
          our products or website.
        </p>

        <h2 className='font-semibold text-black'>Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Ashmeet Store
          from any claims, damages, liabilities, and expenses arising from your
          use of the website or any violation of these terms.
        </p>

        <h2 className='font-semibold text-black'>Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these terms and conditions at
          any time. Please review this page periodically to stay informed of any
          changes.
        </p>

        <h2 className='font-semibold text-black'>Contact Us</h2>
        <p>
          If you have any questions about our Terms and Conditions, please{' '}
          <a href='/contact'>contact us</a>.
        </p>

        <p>Last updated: 6 Aug 2023</p>
      </div>
    </div>
  )
}

export default page
