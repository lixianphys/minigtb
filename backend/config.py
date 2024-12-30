TASTE_FEATURES = ['is_sweet', 'is_bitter', 'is_metallic', 'is_acidic']
NUTRITIONAL_FEATURES = ['calories', 'protein', 'carbs', 'fat', 'sodium']
TEXTURE_FEATURES = ['is_soft', 'is_crunchy', 'is_chewy', 'is_liquid']
TEMPERATURE_FEATURES = ['is_cold']

HIGH_BP_THRESHOLD = 130
HIGH_BS_THRESHOLD = 120

HEALTH_FACTOR = 0.1
HEALTH_WEIGHTS = {
    'carbs': 20,
    'protein': 5,
    'sodium': 20,
    'fat': 10
}

TASTE_ADJUSTMENTS = {
    'sweet_loss': {
        'is_cold': 0.2  # Slight preference for cold foods
    },
    'bitter_sensitivity': {
        'is_bitter': -0.8,  # Strongly reduce bitter foods
        'is_soft': 0.4  # Preference for soft textures
    },
    'metallic_taste': {
        'is_acidic': 0.4,  # Increase importance of acidic foods
        'is_cold': 0.3,  # Preference for cold foods
        'is_metallic': -0.6  # Reduce metallic-tasting foods
    },
}