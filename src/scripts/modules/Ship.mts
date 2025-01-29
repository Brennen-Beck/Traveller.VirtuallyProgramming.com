// Define an interface for ShipDataResultSet
interface ShipDataResultSet {
    ShipName: string | null;
    HullSize: number | null;
    JDrive: number | null;
    FuelCapacity: number | null;
    FuelOnboard: number | null;
    RefinedFuel: boolean;
    ShipsBank: number | null;
    Day: number | null;
    Year: number | null;
    Time: string | null;
    CargoSpace: number | null;
    CargoSpaceFilled: number | null;
    System: string | null;
    SystemUWP: string | null;
    CrewStandardOfLiving: number | null;
    PassengersStandardOfLiving: number | null;
    MaintenanceDay: number | null;
    MaintenanceYear: number | null;
    MaintenanceDue: number | null;
    Mortgage: number | null;
    Payments: number | null;
    MortgageYear: number | null;
    MortgageDay: number | null;
    MortgageDue: number | null;
    BuyBrokerAttempts: number | null;
    SellBrokerAttempts: number | null;
    PreparingForDeparture: boolean;
    LowBerths: number | null;
    LowPassengers: number | null;
    Basic: number | null;
    BasicPassengers: number | null;
    Middle: number | null;
    MiddlePassengers: number | null;
    High: number | null;
    HighPassengers: number | null;
    Luxury: number | null;
    LuxuryPassengers: number | null;
    DeclaredDestination: string | null;
    DeclaredDestinationSector: number | null;
    DeclaredDestinationSystem: number | null;
}

// TypeScript class definition
export class Ship {
    ShipName: string | null;
    HullSize: number | null;
    JDrive: number | null;
    FuelCapacity: number | null;
    FuelOnboard: number | null;
    RefinedFuel: boolean;
    ShipsBank: number | null;
    Day: number | null;
    Year: number | null;
    Time: string | null;
    CargoSpace: number | null;
    CargoSpaceFilled: number | null;
    System: string | null;
    SystemUWP: string | null;
    CrewStandardOfLiving: number | null;
    PassengersStandardOfLiving: number | null;
    MaintenanceDay: number | null;
    MaintenanceYear: number | null;
    MaintenanceDue: number | null;
    Mortgage: number | null;
    Payments: number | null;
    MortgageYear: number | null;
    MortgageDay: number | null;
    MortgageDue: number | null;
    BuyBrokerAttempts: number | null;
    SellBrokerAttempts: number | null;
    PreparingForDeparture: boolean;
    LowBerths: number | null;
    LowPassengers: number | null;
    Basic: number | null;
    BasicPassengers: number | null;
    Middle: number | null;
    MiddlePassengers: number | null;
    High: number | null;
    HighPassengers: number | null;
    Luxury: number | null;
    LuxuryPassengers: number | null;
    DeclaredDestination: string | null;
    DeclaredDestinationSector: number | null;
    DeclaredDestinationSystem: number | null;

    constructor(ShipDataResultSet: ShipDataResultSet) {
        // Directly assign values to class properties
        this.ShipName = ShipDataResultSet.ShipName || null;
        this.HullSize = ShipDataResultSet.HullSize || null;
        this.JDrive = ShipDataResultSet.JDrive || null;
        this.FuelCapacity = ShipDataResultSet.FuelCapacity || null;
        this.FuelOnboard = ShipDataResultSet.FuelOnboard || null;
        this.RefinedFuel = ShipDataResultSet.RefinedFuel || false;
        this.ShipsBank = ShipDataResultSet.ShipsBank || null;
        this.Day = ShipDataResultSet.Day || null;
        this.Year = ShipDataResultSet.Year || null;
        this.Time = ShipDataResultSet.Time || null;
        this.CargoSpace = ShipDataResultSet.CargoSpace || null;
        this.CargoSpaceFilled = ShipDataResultSet.CargoSpaceFilled || null;
        this.System = ShipDataResultSet.System || null;
        this.SystemUWP = ShipDataResultSet.SystemUWP || null;
        this.CrewStandardOfLiving = ShipDataResultSet.CrewStandardOfLiving || null;
        this.PassengersStandardOfLiving = ShipDataResultSet.PassengersStandardOfLiving || null;
        this.MaintenanceDay = ShipDataResultSet.MaintenanceDay || null;
        this.MaintenanceYear = ShipDataResultSet.MaintenanceYear || null;
        this.MaintenanceDue = ShipDataResultSet.MaintenanceDue || null;
        this.Mortgage = ShipDataResultSet.Mortgage || null;
        this.Payments = ShipDataResultSet.Payments || null;
        this.MortgageYear = ShipDataResultSet.MortgageYear || null;
        this.MortgageDay = ShipDataResultSet.MortgageDay || null;
        this.MortgageDue = ShipDataResultSet.MortgageDue || null;
        this.BuyBrokerAttempts = ShipDataResultSet.BuyBrokerAttempts || null;
        this.SellBrokerAttempts = ShipDataResultSet.SellBrokerAttempts || null;
        this.PreparingForDeparture = ShipDataResultSet.PreparingForDeparture || false;
        this.LowBerths = ShipDataResultSet.LowBerths || null;
        this.LowPassengers = ShipDataResultSet.LowPassengers || null;
        this.Basic = ShipDataResultSet.Basic || null;
        this.BasicPassengers = ShipDataResultSet.BasicPassengers || null;
        this.Middle = ShipDataResultSet.Middle || null;
        this.MiddlePassengers = ShipDataResultSet.MiddlePassengers || null;
        this.High = ShipDataResultSet.High || null;
        this.HighPassengers = ShipDataResultSet.HighPassengers || null;
        this.Luxury = ShipDataResultSet.Luxury || null;
        this.LuxuryPassengers = ShipDataResultSet.LuxuryPassengers || null;
        this.DeclaredDestination = ShipDataResultSet.DeclaredDestination || null;
        this.DeclaredDestinationSector = ShipDataResultSet.DeclaredDestinationSector || null;
        this.DeclaredDestinationSystem = ShipDataResultSet.DeclaredDestinationSystem || null;
    }
}


/*

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

*/