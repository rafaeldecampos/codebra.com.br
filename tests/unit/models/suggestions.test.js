import {
  searchSuggestions,
  getSuggestionById,
  SUGGESTIONS,
} from "models/suggestions";

describe("Suggestions Model", () => {
  describe("searchSuggestions", () => {
    it("returns empty array for empty query", () => {
      expect(searchSuggestions("")).toEqual([]);
      expect(searchSuggestions("   ")).toEqual([]);
    });

    it("filters suggestions by title", () => {
      const results = searchSuggestions("Bitcoin");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((s) => s.title.toLowerCase().includes("bitcoin")),
      ).toBe(true);
    });

    it("filters suggestions by description", () => {
      const results = searchSuggestions("histórico");
      expect(results.length).toBeGreaterThan(0);
    });

    it("filters suggestions by category", () => {
      const results = searchSuggestions("Finanças");
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns all matching suggestions for "Brasil"', () => {
      const results = searchSuggestions("Brasil");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some(
          (s) =>
            s.title.toLowerCase().includes("brasil") ||
            s.description.toLowerCase().includes("brasil"),
        ),
      ).toBe(true);
    });

    it("is case-insensitive", () => {
      const results1 = searchSuggestions("BRASIL");
      const results2 = searchSuggestions("brasil");
      expect(results1).toEqual(results2);
    });
  });

  describe("getSuggestionById", () => {
    it("returns suggestion by id", () => {
      const suggestion = getSuggestionById("country-brazil");
      expect(suggestion).toEqual(
        expect.objectContaining({
          id: "country-brazil",
          title: expect.stringContaining("Brasil"),
        }),
      );
    });

    it("returns null for invalid id", () => {
      expect(getSuggestionById("invalid-id")).toBeNull();
    });
  });

  describe("SUGGESTIONS", () => {
    it("has expected structure for each suggestion", () => {
      SUGGESTIONS.forEach((suggestion) => {
        expect(suggestion).toHaveProperty("id");
        expect(suggestion).toHaveProperty("title");
        expect(suggestion).toHaveProperty("description");
        expect(suggestion).toHaveProperty("category");
        expect(suggestion).toHaveProperty("type");
      });
    });

    it("has unique ids", () => {
      const ids = SUGGESTIONS.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});
