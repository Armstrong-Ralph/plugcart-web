import { describe, expect, it } from "vitest";

/**
 * Test to validate Paystack public key is properly configured.
 * The public key should be available as an environment variable and follow Paystack's format.
 */
describe("Paystack Integration", () => {
  it("should have Paystack public key configured", () => {
    const publicKey = process.env.VITE_PAYSTACK_PUBLIC_KEY;
    
    // Verify the key exists
    expect(publicKey).toBeDefined();
    expect(publicKey).toBeTruthy();
    
    // Verify it follows Paystack's public key format (starts with pk_live_ or pk_test_)
    expect(publicKey).toMatch(/^pk_(live|test)_/);
  });

  it("should have correct Paystack public key format", () => {
    const publicKey = process.env.VITE_PAYSTACK_PUBLIC_KEY;
    
    // Paystack public keys are typically 40+ characters
    expect(publicKey).toBeDefined();
    expect(publicKey!.length).toBeGreaterThan(20);
    
    // Should be a valid hex string after the prefix
    const keyWithoutPrefix = publicKey!.replace(/^pk_(live|test)_/, "");
    expect(/^[a-f0-9]+$/.test(keyWithoutPrefix)).toBe(true);
  });
});
