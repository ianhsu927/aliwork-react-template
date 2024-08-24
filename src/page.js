/**
 * @typedef {import("./App").default} App
 */

/**
 * @description 设置 state 的包装函数, 类似于 react hooks 中的 useState
 * @param {object} state
 */
export function setStateWrap(state) {
  this.setState(state);
  if (state) {
    state.hasOwnProperty("params") && this.sideEffect();
  }
}

export const useState = (partialState) => this.setState(partialState);

/** @this {App} */
export async function didMount() {
  this.checkDingtalk() && this.setState({ isDingTalk: true });
}
/** @this {App} */
export function handleSearch() {}
export function handleFilter(filterParams) {}

/**
 * @description 触发加载数据, 类似于 react hooks 中的 useEffect
 * @this {App}
 */
export async function sideEffect(searchFieldJson = {}) {
  this.setState({
    loading: true,
  });
  const params = {
    pageSize: this.state.pageSize,
    currentPage: this.state.current,
    searchFieldJson: JSON.stringify(searchFieldJson),
  };
  const response = await this.dataSourceMap.fetcher.load(params);
  this.setState({
    dataSource: response.data,
    total: response.totalCount,
    loading: false,
  });
}

export function checkDingtalk() {
  return window.navigator && /dingtalk/i.test(window.navigator.userAgent);
}
