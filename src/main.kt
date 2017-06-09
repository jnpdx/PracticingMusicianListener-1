import com.practicingmusician.*
import com.practicingmusician.notes.ALL_NOTES
import com.practicingmusician.notes.Note
import kotlin.browser.window

/**
 * Created by jn on 6/5/17.
 */

val app = App()

fun main(args: Array<String>) {
    window.onload = {
        Note.createAllNotes()
        runProgram()
    }
}

fun runProgram() {
    println("Running...")
}