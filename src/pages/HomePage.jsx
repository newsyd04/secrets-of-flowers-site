"use client";
import React from "react";
import { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bg from "../assets/painting-bg.jpg"
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="h-screen w-full flex items-center z-0 justify-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="p-6 max-w-6xl mx-auto relative z-50 w-full text-center">
          <h1 className="text-5xl md:text-8xl font-ptsans font-extrabold text-gray-300 animate-fade-in">
            Secrets of Flowers
          </h1>
          <p className="mt-6 font-medium text-lg md:text-xl font-quicksand text-gray-100 max-w-2xl mx-auto leading-relaxed">
          🌸 Highlighting how much beauty is all around us <br/> in the natural world 🌻
          </p>
          <Link
            to="./photography"
            className="inline-block bg-[#8b9a71] hover:bg-[#858d6f] text-white px-10 font-quicksand py-4 mt-10 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition"
          >
            View My Photography
          </Link>
        </div>

        {/* Abstract Background Elements
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 opacity-30 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-300 opacity-40 rounded-full filter blur-xl animate-float-slower" /> */}

        {/* Scroll-down Icon */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50">
          <a
            href="#featured-section"
            className="flex items-center justify-center w-12 h-12 bg-gray-300 text-gray-900 rounded-full shadow-lg hover:bg-gray-400 transition"
          >
            <i className="fa-solid fa-arrow-down text-xl"></i>
          </a>
        </div>
      </div>

      {/* Featured Art Section */}
      <div id="featured-section" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">My Favourite Pieces</h2>
        <hr className="w-32 mx-auto border-t-4 border-gray-400 mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Abstract Landscape", img: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/356369589_278241328066250_7822698050456095495_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2_wSWUGeNuoQ7kNvgEVRBiR&_nc_oc=AdjCRpwzldmINwqIcU84vDyk3PPIwZVV5wHJ53Hqhj-wSRpPzsHA4CpTptgwH9IV_4o&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AlmpOrKspnVRFnoQz_OJhkQ&oh=00_AYBKvv2oLPZRu35sp9uEeuJAC2X_h8tTV-Ts8RCc1pDWaQ&oe=67B90024" },
            { title: "Surreal Dreams", img: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/475372301_628975702992809_8408071231963024023_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hRGMWUNfZ54Q7kNvgEMCLFP&_nc_oc=Adgnqm3lRFUOdv5YdSFucWx82YG2rgrgLFxxa5luQttiD3ppzjkKvusvhkx0lk9AH_g&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=A-dkM5bhcM66AgWkf0eXj14&oh=00_AYDEHlCGSZXV3niATNq_yWX4yDDWMBYC1cnmB2zNCkHvSA&oe=67B8CFCC" },
            { title: "Surreal Dreams", img: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/352210386_982611372920888_6957061309819647396_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ewazjylHxh4Q7kNvgF_FSUR&_nc_oc=AdhfPnhZ14xj4ob4vP4kZ9i6RJlkmwXJxdbmkfCwCQ_6aLZNj8AcDeJtTq2aH9hTz0Q&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AQbit6he0ZOW2aP5SZPZotF&oh=00_AYBURfmjgDDT2Ix-o2WLlYDhl5hSkPW40yOBBHyNXINgyw&oe=67B8F416" },
          ].map((art, index) => (
            <div key={index} className="relative group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-500">
              <img src={art.img} alt={art.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold">{art.title}</h3>
                <p className="text-gray-300 text-sm mt-2">Blending fantasy and reality to spark imagination.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
