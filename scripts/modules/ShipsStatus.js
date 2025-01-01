import { LocalGameID } from "./Globals.js";
import { TravellerAPIWebSiteURL } from "./Globals.js";


class Ship 
{
    constructor(ShipDataResultSet) //, HullSize, JDrive, FuelCapacity, FuelOnboard, RefinedFuel, ShipsBank, Day, Year, Time, CargoSpace,CargoSpaceFree, System, SystemUWP, CrewStandardOfLiving, PassengersStandardOfLiving, MaintenanceDay, MaintenanceYear, Mortgage, Payments, BuyBrokerAttempts, SellBrokerAttempts, LowBerths, LowPassengers, Basic, BasicPassengers, Middle, MiddlePassengers, High, HighPassengers, Luxury, LuxuryPassengers, PassengerDestination, PassengerDestinationSector, PassengerDestinationSystem)
    {
        this.ShipName =ShipDataResultSet.ShipName;
        this.HullSize =ShipDataResultSet.HullSize;
        this.JDrive =ShipDataResultSet.JDrive;
        this.FuelCapacity =ShipDataResultSet.FuelCapacity;
        this.FuelOnboard =ShipDataResultSet.FuelOnboard;
        this.RefinedFuel =ShipDataResultSet.RefinedFuel;
        this.ShipsBank =ShipDataResultSet.ShipsBank;
        this.Day =ShipDataResultSet.Day;
        this.Year =ShipDataResultSet.Year;
        this.Time =ShipDataResultSet.Time;
        this.CargoSpace =ShipDataResultSet.CargoSpace;
        this.CargoSpaceFilled =ShipDataResultSet.CargoSpaceFilled;
        this.System =ShipDataResultSet.System;
        this.SystemUWP =ShipDataResultSet.SystemUWP;
        this.CrewStandardOfLiving =ShipDataResultSet.CrewStandardOfLiving;
        this.PassengersStandardOfLiving =ShipDataResultSet.PassengersStandardOfLiving;
        this.MaintenanceDay =ShipDataResultSet.MaintenanceDay;
        this.MaintenanceYear =ShipDataResultSet.MaintenanceYear;
        this.MaintenanceDue =ShipDataResultSet.MaintenanceDue;
        this.Mortgage =ShipDataResultSet.Mortgage;
        this.Payments =ShipDataResultSet.Payments;
        this.MortgageDay =ShipDataResultSet.MortgageDay;
        this.MortgageYear =ShipDataResultSet.MortgageYear;
        this.MortgageDue =ShipDataResultSet.MortgageDue;
        this.BuyBrokerAttempts =ShipDataResultSet.BuyBrokerAttempts;
        this.SellBrokerAttempts =ShipDataResultSet.SellBrokerAttempts;
        this.PreparingForDeparture =ShipDataResultSet.PreparingForDeparture;
        this.LowBerths =ShipDataResultSet.LowBerths;
        this.LowPassengers =ShipDataResultSet.LowPassengers;
        this.Basic =ShipDataResultSet.Basic;
        this.BasicPassengers =ShipDataResultSet.BasicPassengers;
        this.Middle =ShipDataResultSet.Middle;
        this.MiddlePassengers =ShipDataResultSet.MiddlePassengers;
        this.High =ShipDataResultSet.High;
        this.HighPassengers =ShipDataResultSet.HighPassengers;
        this.Luxury =ShipDataResultSet.Luxury;
        this.LuxuryPassengers =ShipDataResultSet.LuxuryPassengers;
        this.DeclaredDestination =ShipDataResultSet.DeclaredDestination;
        this.DeclaredDestinationSector =ShipDataResultSet.DeclaredDestinationSector;
        this.DeclaredDestinationSystem =ShipDataResultSet.DeclaredDestinationSystem;
    }
}



async function getMyAPIData()
{
    try
    {
        const resp = await fetch(TravellerAPIWebSiteURL+"/ShipData/" + LocalGameID + "/1", {method:"GET"})

        if (!resp.ok)
        {
            throw new Error('HTTP error! Status: ${resp.status}');
        }

        const respObject = await resp.json()

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

    if (!ShipData)
    {
        console.log("Somin' ain't right!")
    }
    else
    {
        console.log(ShipData)
        document.getElementById("ShipNameText").innerHTML =ShipData.ShipName;        
        document.getElementById("DepartureStatusText").innerHTML =((ShipData.PreparingForDeparture === true) ? "The ship is preparing for departure. (Buy Goods)" : "The ship is unprepared for departure. (Sell Goods)");        

        SetInputBoxData("Stardate", `${ShipData.Day}, ${ShipData.Year} - ${ShipData.Time}`);
        SetInputBoxData("ShipsLocation", `${ShipData.System}, (${ShipData.SystemUWP})`);
        SetInputBoxData("DeclaredDestination", `${ShipData.DeclaredDestination}`);

        SetInputBoxData("ShipsFuel", `${ShipData.FuelOnboard} of ${ShipData.FuelCapacity} (${(ShipData.RefinedFuel === true) ? "Refined" : "Unrefined"})`);
        SetInputBoxData("DeclaredDestination", `${ShipData.DeclaredDestination}`);
        SetInputBoxData("CargoHold", `${ShipData.CargoSpaceFilled} of ${ShipData.CargoSpace} dTons Filled`);
        
        SetInputBoxData("ShipsBank", `${ShipData.ShipsBank.toLocaleString()}Cr`);
        SetInputBoxData("LastMaintenance", `${ShipData.MaintenanceDay}, ${ShipData.MaintenanceYear}  (${ShipData.MaintenanceDue<0 ? Math.abs(ShipData.MaintenanceDue) + " days ago" : "Due in " + ShipData.MaintenanceDue + " days"})`);
        if (ShipData.MortgageYear !== null)
        {
            SetInputBoxData("ShipsMortgage",
                `${ShipData.MortgageDay}, ${ShipData.MortgageYear}  (${(ShipData.MortgageDue <0 ? Math.abs(ShipData.MortgageDue) + " days ago" : "In " + ShipData.MortgageDue + "days")})`);
        }
        else
        {
            SetInputBoxData("ShipsMortgage", `The ship has no mortgage.`);
        }
        SetInputBoxData("PaymentsMade", `${ShipData.Payments} of 520`);
        SetInputBoxData("PaymentAmount", `${ShipData.Mortgage}Cr`);

        SetInputBoxData("HullSize", `${ShipData.HullSize} dTons`);
        SetInputBoxData("JDrive", `J-${ShipData.JDrive}`);

        SetInputBoxData("LowBerth", `${ShipData.LowPassengers} of ${ShipData.LowBerths}`);
        SetInputBoxData("BasicPassage", `${ShipData.BasicPassengers} of ${ShipData.Basic}`);
        SetInputBoxData("MiddlePassage", `${ShipData.MiddlePassengers} of ${ShipData.Middle}`);
        SetInputBoxData("HighPassage", `${ShipData.HighPassengers} of ${ShipData.High}`);
        SetInputBoxData("LuxuryPassage", `${ShipData.LuxuryPassengers} of ${ShipData.Luxury}`);
    }


    function SetInputBoxData(Selector, Value)
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
