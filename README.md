# VolunteerBridge

The is the back-end repository of our application. For the front-end repository please visit https://github.com/TechSpark-Solutions/VolunteerBridgeApp

VolunteerBridge is a mobile application designed to help nonprofits find volunteers with the right skills and availability for their projects and events. The app allows nonprofits to post volunteer opportunities, and individuals can browse and sign up for roles that match their interests and skills.

## Table of Contents

- [Features](#features)
- [Screens](#screens)
- [User Stories](#user-stories)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Features

- **Nonprofit Profiles**: Nonprofits can create profiles with information about their mission, projects, and volunteer needs.
- **Volunteer Dashboard**: Volunteers can browse and sign up for volunteer opportunities based on their skills and availability.
- **Skill Matching**: Matches volunteers with opportunities that align with their skills and interests.
- **Event Management**: Nonprofits can create and manage events, and volunteers can sign up to participate.
- **Feedback System**: Nonprofits and volunteers can provide feedback and ratings based on their experience.
- **Stretch: GPS and Location Services**: Volunteers can find volunteer opportunities near them using GPS.

## Screens

- **Landing/Login Screen**: Authentication screen utilizing OAuth.
- **Home Screen**: Main navigation screen.
- **Volunteer Dashboard**: Dashboard for volunteers to sign up for opportunities.
- **Admin Dashboard**: Dashboard for nonprofits to create and manage events.
- **Event List Screen** List view of all available opportunities.
- **Event Screen**: Detailed view of event information.
- **User Profile Settings**: Screen for managing user profiles.
- **Global Settings**: Screen for managing application settings.
- **Sign-Up Modal**: Modal for signing up for events.

## UML
![alt text](<img/VolunteerBridge UML.png>)


## User Stories

### User Story 1: Nonprofit Profile Creation
**As a** nonprofit representative,\
**I want** to create and manage a detailed profile for my organization,\
**so that** potential volunteers can learn about our mission, projects, and volunteer needs.

### User Story 2: Volunteer Opportunity Sign-Up
**As a** volunteer,\
**I want** to browse and sign up for volunteer opportunities that match my skills and availability,\
**so that** I can contribute effectively to causes I care about.

### User Story 3: Skill Matching
**As a** platform user,\
**I want** to be matched with volunteer opportunities that align with my skills and interests,\
**so that** I can use my abilities where they are most needed and make a meaningful impact.

### User Story 4: Event Management
**As a** nonprofit representative,\
**I want** to create and manage events on the platform,\
**so that** I can easily organize volunteer efforts and track participation.

### User Story 5: Feedback System
**As a** platform user,\
**I want** to provide and view feedback and ratings for volunteer experiences,\
**so that** I can ensure quality and accountability for both volunteers and nonprofits.

### User Story 6: Role-Based Access Control (RBAC) and Access Control List (ACL)
**As a** platform administrator,\
**I want** to manage user roles and permissions,\
**so that** I can ensure appropriate access and actions are granted based on user roles.

### User Story 7: GPS and Location Services for Event Finding (Stretch Goal)
**As a** volunteer,\
**I want** to use GPS and location services to find volunteer opportunities near me,\
**so that** I can easily participate in local events and contribute to my community.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: OAuth, replaced with biometrics using React Native in Expo

## Installation

### Prerequisites

- Node.js
- Expo CLI
- PostgreSQL

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/VolunteerBridge.git
   cd VolunteerBridge
   ```
2. Install dependencies:
```npm install```
3. ```npx expo start``` and scan QR code to access

