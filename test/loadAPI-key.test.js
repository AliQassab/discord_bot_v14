import dotenv from "dotenv";
import assert from "assert";
import test from "node:test";


dotenv.config({ path: ".env" });

test.describe("API Key Loading Test", () => {
  test.it("should load the API key from environment variables", () => {
    try {
      
      assert(
        process.env.OPENAI_API_KEY,
        "API key is not loaded from environment variables"
      );
      console.log("API key loaded successfully!");
    } catch (error) {
      console.error("Failed to load API key:", error);
      throw error; 
    }
  });
});
