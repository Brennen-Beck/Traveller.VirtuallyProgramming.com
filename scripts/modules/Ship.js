export class Ship 
{
    constructor(ShipDataResultSet) 
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

