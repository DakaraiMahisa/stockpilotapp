import { dashboardMock } from "../mock/dashboard.mock";

import type { DashboardDto } from "../types";

interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

class DashboardApi {
  async getDashboard(): Promise<ApiResponse<DashboardDto>> {
    // Simulate a real network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: null,
      data: dashboardMock,
    };
  }
}

export const dashboardApi = new DashboardApi();
