"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function ArtworkPage() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [size, setSize] = useState("Small");
  const [frame, setFrame] = useState("Unframed");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://secrets-of-flowers-site.onrender.com/images/${id}`)
      .then((res) => {
        setArtwork(res.data);
        setPrice(res.data.price);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artwork:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Price Calculation
  useEffect(() => {
    let newPrice = artwork?.price || 0;
    if (size === "Medium") newPrice += 10;
    if (size === "Large") newPrice += 20;
    if (frame !== "Unframed") newPrice += 30;
    setPrice(newPrice);
  }, [size, frame, artwork]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-gray-500">
        Loading...
      </div>
    );
  if (!artwork)
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-red-500">
        Artwork not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#4986a0] py-32 text-gray-900 flex items-center justify-center px-6 lg:px-12">
      <div className="max-w-5xl w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-10 transition-transform duration-300">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full max-h-[500px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 flex flex-col justify-center text-left space-y-6">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            {artwork.title}
          </h1>

          {/* Size Selection */}
          <div>
            <label className="block font-medium text-gray-700">Size</label>
            <select
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="Small">Small (Standard)</option>
              <option value="Medium">Medium (+€10)</option>
              <option value="Large">Large (+€20)</option>
            </select>
          </div>

          {/* Framing Selection */}
          <div>
            <label className="block font-medium text-gray-700">Framing</label>
            <select
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={frame}
              onChange={(e) => setFrame(e.target.value)}
            >
              <option value="Unframed">Unframed (Free Shipping)</option>
              <option value="Black Frame">Black Frame (+€30)</option>
              <option value="White Frame">White Frame (+€30)</option>
              <option value="Wood Frame">Wood Frame (+€30)</option>
            </select>
          </div>

          {/* Final Price */}
          <p className="text-2xl font-medium text-gray-700">
            Total: €{price}
          </p>
          <p className="text-gray-600 leading-relaxed text-md">
            Own a piece of artistic elegance. Secure this exclusive artwork today.
          </p>

          {/* PayPal Button */}
          <div className="mt-6">
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AWJq9D-sX8yvXcJO3DM39E-N8UcKVQ_D3XPuqDllvg0gsEJNK_kjOcdf74gpSAvrG3sp0Wcbja8ERmrv",
                currency: "EUR",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "horizontal",
                  color: "black",
                  shape: "pill",
                  label: "checkout",
                }}
                createOrder={async () => {
                  const response = await axios.post(
                    "https://secrets-of-flowers-site.onrender.com/create-paypal-order",
                    {
                      title: artwork.title,
                      price: price,
                      size,
                      frame,
                    }
                  );
                  return response.data.id;
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  alert(`Transaction completed by ${details.payer.name.given_name}`);
                  console.log("Transaction Details:", details);
                  console.log("Buyer Email:", details.payer.email_address);
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
