import { test, expect } from "@playwright/test";

// UI tests here never hit the real /api/book-appointment route — the
// network call is intercepted via page.route(), so no real appointment
// emails are ever sent through Resend.

test.describe("Booking flow (UI)", () => {
  test("completes a booking end to end (mocked API)", async ({ page }) => {
    await page.goto("/#contact");

    // Pick the first available (non-disabled) day and a time slot.
    await page.locator('button[aria-pressed]:not([disabled])').first().click();
    await page.locator(".appt-time-btn:not([disabled])").first().click();
    await page.getByRole("button", { name: /^Weiter/ }).click();

    await page.route("**/api/book-appointment", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    );

    // The contact form's own "Name"/"E-Mail" fields share similar
    // placeholders and stay mounted (just display:none) behind the active
    // tab, so scope to the currently-visible instance.
    await page.locator('[placeholder="Ihr Name"]:visible').fill("Test User");
    await page.locator('[placeholder="email@beispiel.com"]:visible').fill("test@example.com");
    await page.getByRole("button", { name: "Termin bestätigen" }).click();
    await expect(page.getByText("Termin bestätigt!")).toBeVisible();
  });

  test("shows validation errors for missing name/email", async ({ page }) => {
    await page.goto("/#contact");
    await page.locator('button[aria-pressed]:not([disabled])').first().click();
    await page.locator(".appt-time-btn:not([disabled])").first().click();
    await page.getByRole("button", { name: /^Weiter/ }).click();

    await page.getByRole("button", { name: "Termin bestätigen" }).click();
    await expect(page.getByText("Pflichtfeld.")).toBeVisible();
    await expect(page.getByText("Ungültige E-Mail.")).toBeVisible();
  });

  test("the continue button stays disabled until both a date and time are picked", async ({ page }) => {
    await page.goto("/#contact");
    const continueBtn = page.getByRole("button", { name: /Datum und Uhrzeit wählen/ });
    await expect(continueBtn).toBeDisabled();

    await page.locator('button[aria-pressed]:not([disabled])').first().click();
    await expect(continueBtn).toBeDisabled(); // date only — still disabled

    await page.locator(".appt-time-btn:not([disabled])").first().click();
    await expect(page.getByRole("button", { name: /^Weiter/ })).toBeEnabled();
  });
});

// These hit the real route — safe because invalid input (past/weekend
// dates, bad time slots, oversized messages) is rejected before the
// handler ever calls Resend.
test.describe("Booking API (server-side validation)", () => {
  function nextWeekdayISO(daysAhead: number): string {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + daysAhead);
    while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
  }
  function nextWeekendISO(): string {
    const d = new Date();
    while (d.getUTCDay() !== 6) d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
  }

  test("rejects a past date", async ({ request }) => {
    const res = await request.post("/api/book-appointment", {
      data: { name: "Test", email: "test@example.com", date: "2020-01-01", time: "09:00" },
    });
    expect(res.status()).toBe(400);
  });

  test("rejects a weekend date", async ({ request }) => {
    const res = await request.post("/api/book-appointment", {
      data: { name: "Test", email: "test@example.com", date: nextWeekendISO(), time: "09:00" },
    });
    expect(res.status()).toBe(400);
  });

  test("rejects a time slot outside the offered list", async ({ request }) => {
    const res = await request.post("/api/book-appointment", {
      data: { name: "Test", email: "test@example.com", date: nextWeekdayISO(7), time: "03:17" },
    });
    expect(res.status()).toBe(400);
  });

  test("rejects an oversized message", async ({ request }) => {
    const res = await request.post("/api/book-appointment", {
      data: {
        name: "Test",
        email: "test@example.com",
        date: nextWeekdayISO(7),
        time: "09:00",
        message: "x".repeat(3000),
      },
    });
    expect(res.status()).toBe(400);
  });
});
