# Test Automation CronJob

This directory contains Kubernetes resources for running automated end-to-end tests against the deployed CRM Demo application.

## Overview

The test automation CronJob runs Cypress tests every 5 minutes to generate continuous traffic and validate the application functionality.

## Components

- `cronjob.yaml` - Kubernetes CronJob that schedules and runs the tests
  - Uses the official Cypress browsers container (`cypress/browsers:node-20.18.0-chrome-130.0.6723.116-1-ff-132.0.1-edge-130.0.2849.68-1`)
  - Has Node.js and all browser dependencies pre-installed
  - Runs every 5 minutes (`*/5 * * * *`)
  - Tests against the deployed `crm-core` and `crm-frontend` services
  - Clones the repository to get the latest test files
  - Installs dependencies (including Cypress from package.json) and runs tests end-to-end

## Configuration

The CronJob uses ConfigMaps to configure the test environment:

- `test-automation-config` - Environment variables pointing to the deployed services
  - `VITE_API_HOST`: crm-core
  - `VITE_API_PORT`: 80
  - `FRONTEND_HOST`: crm-frontend
  - `FRONTEND_PORT`: 80

- `test-runner-script` - Shell script that runs the tests

## Usage

The CronJob is automatically deployed when you apply the base kustomization:

```bash
kubectl apply -k k8s/base/
```

## Manual Trigger

To manually trigger a test run:

```bash
kubectl create job --from=cronjob/crm-test-automation manual-test-run
```

## Monitoring

View CronJob status:

```bash
kubectl get cronjob crm-test-automation
```

View recent job executions:

```bash
kubectl get jobs -l component=test-automation
```

View logs from the latest test run:

```bash
kubectl logs -l component=test-automation --tail=100
```

## Customization

To change the schedule, edit the `schedule` field in `cronjob.yaml`:

- Every 5 minutes: `*/5 * * * *`
- Every 15 minutes: `*/15 * * * *`
- Hourly: `0 * * * *`
- Every 6 hours: `0 */6 * * *`
