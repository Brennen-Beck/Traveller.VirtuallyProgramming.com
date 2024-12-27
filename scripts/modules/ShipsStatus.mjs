class Ship 
{
    constructor(ShipDataResultSet) //, HullSize, JDrive, FuelCapacity, FuelOnboard, RefinedFuel, ShipsBank, Day, Year, Time, CargoSpace,CargoSpaceFree, System, SystemUWP, CrewStandardOfLiving, PassengersStandardOfLiving, MaintenanceDay, MaintenanceYear, Mortgage, Payments, BuyBrokerAttempts, SellBrokerAttempts, LowBerths, LowPassengers, Basic, BasicPassengers, Middle, MiddlePassengers, High, HighPassengers, Luxury, LuxuryPassengers, PassengerDestination, PassengerDestinationSector, PassengerDestinationSystem)
    {
        
        this.ShipName =ShipDataResultSet.shipName;
        this.HullSize =ShipDataResultSet.hullSize;
        this.JDrive =ShipDataResultSet.jDrive;
        this.FuelCapacity =ShipDataResultSet.fuelCapacity;
        this.FuelOnboard =ShipDataResultSet.fuelOnboard;
        this.RefinedFuel =ShipDataResultSet.refinedFuel;
        this.ShipsBank =ShipDataResultSet.shipsBank;
        this.Day =ShipDataResultSet.day;
        this.Year =ShipDataResultSet.year;
        this.Time =ShipDataResultSet.time;
        this.CargoSpace =ShipDataResultSet.cargoSpace;
        this.CargoSpaceFilled =ShipDataResultSet.cargoSpaceFilled;
        this.System =ShipDataResultSet.system;
        this.SystemUWP =ShipDataResultSet.systemUWP;
        this.CrewStandardOfLiving =ShipDataResultSet.crewStandardOfLiving;
        this.PassengersStandardOfLiving =ShipDataResultSet.passengersStandardOfLiving;
        this.MaintenanceDay =ShipDataResultSet.maintenanceDay;
        this.MaintenanceYear =ShipDataResultSet.maintenanceYear;
        this.MaintenanceDue =ShipDataResultSet.maintenanceDue;
        this.Mortgage =ShipDataResultSet.mortgage;
        this.Payments =ShipDataResultSet.payments;
        this.MortgageDay =ShipDataResultSet.mortgageDay;
        this.MortgageYear =ShipDataResultSet.mortgageYear;
        this.MortgageDue =ShipDataResultSet.mortgageDue;
        this.BuyBrokerAttempts =ShipDataResultSet.buyBrokerAttempts;
        this.SellBrokerAttempts =ShipDataResultSet.sellBrokerAttempts;
        this.PreparingForDeparture =ShipDataResultSet.preparingForDeparture;
        this.LowBerths =ShipDataResultSet.lowBerths;
        this.LowPassengers =ShipDataResultSet.lowPassengers;
        this.Basic =ShipDataResultSet.basic;
        this.BasicPassengers =ShipDataResultSet.basicPassengers;
        this.Middle =ShipDataResultSet.middle;
        this.MiddlePassengers =ShipDataResultSet.middlePassengers;
        this.High =ShipDataResultSet.high;
        this.HighPassengers =ShipDataResultSet.highPassengers;
        this.Luxury =ShipDataResultSet.luxury;
        this.LuxuryPassengers =ShipDataResultSet.luxuryPassengers;
        this.DeclaredDestination =ShipDataResultSet.declaredDestination;
        this.DeclaredDestinationSector =ShipDataResultSet.declaredDestinationSector;
        this.DeclaredDestinationSystem =ShipDataResultSet.declaredDestinationSystem;

    }
}



async function getMyAPIData()
{
    try
    {
        const resp = await fetch("https://localhost:7181/api/ShipData/1/1", {method:"GET"})

        if (!resp.ok)
        {
            throw new Error('HTTP error! Status: ${resp.status}');
        }

        const respObject = await resp.json()

        const ShipStatusData = new Ship(respObject.data[0]);

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
    }
})();
