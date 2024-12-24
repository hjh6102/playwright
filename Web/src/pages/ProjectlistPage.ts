import { Page } from '@playwright/test';

export class ProjectlistPage {
    constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://qa.hyperlab.hits.ai/lab/2000000000004/project", {
        waitUntil: "domcontentloaded",
        timeout: 60000,
    });
  }
  async clickCreateButton() {
    await this.page.getByRole('heading', { name: '새로운 프로젝트를 만들고, 랩스페이스의 멤버를 프로젝트에 초대해 보세요. 프로젝트 만들기' }).getByRole('button').click();  // 프로젝트 생성 버튼
  }
  async fillProjectname(projectname: string) {
    await this.page.fill('input[placeholder="프로젝트 이름을 입력해주세요"]', projectname);
  }  
  async clickNextButton() {
    await this.page.getByRole('button', { name: '다음' }).click();
  }
  async fillTargetname(targetname: string) {
    await this.page.fill('input[placeholder="Target protein을 입력해 주세요"]', targetname);
  }  
  async clickSettingButton() {
    await this.page.getByRole('button', { name: '설정 완료' }).click();
  }
  async clickSkipButton() {
    await this.page.getByRole('button', { name: '지금은 건너뛰기' }).click();
  }
}