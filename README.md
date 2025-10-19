# 🏙️ UrbanEye – City Locator

**Live Demo:** [urban-eye-location-finder.vercel.app](https://urban-eye-location-finder.vercel.app)

UrbanEye is an interactive **city locator web app** built with **React** and **Leaflet.js**. It allows users to search any city worldwide, view its location on a dynamic map, and explore essential city details like population, coordinates, timezone, and more. Users can toggle between **Street** and **Satellite** map views for a richer experience.

---

## 🚀 Features

- 🔍 **City Search:** Search any city using the Open-Meteo Geocoding API.  
- 🗺️ **Interactive Map:** View the exact city location using **React Leaflet**.  
- 🌍 **Map Modes:** Switch between **Street View** (OpenStreetMap) and **Satellite View** (ESRI World Imagery).  
- 📊 **City Details:** Displays region, subregion, coordinates, population, timezone, and elevation.  
- 💡 **Smooth Animations:** Map zooms smoothly to the selected city.  
- 🧭 **Accessible Design:** Keyboard navigation, ARIA labels, and responsive layout.  
- 📱 **Responsive UI:** Fully optimized for desktop and mobile.

---

## 🧩 Tech Stack

| Category        | Technology |
|-----------------|-------------|
| **Frontend**    | React.js |
| **Mapping**     | React Leaflet + Leaflet.js |
| **Icons**       | React Icons (FontAwesome) |
| **API**         | Open-Meteo Geocoding API |
| **Styling**     | Inline CSS with Google Fonts (`Audiowide`) |
| **Deployment**  | Vercel |

---

## 🏗️ Project Structure

```
UrbanEye_Location-Finder/
│
├── public/
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── CityLocator.jsx     # City search and map logic
│   │   └── Footer.jsx          # Footer section
│   │
│   ├── App.jsx                 # Main app entry combining components
│   ├── main.jsx                # Renders App to the DOM
│   └── index.css               # Optional global styles (minimal)
│
├── README.md
├── package.json
├── vite.config.js
├── .gitignore
│
└── node_modules/


```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SRCarlo/UrbanEye_Location-Finder.git
cd UrbanEye_Location-Finder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Project Locally
```bash
npm run dev
```
or if using CRA:
```bash
npm start
```

### 4. Open in Browser
Visit:
```
http://localhost:5173/
```
(or the port shown in your terminal)

---

## 🌐 API Reference

**Geocoding API:** [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)

**Example Endpoint:**
```
https://geocoding-api.open-meteo.com/v1/search?name=London&count=10
```

---

## 🧠 Key Learnings

- Integrating **Leaflet maps** with React components.  
- Handling **asynchronous API calls** and managing loading/error states.  
- Designing **accessible and responsive UIs**.  
- Implementing **dynamic map updates** using React Leaflet’s `useMap()` hook.

---

## 🛠️ Future Enhancements

-🔍 City Search: Search any city using the Open-Meteo Geocoding API.
-🗺️ Interactive Map: View the exact city location using React Leaflet.
-🌍 Map Modes: Switch between Street View (OpenStreetMap) and Satellite View (ESRI World Imagery).
-📊 City Details: Displays region, subregion, coordinates, population, timezone, and elevation.
-💡 Smooth Animations: Map zooms smoothly to the selected city.
-🧭 Accessible Design: Keyboard navigation, ARIA labels, and responsive layout.
-📱 Responsive UI: Fully optimized for desktop and mobile.

---

## 👨‍💻 Author

**Developer:** [SRCarlo]  
**Live Demo:** [urban-eye-location-finder.vercel.app](https://urban-eye-location-finder.vercel.app)

---

## 📝 License

This project is licensed under the **MIT License** – feel free to use, modify, and share.
MIT License

Copyright (c) 2025 SRCarlo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND...

