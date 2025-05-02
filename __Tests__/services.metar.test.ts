import { getMetar } from "../Services/MetarService";
import { describe, expect, it, beforeAll } from '@jest/globals';

let validResponse: string;
let invalidResponse: string;

describe("METAR Service", () => {
    beforeAll(async () => {
        validResponse = await getMetar("KATL");
        invalidResponse = await getMetar("XXXX");
    });

    it("should return a non-empty string", () => {
        expect(validResponse.trim().length).toBeGreaterThan(0);
    });

    it("should contain the same ICAO code as the request", () => {
        expect(validResponse).toContain("KATL");
    });

    it("should contain a Zulu time group (DDHHMMZ)", () => {
        expect(validResponse).toMatch(/\b\d{6}Z\b/);
    });

    it("should return an empty string for an invalid ICAO", () => {
        expect(invalidResponse.trim().length).toBe(0);
    });
});