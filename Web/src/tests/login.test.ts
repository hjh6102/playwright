import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';  // LoginPage 객체 import

test('test', async ({ page }) => {
  // 페이지 객체 생성
  const loginPage = new LoginPage(page);

  // 로그인 페이지로 이동
  await loginPage.goto();

  // 이메일 입력
  await loginPage.fillEmail('hjh6102@hits.ai');

  // 비밀번호 입력
  await loginPage.fillPassword('Wlgus6102@');

  // 로그인 버튼 클릭
  await loginPage.clickLoginButton();

  // 로그인 후 페이지 URL 확인
  const currentURL = await loginPage.checkPageURL();
  expect(currentURL).toBe('https://qa.hyperlab.hits.ai/lab/auth/2fa?labSpaceId=2000000000427&redirectUrl=%2Flab%2F2000000000427%2Fproject');

  // OTP 페이지 확인 (필요한 경우)
  await loginPage.checkOTPPage();
});
