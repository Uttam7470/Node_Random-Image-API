import express from "express";
import fetch from "node-fetch";  // Add this import

const app = express();
let port = 6868;

const getRandomImage = async () => {
  try {
    let data = await fetch(
      "https://api.unsplash.com/photos/random/?client_id=9rgcbEAWzIQ2U4lzGcnqo7JCPAj95ojrF8NtFWZPgGY&count=1"
    );
    
    if (!data.ok) {
      throw new Error("Failed to fetch image");
    }

    let res = await data.json();
    return res[0].urls;
  } catch (error) {
    return { error: error.message };
  }
};

app.get("/api/image/random", async (req, res) => {
  try {
    const data = await getRandomImage();
    if (data.error) {
      res.status(500).json(data);
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
app.listen(port, () => {
  console.log("server is running on port" + port);
});
