// Bend: Stretching & Flexibility App - Exercise Data
const bendRoutines = {
    "wake-up": {
        name: "Wake Up",
        description: "A simple, quick, convenient flow designed to maintain mobility and range of motion. Doable anytime, anywhere.",
        duration: "5 minutes",
        exercises: [
            {
                name: "Neck Rolls",
                description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.",
                duration: 30,
                emoji: "🔄"
            },
            {
                name: "Shoulder Shrugs",
                description: "Lift your shoulders up toward your ears, hold for 3 seconds, then relax. Repeat slowly.",
                duration: 30,
                emoji: "🤷"
            },
            {
                name: "Side Neck Stretch",
                description: "Gently tilt your head to the right, hold for 15 seconds, then repeat on the left side.",
                duration: 30,
                emoji: "↔️"
            },
            {
                name: "Forward Neck Stretch",
                description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck.",
                duration: 30,
                emoji: "⬇️"
            },
            {
                name: "Arm Circles",
                description: "Make small circles with your arms, first forward, then backward. Keep movements slow and controlled.",
                duration: 30,
                emoji: "⭕"
            },
            {
                name: "Gentle Twist",
                description: "Stand with feet hip-width apart, place your hands on your hips, and gently twist from side to side.",
                duration: 30,
                emoji: "🔄"
            },
            {
                name: "Calf Raises",
                description: "Stand tall and slowly rise up onto your toes, then lower back down. Keep movements controlled.",
                duration: 30,
                emoji: "🦵"
            },
            {
                name: "Deep Breathing",
                description: "Take 5 deep breaths, inhaling through your nose and exhaling through your mouth. Feel your body relax.",
                duration: 30,
                emoji: "🫁"
            }
        ]
    },
    "posture-reset": {
        name: "Posture Reset",
        description: "Focused on seated stretches that target shoulders, back, and neck to correct habitual slouching.",
        duration: "4 minutes",
        exercises: [
            {
                name: "Cactus Arms",
                description: "Sit tall, bring your arms up to shoulder height, bend your elbows to 90 degrees, and press your arms back against your chair.",
                duration: 30,
                emoji: "🤲"
            },
            {
                name: "Neck Rolls",
                description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.",
                duration: 30,
                emoji: "🔄"
            },
            {
                name: "Divers",
                description: "Sit tall, reach your arms forward and up, then dive them down between your legs, rounding your spine.",
                duration: 30,
                emoji: "🤿"
            },
            {
                name: "Seated Back Twist",
                description: "Sit tall and gently twist your torso to the right, placing your left hand on your right knee. Hold and repeat on other side.",
                duration: 30,
                emoji: "🔄"
            },
            {
                name: "Shoulder Blade Squeeze",
                description: "Squeeze your shoulder blades together, hold for 5 seconds, then release. Keep your shoulders relaxed.",
                duration: 30,
                emoji: "🤝"
            },
            {
                name: "Chin Tucks",
                description: "Gently pull your chin back, creating a double chin. Hold for 5 seconds, then release. Repeat slowly.",
                duration: 30,
                emoji: "⬅️"
            },
            {
                name: "Seated Forward Fold",
                description: "Sit tall, then slowly fold forward from your hips, letting your arms hang down toward the floor.",
                duration: 30,
                emoji: "⬇️"
            },
            {
                name: "Final Relaxation",
                description: "Sit tall with your eyes closed, take 3 deep breaths, and feel your posture improve.",
                duration: 30,
                emoji: "😌"
            }
        ]
    },
    "full-body": {
        name: "Full Body",
        description: "A comprehensive routine with over 20 stretches targeting key muscles and joints across the entire body.",
        duration: "15 minutes",
        exercises: [
            {
                name: "Sun Salutation",
                description: "Stand tall, reach your arms up, then fold forward, step back into a plank, and return to standing.",
                duration: 60,
                emoji: "☀️"
            },
            {
                name: "Full Body Stretch",
                description: "Stand with feet apart, reach your arms up and over your head, then gently lean to each side.",
                duration: 60,
                emoji: "🤸"
            },
            {
                name: "Cat-Cow Stretch",
                description: "On hands and knees, arch your back up like a cat, then lower it down like a cow. Move slowly and gently.",
                duration: 60,
                emoji: "🐱"
            },
            {
                name: "Child's Pose",
                description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor.",
                duration: 60,
                emoji: "🧘"
            },
            {
                name: "Downward Dog",
                description: "From hands and knees, tuck your toes and lift your hips up and back, straightening your legs as much as comfortable.",
                duration: 60,
                emoji: "🐕"
            },
            {
                name: "Warrior I",
                description: "Step one foot forward into a lunge, raise your arms overhead, and hold the position.",
                duration: 60,
                emoji: "⚔️"
            },
            {
                name: "Triangle Pose",
                description: "Stand with feet wide apart, reach one hand down to your shin and the other up to the sky.",
                duration: 60,
                emoji: "🔺"
            },
            {
                name: "Seated Forward Fold",
                description: "Sit with legs extended, reach forward toward your toes while keeping your back straight.",
                duration: 60,
                emoji: "⬇️"
            },
            {
                name: "Butterfly Stretch",
                description: "Sit with the soles of your feet together, gently press your knees down toward the floor.",
                duration: 60,
                emoji: "🦋"
            },
            {
                name: "Supine Twist",
                description: "Lie on your back, bring your knees to one side, keeping your shoulders on the floor. Hold and repeat on other side.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Happy Baby",
                description: "Lie on your back, grab the outsides of your feet, and gently rock from side to side.",
                duration: 60,
                emoji: "😊"
            },
            {
                name: "Final Relaxation",
                description: "Lie on your back with arms at your sides, close your eyes, and take deep, slow breaths.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "sleep": {
        name: "Sleep",
        description: "Gentle, long-hold stretches to help unwind and de-stress after a long day—promotes better sleep quality.",
        duration: "10 minutes",
        exercises: [
            {
                name: "Rag Doll",
                description: "Stand with feet hip-width apart, slowly bend forward from your hips, letting your arms hang down like a rag doll.",
                duration: 60,
                emoji: "🪆"
            },
            {
                name: "Child's Pose",
                description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor.",
                duration: 60,
                emoji: "🧘"
            },
            {
                name: "Knees to Chest",
                description: "Lie on your back, bring both knees to your chest, and gently rock from side to side.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Happy Baby",
                description: "Lie on your back, grab the outsides of your feet, and gently rock from side to side.",
                duration: 60,
                emoji: "😊"
            },
            {
                name: "Supine Twist",
                description: "Lie on your back, bring your knees to one side, keeping your shoulders on the floor. Hold and repeat on other side.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Legs Up the Wall",
                description: "Sit close to a wall, swing your legs up the wall, and lie back with your arms at your sides.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Corpse Pose",
                description: "Lie on your back with arms at your sides, close your eyes, and focus on your breathing.",
                duration: 60,
                emoji: "😴"
            },
            {
                name: "Final Relaxation",
                description: "Continue lying still, taking slow, deep breaths, and let your body completely relax.",
                duration: 60,
                emoji: "🌙"
            }
        ]
    },
    "expert": {
        name: "Expert",
        description: "Advanced exercises and yoga poses covering all major muscle groups and extremities. Designed to significantly improve flexibility and range of motion.",
        duration: "30 minutes",
        exercises: [
            {
                name: "Squat Stretch",
                description: "Stand with feet wider than hip-width, lower into a deep squat, and hold the position.",
                duration: 90,
                emoji: "🦵"
            },
            {
                name: "Reverse Lunge",
                description: "Step one foot back into a lunge, keeping your front knee over your ankle, and hold the position.",
                duration: 90,
                emoji: "🏃"
            },
            {
                name: "Toe Squats",
                description: "Kneel on the floor, sit back on your heels, and hold the position to stretch your toes and feet.",
                duration: 90,
                emoji: "🦶"
            },
            {
                name: "Pigeon Pose",
                description: "From hands and knees, bring one knee forward and place it behind your wrist, extend the other leg back.",
                duration: 90,
                emoji: "🕊️"
            },
            {
                name: "Folded Butterfly",
                description: "Sit with soles of feet together, fold forward from your hips, and hold the position.",
                duration: 90,
                emoji: "🦋"
            },
            {
                name: "Seated Straddle",
                description: "Sit with legs wide apart, reach forward toward the center, then to each side.",
                duration: 90,
                emoji: "🦵"
            },
            {
                name: "Wheel Pose",
                description: "Lie on your back, place your hands by your ears, and lift up into a backbend.",
                duration: 90,
                emoji: "🌉"
            },
            {
                name: "Headstand Prep",
                description: "Kneel and place your forearms on the floor, interlace your fingers, and place the top of your head down.",
                duration: 90,
                emoji: "🙃"
            },
            {
                name: "Scorpion Prep",
                description: "Lie on your stomach, reach back and grab your feet, and lift your chest and legs off the floor.",
                duration: 90,
                emoji: "🦂"
            },
            {
                name: "Final Relaxation",
                description: "Lie on your back with arms at your sides, close your eyes, and take deep, slow breaths.",
                duration: 90,
                emoji: "😌"
            }
        ]
    },
    "hips": {
        name: "Hips",
        description: "Deep, focused stretches to open and unlock tight hips, especially helpful for people who sit a lot.",
        duration: "12 minutes",
        exercises: [
            {
                name: "Hip Circles",
                description: "Stand with hands on hips, make slow circles with your hips, first clockwise, then counterclockwise.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Hip Flexor Stretch",
                description: "Step one foot forward into a lunge position, keeping your back leg straight and your front knee over your ankle.",
                duration: 60,
                emoji: "🏃"
            },
            {
                name: "Pigeon Pose",
                description: "From hands and knees, bring one knee forward and place it behind your wrist, extend the other leg back.",
                duration: 60,
                emoji: "🕊️"
            },
            {
                name: "Butterfly Stretch",
                description: "Sit with the soles of your feet together, gently press your knees down toward the floor.",
                duration: 60,
                emoji: "🦋"
            },
            {
                name: "Figure 4 Stretch",
                description: "Lie on your back, place one ankle on the opposite knee, and pull the bottom leg toward your chest.",
                duration: 60,
                emoji: "4️⃣"
            },
            {
                name: "Seated Hip Stretch",
                description: "Sit with one leg extended, cross the other leg over, and gently twist toward the bent knee.",
                duration: 60,
                emoji: "🪑"
            },
            {
                name: "Lizard Pose",
                description: "From downward dog, step one foot forward outside your hand, lower your forearms to the floor.",
                duration: 60,
                emoji: "🦎"
            },
            {
                name: "Happy Baby",
                description: "Lie on your back, grab the outsides of your feet, and gently rock from side to side.",
                duration: 60,
                emoji: "😊"
            },
            {
                name: "Supine Hip Stretch",
                description: "Lie on your back, bring one knee to your chest, then gently pull it across your body.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Final Relaxation",
                description: "Lie on your back with arms at your sides, close your eyes, and feel your hips relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "hamstrings": {
        name: "Hamstrings",
        description: "Targeted routine to reduce hamstring tightness and relieve pressure on knees, pelvis, and lower back.",
        duration: "10 minutes",
        exercises: [
            {
                name: "Standing Forward Fold",
                description: "Stand with feet hip-width apart, slowly bend forward from your hips, letting your arms hang down.",
                duration: 60,
                emoji: "⬇️"
            },
            {
                name: "Seated Forward Fold",
                description: "Sit with legs extended, reach forward toward your toes while keeping your back straight.",
                duration: 60,
                emoji: "🪑"
            },
            {
                name: "Single Leg Forward Fold",
                description: "Stand on one leg, extend the other leg forward, and reach toward your extended foot.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Pyramid Pose",
                description: "Step one foot forward, keep both legs straight, and fold forward over your front leg.",
                duration: 60,
                emoji: "🔺"
            },
            {
                name: "Reclined Hand to Big Toe",
                description: "Lie on your back, lift one leg up, and hold your big toe or use a strap to pull your leg closer.",
                duration: 60,
                emoji: "🦶"
            },
            {
                name: "Downward Dog",
                description: "From hands and knees, tuck your toes and lift your hips up and back, straightening your legs as much as comfortable.",
                duration: 60,
                emoji: "🐕"
            },
            {
                name: "Standing Split",
                description: "From downward dog, lift one leg up high, keeping your hips square to the floor.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Final Relaxation",
                description: "Lie on your back with arms at your sides, close your eyes, and feel your hamstrings relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "lower-back": {
        name: "Lower Back",
        description: "Gentle stretches aimed at relieving and preventing lower back pain, improving flexibility in lower back, pelvis, and hip flexors.",
        duration: "8 minutes",
        exercises: [
            {
                name: "Cat-Cow Stretch",
                description: "On hands and knees, arch your back up like a cat, then lower it down like a cow. Move slowly and gently.",
                duration: 60,
                emoji: "🐱"
            },
            {
                name: "Child's Pose",
                description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor.",
                duration: 60,
                emoji: "🧘"
            },
            {
                name: "Knee to Chest",
                description: "Lie on your back, bring one knee to your chest, hold with your hands. Repeat with the other leg.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Supine Twist",
                description: "Lie on your back, bring your knees to one side, keeping your shoulders on the floor. Hold and repeat on other side.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Pelvic Tilts",
                description: "Lie on your back with knees bent, gently rock your pelvis up and down, pressing your lower back into the floor.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Hip Flexor Stretch",
                description: "Step one foot forward into a lunge position, keeping your back leg straight and your front knee over your ankle.",
                duration: 60,
                emoji: "🏃"
            },
            {
                name: "Seated Back Twist",
                description: "Sit tall and gently twist your torso to the right, placing your left hand on your right knee. Hold and repeat on other side.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Final Relaxation",
                description: "Lie on your back with arms at your sides, close your eyes, and feel your lower back relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "isometric": {
        name: "Isometric",
        description: "Routines that build muscle, strength, balance, and range of motion through static muscle contractions.",
        duration: "15 minutes",
        exercises: [
            {
                name: "Wall Sit",
                description: "Stand with your back against a wall, slide down until your knees are at 90 degrees, and hold the position.",
                duration: 60,
                emoji: "🪑"
            },
            {
                name: "Plank Hold",
                description: "Start in a push-up position, hold your body straight from head to heels, and maintain the position.",
                duration: 60,
                emoji: "📏"
            },
            {
                name: "Isometric Squat",
                description: "Stand with feet shoulder-width apart, lower into a squat, and hold the position without moving.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Glute Bridge Hold",
                description: "Lie on your back with knees bent, lift your hips up, and hold the position, squeezing your glutes.",
                duration: 60,
                emoji: "🌉"
            },
            {
                name: "Isometric Push-up",
                description: "Start in a push-up position, lower halfway down, and hold the position without going up or down.",
                duration: 60,
                emoji: "💪"
            },
            {
                name: "Single Leg Stand",
                description: "Stand on one leg, lift the other leg slightly off the ground, and hold the position for balance.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Isometric Lunge",
                description: "Step one foot forward into a lunge position, hold the position without moving up or down.",
                duration: 60,
                emoji: "🏃"
            },
            {
                name: "Dead Bug Hold",
                description: "Lie on your back with arms up and knees at 90 degrees, hold the position while engaging your core.",
                duration: 60,
                emoji: "🐛"
            },
            {
                name: "Isometric Calf Raise",
                description: "Stand on your toes, hold the position at the top of a calf raise without moving up or down.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Final Relaxation",
                description: "Lie on your back with arms at your sides, close your eyes, and feel your muscles relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    }
};

// Global variables
let currentRoutine = '';
let currentExerciseIndex = 0;
let currentExercises = [];
let timer = null;
let timeRemaining = 0;
let isTimerRunning = false;
let routineStartTime = null;
let totalRoutineTime = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // Routine category selection
    const routineCategoryBtns = document.querySelectorAll('.routine-category-btn');
    routineCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const routine = this.getAttribute('data-routine');
            selectRoutine(routine);
        });
    });

    // Timer controls
    document.getElementById('start-pause-btn').addEventListener('click', toggleTimer);
    document.getElementById('skip-btn').addEventListener('click', skipExercise);
}

function selectRoutine(routine) {
    currentRoutine = routine;
    currentExercises = bendRoutines[routine].exercises;
    currentExerciseIndex = 0;
    routineStartTime = Date.now();
    showExerciseDisplay();
    displayCurrentExercise();
}

function showRoutineSelection() {
    document.getElementById('routine-selection').classList.add('active');
    document.getElementById('exercise-display').classList.remove('active');
    document.getElementById('completion-screen').classList.remove('active');
}

function showExerciseDisplay() {
    document.getElementById('routine-selection').classList.remove('active');
    document.getElementById('exercise-display').classList.add('active');
    document.getElementById('completion-screen').classList.remove('active');
}

function showCompletionScreen() {
    document.getElementById('routine-selection').classList.remove('active');
    document.getElementById('exercise-display').classList.remove('active');
    document.getElementById('completion-screen').classList.add('active');
    
    // Calculate total time
    totalRoutineTime = Math.floor((Date.now() - routineStartTime) / 1000 / 60);
    
    // Update completion screen
    const routineData = bendRoutines[currentRoutine];
    document.getElementById('completion-message').textContent = `You've completed the ${routineData.name} routine!`;
    document.getElementById('total-time').textContent = totalRoutineTime;
    document.getElementById('total-exercises-completed').textContent = currentExercises.length;
}

function displayCurrentExercise() {
    const exercise = currentExercises[currentExerciseIndex];
    const totalExercises = currentExercises.length;
    const routineData = bendRoutines[currentRoutine];
    
    // Update progress
    document.getElementById('current-exercise').textContent = currentExerciseIndex + 1;
    document.getElementById('total-exercises').textContent = totalExercises;
    
    // Update exercise info
    document.getElementById('exercise-title').textContent = routineData.name;
    document.getElementById('exercise-name').textContent = exercise.name;
    document.getElementById('exercise-description').textContent = exercise.description;
    document.getElementById('exercise-image').textContent = exercise.emoji;
    
    // Reset timer
    timeRemaining = exercise.duration;
    updateTimerDisplay();
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentExerciseIndex === 0;
    document.getElementById('next-btn').disabled = currentExerciseIndex === totalExercises - 1;
    
    // Reset timer button
    document.getElementById('start-pause-btn').textContent = 'Start';
    isTimerRunning = false;
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function toggleTimer() {
    if (isTimerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    isTimerRunning = true;
    document.getElementById('start-pause-btn').textContent = 'Pause';
    
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            timer = null;
            isTimerRunning = false;
            document.getElementById('start-pause-btn').textContent = 'Start';
            
            // Auto-advance to next exercise if not the last one
            if (currentExerciseIndex < currentExercises.length - 1) {
                setTimeout(() => {
                    nextExercise();
                }, 1000);
            } else {
                // Routine completed
                setTimeout(() => {
                    showCompletionScreen();
                }, 1000);
            }
        }
    }, 1000);
}

function pauseTimer() {
    isTimerRunning = false;
    document.getElementById('start-pause-btn').textContent = 'Start';
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function skipExercise() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    isTimerRunning = false;
    document.getElementById('start-pause-btn').textContent = 'Start';
    
    if (currentExerciseIndex < currentExercises.length - 1) {
        nextExercise();
    } else {
        // Routine completed
        showCompletionScreen();
    }
}

function nextExercise() {
    if (currentExerciseIndex < currentExercises.length - 1) {
        currentExerciseIndex++;
        displayCurrentExercise();
    }
}

function previousExercise() {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        displayCurrentExercise();
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = display;
}

function startNewRoutine() {
    showRoutineSelection();
}