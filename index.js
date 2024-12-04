const mainArea = document.getElementById("main")
const selectionArea = document.getElementById("selection-area")
const selectionOther = document.getElementById("selection-other")
let states = []

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
    getStates()

    selectionOther.innerHTML = `
        <label class="label" for="state">Choose a state:</label>
        <select name="state" id="state">
            <option value="none"></option>
        </select>
    `

    const stateOptions = document.getElementById("state")
    states.map (state => {
        stateOptions += `<option value="${state}">${state}</option>`
    })
}

// ⬇️ UTILITY FUNCTIONS ⬇️

async function getStates() {
    try {
        const res = await fetch("https://data.cms.gov/data-api/v1/dataset/510f8762-0cf7-4aa3-93ff-e13af0b3bf26/data?column=State&additionalProp1=%7B%7D&offset=0&size=100&distinct=1")
        const data = await res.json()
        states = data.map(item => item.State)
        console.log(states)
    }
    catch (err) {
        console.error("Failed to fetch states from CMS:", err)
    }
}

// ⬇️ RENDER FUNCTIONS ⬇️

function render671() {
    mainArea.innerHTML = ""

    mainArea.innerHTML = `
        <h2>Long-Term Care Facility Characteristics from CMS Form-671</h2>
    `
}