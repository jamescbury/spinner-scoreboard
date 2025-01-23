import { useState, useRef } from 'react'
import './spinner-wheel.css'

const SpinnerWheel = ({ participants, onSpinEnd }) => {
  // State for wheel rotation and spinning status
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const wheelRef = useRef(null)

  // Color palette for wheel slices - repeats if more participants than colors
  const colors = [
    '#FF61D8', // Pink
    '#4DC9FF', // Light Blue
    '#FFB800', // Orange
    '#4DED30', // Lime Green
    '#9B4DFF', // Purple
    '#FF4D4D', // Red
    '#34D3B4', // Turquoise
    '#FFD93D', // Yellow
  ]

  // Handles the spin action with randomization and animation
  const spin = () => {
    if (isSpinning || participants.length === 0) return

    setIsSpinning(true)
    // Spin at least 4 full rotations (1440 degrees) plus random amount
    const newRotation = rotation + 1440 + Math.random() * 360
    setRotation(newRotation)

    // Wait for spin animation to complete before selecting winner
    setTimeout(() => {
      setIsSpinning(false)
      const selectedIndex = Math.floor((newRotation % 360) / (360 / participants.length))
      onSpinEnd(participants[selectedIndex])
    }, 3000)
  }

  // Calculates the SVG path for each wheel slice
  const createSlicePath = (startAngle, endAngle) => {
    const center = 112.5 // half of wheel width (225/2)
    const start = {
      x: center + Math.cos(startAngle * Math.PI / 180) * center,
      y: center + Math.sin(startAngle * Math.PI / 180) * center
    }
    const end = {
      x: center + Math.cos(endAngle * Math.PI / 180) * center,
      y: center + Math.sin(endAngle * Math.PI / 180) * center
    }
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

    // Creates SVG arc path from center to edge and back
    return `M ${center} ${center} L ${start.x} ${start.y} A ${center} ${center} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`
  }

  // Calculates position and rotation for participant names in each slice
  const getTextPosition = (startAngle, endAngle) => {
    const radius = 75 // Distance from center for text placement
    const midAngle = (startAngle + endAngle) / 2
    const angleInRad = (midAngle * Math.PI) / 180
    const center = 112.5

    // Calculate position along the slice's center line
    return {
      x: center + radius * Math.cos(angleInRad),
      y: center + radius * Math.sin(angleInRad),
      rotation: midAngle + (midAngle > 90 && midAngle < 270 ? 180 : 0) // Flip text if in bottom half
    }
  }

  // Renders the wheel with all its slices and text
  const renderWheel = () => {
    if (participants.length === 0) {
      return (
        <div className="empty-wheel-message">
          Add participants to spin!
        </div>
      )
    }

    const sliceAngle = 360 / participants.length
    
    return participants.map((participant, index) => {
      const startAngle = index * sliceAngle
      const endAngle = (index + 1) * sliceAngle
      const textPos = getTextPosition(startAngle, endAngle)
      
      return (
        <g key={participant.id}>
          <path
            d={createSlicePath(startAngle, endAngle)}
            fill={colors[index % colors.length]}
            className="wheel-slice"
          />
          <text
            x={textPos.x}
            y={textPos.y}
            className="wheel-text"
            transform={`
              rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})
            `}
          >
            {participant.name}
          </text>
        </g>
      )
    })
  }

  return (
    <div className="spinner-container">
      <svg 
        ref={wheelRef}
        className="wheel"
        viewBox="0 0 225 225"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
        }}
      >
        {renderWheel()}
      </svg>
      <button 
        className="spin-button"
        onClick={spin}
        disabled={isSpinning || participants.length === 0}
      >
        SPIN
      </button>
    </div>
  )
}

export default SpinnerWheel 