const mainArea = document.getElementById("main")
const selectionArea = document.getElementById("selection-area")
const selectionOther = document.getElementById("selection-other")
let states = []
let facilities = []

// render state selection list on page load
selectSelectionArea("cms671")

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("change", function(e) {
    if (e.target.id === "dataset") {
        selectSelectionArea(e.target.value)
    }

    if (e.target.id === "state") {
        render671(e.target.value)
    }
})

// render facility when selected from facility list
mainArea.addEventListener("change", function(e) {
    if (e.target.id === "facility-list") {
        renderFacility(e.target.value)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function selectSelectionArea(value) {
    if (value === "none") {
        window.location.href="./index.html"
        selectionOther.innerHTML = ""
    }

    if (value === "cms671") {
        selectState()
    }

    if (value === "owners") {
        window.location.href="./owners.html"
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
    const facilityData = facilities.find(facility => facility["Facility Name"] === facilityName)

    const {"Facility Name": name, "Provider Number": providerNum, City, State, "Zip Code": zip, "7 Day RN Hrs Waived Per Week": rnHours, "7 Day RN Waiver Date": rnWaiverDate, "24 Hr Licensed Nursing Hrs Waived Per Week": nursingHours, "24 Hr Licensed Nursing Waiver Date": nursingWaiverDate, "Certification Date": certDate, "Continuing Care Retirement Community (CCRC)": ccrc, "Facility Conducts Experimental Research": research, "Hospital Based": hospitalBased, "Medicaid Census": medicaidCensus, "Medicare Census": medicareCensus, "Multi-Facility Organization": multiFamilyOrg, "Multi-Facility Organization Name": multiFamilyName, "Number of AIDS Beds": bedsAids, "Number of Alzheimer's Disease Beds": bedsAlz, "Number of Dialysis Beds": bedsDialysis, "Number of Disabled Children/Young Adult Beds": bedsKids, "Number of Head Trauma Beds": bedsHeadTrauma, "Number of Hospice Beds": bedsHospice, "Number of Huntington's Disease Beds": bedsHuntington, "Number of Other Specialized Rehab Beds": bedsSpecialtyRehab, "Number of Ventilator Beds": bedsVent, "Nurse Aide Training and Competency Evaluation Program": aideTraining, "Organized Family Member Group": familyGroup, "Organized Residents' Group": residentGroup, "Other Census": otherCensus, "Ownership Type": ownership, "Program Participation Code": participationCode, "Total Residents": totalResidents} = facilityData

    facilityInfo.innerHTML = `
        <h2>${name}</h2>

        <h3>Facility Info</h3>
        <section class="col-2">
            <div>
                <p class="field-name">Provider Number</p>
                <p>${providerNum}</p>
            </div>
            <div>
                <p class="field-name">Certification Date</p>
                <p>${certDate}</p>
            </div>
        </section>
        <section class="col-3a">
            <div>
                <p class="field-name">City</p>
                <p>${City}</p>
            </div>
            <div>
                <p class="field-name">State</p>
                <p>${State}</p>
            </div>
            <div>
                <p class="field-name">Zip Code</p>
                <p>${zip}</p>
            </div>
        </section>

        <h3>Facility Type</h3>
        <section class="col-2-550">
            <div>
                <p class="field-name">Program Participation Code</p>
                <p>${participationCode}</p>
            </div>
            <div>
                <p class="field-name">Hospital Based</p>
                <p>${hospitalBased}</p>
            </div>
            <div>
                <p class="field-name">Ownership Type</p>
                <p>${ownership}</p>
            </div>
            <div>
                <p class="field-name">Multi-Facility Organization</p>
                <p>${multiFamilyOrg}</p>
            </div>
            <div>
                <p class="field-name">Multi-Facility Organization Name</p>
                <p>${multiFamilyName}</p>
            </div>
        </section>

        <h3>Census</h3>
        <section class="col-2">
            <div>
                <p class="field-name">Medicare Census</p>
                <p>${medicareCensus}</p>
            </div>
            <div>
                <p class="field-name">Medicaid Census</p>
                <p>${medicaidCensus}</p>
            </div>
            <div>
                <p class="field-name">Other Census</p>
                <p>${otherCensus}</p>
            </div>
            <div>
                <p class="field-name">Total Residents</p>
                <p>${totalResidents}</p>
            </div>
        </section>

        <h3>Special Care Units <span class="subtitle">(# of beds)</span></h3>
        <section class="col-3">
            <p class="field-name">AIDS Beds</p>
            <p class="field-name">Alzheimer's Disease Beds</p>
            <p class="field-name">Dialysis Beds</p>
            <p class="bottom-data">${bedsAids}</p>
            <p class="bottom-data">${bedsAlz}</p>
            <p class="bottom-data">${bedsDialysis}</p>
            <p class="field-name">Disabled Children/Young Adult Beds</p>
            <p class="field-name">Head Trauma Beds</p>
            <p class="field-name">Hospice Beds</p>
            <p class="bottom-data">${bedsKids}</p>
            <p class="bottom-data">${bedsHeadTrauma}</p>
            <p class="bottom-data">${bedsHospice}</p>
            <p class="field-name">Huntington's Disease Beds</p>
            <p class="field-name">Ventilator Beds</p>
            <p class="field-name">Other Specialized Rehab Beds</p>
            <p class="bottom-data">${bedsHuntington}</p>
            <p class="bottom-data">${bedsVent}</p>
            <p class="bottom-data">${bedsSpecialtyRehab}</p>
        </section>

        <h3>Special Groups</h3>
        <section class="col-2-700">
            <div>
                <p class="field-name">Organized Residents' Group</p>
                <p>${residentGroup}</p>
            </div>
            <div>
                <p class="field-name">Organized Family Member Group</p>
                <p>${familyGroup}</p>
            </div>
            <div>
                <p class="field-name">Facility Conducts Experimental Research</p>
                <p>${research}</p>
            </div>
            <div>
                <p class="field-name">Continuing Care Retirement Community (CCRC)</p>
                <p>${ccrc}</p>
            </div>
        </section>

        <h3>Nurse Staffing</h3>
        <section class="col-2">
            <div>
                <p class="field-name">7 Day RN Waiver Date</p>
                <p>${rnWaiverDate}</p>
            </div>
            <div>
                <p class="field-name">7 Day RN Hrs Waived Per Week</p>
                <p>${rnHours}</p>
            </div>
            <div>
                <p class="field-name">24 Hr Licensed Nursing Waiver Date</p>
                <p>${nursingWaiverDate}</p>
            </div>
            <div>
                <p class="field-name">24 Hr Licensed Nursing Hrs Waived Per Week</p>
                <p>${nursingHours}</p>
            </div>
            <div>
                <p class="field-name">Nurse Aide Training and Competency Evaluation Program</p>
                <p>${aideTraining}</p>
            </div>
        </section>
    `
}