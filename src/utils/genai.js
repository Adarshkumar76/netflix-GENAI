import { GoogleGenAI } from "@google/genai";
import { GENAI_API_KEY } from "./constants";

const ai = new GoogleGenAI({ apiKey: GENAI_API_KEY });

export default ai;
