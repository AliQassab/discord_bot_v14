import "dotenv/config";
export const imagesGenerator = async (prompt) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "256x256",
        }),
      }
    );

    const data = await response.json();
    if (data && data.data && data.data.length > 0) {
      const imageURL = data.data[0].url;
      return imageURL;
    } else {
      console.error("No data or empty data array received from the API.");
    }
    
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
