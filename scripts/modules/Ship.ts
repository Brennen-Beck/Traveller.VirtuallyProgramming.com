import { z } from 'zod';


// Define Zod schema for validating ShipDataResultSet based on C# model
const ShipDataSchema = z.object({
    ShipName: z.string().max(60).nullable(),
    HullSize: z.number().int().nullable(),
    JDrive: z.number().int().nullable(),
    FuelCapacity: z.number().max(99999999999.9).nullable(),
    FuelOnboard: z.number().int().nullable(),
    RefinedFuel: z.boolean(),
    ShipsBank: z.number().int().nullable(),
    Day: z.number().int().nullable(),
    Year: z.number().int().nullable(),
    Time: z.string().nullable(), // In C# it's TimeSpan, but we treat it as a string for simplicity
    CargoSpace: z.number().int().nullable(),
    CargoSpaceFilled: z.number().int().nullable(),
    System: z.string().max(50).nullable(),
    SystemUWP: z.string().max(8).nullable(),
    CrewStandardOfLiving: z.number().int().nullable(),
    PassengersStandardOfLiving: z.number().int().nullable(),
    MaintenanceDay: z.number().int().nullable(),
    MaintenanceYear: z.number().int().nullable(),
    MaintenanceDue: z.boolean().nullable(),
    Mortgage: z.number().int().nullable(),
    Payments: z.number().int().nullable(),
    MortgageYear: z.number().int().nullable(),
    MortgageDay: z.number().int().nullable(),
    MortgageDue: z.boolean().nullable(),
    BuyBrokerAttempts: z.number().int().nullable(),
    SellBrokerAttempts: z.number().int().nullable(),
    PreparingForDeparture: z.boolean(),
    LowBerths: z.number().int().nullable(),
    LowPassengers: z.number().int().nullable(),
    Basic: z.number().int().nullable(),
    BasicPassengers: z.number().int().nullable(),
    Middle: z.number().int().nullable(),
    MiddlePassengers: z.number().int().nullable(),
    High: z.number().int().nullable(),
    HighPassengers: z.number().int().nullable(),
    Luxury: z.number().int().nullable(),
    LuxuryPassengers: z.number().int().nullable(),
    DeclaredDestination: z.string().max(50).nullable(),
    DeclaredDestinationSector: z.number().int().nullable(),
    DeclaredDestinationSystem: z.number().int().nullable(),
});

// TypeScript class definition with Zod validation
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
    MaintenanceDue: boolean | null;
    Mortgage: number | null;
    Payments: number | null;
    MortgageYear: number | null;
    MortgageDay: number | null;
    MortgageDue: boolean | null;
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

    constructor(ShipDataResultSet: unknown) {
        // Validate ShipDataResultSet using Zod
        const validatedData = ShipDataSchema.parse(ShipDataResultSet);

        // Assign validated data to class properties
        this.ShipName = validatedData.ShipName;
        this.HullSize = validatedData.HullSize;
        this.JDrive = validatedData.JDrive;
        this.FuelCapacity = validatedData.FuelCapacity;
        this.FuelOnboard = validatedData.FuelOnboard;
        this.RefinedFuel = validatedData.RefinedFuel;
        this.ShipsBank = validatedData.ShipsBank;
        this.Day = validatedData.Day;
        this.Year = validatedData.Year;
        this.Time = validatedData.Time;
        this.CargoSpace = validatedData.CargoSpace;
        this.CargoSpaceFilled = validatedData.CargoSpaceFilled;
        this.System = validatedData.System;
        this.SystemUWP = validatedData.SystemUWP;
        this.CrewStandardOfLiving = validatedData.CrewStandardOfLiving;
        this.PassengersStandardOfLiving = validatedData.PassengersStandardOfLiving;
        this.MaintenanceDay = validatedData.MaintenanceDay;
        this.MaintenanceYear = validatedData.MaintenanceYear;
        this.MaintenanceDue = validatedData.MaintenanceDue;
        this.Mortgage = validatedData.Mortgage;
        this.Payments = validatedData.Payments;
        this.MortgageYear = validatedData.MortgageYear;
        this.MortgageDay = validatedData.MortgageDay;
        this.MortgageDue = validatedData.MortgageDue;
        this.BuyBrokerAttempts = validatedData.BuyBrokerAttempts;
        this.SellBrokerAttempts = validatedData.SellBrokerAttempts;
        this.PreparingForDeparture = validatedData.PreparingForDeparture;
        this.LowBerths = validatedData.LowBerths;
        this.LowPassengers = validatedData.LowPassengers;
        this.Basic = validatedData.Basic;
        this.BasicPassengers = validatedData.BasicPassengers;
        this.Middle = validatedData.Middle;
        this.MiddlePassengers = validatedData.MiddlePassengers;
        this.High = validatedData.High;
        this.HighPassengers = validatedData.HighPassengers;
        this.Luxury = validatedData.Luxury;
        this.LuxuryPassengers = validatedData.LuxuryPassengers;
        this.DeclaredDestination = validatedData.DeclaredDestination;
        this.DeclaredDestinationSector = validatedData.DeclaredDestinationSector;
        this.DeclaredDestinationSystem = validatedData.DeclaredDestinationSystem;
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