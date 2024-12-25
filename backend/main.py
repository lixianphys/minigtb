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
        with open("result.txt", "r") as file:
            content = file.read()
        return {"content": content}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Result file not found")

@app.get("/fetch-result")
async def fetch_result():
    try:
        with open("result.txt", "r") as file:
            content = file.read()
        return {"content": content}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Result file not found")

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/patient_database")
async def get_patient_database():
    # Dummy response for now
    return json.load(open('patient_dataset.json', 'r'))[:10]

@app.get("/recipe_database")
async def get_recipe_database():
    return json.load(open('recipe_dataset.json', 'r'))[:10]