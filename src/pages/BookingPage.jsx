import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export default function BookingPage() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");

  const handleBooking = async () => {
    try {
      const res = await axios.post("https://secrets-of-flowers-site.onrender.com/book", { date, time, email });
      alert(res.data.message);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="min-h-screen font-quicksand py-32 bg-[#abbd9a] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Section: Booking Info */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-[#544265] mb-4">Nature Photography Walks</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Immerse yourself in the beauty of nature with guided photography walks. 
            Learn how to capture stunning landscapes, intricate details of flowers, 
            and the vibrant colors of the wild.
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Whether you're a beginner or an experienced photographer, these walks 
            offer a unique opportunity to develop your skills while embracing the 
            tranquility of the outdoors.
          </p>
          <p className="mt-6 text-xl font-semibold text-[#544265]">
            📅 Book your slot today!
          </p>
        </div>

        {/* Right Section: Booking Form */}
        <div className="p-8 border-l border-gray-200">
          <h1 className="text-3xl font-bold text-center text-[#544265] mb-6">Book a Slot</h1>

          <Calendar onChange={setDate} value={date} className="w-full mb-4 border rounded-lg shadow-sm" />

          <label className="block font-medium text-gray-700 mt-4">Select Time</label>
          <select
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Choose Time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
          </select>

          <label className="block font-medium text-gray-700 mt-4">Your Email</label>
          <input
            type="email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full bg-[#544265] text-white py-3 mt-6 rounded-lg font-semibold hover:bg-[#6a547a] transition"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>

      </div>
    </div>
  );
}
