const mainArea = document.getElementById("main")
const selectionArea = document.getElementById("selection-area")
const selectionOther = document.getElementById("selection-other")

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("click", function(e) {
    if (e.target.id) {
        selectSelectionArea(e.target.value)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function selectSelectionArea(value) {
    if (value === "cms671") {
        selectState()
    }
}

function selectState() {
    selectionOther.innerHTML = ""

    selectionOther.innerHTML = `
        <label class="label" for="state">Choose a state:</label>
        <select name="state" id="state">
            <option value="none"></option>
            <option value="AK">AK</option>
        </select>
    `
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderMain() {
    mainArea.innerHTML = ""

    mainArea.innerHTML = `
        <h2>Long-Term Care Facility Characteristics from CMS Form-671</h2>
    `
}