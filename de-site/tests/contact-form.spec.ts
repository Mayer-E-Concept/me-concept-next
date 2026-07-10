import { test, expect } from "@playwright/test";

// UI tests here never hit the real /api/contact route for the success/failure
// cases — the network call is intercepted via page.route() so no email is
// ever actually sent through Resend.

test.describe("Contact form (UI)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Nachricht senden" }).click();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: "ABSENDEN" }).click();
    await expect(page.getByText("Pflichtfeld.")).toBeVisible();
    await expect(page.getByText("Bitte geben Sie eine Nachricht ein.")).toBeVisible();
  });

  test("shows an error for an invalid email", async ({ page }) => {
    await page.getByLabel("Name", { exact: true }).fill("Test User");
    await page.getByLabel("E-Mail").fill("not-an-email");
    await page.getByLabel("Nachricht").fill("Test message content.");
    await page.getByRole("button", { name: "ABSENDEN" }).click();
    await expect(page.getByText("Ungültige E-Mail.")).toBeVisible();
  });

  test("clears a field's error as soon as it's edited", async ({ page }) => {
    await page.getByRole("button", { name: "ABSENDEN" }).click();
    await expect(page.getByText("Pflichtfeld.")).toBeVisible();
    await page.getByLabel("Name", { exact: true }).fill("Test User");
    await expect(page.getByText("Pflichtfeld.")).toHaveCount(0);
  });

  test("submits successfully (mocked API) and can send another message", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    );
    await page.getByLabel("Name", { exact: true }).fill("Test User");
    await page.getByLabel("E-Mail").fill("test@example.com");
    await page.getByLabel("Nachricht").fill("This is a test message.");
    await page.getByRole("button", { name: "ABSENDEN" }).click();
    await expect(page.getByText("Nachricht gesendet!")).toBeVisible();

    await page.getByRole("button", { name: "Weitere Nachricht senden" }).click();
    await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
  });

  test("shows a friendly error when the API fails", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "Interner Fehler." }) })
    );
    await page.getByLabel("Name", { exact: true }).fill("Test User");
    await page.getByLabel("E-Mail").fill("test@example.com");
    await page.getByLabel("Nachricht").fill("This is a test message.");
    await page.getByRole("button", { name: "ABSENDEN" }).click();
    await expect(page.getByText(/konnte nicht gesendet werden/)).toBeVisible();
  });
});

// These hit the real route — safe because invalid input is rejected before
// the handler ever calls Resend, so no email is sent.
test.describe("Contact API (server-side validation)", () => {
  test("rejects missing required fields", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { name: "", email: "", message: "" } });
    expect(res.status()).toBe(400);
  });

  test("rejects an invalid email", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "Test", email: "not-an-email", message: "Hello there" },
    });
    expect(res.status()).toBe(400);
  });

  test("silently accepts (200) when the honeypot field is filled, without sending", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "Bot", email: "bot@example.com", message: "spam", company: "I am a bot" },
    });
    expect(res.status()).toBe(200);
  });
});
