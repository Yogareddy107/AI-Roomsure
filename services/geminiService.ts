import { GoogleGenAI, Type } from "@google/genai";
// Fix: Add .ts extension for explicit module resolution.
import { Filters } from "../types.ts";
// Fix: Add .ts extension for explicit module resolution.
import { AVAILABLE_AMENITIES, PROPERTY_TYPES } from "../constants.ts";

// Fix: Initialize the GoogleGenAI client. The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const parseSearchQueryToFiltersSchema = {
  type: Type.OBJECT,
  properties: {
    price_min: {
      type: Type.NUMBER,
      description: "The minimum price per month.",
    },
    price_max: {
      type: Type.NUMBER,
      description: "The maximum price per month.",
    },
    types: {
      type: Type.ARRAY,
      description: "The property types.",
      items: {
        type: Type.STRING,
        enum: PROPERTY_TYPES,
      },
    },
    amenities: {
      type: Type.ARRAY,
      description: "The amenities required.",
      items: {
        type: Type.STRING,
        enum: AVAILABLE_AMENITIES,
      },
    },
    rating: {
        type: Type.NUMBER,
        description: "The minimum star rating, as an integer (e.g., 4 for 4+ stars)."
    }
  },
};

export const parseSearchQueryToFilters = async (searchQuery: string): Promise<Partial<Filters>> => {
  if (!searchQuery.trim()) {
    return {};
  }
  
  try {
    // Fix: Use ai.models.generateContent to call the Gemini API.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following user query for property search and extract the filter criteria. Query: "${searchQuery}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: parseSearchQueryToFiltersSchema,
      },
    });

    // Fix: Access the text response directly from the response object.
    const jsonText = response.text.trim();
    if (!jsonText) {
        console.error("Gemini API returned an empty response.");
        return {};
    }

    const parsedJson = JSON.parse(jsonText);

    const newFilters: Partial<Filters> = {};

    if (parsedJson.price_min || parsedJson.price_max) {
      newFilters.price = {
        min: parsedJson.price_min ?? 0,
        max: parsedJson.price_max ?? 50000,
      };
    }

    if (parsedJson.types && Array.isArray(parsedJson.types)) {
      newFilters.types = parsedJson.types.filter((t: string) => PROPERTY_TYPES.includes(t));
    }
    
    if (parsedJson.amenities && Array.isArray(parsedJson.amenities)) {
      newFilters.amenities = parsedJson.amenities.filter((a: string) => AVAILABLE_AMENITIES.includes(a));
    }

    if (parsedJson.rating && typeof parsedJson.rating === 'number') {
        newFilters.rating = Math.max(1, Math.min(4, Math.floor(parsedJson.rating)));
    }

    return newFilters;

  } catch (error) {
    console.error("Error parsing search query with Gemini API:", error);
    // Return empty object on error to not break the UI
    return {};
  }
};
