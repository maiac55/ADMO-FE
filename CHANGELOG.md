# Changelog

All notable frontend changes to ADMO are documented here.

## 2026-09-20

### Added
- Complete authentication UI: Splash, Login, Register, Forgot Password, and Account Created.
- Three-step Add ADMO Box setup flow with progress indicator.
- Progress connector lines that fill as setup steps are completed.
- Manual 6-character alphanumeric device-code entry screen.
- Real QR-code scanning flow using Expo Camera.
- Camera permission handling and manual device-code fallback.
- Person information step for name, age, and optional note.
- Box-added confirmation flow.
- Home dashboard with next medication and today's schedule.
- Seven medication-wheel assets with automatic selection based on the device's local day.
- Notifications screen and dashboard notification entry point.
- Today's Schedule screen under the Home flow.
- Medications tab with All / Active / Inactive filters.
- Medication empty state for accounts with no medications.
- Populated medication-list layout with status, dose, schedule, and navigation.
- Add Medication screen.
- History tab with All / Taken / Late / Missed filters.
- Account-owner Profile screen.
- Connected ADMO Boxes management screen with search and status filters.
- Individual ADMO Box user profile screen.
- Navigation from account Profile to connected boxes and box-user details.
- Ability to start another Add ADMO Box flow from box management.

### Changed
- Main bottom navigation standardized to Home / Medications / History / Profile.
- Medications tab icon changed from the previous medical/star-style icon to a pill-oriented icon.
- Today's Schedule remains part of Home and keeps Home selected in the bottom navigation.
- Medication rows in Today's Schedule navigate to Medications.
- Medications and History segmented controls now use the stronger turquoise selected state with white text.
- Removed the top-right Add Medication plus button.
- Removed the plus symbol from the main Add medication button.
- Account Created now requires continuing through Connect your ADMO Box; Set up later was removed.
- Add Box progress styling now includes completed connector segments.
- Manual device-code Connect button now uses the same pill-shaped rounding as other primary buttons.
- History entries no longer reference legacy Disk 01 / Disk 02 / Disk 03 terminology.
- Profile architecture separated the logged-in account owner from individual ADMO Box users.
- ADMO Box management is a child flow of Profile and therefore does not use the main bottom navigation.
- Week wheel changed from an SVG concept to consistent image assets and later removed decorative day dots.

### Architecture / backend handoff
- Current box users, medication entries, schedules, history, and account information include frontend sample data.
- Empty vs populated medication states are intended to be selected dynamically from persisted medication data.
- QR and manual device codes currently continue through the frontend flow; backend validation will later verify real devices.
- Intended relationship: one account can manage multiple ADMO Boxes, with one person profile associated with each box.
