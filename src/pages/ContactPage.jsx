"use client";
import React from "react";
import { useEffect } from "react";

export default function ContactPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-quicksand bg-[#abbd9a] py-48 px-6 flex items-center justify-center">
      <div className="max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h1>
        <p className="text-lg font-bold text-gray-700 mt-2 mb-8">
        Reach out to me for inquiries about photography sessions, collaborations, or print sales. I'd love to hear from you!
        </p>

        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <i className="fa-solid fa-phone text-2xl text-[#B2BAC4]"></i>
            <p className="text-xl font-semibold text-gray-800">+123-456-7890</p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <i className="fa-solid fa-envelope text-2xl text-[#B2BAC4]"></i>
            <p className="text-xl font-semibold text-gray-800">mairead@secretsofflowers.com</p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <i className="fa-solid fa-map-marker-alt text-2xl text-[#B2BAC4]"></i>
            <p className="text-xl font-semibold text-gray-800">Tralee, Co. Kerry</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-[#B2BAC4] text-2xl hover:text-[#9594A0] transition">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" className="text-[#B2BAC4] text-2xl hover:text-[#9594A0] transition">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="text-[#B2BAC4] text-2xl hover:text-[#9594A0] transition">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
