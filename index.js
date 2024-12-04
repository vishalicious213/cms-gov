const selectionArea = document.getElementById("selection-area")
const mainArea = document.getElementById("main")

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("click", function(e) {
    if (e.target.id) {
        selectSelectionArea(e.target.value)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function selectSelectionArea(value) {
    if (value === "cms671") {
        renderMain()
    }
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderMain() {
    mainArea.innerHTML = ""

    mainArea.innerHTML = `
        <h1>Long-Term Care Facility Characteristics from CMS Form-671</h1>
    `
}