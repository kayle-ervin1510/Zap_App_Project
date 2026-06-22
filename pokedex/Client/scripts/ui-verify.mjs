// UI verification — checks page transitions and design tokens are in place.
// Run with: node scripts/ui-verify.mjs  (dev server must be on port 5173)
import { chromium } from 'playwright'

const BASE = 'http://localhost:5173'
let passed = 0
let failed = 0

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`)
    passed++
  } else {
    console.error(`  ✗ ${label}`)
    failed++
  }
}

const browser = await chromium.launch()

// ── Test 1: page-transition wrapper is present and animating ──
console.log('\nTest 1: Page transition wrapper')
const page = await browser.newPage()
await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
await page.waitForSelector('.page-transition', { timeout: 5000 })
const animName = await page.$eval('.page-transition', el =>
  getComputedStyle(el).animationName
)
assert(animName === 'page-fade-in', `animationName === 'page-fade-in' (got: ${animName})`)

// ── Test 2: CSS custom properties — palette preserved ──
console.log('\nTest 2: CSS custom properties')
const bgPrimary = await page.evaluate(() =>
  getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim()
)
assert(bgPrimary === '#0a0f1e', `--bg-primary === '#0a0f1e' (got: ${bgPrimary})`)

const accentOrange = await page.evaluate(() =>
  getComputedStyle(document.documentElement).getPropertyValue('--accent-orange').trim()
)
assert(accentOrange === '#f0592a', `--accent-orange === '#f0592a' (got: ${accentOrange})`)

// ── Test 3: card is present and has stronger shadow ──
console.log('\nTest 3: Card depth')
const cardExists = await page.$('.card') !== null
assert(cardExists, '.card element exists on login page')

const cardShadow = await page.$eval('.card', el =>
  getComputedStyle(el).boxShadow
)
assert(cardShadow.length > 20, `Card box-shadow is non-trivial (got: ${cardShadow.slice(0, 60)}...)`)

// ── Test 4: brand font-size increased ──
console.log('\nTest 4: Brand typography')
const brandSize = await page.$eval('.brand', el =>
  parseFloat(getComputedStyle(el).fontSize)
)
assert(brandSize >= 40, `Brand font-size >= 40px (got: ${brandSize}px)`)

// ── Test 5: route change triggers re-animation ──
console.log('\nTest 5: Transition fires on navigation')
await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
// Navigate to /signup by clicking the link
const signupLink = await page.$('.link-text a, .link-text button')
if (signupLink) {
  await signupLink.click()
  await page.waitForSelector('.page-transition', { timeout: 5000 })
  const urlAfter = page.url()
  assert(urlAfter.includes('/signup'), `Navigated to /signup (got: ${urlAfter})`)
  const animAfter = await page.$eval('.page-transition', el =>
    getComputedStyle(el).animationName
  )
  assert(animAfter === 'page-fade-in', `Transition active on new route (got: ${animAfter})`)
} else {
  console.log('  ~ signup link not found, skipping navigation test')
}

// ── Test 6: prefers-reduced-motion respected ──
console.log('\nTest 6: Reduced motion media query')
const ctx2 = await browser.newContext({ reducedMotion: 'reduce' })
const page2 = await ctx2.newPage()
await page2.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
await page2.waitForSelector('.page-transition', { timeout: 5000 })
const animDur = await page2.$eval('.page-transition', el =>
  getComputedStyle(el).animationDuration
)
assert(animDur === '0s', `Animation disabled under prefers-reduced-motion (got: ${animDur})`)
await ctx2.close()

await browser.close()

console.log(`\n${'─'.repeat(40)}`)
console.log(`Results: ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
