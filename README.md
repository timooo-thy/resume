# Timothy's Resume & Blog

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on push to main/dev branches and pull requests
   - Installs dependencies
   - Lints code
   - Runs tests
   - Builds the application

### Setting up CI/CD

1. Add the necessary secrets to your GitHub repository:

   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `NEXT_PUBLIC_URL`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `CODECOV_TOKEN` (optional, for coverage reports)

2. Enable GitHub Actions in your repository settings if not already enabled.

3. Push to the main branch to trigger the deployment workflow.

### Running tests locally

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci
```
