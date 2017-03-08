# ag-grid-ng2配置说明
## 输入属性
```
[gridOptions]="gridOptions" //为表格默认配置附加操作
[columnDefs]="columnDefs"   //列配置，包括表头、渲染逻辑、筛选逻辑等
[rowData]="rowData"         //行配置，即表格数据
```
## 配置属性
```
enableColResize             //列可调整宽度，不配置则不可调整
enableSorting               //整个表格可排序，不配置则整个表格各列都能排序
enableFilter                //整个表格可筛选
groupHeaders                //
suppressRowClickSelection   //禁止点击单元格选中行
debug                       //debug
rowHeight="22"              //设置每一行高度
rowSelection="multiple"     //设置可多选行，值为‘single’时为单选，不设置则单击单元格不能选中行
```

## 事件

### 表格、行、单元格事件
```
(modelUpdated)="onModelUpdated()"                     //表格数据加载完成
(cellClicked)="onCellClicked($event)"                 //单元格单击
(cellDoubleClicked)="onCellDoubleClicked($event)"     //单元格双击
(cellContextMenu)="onCellContextMenu($event)"         //
(cellValueChanged)="onCellValueChanged($event)"       //单元格值变化的时候
(cellFocused)="onCellFocused($event)"                 //单元格选中
(rowSelected)="onRowSelected($event)"                 //行被选中
(selectionChanged)="onSelectionChanged()"             //被选中行数量发生变化
(beforeFilterChanged)="onBeforeFilterChanged()"       //筛选执行之前
(afterFilterChanged)="onAfterFilterChanged()"         //筛选执行之后
(filterModified)="onFilterModified()"                 //筛选条件更改时
(beforeSortChanged)="onBeforeSortChanged()"           //排序执行之前
(afterSortChanged)="onAfterSortChanged()"             //排序执行之后
(virtualRowRemoved)="onVirtualRowRemoved($event)"     //
(rowClicked)="onRowClicked($event)"                   //行被点击
(gridReady)="onReady($event)"                         //表格加载完成可用
```
### 表格列事件
```
(columnEverythingChanged)="onColumnEvent($event)"     //
(columnRowGroupChanged)="onColumnEvent($event)"
(columnValueChanged)="onColumnEvent($event)"
(columnMoved)="onColumnEvent($event)"                 //列移动
(columnVisible)="onColumnEvent($event)"               //列显示隐藏
(columnGroupOpened)="onColumnEvent($event)"
(columnResized)="onColumnEvent($event)"               //表格列宽度调整时
(columnPinnedCountChanged)="onColumnEvent($event)"    //列是否固定属性变化时
```