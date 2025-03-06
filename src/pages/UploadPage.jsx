import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
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
      navigate("/login"); // Redirect if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://secrets-of-flowers-site.onrender.com/images");
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://secrets-of-flowers-site.onrender.com/upload", formData, {
        headers: { Authorization: token },
      });
      setImages([...images, res.data]);
      setTitle("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    isAuthenticated && (
      <div className="min-h-screen font-quicksand bg-[#e0cca4] text-gray-900 pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-32">
          <h1 className="text-4xl text-center text-[#544265] mb-8">Upload New Listing</h1>

          {/* Upload Form */}
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#544265]">
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

          {/* Display Images */}
          <h2 className="text-3xl text-center text-[#544265] mt-12">Available Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {images.map((img) => (
              <div
                key={img._id}
                className="bg-white p-4 rounded-lg shadow-lg border border-[#544265] cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`/artwork/${img._id}`)}
              >
                <img src={img.imageUrl} alt={img.title} className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-2 text-center">{img.title}</h2>
                <p className="text-gray-700 text-center">€{img.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
