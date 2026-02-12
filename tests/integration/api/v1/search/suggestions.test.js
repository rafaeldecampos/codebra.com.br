describe("GET /api/v1/search/suggestions", () => {
  it.skip("should return 200 and suggestions for valid query", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/search/suggestions?q=brasil",
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("query");
    expect(data).toHaveProperty("count");
    expect(data).toHaveProperty("suggestions");
    expect(data.query).toBe("brasil");
    expect(Array.isArray(data.suggestions)).toBe(true);
  });

  it.skip("should return empty suggestions for non-matching query", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/search/suggestions?q=xxxxxxxxxxx",
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.count).toBe(0);
    expect(data.suggestions).toEqual([]);
  });

  it.skip("should return 400 for missing query parameter", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/search/suggestions",
    );
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toHaveProperty("error");
  });

  it.skip("should return 405 for POST request", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/search/suggestions?q=test",
      {
        method: "POST",
      },
    );
    expect(response.status).toBe(405);
  });

  it.skip("should return suggestions for crypto search", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/search/suggestions?q=cripto",
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.count).toBeGreaterThan(0);
    expect(data.suggestions.some((s) => s.id.includes("crypto"))).toBe(true);
  });
});
