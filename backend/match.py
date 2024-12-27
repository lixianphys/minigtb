import numpy as np
import sys
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from vectorize import create_ideal_recipe_vector, create_recipe_vectors, create_strict_mask
import json
def recommend_recipes(patient_row:pd.Series, recipes_df:pd.DataFrame, n_recommendations:int=5)->dict:
    """
    Recommend recipes for a specific patient based on their profile and taste changes
    """
    # Get vectors
    ideal_recipe_vector = create_ideal_recipe_vector(patient_row)
    
    # Convert Series to numpy array before calculating cosine similarity
    ideal_recipe_vector_np = ideal_recipe_vector.to_numpy().reshape(1, -1)

    recipe_vectors = create_recipe_vectors(recipes_df)
    mask = create_strict_mask(patient_row, recipes_df)
    filtered_recipes_df = recipes_df[mask]
    filtered_recipe_vectors = recipe_vectors[mask]
      
    # Calculate similarities
    similarities = cosine_similarity(ideal_recipe_vector_np, filtered_recipe_vectors)
    
    # Get indices of top N most similar recipes
    top_recipe_indices = np.argsort(similarities[0])[::-1][:n_recommendations]
    
    # Get the recipe IDs from the filtered recipes
    recommended_recipe_ids = filtered_recipes_df.iloc[top_recipe_indices]['id'].tolist()

    # Create dictionary with recipe IDs and their similarity scores
    similarities = [similarities[0][idx] 
        for idx in top_recipe_indices
    ]
    
    return {
        'recipe_ids': recommended_recipe_ids,
        'similarities': similarities
    }

def get_recipe_details(recipe_ids:list, recipes_df:pd.DataFrame)->pd.DataFrame:
    """
    Get details for recommended recipes
    
    Args:
        recipe_ids: List of recipe IDs to get details for
        recipes_df: Optional pre-loaded recipes dataframe
        
    Returns:
        DataFrame containing details of recommended recipes
    """
        
    recommended_recipes = recipes_df.loc[recipe_ids]
    return recommended_recipes

def get_patient_data():
    """
    Get patient data from the JSON database
    
    Returns:
        DataFrame containing patient data
    """
    return pd.read_json('patient_dataset.json')

def get_recipe_data():
    """
    Get recipe data from the JSON database
    
    Returns:
        DataFrame containing recipe data
    """
    return pd.read_json('recipe_dataset.json')

def main():
    patient_id = int(sys.argv[1])
    num_recommendations = int(sys.argv[2])

    patients_df = get_patient_data()
    patients_row = patients_df.iloc[patient_id]
    recipes_df = get_recipe_data()
    recommended_recipes = recommend_recipes(patients_row, recipes_df, n_recommendations=num_recommendations)

    # Convert recommended_recipes to JSON string and write to file
    import os
    if not os.path.exists('result.json'):
        open('result.json', 'w').close()
    with open('result.json', 'w') as f:
        json.dump(recommended_recipes, f, indent=4)

if __name__ == "__main__":
    main()    