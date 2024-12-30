# Recipe Recommendation System

A personalized recipe recommendation system that takes into account patient dietary restrictions, allergies, and taste preferences.

## Overview

This system recommends recipes based on:
- Patient's dietary restrictions (vegetarian, vegan, halal, kosher)
- Food allergies (peanuts, shellfish, dairy, gluten, eggs) 
- Taste preferences and changes (sweet loss, bitter sensitivity, metallic taste)
- Health-based nutritional requirements (blood pressure, blood sugar)



## How to run
First, run the `fake.py` file to generate sample patient and recipe data. Then, run the `main.py` file to start the backend server at port 8000. Finally, run the `frontend` folder to start the frontend server.
```
cd backend
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python fake.py
uvicorn main:app --reload --port 8000
cd ../frontend/angular-app
npm install
ng serve
```



## Files Structure

- `match.py`: Main recommendation engine that matches patients to recipes (sklearn library)
- `vectorize.py`: Creates feature vectors and filtering masks for matching
- `fake.py`: Generates sample patient and recipe data for testing
- `config.py`: System configuration and parameters

## Backend
First, `create_strict_mask` is run to create the strict mask for filtering recipes by allergens, dietary restrictions and preferred cuisine. 
Then, `create_ideal_recipe_vector` is run to create the ideal recipe vector for the patient. Note that this vector is created based on the patient's health metrics and taste changes. The principle is to reorient the ideal vector based on the patient's health metrics and the taste changes. For example, if the patient has high blood sugar, the ideal vector is reoriented to favor recipes with lower carbs and protein. If the patient has high blood pressure, the ideal vector is reoriented to favor recipes with lower sodium and fat. If the patient has a metallic taste, the ideal vector is reoriented to favor recipes with higher acidity and lower metallic taste. For recipes, `create_recipe_vectors` is run to create the recipe vectors by scaling the numeric features and the binary features are left as is. 
Finally, `recommend_recipes` is run to recommend recipes for the patient. 

## Configuration
All constants are in the `config.py` file, which are used in `vectorize.py`.

## Frontend
The frontend is a simple Angular application that allows users to input their patient data and fetch recipe recommendations. In addition, the frontend allows users to inquire about the patient's database and the recipe database. Here is the link to the youtube demo: https://youtu.be/yDpW55DIkw4

## Data
The patient database is a Json file `patient_data.json` that contains the patient's data. The recipe database is a Json file `recipe_data.json` that contains the recipe's data. 

