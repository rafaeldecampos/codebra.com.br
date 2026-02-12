import { searchSuggestions } from "models/suggestions";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const suggestions = searchSuggestions(q);

  res.status(200).json({
    query: q,
    count: suggestions.length,
    suggestions,
  });
}
