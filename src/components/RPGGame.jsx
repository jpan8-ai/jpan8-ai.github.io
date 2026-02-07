import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
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

// Room definitions with graphics
const ROOMS = [
  { id: 1, name: 'Entrance Hall', description: 'You stand at the entrance of the ancient dungeon. Torches flicker on the stone walls.', x: 1, y: 1, icon: '🏛️', bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', decoration: '🏮🗡️📜', visited: false },
  { id: 2, name: 'Library', description: 'Dusty ancient tomes line the walls. Knowledge awaits those who are worthy.', x: 2, y: 1, icon: '📚', bgGradient: 'linear-gradient(135deg, #2d132c 0%, #801336 100%)', decoration: '📖🔮✨', puzzle: true, visited: false },
  { id: 3, name: 'Armory', description: 'Rusty weapons hang on the walls. Perhaps something useful remains.', x: 3, y: 1, icon: '⚔️', bgGradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)', decoration: '🛡️🗡️⚔️', item: 'sword', puzzle: true, visited: false },
  { id: 4, name: 'Enchanted Garden', description: 'Strange bioluminescent plants glow in the darkness. The air hums with magic.', x: 1, y: 2, icon: '🌿', bgGradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', decoration: '🍄🌸✨🦋', potion: 'health', puzzle: true, visited: false },
  { id: 5, name: 'Observatory', description: 'A dome opens to the starry sky. Ancient celestial charts cover the walls.', x: 2, y: 2, icon: '🔭', bgGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', decoration: '⭐🌙🪐✨', puzzle: true, visited: false },
  { id: 6, name: 'Treasure Chamber', description: 'Gold and jewels sparkle in the torchlight! The legendary treasure awaits!', x: 3, y: 2, icon: '🏆', bgGradient: 'linear-gradient(135deg, #b8860b 0%, #ffd700 50%, #b8860b 100%)', decoration: '💎👑💰⚱️', treasure: true, puzzle: true, visited: false },
]

// Enemy definitions
const ENEMIES = [
  { name: 'Goblin', hp: 30, damage: 10, icon: '👺', attackIcon: '🗡️', color: '#4ade80' },
  { name: 'Skeleton Warrior', hp: 45, damage: 15, icon: '💀', attackIcon: '🦴', color: '#e5e5e5' },
  { name: 'Dark Sorcerer', hp: 55, damage: 20, icon: '🧙', attackIcon: '🔮', color: '#a855f7' },
  { name: 'Shadow Knight', hp: 70, damage: 25, icon: '🗡️', attackIcon: '⚔️', color: '#ef4444' },
  { name: 'Ancient Dragon', hp: 100, damage: 35, icon: '🐉', attackIcon: '🔥', color: '#f97316' },
]

export default function RPGGame() {
  const [player, setPlayer] = useState({
    hp: 100, maxHp: 100, xp: 0, level: 1, inventory: [], currentRoom: 1, solvedPuzzles: [], attack: 10
  })

  const [gameState, setGameState] = useState('explore')
  const [currentPuzzle, setCurrentPuzzle] = useState(null)
  const [puzzleInput, setPuzzleInput] = useState('')
  const [hintIndex, setHintIndex] = useState(0)
  const [message, setMessage] = useState('Welcome to the Dungeon! Explore and solve puzzles to progress.')
  const [combatEnemy, setCombatEnemy] = useState(null)
  const [combatDamage, setCombatDamage] = useState(null)
  const [showParticles, setShowParticles] = useState(false)
  const [combo, setCombo] = useState(0)
  const [damageNumbers, setDamageNumbers] = useState([])

  const currentRoom = ROOMS.find(r => r.id === player.currentRoom)

  const createParticles = (type = 'success') => {
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 1000)
  }

  const showDamageNumber = (amount, type = 'damage') => {
    const id = Date.now()
    setDamageNumbers(prev => [...prev, { id, amount, type, x: Math.random() * 60 + 20 }])
    setTimeout(() => setDamageNumbers(prev => prev.filter(d => d.id !== id)), 1500)
  }

  const checkLevelUp = useCallback((newXp) => {
    const newXpTotal = newXp || player.xp
    if (newXpTotal >= player.level * 100) {
      setPlayer(p => ({
        ...p, xp: newXpTotal - player.level * 100, level: p.level + 1, maxHp: p.maxHp + 25, hp: p.maxHp + 25, attack: p.attack + 5
      }))
      return true
    }
    return false
  }, [player.level, player.xp, player.maxHp, player.attack])

  const movePlayer = (direction) => {
    let newX = currentRoom.x
    let newY = currentRoom.y
    if (direction === 'up') newY -= 1
    if (direction === 'down') newY += 1
    if (direction === 'left') newX -= 1
    if (direction === 'right') newX += 1

    const newRoom = ROOMS.find(r => r.x === newX && r.y === newY)
    if (newRoom) {
      setPlayer(p => ({ ...p, currentRoom: newRoom.id }))
      createParticles()
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
    setCombo(0)
    setGameState('puzzle')
    setMessage(`Puzzle Room: ${currentRoom.name}`)
    createParticles()
  }

  const checkAnswer = () => {
    if (puzzleInput.toLowerCase().trim() === currentPuzzle.answer.toLowerCase()) {
      const newCombo = combo + 1
      setCombo(newCombo)
      showDamageNumber((25 + newCombo * 5), 'xp')
      setMessage(`Correct! ${newCombo > 1 ? `Combo x${newCombo}! ` : ''}You solved the puzzle! +${25 + newCombo * 5} XP`)
      setPlayer(p => ({ ...p, xp: p.xp + 25 + newCombo * 5, solvedPuzzles: [...p.solvedPuzzles, currentPuzzle.roomId] }))
      checkLevelUp(player.xp + 25 + newCombo * 5)
      createParticles('success')
      setGameState('explore')
      setCurrentPuzzle(null)
      setPuzzleInput('')
      setCombo(0)
    } else {
      setMessage('Wrong answer! Try again.')
      setCombo(0)
      setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - 5) }))
      showDamageNumber(5, 'enemy')
    }
  }

  const showHint = () => {
    if (hintIndex < currentPuzzle.hints.length) {
      setMessage(`Hint: ${currentPuzzle.hints[hintIndex]}`)
      setHintIndex(h => h + 1)
      setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - 2) }))
      showDamageNumber(2, 'enemy')
    }
  }

  const pickupItem = (item, type) => {
    if (player.inventory.find(i => i.type === type)) {
      setMessage(`You already have a ${type === 'health' ? 'potion' : 'item'}!`)
      return
    }
    if (type === 'sword') {
      setPlayer(p => ({ ...p, inventory: [...p.inventory, { type, name: item, icon: '⚔️' }], attack: p.attack + 10 }))
      showDamageNumber(+10, 'attack')
    } else {
      setPlayer(p => ({ ...p, inventory: [...p.inventory, { type, name: item, icon: '🧪' }], hp: Math.min(p.maxHp, p.hp + 50) }))
      showDamageNumber(+50, 'heal')
    }
    createParticles('success')
    setMessage(`You picked up a ${item}!`)
  }

  const usePotion = () => {
    const potion = player.inventory.find(i => i.type === 'health')
    if (potion) {
      setPlayer(p => ({ ...p, hp: Math.min(p.maxHp, p.hp + 50), inventory: p.inventory.filter(i => i.type !== 'health') }))
      showDamageNumber(+50, 'heal')
      setMessage('You used a health potion! +50 HP')
    }
  }

  const encounterEnemy = () => {
    const enemyIndex = Math.min(Math.floor(player.level / 2), ENEMIES.length - 1)
    const enemy = ENEMIES[enemyIndex]
    setCombatEnemy({ ...enemy, maxHp: enemy.hp, level: enemyIndex + 1 })
    setCombo(0)
    setGameState('combat')
    setMessage(`A ${enemy.name} (Level ${enemyIndex + 1}) appeared!`)
    createParticles()
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
      const newCombo = combo + 1
      setCombo(newCombo)
      const baseDamage = 15 + player.level * 5 + player.attack
      const bonusDamage = newCombo * 3
      const damage = baseDamage + bonusDamage
      const newEnemyHp = combatEnemy.hp - damage
      
      showDamageNumber(damage, 'attack')
      
      if (newEnemyHp <= 0) {
        const xpGain = 40 + combatEnemy.level * 10 + newCombo * 10
        setMessage(`You defeated the ${combatEnemy.name}! +${xpGain} XP`)
        setPlayer(p => ({ ...p, xp: p.xp + xpGain, solvedPuzzles: [...p.solvedPuzzles, `combat_${Date.now()}`] }))
        checkLevelUp(player.xp + xpGain)
        createParticles('victory')
        setCombatEnemy(null)
        setCurrentPuzzle(null)
        setGameState('explore')
        setCombo(0)
      } else {
        setMessage(`Hit! ${damage} damage. Enemy has ${newEnemyHp} HP left.`)
        setCombatEnemy(e => ({ ...e, hp: newEnemyHp }))
        setTimeout(() => {
          const enemyDmg = combatEnemy.damage
          setCombatDamage(enemyDmg)
          setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - enemyDmg) }))
          showDamageNumber(enemyDmg, 'enemy')
          setTimeout(() => setCombatDamage(null), 500)
        }, 300)
      }
      setPuzzleInput('')
    } else {
      setMessage('Wrong! The enemy attacks!')
      setCombo(0)
      const enemyDmg = combatEnemy.damage
      setCombatDamage(enemyDmg)
      setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - enemyDmg) }))
      showDamageNumber(enemyDmg, 'enemy')
      setTimeout(() => setCombatDamage(null), 500)
    }
  }

  const fleeCombat = () => {
    setCombatEnemy(null)
    setCurrentPuzzle(null)
    setGameState('explore')
    setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - 10) }))
    setMessage('You fled from combat! Lost 10 HP.')
  }

  const getPlayerSprite = () => {
    const sprites = ['🧙‍♂️', '🧙', '🧝', '🧛', '🧟']
    return sprites[Math.min(player.level - 1, sprites.length - 1)]
  }

  if (player.hp <= 0) {
    return (
      <div className="rpg-game">
        <motion.div className="death-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="death-content" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', duration: 0.8 }}>
            <motion.div className="death-sprite" animate={{ y: [0, -20, 0], opacity: [1, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              💀
            </motion.div>
            <h1>☠️ GAME OVER ☠️</h1>
            <div className="death-stats">
              <p>Level Reached: <span>{player.level}</span></p>
              <p>Puzzles Solved: <span>{player.solvedPuzzles.filter(id => typeof id === 'number').length}</span></p>
              <p>Enemies Defeated: <span>{player.solvedPuzzles.filter(id => typeof id === 'string' && id.startsWith('combat')).length}</span></p>
            </div>
            <motion.button className="btn btn-primary" onClick={() => setPlayer({ hp: 100, maxHp: 100, xp: 0, level: 1, inventory: [], currentRoom: 1, solvedPuzzles: [], attack: 10 })} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              🔄 Try Again
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="rpg-game">
      {/* Particle Effects */}
      <AnimatePresence>
        {showParticles && (
          <motion.div className="particles-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[...Array(20)].map((_, i) => (
              <motion.div key={i} className="particle" initial={{ x: '50%', y: '50%', scale: 0, opacity: 1 }} animate={{ x: `${Math.random() * 200 - 100}%`, y: `${Math.random() * 200 - 100}%`, scale: [0, 1, 0], opacity: [1, 1, 0] }} transition={{ duration: 0.8, delay: Math.random() * 0.2 }}>
                {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Damage Numbers */}
      {damageNumbers.map(({ id, amount, type, x }) => (
        <motion.div key={id} className={`damage-number ${type}`} style={{ left: `${x}%` }} initial={{ opacity: 1, y: 0, scale: 0.5 }} animate={{ opacity: 0, y: -80, scale: 1.5 }} transition={{ duration: 1 }}>
          {type === 'xp' ? `+${amount} XP` : type === 'heal' ? `+${amount} HP` : `-${amount}`}
        </motion.div>
      ))}

      {/* Victory Screen */}
      <AnimatePresence mode="wait">
        {gameState === 'victory' && (
          <motion.div className="victory-screen" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }}>
            <motion.div className="victory-content" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}>
              🏆
            </motion.div>
            <h1>🎉 VICTORY! 🎉</h1>
            <h2>You Conquered the Dungeon!</h2>
            <div className="victory-stats">
              <div className="victory-stat"><span className="stat-icon">📊</span><span>Level {player.level}</span></div>
              <div className="victory-stat"><span className="stat-icon">🧩</span><span>{player.solvedPuzzles.filter(id => typeof id === 'number').length} Puzzles</span></div>
              <div className="victory-stat"><span className="stat-icon">⚔️</span><span>{player.solvedPuzzles.filter(id => typeof id === 'string' && id.startsWith('combat')).length} Battles</span></div>
            </div>
            <motion.button className="btn btn-primary" onClick={() => { setPlayer({ hp: 100, maxHp: 100, xp: 0, level: 1, inventory: [], currentRoom: 1, solvedPuzzles: [], attack: 10 }); setGameState('explore') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              🔄 Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Bar */}
      <div className="stats-bar">
        <motion.div className="stat player-stat" whileHover={{ scale: 1.05 }}>
          <span className="player-avatar">{getPlayerSprite()}</span>
          <div className="stat-info">
            <span className="stat-name">Level {player.level}</span>
            <div className="stat-bar">
              <motion.div className="stat-fill health" initial={{ width: `${(player.hp / player.maxHp) * 100}%` }} animate={{ width: `${(player.hp / player.maxHp) * 100}%` }} />
            </div>
            <span className="stat-value">{player.hp}/{player.maxHp} HP</span>
          </div>
        </motion.div>

        <div className="stat">
          <span className="stat-icon">⭐</span>
          <div className="stat-bar xp-bar">
            <motion.div className="stat-fill xp" initial={{ width: `${(player.xp / (player.level * 100)) * 100}%` }} animate={{ width: `${(player.xp / (player.level * 100)) * 100}%` }} />
          </div>
          <span className="stat-value">{player.xp}/{player.level * 100} XP</span>
        </div>

        <div className="stat"><span className="stat-icon">⚔️</span><span>{player.attack} ATK</span></div>
        <div className="stat"><span className="stat-icon">🎒</span><span>{player.inventory.length}</span></div>

        {combo > 1 && (
          <motion.div className="combo-display" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} key={combo}>
            🔥 x{combo}
          </motion.div>
        )}
      </div>

      {/* Message Display */}
      <motion.div className="game-message" key={message} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="message-icon">💬</span>
        {message}
      </motion.div>

      {/* Game Areas */}
      <AnimatePresence mode="wait">
        {gameState === 'explore' && (
          <motion.div className="game-area explore" key="explore" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            {/* Room Visualization */}
            <div className="room-visual" style={{ background: currentRoom?.bgGradient }}>
              <motion.div className="room-graphics" animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                <span className="room-main-icon">{currentRoom?.icon}</span>
              </motion.div>
              <div className="room-decorations">
                {currentRoom?.decoration.split('').map((char, i) => (
                  <motion.span key={i} className="decoration-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.7, y: 0 }} transition={{ delay: i * 0.1 }}>{char}</motion.span>
                ))}
              </div>
              <motion.div className="room-overlay" animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
            </div>

            <div className="explore-content">
              {/* Mini Map */}
              <div className="mini-map">
                <h3>🗺️ Dungeon Map</h3>
                <div className="map-grid">
                  {ROOMS.map(room => (
                    <motion.div key={room.id} className={`map-cell ${room.id === player.currentRoom ? 'current' : ''} ${player.solvedPuzzles.includes(room.id) ? 'solved' : ''}`} whileHover={{ scale: 1.1 }}>
                      <span className="map-icon">{room.icon}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Room Info */}
              <div className="room-info">
                <h2>{currentRoom?.name}</h2>
                <p>{currentRoom?.description}</p>
                <div className="room-actions">
                  {currentRoom?.puzzle && !player.solvedPuzzles.includes(currentRoom.id) && (
                    <motion.button className="action-btn puzzle" onClick={startPuzzle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>🧩 Solve Puzzle</motion.button>
                  )}
                  {currentRoom?.puzzle && player.solvedPuzzles.includes(currentRoom.id) && (
                    <span className="solved-badge">✓ Solved</span>
                  )}
                  {currentRoom?.item && !player.inventory.find(i => i.name === currentRoom.item) && (
                    <motion.button className="action-btn item" onClick={() => pickupItem(currentRoom.item, 'sword')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>⚔️ Pick up {currentRoom.item}</motion.button>
                  )}
                  {currentRoom?.potion && !player.inventory.find(i => i.type === 'health') && (
                    <motion.button className="action-btn item" onClick={() => pickupItem('Health Potion', 'health')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>🧪 Pick up Potion</motion.button>
                  )}
                  {currentRoom?.treasure && (
                    <motion.button className="action-btn treasure" onClick={() => { setPlayer(p => ({ ...p, xp: p.xp + 100 })); checkLevelUp(player.xp + 100); setGameState('victory') }} whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }} whileTap={{ scale: 0.95 }}>🏆 Claim Treasure!</motion.button>
                  )}
                  <motion.button className="action-btn combat" onClick={encounterEnemy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>⚔️ Search for Enemies</motion.button>
                </div>
              </div>

              {/* Movement & Inventory */}
              <div className="explore-footer">
                <div className="movement-controls">
                  <motion.button onClick={() => movePlayer('up')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>⬆️</motion.button>
                  <div className="movement-row">
                    <motion.button onClick={() => movePlayer('left')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>⬅️</motion.button>
                    <motion.button onClick={() => movePlayer('down')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>⬇️</motion.button>
                    <motion.button onClick={() => movePlayer('right')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>➡️</motion.button>
                  </div>
                </div>

                <div className="inventory-panel">
                  <h4>🎒 Inventory</h4>
                  <div className="inventory-items">
                    {player.inventory.length === 0 ? <span className="empty-inventory">Empty</span> : player.inventory.map((item, i) => (
                      <motion.span key={i} className="inventory-item" title={item.name} whileHover={{ scale: 1.3, rotate: 10 }}>{item.icon}</motion.span>
                    ))}
                  </div>
                  {player.inventory.find(i => i.type === 'health') && (
                    <motion.button className="use-potion-btn" onClick={usePotion} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>🧪 Use Potion (+50 HP)</motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'puzzle' && currentPuzzle && (
          <motion.div className="game-area puzzle" key="puzzle" initial={{ opacity: 0, scale: 0.8, rotate: 10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.2, rotate: -10 }}>
            <motion.div className="puzzle-card" style={{ background: currentRoom?.bgGradient }}>
              <motion.div className="puzzle-icon" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>🧩</motion.div>
              <div className="puzzle-type-badge">{currentPuzzle.type.toUpperCase()} PUZZLE</div>
              <motion.div className="puzzle-question-box" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}><h2>{currentPuzzle.question}</h2></motion.div>
              <motion.div className="puzzle-input-container" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <input type="text" value={puzzleInput} onChange={(e) => setPuzzleInput(e.target.value)} placeholder="Your answer..." className="puzzle-input" onKeyPress={(e) => e.key === 'Enter' && checkAnswer()} autoFocus />
              </motion.div>
              <motion.div className="puzzle-actions" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <button className="btn" onClick={() => { setPlayer(p => ({ ...p, hp: Math.max(0, p.hp - 10) })); showDamageNumber(10, 'enemy'); setGameState('explore'); setCurrentPuzzle(null); setPuzzleInput('') }}>❌ Give Up (-10 HP)</button>
                <motion.button className="btn btn-primary" onClick={checkAnswer} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>✅ Submit (+25 XP)</motion.button>
              </motion.div>
              <motion.button className="hint-btn" onClick={showHint} initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} whileHover={{ opacity: 1 }}>💡 Hint (-2 HP)</motion.button>
            </motion.div>
          </motion.div>
        )}

        {gameState === 'combat' && combatEnemy && (
          <motion.div className="game-area combat" key="combat" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}>
            <motion.div className="combat-scene" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d132c 50%, #801336 100%)' }}>
              <motion.div className="combat-header" animate={{ x: [0, -5, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>⚔️ COMBAT: {combatEnemy.name} (Lv.{combatEnemy.level}) ⚔️</motion.div>
              
              <div className="combat-arena">
                <motion.div className="combatant player-side" animate={combatDamage === player.hp ? { x: -20 } : { x: 0 }} transition={{ duration: 0.1 }}>
                  <motion.div className="combat-avatar player-avatar-large" animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>{getPlayerSprite()}</motion.div>
                  <div className="combat-stats">
                    <span>YOU</span>
                    <div className="hp-bar"><motion.div className="hp-fill player-hp" initial={{ width: `${(player.hp / player.maxHp) * 100}%` }} animate={{ width: `${(player.hp / player.maxHp) * 100}%` }} /></div>
                    <span>{player.hp}/{player.maxHp}</span>
                  </div>
                </motion.div>

                <motion.div className="vs-badge">VS</motion.div>

                <motion.div className="combatant enemy-side" animate={combatDamage ? { x: 20 } : { x: 0 }} transition={{ duration: 0.1 }}>
                  <motion.div className="combat-avatar enemy-avatar-large" animate={{ y: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }} style={{ filter: `drop-shadow(0 0 20px ${combatEnemy.color})` }}>{combatEnemy.icon}</motion.div>
                  <div className="combat-stats">
                    <span>{combatEnemy.name}</span>
                    <div className="hp-bar"><motion.div className="hp-fill enemy-hp" initial={{ width: `${(combatEnemy.hp / combatEnemy.maxHp) * 100}%` }} animate={{ width: `${(combatEnemy.hp / combatEnemy.maxHp) * 100}%` }} /></div>
                    <span>{combatEnemy.hp}/{combatEnemy.maxHp}</span>
                  </div>
                </motion.div>
              </div>

              {currentPuzzle ? (
                <motion.div className="combat-puzzle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <p className="combat-message">{message}</p>
                  <p className="puzzle-question">{currentPuzzle.question}</p>
                  <input type="text" value={puzzleInput} onChange={(e) => setPuzzleInput(e.target.value)} placeholder="Answer to attack!" className="puzzle-input" onKeyPress={(e) => e.key === 'Enter' && combatAttack()} autoFocus />
                  <div className="puzzle-actions">
                    <button className="btn" onClick={fleeCombat}>🏃 Flee (-10 HP)</button>
                    <motion.button className="btn btn-primary" onClick={combatAttack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>⚔️ Attack!</motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.button className="combat-start-btn" onClick={combatPuzzle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>🎯 Start Combat Puzzle</motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
