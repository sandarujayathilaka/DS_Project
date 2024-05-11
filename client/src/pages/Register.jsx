import React, { useState } from 'react';


export default function Register() {

    const [optionsVisible, setOptionsVisible] = useState(false);

    const showDropdownOptions = () => {
        setOptionsVisible(!optionsVisible);
    };

  return (
    <div>
        
        <div class="flex justify-center items-center w-screen h-100 bg-white">


            <div class="container mx-auto my-4 px-4 lg:px-20">

                <div class="w-full p-8 my-4 md:px-12 lg:w-12/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                    <div class="flex">
                        <h1 class="font-bold uppercase text-5xl">Join with Us</h1>
                    </div>
                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                        <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="First Name*" />
                        <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Last Name*" />
                        <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="email" placeholder="Email*" />
                        <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="number" placeholder="Phone*" />
                        <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Password*" />
                        <input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Conform Password*" />

                    <div className="flex flex-row pt-4 bg-white">
                        <div>
                            <button
                                onClick={showDropdownOptions}
                                className="flex flex-row justify-between w-full text-gray-600 bg-gray-100 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline">
                                    <span className="select-none  text-gray-500 text-sm">Select the Role</span>
                                        <svg
                                            className={optionsVisible ? "hidden w-6 h-6 stroke-current" : "w-6 h-6 stroke-current"}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                        <svg
                                            className={!optionsVisible ? "hidden w-6 h-6 stroke-current" : "w-6 h-6 stroke-current"}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                        </button>
                                        <div
                                            id="options"
                                             className={optionsVisible ? "w-48 py-2 mt-2 bg-white rounded-lg shadow-xl" : "hidden"}
                                        >
                                            <a href="#" className="block px-4 py-2 text-gray-800 text-sm hover:bg-teal-500 hover:text-white">Learner</a>
                                             <a href="#" className="block px-4 py-2 text-gray-800 text-sm hover:bg-teal-500 hover:text-white">Tutor</a>
                                            <a href="#" className="block px-4 py-2 text-gray-800 text-sm hover:bg-teal-500 hover:text-white">Admin</a>
                                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="my-4">
                            <textarea placeholder="Address*" class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="my-2 w-1/2 lg:w-1/4">
                        <button class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                            focus:outline-none focus:shadow-outline">Sign Up</button>
                    </div>
                </div>

                    
            </div>
        </div>



    </div>
  )
}
