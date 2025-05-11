# React + TypeScript + Vite 專案

這是一個使用 [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev) 建立的現代化前端專案。

## 線上演示

本專案已部署在 GCP 上，您可以通過以下網址訪問：

[https://interview20250503.jerryjie.online/](https://interview20250503.jerryjie.online/)

## 啟動專案

### 使用 Docker 啟動

#### 前提條件

-   已安裝 [Docker](https://www.docker.com/get-started)

#### 從 Docker Hub 拉取映像

您可以直接從 Docker Hub 拉取預構建的映像：

```bash
docker pull e25254/interview_20250503:v1.0.0
```

然後運行容器：

```bash
docker run -p 3000:3000 e25254/interview_20250503:v1.0.0
```

#### 本地構建映像

1. **構建 Docker 映像**

    ```bash
    docker build -t interview-app .
    ```

2. **運行容器**

    ```bash
    docker run -p 3000:3000 interview-app
    ```

3. **訪問應用**

    打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 不使用 Docker 啟動

#### 前提條件

-   已安裝 [Node.js](https://nodejs.org/) (版本為`v20.x`)
-   已安裝 npm (通常隨 Node.js 一起安裝)

#### 開發環境

1. **安裝依賴**

    ```bash
    npm install
    ```

2. **啟動開發服務器**

    ```bash
    npm run dev
    ```

3. **訪問應用**

    打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

#### 生產環境

1. **安裝依賴**

    ```bash
    npm install
    ```

2. **構建應用**

    ```bash
    npm run build
    ```

3. **預覽生產構建**

    ```bash
    npm run preview
    ```

4. **訪問應用**

    打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 技術實作亮點

-   **響應式設計**：採用 Tailwind CSS 實現精細的響應式布局，提供跨裝置的一致視覺體驗和極佳的用戶交互
-   **優化構建流程**：應用 Docker 多階段構建技術，實現輕量化部署並提升 CI/CD 管道效率
-   **伺服器配置**：精心調整的 Nginx 設置，提供靜態資源緩存、GZIP 壓縮及安全性增強
-   **模組化架構**：依照功能將代碼分為 components、containers、modules 等層級，提高可維護性和可擴展性
-   **WebSocket 效能優化**：實作資料 throttle 機制，有效控制重新渲染頻率，顯著降低資料閃爍問題，優化使用者體驗
-   **交易機制智能優化**：精確遵循 API 文檔規範，在交叉交易金額變動時實現智能重新訂閱機制，確保數據準確性與實時性
