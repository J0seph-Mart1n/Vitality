import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const colors = {
  brandGreen: '#4CAF50',
  onSurface: '#191c19',
  onSurfaceVariant: '#43493f',
  surfaceContainerLow: '#f0f1ed',
  outlineVariant: '#c3c8bc',
  white: '#ffffff',
  zinc400: '#a1a1aa',
};

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
      if (response?.type === 'success') {
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(FIREBASE_AUTH, credential)
              .then(() => {
                  router.replace('/(drawer)/(tabs)');
              })
              .catch((err) => {
                  console.error(err);
                  setError('Google Auth Failed');
              });
      }
  }, [response]);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Perform account creation logic here...
    setLoading(true);
    setError('');
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      
      // Permanently save the full name to the Firebase user profile
      if (response.user) {
        await updateProfile(response.user, {
          displayName: name
        });
      }

      console.log(response);
      router.replace('/(drawer)/(tabs)');
    } catch (err: any) {
      console.log(err);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
    // Redirect into the main app dashboard on success! 
    // Since (tabs) is now nested inside the (drawer) layout, we specify the full path!


  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Background Layers */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#4CAF50', 'rgba(76, 175, 80, 0.95)', 'rgba(76, 175, 80, 0.9)']}
          style={StyleSheet.absoluteFill}
        />
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9KwAKq--iSguIEqQGhCy-8wPvUSlV-zdTDLPNEvkP2wa1HgUAgr5hY-uMOlLFWfEjmpaB9oh5FkEBcqYgd8-QToHPP_cJulac0RGo6quGtr--qqrIrz4Sq11BfwFhnZ6deVjXErmuZRxI1XQ-W15-eYpo06MfV-WL5nkbK4lTiyIMvCkatZN7uAK2Aficj5Eyq49gixVv1Viqz2ewZ5WHDVeM_eRiO50jTpa-nS6a3FpVWXqbKWpWMrbMHUC8x2LXdbV-vQKzLUU',
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Glassmorphism Panel */}
        <BlurView intensity={95} tint="light" style={styles.glassPanel}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <MaterialIcons name="monitor-heart" size={36} color={colors.white} />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join your daily wellness sanctuary.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name Input (Added for Signup) */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>FULL NAME</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Jane Doe"
                  placeholderTextColor={colors.zinc400}
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
                <MaterialIcons name="person-outline" size={20} color={colors.zinc400} style={styles.inputIcon} />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor={colors.zinc400}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <MaterialIcons name="mail-outline" size={20} color={colors.zinc400} style={styles.inputIcon} />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>PASSWORD</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.zinc400}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <MaterialIcons name="lock-outline" size={20} color={colors.zinc400} style={styles.inputIcon} />
              </View>
            </View>

            {/* Error Logic */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Signup Button */}
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={handleSignup} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Text style={styles.actionBtnText}>Sign Up</Text>
                  <MaterialIcons name="arrow-forward" size={20} color={colors.white} />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Logins */}
          <View style={styles.socialGrid}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => promptAsync()} disabled={!request}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzLe0Pj425IfcrBXi7u_OcRgCmwgL2LdzKXHCSBVG4sstFRH7NlalC_arWrz8uzaFbRWzhZrnC2cml0Lfd2OZ2ENgMC_jmbXhngLmVyYeS8pMzNDZupHGA-_hflu8sWesDiq-g_mcoVyl9pn-8cbZPX9Rq-pQ-_yY1HbTk23bR6_qrV2siA49RseiS9T3K-_9zn_i3QNlPrCybT3KtclkPaKhY3lsVsQ9Vboy9v-ldKDzXPWgOZ7nKfml2ovvPBJntoSt6RqmVuT8',
                }}
                style={styles.socialIconImage}
              />
              <Text style={styles.socialBtnText}>GOOGLE</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            {/* router.back() safely returns the user to the login screen */}
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brandGreen,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 80, // Clearance for bottom text
  },
  glassPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.brandGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.brandGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 6,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 56,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: 'rgba(195, 200, 188, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingRight: 48,
    fontSize: 16,
    color: colors.onSurface,
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  actionBtn: {
    height: 56,
    backgroundColor: colors.brandGreen,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    shadowColor: colors.brandGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(195, 200, 188, 0.4)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  socialGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
  },
  socialBtn: {
    flex: 1,
    height: 56,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(195, 200, 188, 0.4)',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  socialIconImage: {
    width: 20,
    height: 20,
  },
  socialBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: 1.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.brandGreen,
  },
  bottomWatermark: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    width: '100%',
    alignItems: 'center',
  },
  bottomWatermarkText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3,
  },
});