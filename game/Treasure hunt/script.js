const collegeData = {
  name: "9al Kabir Polytechnic",
  tagline: "Knowledge Quest - Treasure Hunt",
}

const questions = [
  {
    question: "Al-Kabir Polytechnic is a unit of which organization?",
    options: ["Islamic Development Bank", "Kabir Welfare Trust", "Government of India", "Ministry of Education"],
    correct: 1,
  },
  {
    question: "In which year was Al-Kabir Polytechnic established?",
    options: ["1985", "1995", "1990", "2000"],
    correct: 2,
  },
  {
    question: "Who provided financial aid for the establishment of the institute?",
    options: ["World Bank", "Government of India", "Islamic Development Bank (IDB), Jeddah", "Asian Development Bank"],
    correct: 2,
  },
  {
    question: "What type of courses does Al-Kabir Polytechnic primarily offer?",
    options: ["Medical courses", "Management courses", "Three-year diploma courses in engineering", "Law courses"],
    correct: 2,
  },
  {
    question: "What is one of the future visions of Kabir Welfare Trust?",
    options: ["Opening international branches", "Establishing a university", "Starting a hospital", "Expanding into foreign countries"],
    correct: 1,
  },
  {
    question: "What is the total area of land on which the institute is spread?",
    options: ["5 acres", "8 acres", "10 acres", "15 acres"],
    correct: 2,
  },
  {
    question: "How many students can the hostels accommodate?",
    options: ["100 students", "150 students", "200 students", "250 students"],
    correct: 2,
  },
  {
    question: "Who was the founder and visionary behind Kabir Welfare Trust, which established Al-Kabir Polytechnic?",
    options: ["Janab Kabir Sahab", "Haji Abdul Hakim Sahab", "Haji Sahab’s father", "A government official"],
    correct: 1,
  },
  {
    question: "In which year was Kabir Welfare Trust established by Haji Abdul Hakim?",
    options: ["1965", "1970", "1978-79", "1985"],
    correct: 2,
  },
  {
    question: "Which institution was established in 1990 under the leadership of Haji Abdul Hakim?",
    options: ["Kabiria Women’s College", "Family Health Centre", "Al-Kabir Polytechnic", "Masjid-e-Umer"],
    correct: 2,
  },
  {
    question: "What role is expected from academic institutions like Al-Kabir Polytechnic during pandemic?",
    options: [
      "Remain inactive",
      "Focus only on exams",
      "Take leadership and guide society",
      "Close permanently"
    ],
    correct: 2,
  },
  {
    question: "Who is the founder of Kabir Welfare Trust (KWT), which established Al-Kabir Polytechnic?",
    options: [
      "Mohammad Fahim",
      "Haji Abdul Hakim",
      "Abdul Ghafoor Ansari",
      "Syed Shamim Ahmad Madni"
    ],
    correct: 1,
  },
  {
    question: "Which two personalities played a key role in establishing Al-Kabir Polytechnic?",
    options: [
      "Haji Abdul Hakim and Mohammad Fahim",
      "Syed Shamim Ahmad Madni and Abdul Ghafoor Ansari",
      "Janab Kabir Sahab and Haji Sahab",
      "Government officials"
    ],
    correct: 1,
  },
  {
    question: "Who was appointed as the secretary of Al-Kabir Polytechnic after Abdul Ghafoor Ansari?",
    options: [
      "Syed Shamim Ahmad Madni",
      "Haji Abdul Hakim",
      "Mohammad Fahim",
      "Janab Kabir Sahab"
    ],
    correct: 2,
  },
  {
    question: "Which religious and social infrastructure is also maintained by the trust?",
    options: [
      "Temple complex",
      "Masjid-e-Umar",
      "Shopping mall",
      "Sports stadium"
    ],
    correct: 1,
  }
]

// Game State
let currentQuestion = 0
let score = 0
let gameActive = false
let answeredQuestions = 0
let shuffledQuestions = []

function initializeParticles() {
  const container = document.getElementById("bgParticles")
  const particleCount = window.innerWidth > 768 ? 20 : 10

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.width = Math.random() * 100 + 50 + "px"
    particle.style.height = particle.style.width
    particle.style.background = `radial-gradient(circle, rgba(37, 99, 235, ${Math.random() * 0.3}), transparent)`
    particle.style.animationDelay = Math.random() * 5 + "s"
    container.appendChild(particle)
  }
}

// Initialize Game
function startGame() {
  currentQuestion = 0
  score = 0
  answeredQuestions = 0
  gameActive = false
  shuffledQuestions = shuffleArray([...questions])

  showScreen("questionScreen")
  displayQuestion()
}

function displayQuestion() {
  if (currentQuestion >= shuffledQuestions.length) {
    endGame()
    return
  }

  gameActive = false
  const question = shuffledQuestions[currentQuestion]
  const progressPercentage = (currentQuestion / shuffledQuestions.length) * 100
  const progressPercent = Math.round(progressPercentage)

  // Update progress
  document.getElementById("progressFill").style.width = progressPercentage + "%"
  document.getElementById("questionCount").textContent =
    `Question ${currentQuestion + 1} of ${shuffledQuestions.length}`
  document.getElementById("progressPercent").textContent = progressPercent
  document.getElementById("scoreValue").textContent = score

  // Display question
  document.getElementById("questionText").textContent = question.question

  // Shuffle options
  const optionIndices = shuffleArray([0, 1, 2, 3])
  const shuffledOptions = optionIndices.map((i) => question.options[i])
  const correctIndex = optionIndices.indexOf(question.correct)

  // Display options
  const container = document.getElementById("optionsContainer")
  container.innerHTML = ""

  shuffledOptions.forEach((option, index) => {
    const btn = document.createElement("button")
    btn.className = "option-btn"
    btn.textContent = option
    btn.onclick = () => checkAnswer(index === correctIndex, btn)
    container.appendChild(btn)
  })

  clearFeedback()
}

function checkAnswer(isCorrect, button) {
  if (gameActive) return

  gameActive = true
  const allButtons = document.querySelectorAll(".option-btn")

  if (isCorrect) {
    score++
    button.classList.add("correct")
    showFeedback("✓ Correct! Great job!", true)
    playSound("correctSound")
  } else {
    button.classList.add("wrong")
    showFeedback("✗ Oops! Try Again!", false)
    playSound("wrongSound")

    allButtons.forEach((btn) => {
      const question = shuffledQuestions[currentQuestion]
      if (btn.textContent === question.options[question.correct]) {
        btn.classList.add("correct")
      }
    })
  }

  answeredQuestions++

  // Move to next question after delay
  setTimeout(() => {
    currentQuestion++
    displayQuestion()
  }, 2200)
}

function showFeedback(message, isCorrect) {
  const feedbackEl = document.getElementById("feedbackMessage")
  feedbackEl.textContent = message
  feedbackEl.className = isCorrect
    ? "feedback-message show-feedback feedback-correct"
    : "feedback-message show-feedback feedback-wrong"
}

function clearFeedback() {
  const feedbackEl = document.getElementById("feedbackMessage")
  feedbackEl.textContent = ""
  feedbackEl.className = "feedback-message"
}

function endGame() {
  document.getElementById("finalScore").textContent = score
  showScreen("winnerScreen")
  startConfetti()
  startFireworks()
}

function submitWinner() {
  const playerName = document.getElementById("playerName").value.trim()

  if (!playerName) {
    alert("Please enter your name!")
    return
  }

  document.getElementById("winnerName").textContent = playerName
  document.getElementById("playerName").style.display = "none"
  document.querySelector(".name-input-section").style.display = "none"
  document.querySelector(".submit-name-btn").style.display = "none"
  document.getElementById("winnerDisplay").style.display = "block"
}

function restartGame() {
  document.getElementById("playerName").value = ""
  document.getElementById("playerName").style.display = "block"
  document.querySelector(".name-input-section").style.display = "block"
  document.querySelector(".submit-name-btn").style.display = "block"
  document.getElementById("winnerDisplay").style.display = "none"

  showScreen("startScreen")
}

// Utility Functions
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })
  document.getElementById(screenId).classList.add("active")
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function playSound(soundId) {
  try {
    const audio = document.getElementById(soundId)
    audio.currentTime = 0
    audio.play().catch((err) => console.log("Sound play prevented:", err))
  } catch (e) {
    console.log("Sound error:", e)
  }
}

function startConfetti() {
  const confettiContainer = document.getElementById("confetti")
  confettiContainer.innerHTML = ""

  const colors = ["#2563eb", "#8b5cf6", "#06b6d4", "#fbbf24", "#10b981"]

  for (let i = 0; i < 250; i++) {
    setTimeout(() => {
      const confettiPiece = document.createElement("div")
      const size = Math.random() * 16 + 8
      const left = Math.random() * 100
      const delay = Math.random() * 1.2
      const duration = Math.random() * 4.5 + 3.5
      const rotation = Math.random() * 360
      const color = colors[Math.floor(Math.random() * colors.length)]
      const spin = Math.random() * 720 + 360

      confettiPiece.style.cssText = `
        position: fixed;
        left: ${left}%;
        top: -10px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: fall ${duration}s linear ${delay}s forwards;
        pointer-events: none;
        z-index: 15;
        opacity: 0.95;
        box-shadow: 0 0 15px ${color}, inset 0 0 10px rgba(255,255,255,0.5);
      `

      confettiContainer.appendChild(confettiPiece)
    }, i * 10)
  }

  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style")
    style.id = "confetti-style"
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function startFireworks() {
  const colors = ["#2563eb", "#8b5cf6", "#06b6d4", "#fbbf24", "#10b981"]

  for (let burst = 0; burst < 16; burst++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * (window.innerHeight * 0.6)

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        const size = Math.random() * 12 + 6
        const angle = (i / 50) * Math.PI * 2
        const velocity = Math.random() * 10 + 6
        const color = colors[Math.floor(Math.random() * colors.length)]
        const duration = Math.random() * 2 + 1.8

        particle.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          z-index: 14;
          animation: firework ${duration}s ease-out forwards;
          --tx: ${Math.cos(angle) * velocity * 80}px;
          --ty: ${Math.sin(angle) * velocity * 80}px;
          box-shadow: 0 0 15px ${color}, inset 0 0 8px rgba(255,255,255,0.4);
        `

        document.body.appendChild(particle)

        setTimeout(() => particle.remove(), duration * 1000)
      }
    }, burst * 300)
  }

  if (!document.getElementById("firework-style")) {
    const style = document.createElement("style")
    style.id = "firework-style"
    style.textContent = `
      @keyframes firework {
        to {
          transform: translate(var(--tx), var(--ty));
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// Initialize particles on load
window.addEventListener("load", initializeParticles)

function createAdventureBackground() {
  const canvas = document.getElementById("adventureCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Create gradient sky
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6)
  skyGradient.addColorStop(0, "#87CEEB")
  skyGradient.addColorStop(0.5, "#E0F6FF")
  skyGradient.addColorStop(1, "#87CEEB")

  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6)

  // Draw clouds
  function drawCloud(x, y, size) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.beginPath()
    ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
    ctx.arc(x + size * 0.8, y, size * 0.7, 0, Math.PI * 2)
    ctx.arc(x + size * 1.6, y, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
  }

  drawCloud(100, 80, 30)
  drawCloud(canvas.width - 150, 120, 35)
  drawCloud(canvas.width * 0.5, 60, 25)

  // Create waterfall/landscape effect
  const landGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height)
  landGradient.addColorStop(0, "#90EE90")
  landGradient.addColorStop(0.5, "#3CB371")
  landGradient.addColorStop(1, "#2D5016")

  ctx.fillStyle = landGradient
  ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4)

  // Draw water effect
  ctx.fillStyle = "rgba(100, 180, 255, 0.7)"
  ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25)

  // Add some mountain-like shapes
  ctx.fillStyle = "rgba(60, 120, 180, 0.6)"
  ctx.beginPath()
  ctx.moveTo(0, canvas.height * 0.6)
  ctx.lineTo(canvas.width * 0.3, canvas.height * 0.4)
  ctx.lineTo(canvas.width * 0.6, canvas.height * 0.6)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(canvas.width * 0.5, canvas.height * 0.6)
  ctx.lineTo(canvas.width * 0.8, canvas.height * 0.35)
  ctx.lineTo(canvas.width, canvas.height * 0.6)
  ctx.fill()

  // Add sparkles
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * (canvas.height * 0.6)
    const size = Math.random() * 2 + 1
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Call on load
window.addEventListener("load", () => {
  initializeParticles()
  createAdventureBackground()
})

window.addEventListener("resize", createAdventureBackground)
