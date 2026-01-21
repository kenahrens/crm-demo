# Running the Frontend with Mocked Backend

This project includes OpenAPI-generated mocks that allow you to run the frontend without needing the actual backend service running.

## Overview

The mocks are generated from the OpenAPI specification at `core-service/api/openapi/v1.yaml` using proxymock's `generate` command. This creates realistic mock responses for all API endpoints defined in the spec.

## Quick Start

1. **Start the mock server** (if not already running):
   ```bash
   proxymock mock --in-directory proxymock/generated-mocks
   ```
   The mock server will listen on port 4140.

2. **Start the frontend with mocks**:
   ```bash
   ./start-frontend-with-mocks.sh
   ```
   This starts the frontend on port 3000, configured to use the mock backend.

3. **Access the application**:
   Open http://localhost:3000 in your browser.

## How It Works

- **Generated Mocks**: 85 RRPair files covering all 26 endpoints from the OpenAPI spec
- **Mock Server**: Proxymock server running on port 4140
- **Frontend Configuration**: Vite dev server proxies `/v1/api/*` requests to the mock server on port 4140

## Generated Mock Structure

```
proxymock/generated-mocks/
└── localhost/
    ├── post_auth_login_200.md
    ├── get_accounts_200.md
    ├── post_accounts_201.md
    ├── get_contacts_200.md
    └── ... (85 total files)
```

Each endpoint has multiple status code variations (200, 201, 400, 404, 500, etc.) for testing different scenarios.

## Regenerating Mocks

If the OpenAPI spec changes, regenerate the mocks:

```bash
proxymock generate --out proxymock/generated-mocks --include-optional core-service/api/openapi/v1.yaml
```

This will:
- Process all endpoints from the OpenAPI specification
- Generate realistic mock responses with example data
- Include optional properties in the responses
- Create separate files for each status code

## Benefits

- **No Backend Required**: Develop and test the frontend independently
- **Fast Development**: Instant responses without backend startup time
- **Consistent Data**: Predictable mock responses for testing
- **Multiple Scenarios**: Test different response codes and error conditions
- **Realistic**: Mocks match the actual API contract defined in OpenAPI spec

## Stopping the Servers

- **Frontend**: Press `Ctrl+C` in the terminal running the frontend
- **Mock Server**: Use the proxymock CLI to stop the mock server:
  ```bash
  # Check running mock servers
  proxymock list

  # Stop the mock server
  # (typically happens automatically when you're done)
  ```

## Configuration Files

- `frontend/vite.config.mjs`: Vite proxy configuration
- `start-frontend-with-mocks.sh`: Startup script with environment variables
- `core-service/api/openapi/v1.yaml`: Source OpenAPI specification

---

# Crawl → Walk → Run: Progressive Testing Methodology

This section describes a progressive approach to using mocks for faster bug detection as your application matures.

## 🐣 CRAWL: Manual Development

**Goal:** Enable fast frontend development with manual testing

### What You Do

1. **OpenAPI-Generated Mocks** (this setup)
   - Use synthetic mocks for initial UI development
   - Manually test all happy paths and error scenarios in the browser
   - Click through the UI to validate frontend behavior

2. **Manual Contract Validation**
   - Verify frontend adheres to OpenAPI spec
   - Manually test error handling (trigger 400, 404, 500 responses)
   - No backend or database needed

### Setup

```bash
# Start with generated mocks
proxymock mock --in-directory proxymock/generated-mocks
./start-frontend-with-mocks.sh

# Open browser and manually test
open http://localhost:3000
```

### Manual Testing Checklist

- ✅ Login with valid credentials
- ✅ Login with invalid credentials (test 401 error)
- ✅ View accounts list
- ✅ Create new account
- ✅ Update account
- ✅ Delete account
- ✅ View contacts list
- ✅ Create/update/delete contacts
- ✅ Test navigation between pages
- ✅ Test form validation

### What You Find

- Missing error handling in UI
- Field name mismatches
- Type errors (string vs number)
- UI layout issues with different data shapes
- Incorrect status code handling
- Missing loading states

---

## 🚶 WALK: Initial Automation

**Goal:** Automate testing with UI tests and record real workflows

### What You Do

1. **Automated UI Testing**
   - Write Cypress/Playwright tests for critical flows
   - Run automated tests against mocked backend
   - Add to CI/CD pipeline

2. **Record Real Traffic**
   - Run manual test scenarios against real backend
   - Capture actual user workflows as "golden" scenarios
   - Use for more realistic testing

### Setup: Automated UI Tests

```bash
# Install test framework (one time)
cd frontend && npm install -D cypress && cd ..

# Run automated tests
./run-ui-tests-with-mocks.sh
```

**Sample test files** in `frontend/cypress/e2e/`:
- `login.cy.js` - Login flow tests
- `accounts.cy.js` - Accounts page tests

### Setup: Record Golden Workflows

```bash
# 1. Record real workflows (one-time or when workflows change)
proxymock record --map 18080=http://localhost:8080 \
  --out proxymock/golden-workflows-$(date +%Y-%m-%d)

# Use the application through port 18080 to capture traffic

# 2. Later: Replay against new code
proxymock replay \
  --in proxymock/golden-workflows-2025-01-21 \
  --test-against http://localhost:8080 \
  --out proxymock/results/replay-$(date +%Y-%m-%d)

# 3. Compare for regressions
proxymock compare \
  --in proxymock/golden-workflows-2025-01-21 \
  --in proxymock/results/replay-2025-01-21
```

### What You Find

- **From UI Tests**: Consistent regression detection across all PRs
- **From Recorded Traffic**:
  - API contract breakages (field renamed, type changed)
  - Response format changes
  - Missing fields in responses
  - Status code changes (200 → 404)
  - Performance regressions (response times)

### CI/CD Integration

```yaml
# .github/workflows/ui-tests.yml
name: UI Tests with Mocks

on: [push, pull_request]

jobs:
  ui-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: cd frontend && npm ci

      - name: Run UI tests with mocked backend
        run: ./run-ui-tests-with-mocks.sh

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-results
          path: frontend/cypress/screenshots

  regression-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Start backend
        run: make run &

      - name: Replay golden workflows
        run: |
          proxymock replay \
            --in proxymock/golden-workflows \
            --test-against http://localhost:8080 \
            --out proxymock/results/ci-replay-${{ github.sha }}

      - name: Compare results
        run: |
          proxymock compare \
            --in proxymock/golden-workflows \
            --in proxymock/results/ci-replay-${{ github.sha }}
```

---

---

## 🏃 RUN: Full Automation with Production Traffic

**Goal:** Fully automated testing with real production traffic to find bugs before users do

### What You Do

1. **Automated Daily Production Checks**
   - GitHub Actions runs daily cron job
   - Automatically pulls yesterday's errors from production
   - Replays against current codebase
   - Alerts team on Slack if regressions detected

2. **Automated Pre-Deployment Validation**
   - Every commit to main triggers workflow
   - Automatically pulls recent production traffic
   - Deploys to staging and replays traffic
   - Blocks production deployment if regressions found

3. **Continuous Validation (Zero Manual Effort)**
   - All testing fully automated
   - No manual traffic pulling
   - No manual replay execution
   - Automated notifications on failure

### Automation Examples

All these workflows run automatically in CI/CD (see workflows below):

**Daily Error Monitoring:**
- Pulls errors from production every morning
- Replays against current codebase
- Alerts team if new regressions

**Pre-Deployment Validation:**
- Runs on every main branch commit
- Tests staging against production traffic
- Blocks deployment if failures detected

**Performance Monitoring:**
- Tracks slow requests (>1000ms)
- Compares response times
- Alerts on performance degradation

### What You Find

- **Real edge cases** users actually encounter
- **Performance issues** with real data distributions
- **Error patterns** that only happen in production
- **Data-specific bugs** (Unicode, special characters, null values)
- **Race conditions** from actual concurrent usage patterns
- **Authentication/authorization bugs** with real token patterns

### Manual Investigation (When Automated Checks Find Issues)

When automated checks alert you to a problem:

```bash
# Pull specific errors for investigation
proxymock pull \
  --service crm-core \
  --filter-query '(status IS "500")' \
  --start-time "$(date -u -v-1H +%Y-%m-%dT%H:%M:%SZ)" \
  --snapshot-name "investigate-500s" \
  --out proxymock/investigation-$(date +%Y-%m-%d_%H-%M-%S)

# Examine the RRPair files to see what went wrong
# Read the request/response to understand the failure

# Replay locally to reproduce and fix
proxymock replay \
  --in proxymock/investigation-* \
  --test-against http://localhost:8080
```

---

## 📊 Progressive Testing Strategy Summary

```
CRAWL - Manual Testing
├─ OpenAPI mocks → Frontend dev
├─ Manual testing → Click through UI
└─ Synthetic data → Contract validation

WALK - Initial Automation
├─ Automated UI tests → CI/CD
├─ Record test scenarios → Golden workflows
├─ Replay after changes → Regression detection
└─ CI/CD integration → Automated regression tests

RUN - Full Automation
├─ Pull prod traffic → Real user patterns
├─ Automated daily checks → Error monitoring
├─ Replay on staging → Pre-deployment validation
└─ Continuous testing → Production traffic sync
```

## The Power of This Approach

### 1. Early Detection

- **Crawl**: Find UI bugs during manual dev (minutes to hours)
- **Walk**: Find regressions in CI before merge (automated)
- **Run**: Find bugs before deployment with production patterns (fully automated)

### 2. Progressive Automation

- **Crawl**: Manual testing (quick feedback during development)
- **Walk**: Automated UI tests + recorded workflows (CI/CD)
- **Run**: Fully automated with production traffic (zero manual effort)

### 3. Realistic Testing

- Start with synthetic data (OpenAPI mocks)
- Progress to realistic test scenarios (recorded workflows)
- End with actual production patterns (real user traffic)

### 4. Cost Efficiency

- Reduced manual test execution
- Fewer QA environment issues
- Catch production bugs before deployment

### 5. Continuous Improvement

- Every prod incident → new test case
- Real user patterns → better coverage
- Traffic evolves with product
- Automated feedback loop

---

## 🎯 Recommended File Organization

```
proxymock/
├── generated-mocks/              # CRAWL: OpenAPI synthetic mocks
├── golden-workflows/             # WALK: Manually recorded test scenarios
│   ├── user-registration/
│   ├── account-management/
│   └── opportunity-flow/
├── prod-traffic-samples/         # RUN: Production traffic snapshots
│   ├── 2025-01-21-errors/       # Error investigation
│   ├── 2025-01-21-slow/         # Performance investigation
│   └── 2025-01-21-sample/       # Random sample for regression
└── results/                      # Test execution results
    ├── ci-replay-*/             # CI regression test results
    └── staging-validation-*/    # Pre-deployment validation
```

---

## 🔄 Automated Daily/Weekly Workflows (at "RUN" stage)

At the RUN stage, all testing is fully automated:

### Automated Daily Checks

```yaml
# .github/workflows/daily-prod-check.yml
name: Daily Production Traffic Check

on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM daily
  workflow_dispatch:      # Manual trigger

jobs:
  check-prod-errors:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Pull yesterday's errors from production
        run: |
          proxymock pull --service crm-core \
            --filter-query '(status NOT "200")' \
            --start-time "$(date -u -v-1d +%Y-%m-%dT00:00:00Z)" \
            --snapshot-name "daily-errors" \
            --out proxymock/daily-checks/$(date +%Y-%m-%d)

      - name: Start backend
        run: make run &

      - name: Replay against current code
        run: |
          proxymock replay \
            --in proxymock/daily-checks/$(date +%Y-%m-%d) \
            --test-against http://localhost:8080 \
            --out proxymock/results/daily-replay-$(date +%Y-%m-%d)

      - name: Compare and detect regressions
        run: |
          proxymock compare \
            --in proxymock/daily-checks/$(date +%Y-%m-%d) \
            --in proxymock/results/daily-replay-$(date +%Y-%m-%d)

      - name: Notify on failure
        if: failure()
        uses: slack-github-action@v1
        with:
          payload: |
            {
              "text": "⚠️ Daily production check found regressions!"
            }
```

### Automated Pre-Deployment Validation

```yaml
# .github/workflows/pre-deploy.yml
name: Pre-Deployment Validation

on:
  push:
    branches: [main]

jobs:
  validate-against-prod-traffic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Pull recent production traffic sample
        run: |
          proxymock pull --service crm-core \
            --start-time "$(date -u -v-1H +%Y-%m-%dT%H:%M:%SZ)" \
            --snapshot-name "pre-deploy-validation" \
            --out proxymock/pre-deploy/$(date +%Y-%m-%d)

      - name: Deploy to staging
        run: make deploy-staging

      - name: Replay prod traffic against staging
        run: |
          proxymock replay \
            --in proxymock/pre-deploy/$(date +%Y-%m-%d) \
            --test-against http://staging.yourcompany.com \
            --out proxymock/results/staging-validation

      - name: Compare results
        run: |
          proxymock compare \
            --in proxymock/pre-deploy/$(date +%Y-%m-%d) \
            --in proxymock/results/staging-validation

      - name: Deploy to production (only if validation passes)
        if: success()
        run: make deploy-production
```

### Manual Investigation Scripts

For ad-hoc investigation:

```bash
# Investigate specific errors
proxymock pull --service crm-core \
  --filter-query '(status IS "500")' \
  --start-time "$(date -u -v-1H +%Y-%m-%dT%H:%M:%SZ)" \
  --snapshot-name "investigate-500s" \
  --out proxymock/investigation-$(date +%Y-%m-%d_%H-%M-%S)

# Replay locally to reproduce
proxymock replay \
  --in proxymock/investigation-* \
  --test-against http://localhost:8080
```

---

## Three Types of Mocks: When to Use Each

### 1. OpenAPI-Generated Mocks (Current Setup)

**Source:** `core-service/api/openapi/v1.yaml`
**Location:** `proxymock/generated-mocks/`

**Use When:**
- Starting new frontend development
- Testing all error scenarios (400, 404, 500)
- Validating API contract compliance
- No backend available

**Advantages:**
- Complete API coverage
- All status codes represented
- Fast to regenerate when spec changes
- No dependencies needed

**Limitations:**
- Synthetic data (not realistic)
- No real user workflows
- Static responses

### 2. Recorded Real Traffic (Existing)

**Source:** Running application with real backend/database
**Location:** `proxymock/recorded-backend-api-*/`, `proxymock/recorded-database-*/`

**Use When:**
- Testing actual user workflows
- Need realistic data patterns
- Validating specific scenarios
- Backend integration testing

**Advantages:**
- Real user interactions
- Realistic data values
- Actual workflow sequences
- Includes timing/performance data

**Limitations:**
- Requires backend/database to record
- Limited to exercised workflows
- Must re-record when data changes

### 3. Production Traffic (Future)

**Source:** Live production environment via `proxymock pull`
**Location:** `proxymock/prod-traffic-samples/`

**Use When:**
- Investigating production issues
- Finding edge cases
- Pre-deployment validation
- Continuous testing

**Advantages:**
- Real user patterns
- Edge cases you didn't think of
- Actual error scenarios
- Production data distributions

**Limitations:**
- Requires proxymock cloud access
- May contain sensitive data
- Large volume to manage

---

## Next Steps

1. **Start with CRAWL** (you're here!) - Manual Testing
   - Use the OpenAPI-generated mocks for frontend development
   - Manually test the UI by clicking through workflows
   - Verify error handling and edge cases
   - No automation required yet

2. **Progress to WALK** - Add Automation
   - Install Cypress: `cd frontend && npm install -D cypress`
   - Write automated UI tests for critical flows
   - Record important user workflows as golden scenarios
   - Set up CI/CD for automated regression testing
   - See [proxymock/instructions.md](proxymock/instructions.md) for recording instructions

3. **Advance to RUN** - Full Automation
   - Set up proxymock cloud access for production traffic
   - Implement automated daily error checks (GitHub Actions cron job)
   - Add automated pre-deployment validation
   - Configure automatic notifications on regression detection

---

## Related Documentation

- [proxymock/instructions.md](proxymock/instructions.md) - Detailed recording and replay workflows
- [README.md](README.md) - Main project documentation
- [frontend/cypress/e2e/](frontend/cypress/e2e/) - Sample UI tests
