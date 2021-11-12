const match = require("../src/brackets");

describe("Parentheses", () => {
  describe("()", () => {
    it("should return true for empty string", () => {
      const actual = match("");
      expect(actual).toEqual(true);
    });
    it("should return true for non-empty string with no parentheses", () => {
      const actual = match("a + b");
      expect(actual).toEqual(true);
    });
    it("should return true for expression with parentheses", () => {
      const actual = match("(a + b)");
      expect(actual).toEqual(true);
    });

    it("should return true for internal parentheses", () => {
      const actual = match("a + (b + c) + d");
      expect(actual).toEqual(true);
    });

    it("should return true for nested parentheses", () => {
      const actual = match("(a + (b + c)) + d");
      expect(actual).toEqual(true);
    });

    it("should return true for multiple sets of parentheses", () => {
      const actual = match("(b + c) + (d + e)");
      expect(actual).toEqual(true);
    });

    it("should return true for arbitrary nested parentheses", () => {
      const actual = match("a + (((b + c))) + d");
      expect(actual).toEqual(true);
    });

    it("should return false for missing open parentheses", () => {
      const actual = match("a + b + c) + d");
      expect(actual).toEqual(false);
    });

    it("should return false for missing close parentheses", () => {
      const actual = match("a + b + c + d");
      expect(actual).toEqual(true);
    });

    it("should return false for nested missing open parentheses", () => {
      const actual = match("a + ((b + c) + d");
      expect(actual).toEqual(false);
    });

    it("should return false for out of order parentheses", () => {
      const actual = match("a + b + c) + (d");
      expect(actual).toEqual(false);
    });
  });

  describe("[]", () => {
    it("should return true for empty string", () => {
      const actual = match("");
      expect(actual).toEqual(true);
    });
    it("should return true for non-empty string with no brackets", () => {
      const actual = match("a + b");
      expect(actual).toEqual(true);
    });

    it("should return true for expression with brackets", () => {
      const actual = match("[a + b]");
      expect(actual).toEqual(true);
    });

    it("should return true for internal brackets", () => {
      const actual = match("a + [b + c] + d");
      expect(actual).toEqual(true);
    });

    it("should return true for nested brackets", () => {
      const actual = match("[a + [b + c]] + d");
      expect(actual).toEqual(true);
    });

    it("should return true for multiple sets of brackets", () => {
      const actual = match("[b + c] + [d + e]");
      expect(actual).toEqual(true);
    });

    it("should return true for arbitrary nested brackets", () => {
      const actual = match("a + [[[b + c]]] + d");
      expect(actual).toEqual(true);
    });

    it("should return false for missing open brackets", () => {
      const actual = match("a + b + c] + d");
      expect(actual).toEqual(false);
    });

    it("should return false for missing close brackets", () => {
      const actual = match("a + [b + c + d");
      expect(actual).toEqual(false);
    });

    it("should return false for nested missing open brackets", () => {
      const actual = match("a + [[b + c] + d");
      expect(actual).toEqual(false);
    });

    it("should return false for out of order brackets", () => {
      const actual = match("a + b + c] + [d");
      expect(actual).toEqual(false);
    });
  });

  describe("{}", () => {
    it("should return true for empty string", () => {
      const actual = match("");
      expect(actual).toEqual(true);
    });
    it("should return true for non-empty string with no braces", () => {
      const actual = match("a + b");
      expect(actual).toEqual(true);
    });

    it("should return true for expression with braces", () => {
      const actual = match("{a + b}");
      expect(actual).toEqual(true);
    });

    it("should return true for internal braces", () => {
      const actual = match("a + {b + c} + d");
      expect(actual).toEqual(true);
    });

    it("should return true for nested braces", () => {
      const actual = match("{a + {b + c}} + d");
      expect(actual).toEqual(true);
    });

    it("should return true for multiple sets of braces", () => {
      const actual = match("{b + c} + {d + e}");
      expect(actual).toEqual(true);
    });

    it("should return true for arbitrary nested braces", () => {
      const actual = match("a + {{{b + c}}} + d");
      expect(actual).toEqual(true);
    });

    it("should return false for missing open braces", () => {
      const actual = match("a + b + c} + d");
      expect(actual).toEqual(false);
    });

    it("should return false for missing close braces", () => {
      const actual = match("a + {b + c + d");
      expect(actual).toEqual(false);
    });

    it("should return false for nested missing open braces", () => {
      const actual = match("a + {{b + c} + d");
      expect(actual).toEqual(false);
    });

    it("should return false for out of order braces", () => {
      const actual = match("a + b + c} + {d");
      expect(actual).toEqual(false);
    });
  });

  describe("Mixed {}, [] and ()", () => {
    it("should return false improperly nested [] and {}", () => {
      const actual = match("a + [{b + ]c} + d");
      expect(actual).toEqual(false);
    });
    it("should return false improperly nested [] and ()", () => {
      const actual = match("a + [(b + ]c) + d");
      expect(actual).toEqual(false);
    });
    it("should return false improperly nested {} and ()", () => {
      const actual = match("a + ({b + )c} + d");
      expect(actual).toEqual(false);
    });
    it("should return true for properly nested (0, [] and {}", () => {
      const actual = match("a + ([{b + c}]) + d");
      expect(actual).toEqual(true);
    });
  });
});
