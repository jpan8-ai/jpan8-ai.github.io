import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './RPGGame.css'

// Puzzle types
const PUZZLE_TYPES = {
  MATH: 'math',
  PATTERN: 'pattern',
  RIDDLE: 'riddle',
  SEQUENCE: 'sequence'
}

// Sample puzzles
const PUZZLES = [
  { type: PUZZLE_TYPES.MATH, question: 'What is 7 × 8?', answer: '56', hints: ['Think multiplication'] },
  { type: PUZZLE_TYPES.MATH, question: 'What is 144 ÷ 12?', answer: '12', hints: ['Division'] },
  { type: PUZZLE_TYPES.MATH, question: 'What is 25 + 37?', answer: '62', hints: ['Just add them'] },
  { type: PUZZLE_TYPES.SEQUENCE, question: 'Complete: 2, 4, 8, 16, __?', answer: '32', hints: ['Powers of 2'] },
  { type: PUZZLE_TYPES.SEQUENCE, question: 'Complete: 1, 1, 2, 3, 5, 8, __?', answer: '13', hints: ['Fibonacci sequence'] },
  { type: PUZZLE_TYPES.RIDDLE, question: 'I have keys but no locks. I have space but no room. You can enter but never go outside. What am I?', answer: 'keyboard', hints: ['Computer related'] },
  { type: PUZZLE_TYPES.RIDDLE, question: 'The more you take, the more you leave behind. What am I?', answer: 'footsteps', hints: ['Walking'] },
  { type: PUZZLE_TYPES.PATTERN, question: 'What comes next: A, C, E, G, __?', answer: 'I', hints: ['Odd letters'] },
  { type: PUZZLE_TYPES.PATTERN, question: 'What comes next: 1, 4, 9, 16, __?', answer: '25', hints: ['Square numbers'] },
]

// Room definitions
const ROOMS = [
  { id: 1, name: 'Entrance Hall', description: 'You stand at the entrance of the ancient dungeon.', x: 1, y: 1, visited: false },
  { id: 2, name: 'Library', description: 'Dusty books line the walls. A puzzle guards the next passage.', x: 2, y: 1, visited: false, puzzle: true },
  { id: 3, name: 'Armory', description: 'Old weapons hang on the walls. The floor is creaky.', x: 3, y: 1, visited: false, item: 'sword', puzzle: true },
  { id: 4, name: 'Garden', description: 'Strange glowing plants grow here. The air smells sweet.', x: 1, y: 2, visited: false, potion: 'health', puzzle: true },
  { id: 5, name: 'Observatory', description: 'A dome opens to the starry sky. Ancient star charts cover the walls.', x: 2, y: 2, visited: false, puzzle: true },
  { id: 6, name: 'Treasure Room', description: 'Gold and jewels sparkle in the torchlight!', x: 3, y: 2, visited: false, treasure: true, puzzle: true },
]

export default function RPGGame() {
  const [player, setPlayer] = useState({
    hp: 100,
    maxHp: 100,
    xp: 0,
    level: 1,
    inventory: [],
    currentRoom: 1,
    solvedPuzzles: []
  })

  const [gameState, setGameState] = useState('explore') // explore, puzzle, combat, victory
  const [currentPuzzle, setCurrentPuzzle] = useState(null)
  const [puzzleInput, setPuzzleInput] = useState('')
  const [hintIndex, setHintIndex] = useState(0)
  const [message, setMessage] = useState('Welcome to the Dungeon! Explore and solve puzzles to progress.')
  const [combatEnemy, setCombatEnemy] = useState(null)
  const [combatDamage, setCombatDamage] = useState(null)

  const currentRoom = ROOMS.find(r => r.id === player.currentRoom)

  const checkLevelUp = useCallback((newXp) => {
    const newXpTotal = newXp || player.xp
    if (newXpTotal >= player.level * 100) {
      setPlayer(p => ({
        ...p,
        xp: newXpTotal - player.level * 100,
        level: p.level + 1,
        maxHp: p.maxHp + 20,
        hp: p.maxHp + 20
      }))
      return true
    }
    return false
  }, [player.level, player.xp, player.maxHp])

  const movePlayer = (direction) => {
    let newX = currentRoom.x
    let newY = currentRoom.y

    if (direction === 'up') newY -= 1
    if (direction === 'down') newY += 1
    if (direction === 'left') newX -= 1
    if (direction === 'right') newX += 1

    const newRoom = ROOMS.find(r => r.x === newX && r.y === newY)

    if (newRoom) {
      setPlayer(p => ({ ...p, currentRoom: newRoom.id, solvedPuzzles: [...newRoom.puzzle && !p.solvedPuzzles.includes(newRoom.id) ? p.solvedPuzzles : p.solvedPuzzles] }))
      setMessage(`You enter ${newRoom.name}. ${newRoom.description}`)
    } else {
      setMessage("You can't go that way.")
    }
  }

  const startPuzzle = () => {
    if (player.solvedPuzzles.includes(currentRoom.id)) {
      setMessage("You've already solved this room's puzzle!")
      return
    }
    const puzzle = PUZZLES[Math.floor(Math.random() * PUZZLES.length)]
    setCurrentPuzzle({ ...puzzle, roomId: currentRoom.id })
    setPuzzleInput('')
    setHintIndex(0)
    setGameState('puzzle')
    setMessage(`Puzzle Room: ${currentRoom.name}`)
  }

  const checkAnswer = () => {
    if (puzzleInput.toLowerCase().trim() === currentPuzzle.answer.toLowerCase()) {
      setMessage('Correct! You solved the puzzle!')
      setPlayer(p => ({
        ...p,
        xp: p.xp + 25,
        solvedPuzzles: [...p.solvedPuzzles, currentPuzzle.roomId]
      }))
      checkLevelUp(player.xp + 25)
      setGameState('explore')
      setCurrentPuzzle(null)
      setPuzzleInput('')
    } else {
      setMessage('Wrong answer! Try again.')
      setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - 5) }))
    }
  }

  const showHint = () => {
    if (hintIndex < currentPuzzle.hints.length) {
      setMessage(`Hint: ${currentPuzzle.hints[hintIndex]}`)
      setHintIndex(h => h + 1)
      setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - 2) }))
    }
  }

  const pickupItem = (item, type) => {
    if (player.inventory.find(i => i.type === type)) {
      setMessage(`You already have a ${type === 'health' ? 'potion' : 'item'}!`)
      return
    }
    setPlayer(p => ({
      ...p,
      inventory: [...p.inventory, { type, name: item, icon: type === 'health' ? '🧪' : '⚔️' }],
      hp: type === 'health' ? Math.min(p.maxHp, p.hp + 50) : p.hp
    }))
    setMessage(`You picked up a ${type === 'health' ? 'health potion' : item}!`)
  }

  const usePotion = () => {
    const potion = player.inventory.find(i => i.type === 'health')
    if (potion) {
      setPlayer(p => ({
        ...p,
        hp: Math.min(p.maxHp, p.hp + 50),
        inventory: p.inventory.filter(i => i.type !== 'health')
      }))
      setMessage('You used a health potion! +50 HP')
    }
  }

  const encounterEnemy = () => {
    const enemies = [
      { name: 'Goblin', hp: 30, damage: 10 },
      { name: 'Skeleton', hp: 40, damage: 15 },
      { name: 'Dark Wizard', hp: 50, damage: 20 }
    ]
    const enemy = enemies[Math.floor(Math.random() * enemies.length)]
    setCombatEnemy({ ...enemy, maxHp: enemy.hp })
    setGameState('combat')
    setMessage(`A ${enemy.name} appeared! Solve a puzzle to attack!`)
  }

  const combatPuzzle = () => {
    const puzzle = PUZZLES[Math.floor(Math.random() * PUZZLES.length)]
    setCurrentPuzzle({ ...puzzle, combat: true })
    setPuzzleInput('')
    setHintIndex(0)
    setMessage(`Combat Puzzle: Defeat the ${combatEnemy?.name}!`)
  }

  const combatAttack = () => {
    if (puzzleInput.toLowerCase().trim() === currentPuzzle.answer.toLowerCase()) {
      const damage = 15 + player.level * 5
      const newEnemyHp = combatEnemy.hp - damage
      
      if (newEnemyHp <= 0) {
        setMessage(`You defeated the ${combatEnemy.name}! +40 XP`)
        setPlayer(p => ({
          ...p,
          xp: p.xp + 40,
          solvedPuzzles: [...p.solvedPuzzles, `combat_${Date.now()}`]
        }))
        checkLevelUp(player.xp + 40)
        setCombatEnemy(null)
        setCurrentPuzzle(null)
        setGameState('explore')
      } else {
        setMessage(`Hit! ${damage} damage. Enemy has ${newEnemyHp} HP left.`)
        setCombatEnemy(e => ({ ...e, hp: newEnemyHp }))
        
        // Enemy counter-attack
        setTimeout(() => {
          setCombatDamage(combatEnemy.damage)
          setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - combatEnemy.damage) }))
          setTimeout(() => setCombatDamage(null), 500)
        }, 300)
      }
      setPuzzleInput('')
    } else {
      setMessage('Wrong! The enemy attacks!')
      setCombatDamage(combatEnemy.damage)
      setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - combatEnemy.damage) }))
      setTimeout(() => setCombatDamage(null), 500)
    }
  }

  if (player.hp <= 0) {
    return (
      <div className="rpg-game game-over">
        <motion.div 
          className="game-over-content"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h1>Game Over</h1>
          <p>You were defeated in the dungeon...</p>
          <p>Level reached: {player.level}</p>
          <p>Puzzles solved: {player.solvedPuzzles.filter(id => typeof id === 'number').length}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => setPlayer({
              hp: 100, maxHp: 100, xp: 0, level: 1, 
              inventory: [], currentRoom: 1, solvedPuzzles: []
            })}
          >
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="rpg-game">
      <AnimatePresence mode="wait">
        {gameState === 'victory' && (
          <motion.div 
            className="victory-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>🎉 Victory! 🎉</h1>
            <p>You conquered the dungeon!</p>
            <p>Level: {player.level}</p>
            <p>Puzzles Solved: {player.solvedPuzzles.length}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-icon">❤️</span>
          <div className="stat-bar">
            <motion.div 
              className="stat-fill health"
              initial={{ width: `${(player.hp / player.maxHp) * 100}%` }}
              animate={{ width: `${(player.hp / player.maxHp) * 100}%` }}
            />
          </div>
          <span className="stat-value">{player.hp}/{player.maxHp}</span>
        </div>
        <div className="stat">
          <span className="stat-icon">⭐</span>
          <span>{player.xp}/{player.level * 100} XP</span>
        </div>
        <div className="stat">
          <span className="stat-icon">📊</span>
          <span>Level {player.level}</span>
        </div>
        <div className="stat">
          <span className="stat-icon">🎒</span>
          <span>{player.inventory.length} items</span>
        </div>
      </div>

      {/* Message Display */}
      <motion.div 
        className="game-message"
        key={message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {message}
      </motion.div>

      {/* Game Areas */}
      <AnimatePresence mode="wait">
        {gameState === 'explore' && (
          <motion.div 
            className="game-area explore"
            key="explore"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Mini Map */}
            <div className="mini-map">
              <h3>Dungeon Map</h3>
              <div className="map-grid">
                {ROOMS.map(room => (
                  <div 
                    key={room.id}
                    className={`map-cell ${room.id === player.currentRoom ? 'current' : ''} ${player.solvedPuzzles.includes(room.id) ? 'solved' : ''}`}
                  >
                    {room.id}
                  </div>
                ))}
              </div>
            </div>

            {/* Room Display */}
            <div className="room-display">
              <div className="room-header">
                <h2>{currentRoom?.name}</h2>
                <span className="room-coords">({currentRoom?.x}, {currentRoom?.y})</span>
              </div>
              <p className="room-description">{currentRoom?.description}</p>
              
              {/* Room Actions */}
              <div className="room-actions">
                {currentRoom?.puzzle && !player.solvedPuzzles.includes(currentRoom.id) && (
                  <button className="action-btn puzzle" onClick={startPuzzle}>
                    🧩 Solve Puzzle
                  </button>
                )}
                {currentRoom?.puzzle && player.solvedPuzzles.includes(currentRoom.id) && (
                  <span className="solved-badge">✓ Puzzle Solved</span>
                )}
                {currentRoom?.item && !player.inventory.find(i => i.name === currentRoom.item) && (
                  <button className="action-btn item" onClick={() => pickupItem(currentRoom.item, 'sword')}>
                    ⚔️ Pick up {currentRoom.item}
                  </button>
                )}
                {currentRoom?.potion && !player.inventory.find(i => i.type === 'health') && (
                  <button className="action-btn item" onClick={() => pickupItem('Health Potion', 'health')}>
                    🧪 Pick up Health Potion
                  </button>
                )}
                {currentRoom?.treasure && (
                  <motion.button 
                    className="action-btn treasure"
                    onClick={() => {
                      setPlayer(p => ({ ...p, xp: p.xp + 100 }))
                      checkLevelUp(player.xp + 100)
                      setGameState('victory')
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🏆 Claim Treasure!
                  </motion.button>
                )}
                <button className="action-btn combat" onClick={encounterEnemy}>
                  ⚔️ Search for Enemies
                </button>
              </div>
            </div>

            {/* Movement */}
            <div className="movement-controls">
              <button onClick={() => movePlayer('up')}>⬆️</button>
              <div className="movement-row">
                <button onClick={() => movePlayer('left')}>⬅️</button>
                <button onClick={() => movePlayer('down')}>⬇️</button>
                <button onClick={() => movePlayer('right')}>➡️</button>
              </div>
            </div>

            {/* Inventory */}
            <div className="inventory-panel">
              <h4>Inventory</h4>
              <div className="inventory-items">
                {player.inventory.length === 0 ? (
                  <span className="empty-inventory">Empty</span>
                ) : (
                  player.inventory.map((item, i) => (
                    <span key={i} className="inventory-item" title={item.name}>
                      {item.icon}
                    </span>
                  ))
                )}
              </div>
              {player.inventory.find(i => i.type === 'health') && (
                <button className="use-potion-btn" onClick={usePotion}>
                  🧪 Use Potion
                </button>
              )}
            </div>
          </motion.div>
        )}

        {gameState === 'puzzle' && currentPuzzle && (
          <motion.div 
            className="game-area puzzle"
            key="puzzle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <div className="puzzle-card">
              <h2>🧩 Puzzle Challenge</h2>
              <div className="puzzle-type">{currentPuzzle.type.toUpperCase()}</div>
              <p className="puzzle-question">{currentPuzzle.question}</p>
              
              <input
                type="text"
                value={puzzleInput}
                onChange={(e) => setPuzzleInput(e.target.value)}
                placeholder="Your answer..."
                className="puzzle-input"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                autoFocus
              />
              
              <div className="puzzle-actions">
                <button className="btn" onClick={() => {
                  setGameState('explore')
                  setCurrentPuzzle(null)
                  setPuzzleInput('')
                }}>
                  Give Up (-10 HP)
                </button>
                <button className="btn btn-primary" onClick={checkAnswer}>
                  Submit Answer
                </button>
              </div>
              
              <button className="hint-btn" onClick={showHint}>
                💡 Hint (-2 HP)
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'combat' && combatEnemy && (
          <motion.div 
            className="game-area combat"
            key="combat"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <div className="combat-scene">
              <div className="combat-header">
                <h2>⚔️ Combat!</h2>
              </div>

              <div className="combat-arena">
                <motion.div 
                  className="player-combat"
                  animate={combatDamage ? { x: -10 } : { x: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="combat-sprite">🧙</div>
                  <div className="combat-stats">
                    <span>You</span>
                    <div className="hp-bar">
                      <motion.div 
                        className="hp-fill player-hp"
                        initial={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                      />
                    </div>
                    <span>{player.hp}/{player.maxHp} HP</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="enemy-combat"
                  animate={combatDamage ? { x: 10 } : { x: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="combat-sprite">👹</div>
                  <div className="combat-stats">
                    <span>{combatEnemy.name}</span>
                    <div className="hp-bar">
                      <motion.div 
                        className="hp-fill enemy-hp"
                        initial={{ width: `${(combatEnemy.hp / combatEnemy.maxHp) * 100}%` }}
                        animate={{ width: `${(combatEnemy.hp / combatEnemy.maxHp) * 100}%` }}
                      />
                    </div>
                    <span>{combatEnemy.hp}/{combatEnemy.maxHp} HP</span>
                  </div>
                </motion.div>
              </div>

              {currentPuzzle ? (
                <div className="combat-puzzle">
                  <p className="combat-message">{message}</p>
                  <p className="puzzle-question">{currentPuzzle.question}</p>
                  <input
                    type="text"
                    value={puzzleInput}
                    onChange={(e) => setPuzzleInput(e.target.value)}
                    placeholder="Answer to attack!"
                    className="puzzle-input"
                    onKeyPress={(e) => e.key === 'Enter' && combatAttack()}
                    autoFocus
                  />
                  <div className="puzzle-actions">
                    <button className="btn" onClick={() => {
                      setCombatEnemy(null)
                      setCurrentPuzzle(null)
                      setGameState('explore')
                    }}>
                      Flee (-10 HP)
                    </button>
                    <button className="btn btn-primary" onClick={combatAttack}>
                      Attack!
                    </button>
                  </div>
                </div>
              ) : (
                <button className="combat-start-btn" onClick={combatPuzzle}>
                  Start Combat Puzzle
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
