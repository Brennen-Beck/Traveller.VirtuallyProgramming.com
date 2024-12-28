import {LocalGameID} from "./Globals.mjs";


class ShipsLedgerEntry
{
    constructor(ShipLedgerEntryRow)
    {
        this.BankTransactionId =ShipLedgerEntryRow.BankTransactionId;
        this.Day =ShipLedgerEntryRow.Day;
        this.Year =ShipLedgerEntryRow.Year;
        this.Time =ShipLedgerEntryRow.Time;
        this.Description =ShipLedgerEntryRow.Description;
        this.RunningTotal =ShipLedgerEntryRow.RunningTotal;
        this.Revenue =ShipLedgerEntryRow.Revenue;
        this.Expense =ShipLedgerEntryRow.Expense;
        this.StarSystem =ShipLedgerEntryRow.StarSystem;
        this.SystemUWP =ShipLedgerEntryRow.SystemUWP;
    }
}



async function getShipLedgerAPIData()
{
    try
    {
        const resp = await fetch("https://localhost:7181/api/ShipsLedger/" + LocalGameID + "/1", {method:"GET"})

        if (!resp.ok)
        {
            throw new Error('HTTP error! Status: ${resp.status}');
        }

        const respObject = await resp.json()

        const ShipLedgerDataArray =respObject.Data.map(Ledger => new ShipsLedgerEntry(Ledger));

        return ShipLedgerDataArray;
    }
    catch(error)
    {
        console.error("Error calling the WebAPI for the Ship's Ledger.", error);
        return[];
    }
}
  

(async () => 
{
    const LedgerArray = await getShipLedgerAPIData()

    if (!LedgerArray)
    {
        console.log("Somin' ain't right!")
    }
    else
    {
        // Sort the ledger array in reverse order by BankTransactionId
        LedgerArray.sort((a, b) => b.BankTransactionId - a.BankTransactionId);
  
        DisplayLedgerTable(LedgerArray);
     
    }
})();


function DisplayLedgerTable(LedgerArray)
{
    const TableContainer =document.getElementById("ShipsLedgerData");

    if(TableContainer)
    {
        const Table =document.createElement("Table");
        Table.style.borderCollapse = "collapse"; // Remove visible borders
        Table.style.width = "100%"; // Ensure table takes full width
        Table.className = "CustomTable";
        const Caption =Table.createCaption();
        Caption.innerHTML ="Ship's Ledger";
        Caption.style.textAlign = "left";
        
        const TableHeader =document.createElement("thead");
        const HeaderRow = document.createElement("tr");
        
        const Headers = ["ID", "Day", "Year", "Time", "Description", "Running Total", "Revenue", "Expense", "Star System", "System UWP"];
        Headers.forEach((HeaderText, Index) => 
        {
            const th = document.createElement("th");
            th.textContent = HeaderText;
            th.style.padding = "5px"; // Add gutter
            if (HeaderText === "Description") 
            {
                th.style.width = "40%"; // Set width for Description column
            }
            if (["ID", "Day", "Year", "Time", "Running Total", "Revenue", "Expense"].includes(HeaderText))
            {
                th.style.textAlign = "right"; // Right-align numeric columns
            }
            else
            {
                th.style.textAlign = "left"; // Left justify the header columns
            }
            HeaderRow.appendChild(th);
        });
        TableHeader.appendChild(HeaderRow);
        Table.appendChild(TableHeader);

        const ScrollableContainer = document.createElement("div");
        ScrollableContainer.className = "CustomTableContainer";


        //Add Data rows.
        LedgerArray.forEach(Item =>
        {
            const Row =document.createElement("tr");

            Object.entries(Item).forEach(([Key, Value]) =>
            {
                const td =document.createElement("td");
                if(["RunningTotal", "Revenue", "Expense"].includes(Key))
                {
                    td.textContent =Value ? Value.toLocaleString() : ""; // Format numbers with commas  
                    td.style.textAlign = "right"; // Right-align numeric columns      
                }
                else if (Key === "BankTransactionId" || Key === "Day" || Key === "Year" || Key === "Time")
                {
                    td.textContent = Value;
                    td.style.textAlign = "right"; // Right-align ID column
                }
                else
                {
                    td.textContent = Value;     //Left-align all other columns.
                }


                td.style.padding = "5px"; // Add gutter
                td.style.boxSizing = "border-box"; // Ensure alignment matches the header
                if (Key === "Description") 
                {
                    td.style.width = "40%"; // Set width for Description column
                }
                Row.appendChild(td);
            });
            Table.appendChild(Row);
        });

        // Clear any existing content and append the new table
        ScrollableContainer.appendChild(Table);
        TableContainer.innerHTML = "";
        TableContainer.appendChild(ScrollableContainer);
    }
    else
    {
        console.error("Table container for the Ship's Ledger was not found.");
    }

    return;
}
