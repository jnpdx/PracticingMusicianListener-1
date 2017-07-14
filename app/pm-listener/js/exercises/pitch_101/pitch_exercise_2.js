function generateExerciseForKotlin() {
    return {
        tempo: 110,
        notes: [
            {noteNumber: 64, duration: 2.0},
            {noteNumber: 65, duration: 1.0},
            {noteNumber: 64, duration: 1.0},
            {noteNumber: 65, duration: 2.0},
            {noteNumber: 64, duration: 1.0},
            {noteNumber: 65, duration: 1.0},
            {noteNumber: 64, duration: 2.0},
            {noteNumber: 65, duration: 2.0},
            {noteNumber: 64, duration: 4.0},
        ]
    }
}

function generateExerciseEasyScoreCode() {
    return {
        title: "Little Ditty 2",
        author: "Jake Douglass",
        time_signature: "4/4",
        tempo: 110,
        systems: [{bars: [
            {
                extra_attributes:{time_signature:'4/4',clef:'treble',key_signature:"C"},
                groups:[{notes:['E4/h','F4/q','E4/q']}]
            },
            {
                            groups:[{notes:['F4/h','E4/q','F4/q']}]
                        },
            {
                            groups:[{notes:['E4/h','F4/h']}]
                        },
            {
                            groups:[{notes:['E4/w']}]
                        },

            ],}],
        copyrightInfo: "© Copyright 2017"
        }
}
