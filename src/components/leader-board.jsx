import './leader-board.css'

const LeaderBoard = ({ participants }) => {
  // Get top 5 participants sorted by score
  const topParticipants = [...participants]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  // Returns appropriate medal emoji for top 3 positions, numbers for others
  const getMedalEmoji = (rank) => {
    switch(rank) {
      case 0: return '🥇' // Gold
      case 1: return '🥈' // Silver
      case 2: return '🥉' // Bronze
      default: return (rank + 1).toString()
    }
  }

  return (
    <div className="leader-board">
      <h3>Top Five Leaderboard</h3>
      <table className="leader-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {topParticipants.map((participant, index) => (
            <tr key={participant.id}>
              <td className="leader-rank">
                {/* Show medal for top 3, numbers for others */}
                {index <= 2 ? (
                  <span className="medal">{getMedalEmoji(index)}</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </td>
              <td className="leader-name">{participant.name}</td>
              <td className="leader-score">{participant.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoard 