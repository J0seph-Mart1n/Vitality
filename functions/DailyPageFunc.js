import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const handleCalculateEstimate = async (
    foodName, quantity, unit, scannedData,
    setIsEstimating, setCalories, setProtein, setCarbs, setShowEstimate
) => {
    setIsEstimating(true);
    try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
            Alert.alert("Error", "Please log in");
            setIsEstimating(false);
            return;
        }
        const token = await user.getIdToken();

        let nutritionalFacts = undefined;
        if (scannedData) {
            try {
                const parsed = JSON.parse(scannedData);
                if (parsed && parsed.nutritional_facts) {
                    nutritionalFacts = parsed.nutritional_facts;
                }
            } catch (e) { }
        }

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/estimate-nutrition`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                food_name: foodName,
                consumed_amount: `${quantity} ${unit}`,
                nutritional_facts: nutritionalFacts
            })
        });

        if (response.ok) {
            const data = await response.json();
            setCalories(String(data.calories || ''));
            setProtein(String(data.protein || ''));
            setCarbs(String(data.carbs || ''));
            setShowEstimate(true);
        } else {
            Alert.alert("Error", "Failed to calculate estimate");
        }
    } catch (error) {
        Alert.alert("Error", "Network request failed");
    } finally {
        setIsEstimating(false);
    }
};

export const handleSaveDailyLog = async (
    foodName, quantity, unit, calories, protein, carbs,
    setIsSaving
) => {
    setIsSaving(true);
    try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;
        const token = await user.getIdToken();

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/daily-log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                food_name: foodName,
                quantity: quantity,
                unit: unit,
                calories: calories,
                protein: protein,
                carbs: carbs
            })
        });

        if (response.ok) {
            Alert.alert("Success", "Added to daily log!");
            router.back();
        } else {
            Alert.alert("Error", "Failed to save to daily log");
        }
    } catch (error) {
        Alert.alert("Error", "Network request failed");
    } finally {
        setIsSaving(false);
    }
};