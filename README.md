# ADMO Frontend

React Native / Expo frontend reconstructed from the ADMO visual references.

## Included in this first build
- Splash
- Login
- Create account
- Reset password
- Account-created confirmation
- Responsive safe-area-aware layouts
- Reusable inputs, buttons, logo, background and navigation
- Placeholder routes for the next ADMO screens
- No backend logic yet

The iPhone bezel, Dynamic Island, iOS status bar, and home indicator from the reference mockups are intentionally **not** reproduced.

## Run it

Install Node.js first, then from this folder:

```bash
npm install
npx expo start
```

Install **Expo Go** on a phone and scan the QR code, or use the web/Android/iOS simulator.

## Backend handoff

Form values and button handlers are intentionally local/placeholder. The backend team can connect API/authentication calls without rebuilding the UI.

## Structure

- `src/components` reusable ADMO UI
- `src/screens` app screens
- `src/theme` shared colors
- `assets/admo-logo.png` logo supplied with the design
