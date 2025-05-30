import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuthStatus();
    fetchImages();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  };

  const [frameToggles, setFrameToggles] = useState({});

  useEffect(() => {
    axios.get(`${flowersUrl}/frames`).then((res) => setFrameToggles(res.data));
  }, []);

  const toggleFrame = async (name) => {
    const token = localStorage.getItem("token");
    await axios.put(`${flowersUrl}/frames/${name}/toggle`, {}, {
      headers: { Authorization: token },
    });
    const res = await axios.get(`${flowersUrl}/frames`);
    setFrameToggles(res.data);
  };

  // Use environment variable or fallback to the deployed master server URL with /flowers prefix
  const baseUrl = "https://webdev-backends.onrender.com";
  const flowersUrl = `${baseUrl}/flowers`;

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${flowersUrl}/images`);
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");
    if (!collection) return alert("Please select a collection!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("collection", collection);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${flowersUrl}/upload`, formData, {
        headers: { Authorization: token },
      });
      setImages([...images, res.data]);
      setTitle("");
      setPrice("");
      setCollection("");
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const deleteImage = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${flowersUrl}/images/${id}`, {
      headers: { Authorization: token },
    });
    setImages(images.filter((img) => img._id !== id));
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

  return (
    isAuthenticated && (
      <div className="min-h-screen font-quicksand bg-[#e0cca4] text-gray-900 pt-32 p-16">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Upload Form */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-[#544265]">
          <h1 className="text-4xl text-center text-[#544265] mb-12">Upload Panel</h1>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Artwork Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#544265]"
                required
              />
              <input
                type="number"
                placeholder="Price (€)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#544265]"
                required
              />
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#544265]"
                required
              >
                <option value="">Select Collection</option>
                {["The Joy", "Hope", "Sage", "Heart and Soul", "The Irish Boreen"].map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#544265] text-white py-3 rounded-md font-semibold hover:bg-[#6a547a] transition"
              >
                Upload Listing
              </button>
            </form>
          </div>

          {/* Frame Toggle Panel */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-[#544265]">
            <h2 className="text-2xl font-bold text-[#544265] mb-4">Toggle Frame Availability</h2>
            <div className="space-y-3">
              {Object.entries(frameToggles).map(([name, available]) => (
                <div key={name} className="flex justify-between items-center border p-3 rounded-md">
                  <span className="font-medium text-gray-800">{name}</span>
                  <button
                    onClick={() => toggleFrame(name)}
                    className={`px-4 py-2 rounded text-white font-semibold ${
                      available ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } transition`}
                  >
                    {available ? "Disable" : "Enable"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Uploaded Listings Styled Like Upload Panel */}
        <div className="mt-20 max-w-7xl mx-auto">
          <h2 className="text-4xl text-center text-[#544265] mb-10">Uploaded Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img) => (
              <div
                key={img._id}
                className="bg-white border border-[#544265] rounded-lg shadow-lg p-6 flex flex-col justify-between"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-56 object-cover rounded-md mb-4 border border-gray-200"
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#544265]">{img.title}</h3>
                  <p className="text-gray-700 font-medium">€{img.price}</p>
                  <p className="text-sm text-gray-500 italic">{img.collection}</p>
                </div>
                <button
                  onClick={() => deleteImage(img._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
