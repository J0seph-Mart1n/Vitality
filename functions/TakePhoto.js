import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { router } from 'expo-router';
import { Alert } from 'react-native';

// Handle taking a photo
export const takePhoto = async (cameraRef, isAnalyzing, setIsAnalyzing) => {
    if (cameraRef.current && !isAnalyzing) {
        try {
            setIsAnalyzing(true);
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
            });

            try {
                // 1. Get the current user
                const user = FIREBASE_AUTH.currentUser;
                if (!user) throw new Error("User not logged in");

                // 2. Get the Firebase ID token
                const idToken = await user.getIdToken();

                const formData = new FormData();
                // @ts-ignore
                formData.append('image', {
                    uri: photo.uri,
                    type: 'image/jpeg',
                    name: 'nutrition.jpg',
                });

                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/analyze-label`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${idToken}`, // <--- The token goes here
                    },
                });

                const data = await response.json();
                console.log("Analysis Results:", data);

                if (data.error) {
                    Alert.alert("Analysis Failed", data.error, [{ text: "OK" }]);
                    setIsAnalyzing(false);
                    return;
                }
                // Transfer to the report page, passing the parsed backend data safely.
                router.push({
                    pathname: '/report',
                    params: {
                        analysisData: JSON.stringify(data),
                    }
                });
            } catch (error) {
                if (error instanceof Error && error.message === "User not logged in") {
                    Alert.alert("Authentication Required", "Please log in to your account to analyze nutrition labels.", [
                        { text: "Log In", onPress: () => router.push('/login') },
                        { text: "Cancel", style: 'cancel' }
                    ]);
                } else {
                    Alert.alert("Error", "Could not analyze the image. Please check your connection.", [{ text: "OK" }]);
                }
            } finally {
                setIsAnalyzing(false);
                console.log("Analysis complete");
            }
        } catch (error) {
            console.error('Failed to take photo', error);
            setIsAnalyzing(false);
        }
    }
};