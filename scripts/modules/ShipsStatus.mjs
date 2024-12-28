import { LocalGameID } from "./Globals.mjs";


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
        const resp = await fetch("https://localhost:7181/api/ShipData/" + LocalGameID + "/1", {method:"GET"})

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
        document.getElementById("StarDate").innerHTML =ShipData.Day + ", " + ShipData.Year + " - " + ShipData.Time;  
        document.getElementById("ShipsLocation").innerHTML =ShipData.System + " (" + ShipData.SystemUWP + ")";        
        document.getElementById("DeclaredDestination").innerHTML =ShipData.DeclaredDestination;
        document.getElementById("ShipsFuel").innerHTML =ShipData.FuelOnboard + " of " + ShipData.FuelCapacity + " " + ((ShipData.RefinedFuel === true) ? "Refined" : "Unrefined");        
        document.getElementById("CargoHold").innerHTML =ShipData.CargoSpaceFilled + " of " + ShipData.CargoSpace + " dTons Filled";        
        document.getElementById("ShipsBank").innerHTML =ShipData.ShipsBank.toLocaleString()+ "Cr";        
        document.getElementById("LastMaintenance").innerHTML =ShipData.MaintenanceDay + ", " + ShipData.MaintenanceYear + "  (" + ((ShipData.MaintenanceDue <0) ? Math.abs(ShipData.MaintenanceDue) + " days ago" : "In " + ShipData.MaintenanceDue + "days") + ")";        
        if (ShipData.MortgageYear !== null)
        {
            document.getElementById("ShipsMortgage").innerHTML =ShipData.MortgageDay + ", " + ShipData.MortgageYear + "  (" + ((ShipData.MortgageDue <0) ? Math.abs(ShipData.MortgageDue) + " days ago" : "In " + ShipData.MortgageDue + "days") + ")";        
        }
        else
        {
            document.getElementById("ShipsMortgage").innerHTML ="The ship has no mortgage.";
        }
        document.getElementById("PaymentsMade").innerHTML =ShipData.Payments +" of 520";
        document.getElementById("PaymentAmount").innerHTML =ShipData.Mortgage +"Cr";
        document.getElementById("HullSize").innerHTML =ShipData.HullSize +" dTons";
        document.getElementById("JDrive").innerHTML ="J-" + ShipData.JDrive ;

        document.getElementById("LowBerth").innerHTML =ShipData.LowPassengers + " of " + ShipData.LowBerths;
        document.getElementById("BasicPassage").innerHTML =ShipData.BasicPassengers + " of " + ShipData.Basic;
        document.getElementById("MiddlePassage").innerHTML =ShipData.MiddlePassengers + " of " + ShipData.Middle;
        document.getElementById("HighPassage").innerHTML =ShipData.HighPassengers + " of " + ShipData.High;
        document.getElementById("LuxuryPassage").innerHTML =ShipData.LuxuryPassengers + " of " + ShipData.Luxury;
    }
})();
