import { cleanFullResponse } from "@/ipc/utils/cleanFullResponse";
import { describe, it, expect } from "vitest";

describe("cleanFullResponse", () => {
  it("should replace < characters in oliveagent-write attributes", () => {
    const input = `<oliveagent-write path="src/file.tsx" description="Testing <a> tags.">content</oliveagent-write>`;
    const expected = `<oliveagent-write path="src/file.tsx" description="Testing ＜a＞ tags.">content</oliveagent-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should replace < characters in multiple attributes", () => {
    const input = `<oliveagent-write path="src/<component>.tsx" description="Testing <div> tags.">content</oliveagent-write>`;
    const expected = `<oliveagent-write path="src/＜component＞.tsx" description="Testing ＜div＞ tags.">content</oliveagent-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle multiple nested HTML tags in a single attribute", () => {
    const input = `<oliveagent-write path="src/file.tsx" description="Testing <div> and <span> and <a> tags.">content</oliveagent-write>`;
    const expected = `<oliveagent-write path="src/file.tsx" description="Testing ＜div＞ and ＜span＞ and ＜a＞ tags.">content</oliveagent-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle complex example with mixed content", () => {
    const input = `
      BEFORE TAG
  <oliveagent-write path="src/pages/locations/neighborhoods/louisville/Highlands.tsx" description="Updating Highlands neighborhood page to use <a> tags.">
import React from 'react';
</oliveagent-write>
AFTER TAG
    `;

    const expected = `
      BEFORE TAG
  <oliveagent-write path="src/pages/locations/neighborhoods/louisville/Highlands.tsx" description="Updating Highlands neighborhood page to use ＜a＞ tags.">
import React from 'react';
</oliveagent-write>
AFTER TAG
    `;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle other oliveagent tag types", () => {
    const input = `<oliveagent-rename from="src/<old>.tsx" to="src/<new>.tsx"></oliveagent-rename>`;
    const expected = `<oliveagent-rename from="src/＜old＞.tsx" to="src/＜new＞.tsx"></oliveagent-rename>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle oliveagent-delete tags", () => {
    const input = `<oliveagent-delete path="src/<component>.tsx"></oliveagent-delete>`;
    const expected = `<oliveagent-delete path="src/＜component＞.tsx"></oliveagent-delete>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should not affect content outside oliveagent tags", () => {
    const input = `Some text with <regular> HTML tags. <oliveagent-write path="test.tsx" description="With <nested> tags.">content</oliveagent-write> More <html> here.`;
    const expected = `Some text with <regular> HTML tags. <oliveagent-write path="test.tsx" description="With ＜nested＞ tags.">content</oliveagent-write> More <html> here.`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle empty attributes", () => {
    const input = `<oliveagent-write path="src/file.tsx">content</oliveagent-write>`;
    const expected = `<oliveagent-write path="src/file.tsx">content</oliveagent-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle attributes without < characters", () => {
    const input = `<oliveagent-write path="src/file.tsx" description="Normal description">content</oliveagent-write>`;
    const expected = `<oliveagent-write path="src/file.tsx" description="Normal description">content</oliveagent-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });
});
