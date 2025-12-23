/**
 * Project Documentation
 *
 * Files covered:
 *  - mcp.server.js
 *  - mcp.client.js
 *  - .gitignore
 *
 * Purpose
 * -------
 * This small project demonstrates a local Model Context Protocol (MCP) server and a client
 * that discovers server-exposed tools and invokes them via an LLM (Google GenAI).
 * The transport between client and server uses standard input/output (stdio) so both
 * processes can run locally and communicate via spawned child process IO.
 *
 *
 * mcp.server.js
 * --------------
 * Purpose:
 *  - Creates an MCP server instance exposing reusable tools (functions) that clients
 *    can list and invoke.
 *  - Listens for MCP messages over a StdioServerTransport (reads from stdin, writes to stdout).
 *
 * Key exported/instantiated items and their definitions:
 *  - McpServer (instantiated as `server`)
 *    - A server object provided by @modelcontextprotocol/sdk/server/mcp.js.
 *    - Configured with:
 *      - name: "Demo" (human-readable identifier)
 *      - version: "1.0.0" (semantic version of the server's toolset/contract)
 *    - Responsibilities:
 *      - Manage registration of tools (name + metadata + handler).
 *      - Handle incoming MCP requests from transports and route them to tool handlers.
 *
 *  - server.registerTool(toolName, metadata, handler)
 *    - Registers a callable tool that remote clients can discover and invoke.
 *    - toolName: "addTowNumbers" (identifier used by clients when calling the tool).
 *    - metadata: object with:
 *      - title: "Add Two Numbers" (human-friendly)
 *      - description: explains the purpose: adds two numbers and returns the result
 *      - inputSchema: a schema object describing expected inputs (uses zod schema here)
 *        - a: z.number() - first operand
 *        - b: z.number() - second operand
 *    - handler: async function invoked with validated inputs ({ a, b }).
 *      - Returns a structured response expected by MCP consumers:
 *        - content: an array of content blocks; here a single text block with the sum.
 *    - Behavior:
 *      - The handler should validate inputs (zod is used to declare schema; server likely validates).
 *      - On success returns an object with content describing the result.
 *      - On error should throw or return an error conforming to MCP server expectations.
 *
 *  - StdioServerTransport (instantiated and passed to `server.connect`)
 *    - A transport that wires the MCP server protocol to the process' stdin and stdout.
 *    - Purpose is to allow the server to be run as a child process and handle MCP messages
 *      via text-based stdin/stdout message framing.
 *
 *  - server.connect(transport)
 *    - Starts the message loop so the server will accept and respond to incoming MCP requests.
 *
 * Expected runtime behavior:
 *  - Run the file directly (node mcp.server.js). The process reads MCP messages from stdin,
 *    and writes responses to stdout. It exposes the "addTowNumbers" tool to clients using MCP.
 *
 *
 * mcp.client.js
 * --------------
 * Purpose:
 *  - Acts as an MCP client that:
 *    1) Spawns the server process using StdioClientTransport (using "node mcp.server.js"),
 *    2) Connects to the MCP server,
 *    3) Lists available tools and converts them into a function declaration format for a GenAI
 *       model,
 *    4) Calls a Google GenAI model with the declared tools so the model can request function calls,
 *    5) Executes tool calls returned by the model by calling the MCP server,
 *    6) Logs responses.
 *
 * Key variables and definitions:
 *  - dotenv.config()
 *    - Loads environment variables from a .env file into process.env (used for credentials).
 *
 *  - Client (instantiated as `client`)
 *    - MCP client implementation from @modelcontextprotocol/sdk/client/index.js.
 *    - Configured with name: "example-client", version: "1.0.0".
 *    - Responsibilities:
 *      - Connect to transports, list available server tools, and call server tools.
 *
 *  - StdioClientTransport
 *    - A client-side transport that starts a child process (command "node" with args ["mcp.server.js"])
 *      and forwards MCP messages to/from that process' stdin/stdout.
 *    - The `command` and `args` fields instruct the transport how to spawn the server process.
 *
 *  - GoogleGenAI (instantiated as `ai`)
 *    - A wrapper around Google GenAI APIs. Constructed with an API key from process.env.GOOGLE_API_KEY.
 *    - Used to call `models.generateContent` to ask the model to produce content or request a tool call.
 *
 *  - tools (array)
 *    - Local array built by converting each tool returned by client.listTools() into an object
 *      suitable for the GenAI "tools/functions" declaration.
 *    - Each element shape:
 *      - name: tool.name (string)
 *      - description: tool.description (string)
 *      - parameters: an object matching a function schema expected by the LLM:
 *        - type: "OBJECT"
 *        - properties: tool.inputSchema
 *        - required: array of required field names (taken from tool.inputSchema.required or [])
 *
 * Client/server interaction flow (high-level):
 *  1) The client spawns the server (node mcp.server.js) via StdioClientTransport and connects.
 *  2) client.listTools() queries the MCP server for all registered tools.
 *  3) For each tool returned, client builds a function declaration and pushes it into `tools`.
 *  4) The client calls the Google GenAI model with:
 *      - model: "gemini-2.5-flash"
 *      - contents: "Add 2 and 3" (a text instruction; note: depending on the GenAI client,
 *        `contents` may need to be an array of content objects—this file passes a single string)
 *      - config: includes tools.functionDeclarations which allows the model to reply with
 *        function-call-like objects.
 *  5) The model's response (aiResponse) is expected to include functionCalls describing which tool
 *     to invoke and with which arguments.
 *  6) For each function call returned by the model:
 *      - client.callTool({ name: call.name, arguments: call.args }) is used to invoke the server tool.
 *      - The tool response is logged.
 *
 * Notes about currently used fields:
 *  - ai.models.generateContent:
 *    - The example calls it with `contents: "Add 2 and 3"` and a config containing `tools`.
 *    - Real GenAI clients often expect contents to be an array of content entries (messages content),
 *      and the precise method signature may differ. Validate the SDK's current method contract.
 *
 * Data shapes and examples:
 *  - Tool discovery (server -> client) returns objects containing at least:
 *    - name: string
 *    - description: string
 *    - inputSchema: object describing expected arguments (zod or JSON schema like)
 *
 *  - Example tool call (addTowNumbers)
 *    - Input: { a: 2, b: 3 }
 *    - Handler result: { content: [{ type: "text", text: "5" }] }
 *
 * Error handling and edge cases:
 *  - Environment variables:
 *    - GOOGLE_API_KEY must be present in process.env for the GoogleGenAI client to be usable.
 *    - If missing, the ai client is constructed with an empty string which will cause auth failure.
 *  - Tool name mismatch:
 *    - The model may request a function name that the client did not declare; validate before calling.
 *  - Argument types:
 *    - Ensure arguments returned by the model conform to the registered tool inputSchema. If the
 *      model returns strings for numbers, convert/validate before calling the tool.
 *  - Transport errors:
 *    - Child process may exit unexpectedly; StdioClientTransport must handle reconnection or report failures.
 *
 * Security and privacy:
 *  - Never commit .env or credentials to source control (.gitignore includes .env).
 *  - Validate and sanitize all inputs that cross process or network boundaries—even when the server
 *    and client are run locally.
 *
 * Suggestions for improvement (recommended for production or interview talking points):
 *  - Use explicit JSON Schema objects for function declarations (the GenAI model expects specific
 *    schema shapes).
 *  - Add robust validation on the client side to coerce/validate model-returned args before calling tools.
 *  - Add error handling and retry logic for calls to both the LLM API and the MCP server transport.
 *  - Use streaming/structured logging for easier debugging when multiple tool calls are made.
 *  - Rename tool ID "addTowNumbers" to "addTwoNumbers" to avoid a typo in the identifier.
 *
 *
 * .gitignore
 * ----------
 * Purpose:
 *  - Prevents committing dependencies and secret configuration:
 *    - node_modules/ : prevents committing installed dependencies
 *    - .env           : prevents committing environment variables (API keys, secrets)
 *
 *
 * Summary: How a single request flows end-to-end
 * ----------------------------------------------
 *  - Developer runs the client. The client spawns the server as a child using node mcp.server.js.
 *  - Client queries the server for available tools and converts them into a schema the LLM can use.
 *  - Client sends a prompt to the LLM asking it to "Add 2 and 3" while exposing the available tools.
 *  - The LLM responds with a function call (e.g., name: "addTowNumbers", args: { a: 2, b: 3 }).
 *  - The client receives that function call and invokes the corresponding tool on the MCP server.
 *  - The MCP server executes the registered handler and returns the result content, which the client logs.
 *
 * End of documentation.
 */