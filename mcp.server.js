import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

// Add an addition tool
server.registerTool(
  "addTowNumbers",
  {
    title: "Add Two Numbers",
    description: "Adds two numbers together and returns the result.",
    inputSchema: z.object({
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    }),
  },
  async ({ a, b }) => {
    return {
      content: [{ type: "text", text: String(a + b) }],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
