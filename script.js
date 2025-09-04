// Exercise data for different body areas
const exerciseData = {
    neck: {
        name: "Neck & Shoulders",
        routines: {
            quick: {
                name: "Quick Relief (5 minutes)",
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
                    }
                ]
            },
            standard: {
                name: "Standard Routine (10 minutes)",
                duration: "10 minutes",
                exercises: [
                    {
                        name: "Neck Rolls",
                        description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.",
                        duration: 45,
                        emoji: "🔄"
                    },
                    {
                        name: "Shoulder Shrugs",
                        description: "Lift your shoulders up toward your ears, hold for 3 seconds, then relax. Repeat slowly.",
                        duration: 45,
                        emoji: "🤷"
                    },
                    {
                        name: "Side Neck Stretch",
                        description: "Gently tilt your head to the right, hold for 20 seconds, then repeat on the left side.",
                        duration: 40,
                        emoji: "↔️"
                    },
                    {
                        name: "Forward Neck Stretch",
                        description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck.",
                        duration: 30,
                        emoji: "⬇️"
                    },
                    {
                        name: "Shoulder Blade Squeeze",
                        description: "Squeeze your shoulder blades together, hold for 5 seconds, then release. Keep your shoulders relaxed.",
                        duration: 45,
                        emoji: "🤝"
                    },
                    {
                        name: "Arm Circles",
                        description: "Make small circles with your arms, first forward, then backward. Keep movements slow and controlled.",
                        duration: 45,
                        emoji: "⭕"
                    }
                ]
            },
            extended: {
                name: "Extended Routine (15 minutes)",
                duration: "15 minutes",
                exercises: [
                    {
                        name: "Neck Rolls",
                        description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.",
                        duration: 60,
                        emoji: "🔄"
                    },
                    {
                        name: "Shoulder Shrugs",
                        description: "Lift your shoulders up toward your ears, hold for 5 seconds, then relax. Repeat slowly.",
                        duration: 60,
                        emoji: "🤷"
                    },
                    {
                        name: "Side Neck Stretch",
                        description: "Gently tilt your head to the right, hold for 30 seconds, then repeat on the left side.",
                        duration: 60,
                        emoji: "↔️"
                    },
                    {
                        name: "Forward Neck Stretch",
                        description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck.",
                        duration: 45,
                        emoji: "⬇️"
                    },
                    {
                        name: "Shoulder Blade Squeeze",
                        description: "Squeeze your shoulder blades together, hold for 8 seconds, then release. Keep your shoulders relaxed.",
                        duration: 60,
                        emoji: "🤝"
                    },
                    {
                        name: "Arm Circles",
                        description: "Make circles with your arms, first small, then larger. Forward and backward directions.",
                        duration: 60,
                        emoji: "⭕"
                    },
                    {
                        name: "Cross-Body Shoulder Stretch",
                        description: "Bring your right arm across your chest, use your left hand to gently pull it closer. Hold and repeat on other side.",
                        duration: 60,
                        emoji: "🤗"
                    },
                    {
                        name: "Ear to Shoulder Stretch",
                        description: "Gently pull your head toward your right shoulder with your right hand. Hold and repeat on left side.",
                        duration: 60,
                        emoji: "👂"
                    }
                ]
            }
        }
    },
    back: {
        name: "Back",
        routines: {
            quick: {
                name: "Quick Relief (5 minutes)",
                duration: "5 minutes",
                exercises: [
                    {
                        name: "Cat-Cow Stretch",
                        description: "On hands and knees, arch your back up like a cat, then lower it down like a cow. Move slowly and gently.",
                        duration: 45,
                        emoji: "🐱"
                    },
                    {
                        name: "Seated Back Twist",
                        description: "Sit tall and gently twist your torso to the right, placing your left hand on your right knee. Hold and repeat on other side.",
                        duration: 45,
                        emoji: "🔄"
                    },
                    {
                        name: "Forward Fold",
                        description: "Stand with feet hip-width apart, slowly bend forward from your hips, letting your arms hang down.",
                        duration: 45,
                        emoji: "⬇️"
                    }
                ]
            },
            standard: {
                name: "Standard Routine (10 minutes)",
                duration: "10 minutes",
                exercises: [
                    {
                        name: "Cat-Cow Stretch",
                        description: "On hands and knees, arch your back up like a cat, then lower it down like a cow. Move slowly and gently.",
                        duration: 60,
                        emoji: "🐱"
                    },
                    {
                        name: "Seated Back Twist",
                        description: "Sit tall and gently twist your torso to the right, placing your left hand on your right knee. Hold and repeat on other side.",
                        duration: 60,
                        emoji: "🔄"
                    },
                    {
                        name: "Forward Fold",
                        description: "Stand with feet hip-width apart, slowly bend forward from your hips, letting your arms hang down.",
                        duration: 60,
                        emoji: "⬇️"
                    },
                    {
                        name: "Child's Pose",
                        description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor.",
                        duration: 60,
                        emoji: "🧘"
                    },
                    {
                        name: "Spinal Extension",
                        description: "Lie on your stomach, place your hands under your shoulders, and gently lift your chest up, keeping your hips on the floor.",
                        duration: 45,
                        emoji: "🐍"
                    }
                ]
            },
            extended: {
                name: "Extended Routine (15 minutes)",
                duration: "15 minutes",
                exercises: [
                    {
                        name: "Cat-Cow Stretch",
                        description: "On hands and knees, arch your back up like a cat, then lower it down like a cow. Move slowly and gently.",
                        duration: 90,
                        emoji: "🐱"
                    },
                    {
                        name: "Seated Back Twist",
                        description: "Sit tall and gently twist your torso to the right, placing your left hand on your right knee. Hold and repeat on other side.",
                        duration: 90,
                        emoji: "🔄"
                    },
                    {
                        name: "Forward Fold",
                        description: "Stand with feet hip-width apart, slowly bend forward from your hips, letting your arms hang down.",
                        duration: 90,
                        emoji: "⬇️"
                    },
                    {
                        name: "Child's Pose",
                        description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor.",
                        duration: 90,
                        emoji: "🧘"
                    },
                    {
                        name: "Spinal Extension",
                        description: "Lie on your stomach, place your hands under your shoulders, and gently lift your chest up, keeping your hips on the floor.",
                        duration: 60,
                        emoji: "🐍"
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
                    }
                ]
            }
        }
    },
    legs: {
        name: "Legs & Hips",
        routines: {
            quick: {
                name: "Quick Relief (5 minutes)",
                duration: "5 minutes",
                exercises: [
                    {
                        name: "Hip Circles",
                        description: "Stand with hands on hips, make slow circles with your hips, first clockwise, then counterclockwise.",
                        duration: 45,
                        emoji: "🔄"
                    },
                    {
                        name: "Calf Stretch",
                        description: "Step one foot back, keep your heel down, and lean forward slightly to feel the stretch in your calf.",
                        duration: 45,
                        emoji: "🦵"
                    },
                    {
                        name: "Quad Stretch",
                        description: "Stand and hold your foot behind you, gently pulling it toward your glutes. Use a wall for support if needed.",
                        duration: 45,
                        emoji: "🦵"
                    }
                ]
            },
            standard: {
                name: "Standard Routine (10 minutes)",
                duration: "10 minutes",
                exercises: [
                    {
                        name: "Hip Circles",
                        description: "Stand with hands on hips, make slow circles with your hips, first clockwise, then counterclockwise.",
                        duration: 60,
                        emoji: "🔄"
                    },
                    {
                        name: "Calf Stretch",
                        description: "Step one foot back, keep your heel down, and lean forward slightly to feel the stretch in your calf.",
                        duration: 60,
                        emoji: "🦵"
                    },
                    {
                        name: "Quad Stretch",
                        description: "Stand and hold your foot behind you, gently pulling it toward your glutes. Use a wall for support if needed.",
                        duration: 60,
                        emoji: "🦵"
                    },
                    {
                        name: "Hamstring Stretch",
                        description: "Sit on the floor with one leg extended, reach toward your toes while keeping your back straight.",
                        duration: 60,
                        emoji: "🤸"
                    },
                    {
                        name: "Hip Flexor Stretch",
                        description: "Step one foot forward into a lunge position, keeping your back leg straight and your front knee over your ankle.",
                        duration: 60,
                        emoji: "🏃"
                    }
                ]
            },
            extended: {
                name: "Extended Routine (15 minutes)",
                duration: "15 minutes",
                exercises: [
                    {
                        name: "Hip Circles",
                        description: "Stand with hands on hips, make slow circles with your hips, first clockwise, then counterclockwise.",
                        duration: 90,
                        emoji: "🔄"
                    },
                    {
                        name: "Calf Stretch",
                        description: "Step one foot back, keep your heel down, and lean forward slightly to feel the stretch in your calf.",
                        duration: 90,
                        emoji: "🦵"
                    },
                    {
                        name: "Quad Stretch",
                        description: "Stand and hold your foot behind you, gently pulling it toward your glutes. Use a wall for support if needed.",
                        duration: 90,
                        emoji: "🦵"
                    },
                    {
                        name: "Hamstring Stretch",
                        description: "Sit on the floor with one leg extended, reach toward your toes while keeping your back straight.",
                        duration: 90,
                        emoji: "🤸"
                    },
                    {
                        name: "Hip Flexor Stretch",
                        description: "Step one foot forward into a lunge position, keeping your back leg straight and your front knee over your ankle.",
                        duration: 90,
                        emoji: "🏃"
                    },
                    {
                        name: "Butterfly Stretch",
                        description: "Sit with the soles of your feet together, gently press your knees down toward the floor.",
                        duration: 90,
                        emoji: "🦋"
                    },
                    {
                        name: "Pigeon Stretch",
                        description: "From hands and knees, bring one knee forward and place it behind your wrist, extend the other leg back.",
                        duration: 90,
                        emoji: "🕊️"
                    }
                ]
            }
        }
    },
    arms: {
        name: "Arms & Wrists",
        routines: {
            quick: {
                name: "Quick Relief (5 minutes)",
                duration: "5 minutes",
                exercises: [
                    {
                        name: "Wrist Circles",
                        description: "Extend your arms and make slow circles with your wrists, first clockwise, then counterclockwise.",
                        duration: 45,
                        emoji: "🔄"
                    },
                    {
                        name: "Arm Stretches",
                        description: "Reach one arm across your chest, use your other hand to gently pull it closer. Repeat with the other arm.",
                        duration: 45,
                        emoji: "🤗"
                    },
                    {
                        name: "Tricep Stretch",
                        description: "Reach one arm overhead, bend your elbow, and use your other hand to gently push your elbow back.",
                        duration: 45,
                        emoji: "💪"
                    }
                ]
            },
            standard: {
                name: "Standard Routine (10 minutes)",
                duration: "10 minutes",
                exercises: [
                    {
                        name: "Wrist Circles",
                        description: "Extend your arms and make slow circles with your wrists, first clockwise, then counterclockwise.",
                        duration: 60,
                        emoji: "🔄"
                    },
                    {
                        name: "Arm Stretches",
                        description: "Reach one arm across your chest, use your other hand to gently pull it closer. Repeat with the other arm.",
                        duration: 60,
                        emoji: "🤗"
                    },
                    {
                        name: "Tricep Stretch",
                        description: "Reach one arm overhead, bend your elbow, and use your other hand to gently push your elbow back.",
                        duration: 60,
                        emoji: "💪"
                    },
                    {
                        name: "Bicep Stretch",
                        description: "Extend one arm behind you, place your hand on a wall, and gently lean forward to feel the stretch.",
                        duration: 60,
                        emoji: "💪"
                    },
                    {
                        name: "Finger Stretches",
                        description: "Spread your fingers wide, then make a fist. Repeat this movement slowly and gently.",
                        duration: 60,
                        emoji: "✋"
                    }
                ]
            },
            extended: {
                name: "Extended Routine (15 minutes)",
                duration: "15 minutes",
                exercises: [
                    {
                        name: "Wrist Circles",
                        description: "Extend your arms and make slow circles with your wrists, first clockwise, then counterclockwise.",
                        duration: 90,
                        emoji: "🔄"
                    },
                    {
                        name: "Arm Stretches",
                        description: "Reach one arm across your chest, use your other hand to gently pull it closer. Repeat with the other arm.",
                        duration: 90,
                        emoji: "🤗"
                    },
                    {
                        name: "Tricep Stretch",
                        description: "Reach one arm overhead, bend your elbow, and use your other hand to gently push your elbow back.",
                        duration: 90,
                        emoji: "💪"
                    },
                    {
                        name: "Bicep Stretch",
                        description: "Extend one arm behind you, place your hand on a wall, and gently lean forward to feel the stretch.",
                        duration: 90,
                        emoji: "💪"
                    },
                    {
                        name: "Finger Stretches",
                        description: "Spread your fingers wide, then make a fist. Repeat this movement slowly and gently.",
                        duration: 90,
                        emoji: "✋"
                    },
                    {
                        name: "Prayer Stretch",
                        description: "Press your palms together in front of your chest, then slowly lower your hands while keeping palms together.",
                        duration: 90,
                        emoji: "🙏"
                    },
                    {
                        name: "Reverse Prayer Stretch",
                        description: "Press the backs of your hands together behind your back, fingers pointing down, then slowly lift your hands up.",
                        duration: 90,
                        emoji: "🙏"
                    }
                ]
            }
        }
    },
    full: {
        name: "Full Body",
        routines: {
            quick: {
                name: "Quick Relief (5 minutes)",
                duration: "5 minutes",
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
                        name: "Gentle Twist",
                        description: "Stand with feet hip-width apart, place your hands on your hips, and gently twist from side to side.",
                        duration: 60,
                        emoji: "🔄"
                    }
                ]
            },
            standard: {
                name: "Standard Routine (10 minutes)",
                duration: "10 minutes",
                exercises: [
                    {
                        name: "Sun Salutation",
                        description: "Stand tall, reach your arms up, then fold forward, step back into a plank, and return to standing.",
                        duration: 90,
                        emoji: "☀️"
                    },
                    {
                        name: "Full Body Stretch",
                        description: "Stand with feet apart, reach your arms up and over your head, then gently lean to each side.",
                        duration: 90,
                        emoji: "🤸"
                    },
                    {
                        name: "Gentle Twist",
                        description: "Stand with feet hip-width apart, place your hands on your hips, and gently twist from side to side.",
                        duration: 90,
                        emoji: "🔄"
                    },
                    {
                        name: "Cat-Cow Stretch",
                        description: "On hands and knees, arch your back up like a cat, then lower it down like a cow. Move slowly and gently.",
                        duration: 90,
                        emoji: "🐱"
                    },
                    {
                        name: "Child's Pose",
                        description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor.",
                        duration: 90,
                        emoji: "🧘"
                    }
                ]
            },
            extended: {
                name: "Extended Routine (15 minutes)",
                duration: "15 minutes",
                exercises: [
                    {
                        name: "Sun Salutation",
                        description: "Stand tall, reach your arms up, then fold forward, step back into a plank, and return to standing.",
                        duration: 120,
                        emoji: "☀️"
                    },
                    {
                        name: "Full Body Stretch",
                        description: "Stand with feet apart, reach your arms up and over your head, then gently lean to each side.",
                        duration: 120,
                        emoji: "🤸"
                    },
                    {
                        name: "Gentle Twist",
                        description: "Stand with feet hip-width apart, place your hands on your hips, and gently twist from side to side.",
                        duration: 120,
                        emoji: "🔄"
                    },
                    {
                        name: "Cat-Cow Stretch",
                        description: "On hands and knees, arch your back up like a cat, then lower it down like a cow. Move slowly and gently.",
                        duration: 120,
                        emoji: "🐱"
                    },
                    {
                        name: "Child's Pose",
                        description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor.",
                        duration: 120,
                        emoji: "🧘"
                    },
                    {
                        name: "Supine Twist",
                        description: "Lie on your back, bring your knees to one side, keeping your shoulders on the floor. Hold and repeat on other side.",
                        duration: 120,
                        emoji: "🔄"
                    },
                    {
                        name: "Final Relaxation",
                        description: "Lie on your back with arms at your sides, close your eyes, and take deep, slow breaths.",
                        duration: 120,
                        emoji: "😌"
                    }
                ]
            }
        }
    }
};

// Global variables
let currentArea = '';
let currentRoutine = '';
let currentExerciseIndex = 0;
let currentExercises = [];
let timer = null;
let timeRemaining = 0;
let isTimerRunning = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // Body area selection
    const bodyAreaBtns = document.querySelectorAll('.body-area-btn');
    bodyAreaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const area = this.getAttribute('data-area');
            selectBodyArea(area);
        });
    });

    // Timer controls
    document.getElementById('start-pause-btn').addEventListener('click', toggleTimer);
    document.getElementById('skip-btn').addEventListener('click', skipExercise);
}

function selectBodyArea(area) {
    currentArea = area;
    showRoutineSelection();
    populateRoutines();
}

function showBodySelection() {
    document.getElementById('body-selection').classList.add('active');
    document.getElementById('routine-selection').classList.remove('active');
    document.getElementById('exercise-display').classList.remove('active');
}

function showRoutineSelection() {
    document.getElementById('body-selection').classList.remove('active');
    document.getElementById('routine-selection').classList.add('active');
    document.getElementById('exercise-display').classList.remove('active');
}

function showExerciseDisplay() {
    document.getElementById('body-selection').classList.remove('active');
    document.getElementById('routine-selection').classList.remove('active');
    document.getElementById('exercise-display').classList.add('active');
}

function populateRoutines() {
    const areaData = exerciseData[currentArea];
    const routinesContainer = document.getElementById('routines-container');
    const routineTitle = document.getElementById('routine-title');
    
    routineTitle.textContent = `${areaData.name} - Choose a routine length:`;
    
    routinesContainer.innerHTML = '';
    
    Object.keys(areaData.routines).forEach(routineKey => {
        const routine = areaData.routines[routineKey];
        const routineBtn = document.createElement('button');
        routineBtn.className = 'routine-btn';
        routineBtn.innerHTML = `
            <h3>${routine.name}</h3>
            <p>${routine.duration}</p>
        `;
        routineBtn.addEventListener('click', () => startRoutine(routineKey));
        routinesContainer.appendChild(routineBtn);
    });
}

function startRoutine(routineKey) {
    currentRoutine = routineKey;
    currentExercises = exerciseData[currentArea].routines[routineKey].exercises;
    currentExerciseIndex = 0;
    showExerciseDisplay();
    displayCurrentExercise();
}

function displayCurrentExercise() {
    const exercise = currentExercises[currentExerciseIndex];
    const totalExercises = currentExercises.length;
    
    // Update progress
    document.getElementById('current-exercise').textContent = currentExerciseIndex + 1;
    document.getElementById('total-exercises').textContent = totalExercises;
    
    // Update exercise info
    document.getElementById('exercise-title').textContent = exerciseData[currentArea].name;
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
