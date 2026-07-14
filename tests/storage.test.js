import { describe, it, expect } from "vitest";
import { getNumber, setNumber, getBoolean, setBoolean } from "../src/storage.js";

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
    _data: data,
  };
}

describe("getNumber", () => {
  it("returns the stored number", () => {
    const storage = fakeStorage({ count: "3" });
    expect(getNumber("count", 0, storage)).toBe(3);
  });

  it("falls back when the key is missing", () => {
    const storage = fakeStorage();
    expect(getNumber("count", 7, storage)).toBe(7);
  });

  it("falls back on malformed (non-numeric) values", () => {
    const storage = fakeStorage({ count: "not-a-number" });
    expect(getNumber("count", 7, storage)).toBe(7);
  });

  it("falls back when storage is unavailable (null)", () => {
    expect(getNumber("count", 5, null)).toBe(5);
  });

  it("falls back when storage throws", () => {
    const storage = {
      getItem() {
        throw new Error("blocked");
      },
    };
    expect(getNumber("count", 2, storage)).toBe(2);
  });
});

describe("setNumber", () => {
  it("writes a stringified number", () => {
    const storage = fakeStorage();
    setNumber("count", 42, storage);
    expect(storage._data.count).toBe("42");
  });

  it("does not throw when storage is unavailable", () => {
    expect(() => setNumber("count", 1, null)).not.toThrow();
  });

  it("does not throw when storage.setItem throws", () => {
    const storage = {
      setItem() {
        throw new Error("quota exceeded");
      },
    };
    expect(() => setNumber("count", 1, storage)).not.toThrow();
  });
});

describe("getBoolean / setBoolean", () => {
  it("round-trips true and false", () => {
    const storage = fakeStorage();
    setBoolean("muted", true, storage);
    expect(getBoolean("muted", false, storage)).toBe(true);
    setBoolean("muted", false, storage);
    expect(getBoolean("muted", true, storage)).toBe(false);
  });

  it("falls back on an unrecognized stored value", () => {
    const storage = fakeStorage({ muted: "yes" });
    expect(getBoolean("muted", false, storage)).toBe(false);
  });

  it("falls back when the key is missing", () => {
    const storage = fakeStorage();
    expect(getBoolean("muted", true, storage)).toBe(true);
  });
});
