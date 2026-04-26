import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import SEO from "../components/SEO";

const FLOWERS_URL = "https://webdev-backends.onrender.com/flowers";
const COLLECTIONS = ["The Joy", "Hope", "Sage", "Heart and Soul", "The Irish Boreen"];

export default function UploadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [frameToggles, setFrameToggles] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
    fetchImages();
    axios.get(`${FLOWERS_URL}/frames`).then((res) => setFrameToggles(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${FLOWERS_URL}/images`);
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const toggleFrame = async (name) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${FLOWERS_URL}/frames/${name}/toggle`,
      {},
      { headers: { Authorization: token } }
    );
    const res = await axios.get(`${FLOWERS_URL}/frames`);
    setFrameToggles(res.data);
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

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${FLOWERS_URL}/upload`, formData, {
        headers: { Authorization: token },
      });
      setImages((prev) => [...prev, res.data]);
      setTitle("");
      setPrice("");
      setCollection("");
      setImage(null);
      e.target.reset?.();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${FLOWERS_URL}/images/${id}`, {
        headers: { Authorization: token },
      });
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen">
      <SEO title="Upload Panel" />

      <PageHeader
        eyebrow="Admin"
        title="Upload Panel"
        description="Add new listings, manage frame availability, and curate the public gallery."
      />

      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-white rounded-2xl border border-sage-100 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-ink-900">New listing</h2>
            <p className="mt-1 text-sm text-ink-700/70">
              Cloudinary handles the image upload — large files are fine.
            </p>

            <form onSubmit={handleUpload} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-ink-700">Title</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Artwork title"
                  required
                  className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink-700">Price (€)</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="80"
                  required
                  className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink-700">Collection</span>
                <select
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                >
                  <option value="">Select collection…</option>
                  {COLLECTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink-700">Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  className="mt-2 w-full text-sm text-ink-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                />
              </label>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={uploading}
              >
                {uploading ? "Uploading…" : "Upload listing"}
              </Button>
            </form>
          </div>

          {/* Frame toggles */}
          <div className="bg-white rounded-2xl border border-sage-100 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-ink-900">Frame availability</h2>
            <p className="mt-1 text-sm text-ink-700/70">
              Toggle frames on or off for the public artwork pages.
            </p>

            <div className="mt-6 space-y-2">
              {Object.entries(frameToggles).length === 0 ? (
                <p className="text-sm text-ink-700/60">No frames loaded.</p>
              ) : (
                Object.entries(frameToggles).map(([name, available]) => (
                  <div
                    key={name}
                    className="flex justify-between items-center border border-sage-100 rounded-xl px-4 py-3 bg-cream-50"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          available ? "bg-sage-500" : "bg-ink-700/30"
                        }`}
                      />
                      <span className="text-ink-900 font-medium">{name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFrame(name)}
                      className={`px-4 py-1.5 text-sm font-semibold rounded-full transition ${
                        available
                          ? "bg-ink-700/10 text-ink-900 hover:bg-ink-700/20"
                          : "bg-sage-500 text-white hover:bg-sage-600"
                      }`}
                    >
                      {available ? "Disable" : "Enable"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Listings */}
      <Section tone="white">
        <div className="text-center mb-10">
          <p className="text-sage-600 text-xs uppercase tracking-[0.2em] mb-3">
            Live listings
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Uploaded artwork ({images.length})
          </h2>
          <span className="block w-16 h-[3px] bg-sage-400 rounded-full mt-4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden bg-cream-100">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-ink-900">{img.title}</h3>
                <p className="text-sm text-ink-700/70 mt-1">€{img.price}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-sage-700 mt-2">
                  {img.collection}
                </p>
                <button
                  type="button"
                  onClick={() => deleteImage(img._id)}
                  className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-red-200 text-red-700 hover:bg-red-50 transition"
                >
                  <i className="fa-solid fa-trash text-xs" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
