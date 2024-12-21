import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', { open: 'never' }],  // HTML 리포터
    ['json', { outputFile: 'test-results.json' }],  // JSON 리포터
  ],
});
