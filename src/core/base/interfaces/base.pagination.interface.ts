export interface IBasePagination<T> {
  /** 總筆數 */
  total: number;

  /** 當前頁面 */
  current: number;

  /** 每頁顯示筆數 */
  limit: number;

  /** 資料集 */
  data: T[];
}
