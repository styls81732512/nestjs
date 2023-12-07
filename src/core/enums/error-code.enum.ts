export enum ErrorCode {
  /// Global Type
  /** 通用所有 type orm 的錯誤 */
  GLOBAL_TYPE_ORM = '50001',

  /** 通用所有 httpRequest 的錯誤 */
  GLOBAL_HTTP_REQUEST = '50002',

  GLOBAL_PERMISSION_DENIED = '50003',

  /** 通用所有驗證錯誤 */
  GLOBAL_VALIDATE_PIPE = '40000',

  /// Partial Type
  /** 指定資料不存在 */
  NOT_EXIST = '01',

  /** 未預期的檔案格式 */
  UNEXPECTED_FILE_FORMAT = '02',

  /** 未預期的資料格式 */
  UNEXPECTED_DATA_FORMAT = '03',

  /** 未驗證 */
  UNAUTHORIZED = '04',

  /** 請求太頻繁 */
  TOO_MANY_REQUESTS = '05',

  /** 短信驗證碼錯誤 */
  VERIFY_OPT_PIN_FAIL = '06',

  /** 已經有免費特權 */
  ALREADY_HAD_FREE_PRIVILEGE = '07',

  /** 沒有足夠點數購買 */
  NO_ENOUGH_POINTS = '08',

  /** 已經購買了視頻 */
  VIDEO_ALREADY_BROUGHT = '09',

  /** 驗簽錯誤 */
  VERIFY_SIGNATURE_FAILED = '10',

  /** 付款金額超出渠道範圍 */
  ORDER_AMOUNT_EXCEEDED_CHANNEL_RANGE = '11',

  /** 三方支付請求失敗 */
  THIRD_PARTY_PAYMENT_REQUEST_FAIL = '12',

  /** 輸入值重複 */
  DUPLICATE_ENTRY = '13',

  /** 帳號或密碼錯誤 */
  WRONG_ACCOUNT_OR_PASSWORD = '14',

  /** 帳號已停用 */
  ACCOUNT_DISABLED = '15',

  /** 訂單已經被處理 */
  ORDER_HAS_BEEN_PROCESSED = '16',

  /** OTP驗證短信一分鐘發送過多次驗證 */
  OTP_TOO_MANY_REQUESTS = '17',

  /** OTP驗證手機號碼不正確 */
  OTP_MOBILE_ERROR = '18',

  /** OTP驗證手機號碼不正確 */
  OTP_GLOBAL_ERROR = '19',

  /** 沒有足夠的佣金 */
  NO_ENOUGH_COMMISSION = '20',

  /** 資金密碼錯誤 */
  WRONG_PAYMENT_PIN = '21',

  /** 提款金額不能小於0 */
  APPLY_AMOUNT_NOT_LESS_ZERO = '22',

  /** 提款已經被處理 */
  WITHDRAWAL_HAS_BEEN_PROCESSED = '23',

  /** 51 LA 調用次數已達上限 */
  CALL_HAS_REACHED_LIMIT = '5006',

  /** 此狀態不能進行打包 */
  STATUS_CANNOT_PACKED = '24',

  /** 打包進行中狀態多於五筆 */
  PENDING_STATUS_MORE_THAN_FIVE = '25',

  /** 三方支付請求失敗 */
  THIRD_PARTY_CALLBACK_REQUEST_FAIL = '26',

  /** 批量打包無任何可以執行的代理 */
  APK_BATCH_PACKED_NO_ANY_HANDLE_AGENT = '27',

  /** 無可用通道 */
  USED_ORDER_CHANNEL_EXCEEDED_LIMIT = '28',

  /** 提款金額不正確 */
  APPLY_AMOUNT_ERROR = '29',

  /** 與集成 API 通訊失敗 */
  REQUEST_TP_GAME_PLATFORM_ERROR = '30',

  /** 系統通知發送失敗 */
  SYSTEM_NOTICE_SEND_FAILED = '31',

  /** 金幣派發失敗 */
  DISTRIBUTED_POINTS_ERROR = '32',

  /** 帳號已永久停用 */
  ACCOUNT_DEACTIVATED = '33',

  /** 無申請資料 */
  NO_APPLY_DATA = '34',

  /** 此資料已存在 */
  ALREADY_EXIST = '35',

  /** 集成 系統維護狀態 */
  TP_GAME_PLATFORM_SERVER_MAINTAIN = '9999',
}
