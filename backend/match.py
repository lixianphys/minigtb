import numpy as np
import sys
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from vectorize import create_ideal_recipe_vector, create_recipe_vectors, create_strict_mask
from fake import generate_patient_data, generate_recipe_data

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
    recommended_recipe_ids = filtered_recipes_df.iloc[top_recipe_indices]['recipe_id'].tolist()

    # Create dictionary with recipe IDs and their similarity scores
    similarities_dict = {
        filtered_recipes_df.iloc[idx]['recipe_id']: similarities[0][idx] 
        for idx in top_recipe_indices
    }
    
    return {
        'recipe_ids': recommended_recipe_ids,
        'similarities': similarities_dict
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
    recipe_details = get_recipe_details(recommended_recipes['recipe_ids'], recipes_df)

    with open('result.txt', 'w') as f:
        f.write(f"\nSummary of recommendations for patient:\n{patients_row}\n\n")
        f.write("-"*100 + "\n")
        f.write(f"After filtering for patient's allergies **{patients_row['allergen']}** and diet restrictions **{patients_row['dietary_restriction']}**:\nthe number of recipes is reduced from {len(recipes_df)} to {sum(create_strict_mask(patients_row, recipes_df))}\n")
        f.write("-"*100 + "\n")
        f.write(f"Within the remaining recipes, the top {num_recommendations} recommended recipes are:\n")
        for _, recipe in recipe_details.iterrows():
            f.write(f"\nRecipe ID: {recipe['recipe_id']}\n")
            f.write(f"Similarity Score: {recommended_recipes['similarities'][recipe['recipe_id']]:.5f}\n")
            f.write(f"Category: {recipe['category']}\n")
            f.write(f"Cuisine: {recipe['cuisine']}\n")
            f.write(f"Calories: {recipe['calories']:.0f}\n")
            f.write(f"Protein: {recipe['protein']:.0f}g\n")

if __name__ == "__main__":
    main()    