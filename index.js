const selectionArea = document.getElementById("selection-area")

// ⬇️ EVENT LISTENERS ⬇️

selectionArea.addEventListener("click", function(e) {
    if (e.target.id) {
        selectSelectionArea(e.target.value)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function selectSelectionArea(value) {
    console.log(value)
}

// ⬇️ RENDER FUNCTIONS ⬇️