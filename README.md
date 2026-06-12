# Notitia Mobile App

Notitia is a modern, high-fidelity React Native mobile application built with Expo and Firebase. The application is designed to act as a centralized news aggregator, enabling users to quickly access various news portals under organized categories, manage a persistent personalized favorites list, and manage their user profiles securely.

---

## 📱 Application Screenshots

Here are some of the high-fidelity screens from the application design:

| Welcome & Onboarding | Login & Authentication | Categories & Dashboard | Favorites & Management | User Settings |
| :---: | :---: | :---: | :---: | :---: |
| ![Welcome](./Figma%20Design/1.Welcome.png) | ![Sign In](./Figma%20Design/2.1%20Sign%20in.png) | ![Categories](./Figma%20Design/Categories.png) | ![Favorites](./Figma%20Design/3.1%20Favorites.png) | ![Settings](./Figma%20Design/4.%20User%20Settings.png) |

---

## 🚀 Key Features

* **Animated Onboarding Flow:** A smooth fade-in/fade-out Splash Screen transition followed by an onboarding walkthrough explaining the app's core capabilities.
* **Secure Authentication System:** Supported by Firebase Authentication with options for classic Email/Password registration/login and Google Sign-in.
* **News Aggregation Dashboard:** Categorized listing of major national and international news platforms across 9 sectors (General, Finance, Tech, Science, Culture, Sports, Health, Education, Lifestyle) with smooth collapsible accordions.
* **Persistent Favorites System (CRUD):** Users can add custom news websites, edit the metadata of existing favorites, or delete them directly. All actions are synchronized in real-time with Cloud Firestore under the user's specific credentials.
* **Interactive Profile Management:** Fully functional profile details (Name, Email, Date of Birth, Country) persisted in Firestore with custom, premium picker modals and a secure password modification sub-screen.
* **Smooth Transitions:** Custom fade card interpolations applied to the entire navigation stack for a fluid user experience.

---

## 🛠️ Technology Stack

* **Framework:** React Native (Expo SDK 51)
* **Navigation:** React Navigation (Stack Navigator with custom transition animations)
* **Backend Services:** Firebase v10
  * **Authentication:** Firebase Auth (Email/Password & Google OAuth)
  * **Database:** Cloud Firestore (Real-time NoSQL document store)
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)
* **Environment Security:** Expo Public Environment Variables (.env)

---

## 📁 File Structure

```text
NotitiaApp/
├── .expo/                   # Expo configuration and metadata
├── Figma Design/            # App screenshots and mockups
├── Proje Belgeleri/         # Project documentation and source assets
├── android/                 # Native Android project configuration
├── assets/                  # App images, logos, and icons
├── screens/                 # React Native Screen Components
│   ├── SplashScreen.js      # Animated entry screen
│   ├── WelcomeScreen.js     # Welcome onboarding page
│   ├── InfoScreen.js        # Features list onboarding page
│   ├── LoginScreen.js       # Login, Sign Up, & account creation flow
│   ├── HomeScreen.js        # Main categorized news dashboard
│   ├── FavoritesScreen.js   # Favorites list and Add/Edit favorites view
│   ├── UserSettingsScreen.js# User details and settings (Modals)
│   └── ChangePasswordScreen.js # Secure password change flow
├── App.js                   # Application entry and Stack Navigator
├── app.json                 # Expo configuration file
├── firebaseConfig.js        # Firebase SDK initialization
└── package.json             # NPM dependencies and scripts
```

---

## ⚙️ Installation & Running

### 1. Clone the repository
```bash
git clone https://github.com/emirtdede/Notitia-News-Application.git
cd Notitia-News-Application
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your Firebase credentials:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Run the application
* **Web Browser:**
  ```bash
  npm run web
  ```
* **Metro Bundler (for physical device scanning / emulator):**
  ```bash
  npm run start
  ```
* **Android Emulator:**
  ```bash
  npm run android
  ```
