import { Reporter, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export class CustomReporter implements Reporter {
  // 테스트 실행이 끝난 후 호출
  async onEnd(result: FullResult) {
    console.log('All tests have completed!');

    // 실패한 테스트만 필터링
    const failedTests = result.testResults.filter(test => test.status === 'failed');
    
    if (failedTests.length > 0) {
      console.log('Some tests failed, saving the report...');
      
      // 실패한 테스트 로그를 JSON 파일로 저장
      const failedReportPath = path.join(process.cwd(), 'playwright-report', 'failed-test-report.json');
      const formattedErrors = failedTests.map(test => ({
        testName: test.title,
        error: {
          message: test.error.message,
          stack: test.error.stack,
        },
      }));
      
      // playwight-report 폴더가 없으면 생성
      if (!fs.existsSync(path.dirname(failedReportPath))) {
        fs.mkdirSync(path.dirname(failedReportPath), { recursive: true });
      }

      fs.writeFileSync(failedReportPath, JSON.stringify(formattedErrors, null, 2));

      // 실패한 테스트 리포트 업로드
      await this.uploadToGitHub(failedReportPath);
    } else {
      console.log('No tests failed.');
    }
  }

  // GitHub에 리포트 업로드
  async uploadToGitHub(filePath: string) {
    const token = process.env.GITHUB_TOKEN;  // 환경 변수에서 GitHub 토큰 사용
    if (!token) {
      console.error('GitHub token is missing!');
      return;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const encodedContent = Buffer.from(fileContent).toString('base64');

      // GitHub API에 POST 요청하여 리포트 업로드
      await axios.put(
        'https://api.github.com/repos/hjh6102/playwright/contents/playwright-report/failed-test-report.json',  // URL 수정
        {
          message: 'Upload Playwright failed test report',
          content: encodedContent,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log('Failed test report uploaded to GitHub!');
    } catch (error) {
      console.error('Error uploading to GitHub:', error);
    }
  }
}
