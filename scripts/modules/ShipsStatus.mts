import {z} from 'zod';
import { LocalGameID, TravellerAPIWebSiteURL } from "./Globals.js";

console.log('Made it to ShipStatus.ts');


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
    MaintenanceDue: z.number().nullable(),
    Mortgage: z.number().int().nullable(),
    Payments: z.number().int().nullable(),
    MortgageYear: z.number().int().nullable(),
    MortgageDay: z.number().int().nullable(),
    MortgageDue: z.number().nullable(),
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