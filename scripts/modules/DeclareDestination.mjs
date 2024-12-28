import {LocalGameID} from "./Globals.mjs";


function DeclareDestination(event, form)
{
    event.preventDefault();     // Prevent the form from submitting and causing a page reload
    const URL ="https://localhost:7181/api/DeclareDestination/"+ LocalGameID +"/1/";
    const FullURL = URL + form.SectorID.value + "/" + form.SystemID.value;


    if (isNaN(form.SectorID.value) || isNaN(form.SystemID.value)) 
    {
        showModal("Please enter valid numeric values for Sector ID and System ID.");
    }
    else
    {
        try
        {
            fetch(FullURL, { method: "PATCH" })
                .then(response => {
                    console.log("Response Status:", response.status);

                    if (response.status === 204) {
                        console.log("Operation succeeded with no content.");
                        showModal("New destination recorded.");
                        return; // No content to process
                    }

                    if (response.status === 422)
                    {
                        return response.json().then(errorData => 
                        {
                            console.log("Request denied:", errorData);
                            showModal(` ${errorData.details}`);
                        });
                    }

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    // Handle other status codes that return a body
                    return response.text();
                })
                .then(Data => {
                    if (Data) {
                        console.log("Response Data:", Data);
                    }
                })
                .catch(error => 
                {
                    console.error("Error declaring new destination:", error);
                    showModal("An error occurred. Please try again.");
                });
        
            }
            catch(error)
            { 
                console.error("Error calling the WebAPI that declares the next destination.", error);
                document.getElementById("DeclareDestinationResponse").innerHTML = "An unexpected error occurred.";
            }
        }
}    

/*
// Function to show the modal
function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerHTML = message;  // Set the message
    modal.style.display = "block";  // Show the modal
}
*/


function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerHTML = message;  // Set the message
    modal.classList.add('show');  // Add class to trigger fade-in effect
    modal.style.display = "block";  // Show the modal

    // Remove fade-in effect after animation completes
    setTimeout(() => modal.classList.remove('fade-in'), 600);
}


// Function to close the modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";  // Hide the modal
}


// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        closeModal();
    }
};


// Function to handle the user input and call the stored procedure
function searchSystems(inputElement) {
    const systemName = inputElement.value;

    // Only make the request if the user has typed 3 or more characters
    if (systemName.length >= 3) {
        fetchSystems(systemName);
    } else {
        // Hide the dropdown if less than 3 characters
        document.getElementById("systemResults").style.display = "none";
    }
}

// Function to fetch systems from the API or backend
function fetchSystems(systemName) {
    const URL = `https://localhost:7181/api/GetSystemsByName/${systemName}`;

    fetch(URL)
        .then(response => response.json())
        .then(Data => {
            // Check if the 'Data' field exists and has results
            if (Data.Data && Data.Data.length > 0) {
                displaySystemResults(Data.Data); // Access the 'Data' array
            } else {
                // Hide the dropdown if no results are found
                document.getElementById("systemResults").style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error fetching systems:", error);
            document.getElementById("systemResults").style.display = "none";
        });
}

// Function to display the system names in the dropdown
function displaySystemResults(systems) {
    const resultsContainer = document.getElementById("systemResults");
    resultsContainer.innerHTML = ''; // Clear previous results

    systems.forEach(system => {
        const listItem = document.createElement("li");
        listItem.textContent = system.system; // Use 'system' from API response
        listItem.onclick = function() {
            // When a system is selected, update the form fields
            document.getElementById("SystemName").value = system.system; // Set the selected system name
            // Store the SectorID and SystemID to use for the destination
            document.getElementById("SectorID").value = system.sectorID; // Set SectorID
            document.getElementById("SystemID").value = system.systemID; // Set SystemID

            // Hide the dropdown
            resultsContainer.style.display = "none";
        };

        resultsContainer.appendChild(listItem);
    });

    // Show the results dropdown
    resultsContainer.style.display = "block";
}
