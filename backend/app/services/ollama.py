import requests
import base64
import json
from app.schemas.window import WindowStructuredData, AIAnalysis, Daytime, Location, WindowType, Material, Covering, OpenState

OLLAMA_URL = "http://ollama:11434/api/generate"
MODEL = "gemma3"

class OllamaService:
    @staticmethod
    def analyze_image(image_path: str) -> AIAnalysis:
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        prompt = """
        Analyze this image of a window. 
        Provide a short description and a structured JSON object with the following fields:
        - daytime: "day" | "night" | "unknown"
        - location: "interior" | "exterior" | "unknown"
        - type: "fixed" | "sliding" | "casement" | "awning" | "hung" | "pivot" | "unknown"
        - material: "wood" | "aluminum" | "pvc" | "unknown"
        - panes: number (1, 2, 3) or "unknown"
        - covering: "curtains" | "blinds" | "none" | "unknown"
        - openState: "open" | "closed" | "ajar" | "unknown"

        Return ONLY valid JSON in the following format:
        {
            "description": "Short description of the window...",
            "structured_data": {
                "daytime": "...",
                "location": "...",
                "type": "...",
                "material": "...",
                "panes": ...,
                "covering": "...",
                "openState": "..."
            }
        }
        """

        payload = {
            "model": MODEL,
            "prompt": prompt,
            "images": [encoded_string],
            "format": "json",
            "stream": False
        }

        try:
            response = requests.post(OLLAMA_URL, json=payload)
            response.raise_for_status()
            result = response.json()
            
            response_text = result.get("response", "{}")
            data = json.loads(response_text)
            
            structured_data = WindowStructuredData(
                daytime=data["structured_data"].get("daytime", "unknown"),
                location=data["structured_data"].get("location", "unknown"),
                type=data["structured_data"].get("type", "unknown"),
                material=data["structured_data"].get("material", "unknown"),
                panes=data["structured_data"].get("panes", "unknown"),
                covering=data["structured_data"].get("covering", "unknown"),
                openState=data["structured_data"].get("openState", "unknown")
            )
            
            return AIAnalysis(
                description=data.get("description", "No description generated."),
                structured_data=structured_data
            )
            
        except Exception as e:
            print(f"Error calling Ollama: {e}")
            return AIAnalysis(
                description="Analysis failed",
                structured_data=WindowStructuredData(
                    daytime=Daytime.unknown,
                    location=Location.unknown,
                    type=WindowType.unknown,
                    material=Material.unknown,
                    panes="unknown",
                    covering=Covering.unknown,
                    openState=OpenState.unknown
                )
            )
