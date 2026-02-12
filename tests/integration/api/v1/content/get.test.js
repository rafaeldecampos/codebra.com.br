describe("GET /api/v1/content/[id]", () => {
  it.skip("should return 200 and content for valid id", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/content/finance-brazil",
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("description");
    expect(data).toHaveProperty("category");
    expect(data).toHaveProperty("type");
    expect(data).toHaveProperty("data");
    expect(data.id).toBe("finance-brazil");
  });

  it.skip("should return 404 for non-existent id", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/content/invalid-id",
    );
    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data).toHaveProperty("error");
  });

  it.skip("should return 400 for missing id parameter", async () => {
    const response = await fetch("http://localhost:3000/api/v1/content/");
    expect(response.status).toBe(404);
  });

  it.skip("should return 405 for POST request", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/content/finance-brazil",
      {
        method: "POST",
      },
    );
    expect(response.status).toBe(405);
  });

  it.skip("should include dynamic data in response", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/content/crypto-chart",
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.data).toHaveProperty("value");
    expect(data.data).toHaveProperty("timestamp");
    expect(typeof data.data.value).toBe("number");
    expect(data.data.value).toBeGreaterThanOrEqual(50);
    expect(data.data.value).toBeLessThanOrEqual(150);
  });
});
