import numpy as np
import pandas as pd
import random
import names
# Generate fake patient data
def generate_patient_data(n_patients:int=100, seed:int=42):
    np.random.seed(seed)
    random.seed(seed)
    # Patient preferences and restrictions
    taste_changes = ['sweet_loss', 'bitter_sensitivity', 'metallic_taste', 'none']
    dietary_restrictions = ['none', 'vegetarian', 'vegan', 'halal', 'kosher']
    allergens = ['none', 'peanuts', 'shellfish', 'dairy', 'gluten', 'eggs']
    cuisines = ['chinese', 'italian', 'indian', 'american', 'mexican', 'japanese']
    
    data = {
        'name': [names.get_full_name() for _ in range(n_patients)],
        'img_url': [f'https://picsum.photos/100/100?random={i}' for i in range(n_patients)],
        'id': range(n_patients),
        'age': np.random.randint(18, 85, n_patients),
        'taste_change': [random.choice(taste_changes) for _ in range(n_patients)],
        'dietary_restriction': [random.choice(dietary_restrictions) for _ in range(n_patients)],
        'allergen': [random.choice(allergens) for _ in range(n_patients)],
        'preferred_cuisine': [random.choice(cuisines) for _ in range(n_patients)],
        'blood_pressure': np.random.normal(120, 20, n_patients),
        'blood_sugar': np.random.normal(100, 15, n_patients)
    }
    
    return pd.DataFrame(data)

# Generate fake recipe data
def generate_recipe_data(n_recipes:int=500000, seed:int=42):
    # Set both numpy and random seeds to ensure reproducibility
    np.random.seed(seed)
    random.seed(seed)
    
    # Recipe attributes
    categories = ['main_dish', 'side_dish', 'dessert', 'soup', 'salad']
    cuisines = ['chinese', 'italian', 'indian', 'american', 'mexican', 'japanese']
    
    data = {
        'id': range(n_recipes),
        'img_url': [f'https://picsum.photos/200/200?random={i}' for i in range(n_recipes)],
        'category': [random.choice(categories) for _ in range(n_recipes)],
        'cuisine': [random.choice(cuisines) for _ in range(n_recipes)],
        'calories': np.random.normal(500, 150, n_recipes),
        'protein': np.random.normal(20, 8, n_recipes),
        'carbs': np.random.normal(50, 20, n_recipes),
        'fat': np.random.normal(20, 10, n_recipes),
        'sodium': np.random.normal(500, 200, n_recipes),
    }
    
    # Generate binary features
    binary_features = ['is_vegetarian', 'is_vegan', 'is_gluten_free', 'is_dairy_free', 'contains_nuts', 'contains_shellfish', 'is_halal', 'is_kosher', 'contains_eggs','is_sweet','is_bitter','is_metallic','is_acidic','is_soft','is_crunchy','is_chewy','is_liquid','is_cold']
    
    for feature in binary_features:
        data[feature] = np.random.choice([0,1], size=n_recipes)
    
    return pd.DataFrame(data)

if __name__ == '__main__':
    patient_data = generate_patient_data(n_patients=1000)
    recipe_data = generate_recipe_data(n_recipes=500000)
    # Save generated data to JSON files
    patient_data.to_json('patient_dataset.json', orient='records', indent=2)
    recipe_data.to_json('recipe_dataset.json', orient='records', indent=2)
    print("\nDatasets saved to patient_dataset.json and recipe_dataset.json")
