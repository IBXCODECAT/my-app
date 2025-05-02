import { getTaf } from "../Services/TafService";
import { describe, expect, it, beforeAll } from '@jest/globals';

let validResponse: string;
let invalidResponse: string;

describe("TAF Service", () => {
    beforeAll(async () => {
        validResponse = await getTaf("KATL");
        invalidResponse = await getTaf("XXXX");
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