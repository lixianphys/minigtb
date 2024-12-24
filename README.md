# Recipe Recommendation System

A personalized recipe recommendation system that takes into account patient dietary restrictions, allergies, and taste preferences.

## Overview

This system recommends recipes based on:
- Patient's dietary restrictions (vegetarian, vegan, halal, kosher)
- Food allergies (peanuts, shellfish, dairy, gluten, eggs) 
- Taste preferences and changes (sweet loss, bitter sensitivity, metallic taste)
- Health-based nutritional requirements (blood pressure, blood sugar)

## Files Structure

- `match.py`: Main recommendation engine that matches patients to recipes (sklearn library)
- `vectorize.py`: Creates feature vectors and filtering masks for matching
- `fake.py`: Generates sample patient and recipe data for testing
- `config.py`: System configuration and parameters


