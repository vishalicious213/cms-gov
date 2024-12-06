const mainArea = document.getElementById("main")
const selectionArea = document.getElementById("selection-area")
const selectionOther = document.getElementById("selection-other")
let states = []
let facilities = []

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("click", function(e) {
    if (e.target.id === "dataset") {
        selectSelectionArea(e.target.value)
    }

    if (e.target.id === "state") {
        render671(e.target.value)
    }
})

// render facility when selected from facility list
mainArea.addEventListener("click", function(e) {
    if (e.target.id === "facility-list") {
        renderFacility(e.target.value)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function selectSelectionArea(value) {
    if (value === "none") {
        selectionOther.innerHTML = ""
    }

    if (value === "cms671") {
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

// ⬇️ UTILITY FUNCTIONS ⬇️

async function getStates() {
    try {
        const res = await fetch("https://data.cms.gov/data-api/v1/dataset/510f8762-0cf7-4aa3-93ff-e13af0b3bf26/data?column=State&additionalProp1=%7B%7D&offset=0&size=100&distinct=1")
        const data = await res.json()
        states = data.map(item => item.State)
    }
    catch (err) {
        console.error("Failed to fetch states from CMS:", err)
    }
}

async function getStateFacilities(state) {
    try {
        const res = await fetch(`https://data.cms.gov/data-api/v1/dataset/510f8762-0cf7-4aa3-93ff-e13af0b3bf26/data?filter[State]=${state}&additionalProp1=%7B%7D&offset=0&size=2000`)
        const data = await res.json()
        // console.log(data)
        facilities = data
        facilities.sort((a, b) => a["Facility Name"].localeCompare(b["Facility Name"]))
    }
    catch (err) {
        console.error("Failed to fetch state facilities from CMS:", err)
    }
}

// ⬇️ RENDER FUNCTIONS ⬇️

async function render671(state) {
    mainArea.innerHTML = ""
    await getStateFacilities(state)
    console.log(facilities)

    mainArea.innerHTML = `
        <h2>Long-Term Care Facility Characteristics from CMS Form-671</h2>

        <label class="label" for="facility-list">Choose a facility:</label>
        <select name="facility-list" id="facility-list"></select>
    `
    renderFacilityList()
}

async function renderFacilityList() {
    const facilityList = document.getElementById("facility-list")
    facilities.forEach (facility => {
        const option = document.createElement("option")
        option.value = facility["Facility Name"]
        option.textContent = facility["Facility Name"]
        facilityList.appendChild(option)
    })
}

function renderFacility(facility) {
    console.log(facility)
}