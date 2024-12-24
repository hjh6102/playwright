import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './Web/src/tests',  // 테스트 디렉토리 지정
  testMatch: ['**/tests/**/*.test.ts', '**/*.spec.ts'],  // 패턴 추가
  timeout: 30000,
  retries: 1,
  use: {
    headless: false, // 브라우저 UI를 표시하며 실행
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'on-failure' }]]
});