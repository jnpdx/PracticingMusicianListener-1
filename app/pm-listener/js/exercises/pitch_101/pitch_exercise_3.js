function generateExerciseForKotlin() {
    return {
        tempo: 110,
        count_off: 8,
        time_signature: 4,
        notes: [
            {noteNumber: 69, duration: 2.0},
            {noteNumber: 67, duration: 1.0},
            {noteNumber: 69, duration: 1.0},
            {noteNumber: 67, duration: 4.0},
            {noteNumber: 69, duration: 1.0},
            {noteNumber: 67, duration: 1.0},
            {noteNumber: 69, duration: 2.0},
            {noteNumber: 67, duration: 4.0},
        ]
    }
}

function generateExerciseEasyScoreCode() {
    return {
        title: "Little Ditty 3",
        author: "Jake Douglass",
        time_signature: "4/4",
        tempo: 110,
        systems:[{bars: [
            {
                extra_attributes:{time_signature:'4/4',clef:'treble',key_signature:"C"},
                groups:[{notes:['A4/h','G4/q','A4/q']}]
            },
            {
                            groups:[{notes:['G4/w']}]
                        },
            {
                            groups:[{notes:['A4/q','G4/q','A4/h']}]
                        },
            {
                            groups:[{notes:['G4/w']}]
                        },
            ],}],
        copyrightInfo: "© Copyright 2017"
        }
}
