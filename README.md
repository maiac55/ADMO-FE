# ADMO Frontend

ADMO is a React Native / Expo mobile frontend for a smart medication dispenser and companion app. The app is designed for account owners who can connect and manage one or more ADMO Boxes for themselves, family members, patients, or people in their care.

## Current frontend

### Authentication
- Splash screen
- Login
- Create account
- Forgot/reset password
- Account-created confirmation

### ADMO Box setup
- Three-step Add ADMO Box progress flow
- QR-code connection using the phone camera
- Manual 6-character device-code entry
- Person information setup: name, age, and optional note
- Box-added confirmation
- Camera permission handling and manual-code fallback

The QR/device code flow is functional on the frontend. Backend validation will later verify that a scanned or entered code belongs to a real, available ADMO Box.

### Home
- Current box-user identity and connection status
- Box-user selector entry point
- Next-medication card
- Automatic day-aware medication wheel
- Today's schedule preview
- Notifications entry point
- Main navigation: Home, Medications, History, Profile

### Medications
- All / Active / Inactive filters
- Empty state for new users with no medications
- Populated medication-list design
- Medication status, dose, schedule, and navigation
- Add Medication flow with medication, weekday, time, and dose setup

The final data source will determine whether the empty state or medication list is displayed.

### History
- All / Taken / Late / Missed filters
- Medication-event history grouped by day
- Dose status and pill count
- No legacy disk terminology

### Account and ADMO Box management
The Profile tab represents the logged-in account owner, while each connected ADMO Box has its own box-user profile.

- Account-owner Profile screen
- Account information and settings sections
- Connected ADMO Boxes entry point
- Searchable box-user list
- Connected / Attention / Inactive filtering
- Individual box-user profiles
- Name, age, optional note, box ID/status, and medications link
- Add another ADMO Box from the management screen

## Architecture

One account can manage multiple ADMO Boxes. Each box can be associated with its own person profile. The Home dashboard represents the currently selected box user, while the Profile tab represents the account owner.

Most data is currently frontend sample/local state. Authentication, persistent medications, box ownership, device validation, status syncing, and user data are intended to be connected to the backend without rebuilding the UI.

## Tech stack

- React Native
- Expo SDK 57
- TypeScript
- React Navigation
- Expo Camera
- Expo Linear Gradient
- Expo Vector Icons
- React Native SVG

## Run locally

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

On Windows PowerShell in the current development setup, use:

```bash
npm.cmd install
npx.cmd expo start
```

For a clean Metro restart:

```bash
npx.cmd expo start --clear
```

Install Expo Go on the phone and open the project from Expo.

## Project structure

- `src/components` — reusable ADMO UI components
- `src/screens` — application screens
- `src/theme` — shared colors/design tokens
- `src/navigation.ts` — navigation route types
- `assets` — ADMO logo and medication-wheel assets
- `App.tsx` — root navigation configuration

## Design notes

The frontend follows the ADMO teal/navy visual system with rounded controls, pale backgrounds, soft borders, and reusable navigation patterns. Device mockup elements from Figma references—such as the iPhone bezel, Dynamic Island, iOS status bar, and home indicator—are intentionally not reproduced as app UI.

## Backend handoff

Backend integration still needs to provide:
- Authentication and account persistence
- ADMO Box/device-code validation
- Box ownership and connection state
- Account-to-many-box relationships
- Persistent box-user profiles
- Medication CRUD and schedules
- Medication history/status events
- Notifications and device synchronization

See `CHANGELOG.md` for the frontend implementation history.
