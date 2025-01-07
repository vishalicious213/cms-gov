const mainArea = document.getElementById("main")
const selectionArea = document.getElementById("selection-area")
const selectionOther = document.getElementById("selection-other")
let states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]
let facilities = []

selectSelectionArea("owners")

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("change", function(e) {
    if (e.target.id === "dataset") {
        selectSelectionArea(e.target.value)
    }

    if (e.target.id === "state") {
        renderFacilities(e.target.value)
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

function selectState() {
    selectionOther.innerHTML = ""

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

// ⬇️ RENDER FUNCTIONS ⬇️

async function renderFacilities(state) {
    mainArea.innerHTML = ""
    await getStateFacilities(state)

    mainArea.innerHTML = `
        <h2>Skilled Nursing Facilities Owners</h2>

        <label class="label" for="facility-list">Choose a facility:</label>
        <select name="facility-list" id="facility-list"></select>
        <section id="facility-info" class="facility-info"></section>
    `
    renderFacilityList()
}

async function renderFacilityList() {
    const facilityList = document.getElementById("facility-list")
    facilities.forEach (facility => {
        console.log(facility)
    })
}

// ⬇️ UTILITY FUNCTIONS ⬇️

async function getStateFacilities(state) {
    try {
        const res = await fetch(`https://data.cms.gov/data-api/v1/dataset/afe44b85-cc6d-40d7-b5df-00ae8910d1d2/data?filter[STATE - OWNER]=${state}&additionalProp1=%7B%7D&offset=0&size=5000`)
        const data = await res.json()
        facilities = data
        facilities.sort((a, b) => {
            const facilityName = item => 
                item["DOING BUSINESS AS NAME - OWNER"] ||
                item["PARENT COMPANY"] ||
                item["PARENT COMPANY - OWNER"] ||
                item["ORGANIZATION NAME"]

            return facilityName(a).localeCompare(facilityName(b))
        })
        console.log(facilities)
    }
    catch (err) {
        console.error("Failed to fetch state facilities from CMS:", err)
    }
}