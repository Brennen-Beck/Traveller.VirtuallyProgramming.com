import { LocalGameID, TravellerAPIWebSiteURL, Ship } from "./Globals.js";


async function getMyAPIData(): Promise<Ship | undefined>
{
    try
    {
        //fetch is a double promise because its response is a promise. Await blocks which is why it's called inside an Async which does not block.
        const resp = await fetch(TravellerAPIWebSiteURL+"/ShipData/" + LocalGameID + "/1", {method:"GET"})

        if (!resp.ok)
        {
            throw new Error('HTTP error! Status: ${resp.status}');
        }

        const respObject = await resp.json()    //Second promise.

        const ShipStatusData = new Ship(respObject.Data[0]);

        return ShipStatusData;
    }
    catch(error)
    {
        console.error("Error calling the WebAPI for ShipData.", error);
        return;
    }
}
  

(async () => 
{
    const ShipData = await getMyAPIData()
    let Fields: Array<{ selector: string; label: string; value: string }> =[];

    if (!ShipData)
    {
        console.log("Somin' ain't right!")
    }
    else
    {
        document.getElementById("ShipNameText")!.innerHTML =ShipData.ShipName || "Unknown Ship";        
        document.getElementById("DepartureStatusText")!.innerHTML =((ShipData.PreparingForDeparture === true) ? "The ship is preparing for departure. (Buy Goods)" : "The ship is unprepared for departure. (Sell Goods)");        


        Fields = [
            { selector: 'Stardate', label: "Stardate", value: `${ShipData.Day}, ${ShipData.Year} - ${ShipData.Time}`},
            { selector: 'ShipsLocation', label: "Ship's Location", value: `${ShipData.System}, (${ShipData.SystemUWP})`},
            { selector: 'DeclaredDestination', label: "Destination", value: `${ShipData.DeclaredDestination}`},
            { selector: 'ShipsFuel', label: "Fuel Onboard", value: `${ShipData.FuelOnboard} of ${ShipData.FuelCapacity} (${(ShipData.RefinedFuel === true) ? "Refined" : "Unrefined"})`},
            { selector: 'CargoHold', label: "Cargo Hold", value: `${ShipData.CargoSpaceFilled} of ${ShipData.CargoSpace} dTons Filled`},
        ];
        SetTravellerFrame("ShipStatus", Fields);

        
        Fields = [
            { selector: 'ShipsBank', label: "Ship's Bank", value: `${ShipData.ShipsBank?.toLocaleString()}Cr`},
            { selector: 'LastMaintenance', label: 'Last Maintenance', value: `${ShipData.MaintenanceDay}, ${ShipData.MaintenanceYear}  (${(ShipData.MaintenanceDue ?? 0)<0 ? Math.abs(ShipData.MaintenanceDue ?? 0) + " days ago" : "Due in " + (ShipData.MaintenanceDue ?? 0) + " days"})`},
        ];
        if (ShipData.MortgageYear !== null)
        {
            Fields.push({ selector: 'ShipsMortgage', label: "Ship's Bank", value: `${ShipData.MortgageDay}, ${ShipData.MortgageYear}  (${((ShipData.MortgageDue ?? 0) <0 ? Math.abs(ShipData.MortgageDue ?? 0) + " days ago" : "In " + (ShipData.MortgageDue ?? 0) + "days")})`});
        }
        else
        {
            Fields.push({ selector: 'ShipsMortgage', label: "Ship's Mortgage", value: `The ship has no mortgage.`,});
        }
        Fields.push({ selector: 'PaymentsMade', label: 'Payments Made', value: `${ShipData.Payments} of 520`});
        Fields.push({ selector: 'PaymentAmount', label: 'Payment Amount', value: `${ShipData.Mortgage}Cr`});
        SetTravellerFrame("Finance", Fields);


        Fields = [
            { selector: 'HullSize', label: "Hull Size", value: `${ShipData.HullSize} dTons`},
            { selector: 'JDrive', label: "J-Drive", value: `J-${ShipData.JDrive}`},
        ];
        SetTravellerFrame("ShipProperties", Fields);

        
        Fields = [
            { selector: 'LowBerth', label: 'Low Berth', value: `${ShipData.LowPassengers} of ${ShipData.LowBerths}`},
            { selector: 'BasicPassage', label: 'Basic Passage', value: `${ShipData.BasicPassengers} of ${ShipData.Basic}` },
            { selector: 'MiddlePassage', label: 'Middle Passage', value: `${ShipData.MiddlePassengers} of ${ShipData.Middle}`},
            { selector: 'HighPassage', label: 'High Passage', value: `${ShipData.HighPassengers} of ${ShipData.High}`},
            { selector: 'LuxuryPassage', label: 'Luxury Passage', value: `${ShipData.LuxuryPassengers} of ${ShipData.Luxury}`},
        ];
        SetTravellerFrame("Passengers", Fields);
    }



    function SetTravellerFrame(Selector: string, Fields: Array<{ selector: string; label: string; value: string }>): void
    {
        const Frame = document.querySelector(`traveller-frame[selector='${Selector}']`) as HTMLElement & { Fields: unknown };

        if(Frame)
        {
            Frame.Fields =Fields;
        }
        else
        {
            console.error(`Frame element with selector '${Selector}' not found.`);
        }
    }


    function SetInputBoxData(Selector: string, Value: string)
    {
        const InputBoxComponent=document.querySelector(`traveller-text-field[selector='${Selector}']`);

        if (InputBoxComponent)
        {
            InputBoxComponent.setAttribute('value', Value);
        }
        else
        {
            console.error(`Element with selector '${Selector}' not found.`);
        }
    }

})();



