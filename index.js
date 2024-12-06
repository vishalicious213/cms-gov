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
    // console.log(facilities)

    mainArea.innerHTML = `
        <h2>Long-Term Care Facility Characteristics from CMS Form-671</h2>

        <label class="label" for="facility-list">Choose a facility:</label>
        <select name="facility-list" id="facility-list"></select>
        <section id="facility-info" class="facility-info"></section>
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

function renderFacility(facilityName) {
    const facilityInfo = document.getElementById("facility-info")
    facilityInfo.innerHTML = ""
    // console.log(facilityName)
    const facilityData = facilities.find(facility => facility["Facility Name"] === facilityName)
    console.log(facilityData)

    const {"Facility Name": name, "Provider Number": providerNum, City, State, "Zip Code": zip, "7 Day RN Hrs Waived Per Week": rnHours, "7 Day RN Waiver Date": rnWaiverDate, "24 Hr Licensed Nursing Hrs Waived Per Week": nursingHours, "24 Hr Licensed Nursing Waiver Date": nursingWaiverDate, "Certification Date": certDate, "Continuing Care Retirement Community (CCRC)": ccrc, "Facility Conducts Experimental Research": research, "Hospital Based": hospitalBased, "Medicaid Census": medicaidCensus, "Medicare Census": medicareCensus, "Multi-Facility Organization": multiFamilyOrg, "Multi-Facility Organization Name": multiFamilyName, "Number of AIDS Beds": bedsAids, "Number of Alzheimer's Disease Beds": bedsAlz, "Number of Dialysis Beds": bedsDialysis, "Number of Disabled Children/Young Adult Beds": bedsKids, "Number of Head Trauma Beds": bedsHeadTrauma, "Number of Hospice Beds": bedsHospice, "Number of Huntington's Disease Beds": bedsHuntington, "Number of Other Specialized Rehab Beds": bedsSpecialtyRehab, "Number of Ventilator Beds": bedsVent, "Nurse Aide Training and Competency Evaluation Program": aideTraining, "Organized Family Member Group": familyGroup, "Organized Residents' Group": residentGroup, "Other Census": otherCensus, "Ownership Type": ownership, "Program Participation Code": participationCode, "Total Residents": totalResidents} = facilityData

    facilityInfo.innerHTML = `
        <h2>${name}</h2>

        <h3>Facility Info</h3>
        <p>Provider Number</p>
        <p>${providerNum}</p>
        <p>City</p>
        <p>${City}</p>
        <p>State</p>
        <p>${State}</p>
        <p>Zip Code</p>
        <p>Certification Date</p>
        <p>${certDate}</p>

        

        <p>${zip}</p>
        <p>7 Day RN Hrs Waived Per Week</p>
        <p>${rnHours}</p>
        <p>7 Day RN Waiver Date</p>
        <p>${rnWaiverDate}</p>
        <p>24 Hr Licensed Nursing Hrs Waived Per Week</p>
        <p>${nursingHours}</p>
        <p>24 Hr Licensed Nursing Waiver Date</p>
        <p>${nursingWaiverDate}</p>
        <p>Continuing Care Retirement Community (CCRC)</p>
        <p>${ccrc}</p>
        <p>Facility Conducts Experimental Research</p>
        <p>${research}</p>
        <p>Hospital Based</p>
        <p>${hospitalBased}</p>
        <p>Medicaid Census</p>
        <p>${medicaidCensus}</p>
        <p>Medicare Census</p>
        <p>${medicareCensus}</p>
        <p>Multi-Facility Organization</p>
        <p>${multiFamilyOrg}</p>
        <p>Multi-Facility Organization Name</p>
        <p>${multiFamilyName}</p>
        <p>Number of AIDS Beds</p>
        <p>${bedsAids}</p>
        <p>Number of Alzheimer's Disease Beds</p>
        <p>${bedsAlz}</p>
        <p>Number of Dialysis Beds</p>
        <p>${bedsDialysis}</p>
        <p>Number of Disabled Children/Young Adult Beds</p>
        <p>${bedsKids}</p>
        <p>Number of Head Trauma Beds</p>
        <p>${bedsHeadTrauma}</p>
        <p>Number of Hospice Beds</p>
        <p>${bedsHospice}</p>
        <p>Number of Huntington's Disease Beds</p>
        <p>${bedsHuntington}</p>
        <p>Number of Other Specialized Rehab Beds</p>
        <p>${bedsSpecialtyRehab}</p>
        <p>Number of Ventilator Beds</p>
        <p>${bedsVent}</p>
        <p>Nurse Aide Training and Competency Evaluation Program</p>
        <p>${aideTraining}</p>
        <p>Organized Family Member Group</p>
        <p>${familyGroup}</p>
        <p>Organized Residents' Group</p>
        <p>${residentGroup}</p>
        <p>Other Census</p>
        <p>${otherCensus}</p>
        <p>Ownership Type</p>
        <p>${ownership}</p>
        <p>Program Participation Code</p>
        <p>${participationCode}</p>
        <p>Total Residents</p>
        <p>${totalResidents}</p>
    `
}