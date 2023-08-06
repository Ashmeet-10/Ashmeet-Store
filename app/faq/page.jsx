const FAQPage = () => {
  return (
    <div className='mx-auto min-h-[90vh] max-w-5xl px-4'>
      <h1 className='my-6 text-6xl font-bold lg:mb-10 lg:mt-12 xl:mt-16 xl:text-7xl'>
        Frequently Asked Questions
      </h1>
      <div className='flex flex-col space-y-12 text-xl text-gray-600 xl:text-2xl'>
        <div className='space-y-6'>
          <h2 className='font-semibold text-black'>Orders and Shipping</h2>
          <p>
            <strong>Q: How can I place an order?</strong>
            <br />
            A: Placing an order is easy! Browse our wide selection of products,
            add the items you want to your cart, and then proceed to the
            checkout page. Follow the prompts to enter your shipping information
            and payment details. Once your order is confirmed, we'll start
            processing it right away.
          </p>

          <p>
            <strong>Q: How long does shipping usually take?</strong>
            <br />
            A: Shipping times can vary depending on your location and the
            shipping method you choose at checkout. Typically, orders are
            processed within 4 days and then shipped. You'll receive an email
            with a tracking number once your order is on its way, so you can
            easily monitor its progress.
          </p>

          <p>
            <strong>
              Q: Can I change my shipping address after placing an order?
            </strong>
            <br />
            A: Unfortunately, we're unable to change the shipping address once
            an order has been placed. Please double-check your shipping
            information before finalizing your purchase to ensure accurate
            delivery.
          </p>
        </div>

        <div className='space-y-6'>
          <h2 className='font-semibold text-black'>Returns and Refunds</h2>
          <p>
            <strong>Q: What's your return policy?</strong>
            <br />
            A: We want you to be completely satisfied with your purchase. If
            you're not, you can return items within 10 days of delivery. To
            initiate a return, contact our customer support team at
            ashmeet2846@gmail.com for further instructions.
          </p>

          <p>
            <strong>Q: How long does it take to process a refund?</strong>
            <br />
            A: Once we receive the returned items and inspect them, we'll
            initiate the refund process. Refunds are typically processed within
            5 business days. It might take a bit longer for the refunded amount
            to appear in your account, depending on your bank or payment method.
          </p>
        </div>

        <div className='space-y-6'>
          <h2 className='font-semibold text-black'>Account and Security</h2>
          <p>
            <strong>Q: Do I need an account to make a purchase?</strong>
            <br />
            A: While you can make purchases as a guest, we recommend creating an
            account. Having an account allows you to easily track your orders,
            view order history, and manage your shipping addresses for future
            purchases.
          </p>

          <p>
            <strong>Q: How do you protect my personal information?</strong>
            <br />
            A: Your privacy is important to us. We have security measures in
            place to protect your personal information. Our website uses
            encrypted connections to transmit sensitive data, and we adhere to
            industry best practices for data security. For more details, please
            review our Privacy Policy.
          </p>
        </div>

        <div className='space-y-6'>
          <h2 className='font-semibold text-black'>Contact Us</h2>
          <p>
            If you have a question that hasn't been answered here, don't
            hesitate to contact us. Our customer support team is here to assist
            you with any inquiries you may have.
          </p>
        </div>

        <p>Last updated: 6 Aug 2023</p>
      </div>
    </div>
  )
}

export default FAQPage
