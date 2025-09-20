import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function demystifyLegalText(legalText: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are an expert legal assistant AI. Your task is to simplify and explain the following legal document text for a non-lawyer.
    Your goal is to make the text as clear and understandable as possible. Follow these instructions:
    1.  **Main Summary:** Start with a concise, high-level summary of the document's purpose in a section titled "Key Takeaway".
    2.  **Breakdown:** Create a section titled "Clause-by-Clause Breakdown". In this section, identify and explain key clauses or paragraphs.
    3.  **Plain Language:** For each clause, translate the legal jargon into simple, plain English. Use bullet points for clarity.
    4.  **Define Terms:** Identify any crucial legal terms and provide a simple definition in a final section titled "Key Terms Defined".
    5.  **Tone:** Maintain a helpful, clear, and neutral tone.
    6.  **Disclaimer:** Do NOT provide legal advice. Focus solely on explaining the text that is provided. Conclude with a clear disclaimer that this is a simplified explanation and not a substitute for professional legal counsel.
    7.  **Formatting:** Use markdown for headings (e.g., ## Key Takeaway) and bold text for emphasis.

    Here is the legal text to analyze:
    ---
    ${legalText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    const text = response.text;

    if (!text) {
        throw new Error("Received an empty response from the AI model.");
    }
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}