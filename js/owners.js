const mainArea = document.getElementById("main")
const selectionArea = document.getElementById("selection-area")
const selectionOther = document.getElementById("selection-other")
let states = []
let facilities = []

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("change", function(e) {
    if (e.target.id === "dataset") {
        selectSelectionArea(e.target.value)
    }

    if (e.target.id === "state") {
        render671(e.target.value)
    }
})