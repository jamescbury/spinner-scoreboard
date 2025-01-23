# Spinner Scoreboard

A React-based application for randomly selecting names from a group, with score tracking and leaderboard functionality.

## Features

- Interactive spinning wheel for random name selection
- Score tracking for each participant
- Top 5 leaderboard with medal indicators
- Option to remove names after selection
- Manual return-to-wheel functionality
- Score adjustment controls (+/-)
- Dark theme UI

## Usage

1. Add participants using the input form at the bottom
2. Click 'SPIN' to randomly select a participant
3. Use +/- buttons to adjust scores
4. Toggle 'Remove Name After Spin' to control name removal
5. Use the return arrow (↺) to manually add removed names back to the wheel
6. View top performers in the leaderboard

## Technical Details

Built with:
- React
- SVG for wheel rendering
- CSS3 for styling and animations
- Modern JavaScript features

## Installation

```bash
npm install
npm run dev
```

## Component Structure

- App.jsx: Main application container and state management
- SpinnerWheel: SVG-based wheel component with spin animation
- LeaderBoard: Displays top 5 participants
- ScoreTable: Manages participant list and scores

## Component Hierarchy Diagram

```mermaid
graph TD
    %% Main App and State
    subgraph App[App.jsx]
        AppState["State Management
        participants[]
        selectedParticipant
        pickedParticipants
        removeAfterSpin"]
    end

    %% Components with their primary actions
    subgraph Wheel[Spinner Section]
        SW[SpinnerWheel]
        SpinAction["Spin Action
        onSpinEnd()"]
    end

    subgraph Score[Score Management]
        ST[ScoreTable]
        ScoreActions["Score Actions
        onAddParticipant()
        onUpdateScore()
        onReturnToWheel()"]
    end

    subgraph Display[Display Section]
        LB[LeaderBoard]
    end

    %% Component Relationships
    App --> SW
    App --> ST
    App --> LB

    %% Data Flow - State to Components
    AppState --> |"participants
    availableParticipants"|SW
    AppState --> |participants|LB
    AppState --> |participants|ST

    %% Action Flow
    SW --> SpinAction
    SpinAction --> |updates|AppState
    
    ST --> ScoreActions
    ScoreActions --> |updates|AppState

    %% Styling
    classDef component fill:#2d2d2d,stroke:#363636,color:white
    classDef state fill:#363636,stroke:#4CAF50,color:white
    classDef action fill:#404040,stroke:#4DC9FF,color:white
    classDef section fill:#1a1a1a,stroke:#505050,color:white

    class App,SW,LB,ST component
    class AppState state
    class SpinAction,ScoreActions action
    class Wheel,Score,Display section