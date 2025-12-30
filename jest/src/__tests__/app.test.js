const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("should return 200 OK and Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Hello World");
  });
});

describe("POST /api/auth/register", () => {
    it("should return 200 OK and User registered successfully", async () => {
        const res = await request(app).post("/api/auth/register").send({
            username: "testuser",
            email: "testemail@example.com",
            password: "testpassword",
        })

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "User registered successfully");
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toHaveProperty("username", "testuser");
        expect(res.body.user).toHaveProperty("email", "testemail@example.com");
    })
})
