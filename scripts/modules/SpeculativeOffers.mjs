import { LocalGameID } from "./Globals.mjs";


class SpeculativeOffer
{
    constructor(SpeculativeOfferRow)
    {
        this.OfferId =SpeculativeOfferRow.OfferId;
        this.TradeGood =SpeculativeOfferRow.TradeGood;
        this.BasePrice =SpeculativeOfferRow.BasePrice; 
        this.dTonsAvailable =SpeculativeOfferRow.dTonsAvailable;
        this.Price =SpeculativeOfferRow.Price;
        this.Percent =SpeculativeOfferRow.Percent;
        this.StarSystem =SpeculativeOfferRow.StarSystem;
        this.UWP =SpeculativeOfferRow.UWP;
        this.Day =SpeculativeOfferRow.Day;
        this.Year =SpeculativeOfferRow.Year;
        this.Time =SpeculativeOfferRow.Time;
        this.OfferType =SpeculativeOfferRow.OfferType;
        this.Attempt =SpeculativeOfferRow.Attempt;
    }
}


async function getSpeculativeOfferData()
{
    try
    {
        const resp = await fetch("https://localhost:7181/api/SpeculativeOffers/" + LocalGameID + "/1", {method:"GET"})

        if (!resp.ok)
        {
            throw new Error('HTTP error! Status: ${resp.status}');
        }

        const respObject = await resp.json()
        console.log("Raw API Data:", respObject.Data);

        const SpeculativeOffersDataArray =respObject.Data.map(Offer => new SpeculativeOffer(Offer));

        return SpeculativeOffersDataArray;
    }
    catch(error)
    {
        console.error("Error calling the WebAPI for Speculative Offers.", error);
        return[];
    }
}


(async () => 
    {
        const OffersArray = await getSpeculativeOfferData()
    
        if (!OffersArray)
        {
            console.log("Somin' ain't right!")
        }
        else
        {
            // Sort the speculative offers array in reverse order by OfferId
            OffersArray.sort((a, b) => b.OfferId - a.OfferId);
      
            DisplayOffersTable(OffersArray);
        }
    }
)();
    

function DisplayOffersTable(OffersArray)
{
    const TableContainer =document.getElementById("SpeculativeOfferData");

    if(TableContainer)
    {
        const Table =document.createElement("Table");
        Table.style.borderCollapse = "collapse"; // Remove visible borders
        Table.style.width = "100%"; // Ensure table takes full width
        Table.className = "CustomTable";
        const Caption =Table.createCaption();
        Caption.innerHTML ="Speculative Offers";
        Caption.style.textAlign = "left";

        const HeaderRow = document.createElement("tr");
        const Headers = ["ID", "Trade Good", "Base Price","dTons", "Price", "Percent", "Star System", "UWP", "Day", "Year", "Time", "Offer Type", "Attempt"];

        Headers.forEach((HeaderText, Index) => 
        {
            const th = document.createElement("th");
            th.textContent = HeaderText;
            th.style.padding = "5px"; // Add gutter
            if (HeaderText === "Trade Good") 
            {
                th.style.width = "40%"; // Set width for Description column
            }
            
            if (["Trade Good", "Star System", "UWP", "Offer Type"].includes(HeaderText))
            {
                th.style.textAlign = "left"; // Left justify the header columns                
            }
            else
            {
                th.style.textAlign = "right"; // Right-align numeric columns
            }
               
            HeaderRow.appendChild(th);
        });
        Table.appendChild(HeaderRow);

        const ScrollableContainer = document.createElement("div");
        ScrollableContainer.className = "CustomTableContainer";


        //Add data rows.
        OffersArray.forEach(Item =>
        {
            const Row =document.createElement("tr");

            Object.entries(Item).forEach(([Key, Value]) =>
            {
                const td =document.createElement("td");
                
                if(["TradeGood", "StarSystem", "UWP", "OfferType"].includes(Key))
                {
                    td.style.textAlign = "left"; // left-align numeric columns                          
                    td.textContent = Value;
                }
                else if (Key === "BasePrice" || Key === "Price")
                {
                    td.textContent =Value ? Value.toLocaleString() : ""; // Format numbers with commas  
                    td.style.textAlign = "right"; // Right-align ID column
                }
                else
                {
                    td.style.textAlign = "right"; // Right-align ID column
                    td.textContent = Value;     //Right-align all other columns.
                }
                

                td.style.padding = "5px"; // Add gutter
                td.style.boxSizing = "border-box"; // Ensure alignment matches the header
                if (Key === "TradeGood") 
                {
                    td.style.width = "40%"; // Set width for Description column
                }
                Row.appendChild(td);
            });
            Table.appendChild(Row);
        });

        // Clear any existing content and append the new table
        TableContainer.innerHTML = "";
        TableContainer.appendChild(Table);
    }
    else
    {
        console.error("Table container for the Speculative Offers was not found.");
    }

    return;
}
