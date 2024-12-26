from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import json
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    allergen: str
    dietary_restriction: str
    blood_sugar: int
    blood_pressure: int
    taste_change: str

class TriggerScriptRequest(BaseModel):
    patient_id: int
    num_recommendations: int

def run_match(patient_id: int, num_recommendations: int):
    subprocess.run(["python3", "match.py", str(patient_id), str(num_recommendations)])


@app.post("/trigger-script")
async def trigger_script(request: TriggerScriptRequest,background_tasks: BackgroundTasks):
    background_tasks.add_task(run_match, request.patient_id, request.num_recommendations)
    try:
        with open("result.json", "r") as file:
            content = json.load(file)
        return content
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Result file not found")

@app.get("/fetch-result")
async def fetch_result():
    with open("result.json", "r") as file:
        content = json.load(file)
    return content

@app.get("/patient_database")
async def get_patient_database():
    # Dummy response for now
    return json.load(open('patient_dataset.json', 'r'))[:100]

@app.get("/patient_database/{id}")
async def get_patient_by_id(id: int):
    try:
        with open('patient_dataset.json', 'r') as file:
            data = json.load(file)  # Load entire file at once
            for patient in data:
                if patient.get('id') == id:
                    return patient
        raise HTTPException(status_code=404, detail="Patient not found")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Patient database not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format in database")



@app.get("/recipe_database")
async def get_recipe_database():
    return json.load(open('recipe_dataset.json', 'r'))[:1000]

@app.get("/recipe_database/{id}")
async def get_recipe_by_id(id: int):
    try:
        with open('recipe_dataset.json', 'r') as file:
            data = json.load(file)  # Load entire file at once
            for recipe in data:
                if recipe.get('id') == id:
                    return recipe
        raise HTTPException(status_code=404, detail="Recipe not found")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Recipe database not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format in database")

@app.get("/recipe_database/ids/{ids}")
async def get_recipes_by_ids(ids: str):
    try:
        # Convert comma-separated string of IDs to list of integers
        id_list = [int(id) for id in ids.split(',')]
        
        with open('recipe_dataset.json', 'r') as file:
            data = json.load(file)
            recipes = [recipe for recipe in data if recipe['id'] in id_list]
            
            if not recipes:
                raise HTTPException(status_code=404, detail="No recipes found for given IDs")
                
            return recipes
            
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Recipe database not found")
    except (ValueError, json.JSONDecodeError):
        raise HTTPException(status_code=400, detail="Invalid ID format or database format")