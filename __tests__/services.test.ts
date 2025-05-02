import { getMetar, getTaf } from "../Services/WeatherService";
import { describe, expect, it, beforeAll } from '@jest/globals';

let validMetarResponse: string;
let invalidMetarResponse: string;

describe("METAR Service", () => {
    beforeAll(async () => {
        validMetarResponse = await getMetar("KATL");
        invalidMetarResponse = await getMetar("XXXX");
    });

    it("should return a non-empty string", () => {
        expect(validMetarResponse.trim().length).toBeGreaterThan(0);
    });

    it("should contain the same ICAO code as the request", () => {
        expect(validMetarResponse).toContain("KATL");
    });

    it("should contain a Zulu time group (DDHHMMZ)", () => {
        expect(validMetarResponse).toMatch(/\b\d{6}Z\b/);
    });

    it("should return an empty string for an invalid ICAO", () => {
        expect(invalidMetarResponse.trim().length).toBe(0);
    });
});

/* ====================================================================== */

let validTafResponse: string;
let invalidTafResponse: string;

describe("TAF Service", () => {
    beforeAll(async () => {
        validTafResponse = await getTaf("KATL");
        invalidTafResponse = await getTaf("XXXX");
    });

    it("should return a non-empty string", () => {
        expect(validTafResponse.trim().length).toBeGreaterThan(0);
    });

    it("should contain the same ICAO code as the request", () => {
        expect(validTafResponse).toContain("KATL");
    });

    it("should contain a Zulu time group (DDHHMMZ)", () => {
        expect(validTafResponse).toMatch(/\b\d{6}Z\b/);
    });

    it("should return an empty string for an invalid ICAO", () => {
        expect(invalidTafResponse.trim().length).toBe(0);
    });
});