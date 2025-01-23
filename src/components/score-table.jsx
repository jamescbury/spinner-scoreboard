import { useState } from 'react'
import './score-table.css'

const ScoreTable = ({ 
  participants, 
  onAddParticipant, 
  onUpdateScore, 
  onReturnToWheel 
}) => {
  // State for new participant name input
  const [newName, setNewName] = useState('')

  // Handle form submission for new participant
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName.trim()) {
      onAddParticipant(newName.trim())
      setNewName('') // Clear input after adding
    }
  }

  return (
    <div className="score-table">
      <h3>Score Entry</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.score}</td>
              <td>
                {/* Score adjustment and return to wheel buttons */}
                <button onClick={() => onUpdateScore(participant.id, 1)}>+</button>
                <button onClick={() => onUpdateScore(participant.id, -1)}>-</button>
                <button 
                  className="return-button"
                  onClick={() => onReturnToWheel(participant.id)}
                  title="Return to wheel"
                >
                  ↺
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* New participant form */}
      <form onSubmit={handleSubmit} className="add-participant-form">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter participant name"
        />
        <button type="submit">Add Participant</button>
      </form>
    </div>
  )
}

export default ScoreTable 