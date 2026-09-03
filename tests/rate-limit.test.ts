import { beforeEach, describe, expect, it } from "vitest";

import {
  MAX_ATTEMPTS,
  WINDOW_MS,
  rateLimitSize,
  resetRateLimit,
  takeToken,
} from "../lib/rate-limit";

beforeEach(() => {
  resetRateLimit();
});

describe("takeToken", () => {
  it("laat de eerste aanvragen binnen het venster door", () => {
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      expect(takeToken("1.2.3.4", 1000).allowed).toBe(true);
    }
  });

  it("blokkeert zodra het maximum in het venster bereikt is", () => {
    for (let i = 0; i < MAX_ATTEMPTS; i++) takeToken("1.2.3.4", 1000);

    const blocked = takeToken("1.2.3.4", 1000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBe(WINDOW_MS);
  });

  it("houdt bezoekers uit elkaar", () => {
    for (let i = 0; i < MAX_ATTEMPTS; i++) takeToken("1.2.3.4", 1000);

    expect(takeToken("5.6.7.8", 1000).allowed).toBe(true);
  });

  it("laat weer door zodra het venster voorbij is", () => {
    for (let i = 0; i < MAX_ATTEMPTS; i++) takeToken("1.2.3.4", 1000);
    expect(takeToken("1.2.3.4", 1000).allowed).toBe(false);

    expect(takeToken("1.2.3.4", 1000 + WINDOW_MS + 1).allowed).toBe(true);
  });

  it("schuift mee met het venster in plaats van in blokken te resetten", () => {
    // twee vroege pogingen, drie latere
    takeToken("1.2.3.4", 1000);
    takeToken("1.2.3.4", 1000);
    for (let i = 0; i < 3; i++) takeToken("1.2.3.4", 5000);
    expect(takeToken("1.2.3.4", 5000).allowed).toBe(false);

    // net nadat alleen de twee vroege pogingen vervallen zijn, zijn er
    // precies twee plekken vrij en daarna weer niet
    const afterEarlyExpire = 1000 + WINDOW_MS;
    expect(takeToken("1.2.3.4", afterEarlyExpire).allowed).toBe(true);
    expect(takeToken("1.2.3.4", afterEarlyExpire).allowed).toBe(true);
    expect(takeToken("1.2.3.4", afterEarlyExpire).allowed).toBe(false);
  });

  it("meldt hoe lang de bezoeker nog moet wachten", () => {
    for (let i = 0; i < MAX_ATTEMPTS; i++) takeToken("1.2.3.4", 1000);

    const halfway = 1000 + WINDOW_MS / 2;
    expect(takeToken("1.2.3.4", halfway).retryAfterMs).toBe(WINDOW_MS / 2);
  });

  it("laat het geheugen niet vollopen met oude bezoekers", () => {
    for (let i = 0; i < 500; i++) takeToken(`bezoeker-${i}`, 1000);

    // ver na het venster: de oude sleutels horen opgeruimd te zijn
    takeToken("nieuw", 1000 + WINDOW_MS * 2);
    expect(rateLimitSize()).toBe(1);
  });
});
