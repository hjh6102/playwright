import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // 로그인 페이지로 이동
  async goto() {
    await this.page.goto('https://qa.hyperlab.hits.ai/auth/signin');
  }

  // 이메일 입력 필드에 값 입력
  async fillEmail(email: string) {
    await this.page.fill('input[placeholder="Email"]', email);
  }

  // 비밀번호 입력 필드에 값 입력
  async fillPassword(password: string) {
    await this.page.fill('input[placeholder="Password"]', password);
  }

  // 로그인 버튼 클릭
  async clickLoginButton() {
    await this.page.click('button[type="submit"]');  // 로그인 버튼
  }

  // 로그인 후 페이지 URL 확인
  async checkPageURL() {
    return await this.page.url();
  }

  // OTP 페이지로 이동 후 OTP 확인 (필요한 경우)
  async checkOTPPage() {
    // OTP 페이지에서 확인해야 할 요소가 있다면 여기에 추가
  }
}
