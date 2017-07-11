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
        author: "Practicing Musician Example Author",
        time_signature: "4/4",
        tempo: 110,
        bars: [
            {
                extra_attributes:[{name:'time_signature',value:'4/4'},{name:'clef',value:'treble'},{name:'key_signature',value:"C"}],
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

            ],
        copyrightInfo: "This arrangement © Copyright 2006 Something Music Limited.<br/> All Rights Reserved. International Copyright Secured."
        }
}