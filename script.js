// Tend: Stretching & Flexibility App - Exercise Data
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
                emoji: "↔️",
                needsSideSwitch: true
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
                emoji: "⭕",
                needsSideSwitch: true
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
                emoji: "🔄",
                needsSideSwitch: true
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
                emoji: "🔄",
                needsSideSwitch: true
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
                emoji: "🔄",
                needsSideSwitch: true
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
                emoji: "🏃",
                needsSideSwitch: true
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
                emoji: "🕊️",
                needsSideSwitch: true
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
                emoji: "🏃",
                needsSideSwitch: true
            },
            {
                name: "Pigeon Pose",
                description: "From hands and knees, bring one knee forward and place it behind your wrist, extend the other leg back.",
                duration: 60,
                emoji: "🕊️",
                needsSideSwitch: true
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
                emoji: "4️⃣",
                needsSideSwitch: true
            },
            {
                name: "Seated Hip Stretch",
                description: "Sit with one leg extended, cross the other leg over, and gently twist toward the bent knee.",
                duration: 60,
                emoji: "🪑",
                needsSideSwitch: true
            },
            {
                name: "Lizard Pose",
                description: "From downward dog, step one foot forward outside your hand, lower your forearms to the floor.",
                duration: 60,
                emoji: "🦎",
                needsSideSwitch: true
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
                emoji: "🔄",
                needsSideSwitch: true
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
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Pyramid Pose",
                description: "Step one foot forward, keep both legs straight, and fold forward over your front leg.",
                duration: 60,
                emoji: "🔺",
                needsSideSwitch: true
            },
            {
                name: "Reclined Hand to Big Toe",
                description: "Lie on your back, lift one leg up, and hold your big toe or use a strap to pull your leg closer.",
                duration: 60,
                emoji: "🦶",
                needsSideSwitch: true
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
                emoji: "🦵",
                needsSideSwitch: true
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
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Supine Twist",
                description: "Lie on your back, bring your knees to one side, keeping your shoulders on the floor. Hold and repeat on other side.",
                duration: 60,
                emoji: "🔄",
                needsSideSwitch: true
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
                emoji: "🏃",
                needsSideSwitch: true
            },
            {
                name: "Seated Back Twist",
                description: "Sit tall and gently twist your torso to the right, placing your left hand on your right knee. Hold and repeat on other side.",
                duration: 60,
                emoji: "🔄",
                needsSideSwitch: true
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
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Isometric Lunge",
                description: "Step one foot forward into a lunge position, hold the position without moving up or down.",
                duration: 60,
                emoji: "🏃",
                needsSideSwitch: true
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
    },
    "neck": {
        name: "Neck",
        description: "Gentle stretches to relieve neck tension, improve mobility, and reduce stiffness from poor posture.",
        duration: "8 minutes",
        exercises: [
            {
                name: "Neck Rolls",
                description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Side Neck Stretch",
                description: "Gently tilt your head to the right, hold for 15 seconds, then repeat on the left side.",
                duration: 60,
                emoji: "↔️",
                needsSideSwitch: true
            },
            {
                name: "Forward Neck Stretch",
                description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck.",
                duration: 60,
                emoji: "⬇️"
            },
            {
                name: "Backward Neck Stretch",
                description: "Gently tilt your head back, looking up toward the ceiling, feeling a stretch in the front of your neck.",
                duration: 60,
                emoji: "⬆️"
            },
            {
                name: "Chin Tucks",
                description: "Gently pull your chin back, creating a double chin. Hold for 5 seconds, then release. Repeat slowly.",
                duration: 60,
                emoji: "⬅️"
            },
            {
                name: "Neck Rotation",
                description: "Slowly turn your head to the right as far as comfortable, hold for 10 seconds, then repeat on the left.",
                duration: 60,
                emoji: "↩️",
                needsSideSwitch: true
            },
            {
                name: "Diagonal Neck Stretch",
                description: "Gently tilt your head diagonally down and to the right, then repeat on the left side.",
                duration: 60,
                emoji: "↘️",
                needsSideSwitch: true
            },
            {
                name: "Final Relaxation",
                description: "Sit or stand tall, close your eyes, and take 5 deep breaths while feeling your neck relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "shoulders": {
        name: "Shoulders",
        description: "Targeted stretches to release shoulder tension, improve range of motion, and prevent stiffness.",
        duration: "10 minutes",
        exercises: [
            {
                name: "Shoulder Shrugs",
                description: "Lift your shoulders up toward your ears, hold for 3 seconds, then relax. Repeat slowly.",
                duration: 60,
                emoji: "🤷"
            },
            {
                name: "Arm Circles",
                description: "Make small circles with your arms, first forward, then backward. Keep movements slow and controlled.",
                duration: 60,
                emoji: "⭕",
                needsSideSwitch: true
            },
            {
                name: "Shoulder Blade Squeeze",
                description: "Squeeze your shoulder blades together, hold for 5 seconds, then release. Keep your shoulders relaxed.",
                duration: 60,
                emoji: "🤝"
            },
            {
                name: "Cross-Body Shoulder Stretch",
                description: "Bring one arm across your chest, use your other arm to gently pull it closer. Hold and repeat on other side.",
                duration: 60,
                emoji: "🤗",
                needsSideSwitch: true
            },
            {
                name: "Behind-Back Shoulder Stretch",
                description: "Reach one arm behind your back, use your other hand to gently pull it up. Hold and repeat on other side.",
                duration: 60,
                emoji: "🤲",
                needsSideSwitch: true
            },
            {
                name: "Overhead Shoulder Stretch",
                description: "Reach one arm overhead and bend it behind your head, use your other hand to gently pull the elbow. Hold and repeat.",
                duration: 60,
                emoji: "🙋",
                needsSideSwitch: true
            },
            {
                name: "Doorway Chest Stretch",
                description: "Place your forearm against a doorway, step forward to feel a stretch in your chest and front shoulder.",
                duration: 60,
                emoji: "🚪"
            },
            {
                name: "Final Relaxation",
                description: "Let your arms hang naturally at your sides, close your eyes, and feel your shoulders relax completely.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "feet": {
        name: "Feet",
        description: "Foot-specific stretches to improve flexibility, reduce pain, and enhance overall foot health.",
        duration: "8 minutes",
        exercises: [
            {
                name: "Toe Spreads",
                description: "Sit comfortably and spread your toes as wide as possible, hold for 5 seconds, then relax.",
                duration: 60,
                emoji: "🦶"
            },
            {
                name: "Toe Curls",
                description: "Curl your toes under, hold for 5 seconds, then extend them as far as possible. Repeat slowly.",
                duration: 60,
                emoji: "👣"
            },
            {
                name: "Ankle Circles",
                description: "Sit with one leg extended, rotate your ankle in circles, first clockwise, then counterclockwise.",
                duration: 60,
                emoji: "🔄",
                needsSideSwitch: true
            },
            {
                name: "Plantar Fascia Stretch",
                description: "Sit and place one foot on the opposite knee, gently pull your toes back toward your shin.",
                duration: 60,
                emoji: "🦶",
                needsSideSwitch: true
            },
            {
                name: "Calf Raises",
                description: "Stand tall and slowly rise up onto your toes, then lower back down. Keep movements controlled.",
                duration: 60,
                emoji: "🦵"
            },
            {
                name: "Toe Squats",
                description: "Kneel on the floor, sit back on your heels, and hold the position to stretch your toes and feet.",
                duration: 60,
                emoji: "🦶"
            },
            {
                name: "Foot Massage",
                description: "Use your hands to gently massage the bottom of your foot, focusing on the arch and heel.",
                duration: 60,
                emoji: "👐"
            },
            {
                name: "Final Relaxation",
                description: "Sit comfortably with your feet flat on the floor, close your eyes, and feel your feet relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "ankle": {
        name: "Ankle",
        description: "Ankle mobility exercises to improve flexibility, reduce stiffness, and prevent injury.",
        duration: "6 minutes",
        exercises: [
            {
                name: "Ankle Circles",
                description: "Sit with one leg extended, rotate your ankle in circles, first clockwise, then counterclockwise.",
                duration: 60,
                emoji: "🔄",
                needsSideSwitch: true
            },
            {
                name: "Ankle Flexion",
                description: "Point your toes away from you, then pull them back toward your shin. Move slowly and controlled.",
                duration: 60,
                emoji: "⬆️"
            },
            {
                name: "Ankle Inversion",
                description: "Turn your foot inward, then outward. Keep movements gentle and within comfortable range.",
                duration: 60,
                emoji: "↔️"
            },
            {
                name: "Calf Stretch",
                description: "Stand facing a wall, place one foot forward, lean into the wall to stretch your calf and ankle.",
                duration: 60,
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Achilles Stretch",
                description: "Stand on a step, let one heel hang off the edge, and gently lower it to stretch your Achilles tendon.",
                duration: 60,
                emoji: "🦶",
                needsSideSwitch: true
            },
            {
                name: "Ankle Alphabet",
                description: "Sit with one leg extended, use your big toe to trace the alphabet in the air.",
                duration: 60,
                emoji: "🔤",
                needsSideSwitch: true
            },
            {
                name: "Final Relaxation",
                description: "Sit comfortably with your feet flat on the floor, close your eyes, and feel your ankles relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "knees": {
        name: "Knees",
        description: "Gentle knee stretches to improve mobility, reduce stiffness, and support joint health.",
        duration: "8 minutes",
        exercises: [
            {
                name: "Knee Circles",
                description: "Stand with feet hip-width apart, place hands on knees, and make gentle circles with your knees.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Knee to Chest",
                description: "Lie on your back, bring one knee to your chest, hold with your hands. Repeat with the other leg.",
                duration: 60,
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Seated Knee Extensions",
                description: "Sit tall, extend one leg straight out, hold for 5 seconds, then lower. Repeat with other leg.",
                duration: 60,
                emoji: "🪑",
                needsSideSwitch: true
            },
            {
                name: "Quad Stretch",
                description: "Stand and bend one knee, bringing your heel toward your glutes. Hold your ankle and gently pull.",
                duration: 60,
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Hamstring Stretch",
                description: "Sit with one leg extended, reach forward toward your toes while keeping your back straight.",
                duration: 60,
                emoji: "⬇️"
            },
            {
                name: "IT Band Stretch",
                description: "Stand and cross one leg behind the other, lean to the side to stretch your IT band.",
                duration: 60,
                emoji: "↔️",
                needsSideSwitch: true
            },
            {
                name: "Knee Hugs",
                description: "Lie on your back, bring both knees to your chest, and gently rock from side to side.",
                duration: 60,
                emoji: "🤗"
            },
            {
                name: "Final Relaxation",
                description: "Lie on your back with legs extended, close your eyes, and feel your knees relax completely.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "hands": {
        name: "Hands",
        description: "Hand and finger stretches to improve dexterity, reduce stiffness, and prevent repetitive strain.",
        duration: "6 minutes",
        exercises: [
            {
                name: "Fist to Open",
                description: "Make a tight fist, then open your hand and spread your fingers wide. Repeat slowly.",
                duration: 60,
                emoji: "✊"
            },
            {
                name: "Finger Spreads",
                description: "Spread your fingers as wide as possible, hold for 5 seconds, then bring them together.",
                duration: 60,
                emoji: "🖐️"
            },
            {
                name: "Thumb Circles",
                description: "Make circles with your thumb, first clockwise, then counterclockwise. Use your other hand for support.",
                duration: 60,
                emoji: "👍"
            },
            {
                name: "Finger Bends",
                description: "Bend each finger individually, starting with your index finger and working to your pinky.",
                duration: 60,
                emoji: "👆"
            },
            {
                name: "Prayer Stretch",
                description: "Press your palms together in front of your chest, then slowly lower your hands while keeping palms together.",
                duration: 60,
                emoji: "🙏"
            },
            {
                name: "Wrist Flexor Stretch",
                description: "Extend one arm, use your other hand to gently pull your fingers back toward your forearm.",
                duration: 60,
                emoji: "🤲",
                needsSideSwitch: true
            },
            {
                name: "Hand Massage",
                description: "Use your thumb to gently massage the palm of your other hand, then switch hands.",
                duration: 60,
                emoji: "👐",
                needsSideSwitch: true
            },
            {
                name: "Final Relaxation",
                description: "Let your hands rest comfortably in your lap, close your eyes, and feel your hands relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "fingers": {
        name: "Fingers",
        description: "Detailed finger exercises to improve flexibility, dexterity, and reduce stiffness in individual fingers.",
        duration: "5 minutes",
        exercises: [
            {
                name: "Individual Finger Lifts",
                description: "Place your hand flat on a table, lift each finger individually, one at a time.",
                duration: 60,
                emoji: "👆"
            },
            {
                name: "Finger Taps",
                description: "Tap each finger to your thumb, starting with your index finger and working to your pinky.",
                duration: 60,
                emoji: "👌"
            },
            {
                name: "Finger Stretches",
                description: "Gently pull each finger back one at a time, holding for 5 seconds each.",
                duration: 60,
                emoji: "🖐️"
            },
            {
                name: "Spider Crawl",
                description: "Place your fingertips on a table, lift and lower each finger in sequence like a spider walking.",
                duration: 60,
                emoji: "🕷️"
            },
            {
                name: "Finger Circles",
                description: "Make small circles with each finger individually, keeping the rest of your hand still.",
                duration: 60,
                emoji: "🌀"
            },
            {
                name: "Pinky to Thumb",
                description: "Touch your pinky to your thumb, then stretch them apart. Repeat with each finger.",
                duration: 60,
                emoji: "🤏"
            },
            {
                name: "Final Relaxation",
                description: "Rest your hands comfortably, close your eyes, and feel each finger relax completely.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "wrists": {
        name: "Wrists",
        description: "Wrist mobility exercises to improve flexibility, reduce stiffness, and prevent repetitive strain injury.",
        duration: "6 minutes",
        exercises: [
            {
                name: "Wrist Circles",
                description: "Make slow circles with your wrists, first clockwise, then counterclockwise. Keep movements gentle.",
                duration: 60,
                emoji: "🔄"
            },
            {
                name: "Wrist Flexion",
                description: "Bend your wrists forward, then backward. Move slowly and within comfortable range.",
                duration: 60,
                emoji: "↕️"
            },
            {
                name: "Wrist Side to Side",
                description: "Move your wrists from side to side, keeping your forearms still.",
                duration: 60,
                emoji: "↔️"
            },
            {
                name: "Prayer Stretch",
                description: "Press your palms together in front of your chest, then slowly lower your hands while keeping palms together.",
                duration: 60,
                emoji: "🙏"
            },
            {
                name: "Reverse Prayer",
                description: "Press the backs of your hands together, fingers pointing down, then gently lift your elbows.",
                duration: 60,
                emoji: "🤲"
            },
            {
                name: "Wrist Extensor Stretch",
                description: "Extend one arm, use your other hand to gently pull your fingers down toward your forearm.",
                duration: 60,
                emoji: "⬇️",
                needsSideSwitch: true
            },
            {
                name: "Wrist Flexor Stretch",
                description: "Extend one arm, use your other hand to gently pull your fingers back toward your forearm.",
                duration: 60,
                emoji: "⬆️",
                needsSideSwitch: true
            },
            {
                name: "Final Relaxation",
                description: "Let your arms hang naturally at your sides, close your eyes, and feel your wrists relax completely.",
                duration: 60,
                emoji: "😌"
            }
        ]
    },
    "feet-ankles": {
        name: "Feet & Ankles",
        description: "Comprehensive foot and ankle mobility routine to improve balance, flexibility, and prevent injury.",
        duration: "8 minutes",
        exercises: [
            {
                name: "Single Leg Stand",
                description: "Stand on one leg, lift the other leg slightly off the ground, and hold the position for balance.",
                duration: 60,
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Ankle Circles",
                description: "Sit with one leg extended, rotate your ankle in circles, first clockwise, then counterclockwise.",
                duration: 60,
                emoji: "🔄",
                needsSideSwitch: true
            },
            {
                name: "Heel-to-Toe Rocks",
                description: "Stand with feet hip-width apart, slowly rock forward onto your toes, then back onto your heels. Keep movements controlled.",
                duration: 60,
                emoji: "🦶"
            },
            {
                name: "Lateral Foot Rocks",
                description: "Stand with feet hip-width apart, slowly rock your weight from the outside edges of your feet to the inside edges.",
                duration: 60,
                emoji: "↔️"
            },
            {
                name: "Knee Circles",
                description: "Stand with feet hip-width apart, place hands on knees, and make gentle circles with your knees.",
                duration: 60,
                emoji: "🔄",
                needsSideSwitch: true
            },
            {
                name: "Soleus Stretch",
                description: "Stand facing a wall, place one foot forward with knee bent, lean into the wall to stretch your soleus muscle.",
                duration: 60,
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Standing Quad Stretch",
                description: "Stand and bend one knee, bringing your heel toward your glutes. Hold your ankle and gently pull.",
                duration: 60,
                emoji: "🦵",
                needsSideSwitch: true
            },
            {
                name: "Final Relaxation",
                description: "Sit comfortably with your feet flat on the floor, close your eyes, and feel your feet and ankles relax.",
                duration: 60,
                emoji: "😌"
            }
        ]
    }
};

// Folder system for organizing routines by body areas
const bodyAreaFolders = {
    "hips": {
        name: "Hips",
        icon: "🦴",
        description: "Hip mobility and flexibility routines",
        routines: {
            "hips-5min": {
                name: "Hips - 5 min",
                description: "Quick hip mobility routine",
                duration: "5 minutes",
                exercises: [
                    { name: "Hip Circles", description: "Stand with hands on hips, make slow circles with your hips", duration: 30, emoji: "🔄" },
                    { name: "Hip Flexor Stretch", description: "Step forward into a lunge, feel stretch in front hip", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Figure 4 Stretch", description: "Sit and place ankle on opposite knee, lean forward", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Hip Stretch", description: "Sit with one leg extended, pull other knee to chest", duration: 45, emoji: "🪑", needsSideSwitch: true },
                    { name: "Hip Circles Seated", description: "Sit and make circles with your knees", duration: 30, emoji: "🔄" }
                ]
            },
            "hips-10min": {
                name: "Hips - 10 min",
                description: "Comprehensive hip flexibility routine",
                duration: "10 minutes",
                exercises: [
                    { name: "Hip Circles", description: "Stand with hands on hips, make slow circles with your hips", duration: 30, emoji: "🔄" },
                    { name: "Hip Flexor Stretch", description: "Step forward into a lunge, feel stretch in front hip", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Figure 4 Stretch", description: "Sit and place ankle on opposite knee, lean forward", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Hip Stretch", description: "Sit with one leg extended, pull other knee to chest", duration: 60, emoji: "🪑", needsSideSwitch: true },
                    { name: "Pigeon Pose", description: "From downward dog, bring knee forward and extend back leg", duration: 90, emoji: "🕊️", needsSideSwitch: true },
                    { name: "Lizard Pose", description: "Low lunge with forearms on ground", duration: 60, emoji: "🦎", needsSideSwitch: true },
                    { name: "Supine Hip Stretch", description: "Lie down, pull knee to chest, then across body", duration: 60, emoji: "🛌", needsSideSwitch: true },
                    { name: "Hip Circles Seated", description: "Sit and make circles with your knees", duration: 30, emoji: "🔄" }
                ]
            },
            "hips-15min": {
                name: "Hips - 15 min",
                description: "Extended hip mobility and strength routine",
                duration: "15 minutes",
                exercises: [
                    { name: "Hip Circles", description: "Stand with hands on hips, make slow circles with your hips", duration: 45, emoji: "🔄" },
                    { name: "Hip Flexor Stretch", description: "Step forward into a lunge, feel stretch in front hip", duration: 75, emoji: "🦵", needsSideSwitch: true },
                    { name: "Figure 4 Stretch", description: "Sit and place ankle on opposite knee, lean forward", duration: 75, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Hip Stretch", description: "Sit with one leg extended, pull other knee to chest", duration: 75, emoji: "🪑", needsSideSwitch: true },
                    { name: "Pigeon Pose", description: "From downward dog, bring knee forward and extend back leg", duration: 120, emoji: "🕊️", needsSideSwitch: true },
                    { name: "Lizard Pose", description: "Low lunge with forearms on ground", duration: 90, emoji: "🦎", needsSideSwitch: true },
                    { name: "Supine Hip Stretch", description: "Lie down, pull knee to chest, then across body", duration: 90, emoji: "🛌", needsSideSwitch: true },
                    { name: "Hip Circles Seated", description: "Sit and make circles with your knees", duration: 45, emoji: "🔄" },
                    { name: "Hip Abduction", description: "Lie on side, lift top leg up and down", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Hip Adduction", description: "Lie on side, lift bottom leg up", duration: 60, emoji: "🦵", needsSideSwitch: true }
                ]
            },
            "hips-20min": {
                name: "Hips - 20 min",
                description: "Complete hip mobility, flexibility and strength routine",
                duration: "20 minutes",
                exercises: [
                    { name: "Hip Circles", description: "Stand with hands on hips, make slow circles with your hips", duration: 60, emoji: "🔄" },
                    { name: "Hip Flexor Stretch", description: "Step forward into a lunge, feel stretch in front hip", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Figure 4 Stretch", description: "Sit and place ankle on opposite knee, lean forward", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Hip Stretch", description: "Sit with one leg extended, pull other knee to chest", duration: 90, emoji: "🪑", needsSideSwitch: true },
                    { name: "Pigeon Pose", description: "From downward dog, bring knee forward and extend back leg", duration: 150, emoji: "🕊️", needsSideSwitch: true },
                    { name: "Lizard Pose", description: "Low lunge with forearms on ground", duration: 120, emoji: "🦎", needsSideSwitch: true },
                    { name: "Supine Hip Stretch", description: "Lie down, pull knee to chest, then across body", duration: 120, emoji: "🛌", needsSideSwitch: true },
                    { name: "Hip Circles Seated", description: "Sit and make circles with your knees", duration: 60, emoji: "🔄" },
                    { name: "Hip Abduction", description: "Lie on side, lift top leg up and down", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Hip Adduction", description: "Lie on side, lift bottom leg up", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Hip Bridge", description: "Lie on back, lift hips up and down", duration: 60, emoji: "🌉" },
                    { name: "Hip Flexor Strengthening", description: "Standing leg lifts to front and side", duration: 90, emoji: "🦵", needsSideSwitch: true }
                ]
            }
        }
    },
    "shoulders": {
        name: "Shoulders",
        icon: "🤲",
        description: "Shoulder mobility and flexibility routines",
        routines: {
            "shoulders-4min": {
                name: "Shoulders - 4 min",
                description: "Quick shoulder mobility routine",
                duration: "4 minutes",
                exercises: [
                    { name: "Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 30, emoji: "🤷" },
                    { name: "Arm Circles", description: "Make circles with your arms, forward and backward", duration: 30, emoji: "⭕", needsSideSwitch: true },
                    { name: "Cross-Body Shoulder Stretch", description: "Pull arm across chest, feel stretch in shoulder", duration: 45, emoji: "🤲", needsSideSwitch: true },
                    { name: "Behind-Back Shoulder Stretch", description: "Reach one arm up and one down behind back", duration: 45, emoji: "🤲", needsSideSwitch: true },
                    { name: "Overhead Shoulder Stretch", description: "Reach arm overhead and pull gently", duration: 45, emoji: "🤲", needsSideSwitch: true }
                ]
            },
            "shoulders-8min": {
                name: "Shoulders - 8 min",
                description: "Comprehensive shoulder flexibility routine",
                duration: "8 minutes",
                exercises: [
                    { name: "Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 45, emoji: "🤷" },
                    { name: "Arm Circles", description: "Make circles with your arms, forward and backward", duration: 45, emoji: "⭕", needsSideSwitch: true },
                    { name: "Cross-Body Shoulder Stretch", description: "Pull arm across chest, feel stretch in shoulder", duration: 60, emoji: "🤲", needsSideSwitch: true },
                    { name: "Behind-Back Shoulder Stretch", description: "Reach one arm up and one down behind back", duration: 60, emoji: "🤲", needsSideSwitch: true },
                    { name: "Overhead Shoulder Stretch", description: "Reach arm overhead and pull gently", duration: 60, emoji: "🤲", needsSideSwitch: true },
                    { name: "Wall Slides", description: "Stand against wall, slide arms up and down", duration: 60, emoji: "🧱" },
                    { name: "Shoulder Blade Squeezes", description: "Squeeze shoulder blades together and release", duration: 45, emoji: "🤲" }
                ]
            },
            "shoulders-12min": {
                name: "Shoulders - 12 min",
                description: "Extended shoulder mobility and strength routine",
                duration: "12 minutes",
                exercises: [
                    { name: "Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 60, emoji: "🤷" },
                    { name: "Arm Circles", description: "Make circles with your arms, forward and backward", duration: 60, emoji: "⭕", needsSideSwitch: true },
                    { name: "Cross-Body Shoulder Stretch", description: "Pull arm across chest, feel stretch in shoulder", duration: 75, emoji: "🤲", needsSideSwitch: true },
                    { name: "Behind-Back Shoulder Stretch", description: "Reach one arm up and one down behind back", duration: 75, emoji: "🤲", needsSideSwitch: true },
                    { name: "Overhead Shoulder Stretch", description: "Reach arm overhead and pull gently", duration: 75, emoji: "🤲", needsSideSwitch: true },
                    { name: "Wall Slides", description: "Stand against wall, slide arms up and down", duration: 90, emoji: "🧱" },
                    { name: "Shoulder Blade Squeezes", description: "Squeeze shoulder blades together and release", duration: 60, emoji: "🤲" },
                    { name: "Doorway Chest Stretch", description: "Place forearm on doorframe, lean forward", duration: 60, emoji: "🚪", needsSideSwitch: true },
                    { name: "Shoulder External Rotation", description: "Hold band or towel, rotate arm outward", duration: 60, emoji: "🔄", needsSideSwitch: true }
                ]
            },
            "shoulders-16min": {
                name: "Shoulders - 16 min",
                description: "Complete shoulder mobility, flexibility and strength routine",
                duration: "16 minutes",
                exercises: [
                    { name: "Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 75, emoji: "🤷" },
                    { name: "Arm Circles", description: "Make circles with your arms, forward and backward", duration: 75, emoji: "⭕", needsSideSwitch: true },
                    { name: "Cross-Body Shoulder Stretch", description: "Pull arm across chest, feel stretch in shoulder", duration: 90, emoji: "🤲", needsSideSwitch: true },
                    { name: "Behind-Back Shoulder Stretch", description: "Reach one arm up and one down behind back", duration: 90, emoji: "🤲", needsSideSwitch: true },
                    { name: "Overhead Shoulder Stretch", description: "Reach arm overhead and pull gently", duration: 90, emoji: "🤲", needsSideSwitch: true },
                    { name: "Wall Slides", description: "Stand against wall, slide arms up and down", duration: 120, emoji: "🧱" },
                    { name: "Shoulder Blade Squeezes", description: "Squeeze shoulder blades together and release", duration: 75, emoji: "🤲" },
                    { name: "Doorway Chest Stretch", description: "Place forearm on doorframe, lean forward", duration: 90, emoji: "🚪", needsSideSwitch: true },
                    { name: "Shoulder External Rotation", description: "Hold band or towel, rotate arm outward", duration: 90, emoji: "🔄", needsSideSwitch: true },
                    { name: "Shoulder Internal Rotation", description: "Hold band or towel, rotate arm inward", duration: 90, emoji: "🔄", needsSideSwitch: true },
                    { name: "Scapular Wall Slides", description: "Wall slides focusing on shoulder blade movement", duration: 90, emoji: "🧱" }
                ]
            }
        }
    },
    "lower-back": {
        name: "Lower Back",
        icon: "🫁",
        description: "Lower back relief and strengthening routines",
        routines: {
            "lower-back-5min": {
                name: "Lower Back - 5 min",
                description: "Quick lower back relief routine",
                duration: "5 minutes",
                exercises: [
                    { name: "Cat-Cow Stretch", description: "On hands and knees, arch and round your back", duration: 60, emoji: "🐱" },
                    { name: "Child's Pose", description: "Sit back on heels, reach arms forward", duration: 60, emoji: "🧘" },
                    { name: "Seated Back Twist", description: "Sit tall, twist to one side, hold", duration: 45, emoji: "🔄", needsSideSwitch: true },
                    { name: "Knee to Chest", description: "Lie down, pull one knee to chest", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Supine Twist", description: "Lie down, drop knees to one side", duration: 45, emoji: "🔄", needsSideSwitch: true }
                ]
            },
            "lower-back-10min": {
                name: "Lower Back - 10 min",
                description: "Comprehensive lower back relief routine",
                duration: "10 minutes",
                exercises: [
                    { name: "Cat-Cow Stretch", description: "On hands and knees, arch and round your back", duration: 90, emoji: "🐱" },
                    { name: "Child's Pose", description: "Sit back on heels, reach arms forward", duration: 90, emoji: "🧘" },
                    { name: "Seated Back Twist", description: "Sit tall, twist to one side, hold", duration: 60, emoji: "🔄", needsSideSwitch: true },
                    { name: "Knee to Chest", description: "Lie down, pull one knee to chest", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Supine Twist", description: "Lie down, drop knees to one side", duration: 60, emoji: "🔄", needsSideSwitch: true },
                    { name: "Pelvic Tilts", description: "Lie down, tilt pelvis up and down", duration: 60, emoji: "🦴" },
                    { name: "Lower Back Stretch", description: "Lie on back, bring knees to chest", duration: 60, emoji: "🫁" }
                ]
            },
            "lower-back-15min": {
                name: "Lower Back - 15 min",
                description: "Extended lower back relief and strengthening routine",
                duration: "15 minutes",
                exercises: [
                    { name: "Cat-Cow Stretch", description: "On hands and knees, arch and round your back", duration: 120, emoji: "🐱" },
                    { name: "Child's Pose", description: "Sit back on heels, reach arms forward", duration: 120, emoji: "🧘" },
                    { name: "Seated Back Twist", description: "Sit tall, twist to one side, hold", duration: 75, emoji: "🔄", needsSideSwitch: true },
                    { name: "Knee to Chest", description: "Lie down, pull one knee to chest", duration: 75, emoji: "🦵", needsSideSwitch: true },
                    { name: "Supine Twist", description: "Lie down, drop knees to one side", duration: 75, emoji: "🔄", needsSideSwitch: true },
                    { name: "Pelvic Tilts", description: "Lie down, tilt pelvis up and down", duration: 90, emoji: "🦴" },
                    { name: "Lower Back Stretch", description: "Lie on back, bring knees to chest", duration: 90, emoji: "🫁" },
                    { name: "Bird Dog", description: "On hands and knees, extend opposite arm and leg", duration: 90, emoji: "🐕", needsSideSwitch: true },
                    { name: "Dead Bug", description: "Lie on back, extend opposite arm and leg", duration: 90, emoji: "🐛", needsSideSwitch: true }
                ]
            },
            "lower-back-20min": {
                name: "Lower Back - 20 min",
                description: "Complete lower back relief, flexibility and strengthening routine",
                duration: "20 minutes",
                exercises: [
                    { name: "Cat-Cow Stretch", description: "On hands and knees, arch and round your back", duration: 150, emoji: "🐱" },
                    { name: "Child's Pose", description: "Sit back on heels, reach arms forward", duration: 150, emoji: "🧘" },
                    { name: "Seated Back Twist", description: "Sit tall, twist to one side, hold", duration: 90, emoji: "🔄", needsSideSwitch: true },
                    { name: "Knee to Chest", description: "Lie down, pull one knee to chest", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Supine Twist", description: "Lie down, drop knees to one side", duration: 90, emoji: "🔄", needsSideSwitch: true },
                    { name: "Pelvic Tilts", description: "Lie down, tilt pelvis up and down", duration: 120, emoji: "🦴" },
                    { name: "Lower Back Stretch", description: "Lie on back, bring knees to chest", duration: 120, emoji: "🫁" },
                    { name: "Bird Dog", description: "On hands and knees, extend opposite arm and leg", duration: 120, emoji: "🐕", needsSideSwitch: true },
                    { name: "Dead Bug", description: "Lie on back, extend opposite arm and leg", duration: 120, emoji: "🐛", needsSideSwitch: true },
                    { name: "Glute Bridge", description: "Lie on back, lift hips up and down", duration: 90, emoji: "🌉" },
                    { name: "Lower Back Strengthening", description: "Lie on stomach, lift chest and legs", duration: 90, emoji: "🫁" }
                ]
            }
        }
    },
    "neck": {
        name: "Neck",
        icon: "🦒",
        description: "Neck mobility and tension relief routines",
        routines: {
            "neck-4min": {
                name: "Neck - 4 min",
                description: "Quick neck tension relief",
                duration: "4 minutes",
                exercises: [
                    { name: "Neck Rolls", description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.", duration: 30, emoji: "🔄" },
                    { name: "Side Neck Stretch", description: "Gently tilt your head to the right, hold for 15 seconds, then repeat on the left side.", duration: 30, emoji: "↔️", needsSideSwitch: true },
                    { name: "Forward Neck Stretch", description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck.", duration: 30, emoji: "⬇️" },
                    { name: "Neck Retraction", description: "Gently pull your head back, creating a double chin. Hold and release.", duration: 30, emoji: "↩️" },
                    { name: "Ear to Shoulder", description: "Gently tilt your head toward your right shoulder, hold, then left shoulder.", duration: 30, emoji: "👂", needsSideSwitch: true },
                    { name: "Neck Rotation", description: "Slowly turn your head to look over your right shoulder, then left shoulder.", duration: 30, emoji: "👀", needsSideSwitch: true }
                ]
            },
            "neck-8min": {
                name: "Neck - 8 min",
                description: "Comprehensive neck mobility routine",
                duration: "8 minutes",
                exercises: [
                    { name: "Neck Rolls", description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.", duration: 45, emoji: "🔄" },
                    { name: "Side Neck Stretch", description: "Gently tilt your head to the right, hold for 20 seconds, then repeat on the left side.", duration: 40, emoji: "↔️", needsSideSwitch: true },
                    { name: "Forward Neck Stretch", description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck.", duration: 40, emoji: "⬇️" },
                    { name: "Neck Retraction", description: "Gently pull your head back, creating a double chin. Hold and release.", duration: 40, emoji: "↩️" },
                    { name: "Ear to Shoulder", description: "Gently tilt your head toward your right shoulder, hold, then left shoulder.", duration: 40, emoji: "👂", needsSideSwitch: true },
                    { name: "Neck Rotation", description: "Slowly turn your head to look over your right shoulder, then left shoulder.", duration: 40, emoji: "👀", needsSideSwitch: true },
                    { name: "Upper Trap Stretch", description: "Place right hand behind back, tilt head left, gently pull with left hand.", duration: 45, emoji: "🤲", needsSideSwitch: true },
                    { name: "Levator Scapulae Stretch", description: "Turn head 45 degrees, look down, gently pull head forward and down.", duration: 45, emoji: "🔽", needsSideSwitch: true },
                    { name: "Suboccipital Release", description: "Place fingers at base of skull, gently massage and hold pressure.", duration: 60, emoji: "👆" }
                ]
            },
            "neck-12min": {
                name: "Neck - 12 min",
                description: "Extended neck therapy routine",
                duration: "12 minutes",
                exercises: [
                    { name: "Neck Rolls", description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled.", duration: 60, emoji: "🔄" },
                    { name: "Side Neck Stretch", description: "Gently tilt your head to the right, hold for 25 seconds, then repeat on the left side.", duration: 50, emoji: "↔️", needsSideSwitch: true },
                    { name: "Forward Neck Stretch", description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck.", duration: 50, emoji: "⬇️" },
                    { name: "Neck Retraction", description: "Gently pull your head back, creating a double chin. Hold and release.", duration: 50, emoji: "↩️" },
                    { name: "Ear to Shoulder", description: "Gently tilt your head toward your right shoulder, hold, then left shoulder.", duration: 50, emoji: "👂", needsSideSwitch: true },
                    { name: "Neck Rotation", description: "Slowly turn your head to look over your right shoulder, then left shoulder.", duration: 50, emoji: "👀", needsSideSwitch: true },
                    { name: "Upper Trap Stretch", description: "Place right hand behind back, tilt head left, gently pull with left hand.", duration: 60, emoji: "🤲", needsSideSwitch: true },
                    { name: "Levator Scapulae Stretch", description: "Turn head 45 degrees, look down, gently pull head forward and down.", duration: 60, emoji: "🔽", needsSideSwitch: true },
                    { name: "Suboccipital Release", description: "Place fingers at base of skull, gently massage and hold pressure.", duration: 90, emoji: "👆" },
                    { name: "Neck Isometrics", description: "Place hand on forehead, gently push while resisting with neck muscles.", duration: 30, emoji: "💪" },
                    { name: "Side Neck Isometrics", description: "Place hand on side of head, gently push while resisting with neck muscles.", duration: 30, emoji: "💪", needsSideSwitch: true },
                    { name: "Deep Breathing", description: "Take 5 deep breaths, focusing on relaxing neck and shoulder muscles.", duration: 60, emoji: "🫁" }
                ]
            }
        }
    },
    "hamstrings": {
        name: "Hamstrings",
        icon: "🦵",
        description: "Hamstring flexibility and mobility routines",
        routines: {
            "hamstrings-5min": {
                name: "Hamstrings - 5 min",
                description: "Quick hamstring flexibility routine",
                duration: "5 minutes",
                exercises: [
                    { name: "Standing Hamstring Stretch", description: "Stand with one foot forward, hinge at hips to stretch back leg", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Hamstring Stretch", description: "Sit with legs extended, reach forward to stretch hamstrings", duration: 60, emoji: "🪑" },
                    { name: "Wall Hamstring Stretch", description: "Lie on back, place leg against wall, straighten knee", duration: 60, emoji: "🧱", needsSideSwitch: true },
                    { name: "Dynamic Leg Swings", description: "Hold wall, swing leg forward and back gently", duration: 30, emoji: "🦵", needsSideSwitch: true }
                ]
            },
            "hamstrings-10min": {
                name: "Hamstrings - 10 min",
                description: "Comprehensive hamstring flexibility routine",
                duration: "10 minutes",
                exercises: [
                    { name: "Standing Hamstring Stretch", description: "Stand with one foot forward, hinge at hips to stretch back leg", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Hamstring Stretch", description: "Sit with legs extended, reach forward to stretch hamstrings", duration: 90, emoji: "🪑" },
                    { name: "Wall Hamstring Stretch", description: "Lie on back, place leg against wall, straighten knee", duration: 90, emoji: "🧱", needsSideSwitch: true },
                    { name: "Dynamic Leg Swings", description: "Hold wall, swing leg forward and back gently", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Single Leg Deadlift", description: "Stand on one leg, hinge forward while extending other leg back", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Pigeon Pose Hamstring", description: "From pigeon pose, extend back leg and flex foot", duration: 60, emoji: "🕊️", needsSideSwitch: true },
                    { name: "Supine Hamstring Stretch", description: "Lie on back, use strap or towel to pull leg toward chest", duration: 90, emoji: "🛌", needsSideSwitch: true }
                ]
            },
            "hamstrings-15min": {
                name: "Hamstrings - 15 min",
                description: "Extended hamstring mobility and strength routine",
                duration: "15 minutes",
                exercises: [
                    { name: "Standing Hamstring Stretch", description: "Stand with one foot forward, hinge at hips to stretch back leg", duration: 75, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Hamstring Stretch", description: "Sit with legs extended, reach forward to stretch hamstrings", duration: 120, emoji: "🪑" },
                    { name: "Wall Hamstring Stretch", description: "Lie on back, place leg against wall, straighten knee", duration: 120, emoji: "🧱", needsSideSwitch: true },
                    { name: "Dynamic Leg Swings", description: "Hold wall, swing leg forward and back gently", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Single Leg Deadlift", description: "Stand on one leg, hinge forward while extending other leg back", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Pigeon Pose Hamstring", description: "From pigeon pose, extend back leg and flex foot", duration: 90, emoji: "🕊️", needsSideSwitch: true },
                    { name: "Supine Hamstring Stretch", description: "Lie on back, use strap or towel to pull leg toward chest", duration: 120, emoji: "🛌", needsSideSwitch: true },
                    { name: "Hamstring Curls", description: "Lie on stomach, bend knees to bring heels toward glutes", duration: 60, emoji: "🦵" },
                    { name: "Romanian Deadlift", description: "Stand with slight knee bend, hinge at hips while keeping back straight", duration: 90, emoji: "🦵" },
                    { name: "Glute-Ham Raises", description: "Kneel and slowly lower chest toward ground, then return up", duration: 60, emoji: "🦵" }
                ]
            }
        }
    },
    "feet-ankles": {
        name: "Feet & Ankles",
        icon: "🦶",
        description: "Foot and ankle mobility routines",
        routines: {
            "feet-ankles-4min": {
                name: "Feet & Ankles - 4 min",
                description: "Quick foot and ankle mobility",
                duration: "4 minutes",
                exercises: [
                    { name: "Ankle Circles", description: "Sit or stand, rotate ankles in circles both directions", duration: 30, emoji: "🔄", needsSideSwitch: true },
                    { name: "Toe Raises", description: "Stand and lift toes up, then lower them down", duration: 30, emoji: "🦶" },
                    { name: "Heel Raises", description: "Stand and lift heels up, then lower them down", duration: 30, emoji: "🦶" },
                    { name: "Ankle Alphabet", description: "Trace alphabet with your big toe in the air", duration: 45, emoji: "✍️", needsSideSwitch: true },
                    { name: "Calf Stretch", description: "Step one foot back, press heel down to stretch calf", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Toe Spreading", description: "Sit and spread toes apart, then bring them together", duration: 30, emoji: "🦶" }
                ]
            },
            "feet-ankles-8min": {
                name: "Feet & Ankles - 8 min",
                description: "Comprehensive foot and ankle routine",
                duration: "8 minutes",
                exercises: [
                    { name: "Ankle Circles", description: "Sit or stand, rotate ankles in circles both directions", duration: 45, emoji: "🔄", needsSideSwitch: true },
                    { name: "Toe Raises", description: "Stand and lift toes up, then lower them down", duration: 45, emoji: "🦶" },
                    { name: "Heel Raises", description: "Stand and lift heels up, then lower them down", duration: 45, emoji: "🦶" },
                    { name: "Ankle Alphabet", description: "Trace alphabet with your big toe in the air", duration: 60, emoji: "✍️", needsSideSwitch: true },
                    { name: "Calf Stretch", description: "Step one foot back, press heel down to stretch calf", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Toe Spreading", description: "Sit and spread toes apart, then bring them together", duration: 45, emoji: "🦶" },
                    { name: "Single Leg Balance", description: "Stand on one foot, maintain balance", duration: 45, emoji: "⚖️", needsSideSwitch: true },
                    { name: "Arch Strengthening", description: "Sit and lift arch of foot while keeping toes down", duration: 45, emoji: "🦶", needsSideSwitch: true },
                    { name: "Plantar Fascia Stretch", description: "Sit and pull toes back to stretch bottom of foot", duration: 60, emoji: "🦶", needsSideSwitch: true }
                ]
            },
            "feet-ankles-12min": {
                name: "Feet & Ankles - 12 min",
                description: "Extended foot and ankle therapy routine",
                duration: "12 minutes",
                exercises: [
                    { name: "Ankle Circles", description: "Sit or stand, rotate ankles in circles both directions", duration: 60, emoji: "🔄", needsSideSwitch: true },
                    { name: "Toe Raises", description: "Stand and lift toes up, then lower them down", duration: 60, emoji: "🦶" },
                    { name: "Heel Raises", description: "Stand and lift heels up, then lower them down", duration: 60, emoji: "🦶" },
                    { name: "Ankle Alphabet", description: "Trace alphabet with your big toe in the air", duration: 90, emoji: "✍️", needsSideSwitch: true },
                    { name: "Calf Stretch", description: "Step one foot back, press heel down to stretch calf", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Toe Spreading", description: "Sit and spread toes apart, then bring them together", duration: 60, emoji: "🦶" },
                    { name: "Single Leg Balance", description: "Stand on one foot, maintain balance", duration: 60, emoji: "⚖️", needsSideSwitch: true },
                    { name: "Arch Strengthening", description: "Sit and lift arch of foot while keeping toes down", duration: 60, emoji: "🦶", needsSideSwitch: true },
                    { name: "Plantar Fascia Stretch", description: "Sit and pull toes back to stretch bottom of foot", duration: 90, emoji: "🦶", needsSideSwitch: true },
                    { name: "Towel Scrunches", description: "Sit and use toes to scrunch up a towel", duration: 60, emoji: "🦶", needsSideSwitch: true },
                    { name: "Marble Pickup", description: "Use toes to pick up marbles and place in container", duration: 60, emoji: "🦶", needsSideSwitch: true },
                    { name: "Ankle Eversion/Inversion", description: "Turn foot inward and outward to strengthen ankle", duration: 60, emoji: "🦶", needsSideSwitch: true }
                ]
            }
        }
    },
    "core": {
        name: "Core",
        icon: "💪",
        description: "Core strength and stability routines",
        routines: {
            "core-5min": {
                name: "Core - 5 min",
                description: "Quick core activation routine",
                duration: "5 minutes",
                exercises: [
                    { name: "Plank", description: "Hold plank position, keeping body straight", duration: 45, emoji: "📏" },
                    { name: "Dead Bug", description: "Lie on back, extend opposite arm and leg", duration: 60, emoji: "🐛", needsSideSwitch: true },
                    { name: "Bird Dog", description: "On hands and knees, extend opposite arm and leg", duration: 60, emoji: "🐕", needsSideSwitch: true },
                    { name: "Glute Bridge", description: "Lie on back, lift hips up and down", duration: 45, emoji: "🌉" },
                    { name: "Side Plank", description: "Hold side plank position", duration: 30, emoji: "📏", needsSideSwitch: true }
                ]
            },
            "core-10min": {
                name: "Core - 10 min",
                description: "Comprehensive core strength routine",
                duration: "10 minutes",
                exercises: [
                    { name: "Plank", description: "Hold plank position, keeping body straight", duration: 60, emoji: "📏" },
                    { name: "Dead Bug", description: "Lie on back, extend opposite arm and leg", duration: 90, emoji: "🐛", needsSideSwitch: true },
                    { name: "Bird Dog", description: "On hands and knees, extend opposite arm and leg", duration: 90, emoji: "🐕", needsSideSwitch: true },
                    { name: "Glute Bridge", description: "Lie on back, lift hips up and down", duration: 60, emoji: "🌉" },
                    { name: "Side Plank", description: "Hold side plank position", duration: 45, emoji: "📏", needsSideSwitch: true },
                    { name: "Russian Twists", description: "Sit and rotate torso side to side", duration: 60, emoji: "🔄" },
                    { name: "Mountain Climbers", description: "In plank, alternate bringing knees to chest", duration: 60, emoji: "🏔️" },
                    { name: "Bicycle Crunches", description: "Lie on back, bring opposite elbow to knee", duration: 60, emoji: "🚴" }
                ]
            },
            "core-15min": {
                name: "Core - 15 min",
                description: "Extended core strength and stability routine",
                duration: "15 minutes",
                exercises: [
                    { name: "Plank", description: "Hold plank position, keeping body straight", duration: 90, emoji: "📏" },
                    { name: "Dead Bug", description: "Lie on back, extend opposite arm and leg", duration: 120, emoji: "🐛", needsSideSwitch: true },
                    { name: "Bird Dog", description: "On hands and knees, extend opposite arm and leg", duration: 120, emoji: "🐕", needsSideSwitch: true },
                    { name: "Glute Bridge", description: "Lie on back, lift hips up and down", duration: 90, emoji: "🌉" },
                    { name: "Side Plank", description: "Hold side plank position", duration: 60, emoji: "📏", needsSideSwitch: true },
                    { name: "Russian Twists", description: "Sit and rotate torso side to side", duration: 90, emoji: "🔄" },
                    { name: "Mountain Climbers", description: "In plank, alternate bringing knees to chest", duration: 90, emoji: "🏔️" },
                    { name: "Bicycle Crunches", description: "Lie on back, bring opposite elbow to knee", duration: 90, emoji: "🚴" },
                    { name: "Hollow Body Hold", description: "Lie on back, lift shoulders and legs off ground", duration: 60, emoji: "🛌" },
                    { name: "Superman", description: "Lie on stomach, lift chest and legs simultaneously", duration: 60, emoji: "🦸" },
                    { name: "Pallof Press", description: "Stand with resistance, press arms out and pull back", duration: 60, emoji: "💪" }
                ]
            }
        }
    },
    "upper-body": {
        name: "Upper Body",
        icon: "🏋️",
        description: "Upper body mobility and strength routines",
        routines: {
            "upper-body-4min": {
                name: "Upper Body - 4 min",
                description: "Quick upper body mobility",
                duration: "4 minutes",
                exercises: [
                    { name: "Arm Circles", description: "Make circles with your arms, forward and backward", duration: 30, emoji: "⭕" },
                    { name: "Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 30, emoji: "🤷" },
                    { name: "Cross-Body Shoulder Stretch", description: "Pull arm across chest, feel stretch in shoulder", duration: 45, emoji: "🤲", needsSideSwitch: true },
                    { name: "Wall Slides", description: "Stand against wall, slide arms up and down", duration: 45, emoji: "🧱" },
                    { name: "Push-ups", description: "Perform push-ups with proper form", duration: 60, emoji: "💪" },
                    { name: "Tricep Dips", description: "Sit on edge of chair, lower and raise body", duration: 45, emoji: "💪" }
                ]
            },
            "upper-body-8min": {
                name: "Upper Body - 8 min",
                description: "Comprehensive upper body routine",
                duration: "8 minutes",
                exercises: [
                    { name: "Arm Circles", description: "Make circles with your arms, forward and backward", duration: 45, emoji: "⭕" },
                    { name: "Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 45, emoji: "🤷" },
                    { name: "Cross-Body Shoulder Stretch", description: "Pull arm across chest, feel stretch in shoulder", duration: 60, emoji: "🤲", needsSideSwitch: true },
                    { name: "Wall Slides", description: "Stand against wall, slide arms up and down", duration: 60, emoji: "🧱" },
                    { name: "Push-ups", description: "Perform push-ups with proper form", duration: 90, emoji: "💪" },
                    { name: "Tricep Dips", description: "Sit on edge of chair, lower and raise body", duration: 60, emoji: "💪" },
                    { name: "Pike Push-ups", description: "Handstand position against wall, lower head to ground", duration: 60, emoji: "🦘" },
                    { name: "Pull-ups/Chin-ups", description: "Hang from bar, pull body up", duration: 60, emoji: "🆙" },
                    { name: "Lateral Raises", description: "Hold weights, raise arms to sides", duration: 60, emoji: "✋" }
                ]
            },
            "upper-body-12min": {
                name: "Upper Body - 12 min",
                description: "Extended upper body strength routine",
                duration: "12 minutes",
                exercises: [
                    { name: "Arm Circles", description: "Make circles with your arms, forward and backward", duration: 60, emoji: "⭕" },
                    { name: "Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 60, emoji: "🤷" },
                    { name: "Cross-Body Shoulder Stretch", description: "Pull arm across chest, feel stretch in shoulder", duration: 90, emoji: "🤲", needsSideSwitch: true },
                    { name: "Wall Slides", description: "Stand against wall, slide arms up and down", duration: 90, emoji: "🧱" },
                    { name: "Push-ups", description: "Perform push-ups with proper form", duration: 120, emoji: "💪" },
                    { name: "Tricep Dips", description: "Sit on edge of chair, lower and raise body", duration: 90, emoji: "💪" },
                    { name: "Pike Push-ups", description: "Handstand position against wall, lower head to ground", duration: 90, emoji: "🦘" },
                    { name: "Pull-ups/Chin-ups", description: "Hang from bar, pull body up", duration: 90, emoji: "🆙" },
                    { name: "Lateral Raises", description: "Hold weights, raise arms to sides", duration: 90, emoji: "✋" },
                    { name: "Bent-Over Rows", description: "Hinge at hips, pull weights to chest", duration: 90, emoji: "🚣" },
                    { name: "Overhead Press", description: "Press weights overhead from shoulders", duration: 90, emoji: "⬆️" },
                    { name: "Bicep Curls", description: "Curl weights up to shoulders", duration: 90, emoji: "💪" }
                ]
            }
        }
    },
    "lower-body": {
        name: "Lower Body",
        icon: "🦿",
        description: "Lower body mobility and strength routines",
        routines: {
            "lower-body-5min": {
                name: "Lower Body - 5 min",
                description: "Quick lower body activation",
                duration: "5 minutes",
                exercises: [
                    { name: "Squats", description: "Stand with feet shoulder-width apart, lower down and up", duration: 60, emoji: "🦵" },
                    { name: "Lunges", description: "Step forward into lunge position, alternate legs", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Calf Raises", description: "Stand and lift heels up, then lower them down", duration: 45, emoji: "🦶" },
                    { name: "Glute Bridges", description: "Lie on back, lift hips up and down", duration: 45, emoji: "🌉" },
                    { name: "Leg Swings", description: "Hold wall, swing leg forward and back", duration: 30, emoji: "🦵", needsSideSwitch: true }
                ]
            },
            "lower-body-10min": {
                name: "Lower Body - 10 min",
                description: "Comprehensive lower body routine",
                duration: "10 minutes",
                exercises: [
                    { name: "Squats", description: "Stand with feet shoulder-width apart, lower down and up", duration: 90, emoji: "🦵" },
                    { name: "Lunges", description: "Step forward into lunge position, alternate legs", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Calf Raises", description: "Stand and lift heels up, then lower them down", duration: 60, emoji: "🦶" },
                    { name: "Glute Bridges", description: "Lie on back, lift hips up and down", duration: 60, emoji: "🌉" },
                    { name: "Leg Swings", description: "Hold wall, swing leg forward and back", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Single Leg Deadlifts", description: "Stand on one leg, hinge forward while extending other leg back", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Wall Sits", description: "Sit against wall with knees at 90 degrees", duration: 60, emoji: "🪑" },
                    { name: "Step-ups", description: "Step up onto platform, alternate legs", duration: 90, emoji: "🪜", needsSideSwitch: true },
                    { name: "Hip Thrusts", description: "Lie on back, lift hips up with shoulders on ground", duration: 60, emoji: "🌉" }
                ]
            },
            "lower-body-15min": {
                name: "Lower Body - 15 min",
                description: "Extended lower body strength routine",
                duration: "15 minutes",
                exercises: [
                    { name: "Squats", description: "Stand with feet shoulder-width apart, lower down and up", duration: 120, emoji: "🦵" },
                    { name: "Lunges", description: "Step forward into lunge position, alternate legs", duration: 120, emoji: "🦵", needsSideSwitch: true },
                    { name: "Calf Raises", description: "Stand and lift heels up, then lower them down", duration: 90, emoji: "🦶" },
                    { name: "Glute Bridges", description: "Lie on back, lift hips up and down", duration: 90, emoji: "🌉" },
                    { name: "Leg Swings", description: "Hold wall, swing leg forward and back", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Single Leg Deadlifts", description: "Stand on one leg, hinge forward while extending other leg back", duration: 120, emoji: "🦵", needsSideSwitch: true },
                    { name: "Wall Sits", description: "Sit against wall with knees at 90 degrees", duration: 90, emoji: "🪑" },
                    { name: "Step-ups", description: "Step up onto platform, alternate legs", duration: 120, emoji: "🪜", needsSideSwitch: true },
                    { name: "Hip Thrusts", description: "Lie on back, lift hips up with shoulders on ground", duration: 90, emoji: "🌉" },
                    { name: "Bulgarian Split Squats", description: "Back foot on elevated surface, lunge down and up", duration: 120, emoji: "🦵", needsSideSwitch: true },
                    { name: "Romanian Deadlifts", description: "Stand with slight knee bend, hinge at hips", duration: 90, emoji: "🦵" },
                    { name: "Jump Squats", description: "Squat down and jump up explosively", duration: 60, emoji: "🦘" }
                ]
            }
        }
    },
    "seated": {
        name: "Seated",
        icon: "🪑",
        description: "Seated exercises for office or limited mobility",
        routines: {
            "seated-4min": {
                name: "Seated - 4 min",
                description: "Quick seated mobility routine",
                duration: "4 minutes",
                exercises: [
                    { name: "Seated Neck Rolls", description: "Sit tall, slowly roll head in circles", duration: 30, emoji: "🔄" },
                    { name: "Seated Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 30, emoji: "🤷" },
                    { name: "Seated Spinal Twist", description: "Sit tall, rotate torso to one side, hold", duration: 45, emoji: "🔄", needsSideSwitch: true },
                    { name: "Seated Hip Circles", description: "Sit and make circles with your knees", duration: 30, emoji: "🔄" },
                    { name: "Seated Ankle Circles", description: "Rotate ankles in circles both directions", duration: 30, emoji: "🔄", needsSideSwitch: true },
                    { name: "Seated Calf Raises", description: "Lift heels up and down while seated", duration: 30, emoji: "🦶" }
                ]
            },
            "seated-8min": {
                name: "Seated - 8 min",
                description: "Comprehensive seated routine",
                duration: "8 minutes",
                exercises: [
                    { name: "Seated Neck Rolls", description: "Sit tall, slowly roll head in circles", duration: 45, emoji: "🔄" },
                    { name: "Seated Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 45, emoji: "🤷" },
                    { name: "Seated Spinal Twist", description: "Sit tall, rotate torso to one side, hold", duration: 60, emoji: "🔄", needsSideSwitch: true },
                    { name: "Seated Hip Circles", description: "Sit and make circles with your knees", duration: 45, emoji: "🔄" },
                    { name: "Seated Ankle Circles", description: "Rotate ankles in circles both directions", duration: 45, emoji: "🔄", needsSideSwitch: true },
                    { name: "Seated Calf Raises", description: "Lift heels up and down while seated", duration: 45, emoji: "🦶" },
                    { name: "Seated Leg Extensions", description: "Sit tall, extend one leg out and hold", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Arm Circles", description: "Make circles with your arms while seated", duration: 45, emoji: "⭕" },
                    { name: "Seated Forward Fold", description: "Sit tall, hinge forward at hips", duration: 60, emoji: "⬇️" }
                ]
            },
            "seated-12min": {
                name: "Seated - 12 min",
                description: "Extended seated therapy routine",
                duration: "12 minutes",
                exercises: [
                    { name: "Seated Neck Rolls", description: "Sit tall, slowly roll head in circles", duration: 60, emoji: "🔄" },
                    { name: "Seated Shoulder Shrugs", description: "Lift shoulders up toward ears, hold and relax", duration: 60, emoji: "🤷" },
                    { name: "Seated Spinal Twist", description: "Sit tall, rotate torso to one side, hold", duration: 90, emoji: "🔄", needsSideSwitch: true },
                    { name: "Seated Hip Circles", description: "Sit and make circles with your knees", duration: 60, emoji: "🔄" },
                    { name: "Seated Ankle Circles", description: "Rotate ankles in circles both directions", duration: 60, emoji: "🔄", needsSideSwitch: true },
                    { name: "Seated Calf Raises", description: "Lift heels up and down while seated", duration: 60, emoji: "🦶" },
                    { name: "Seated Leg Extensions", description: "Sit tall, extend one leg out and hold", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Arm Circles", description: "Make circles with your arms while seated", duration: 60, emoji: "⭕" },
                    { name: "Seated Forward Fold", description: "Sit tall, hinge forward at hips", duration: 90, emoji: "⬇️" },
                    { name: "Seated Side Stretch", description: "Sit tall, reach one arm overhead and lean to side", duration: 60, emoji: "↔️", needsSideSwitch: true },
                    { name: "Seated Knee to Chest", description: "Sit tall, pull one knee to chest", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Seated Deep Breathing", description: "Sit tall, take 5 deep breaths", duration: 60, emoji: "🫁" }
                ]
            }
        }
    },
    "posture": {
        name: "Posture",
        icon: "📏",
        description: "Posture correction and alignment routines",
        routines: {
            "posture-4min": {
                name: "Posture - 4 min",
                description: "Quick posture correction routine",
                duration: "4 minutes",
                exercises: [
                    { name: "Wall Angels", description: "Stand against wall, slide arms up and down", duration: 60, emoji: "👼" },
                    { name: "Chin Tucks", description: "Gently pull head back, creating double chin", duration: 30, emoji: "↩️" },
                    { name: "Shoulder Blade Squeezes", description: "Squeeze shoulder blades together and release", duration: 45, emoji: "🤲" },
                    { name: "Chest Opener", description: "Clasp hands behind back, lift arms up", duration: 45, emoji: "🫁" },
                    { name: "Hip Flexor Stretch", description: "Step forward into lunge, feel stretch in front hip", duration: 45, emoji: "🦵", needsSideSwitch: true },
                    { name: "Posture Check", description: "Stand tall, align ears over shoulders over hips", duration: 30, emoji: "📏" }
                ]
            },
            "posture-8min": {
                name: "Posture - 8 min",
                description: "Comprehensive posture correction routine",
                duration: "8 minutes",
                exercises: [
                    { name: "Wall Angels", description: "Stand against wall, slide arms up and down", duration: 90, emoji: "👼" },
                    { name: "Chin Tucks", description: "Gently pull head back, creating double chin", duration: 45, emoji: "↩️" },
                    { name: "Shoulder Blade Squeezes", description: "Squeeze shoulder blades together and release", duration: 60, emoji: "🤲" },
                    { name: "Chest Opener", description: "Clasp hands behind back, lift arms up", duration: 60, emoji: "🫁" },
                    { name: "Hip Flexor Stretch", description: "Step forward into lunge, feel stretch in front hip", duration: 60, emoji: "🦵", needsSideSwitch: true },
                    { name: "Posture Check", description: "Stand tall, align ears over shoulders over hips", duration: 45, emoji: "📏" },
                    { name: "Cat-Cow Stretch", description: "On hands and knees, arch and round back", duration: 60, emoji: "🐱" },
                    { name: "Thoracic Extension", description: "Place hands behind head, extend upper back", duration: 60, emoji: "⬆️" },
                    { name: "Glute Bridges", description: "Lie on back, lift hips up and down", duration: 60, emoji: "🌉" }
                ]
            },
            "posture-12min": {
                name: "Posture - 12 min",
                description: "Extended posture therapy routine",
                duration: "12 minutes",
                exercises: [
                    { name: "Wall Angels", description: "Stand against wall, slide arms up and down", duration: 120, emoji: "👼" },
                    { name: "Chin Tucks", description: "Gently pull head back, creating double chin", duration: 60, emoji: "↩️" },
                    { name: "Shoulder Blade Squeezes", description: "Squeeze shoulder blades together and release", duration: 90, emoji: "🤲" },
                    { name: "Chest Opener", description: "Clasp hands behind back, lift arms up", duration: 90, emoji: "🫁" },
                    { name: "Hip Flexor Stretch", description: "Step forward into lunge, feel stretch in front hip", duration: 90, emoji: "🦵", needsSideSwitch: true },
                    { name: "Posture Check", description: "Stand tall, align ears over shoulders over hips", duration: 60, emoji: "📏" },
                    { name: "Cat-Cow Stretch", description: "On hands and knees, arch and round back", duration: 90, emoji: "🐱" },
                    { name: "Thoracic Extension", description: "Place hands behind head, extend upper back", duration: 90, emoji: "⬆️" },
                    { name: "Glute Bridges", description: "Lie on back, lift hips up and down", duration: 90, emoji: "🌉" },
                    { name: "Plank", description: "Hold plank position, keeping body straight", duration: 60, emoji: "📏" },
                    { name: "Dead Bug", description: "Lie on back, extend opposite arm and leg", duration: 90, emoji: "🐛", needsSideSwitch: true },
                    { name: "Posture Awareness", description: "Stand tall, focus on maintaining good posture", duration: 60, emoji: "🧘" }
                ]
            }
        }
    },
    "chest": {
        name: "Chest",
        icon: "🫀",
        description: "Chest opening and flexibility routines",
        routines: {
            "chest-4min": {
                name: "Chest - 4 min",
                description: "Quick chest opening routine",
                duration: "4 minutes",
                exercises: [
                    { name: "Chest Opener", description: "Clasp hands behind back, lift arms up", duration: 60, emoji: "🫁" },
                    { name: "Doorway Chest Stretch", description: "Place forearm against doorway, lean forward", duration: 60, emoji: "🚪", needsSideSwitch: true },
                    { name: "Wall Chest Stretch", description: "Place hand on wall, turn body away", duration: 60, emoji: "🧱", needsSideSwitch: true },
                    { name: "Chest Expansion", description: "Interlace fingers behind back, lift arms up", duration: 45, emoji: "🫁" },
                    { name: "Pec Stretch", description: "Lie on side, extend top arm back", duration: 45, emoji: "🫁", needsSideSwitch: true }
                ]
            },
            "chest-8min": {
                name: "Chest - 8 min",
                description: "Comprehensive chest flexibility routine",
                duration: "8 minutes",
                exercises: [
                    { name: "Chest Opener", description: "Clasp hands behind back, lift arms up", duration: 90, emoji: "🫁" },
                    { name: "Doorway Chest Stretch", description: "Place forearm against doorway, lean forward", duration: 90, emoji: "🚪", needsSideSwitch: true },
                    { name: "Wall Chest Stretch", description: "Place hand on wall, turn body away", duration: 90, emoji: "🧱", needsSideSwitch: true },
                    { name: "Chest Expansion", description: "Interlace fingers behind back, lift arms up", duration: 60, emoji: "🫁" },
                    { name: "Pec Stretch", description: "Lie on side, extend top arm back", duration: 60, emoji: "🫁", needsSideSwitch: true },
                    { name: "Chest Fly Stretch", description: "Lie on back, extend arms to sides", duration: 90, emoji: "🦋" },
                    { name: "Reverse Fly", description: "Bend forward, lift arms out to sides", duration: 60, emoji: "🦋" },
                    { name: "Chest Massage", description: "Use tennis ball to massage chest muscles", duration: 90, emoji: "🎾" }
                ]
            },
            "chest-12min": {
                name: "Chest - 12 min",
                description: "Extended chest therapy routine",
                duration: "12 minutes",
                exercises: [
                    { name: "Chest Opener", description: "Clasp hands behind back, lift arms up", duration: 120, emoji: "🫁" },
                    { name: "Doorway Chest Stretch", description: "Place forearm against doorway, lean forward", duration: 120, emoji: "🚪", needsSideSwitch: true },
                    { name: "Wall Chest Stretch", description: "Place hand on wall, turn body away", duration: 120, emoji: "🧱", needsSideSwitch: true },
                    { name: "Chest Expansion", description: "Interlace fingers behind back, lift arms up", duration: 90, emoji: "🫁" },
                    { name: "Pec Stretch", description: "Lie on side, extend top arm back", duration: 90, emoji: "🫁", needsSideSwitch: true },
                    { name: "Chest Fly Stretch", description: "Lie on back, extend arms to sides", duration: 120, emoji: "🦋" },
                    { name: "Reverse Fly", description: "Bend forward, lift arms out to sides", duration: 90, emoji: "🦋" },
                    { name: "Chest Massage", description: "Use tennis ball to massage chest muscles", duration: 120, emoji: "🎾" },
                    { name: "Chest Breathing", description: "Place hands on chest, breathe deeply", duration: 90, emoji: "🫁" },
                    { name: "Chest Compression", description: "Hug yourself, apply gentle pressure", duration: 60, emoji: "🤗" },
                    { name: "Chest Mobility", description: "Make circles with arms, focus on chest movement", duration: 90, emoji: "🔄" }
                ]
            }
        }
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
let autoStartTimerEnabled = true;
let currentSide = 'left'; // 'left' or 'right'
let currentView = 'main'; // 'main' or 'folder'
let currentFolder = null;
let sideSwitchMessageTimer = null;
let audioContext = null;
let circularTimerAnimation = null;

// Initialize the app with graceful error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        setupEventListeners();
        initializeDarkMode();
        initializeAudio();
        setupAccessibility();
        
        // Show language selector on initial load (routine selection is default active)
        document.body.classList.add('routine-selection-active');
        
        console.log('✅ Tend app initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing Tend app:', error);
        // Graceful fallback - show a simple message instead of crashing
        showGracefulError('App initialization failed. Please refresh the page.');
    }
});

// Graceful error display function
function showGracefulError(message) {
    try {
        // Create a simple error overlay
        const errorOverlay = document.createElement('div');
        errorOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        `;
        
        errorOverlay.innerHTML = `
            <div style="background: #e74c3c; padding: 30px; border-radius: 10px; max-width: 400px;">
                <h2 style="margin: 0 0 15px 0;">⚠️ Something went wrong</h2>
                <p style="margin: 0 0 20px 0;">${message}</p>
                <button onclick="location.reload()" style="
                    background: #2ecc71;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">Refresh Page</button>
            </div>
        `;
        
        document.body.appendChild(errorOverlay);
    } catch (fallbackError) {
        // If even the error display fails, just log it
        console.error('Failed to show error message:', fallbackError);
    }
}

function setupEventListeners() {
    try {
        // Folder selection
        const folderBtns = document.querySelectorAll('.folder-btn');
        folderBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                try {
                    const folder = this.getAttribute('data-folder');
                    showFolderView(folder);
                } catch (error) {
                    console.error('Error in folder selection:', error);
                    showGracefulError('Failed to load folder. Please try again.');
                }
            });
        });

        // Back to main view
        const backBtn = document.getElementById('back-to-main');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                try {
                    showMainView();
                } catch (error) {
                    console.error('Error returning to main view:', error);
                    showGracefulError('Failed to return to main view. Please refresh the page.');
                }
            });
        }

        // Routine category selection
        const routineCategoryBtns = document.querySelectorAll('.routine-category-btn');
        routineCategoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                try {
                    const routine = this.getAttribute('data-routine');
                    selectRoutine(routine);
                } catch (error) {
                    console.error('Error in routine selection:', error);
                    showGracefulError('Failed to load routine. Please try again.');
                }
            });
        });

        // Timer controls
        const startPauseBtn = document.getElementById('start-pause-btn');
        if (startPauseBtn) {
            startPauseBtn.addEventListener('click', function() {
                try {
                    // Initialize audio context on first user interaction
                    if (audioContext && audioContext.state === 'suspended') {
                        audioContext.resume();
                    }
                    toggleTimer();
                } catch (error) {
                    console.error('Error in timer control:', error);
                    showGracefulError('Failed to control timer. Please try again.');
                }
            });
        }
        
        // Navigation controls
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                try {
                    previousExercise();
                } catch (error) {
                    console.error('Error in previous exercise:', error);
                    showGracefulError('Failed to go to previous exercise. Please try again.');
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                try {
                    nextExercise();
                } catch (error) {
                    console.error('Error in next exercise:', error);
                    showGracefulError('Failed to go to next exercise. Please try again.');
                }
            });
        }
        
        // Share button
        const shareButton = document.getElementById('share-button');
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                try {
                    shareApp();
                } catch (error) {
                    console.error('Error in share functionality:', error);
                    showGracefulError('Failed to share app. Please try again.');
                }
            });
        }

        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                try {
                    toggleDarkMode();
                } catch (error) {
                    console.error('Error in dark mode toggle:', error);
                    showGracefulError('Failed to toggle dark mode. Please try again.');
                }
            });
        }
    } catch (error) {
        console.error('Error setting up event listeners:', error);
        showGracefulError('Failed to set up app controls. Please refresh the page.');
    }
}

function selectRoutine(routine, folderKey = null) {
    try {
        currentRoutine = routine;
        
        // Check if it's a folder routine or regular routine
        if (folderKey && bodyAreaFolders[folderKey] && bodyAreaFolders[folderKey].routines[routine]) {
            currentExercises = bodyAreaFolders[folderKey].routines[routine].exercises;
        } else if (bendRoutines[routine]) {
            currentExercises = bendRoutines[routine].exercises;
        } else {
            console.error('Routine not found:', routine);
            showGracefulError('Routine not found. Please try selecting a different routine.');
            return;
        }
        
        currentExerciseIndex = 0;
        routineStartTime = Date.now();
        showExerciseDisplay();
        displayCurrentExercise();
    } catch (error) {
        console.error('Error selecting routine:', error);
        showGracefulError('Failed to load routine. Please try again.');
    }
}

// Stop all timers and cleanup exercise state
function stopAllTimers() {
    // Stop main timer
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    // Stop side switch message timer
    if (sideSwitchMessageTimer) {
        clearTimeout(sideSwitchMessageTimer);
        sideSwitchMessageTimer = null;
    }
    
    // Stop circular timer animation
    if (circularTimerAnimation) {
        cancelAnimationFrame(circularTimerAnimation);
        circularTimerAnimation = null;
    }
    
    // Reset timer state
    isTimerRunning = false;
    
    // Remove side switch message if it exists
    const sideSwitchMessage = document.getElementById('side-switch-message');
    if (sideSwitchMessage) {
        sideSwitchMessage.remove();
    }
    
    // Reset play/pause button
    const playPauseIcon = document.getElementById('play-pause-icon');
    if (playPauseIcon) {
        playPauseIcon.textContent = '▶';
    }
}

function showRoutineSelection() {
    // Stop all timers and cleanup before showing routine selection
    stopAllTimers();
    
    document.getElementById('routine-selection').classList.add('active');
    document.getElementById('folder-view').classList.remove('active');
    document.getElementById('exercise-display').classList.remove('active');
    document.getElementById('completion-screen').classList.remove('active');
    currentView = 'main';
    
    // Show language selector on routine selection screen
    document.body.classList.add('routine-selection-active');
}

function showFolderView(folderKey) {
    currentFolder = folderKey;
    currentView = 'folder';
    
    const folder = bodyAreaFolders[folderKey];
    if (!folder) return;
    
    // Update folder title
    document.getElementById('folder-title').textContent = folder.name;
    
    // Populate folder routines
    const folderRoutinesContainer = document.getElementById('folder-routines');
    folderRoutinesContainer.innerHTML = '';
    
    Object.keys(folder.routines).forEach(routineKey => {
        const routine = folder.routines[routineKey];
        const routineBtn = document.createElement('button');
        routineBtn.className = 'routine-category-btn';
        routineBtn.setAttribute('data-routine', routineKey);
        routineBtn.innerHTML = `
            <div class="icon">${getRoutineIcon(routineKey)}</div>
            <span>${routine.name}</span>
            <p>${routine.description}</p>
        `;
        
        routineBtn.addEventListener('click', function() {
            selectRoutine(routineKey, folderKey);
        });
        
        folderRoutinesContainer.appendChild(routineBtn);
    });
    
    // Show folder view
    document.getElementById('routine-selection').classList.remove('active');
    document.getElementById('folder-view').classList.add('active');
    document.getElementById('exercise-display').classList.remove('active');
    document.getElementById('completion-screen').classList.remove('active');
    
    // Hide language selector on folder view
    document.body.classList.remove('routine-selection-active');
}

function showMainView() {
    showRoutineSelection();
}

function showExerciseDisplay() {
    document.getElementById('routine-selection').classList.remove('active');
    document.getElementById('folder-view').classList.remove('active');
    document.getElementById('exercise-display').classList.add('active');
    document.getElementById('completion-screen').classList.remove('active');
    
    // Hide language selector on exercise display
    document.body.classList.remove('routine-selection-active');
}

function getRoutineIcon(routineKey) {
    const iconMap = {
        'hips-5min': '🦴',
        'hips-10min': '🦴',
        'hips-15min': '🦴',
        'hips-20min': '🦴',
        'shoulders-4min': '🤲',
        'shoulders-8min': '🤲',
        'shoulders-12min': '🤲',
        'shoulders-16min': '🤲',
        'lower-back-5min': '🫁',
        'lower-back-10min': '🫁',
        'lower-back-15min': '🫁',
        'lower-back-20min': '🫁'
    };
    return iconMap[routineKey] || '💪';
}

function showCompletionScreen() {
    document.getElementById('routine-selection').classList.remove('active');
    document.getElementById('exercise-display').classList.remove('active');
    document.getElementById('completion-screen').classList.add('active');
    
    // Hide language selector on completion screen
    document.body.classList.remove('routine-selection-active');
    
    // Calculate total time
    totalRoutineTime = Math.floor((Date.now() - routineStartTime) / 1000 / 60);
    
    // Update completion screen
    const routineData = bendRoutines[currentRoutine];
    document.getElementById('completion-message').textContent = `You've completed the ${routineData.name} routine!`;
    document.getElementById('total-time').textContent = totalRoutineTime;
    document.getElementById('total-exercises-completed').textContent = currentExercises.length;
}

// Get translated exercise data
function getTranslatedExercise(exercise) {
    if (!window.i18n) {
        return exercise; // Fallback to original if i18n not available
    }
    
    const currentLang = window.i18n.currentLang;
    
    // Convert exercise name to match i18n key format
    // "Neck Rolls" -> "neckrolls", "Shoulder Shrugs" -> "shouldershrugs", etc.
    const exerciseKey = exercise.name.toLowerCase().replace(/\s+/g, '');
    
    // Try to get translation from i18n system
    const translatedName = window.i18n.t(`exercises.${exerciseKey}.name`, {}, exercise.name);
    const translatedDescription = window.i18n.t(`exercises.${exerciseKey}.description`, {}, exercise.description);
    
    // Always return translated data if available, even if it's the same as original
    // This ensures the translation system is working
    return {
        ...exercise,
        name: translatedName,
        description: translatedDescription
    };
}

function displayCurrentExercise() {
    const exercise = currentExercises[currentExerciseIndex];
    const totalExercises = currentExercises.length;
    
    // Get translated exercise data
    const translatedExercise = getTranslatedExercise(exercise);
    
    // Reset side to left for new exercises
    currentSide = 'left';
    
    // Update progress
    document.getElementById('current-exercise').textContent = currentExerciseIndex + 1;
    document.getElementById('total-exercises').textContent = totalExercises;
    
    // Update exercise info with translated data
    document.getElementById('exercise-name').textContent = translatedExercise.name;
    document.getElementById('exercise-description').textContent = translatedExercise.description;
    document.getElementById('exercise-emoji').textContent = translatedExercise.emoji;
    
    // Reset timer
    timeRemaining = exercise.duration;
    updateTimerDisplay();
    
    // Reset circular timer
    resetCircularTimer();
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentExerciseIndex === 0;
    document.getElementById('next-btn').disabled = currentExerciseIndex === totalExercises - 1;
    
    // Reset timer button
    document.getElementById('play-pause-icon').textContent = '▶';
    isTimerRunning = false;
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    // Auto-start timer if enabled and we're actually in the exercise display view
    if (autoStartTimerEnabled && document.getElementById('exercise-display').classList.contains('active')) {
        setTimeout(() => {
            startTimer();
        }, 500); // Small delay to let the UI update
    }
}

function toggleTimer() {
    // Safety check: only allow timer toggle if we're in the exercise display view
    if (!document.getElementById('exercise-display').classList.contains('active')) {
        return;
    }
    
    if (isTimerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    // Safety check: only start timer if we're in the exercise display view
    if (!document.getElementById('exercise-display').classList.contains('active')) {
        return;
    }
    
    isTimerRunning = true;
    document.getElementById('play-pause-icon').textContent = '⏸';
    
    // Start continuous circular animation
    startCircularTimerAnimation();
    
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        // Play countdown beeps for last 3 seconds
        if (timeRemaining <= 3 && timeRemaining > 0) {
            playCountdownBeep();
        }
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            timer = null;
            isTimerRunning = false;
            document.getElementById('play-pause-icon').textContent = '▶';
            
            // Play timer end beep
            playTimerEndBeep();
            
            // Announce to screen readers
            announceToScreenReader('Exercise complete');
            
            // Check if current exercise needs side switching
            const currentExercise = currentExercises[currentExerciseIndex];
            if (currentExercise.needsSideSwitch && currentSide === 'left') {
                // Switch to right side
                currentSide = 'right';
                showSideSwitchMessage();
                // Reset timer for the other side
                timeRemaining = currentExercise.duration;
                updateTimerDisplay();
                // Announce side switch to screen readers
                announceToScreenReader('Switch sides');
                // Automatically restart the timer for the other side
                setTimeout(() => {
                    startTimer();
                }, 3000); // Wait for the side switch message to finish
                return;
            }
            
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
    document.getElementById('play-pause-icon').textContent = '▶';
    
    // Stop continuous circular animation
    stopCircularTimerAnimation();
    
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

function updateCircularTimer() {
    const exercise = currentExercises[currentExerciseIndex];
    if (!exercise) return;
    
    const totalDuration = exercise.duration;
    const progress = Math.max(0, (totalDuration - timeRemaining) / totalDuration);
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (progress * circumference);
    
    const progressCircle = document.querySelector('.timer-ring-progress');
    if (progressCircle) {
        // Set the target position without transition for immediate update
        progressCircle.style.strokeDashoffset = strokeDashoffset;
    }
}

function resetCircularTimer() {
    const progressCircle = document.querySelector('.timer-ring-progress');
    if (progressCircle) {
        const circumference = 2 * Math.PI * 45; // radius = 45
        // Reset with smooth transition
        progressCircle.style.strokeDashoffset = circumference;
    }
}

function startCircularTimerAnimation() {
    const exercise = currentExercises[currentExerciseIndex];
    if (!exercise) return;
    
    const totalDuration = exercise.duration;
    const startTime = Date.now();
    const progressCircle = document.querySelector('.timer-ring-progress');
    
    if (!progressCircle) return;
    
    function animate() {
        if (!isTimerRunning) {
            circularTimerAnimation = null;
            return;
        }
        
        const elapsed = (Date.now() - startTime) / 1000; // seconds
        const progress = Math.min(elapsed / totalDuration, 1);
        const circumference = 2 * Math.PI * 45;
        const strokeDashoffset = circumference - (progress * circumference);
        
        progressCircle.style.strokeDashoffset = strokeDashoffset;
        
        if (progress < 1) {
            circularTimerAnimation = requestAnimationFrame(animate);
        }
    }
    
    // Start the continuous animation
    circularTimerAnimation = requestAnimationFrame(animate);
}

function stopCircularTimerAnimation() {
    if (circularTimerAnimation) {
        cancelAnimationFrame(circularTimerAnimation);
        circularTimerAnimation = null;
    }
}

function startNewRoutine() {
    showRoutineSelection();
}

// Dark mode functionality
function initializeDarkMode() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('bend-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

function toggleDarkMode() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDarkMode) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('.toggle-icon').textContent = '☀️';
    localStorage.setItem('bend-theme', 'dark');
}

function enableLightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    document.querySelector('.toggle-icon').textContent = '🌙';
    localStorage.setItem('bend-theme', 'light');
}

// Audio functions
function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

function playBeep(frequency = 800, duration = 200, type = 'short') {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Create a gentle envelope
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
    
    oscillator.start(now);
    oscillator.stop(now + duration / 1000);
}

function playCountdownBeep() {
    playBeep(600, 150, 'short');
}

function playTimerEndBeep() {
    playBeep(400, 500, 'long');
}

function playSideSwitchBeep() {
    playBeep(700, 200, 'short');
}

// Accessibility functions
function setupAccessibility() {
    // Add ARIA labels and roles
    addAriaLabels();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Announce timer changes to screen readers
    setupScreenReaderAnnouncements();
}

function addAriaLabels() {
    // Add ARIA labels to buttons
    const startPauseBtn = document.getElementById('start-pause-btn');
    if (startPauseBtn) {
        startPauseBtn.setAttribute('aria-label', 'Start or pause exercise timer');
    }
    
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
        skipBtn.setAttribute('aria-label', 'Skip current exercise');
    }
    
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }
    
    // Add ARIA live region for timer announcements
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.setAttribute('aria-live', 'polite');
        timerDisplay.setAttribute('aria-label', 'Exercise timer');
    }
}

function setupKeyboardNavigation() {
    // Add keyboard support for routine selection
    const routineBtns = document.querySelectorAll('.routine-category-btn');
    routineBtns.forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add keyboard support for timer controls
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    toggleTimer();
                    break;
                case 's':
                case 'S':
                    e.preventDefault();
                    skipExercise();
                    break;
                case 'Escape':
                    if (document.getElementById('exercise-display').classList.contains('active')) {
                        showRoutineSelection();
                    }
                    break;
            }
        }
    });
}

function setupScreenReaderAnnouncements() {
    // Create announcement element
    const announcement = document.createElement('div');
    announcement.id = 'screen-reader-announcement';
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    document.body.appendChild(announcement);
}

function announceToScreenReader(message) {
    const announcement = document.getElementById('screen-reader-announcement');
    if (announcement) {
        announcement.textContent = message;
        // Clear after announcement
        setTimeout(() => {
            announcement.textContent = '';
        }, 1000);
    }
}

function showSideSwitchMessage() {
    // Create or update side switch message
    let messageElement = document.getElementById('side-switch-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'side-switch-message';
        messageElement.className = 'side-switch-message';
        document.body.appendChild(messageElement);
    }
    
    messageElement.innerHTML = `
        <div class="side-switch-content">
            <div class="side-switch-icon">🔄</div>
            <div class="side-switch-text">${window.i18n ? window.i18n.t('timer.switchSides') : 'Switch sides'}</div>
        </div>
    `;
    
    // Show message for 3 seconds
    messageElement.style.display = 'block';
    
    // Play three beeps during the side switch message
    playSideSwitchBeep();
    setTimeout(() => playSideSwitchBeep(), 1000);
    setTimeout(() => playSideSwitchBeep(), 2000);
    
    if (sideSwitchMessageTimer) {
        clearTimeout(sideSwitchMessageTimer);
    }
    
    sideSwitchMessageTimer = setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

// Share app functionality
function shareApp() {
    console.log('🔍 Share button clicked');
    console.log('🔍 Navigator.share available:', !!navigator.share);
    console.log('🔍 Navigator.canShare available:', !!navigator.canShare);
    
    const shareData = {
        title: 'Tend - Stretching & Flexibility',
        text: 'Check out this gentle stretching and flexibility app designed for all ages and abilities!',
        url: 'https://selloa.github.io/bend-app/'
    };

    console.log('🔍 Share data:', shareData);

    // Check if Web Share API is supported (mobile devices)
    if (navigator.share) {
        console.log('🔍 Web Share API is available');
        
        // Check if we can share this data
        if (navigator.canShare && navigator.canShare(shareData)) {
            console.log('🔍 Data can be shared, attempting to share...');
            navigator.share(shareData)
                .then(() => {
                    console.log('✅ App shared successfully via Web Share API');
                })
                .catch((error) => {
                    console.error('❌ Error sharing via Web Share API:', error);
                    console.log('🔍 Falling back to clipboard method');
                    // Fallback to clipboard
                    fallbackShare();
                });
        } else {
            console.log('🔍 Data cannot be shared, trying without canShare check...');
            // Try sharing without canShare check (some browsers don't support it)
            navigator.share(shareData)
                .then(() => {
                    console.log('✅ App shared successfully via Web Share API (without canShare check)');
                })
                .catch((error) => {
                    console.error('❌ Error sharing via Web Share API (without canShare check):', error);
                    console.log('🔍 Falling back to clipboard method');
                    // Fallback to clipboard
                    fallbackShare();
                });
        }
    } else {
        console.log('🔍 Web Share API not available, using fallback method');
        // Fallback for desktop browsers
        fallbackShare();
    }
}

// Fallback share method for desktop browsers
function fallbackShare() {
    console.log('🔍 Using fallback share method');
    const url = 'https://selloa.github.io/bend-app/';
    
    // Try to copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        console.log('🔍 Clipboard API available, attempting to copy URL');
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('✅ URL copied to clipboard successfully');
                showShareSuccess();
            })
            .catch((error) => {
                console.error('❌ Error copying to clipboard:', error);
                console.log('🔍 Showing manual copy prompt');
                showSharePrompt(url);
            });
    } else {
        console.log('🔍 Clipboard API not available, showing manual copy prompt');
        // Final fallback - show prompt
        showSharePrompt(url);
    }
}

// Show success message when URL is copied
function showShareSuccess() {
    console.log('🔍 Showing share success message');
    // Create a temporary success message
    const successMessage = document.createElement('div');
    successMessage.className = 'share-success-message';
    successMessage.innerHTML = `
        <div class="share-success-content">
            <div class="share-success-icon">✅</div>
            <div class="share-success-text">Link copied to clipboard!</div>
        </div>
    `;
    
    // Add styles
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-secondary, #f8f9fa);
        border: 2px solid var(--accent-primary, #4A90E2);
        border-radius: 15px;
        padding: 20px 30px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: fadeInOut 2s ease-in-out;
        color: var(--text-primary, #333);
        font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        font-size: 16px;
        text-align: center;
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#share-animations')) {
        const style = document.createElement('style');
        style.id = 'share-animations';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successMessage);
    
    // Remove after animation
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 2000);
}

// Show share prompt for manual copying
function showSharePrompt(url) {
    console.log('🔍 Showing manual copy prompt');
    const prompt = window.prompt('Share this link:', url);
    if (prompt !== null) {
        console.log('✅ User copied link manually');
    } else {
        console.log('🔍 User cancelled manual copy prompt');
    }
}