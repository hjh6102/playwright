// OtpPage.ts
import { Page } from '@playwright/test';

export class OtpPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyOtpPage() {
    await this.page.waitForURL('https://qa.hyperlab.hits.ai/lab/auth/2fa?labSpaceId=2000000000427&redirectUrl=%2Flab%2F2000000000427%2Fproject'); // OTP 페이지 URL 확인
  }

  async fillOtpFields(page: Page, otpCode: string) {
    // 각 입력 필드의 라벨 형식이 `0st field`, `1st field`, ... `4th field`로 되어 있다고 가정
    for (let i = 0; i < otpCode.length; i++) {
        const fieldLabel = `${i}st field`; // 라벨 생성
        await page.getByLabel(fieldLabel).fill(otpCode[i]); // 하나의 매개변수만 전달
      }
  }

  
}