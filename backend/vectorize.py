import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from fake import generate_patient_data, generate_recipe_data
from config import TASTE_FEATURES, NUTRITIONAL_FEATURES, TEXTURE_FEATURES, TEMPERATURE_FEATURES, TASTE_ADJUSTMENTS, HEALTH_FACTOR, HEALTH_WEIGHTS, HIGH_BP_THRESHOLD, HIGH_BS_THRESHOLD

# Add new global constant
DIMENSION_FEATURES = TASTE_FEATURES + NUTRITIONAL_FEATURES + TEXTURE_FEATURES + TEMPERATURE_FEATURES

def create_strict_mask(patient_row:pd.Series, recipes_df:pd.DataFrame)->pd.Series:
    """Creates a boolean mask for hard constraints (allergens and dietary restrictions)"""
    mask = pd.Series(True, index=recipes_df.index)
    
    # Allergen filtering
    allergen_map = {
        'peanuts': 'contains_nuts',
        'shellfish': 'contains_shellfish',
        'dairy': 'is_dairy_free',
        'gluten': 'is_gluten_free',
        'eggs': 'contains_eggs'
    }
    
    if patient_row['allergen'] != 'none':
        recipe_col = allergen_map.get(patient_row['allergen'])
        if recipe_col:
            if recipe_col.startswith('is_'):
                mask &= recipes_df[recipe_col] == 1
            else:
                mask &= recipes_df[recipe_col] == 0
    
    # Dietary restriction filtering
    diet_map = {
        'vegetarian': 'is_vegetarian',
        'vegan': 'is_vegan',
        'halal': 'is_halal',
        'kosher': 'is_kosher'
    }
    
    if patient_row['dietary_restriction'] != 'none':
        diet_col = diet_map.get(patient_row['dietary_restriction'])
        if diet_col and diet_col in recipes_df.columns:
            mask &= recipes_df[diet_col] == 1


    # Preferred cuisine filtering
    if patient_row['preferred_cuisine'] != 'none':
        mask &= recipes_df['cuisine'] == patient_row['preferred_cuisine']

    
    return mask

def calculate_health_weights(patient_row:pd.Series)->pd.Series:

    """Calculate weights based on health metrics"""
    base_weights = {feature: 0 for feature in DIMENSION_FEATURES}
    
    # Blood sugar based weights
    if patient_row['blood_sugar'] > HIGH_BS_THRESHOLD:
        bs_severity = (patient_row['blood_sugar'] - HIGH_BS_THRESHOLD) / HIGH_BS_THRESHOLD
        base_weights['carbs'] += HEALTH_WEIGHTS['carbs'] * bs_severity
        base_weights['protein'] += HEALTH_WEIGHTS['protein'] * bs_severity
    
    # Blood pressure based weights
    if patient_row['blood_pressure'] > HIGH_BP_THRESHOLD:
        bp_severity = (patient_row['blood_pressure'] - HIGH_BP_THRESHOLD) / HIGH_BP_THRESHOLD
        base_weights['sodium'] += HEALTH_WEIGHTS['sodium'] * bp_severity
        base_weights['fat'] += HEALTH_WEIGHTS['fat'] * bp_severity
    
    return pd.Series(base_weights)


def create_recipe_vectors(recipes_df:pd.DataFrame)->pd.DataFrame:
    """Create normalized feature vectors for recipes"""
    recipe_vectors = recipes_df[DIMENSION_FEATURES].copy()
    
    # Separate binary and numeric features
    binary_features = [col for col in DIMENSION_FEATURES if col.startswith('is_') or col.startswith('contains_')]
    numeric_features = [col for col in DIMENSION_FEATURES if col not in binary_features]
    
    # Scale only numeric features
    scaler = StandardScaler()
    recipe_vectors[numeric_features] = scaler.fit_transform(recipe_vectors[numeric_features])
    
    return recipe_vectors


def create_ideal_recipe_vector(patient_row:pd.Series)->pd.Series:
    """
    Create ideal recipe vector for a single patient
    """
    def initialize_ideal_recipe_vector(patient_row:pd.Series, factor:float=HEALTH_FACTOR)->pd.Series:
        """Create feature vector for a single patient"""
        # Start with zero vector
        ideal_vector = pd.Series(1, index=DIMENSION_FEATURES)
        # penalties based on health conditions
        weights = calculate_health_weights(patient_row)
        penalty_vector = ideal_vector * weights * factor
        ideal_vector = ideal_vector - penalty_vector
            
        return ideal_vector

    ideal_vector = initialize_ideal_recipe_vector(patient_row)
    
    def adjust_recipe_by_taste(ideal_recipe_vector:pd.Series, patient_row:pd.Series)->pd.Series:
        """
        Apply taste-related adjustments to recipe vectors based on patient's taste change condition
        """
        taste_change = patient_row['taste_change']
        
        recipe_vector = ideal_recipe_vector.copy()  # Create a copy to avoid modifying original
        
        if taste_change in TASTE_ADJUSTMENTS:
            adjustments = TASTE_ADJUSTMENTS[taste_change]
            for feature, weight in adjustments.items():
                if feature in recipe_vector.index:
                    recipe_vector[feature] *= (1 + weight)
        
        return recipe_vector
        
    adjusted_vector = adjust_recipe_by_taste(ideal_vector, patient_row)
    
    return adjusted_vector