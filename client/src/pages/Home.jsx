import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";
import userIcon from "../assets/user.png";
import courseIcon from "../assets/course.png";
import tutorIcon from "../assets/tutor.png";
import packageIcon from "../assets/packages.png";
import it from "../assets/f1.jpg";
import ds from "../assets/f2.jpg";
import se from "../assets/f3.jpg";
import cs from "../assets/f4.jpeg";
import footer from "../components/Footer";
import Footer from "../components/Footer";
import api from "@/api/build-client";
import toast from "react-hot-toast";
import useUserStore from "@/stores/auth";

export default function Home() {
  // Define an array of images
  const images = [Image1, Image2, Image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await api.get("/courses?status=published");
        console.log(response.data.courses);
        setCourseData(response.data.courses);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCourseData();
  }, []);

  // Function to switch to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Set interval to change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = async (courseId, title, price, chapters, image) => {
    try {
      const response = await api.post("/cart/addcart", {
        course: {
          courseId,
          title,
          enrollStatus: "pending",
          qty: "1",
          price: price,
          chapters: chapters,
          note: "",
          image,
        },
      });
      toast.success("Course added to cart");
    } catch (error) {
      toast.error("Course Already in the cart");
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <section className="bg-slate-50 text-gray-800">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between lg:p-12 xl:p-16">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              Getting Quality<br></br>
              <span className="text-cyan-500">
                Education is Now<br></br>
              </span>
              More Easy
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              Explore a world of knowledge with us.
              <br />
              <br className="hidden md:inline lg:hidden" />
              From flexible courses to expert instructors, embark on your
              learning journey and unlock your full potential.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-teal-500 text-gray-50"
              >
                Courses
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold border rounded border-gray-800"
              >
                Join with Us
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-96 sm:h-96 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={images[currentImageIndex]}
              alt=""
              className="object-contain h-96 w-auto xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative mb-12 px-3 lg:mb-0 text-center">
            <div className="mb-8 flex justify-center mt-8">
              <span className="text-primary">
                <img src={userIcon} alt="User Icon" className="h-14 w-14" />
              </span>
            </div>
            <h5 className="mb-6 font-bold text-primary">1000+</h5>
            <h6 className="mb-0 font-bold dark:text-neutral-50">USERS</h6>
            <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
          </div>
          <div className="relative mb-12 px-3 lg:mb-0 text-center">
            <div className="mb-8 flex justify-center mt-8">
              <span className="text-primary">
                <img src={courseIcon} alt="Course Icon" className="h-14 w-14" />
              </span>
            </div>
            <h5 className="mb-6 font-bold text-primary">100+</h5>
            <h6 className="mb-0 font-bold dark:text-neutral-50">COURSES</h6>
            <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
          </div>
          <div className="relative mb-12 px-3 lg:mb-0 text-center">
            <div className="mb-8 flex justify-center mt-8 ">
              <span className="text-primary">
                <img src={tutorIcon} alt="Tutor Icon" className="h-14 w-14" />
              </span>
            </div>
            <h5 className="mb-6 font-bold text-primary">50+</h5>
            <h6 className="mb-0 font-bold dark:text-neutral-50">TUTORS</h6>
            <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
          </div>
          <div className="relative mb-12 px-3 lg:mb-0 text-center">
            <div className="mb-8 flex justify-center mt-8">
              <span className="text-primary">
                <img
                  src={packageIcon}
                  alt="Package Icon"
                  className="h-14 w-14"
                />
              </span>
            </div>
            <h5 className="mb-6 font-bold text-primary">10+</h5>
            <h6 className="mb-0 font-bold dark:text-neutral-50">PACKAGES</h6>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-12 bg-slate-50 text-gray-800">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Our Courses</h2>
            <p className="font-serif text-sm text-gray-600">
              Get Good Education and Be a Professional
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {user !== null && token !== null
              ? courseData?.slice(0, 4).map((course) => (
                  <article
                    key={course?._id}
                    className="rounded-lg shadow-md overflow-hidden bg-white"
                  >
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      aria-label="Te nulla oportere reprimique his dolorum"
                    >
                      <img
                        alt=""
                        className="object-cover w-full h-52 md:h-64 bg-gray-300"
                        src={course?.image?.url}
                      />
                    </a>
                    <div className="flex flex-col flex-1 p-6">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        aria-label="Te nulla oportere reprimique his dolorum"
                      >
                        <span className="text-lg font-bold tracking-wider uppercase hover:underline text-cyan-600">
                          ${course?.price}
                        </span>
                      </a>
                      <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                        {course?.title}
                      </h3>
                      <div className="flex flex-wrap justify-between items-center pt-3 space-x-2 text-gray-600">
                        <span>
                          {new Date(course?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <button
                          onClick={() =>
                            addToCart(
                              course?._id,
                              course?.title,
                              course?.price,
                              course?.chapters,
                              course?.image?.url
                            )
                          }
                          className="px-4 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              : courseData?.slice(0, 4).map((course) => (
                  <article
                    key={course?._id}
                    className="rounded-lg shadow-md overflow-hidden bg-white"
                  >
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      aria-label="Te nulla oportere reprimique his dolorum"
                    >
                      <img
                        alt=""
                        className="object-cover w-full h-52 md:h-64 bg-gray-300"
                        src={course?.image?.url}
                      />
                    </a>
                    <div className="flex flex-col flex-1 p-6">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        aria-label="Te nulla oportere reprimique his dolorum"
                      >
                        <span className="text-lg font-bold tracking-wider uppercase hover:underline text-cyan-600">
                          ${course?.price}
                        </span>
                      </a>
                      <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                        {course?.title}
                      </h3>
                      <div className="flex flex-wrap justify-between items-center pt-3 space-x-2 text-gray-600">
                        <span>
                          {new Date(course?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-12 bg-slate-50 text-gray-800">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
            <p className="inline-block px-3 py-px mb-4 text-3xl font-bold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
              Discover Our Team
            </p>
            <p className="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
          </div>
          <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
            <div>
              <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                <img
                  className="absolute object-cover w-full h-full rounded"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                  alt="Person"
                />
              </div>
              <div className="flex flex-col sm:text-center">
                <p className="text-lg font-bold">Oliver Aguilerra</p>
                <p className="mb-5 text-xs text-gray-800">Product Manager</p>
                <div className="flex items-center space-x-3 sm:justify-center">
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                <img
                  className="absolute object-cover w-full h-full rounded"
                  src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
              </div>
              <div className="flex flex-col sm:text-center">
                <p className="text-lg font-bold">Marta Clermont</p>
                <p className="mb-5 text-xs text-gray-800">Design Team Lead</p>
                <div className="flex items-center space-x-3 sm:justify-center">
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                <img
                  className="absolute object-cover w-full h-full rounded"
                  src="https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
              </div>
              <div className="flex flex-col sm:text-center">
                <p className="text-lg font-bold">Alice Melbourne</p>
                <p className="mb-5 text-xs text-gray-800">Human Resources</p>
                <div className="flex items-center space-x-3 sm:justify-center">
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                <img
                  className="absolute object-cover w-full h-full rounded"
                  src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
              </div>
              <div className="flex flex-col sm:text-center">
                <p className="text-lg font-bold">John Doe</p>
                <p className="mb-5 text-xs text-gray-800">Good guy</p>
                <div className="flex items-center space-x-3 sm:justify-center">
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-teal-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <Footer />
      </div>
    </div>
  );
}
