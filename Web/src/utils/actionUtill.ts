import { TestLogger } from './logger';
import { Locator, Page } from 'playwright';

export class ActionUtil {
    constructor(private page: Page) {}

    // 페이지로 이동
    async goto(url: string): Promise<void> {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
        TestLogger.getInstance().addLog(`Navigated to: ${url}`);
    }

    // 클릭 액션
    async click(locator: string | Locator): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await element.click();
        TestLogger.getInstance().addLog(`Clicked on element: ${locator}`);
    }

    // 텍스트 입력
    async type(locator: string | Locator, text: string): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await element.fill(text);  // fill은 'type'의 더 권장되는 방법
        TestLogger.getInstance().addLog(`Entered text: '${text}' in element: ${locator}`);
    }

    // 요소가 화면에 보이는지 확인
    async checkPageLoad(locator: string | Locator): Promise<boolean> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        const isVisible = await element.isVisible();
        TestLogger.getInstance().addLog(`View check on element: ${locator} is ${isVisible ? 'visible' : 'not visible'}`);
        return isVisible;
    }

    // 스크롤
    async scrollTo(locator: string | Locator): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await element.scrollIntoViewIfNeeded();
        TestLogger.getInstance().addLog(`Scrolled to element: ${locator}`);
    }

    // 페이지 내 텍스트 확인
    async verifyText(locator: string | Locator, expectedText: string): Promise<boolean> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        const text = await element.textContent();
        const result = text?.includes(expectedText);
        TestLogger.getInstance().addLog(`Text check for element: ${locator}, expected: ${expectedText}, found: ${result}`);
        return result || false;
    }

    // 드롭다운 선택
    async selectOption(locator: string | Locator, optionValue: string): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await element.selectOption(optionValue);
        TestLogger.getInstance().addLog(`Selected option: ${optionValue} in element: ${locator}`);
    }
}
