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

    const uniqueFacilities = Array.from (
        facilities.reduce((facilityOptions, facility) => {
            const key = facility["ASSOCIATE ID"]
            if (!facilityOptions.has(key)) facilityOptions.set(key, facility)
            return facilityOptions
        }, new Map()).values()
    )

    // console.log(uniqueFacilities)

    uniqueFacilities.forEach (facility => {
        const option = document.createElement("option")
        option.value = facility["ASSOCIATE ID"]
        option.textContent = facility["DOING BUSINESS AS NAME - OWNER"] ||
            facility["PARENT COMPANY"] ||
            facility["PARENT COMPANY - OWNER"] ||
            facility["ORGANIZATION NAME"]
        facilityList.appendChild(option)
    })
}

function renderFacility(facilityId) {
    const facilityInfo = document.getElementById("facility-info")
    const facilityList = document.getElementById("facility-list")
    const facilityName = facilityList.options[facilityList.selectedIndex].text
    const facilityData = facilities.find(facility => facility["ASSOCIATE ID"] === facilityId)
    facilityInfo.innerHTML = ""

    const {"ENROLLMENT ID": enrollmentId, "ASSOCIATE ID": associateId, "ORGANIZATION NAME": orgName, "ASSOCIATE ID - OWNER": ownerAssociateId, "TYPE - OWNER": ownerType, "ROLE CODE - OWNER": ownerRoleCode, "ROLE TEXT - OWNER": ownerRoleText, "ASSOCIATION DATE - OWNER": ownerAssocDate, "FIRST NAME - OWNER": firstName, "MIDDLE NAME - OWNER": midName, "LAST NAME - OWNER": lastName, "TITLE - OWNER": ownerTitle, "ORGANIZATION NAME - OWNER": ownerOrgName, "DOING BUSINESS AS NAME - OWNER": dbaName, "ADDRESS LINE 1 - OWNER": address1, "ADDRESS LINE 2 - OWNER": address2, "CITY - OWNER": city, "STATE - OWNER": state, "ZIP CODE - OWNER": zipCode, "PERCENTAGE OWNERSHIP": percentage, "CREATED FOR ACQUISITION - OWNER": acquisition, "CORPORATION - OWNER": corporation, "LLC - OWNER": llc, "MEDICAL PROVIDER SUPPLIER - OWNER": medProviderSupplier, "MANAGEMENT SERVICES COMPANY - OWNER": mgmtServicesCo, "MEDICAL STAFFING COMPANY - OWNER": medStaffCo, "HOLDING COMPANY - OWNER": holdingCo, "INVESTMENT FIRM - OWNER": investingFirm, "FINANCIAL INSTITUTION - OWNER": financialInst, "CONSULTING FIRM - OWNER": consultingFirm, "FOR PROFIT - OWNER": forProfit, "NON PROFIT - OWNER": nonProfit, "PRIVATE EQUITY COMPANY - OWNER": privateEquityCo, "REIT - OWNER": reit, "CHAIN HOME OFFICE - OWNER": chainHomeOffice, "TRUST OR TRUSTEE - OWNER": trust, "OTHER TYPE - OWNER": otherType, "OTHER TYPE TEXT - OWNER": otherTypeText, "PARENT COMPANY - OWNER": parentCo, "OWNED BY ANOTHER ORG OR IND - OWNER": otherOwner} = facilityData

    facilityInfo.innerHTML = `
        <h2>${facilityName}</h2>
        <section class="owners-main">
            <section>
                <section class="owner-section">
                    <h3>Identification</h3>
                    <p>Enrollment ID: ${enrollmentId}</p>
                    <p>Associate ID: ${associateId}</p>
                    <div>
                        <p>Organization Name:</p>
                        <p>${orgName}</p>
                    </div>
                </section>

                <section class="owner-section">
                    <h3>Owner Type</h3>
                    <p>Owner Associate ID: ${ownerAssociateId}</p>
                    <p>Owner Type: ${ownerType}</p>
                    <p>Owner Role Code: ${ownerRoleCode}</p>
                    <div>
                        <p>Owner Role Text:</p>
                        <p>${ownerRoleText}</p>
                    </div>
                    <p>Owner Association Date: ${ownerAssocDate}</p>
                </section>

                <section class="owner-section">
                    <h3>Individual Owner</h3>
                    <p>Owner First Name: ${firstName}</p>
                    <p>Owner Middle Name: ${midName}</p>
                    <p>Owner Last Name: ${lastName}</p>
                    <p>Owner Title: ${ownerTitle}</p>
                </section>

                <section class="owner-section">
                    <h3>Organizational Owner</h3>
                    <div>
                        <p>Organization Owner Name:</p>
                        <p>${ownerOrgName}</p>
                    </div>
                    <div>
                        <p>Doing Business As:</p>
                        <p>${dbaName}</p>
                    </div>
                    <p>Address line 1: ${address1}</p>
                    <p>Address line 2: ${address2}</p>
                    <p>City: ${city}</p>
                    <p>State: ${state}</p>
                    <p>Zip Code: ${zipCode}</p>
                    <p>Percentage Ownership: ${percentage}</p>
                </section>
            </section>

            <section class="owner-section org-owner-type-details">
                <h3>Organizational Owner Type Details</h3>
                <section class="owner-type-details">
                    <div>
                        <p>Created for Acquisition:</p>
                        <p>${acquisition || "-"}</p>
                    </div>
                    <div>
                        <p>Corporation:</p>
                        <p>${corporation || "-"}</p>
                    </div>
                    <div>
                        <p>LLC:</p>
                        <p>${llc || "-"}</p>
                    </div>
                    <div>
                        <p>Medical Provider Supplier:</p>
                        <p>${medProviderSupplier || "-"}</p>
                    </div>
                    <div>
                        <p>Mgmt Services Company:</p>
                        <p>${mgmtServicesCo || "-"}</p>
                    </div>
                    <div>
                        <p>Medical Staffing Company:</p>
                        <p>${medStaffCo || "-"}</p>
                    </div>
                    <div>
                        <p>Holding Company:</p>
                        <p>${holdingCo || "-"}</p>
                    </div>
                    <div>
                        <p>Investment Firm:</p>
                        <p>${investingFirm || "-"}</p>
                    </div>
                    <div>
                        <p>Financial Institution:</p>
                        <p>${financialInst || "-"}</p>
                    </div>
                    <div>
                        <p>Consulting Firm:</p>
                        <p>${consultingFirm || "-"}</p>
                    </div>
                    <div>
                        <p>For Profit:</p>
                        <p>${forProfit || "-"}</p>
                    </div>
                    <div>
                        <p>Non Profit:</p>
                        <p>${nonProfit || "-"}</p>
                    </div>
                    <div>
                        <p>Private Equity Company:</p>
                        <p>${privateEquityCo || "-"}</p>
                    </div>
                    <div>
                        <p>REIT:</p>
                        <p>${reit || "-"}</p>
                    </div>
                    <div>
                        <p>Chain Home Office:</p>
                        <p>${chainHomeOffice || "-"}</p>
                    </div>
                    <div>
                        <p>Trust/Trustee:</p>
                        <p>${trust || "-"}</p>
                    </div>
                </section>

                <p>Other Type: ${otherType}</p>
                <p>Other Type Text: ${otherTypeText}</p>
                <div>
                    <p>Parent Company:</p>
                    <p>${parentCo}</p>
                </div>
                <p>Owned by Other Org/Ind: ${otherOwner}</p>
            </section>
        </section>
    `
    // console.log(facilityData)
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
        // console.log(facilities)
    }
    catch (err) {
        console.error("Failed to fetch state facilities from CMS:", err)
    }
}