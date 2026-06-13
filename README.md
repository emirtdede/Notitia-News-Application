# Notitia Mobile App

<p align="center">
  <a href="#english">English</a> | <a href="#türkçe">Türkçe</a>
</p>

---

<a id="english"></a>
# English

Notitia is a modern, high-fidelity React Native mobile application built with Expo and Firebase. The application is designed to act as a centralized news aggregator, enabling users to quickly access various news portals under organized categories, manage a persistent personalized favorites list, and manage their user profiles securely.

## 📱 Application Screenshots

Here are some of the high-fidelity screens from the application design:

| Welcome | Sign In | Categories (Closed) | Categories (Open) | Favorites | Settings |
| :---: | :---: | :---: | :---: | :---: | :---: |
| ![Welcome](./Figma%20Design/1.Welcome.png) | ![Sign In](./Figma%20Design/2.1%20Sign%20in.png) | ![Categories](./Figma%20Design/Categories.png) | ![Categories Open](./Figma%20Design/Categories-open.png) | ![Favorites](./Figma%20Design/3.1%20Favorites.png) | ![Settings](./Figma%20Design/4.%20User%20Settings.png) |

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

---

<a id="türkçe"></a>
# Türkçe

Notitia, Expo ve Firebase kullanılarak geliştirilmiş, modern ve yüksek doğruluklu (high-fidelity) bir React Native mobil uygulamasıdır. Uygulama, kullanıcıların organize edilmiş kategoriler altındaki çeşitli haber portallarına hızlı bir şekilde erişmesini, kişiselleştirilmiş sık kullanılanlar (favoriler) listesini yönetmesini ve kullanıcı profillerini güvenli bir şekilde yönetmesini sağlayan merkezi bir haber toplayıcı olarak tasarlanmıştır.

## 📱 Uygulama Ekran Görüntüleri

Uygulama tasarımındaki yüksek doğruluklu ekran görüntülerinden bazıları aşağıdadır:

| Karşılama | Giriş Yap | Kategoriler (Kapalı) | Kategoriler (Açık) | Sık Kullanılanlar | Ayarlar |
| :---: | :---: | :---: | :---: | :---: | :---: |
| ![Welcome](./Figma%20Design/1.Welcome.png) | ![Sign In](./Figma%20Design/2.1%20Sign%20in.png) | ![Categories](./Figma%20Design/Categories.png) | ![Categories Open](./Figma%20Design/Categories-open.png) | ![Favorites](./Figma%20Design/3.1%20Favorites.png) | ![Settings](./Figma%20Design/4.%20User%20Settings.png) |

---

## 🚀 Temel Özellikler

* **Animasyonlu Tanıtım Akışı:** Akıcı bir fade-in/fade-out (giriş/çıkış) efektiyle çalışan Splash Screen ve ardından uygulamanın temel yeteneklerini açıklayan bir başlangıç tanıtım (onboarding) turu.
* **Güvenli Kimlik Doğrulama Sistemi:** Firebase Authentication tarafından desteklenen, klasik E-posta/Şifre ile kayıt ve giriş yapmanın yanı sıra Google ile Giriş Yap (Google Sign-in) seçeneği.
* **Haber Paneli:** 9 farklı sektörde (Genel, Finans, Teknoloji, Bilim, Kültür, Spor, Sağlık, Eğitim, Yaşam Tarzı) ulusal ve uluslararası büyük haber platformlarının akıcı, katlanabilir akordeon menülerle listelenmesi.
* **Kalıcı Sık Kullanılanlar Sistemi (CRUD):** Kullanıcıların özel haber siteleri ekleyebildiği, mevcut favorilerin bilgilerini düzenleyebildiği veya doğrudan silebildiği bir yapı. Tüm işlemler Cloud Firestore ile gerçek zamanlı olarak senkronize edilir.
* **Etkileşimli Profil Yönetimi:** Kullanıcı bilgilerinin (Ad, E-posta, Doğum Tarihi, Ülke) Firestore'da saklandığı, premium özel seçim modalları ve güvenli şifre değiştirme ekranı.
* **Akıcı Geçişler:** Akıcı bir kullanıcı deneyimi sağlamak amacıyla tüm navigasyon yığınına uygulanan özel kart geçiş animasyonları (fade card interpolation).

---

## 🛠️ Teknoloji Yığını

* **Çatı:** React Native (Expo SDK 51)
* **Navigasyon:** React Navigation (Özel geçiş animasyonlarına sahip Stack Navigator)
* **Arka Plan Servisleri:** Firebase v10
  * **Kimlik Doğrulama:** Firebase Auth (E-posta/Şifre ve Google OAuth)
  * **Veritabanı:** Cloud Firestore (Gerçek zamanlı NoSQL doküman deposu)
* **Durum Yönetimi:** React Hooks (`useState`, `useEffect`, `useRef`)
* **Çevre Güvenliği:** Expo Public Çevre Değişkenleri (.env)

---

## 📁 Dosya Yapısı

```text
NotitiaApp/
├── .expo/                   # Expo yapılandırması ve meta verileri
├── Figma Design/            # Uygulama ekran görüntüleri ve taslakları
├── Proje Belgeleri/         # Proje belgeleri ve kaynak varlıklar
├── android/                 # Yerel Android proje yapılandırması
├── assets/                  # Uygulama resimleri, logoları ve simgeleri
├── screens/                 # React Native Ekran Bileşenleri
│   ├── SplashScreen.js      # Animasyonlu açılış ekranı
│   ├── WelcomeScreen.js     # Tanıtım karşılama sayfası
│   ├── InfoScreen.js        # Özellikler listesi tanıtım sayfası
│   ├── LoginScreen.js       # Giriş, Kayıt ve hesap oluşturma akışı
│   ├── HomeScreen.js        # Kategorilere ayrılmış ana haber paneli
│   ├── FavoritesScreen.js   # Favori listesi ve favori Ekle/Düzenle görünümü
│   ├── UserSettingsScreen.js# Kullanıcı detayları ve ayarlar (Modallar)
│   └── ChangePasswordScreen.js # Güvenli şifre değiştirme akışı
├── App.js                   # Uygulama giriş noktası ve Stack Navigator
├── app.json                 # Expo yapılandırma dosyası
├── firebaseConfig.js        # Firebase SDK başlatma dosyası
└── package.json             # NPM bağımlılıkları ve betikleri
```

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Depoyu klonlayın
```bash
git clone https://github.com/emirtdede/Notitia-News-Application.git
cd Notitia-News-Application
```

### 2. Bağımlılıkları yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini Yapılandırın
Kök dizinde bir `.env` dosyası oluşturun ve Firebase kimlik bilgilerinizi ekleyin:
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

### 4. Uygulamayı çalıştırın
* **Tarayıcıda:**
  ```bash
  npm run web
  ```
* **Metro Bundler (fiziksel cihaz veya emülatör için):**
  ```bash
  npm run start
  ```
* **Android Emülatörü:**
  ```bash
  npm run android
  ```
