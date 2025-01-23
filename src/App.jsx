import { useState } from 'react'
import SpinnerWheel from './components/spinner-wheel'
import ScoreTable from './components/score-table'
import LeaderBoard from './components/leader-board'
import './App.css'

function App() {
  // Core state management for the application
  const [participants, setParticipants] = useState([
    { name: 'Jamey', score: 0, id: 1 },
    { name: 'Jess', score: 0, id: 2 },
    { name: 'Ethan', score: 0, id: 3 },
    { name: 'Noah', score: 0, id: 4 }
  ]) // Stores all participants and their scores
  const [selectedParticipant, setSelectedParticipant] = useState(null) // Tracks last spun participant
  const [pickedParticipants, setPickedParticipants] = useState(new Set()) // Tracks who's been picked in current round
  const [removeAfterSpin, setRemoveAfterSpin] = useState(true) // Controls whether names are removed after spinning

  // Adds a new participant to the game
  const addParticipant = (name) => {
    setParticipants([...participants, { name, score: 0, id: Date.now() }])
  }

  // Updates a participant's score (increment can be positive or negative)
  const updateScore = (id, increment) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, score: p.score + increment } : p
    ))
  }

  // Resets the entire game state
  const resetAll = () => {
    setParticipants([])
    setSelectedParticipant(null)
    setPickedParticipants(new Set())
  }

  // Handles the end of a spin, managing participant selection and removal
  const handleSpinEnd = (participant) => {
    setSelectedParticipant(participant)
    
    if (removeAfterSpin) {
      const newPicked = new Set(pickedParticipants)
      newPicked.add(participant.id)
      
      // Reset picked list if everyone has been picked
      if (newPicked.size === participants.length) {
        setPickedParticipants(new Set())
      } else {
        setPickedParticipants(newPicked)
      }
    }
  }

  // Returns a participant to the wheel manually
  const handleReturnToWheel = (id) => {
    const newPicked = new Set(pickedParticipants)
    newPicked.delete(id)
    setPickedParticipants(newPicked)
  }

  // Filter out picked participants unless everyone has been picked
  const availableParticipants = participants.filter(p => 
    !pickedParticipants.has(p.id)
  )

  return (
    <div className="container">
      <div className="game-section">
        <div className="wheel-section">
          <SpinnerWheel 
            participants={availableParticipants.length ? availableParticipants : participants}
            onSpinEnd={handleSpinEnd}
          />
          {selectedParticipant && (
            <div className="selected-participant">
              Selected: {selectedParticipant.name}
              {pickedParticipants.size === participants.length - 1 && (
                <div className="round-complete">
                  Next spin starts a new round!
                </div>
              )}
            </div>
          )}
        </div>
        <LeaderBoard participants={participants} />
      </div>
      <ScoreTable
        participants={participants}
        onAddParticipant={addParticipant}
        onUpdateScore={updateScore}
        onReturnToWheel={handleReturnToWheel}
      />
      <div className="footer-controls">
        <div className="footer-left">
          <label className="remove-toggle">
            <input
              type="checkbox"
              checked={removeAfterSpin}
              onChange={(e) => setRemoveAfterSpin(e.target.checked)}
            />
            <span>Remove Name After Spin</span>
          </label>
        </div>
        <button 
          className="reset-button"
          onClick={resetAll}
          disabled={participants.length === 0}
        >
          Reset All
        </button>
      </div>
    </div>
  )
}

export default App
