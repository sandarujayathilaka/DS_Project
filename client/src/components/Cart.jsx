import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "@/api/build-client";
import Footer from "./Footer";
import NavBar from "./Navbar";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    api
      .get("/cart/getcartitem")
      .then((response) => {
        setCartItems(response.data.course);
        console.log(response.data.course);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const handleRemoveItem = (itemId) => {
    console.log(itemId);
    api
      .delete(`/cart/deleteitem/${itemId}`)
      .then((response) => {
        console.log("Item removed successfully");
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  const handleCheckout = () => {
    api
      .post("/order", { courses: cartItems })
      .then((response) => {
        const { url } = response.data;
        if (url) {
          setCheckoutUrl(url);
          window.location.href = url; // Redirect to checkout URL
        }
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  };

  // Calculate total cost
  const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-10">
        <div className="sm:flex shadow-md my-10">
          <div className="w-full sm:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cartItems.length} Items
              </h2>
            </div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50"
              >
                <div className="md:w-4/12 2xl:w-1/4 w-full">
                  <img
                    src={item.image}
                    alt="Black Leather Purse"
                    className="h-full object-center object-cover md:block hidden"
                  />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                    {item.title}
                  </p>
                  <p className="text-xs leading-3 text-gray-600 pt-2">
                    {item.author}
                  </p>
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex itemms-center">
                      <p
                        className="text-xs leading-3 underline text-red-500 cursor-pointer"
                        onClick={() => handleRemoveItem(item.courseId)} // Call handleRemoveItem with item id
                      >
                        Remove
                      </p>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>

            <div className="mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalCost}</span>
              </div>
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
