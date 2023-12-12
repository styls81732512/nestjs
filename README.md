# 保戶關係 API

## Running the service

```bash
# serve
npm run start

# run migration
npm run migration-dev:run
```

### 目錄結構

- src

  - core
    - 相關 base class、database config、exception filter
  - migrations
    - master-migration
      - 主庫執行的migration檔
  - modules
    - policyholders
      - controllers
        - admin // 後台controller
      - dto
      - entities
      - enums
      - models
      - policyholders.module.ts
      - policyholders.service.ts

- 文件位置: src/modules/policyholders/controllers/admin/policyholder-admin.controller.ts
- 請求方式:
  - GET
  - content-type: application/json
- 請求地址: /admin/policyholders/policyholder
- 請求參數:

```json
{
  "id": "1"
}
```

- 返回結果:

```json
{
  "code": "00",
  "data": {
    "code": "1",
    "name": "保戶1",
    "registration_date": "2023-12-08T07:53:47.000Z",
    "introducer_code": null,
    "l": [
      {
        "code": "2",
        "name": "保戶2",
        "registration_date": "2023-12-08T07:53:52.000Z",
        "introducer_code": "1"
      },
      {
        "code": "4",
        "name": "保戶4",
        "registration_date": "2023-12-08T07:54:02.000Z",
        "introducer_code": "2"
      },
      {
        "code": "6",
        "name": "保戶6",
        "registration_date": "2023-12-08T08:35:31.000Z",
        "introducer_code": "2"
      },
      {
        "code": "8",
        "name": "保戶8",
        "registration_date": "2023-12-08T08:35:39.000Z",
        "introducer_code": "4"
      },
      {
        "code": "9",
        "name": "保戶9",
        "registration_date": "2023-12-08T08:35:44.000Z",
        "introducer_code": "4"
      }
    ],
    "r": [
      {
        "code": "3",
        "name": "保戶3",
        "registration_date": "2023-12-08T07:53:57.000Z",
        "introducer_code": "1"
      },
      {
        "code": "5",
        "name": "保戶5",
        "registration_date": "2023-12-08T07:54:06.000Z",
        "introducer_code": "3"
      },
      {
        "code": "7",
        "name": "保戶7",
        "registration_date": "2023-12-08T08:35:35.000Z",
        "introducer_code": "3"
      },
      {
        "code": "10",
        "name": "保戶10",
        "registration_date": "2023-12-08T08:35:48.000Z",
        "introducer_code": "5"
      },
      {
        "code": "11",
        "name": "保戶11",
        "registration_date": "2023-12-08T08:35:54.000Z",
        "introducer_code": "5"
      }
    ]
  }
}
```
