const mainArea = document.getElementById("main")
const selectionArea = document.getElementById("selection-area")
const selectionOther = document.getElementById("selection-other")
let states = []
let facilities = []

selectSelectionArea("owners")

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("change", function(e) {
    if (e.target.id === "dataset") {
        selectSelectionArea(e.target.value)
    }

    if (e.target.id === "state") {
        render671(e.target.value)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function selectSelectionArea(value) {
    if (value === "none") {
        window.location.href="./index.html"
        selectionOther.innerHTML = ""
    }

    if (value === "cms671") {
        window.location.href="./ltc-fc.html"
    }

    if (value === "owners") {
        selectState()
    }
}

async function selectState() {
    selectionOther.innerHTML = ""
    await getStates()

    selectionOther.innerHTML = `
        <label class="label" for="state">Choose a state:</label>
        <select name="state" id="state">
            <option value=""></option>
        </select>
    `

    const stateOptions = document.getElementById("state")
    states.forEach (state => {
        const option = document.createElement("option")
        option.value = state
        option.textContent = state
        stateOptions.appendChild(option)
    })
}