import React from "react";

const Contact = () => {
    return(

        <div className="container my-24 mx-auto md:px-6">
        
        <section className="mb-32">
            <div className="flex flex-wrap">
            <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
            <h2 className="mb-6 text-3xl font-bold">
              
              Get in Touch for Secure Healthcare Solutions
            </h2>
            <p className="mb-6 text-neutral-500 ">
              Have questions or need assistance? Contact us for reliable and
              secure healthcare solutions. Our team is ready to assist you with
              any inquiries or concerns you may have. Reach out via the contact
              form or connect with us directly using the information below. Your
              health is our priority, and we look forward to helping you with
              secure electronic health records.
            </p>
            <p className="mb-2 text-neutral-500 ">UIU, Dhaka, Bangladesh</p>
            <p className="mb-2 text-neutral-500 ">Office Hours: Monday to Friday, 9:00 AM - 5:00 PM </p>
            <p className="mb-2 text-neutral-500 ">Phone: +880 1234567890

</p>
            </div>
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
                <form>
                <div className="relative mb-6" data-te-input-wrapper-init>
                    <input type="text" id="first_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Your name"  required/>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                    <input type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Your email address"  required/>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                    
                    <textarea id="message" rows={4}
                                className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                placeholder="Your message"></textarea>
                    
                </div>
                
                <button  
                    className="mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 ">
                    Send
                </button>
                </form>
            </div>
            </div>
        </section>
        
        </div>
        
    );
}

export default Contact;