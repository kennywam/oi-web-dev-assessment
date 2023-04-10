const request = require("supertest");
const app = require("./app"); 
describe("Blog Post Routes", () => {
  // Test case for getting all blog posts
  it("should get all blog posts", async () => {
    const res = await request(app).get("/api/blog-posts"); 
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  // Test case for creating a new blog post
  it("should create a new blog post", async () => {
    const newBlogPost = {
      title: "Test Blog Post",
      content: "This is a test blog post.",
    };

    const res = await request(app).post("/api/blog-posts").send(newBlogPost); // replace with your blog post route

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
  });

});
