const request = require("supertest");
const app = require("./app"); 
describe("Authentication Routes", () => {
  // Test case for user registration
  it("should register a new user", async () => {
    const newUser = {
      name: "Test User",
      email: "test@example.com",
      password: "testpassword",
    };

    const res = await request(app).post("/api/auth/register").send(newUser); 
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    // Add additional assertions as needed
  });

  // Test case for user login
  it("should login an existing user", async () => {
    const existingUser = {
      email: "test@example.com",
      password: "testpassword",
    };

    const res = await request(app).post("/api/auth/login").send(existingUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

});
