import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const promptTemplate = PromptTemplate.fromTemplate(`
    explain {topic} in very simple way like ELI5,
    make sure to include the core concepts and avoid unnecessary jargon.
    make the answer as concise as possible.
    `);

promptTemplate
  .pipe(model)
  .invoke({ topic: "deep learning" })
  .then((response) => {
    console.log(response.content);
  });

// pipe means model ke andar promptTemplata ke output ko feed kar dena.
