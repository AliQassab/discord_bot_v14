import { OpenAI } from "openai";
import test from "node:test"
import assert from "assert";
import "dotenv/config";

test.describe("OpenAI Integration Tests", () => {
  test.it("should perform a chat completion or query successfully", async () => {
    try {
      // Initialize OpenAI with the API key from the environment variables
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const prompt = "How are you?";

      // Perform a chat completion or query
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
      });

      // Check if the response is received successfully
      assert(
        response.choices && response.choices.length > 0,
        "OpenAI response not received"
      );

      console.log("OpenAI integration test passed successfully!");
    } catch (error) {
      console.error("OpenAI integration test failed:", error);
      throw error; 
    }
  });
});
