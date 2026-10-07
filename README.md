# ADMO Frontend


### Authentication
- Splash screen
- Login
- Create account
- Forgot/reset password
- Account-created confirmation

### ADMO Box setup
- Three-step Add ADMO Box progress flow
- QR-code connection 
- Manual 6-character device-code entry
- Person information setup: name, age, and optional note
- Box-added confirmation
- Camera permission handling and manual-code fallback

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

### History
- All / Taken / Late / Missed filters
- Medication-event history grouped by day
- Dose status and pill count

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

## Project structure

- `src/components` — reusable ADMO UI components
- `src/screens` — application screens
- `src/theme` — shared colors/design tokens
- `src/navigation.ts` — navigation route types
- `assets` — ADMO logo and medication-wheel assets
- `App.tsx` — root navigation configuration
