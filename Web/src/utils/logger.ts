import dayjs = require('dayjs');
export class TestLogger {
  private static instance: TestLogger;
  private logs: string[];

  private constructor() {
    this.logs = [];
  }

  public static getInstance(): TestLogger {
    if (!TestLogger.instance) {
      TestLogger.instance = new TestLogger();
    }
    return TestLogger.instance;
  }

  getLog(): string[] {
    return this.logs;
  }

  addLog(log: string = ''): void {
    this.logs.push(`[Hits][${this.getTime()}] ${log}`);
  }

  printLogs(): void {
    this.logs.forEach((log) => {
      // eslint-disable-next-line no-console
      console.log(log);
    });
  }

  reset(): void {
    this.logs = [];
  }

  getTime() {
    const koreanTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

    const hours = koreanTime.getHours().toString().padStart(2, '0');
    const minutes = koreanTime.getMinutes().toString().padStart(2, '0');
    const seconds = koreanTime.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  static getDate() {
    return dayjs().format('YYYY-MM-DD_HH-mm-ss');
  }
}
