import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";
import paypal from "@paypal/checkout-server-sdk";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: ["https://newsyd04.github.io", "https://your-frontend.com"], // Add allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Image Schema
const ImageSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imageUrl: String,
  paypalOrderId: String,
});
const Image = mongoose.model("Image", ImageSchema);

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Define Booking Schema
const BookingSchema = new mongoose.Schema({
    date: String,
    time: String,
    email: String,
  });
  const Booking = mongoose.model("Booking", BookingSchema);

// Middleware to Protect Routes
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ✅ **Fix: Move `multer` Configuration Up**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// **Signup Route**
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

// **Login Route**
app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        console.log("❌ Missing username or password");
        return res.status(400).json({ message: "Username and password are required" });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        console.log("❌ User not found:", username);
        return res.status(400).json({ message: "User not found" });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        console.log("❌ Invalid password for user:", username);
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      console.log("✅ Login successful for user:", username);
      res.json({ token });
  
    } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  });  

// **Protect Upload Route**
app.post("/upload", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.v2.uploader.upload(file.path);
    const newImage = new Image({ title, price, imageUrl: result.secure_url });
    await newImage.save();
    fs.unlinkSync(file.path);

    res.status(200).json(newImage);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});

// PayPal API Setup (ES Modules)
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// **Create PayPal Order**
app.post("/create-paypal-order", async (req, res) => {
  try {
    const { title, price } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "EUR", value: price },
          description: title,
          custom_id: `artwork-${Date.now()}`,
          invoice_id: `INV-${Date.now()}`,
          items: [
            {
              name: title,
              unit_amount: { currency_code: "EUR", value: price },
              quantity: 1,
            },
          ],
        },
      ],
    });

    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    console.error("PayPal Order Creation Error:", error);
    res.status(500).send("Error creating PayPal order");
  }
});

// **Fetch All Images**
app.get("/images", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

// **Fetch Single Artwork**
app.get("/images/:id", async (req, res) => {
  try {
    const artwork = await Image.findById(req.params.id);
    if (!artwork) return res.status(404).json({ message: "Artwork not found" });
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artwork", error: error.message });
  }
});

// Booking Route
app.post("/book", async (req, res) => {
    const { date, time, email } = req.body;
  
    // Save Booking in MongoDB
    const newBooking = new Booking({ date, time, email });
    await newBooking.save();
  
    // Send Notification to Website Owner
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
    });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: "newsyd04@gmail.com",
      subject: "New Booking Received",
      text: `New Booking on ${date} at ${time} by ${email}`,
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email Error:", err);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.json({ message: "Booking confirmed! Email sent to the owner." });
    });
  });

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
