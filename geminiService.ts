import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

// Note: Using environment variable as per instructions.
// In a real production build, this would be proxied through a backend to hide the key.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

const questionSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The question text" },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Array of 4 possible answers"
          },
          correctAnswerIndex: { type: Type.INTEGER, description: "Index (0-3) of the correct answer" },
          explanation: { type: Type.STRING, description: "Short historical explanation of why the answer is correct" }
        },
        required: ["text", "options", "correctAnswerIndex", "explanation"]
      }
    }
  }
};

const openEndedSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "An open-ended question that requires a specific fact, name, or date as an answer." },
          answer: { type: Type.STRING, description: "The correct factual answer." }
        },
        required: ["text", "answer"]
      }
    }
  }
};

export const generateQuestQuestions = async (
  topic: string, 
  difficulty: number, 
  count: number
): Promise<Question[]> => {
  try {
    const difficultyText = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"][difficulty - 1];

    const prompt = `
      Generate ${count} multiple-choice history questions about World War II, specifically the topic: "${topic}".
      Target Audience: 13-year-old students.
      Difficulty Level: ${difficultyText} (Level ${difficulty}/5).
      
      Guidelines:
      1. Focus on key dates, major leaders, significant battles, and cause/effect relationships.
      2. Avoid overly graphic, sensitive, or complex political topics unsuited for this age group.
      3. Ensure historical accuracy.
      4. Provide 4 distinct options for each question.
    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
      }
    });

    const responseText = result.text;
    if (!responseText) throw new Error("Empty response from AI");

    const parsed = JSON.parse(responseText);
    
    // Add IDs to questions
    return parsed.questions.map((q: any, index: number) => ({
      ...q,
      id: `gen_${Date.now()}_${index}`
    }));

  } catch (error) {
    console.error("Error generating questions:", error);
    // Fallback questions in case of API failure or missing key
    return Array(count).fill(null).map((_, i) => ({
      id: `fallback_${i}`,
      text: `Mock Question ${i + 1} about ${topic} (AI Service Unavailable). When did WW2 start in Europe?`,
      options: ["1939", "1941", "1945", "1918"],
      correctAnswerIndex: 0,
      explanation: "Germany invaded Poland on September 1, 1939."
    }));
  }
};

export const generateCQCQuestions = async (
  topic: string,
  count: number
): Promise<Question[]> => {
    try {
        const prompt = `
          Generate ${count} open-ended history questions about World War II, specifically the topic: "${topic}".
          These questions are for a "Duel" mode where players answer verbally.
          
          Guidelines:
          1. Questions should have a clear, definitive short answer (a name, a date, a place, or a specific term).
          2. Avoid questions that require long essay answers.
          3. Difficulty: Moderate.
        `;
    
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: openEndedSchema,
          }
        });
    
        const responseText = result.text;
        if (!responseText) throw new Error("Empty response from AI");
    
        const parsed = JSON.parse(responseText);
        
        return parsed.questions.map((q: any, index: number) => ({
          id: `cqc_${Date.now()}_${index}`,
          text: q.text,
          options: [], // No options for CQC
          correctAnswerIndex: -1,
          explanation: q.answer // Store the answer in explanation field
        }));
    
      } catch (error) {
        console.error("Error generating CQC questions:", error);
        return Array(count).fill(null).map((_, i) => ({
          id: `fallback_cqc_${i}`,
          text: `Who was the Prime Minister of Britain during most of WW2?`,
          options: [],
          correctAnswerIndex: -1,
          explanation: "Winston Churchill"
        }));
      }
};
