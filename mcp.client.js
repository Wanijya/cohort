import { config } from "dotenv";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { GoogleGenAI, Type } from "@google/genai";

config();

const tools = [];

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

const transport = new StdioClientTransport({
  command: "node",
  args: ["mcp.server.js"],
});

const client = new Client({
  name: "example-client",
  version: "1.0.0",
});

await client.connect(transport);

client.listTools().then(async (response) => {
  response.tools.forEach((tool) => {
    tools.push({
      name: tool.name,
      description: tool.description,
      parameters: {
        type: "OBJECT",
        properties: tool.inputSchema,
        required: tool.inputSchema.required || [],
      },
    });
    console.log("Registered tool: ", tools);
  });

  const aiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Add 2 and 3",
    config: {
      tools: [
        {
          functionDeclarations: tools,
        },
      ],
    },
  });

  console.log("Ai response: ", aiResponse.functionCalls);

  aiResponse.functionCalls.forEach(async (call) => {
    const toolResponse = await client.callTool({
      name: call.name,
      arguments: call.args,
    });
    console.log("Tool response: ", toolResponse);
  });
});
