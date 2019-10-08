import React from "react";
import {
  InfiniteLoader,
  WindowScroller,
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";

class PageChildern extends React.Component {
  constructor(props) {
    super(props);
    this.cache = new CellMeasurerCache({
      defaultHeight: 50,
      fixedWidth: true
    });
    this.ref = React.createRef();
    this.state = {
      targetDom: window
    };
  }

  componentDidMount() {
    const targetDom = document.querySelector("#target-dom");
    this.setState({ targetDom });
  }
  render() {
    const { list, hasNextPage } = this.props;
    const rowCount = hasNextPage ? list.length + 1 : list.length;
    console.log(list);

    return (
      <div
        id="target-dom"
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
        ref={this.ref}
      >
        <div style={{ height: "100px" }}>测试呀</div>
        <div style={{ display: "flex", flex: 1 }}>
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.props.loadMoreRows}
            rowCount={rowCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller scrollElement={this.state.targetDom}>
                {({ height, isScrolling, scrollTop }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        autoHeight
                        ref={registerChild}
                        className="List"
                        height={height}
                        width={width}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        onRowsRendered={onRowsRendered}
                        rowCount={rowCount}
                        rowHeight={this.cache.rowHeight}
                        rowRenderer={this.rowRenderer}
                      />
                    )}
                  </AutoSizer>
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        </div>
      </div>
    );
  }

  isRowLoaded = ({ index }) => {
    const { hasNextPage, list } = this.props;
    return !hasNextPage || index < list.length;
  };

  rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    let content;

    if (!this.isRowLoaded({ index })) {
      content = "Loading...";
    } else {
      content = <div>{this.props.list[index]}</div>;
    }
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div key={key} style={style}>
          <div style={{ border: "1px solid red", margin: "4px" }}>
            {content}
          </div>
        </div>
      </CellMeasurer>
    );
  };
}

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  render() {
    const hasNextPage = this.state.list.length < 100;
    return (
      <PageChildern
        list={this.state.list}
        loadMoreRows={this.loadMoreRows}
        hasNextPage={hasNextPage}
      />
    );
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const tempText =
      "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试";
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      const { list } = this.state;
      const tempData = Array(10)
        .fill("1")
        .map((item, index) => {
          if (index % 8 === 0 && index !== 0) {
            return tempText;
          }
          return this.state.list.length + index;
        });
      this.setState({ list: list.concat(tempData) });
    });
  };
}
