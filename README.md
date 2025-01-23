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
    subgraph App [App.jsx]
        AppState[State Management<br/>participants[]<br/>selectedParticipant<br/>pickedParticipants<br/>removeAfterSpin]
    end

    subgraph MainComponents [Main Components]
        SW[SpinnerWheel]
        LB[LeaderBoard]
        ST[ScoreTable]
    end

    subgraph DataFlow [Data & Actions]
        Spin[Spin Action]
        Score[Score Updates]
        Add[Add Participant]
        Return[Return to Wheel]
    end

    %% Component Connections
    App --> SW
    App --> LB
    App --> ST

    %% Data Flow
    AppState --> |participants<br/>availableParticipants|SW
    AppState --> |participants|LB
    AppState --> |participants|ST
    
    %% Actions
    SW --> |onSpinEnd|AppState
    ST --> |onAddParticipant<br/>onUpdateScore<br/>onReturnToWheel|AppState

    %% Styling
    classDef component fill:#2d2d2d,stroke:#363636,color:white
    classDef state fill:#363636,stroke:#4CAF50,color:white
    classDef action fill:#404040,stroke:#4DC9FF,color:white

    class App,SW,LB,ST component
    class AppState state
    class Spin,Score,Add,Return action