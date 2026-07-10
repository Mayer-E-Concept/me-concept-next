import { test, expect } from "@playwright/test";

// UI tests here never hit the real /api/contact route for the success/failure
// cases — the network call is intercepted via page.route() so no email is
// ever actually sent through Resend.

test.describe("Contact form (UI)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Trimite mesaj" }).click();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: "ÎNAINTEAZĂ" }).click();
    await expect(page.getByText("Câmpul este obligatoriu.")).toBeVisible();
    await expect(page.getByText("Te rog scrie un mesaj.")).toBeVisible();
  });

  test("shows an error for an invalid email", async ({ page }) => {
    await page.getByLabel("Nume").fill("Test User");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Mesaj").fill("Test message content.");
    await page.getByRole("button", { name: "ÎNAINTEAZĂ" }).click();
    await expect(page.getByText("Email invalid.")).toBeVisible();
  });

  test("clears a field's error as soon as it's edited", async ({ page }) => {
    await page.getByRole("button", { name: "ÎNAINTEAZĂ" }).click();
    await expect(page.getByText("Câmpul este obligatoriu.")).toBeVisible();
    await page.getByLabel("Nume").fill("Test User");
    await expect(page.getByText("Câmpul este obligatoriu.")).toHaveCount(0);
  });

  test("submits successfully (mocked API) and can send another message", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    );
    await page.getByLabel("Nume").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Mesaj").fill("This is a test message.");
    await page.getByRole("button", { name: "ÎNAINTEAZĂ" }).click();
    await expect(page.getByText("Mesaj trimis!")).toBeVisible();

    await page.getByRole("button", { name: "Trimite alt mesaj" }).click();
    await expect(page.getByLabel("Nume")).toBeVisible();
  });

  test("shows a friendly error when the API fails", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "Eroare internă." }) })
    );
    await page.getByLabel("Nume").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Mesaj").fill("This is a test message.");
    await page.getByRole("button", { name: "ÎNAINTEAZĂ" }).click();
    await expect(page.getByText(/Nu am putut trimite mesajul/)).toBeVisible();
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
