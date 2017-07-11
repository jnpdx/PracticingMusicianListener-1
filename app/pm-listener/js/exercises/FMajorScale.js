function generateExerciseForKotlin() {
    return {
        tempo: 120,
        notes: [
            {noteNumber: 65, duration: 1.0},
            {noteNumber: 67, duration: 1.0},
            {noteNumber: 69, duration: 1.0},
            {noteNumber: 70, duration: 1.0},
            {noteNumber: 72, duration: 1.0},
            {noteNumber: 74, duration: 1.0},
            {noteNumber: 76, duration: 1.0},
            {noteNumber: 77, duration: 1.0},
        ]
    }
}

function generateExerciseEasyScoreCode() {
    return {
        title: "C Major Scale",
        author: "Practicing Musician Example Author",
        time_signature: "4/4",
        bars: [
            {
                extra_attributes:[{name:'time_signature',value:'4/4'},{name:'clef',value:'treble'},{name:'key_signature',value:"F"}],
                groups:[{notes:['F4/q','G4/q','A4/q','Bb4/q']}]
            },
            {
                            groups:[{notes:['C5/q','D5/q','E5/q','F5/q']}]
                        },
            ]
        }
}
