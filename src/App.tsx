import React from "react";
import * as Next from "@alifd/next";
import "@alifd/next/dist/next.css";
import _ from "lodash";
import moment from "moment";
import {
  didMount,
  sideEffect,
  handleFilter,
  handleSearch,
  checkDingtalk,
  printQRCode,
} from "./page";
import { $Util } from "./utils";
import { IDataSource } from "./types";

interface IColumn {
  title: string;
  dataIndex: string;
  width: number;
  type?: "time";
}

export default class AliworkComponent extends React.Component {
  componentDidMount() {
    didMount.call(this);
  }
  state: Readonly<{
    dataSource: Record<string, string | number | null>[];
    current: number;
    pageSize: number;
    totalCount: number;
    mainColumns: IColumn[];
    detailColumns: IColumn[];
    loading: boolean;
    isDingTalk: boolean;
    selectedData?: Record<string, string | number | null>[];
  }> = {
    dataSource: [],
    current: 1,
    pageSize: 10,
    totalCount: 0,
    mainColumns: [],
    detailColumns: [],
    loading: false,
    isDingTalk: false,
    selectedData: [],
  };

  dataSourceMap = {};
  handleFilter = handleFilter;
  handleSearch = handleSearch;
  printQRCode = printQRCode;
  checkDingtalk = checkDingtalk;
  sideEffect = sideEffect;

  utils = $Util;
  render() {
    const { Table, Pagination, Search, Button } = Next;
    Search.displayName = "_Search";
    Button.displayName = "_Button";

    return (
      <div className="table-container">
        <Search
          className="main-search"
          onSearch={this.handleSearch.bind(this)}
        />
        <div>
          <Button
            className="print-button"
            onClick={this.printQRCode.bind(this)}
            disabled={this.state.isDingTalk}
          >
            打印二维码
          </Button>
          <Button className="print-button" disabled={this.state.isDingTalk}>
            打印发货单
          </Button>
        </div>
        <Table.StickyLock
          rowSelection={{
            mode: "multiple",
            onSelect: (selected, record, records) =>
              this.setState({ selectedData: records }),
          }}
          className="status-table"
          dataSource={this.state.dataSource}
          loading={this.state.loading}
          primaryKey="formInstId" // 必须有primaryKey
          onFilter={this.handleFilter.bind(this)}
        >
          {_.map(this.state.mainColumns, (column) => (
            <Table.Column
              title={column.title}
              dataIndex={column.dataIndex}
              width={column.width}
              key={column.dataIndex}
            />
          ))}
        </Table.StickyLock>
        <Pagination
          className="footer-pagination"
          current={this.state.current}
          total={this.state.totalCount}
          totalRender={(total) => `总共: ${total} 条`}
          pageSize={this.state.pageSize}
          onChange={(current) => {
            this.setState({ current });
            this.sideEffect();
          }}
        />
      </div>
    );
  }
}
