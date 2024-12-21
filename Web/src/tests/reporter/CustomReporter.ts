import { Reporter, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export class CustomReporter implements Reporter {
  // 테스트 실행이 끝난 후 호출
  async onEnd(result: FullResult) {
    console.log('All tests have completed!');

    // HTML 리포트 파일 경로
    const htmlReportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
    
    if (fs.existsSync(htmlReportPath)) {
      console.log('HTML report found, uploading to GitHub...');

      // GitHub에 업로드
      await this.uploadToGitHub(htmlReportPath);
    } else {
      console.log('HTML report not found!');
    }
  }

  // GitHub에 HTML 리포트 업로드
  async uploadToGitHub(filePath: string) {
    const token = process.env.GITHUB_TOKEN;  // 환경 변수에서 GitHub 토큰 사용
    if (!token) {
      console.error('GitHub token is missing!');
      return;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const encodedContent = Buffer.from(fileContent).toString('base64');

      // GitHub API에 POST 요청하여 HTML 리포트 업로드
      await axios.put(
        'https://api.github.com/repos/hongjihyun/playwright/contents/reports/index.html',
        {
          message: 'Upload Playwright HTML report',
          content: encodedContent,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log('HTML report uploaded to GitHub!');
    } catch (error) {
      console.error('Error uploading to GitHub:', error);
    }
  }
}
