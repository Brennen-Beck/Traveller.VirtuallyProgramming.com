import { LocalGameID } from "./Globals.js";
import { TravellerAPIWebSiteURL } from "./Globals.js";
class CrewMember {
    constructor(CrewMember) {
        this.CrewMemberID = CrewMember.CrewMemberID;
        this.FirstName = CrewMember.FirstName;
        this.LastName = CrewMember.LastName;
        this.STR = CrewMember.STR;
        this.DEX = CrewMember.DEX;
        this.END = CrewMember.END;
        this.INT = CrewMember.INT;
        this.EDU = CrewMember.EDU;
        this.SOC = CrewMember.SOC;
        this.CHA = CrewMember.CHA;
        this.Bank = CrewMember.Bank;
        this.PortraitBase64 = CrewMember.PortraitBase64;
    }
}
async function getCrewMemberData() {
    try {
        const resp = await fetch(TravellerAPIWebSiteURL + "/CrewData/" + LocalGameID + "/1", { method: "GET" });
        if (!resp.ok) {
            throw new Error('HTTP error! Status: ${resp.status}');
        }
        const respObject = await resp.json();
        const CrewMembersDataArray = respObject.Data.map(Member => new CrewMember(Member));
        return CrewMembersDataArray;
    }
    catch (error) {
        console.error("Error calling the WebAPI for Crew Member Data.", error);
        return [];
    }
}
(async () => {
    const CrewMembersArray = await getCrewMemberData();
    if (!CrewMembersArray) {
        console.log("Somin' ain't right!");
    }
    else {
        console.log("Mapped Crew Members Array:", CrewMembersArray);
        DisplayCrewMembersTable(CrewMembersArray);
    }
})();
function DisplayCrewMembersTable(CrewMembersArray) {
    const TableContainer = document.getElementById("CrewMemberData");
    if (TableContainer) {
        const Table = document.createElement("Table");
        Table.style.borderCollapse = "collapse"; // Remove visible borders
        Table.style.width = "100%"; // Ensure table takes full width
        Table.className = "CustomTable";
        const Caption = Table.createCaption();
        Caption.innerHTML = "Crew Roster";
        Caption.style.textAlign = "left";
        const HeaderRow = document.createElement("tr");
        const Headers = ["Portrait", "ID", "First Name", "Last Name", "STR", "DEX", "END", "INT", "EDU", "SOC", "CHA", "Bank"];
        Headers.forEach((HeaderText, Index) => {
            const th = document.createElement("th");
            th.textContent = HeaderText;
            th.style.padding = "5px"; // Add gutter
            HeaderRow.appendChild(th);
        });
        Table.appendChild(HeaderRow);
        const ScrollableContainer = document.createElement("div");
        ScrollableContainer.className = "CustomTableContainer";
        //Add Data rows.
        CrewMembersArray.forEach(Item => {
            const Row = document.createElement("tr");
            // Handle PortraitBase64 in the first column
            const tdPortrait = document.createElement("td");
            if (Item.PortraitBase64) {
                const img = document.createElement("img");
                img.src = Item.PortraitBase64; // Set the base64 string as the image source
                img.alt = "Portrait"; // Add an alt text for accessibility
                //img.style.width = "160px"; // You can adjust the image size as needed
                //img.style.height = "auto"; // Maintain aspect ratio
                tdPortrait.appendChild(img); // Append the image to the first column
            }
            tdPortrait.style.padding = "5px"; // Add gutter
            tdPortrait.style.boxSizing = "border-box"; // Ensure alignment matches the header
            Row.appendChild(tdPortrait);
            Object.entries(Item).forEach(([Key, Value]) => {
                if (Key !== "PortraitBase64") { // Skip the PortraitBase64 field as it's already handled
                    const td = document.createElement("td");
                    td.textContent = Value || ""; // Display the value, empty if undefined
                    td.style.padding = "5px"; // Add gutter
                    td.style.boxSizing = "border-box"; // Ensure alignment matches the header
                    Row.appendChild(td);
                }
            });
            Table.appendChild(Row);
        });
        // Clear any existing content and append the new table
        TableContainer.innerHTML = "";
        TableContainer.appendChild(Table);
    }
    else {
        console.error("Table container for the Crew Members was not found.");
    }
    return;
}
