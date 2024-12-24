import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { OtpPage } from '../pages/OTPPage';
import { ProjectlistPage } from '../pages/ProjectlistPage';

test.describe('Login Flow', () => {
  test('Login and enter OTP', async ({ page }) => {
    try {
      const loginPage = new LoginPage(page);
      
      // 페이지 로딩 대기 추가
      await test.step('Login', async () => {
        await loginPage.goto();
        await page.waitForLoadState('networkidle');
        
        await page.getByLabel('lang-trigger').click();
        await page.getByRole('menuitem', { name: '한국어 (Korean)' }).click();
        await page.getByRole('button', { name: '동의' }).click();
        await loginPage.fillEmail('hyperlabqa3@hits.ai');
        await loginPage.fillPassword('Hyper0518!!');
        await loginPage.clickLoginButton();
      });

      await test.step('OTP Verification', async () => {
        const otpPage = new OtpPage(page);
        const otpCode = '000000';
        await otpPage.fillOtpFields(page, otpCode);
      });

      await test.step('Project Creation', async () => {
        const projectlistPage = new ProjectlistPage(page);
        await projectlistPage.goto();
        await projectlistPage.clickCreateButton();
        await projectlistPage.fillProjectname('테스트 프로젝트');
        await projectlistPage.clickNextButton();
        await projectlistPage.fillTargetname('4z3v');
        await projectlistPage.clickSettingButton();
        await projectlistPage.clickSkipButton();
      });
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
});