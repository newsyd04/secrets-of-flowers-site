import bcrypt from "bcryptjs";

async function generateHash() {
  const hash = await bcrypt.hash("password123", 10);
  console.log(hash);
}

generateHash();
