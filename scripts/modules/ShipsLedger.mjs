class ShipsLedgerEntry
{
    constructor(ShipLedgerEntryRow)
    {
        this.BankTransactionId =ShipLedgerEntryRow.bankTransactionId;
        this.Day =ShipLedgerEntryRow.day;
        this.Year =ShipLedgerEntryRow.year;
        this.Time =ShipLedgerEntryRow.time;
        this.Description =ShipLedgerEntryRow.description;
        this.RunningTotal =ShipLedgerEntryRow.runningTotal;
        this.Revenue =ShipLedgerEntryRow.revenue;
        this.Expense =ShipLedgerEntryRow.expense;
        this.StarSystem =ShipLedgerEntryRow.starSystem;
        this.SystemUWP =ShipLedgerEntryRow.systemUWP;
    }
}



async function getShipLedgerAPIData()
{
    try
    {
        const resp = await fetch("https://localhost:7181/api/ShipsLedger/1/1", {method:"GET"})

        if (!resp.ok)
        {
            throw new Error('HTTP error! Status: ${resp.status}');
        }

        const respObject = await resp.json()

        const ShipLedgerDataArray =respObject.data.map(Ledger => new ShipsLedgerEntry(Ledger));

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
        Table.appendChild(HeaderRow);

        const ScrollableContainer = document.createElement("div");
        ScrollableContainer.className = "CustomTableContainer";


        //Add data rows.
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
