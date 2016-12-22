<template>
  <div class="bootstrap-table">
    <div class="fixed-table-toolbar">
      <div class="bs-bars" :class="'float-xs-' + opts.toolbarAlign">
        <slot></slot>
      </div>
      <div class="columns btn-group"
           :class="['columns-' + opts.buttonsAlign, 'float-xs-' + opts.buttonsAlign]">
        <button v-if="opts.showPaginationSwitch"
                class="btn" type="button" name="paginationSwitch"
                :class="['btn-' + opts.buttonsClass, 'btn-' + opts.iconSize]"
                :title="opts.formatPaginationSwitch()"
                @click="togglePagination">
          <i :class="[opts.iconsPrefix, paginationSwitchIcon]"></i>
        </button>
        <button v-if="opts.showRefresh"
                class="btn" type="button" name="refresh"
                :class="['btn-' + opts.buttonsClass, 'btn-' + opts.iconSize]"
                :title="opts.formatRefresh()"
                @click="refresh">
          <i :class="[opts.iconsPrefix, opts.icons.refresh]"></i>
        </button>
        <button v-if="opts.showToggle"
                class="btn" type="button" name="toggle"
                :class="['btn-' + opts.buttonsClass, 'btn-' + opts.iconSize]"
                :title="opts.formatToggle()"
                @click="toggleView">
          <i :class="[opts.iconsPrefix, opts.icons.toggle]"></i>
        </button>
        <div v-if="opts.showColumns" class="keep-open btn-group"
             :title="opts.formatColumns()">
          <button type="button" data-toggle="dropdown"
                  class="btn dropdown-toggle"
                  :class="['btn-' + opts.buttonsClass, 'btn-' + opts.iconSize]">
            <i :class="[opts.iconsPrefix, opts.icons.columns]"></i>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li v-for="(column, i) in fieldColumns" @click.stop>
              <label v-if="!(column.radio || column.checkbox || opts.cardView && !column.cardVisible)">
                <input type="checkbox" :data-field="column.filed"
                       :disabled="toggleColumnsCount <= opts.minimumCountColumns && column.visible"
                       v-model="column.visible"> {{column.title}}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="opts.search" class=" search" :class="'float-xs-' + opts.searchAlign">
        <input class="form-control" :class="'input-' + opts.iconSize"
               type="text" :placeholder="opts.formatSearch()"
               v-model="searchText" @keyup="search($event)">
      </div>
    </div>
    <div class="fixed-table-container"
         :style="{'padding-bottom': (opts.height ? view.headerHeight : 0) + 'px', height: opts.height + 'px'}">
      <div class="fixed-table-header" v-if="opts.showHeader && !opts.cardView && opts.height">
        <table :class="opts.classes">
          <thead>
          <tr>
            <th v-if="!opts.cardView && opts.detailView"
                class="detail" :rowspan="columns.length">
              <div class="fht-cell"></div>
            </th>
            <template v-for="column in _columns">
              <th v-if="!(!column.visible || opts.cardView && !column.cardVisible)"
                  :title="column.titleTooltip"
                  :class="[{'bs-checkbox': column.checkbox || column.radio}, column.class]"
                  :style="column.style"
                  :rowspan="column.rowspan"
                  :colspan="column.colspan"
                  :data-field="column.field"
                  tabindex="0">
                <div class="th-inner"
                     :class="[{sortable: opts.sortable && column.sortable}, opts.sortName == column.field ? opts.sortOrder : 'both']"
                     @click="onSort(column)"
                     @keypress.enter="onSort(column)">

                  <input v-if="column.checkbox && !opts.singleSelect && opts.checkboxHeader"
                         name="btSelectAll" type="checkbox" v-model="selected.all"
                         @change="onCheckAllChange">

                  <template v-if="!column.checkbox && !column.radio">
                    {{column.title}}
                  </template>
                </div>
                <div class="fht-cell"></div>
              </th>
            </template>
          </tr>
          </thead>
        </table>
      </div>
      <div class="fixed-table-body">
        <div v-if="loading" class="fixed-table-loading"
             :style="{top: view.headerHeight + 1 + 'px'}">
          <div class="fixed-table-loading-bg"></div>
          <div class="fixed-table-loading-text">
            {{opts.formatLoadingMessage()}}
          </div>
        </div>
        <table :class="opts.classes">
          <thead v-if="opts.showHeader && !opts.cardView && !opts.height">
          <tr>
            <th v-if="!opts.cardView && opts.detailView"
                class="detail" rowspan="columns.length">
              <div class="fht-cell"></div>
            </th>
            <template v-for="column in columns">
              <th v-if="!(!column.visible || opts.cardView && !column.cardVisible)"
                  :title="column.titleTooltip"
                  :class="[{'bs-checkbox': column.checkbox || column.radio}, column.class]"
                  :style="column.style"
                  :rowspan="column.rowspan"
                  :colspan="column.colspan"
                  :data-field="column.field"
                  tabindex="0">
                <div class="th-inner"
                     :class="[{sortable: opts.sortable && column.sortable}, opts.sortName == column.field ? opts.sortOrder : 'both']"
                     @click="onSort(column)"
                     @keypress.enter="onSort(column)">

                  <input v-if="column.checkbox && !opts.singleSelect && opts.checkboxHeader"
                         name="btSelectAll" type="checkbox" v-model="selected.all"
                         @change="onCheckAllChange">

                  <template v-if="!column.checkbox && !column.radio">
                    {{column.title}}
                  </template>
                </div>
                <div class="fht-cell"></div>
              </th>
            </template>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in renderData"
              :class="item.class"
              :data-index="i"
              :data-uniqueid="item[opts.uniqueId]">

            <template v-if="!opts.cardView && opts.detailView">
              <td>
                <a class="detail-icon" href="javascript:">
                  <i :class="[opts.iconsPrefix, icons.detailOpen]"></i>
                </a>
              </td>
            </template>

            <template v-if="opts.cardView">
              <td :colspan="header.fields.length">
                <div class="card-views">
                  <div v-for="(field, j) in header.fields" class="card-view"
                       :class="fieldColumns[j].class">
                    <template v-if="!(!fieldColumns[j].visible || opts.cardView && !fieldColumns[j].cardVisible)">
                      <input v-if="fieldColumns[j].checkbox"
                             :name="opts.selectItemName"
                             :value="item"
                             v-model="selected.items"
                             @change="onCheckItemChange(item)"
                             type="checkbox">
                      <input v-else-if="fieldColumns[j].radio"
                             :name="opts.selectItemName"
                             :value="item"
                             v-model="selected.items"
                             @change="onCheckItemChange(item)"
                             type="radio">
                      <div v-else class="card-view">
                        <span v-if="opts.showHeader" class="title">{{fieldColumns[j].title}}</span>
                        <span class="value">{{fieldValue(item,field,i,j)}}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </td>
            </template>
            <template v-else>
              <template v-for="(field, j) in header.fields">
                <template v-if="!(!fieldColumns[j].visible || opts.cardView && !fieldColumns[j].cardVisible)">
                  <td v-if="fieldColumns[j].checkbox || fieldColumns[j].radio"
                      class="bs-checkbox" :class="fieldColumns[j].class">
                    <input v-if="fieldColumns[j].checkbox"
                           :name="opts.selectItemName"
                           :value="item"
                           v-model="selected.items"
                           @change="onCheckItemChange(item)"
                           type="checkbox">
                    <input v-else :name="opts.selectItemName"
                           :value="item" v-model="selected.items"
                           @change="onCheckItemChange(item)"
                           type="radio">
                  </td>
                  <td v-else
                      @click="onTdClick(item, fieldColumns[j].field, $event)"
                      @dblclick="onTdClick(item, fieldColumns[j].field, $event)">
                    {{fieldValue(item,field,i,j)}}
                  </td>
                </template>
              </template>
            </template>
          </tr>
          <tr v-if="!renderData.length" class="no-records-found">
            <td :colspan="columnsLength + 1">
              {{opts.formatNoMatches()}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="opts.pagination" class="fixed-table-pagination">
        <div class="pagination-detail" :class="'float-xs-' + opts.paginationDetailHAlign">
            <span class="pagination-info">
                <template v-if="opts.onlyInfoPagination">
                {{opts.formatDetailPagination(opts.totalRows)}}
                </template>
                <template v-else>
                {{opts.formatShowingRows(pageFrom, pageTo, opts.totalRows)}}
                </template>
            </span>
          <span v-if="!opts.onlyInfoPagination" class="page-list">
            {{opts.formatRecordsPerPage('pageNumber').split('pageNumber')[0]}}
              <span class="btn-group"
                    :class="opts.paginationVAlign == 'top' || opts.paginationVAlign == 'both' ? 'dropdown' : 'dropup'">
                <button type="button" class="btn dropdown-toggle" data-toggle="dropdown"
                        :class="['btn-' + opts.buttonsClass, 'btn-' + opts.iconSize]">
                  <span class="page-size"> {{opts.pageSize === opts.totalRows ? opts.formatAllRows() : opts.pageSize}} </span>
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu">
                  <li class="dropdown-item"
                      :class="{active: page == opts.formatAllRows() || page == opts.pageSize}"
                      v-for="page in opts.pageList"
                      @click="onPageListChange">
                    <a href="javascript:">{{page}}</a>
                  </li>
                </ul>
              </span>{{opts.formatRecordsPerPage('pageNumber').split('pageNumber')[1]}}</span>
        </div>
        <div v-if="totalPages > 1" :class="'float-xs-' + opts.paginationHAlign">
          <ul class="pagination" :class="'pagination-' + opts.iconSize">
            <li class="page-item" @click="onPagePre">
              <a href="javascript:" class="page-link">{{opts.paginationPreText}}</a>
            </li>
            <li v-if="pageInfo.first" class="page-item"
                :class="{active: 1 == opts.pageNumber}"
                @click="onPageFirst">
              <a href="javascript:" class="page-link">1</a>
            </li>
            <li v-if="pageInfo.firstSeparator" class="page-first-separator disabled">
              <a href="javascript:" class="page-link">...</a>
            </li>
            <li class="page-item" :class="{active: i == opts.pageNumber}" v-for="i in pageInfo.list"
                @click="onPageNumber">
              <a href="javascript:" class="page-link">{{i}}</a>
            </li>
            <li v-if="pageInfo.lastSeparator" class="page-last-separator disabled">
              <a href="javascript:" class="page-link">...</a>
            </li>
            <li v-if="pageInfo.last" class="page-item"
                :class="{active: totalPages == opts.pageNumber}"
                @click="onPageLast">
              <a href="javascript:" class="page-link">{{totalPages}}</a>
            </li>
            <li class="page-item" @click="onPageNext">
              <a href="javascript:" class="page-link">{{opts.paginationNextText}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  // it only does '%s', and return '' when arguments are undefined
  var sprintf = function (str) {
    var args = arguments,
      flag = true,
      i = 1;

    str = str.replace(/%s/g, function () {
      var arg = args[i++];

      if (typeof arg === 'undefined') {
        flag = false;
        return '';
      }
      return arg;
    });
    return flag ? str : '';
  };

  // http://jsfiddle.net/wenyi/47nz7ez9/3/
  var setFieldIndex = function (columns) {
    var i, j, k,
      totalCol = 0,
      flag = [];

    for (i = 0; i < columns[0].length; i++) {
      totalCol += columns[0][i].colspan || 1;
    }

    for (i = 0; i < columns.length; i++) {
      flag[i] = [];
      for (j = 0; j < totalCol; j++) {
        flag[i][j] = false;
      }
    }

    for (i = 0; i < columns.length; i++) {
      for (j = 0; j < columns[i].length; j++) {
        var r = columns[i][j],
          rowspan = r.rowspan || 1,
          colspan = r.colspan || 1,
          index = $.inArray(false, flag[i]);

        if (colspan === 1) {
          r.fieldIndex = index;
          // when field is undefined, use index instead
          if (typeof r.field === 'undefined') {
            r.field = index;
          }
        }

        for (k = 0; k < rowspan; k++) {
          flag[i + k][index] = true;
        }
        for (k = 0; k < colspan; k++) {
          flag[i][index + k] = true;
        }
      }
    }
  };

  var getFieldIndex = function (columns, field) {
    var index = -1;

    $.each(columns, function (i, column) {
      if (column.field === field) {
        index = i;
        return false;
      }
      return true;
    });
    return index;
  };

  var calculateObjectValue = function (self, name, args, defaultValue) {
    var func = name;

    if (typeof name === 'string') {
      // support obj.func1.func2
      var names = name.split('.');

      if (names.length > 1) {
        func = window;
        $.each(names, function (i, f) {
          func = func[f];
        });
      } else {
        func = window[name];
      }
    }
    if (typeof func === 'object') {
      return func;
    }
    if (typeof func === 'function') {
      return func.apply(self, args);
    }
    if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
      return sprintf.apply(this, [name].concat(args));
    }
    return defaultValue;
  };

  var escapeHTML = function (text) {
    if (typeof text === 'string') {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/`/g, '&#x60;');
    }
    return text;
  };

  var getItemField = function (item, field, escape, undefinedText) {
    var value = item;

    if (typeof field !== 'string' || item.hasOwnProperty(field)) {
      return escape ? escapeHTML(item[field]) : item[field];
    }
    var props = field.split('.');
    for (var p in props) {
      value = value && value[props[p]];
    }
    return (escape ? escapeHTML(value) : value) || undefinedText;
  };

  var checkAllIndexOf = function (type, items, data, from, to) {
    if (type === 'radio') {
      return false;
    }
    for (var i = from; i < to; i++) {
      if (items.indexOf(data[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var DEFAULTS = {
    classes: 'table table-hover',
    height: undefined,
    undefinedText: '-',
    escape: false,
    showHeader: true,
    showFooter: false,
    cardView: false,
    locale: undefined,

    method: 'get',
    url: undefined,
    contentType: 'application/json',
    dataType: 'json',
    cache: true,
    ajax: undefined,
    ajaxOptions: {},
    queryParams: function (params) {
      return params;
    },
    queryParamsType: 'limit', // undefined
    responseHandler: function (res) {
      return res;
    },
    responseTotalField: 'total',
    responseRowsField: 'rows',

    sortable: true,
    sortName: '',
    sortOrder: 'asc',
    sortStable: false,

    pagination: false,
    sidePagination: 'client', // client or server
    onlyInfoPagination: false,
    totalRows: 0, // no need to set, can be use in getOptions
    pageNumber: 1,
    pageSize: 10,
    pageList: [10, 25, 50, 100],
    paginationPreText: '<',
    paginationNextText: '>',
    paginationHAlign: 'right', //right, left
    paginationVAlign: 'bottom', //bottom, top, both
    paginationDetailHAlign: 'left', //right, left

    search: false,
    searchText: '',
    strictSearch: false,
    searchOnEnterKey: false,
    trimOnSearch: true,
    searchTimeOut: 500,
    searchAlign: 'right',

    showPaginationSwitch: false,
    showToggle: false,
    showRefresh: false,
    showColumns: false,
    minimumCountColumns: 1,
    buttonsAlign: 'right',
    toolbarAlign: 'left',

    idField: undefined,
    clickToSelect: false,
    singleSelect: false,
    selectItemName: 'btSelectItem',
    uniqueId: undefined,
    checkboxHeader: true,
    maintainSelected: false,

    detailView: false,
    detailFormatter: function (index, row) {
      return '';
    },

    iconSize: '',
    buttonsClass: 'default',
    iconsPrefix: 'fa', // fa (font awesome)
    icons: {
      paginationSwitchDown: 'fa-caret-square-o-down',
      paginationSwitchUp: 'fa-caret-square-o-up',
      refresh: 'fa-refresh',
      toggle: 'fa-list-alt',
      columns: 'fa-th',
      detailOpen: 'fa-plus',
      detailClose: 'fa-minus'
    },

    rowStyle: function (row, index) {
      return {};
    },
    footerStyle: function (row, index) {
      return {};
    },
  };

  var COLUMN_DEFAULTS = {
    field: undefined,
    title: undefined,
    titleTooltip: undefined,
    width: undefined,
    'class': undefined,
    align: undefined, // left, right, center
    halign: undefined, // left, right, center
    falign: undefined, // left, right, center
    valign: undefined, // top, middle, bottom
    radio: false,
    checkbox: false,
    clickToSelect: true,
    visible: true,
    switchable: true,
    searchable: true,
    searchFormatted: true,
    cardVisible: true,
    formatter: undefined,
    footerFormatter: undefined,
    events: undefined,
    sortable: false,
    order: 'asc', // asc, desc
    sorter: undefined,
    sortName: undefined,
    cellStyle: undefined
  };

  var LOCALES = {};
  LOCALES['en-US'] = LOCALES.en = {
    formatLoadingMessage: function () {
      return 'Loading, please wait...';
    },
    formatRecordsPerPage: function (pageNumber) {
      return sprintf('%s rows per page', pageNumber);
    },
    formatShowingRows: function (pageFrom, pageTo, totalRows) {
      return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
    },
    formatDetailPagination: function (totalRows) {
      return sprintf('Showing %s rows', totalRows);
    },
    formatSearch: function () {
      return 'Search';
    },
    formatNoMatches: function () {
      return 'No matching records found';
    },
    formatPaginationSwitch: function () {
      return 'Hide/Show pagination';
    },
    formatRefresh: function () {
      return 'Refresh';
    },
    formatToggle: function () {
      return 'Toggle';
    },
    formatColumns: function () {
      return 'Columns';
    },
    formatAllRows: function () {
      return 'All';
    }
  };

  $.extend(DEFAULTS, LOCALES['en-US']);

  var BootstrapTable = {
    props: {
      columns: {
        type: Array,
        required: true,
        default: []
      },
      data: {
        type: Array,
        default: []
      },
      options: {
        type: Object,
        default: DEFAULTS
      }
    },
    data() {
      return {
        fieldColumns: {},
        header: {},
        pageFrom: 1,
        pageTo: 1,
        totalPages: 0,
        searchText: '',
        loading: false,
        selected: {
          type: '',
          all: false,
          items: []
        },
        view: {
          headerHeight: 0
        }
      };
    },
    created() {
      this.initLocale();
      this.initTable();
      this.initHeader();
      this.initPagination();
      this.initBody();
      this.initServer();
    },
    computed: {
      opts() {
        return Object.assign({}, DEFAULTS, this.options)
      },
      paginationSwitchIcon() {
        return this.opts.icons[this.opts.pagination ? 'paginationSwitchDown' : 'paginationSwitchUp']
      },
      formatPaginationSwitch() {
        return this.opts.formatPaginationSwitch()
      },
      toggleColumnsCount() {
        var count = 0;
        for (var i in this.fieldColumns) {
          if (!(this.fieldColumns[i].radio || this.fieldColumns[i].checkbox ||
            this.opts.cardView && !this.fieldColumns[i].cardVisible) &&
            this.fieldColumns[i].visible) {
            count++;
          }
        }
        return count;
      },
      renderData() {
        var that = this,
          data = this.data.slice(this.pageFrom - 1, this.pageTo);

        data.forEach(function (item, i) {
          var key,
            style = {},
            csses = [];

          style = calculateObjectValue(that.opts, that.opts.rowStyle, [item, i], style);

          if (style && style.css) {
            for (key in style.css) {
              csses.push(key + ': ' + style.css[key]);
            }
          }
          item.style = style;
          item.csses = csses;
        });

        if (!this.opts.maintainSelected) {
          this.selected.all = false;
          this.selected.items = [];
        } else {
          this.selected.all = checkAllIndexOf(this.selected.type,
            this.selected.items, this.data, this.pageFrom - 1, this.pageTo);
        }

        if (this.opts.sidePagination !== 'server') {
          var s = this.searchText && (this.opts.escape ?
              escapeHTML(this.searchText) : this.searchText).toLowerCase();

          data = s ? $.grep(data, function (item, i) {
            for (var key in item) {
              key = $.isNumeric(key) ? parseInt(key, 10) : key;
              var value = item[key],
                column = that.fieldColumns[getFieldIndex(that.fieldColumns, key)],
                j = $.inArray(key, that.header.fields);

              // Fix #142: search use formatted data
              if (column && column.searchFormatted) {
                value = calculateObjectValue(column,
                  that.header.formatters[j], [value, item, i], value);
              }

              var index = $.inArray(key, that.header.fields);
              if (index !== -1 && that.header.searchables[index] && (typeof value === 'string' || typeof value === 'number')) {
                if (that.opts.strictSearch) {
                  if ((value + '').toLowerCase() === s) {
                    return true;
                  }
                } else {
                  if ((value + '').toLowerCase().indexOf(s) !== -1) {
                    return true;
                  }
                }
              }
            }
            return false;
          }) : data;
        }

        this._renderData = data;
        this.$nextTick(this.resetView);
        return data;
      },
      pageInfo() {
        var i, from, to,
          info = {};
        if (this.totalPages < 5) {
          from = 1;
          to = this.totalPages;
        } else {
          from = this.opts.pageNumber - 2;
          to = from + 4;
          if (from < 1) {
            from = 1;
            to = 5;
          }
          if (to > this.totalPages) {
            to = this.totalPages;
            from = to - 4;
          }
        }

        if (this.totalPages >= 6) {
          if (this.opts.pageNumber >= 3) {
            info.first = true;
            from++;
          }

          if (this.opts.pageNumber >= 4) {
            if (this.opts.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
              from--;
            } else {
              info.firstSeparator = true;
            }

            to--;
          }
        }

        if (this.totalPages >= 7 && this.opts.pageNumber >= (this.totalPages - 2)) {
          from--;
        }

        if (this.totalPages === 6 && this.opts.pageNumber >= this.totalPages - 2) {
          to++;
        } else if (this.totalPages >= 7 && (this.totalPages === 7 ||
          this.opts.pageNumber >= this.totalPages - 3)) {
          to++;
        }

        info.list = [];
        for (i = from; i <= to; i++) {
          info.list.push(i);
        }

        if (this.totalPages >= 8 && this.opts.pageNumber <= this.totalPages - 4) {
          info.lastSeparator = true;
        }

        if (this.totalPages >= 6 && this.opts.pageNumber <= this.totalPages - 3) {
          info.last = true;
        }
        return info;
      },
      columnsLength() {
        return Object.keys(this.fieldColumns).length;
      }
    },
    methods: {
      initLocale() {
        if (!this.opts.locale) {
          return;
        }
        var parts = this.opts.locale.split(/-|_/);
        parts[0].toLowerCase();
        if (parts[1]) parts[1].toUpperCase();
        if (BootstrapTable.locales[this.opts.locale]) {
          // locale as requested
          $.extend(this.opts, BootstrapTable.locales[this.opts.locale]);
        } else if (BootstrapTable.locales[parts.join('-')]) {
          // locale with sep set to - (in case original was specified with _)
          $.extend(this.opts, BootstrapTable.locales[parts.join('-')]);
        } else if (BootstrapTable.locales[parts[0]]) {
          // short locale language code (i.e. 'en')
          $.extend(this.opts, BootstrapTable.locales[parts[0]]);
        }
      },
      initTable() {
        var that = this,
          columns = {};

        if (!Array.isArray(this.columns[0])) {
          this.columns = [this.columns];
        }
        setFieldIndex(this.columns);
        this.columns.forEach(function (_columns, i) {
          _columns.forEach(function (column, j) {
            column = $.extend({}, COLUMN_DEFAULTS, column);

            if (typeof column.fieldIndex !== 'undefined') {
              columns[column.fieldIndex] = column;
            }

            that.columns[i][j] = column;
          });
        });
        this.fieldColumns = columns;
        this.searchText = this.opts.searchText;
        this.timeoutId = 0;
      },
      initHeader() {
        var that = this,
          visibleColumns = {};

        this.header = {
          fields: [],
          styles: [],
          classes: [],
          formatters: [],
          events: [],
          sorters: [],
          sortNames: [],
          cellStyles: [],
          searchables: []
        };
        this.columns.forEach(function (columns, i) {
          columns.forEach(function (column, j) {
            var halign = '', // header align style
              align = '', // body align style
              style = '',
              class_ = sprintf(' class="%s"', column['class']),
              unitWidth = 'px',
              width = column.width;

            if (column.width !== undefined && (!that.opts.cardView)) {
              if (typeof column.width === 'string') {
                if (column.width.indexOf('%') !== -1) {
                  unitWidth = '%';
                }
              }
            }
            if (column.width && typeof column.width === 'string') {
              width = column.width.replace('%', '').replace('px', '');
            }

            halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
            align = sprintf('text-align: %s; ', column.align);
            style = sprintf('vertical-align: %s; ', column.valign);
            style += sprintf('width: %s; ', (column.checkbox || column.radio) && !width ?
              '36px' : (width ? width + unitWidth : undefined));

            column.style = halign + style;

            if (typeof column.fieldIndex !== 'undefined') {
              that.header.fields[column.fieldIndex] = column.field;
              that.header.styles[column.fieldIndex] = align + style;
              that.header.classes[column.fieldIndex] = class_;
              that.header.formatters[column.fieldIndex] = column.formatter;
              that.header.events[column.fieldIndex] = column.events;
              that.header.sorters[column.fieldIndex] = column.sorter;
              that.header.sortNames[column.fieldIndex] = column.sortName;
              that.header.cellStyles[column.fieldIndex] = column.cellStyle;
              that.header.searchables[column.fieldIndex] = column.searchable;

              if (!column.visible) {
                return;
              }

              if (that.opts.cardView && (!column.cardVisible)) {
                return;
              }

              visibleColumns[column.field] = column;
            }

            if (column.checkbox || column.radio) {
              that.selected.type = column.checkbox ? 'checkbox' : 'radio';
              that.header.stateField = column.field;
            }
          });
        });
      },
      onSort(column) {
        if (!this.opts.sortable || !column.sortable) {
          return;
        }
        if (this.opts.sortName === column.field) {
          this.opts.sortOrder = this.opts.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.opts.sortName = column.field;
          this.opts.sortOrder = column.order === 'asc' ? 'desc' : 'asc';
        }
        this.trigger('sort', this.opts.sortName, this.opts.sortOrder);

        if (this.opts.sidePagination === 'server') {
          this.initServer();
          return;
        }

        this.initSort();
        this.initBody();
      },
      initSort() {
        var that = this,
          name = this.opts.sortName,
          order = this.opts.sortOrder === 'desc' ? -1 : 1,
          index = this.header.fields.indexOf(this.opts.sortName);

        if (index !== -1) {
          if (this.opts.sortStable) {
            this.data.forEach(function (row, i) {
              if (!row.hasOwnProperty('_position')) row._position = i;
            });
          }

          this.data.sort(function (a, b) {
            if (that.header.sortNames[index]) {
              name = that.header.sortNames[index];
            }
            var aa = getItemField(a, name, that.opts.escape),
              bb = getItemField(b, name, that.opts.escape),
              value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb]);

            if (value !== undefined) {
              return order * value;
            }

            // Fix #161: undefined or null string sort bug.
            if (aa === undefined || aa === null) {
              aa = '';
            }
            if (bb === undefined || bb === null) {
              bb = '';
            }

            if (that.opts.sortStable && aa === bb) {
              aa = a._position;
              bb = b._position;
            }

            // IF both values are numeric, do a numeric comparison
            if ($.isNumeric(aa) && $.isNumeric(bb)) {
              // Convert numerical values form string to float.
              aa = parseFloat(aa);
              bb = parseFloat(bb);
              if (aa < bb) {
                return order * -1;
              }
              return order;
            }

            if (aa === bb) {
              return 0;
            }

            // If value is not a string, convert to string
            if (typeof aa !== 'string') {
              aa = aa.toString();
            }

            if (aa.localeCompare(bb) === -1) {
              return order * -1;
            }

            return order;
          });
        }
      },
      search(event) {
        var that = this;
        if (this.opts.searchOnEnterKey && event.keyCode !== 13) {
          return;
        }

        if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
          return;
        }

        clearTimeout(this.timeoutId); // doesn't matter if it's 0
        this.timeoutId = setTimeout(function () {
          that.onSearch(event);
        }, this.opts.searchTimeOut);
      },
      onSearch(event) {
        if (this.opts.trimOnSearch) {
          this.searchText = this.searchText.trim();
        }

        if (this.opts.searchText === this.searchText) {
          return;
        }
        this.opts.searchText = this.searchText;

        this.opts.pageNumber = 1;
        this.updatePagination();
        this.trigger('search', this.searchText);
      },
      togglePagination() {
        this.opts.pagination = !this.opts.pagination;
        this.updatePagination();
      },
      refresh(params) {
        if (params && params.url) {
          this.opts.pageNumber = 1;
        }
        this.initServer(params && params.silent,
          params && params.query, params && params.url);

        this.trigger('refresh', params);
      },
      toggleView() {
        this.opts.cardView = !this.opts.cardView;
        this.initBody();
        this.trigger('toggle', this.opts.cardView);
      },
      initPagination() {
        if (this.opts.sidePagination !== 'server') {
          this.opts.totalRows = this.data.length;
        }

        this.totalPages = 0;
        if (this.opts.totalRows) {
          if (this.opts.pageSize === this.opts.formatAllRows()) {
            this.opts.pageSize = this.opts.totalRows;
          }

          this.totalPages = ~~((this.opts.totalRows - 1) / this.opts.pageSize) + 1;

          this.opts.totalPages = this.totalPages;
        }
        if (this.totalPages > 0 && this.opts.pageNumber > this.totalPages) {
          this.opts.pageNumber = this.totalPages;
        }

        this.pageFrom = (this.opts.pageNumber - 1) * this.opts.pageSize + 1;
        this.pageTo = this.opts.pageNumber * this.opts.pageSize;
        if (this.pageTo > this.opts.totalRows) {
          this.pageTo = this.opts.totalRows;
        }
      },
      updatePagination() {
        this.initPagination();
        if (this.opts.sidePagination === 'server') {
          this.initServer();
        } else {
          this.initBody();
        }
      },
      onPageListChange(event) {
        var $this = $(event.currentTarget);
        this.opts.pageSize = $this.text().toUpperCase() === this.opts.formatAllRows().toUpperCase() ?
          this.opts.formatAllRows() : +$this.text();

        this.updatePagination();
      },
      onPagePre() {
        if (this.opts.pageNumber - 1 === 0) {
          this.opts.pageNumber = this.opts.totalPages;
        } else {
          this.opts.pageNumber--;
        }
        this.updatePagination();
      },
      onPageFirst() {
        this.opts.pageNumber = 1;
        this.updatePagination();
      },
      onPageNumber(event) {
        var number = +$(event.currentTarget).text();
        if (this.opts.pageNumber === number) {
          return;
        }
        this.opts.pageNumber = number;
        this.updatePagination();
      },
      onPageLast() {
        this.opts.pageNumber = this.totalPages;
        this.updatePagination();
      },
      onPageNext() {
        if ((this.opts.pageNumber + 1) > this.opts.totalPages) {
          this.opts.pageNumber = 1;
        } else {
          this.opts.pageNumber++;
        }
        this.updatePagination();
      },
      initBody(fixedScroll) {
        if (!this.opts.pagination || this.opts.sidePagination === 'server') {
          this.pageFrom = 1;
          this.pageTo = this.data.length;
        }
      },
      onCheckAllChange() {
        var items = [];
        if (this.selected.all) {
          for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
            items.push(this.data[i]);
          }
        }
        this.selected.items = items;
        this.trigger(this.selected.all ? 'check-all' : 'uncheck-all');
      },
      onCheckItemChange(item) {
        this.selected.all = checkAllIndexOf(this.selected.type,
          this.selected.items, this.data, this.pageFrom - 1, this.pageTo);

        if (this.selected.type === 'radio') {
          this.trigger('check', item);
        } else {
          var selected = this.selected.items.indexOf(item) > -1;
          if (this.opts.singleSelect) {
            this.selected.items = selected ? [item] : [];
          }
          this.trigger(selected ? 'check' : 'uncheck', item);
        }
      },
      onTdClick(item, field, e) {
        var column = this.fieldColumns[getFieldIndex(this.fieldColumns, field)],
          value = getItemField(item, field, this.opts.escape);

        this.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item);
        this.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, field);

        // if click to select - then trigger the checkbox/radio click
        if (e.type === 'click' && this.opts.clickToSelect && column.clickToSelect) {
          if (this.selected.type === 'radio') {
            this.selected.items = item;
          } else {
            var index = this.selected.items.indexOf(item);
            if (index > -1) {
              this.selected.items.splice(index, 1);
            } else {
              this.selected.items.push(item);
            }
          }
          this.onCheckItemChange(item);
        }
      },
      initServer(silent, query, url) {
        var that = this,
          data = {},
          params = {
            searchText: this.searchText,
            sortName: this.opts.sortName,
            sortOrder: this.opts.sortOrder
          },
          request;

        if (this.opts.pagination) {
          params.pageSize = this.opts.pageSize === this.opts.formatAllRows() ?
            this.opts.totalRows : this.opts.pageSize;
          params.pageNumber = this.opts.pageNumber;
        }

        if (!(url || this.opts.url) && !this.opts.ajax) {
          return;
        }

        if (this.opts.queryParamsType === 'limit') {
          params = {
            search: params.searchText,
            sort: params.sortName,
            order: params.sortOrder
          };

          if (this.opts.pagination) {
            params.offset = this.opts.pageSize === this.opts.formatAllRows() ?
              0 : this.opts.pageSize * (this.opts.pageNumber - 1);
            params.limit = this.opts.pageSize === this.opts.formatAllRows() ?
              this.opts.totalRows : this.opts.pageSize;
          }
        }

        if (!($.isEmptyObject(this.filterColumnsPartial))) {
          params.filter = JSON.stringify(this.filterColumnsPartial, null);
        }

        data = calculateObjectValue(this.opts, this.opts.queryParams, [params], data);

        $.extend(data, query || {});

        // false to stop request
        if (data === false) {
          return;
        }

        if (!silent) {
          this.loading = true;
        }
        request = $.extend({}, calculateObjectValue(null, this.opts.ajaxOptions), {
          type: this.opts.method,
          url: url || this.opts.url,
          data: this.opts.contentType === 'application/json' && this.opts.method === 'post' ?
            JSON.stringify(data) : data,
          cache: this.opts.cache,
          contentType: this.opts.contentType,
          dataType: this.dataType,
          success: function (res) {
            res = calculateObjectValue(that.opts, that.opts.responseHandler, [res], res);

            that.load(res);
            if (!silent) that.loading = false;
            that.trigger('load-success', res);
          },
          error: function (res) {
            if (!silent) that.loading = false;
            that.trigger('load-error', res.status, res);
          }
        });

        if (this.opts.ajax) {
          calculateObjectValue(this, this.opts.ajax, [request], null);
        } else {
          if (this._xhr && this._xhr.readyState !== 4) {
            this._xhr.abort();
          }
          this._xhr = $.ajax(request);
        }
      },
      load(data) {
        var fixedScroll = false;

        if (this.opts.sidePagination === 'server') {
          this.opts.totalRows = data[this.opts.responseTotalField];
          fixedScroll = data.fixedScroll;
          data = data[this.opts.responseRowsField];
        } else if (!$.isArray(data)) { // support fixedScroll
          fixedScroll = data.fixedScroll;
          data = data.data;
        }
        this.data = data;

        this.initSort();
        this.initPagination();
        this.initBody(fixedScroll);
      },
      getVisibleFields() {
        var that = this,
          visibleFields = [];

        this.header.fields.forEach(function (field) {
          var column = that.fieldColumns[getFieldIndex(that.fieldColumns, field)];

          if (!column.visible) {
            return;
          }
          visibleFields.push(field);
        });
        return visibleFields;
      },
      resetView() {
        var that = this,
          $el = $(this.$el);

        this.view.headerHeight = $el.find('thead:visible').height();

        this.header.events.forEach(function (events, i) {
          if (!events) {
            return;
          }
          // if events is defined with namespace
          if (typeof events === 'string') {
            events = calculateObjectValue(null, events);
          }

          var field = that.header.fields[i],
            fieldIndex = that.getVisibleFields().indexOf(field);

          if (that.opts.detailView && !that.opts.cardView) {
            fieldIndex += 1;
          }

          for (var key in events) {
            $el.find('tbody >tr:not(.no-records-found)').each(function () {
              var $tr = $(this),
                $td = $tr.find(that.opts.cardView ? '.card-view' : 'td').eq(fieldIndex),
                index = key.indexOf(' '),
                name = key.substring(0, index),
                el = key.substring(index + 1),
                func = events[key];

              $td.find(el).off(name).on(name, function (e) {
                var index = $tr.data('index'),
                  row = that._renderData[index],
                  value = row[field];

                func.apply(this, [e, value, row, index]);
              });
            });
          }
        });
      },
      fieldValue(item, field, i, j) {
        var value = getItemField(item, field, this.opts.escape),
          column = this.fieldColumns[j];

        return calculateObjectValue(column,
          this.header.formatters[j], [value, item, i], value);
      },
      trigger(name) {
        var args = Array.prototype.slice.call(arguments, 1);
        name += '.bs.table';
        console.log(name, args);
      }
    }
  }

  BootstrapTable.defaults = DEFAULTS
  BootstrapTable.column_defaults = COLUMN_DEFAULTS
  BootstrapTable.locales = LOCALES

  export default BootstrapTable
</script>

<style>
  .bootstrap-table .table {
    margin-bottom: 0 !important;
    border-bottom: 1px solid #dddddd;
    border-collapse: collapse !important;
  }

  .bootstrap-table .table:not(.table-condensed),
  .bootstrap-table .table:not(.table-condensed) > tbody > tr > th,
  .bootstrap-table .table:not(.table-condensed) > tfoot > tr > th,
  .bootstrap-table .table:not(.table-condensed) > thead > tr > td,
  .bootstrap-table .table:not(.table-condensed) > tbody > tr > td,
  .bootstrap-table .table:not(.table-condensed) > tfoot > tr > td {
    padding: 8px;
  }

  .bootstrap-table .table.table-no-bordered > thead > tr > th,
  .bootstrap-table .table.table-no-bordered > tbody > tr > td {
    border-right: 2px solid transparent;
  }

  .bootstrap-table .table.table-no-bordered > tbody > tr > td:last-child {
    border-right: none;
  }

  .fixed-table-container {
    position: relative;
    clear: both;
    border: 1px solid #dddddd;
  }

  .fixed-table-container.table-no-bordered {
    border: 1px solid transparent;
  }

  .fixed-table-footer,
  .fixed-table-header {
    overflow: hidden;
  }

  .fixed-table-footer {
    border-top: 1px solid #dddddd;
  }

  .fixed-table-body {
    overflow-x: auto;
    overflow-y: auto;
    height: 100%;
  }

  .fixed-table-container table {
    width: 100%;
  }

  .fixed-table-container thead th {
    height: 0;
    padding: 0;
    margin: 0;
    border-left: 1px solid #dddddd;
  }

  .fixed-table-container thead th:focus {
    outline: 0 solid transparent;
  }

  .fixed-table-container thead th:first-child {
    border-left: none;
  }

  .fixed-table-container thead th .th-inner,
  .fixed-table-container tbody td .th-inner {
    padding: 8px;
    line-height: 24px;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fixed-table-container thead th .sortable {
    cursor: pointer;
    background-position: right;
    background-repeat: no-repeat;
    padding-right: 30px;
  }

  .fixed-table-container thead th .sortable.both {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC');
  }

  .fixed-table-container thead th .sortable.asc {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==');
  }

  .fixed-table-container thead th .sortable.desc {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII= ');
  }

  .fixed-table-container th.detail {
    width: 30px;
  }

  .fixed-table-container tbody td {
    border-left: 1px solid #dddddd;
  }

  .fixed-table-container tbody tr:first-child td {
    border-top: none;
  }

  .fixed-table-container tbody td:first-child {
    border-left: none;
  }

  /* the same color with .active */
  .fixed-table-container tbody .selected td {
    background-color: #f5f5f5;
  }

  .fixed-table-container .bs-checkbox {
    text-align: center;
  }

  .fixed-table-container .bs-checkbox .th-inner {
    padding: 8px 0;
  }

  .fixed-table-container input[type="radio"],
  .fixed-table-container input[type="checkbox"] {
    margin: 0 auto !important;
  }

  .fixed-table-container .no-records-found {
    text-align: center;
  }

  .fixed-table-pagination div.pagination,
  .fixed-table-pagination .pagination-detail {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .fixed-table-pagination div.pagination .pagination {
    margin: 0;
  }

  .fixed-table-pagination .pagination a {
    padding: 6px 12px;
    line-height: 1.428571429;
  }

  .fixed-table-pagination .pagination-info {
    line-height: 34px;
    margin-right: 5px;
  }

  .fixed-table-pagination .btn-group {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  .fixed-table-pagination .dropup .dropdown-menu {
    margin-bottom: 0;
  }

  .fixed-table-pagination .page-list {
    display: inline-block;
  }

  .fixed-table-toolbar .columns-left {
    margin-right: 5px;
  }

  .fixed-table-toolbar .columns-right {
    margin-left: 5px;
  }

  .fixed-table-toolbar .columns label {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.428571429;
  }

  .fixed-table-toolbar .bs-bars,
  .fixed-table-toolbar .search,
  .fixed-table-toolbar .columns {
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 34px;
  }

  .fixed-table-pagination li.disabled a {
    pointer-events: none;
    cursor: default;
  }

  .fixed-table-loading {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
  }

  .fixed-table-loading-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    background-color: #fff;
  }

  .fixed-table-loading-text:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .fixed-table-loading-text {
    position: absolute;
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }

  .fixed-table-body .card-view .title {
    font-weight: bold;
    display: inline-block;
    min-width: 30%;
    text-align: left !important;
  }

  /* support bootstrap 2 */
  .fixed-table-body thead th .th-inner {
    box-sizing: border-box;
  }

  .table th, .table td {
    vertical-align: middle;
    box-sizing: border-box;
  }

  .fixed-table-toolbar .dropdown-menu {
    text-align: left;
    max-height: 300px;
    overflow: auto;
  }

  .fixed-table-toolbar .btn-group > .btn-group {
    display: inline-block;
    margin-left: -1px !important;
  }

  .bootstrap-table .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 1px solid #ddd;
  }

  /* support bootstrap 3 */
  .bootstrap-table .table thead > tr > th {
    padding: 0;
    margin: 0;
  }

  .bootstrap-table .fixed-table-footer tbody > tr > td {
    padding: 0 !important;
  }

  .bootstrap-table .fixed-table-footer .table {
    border-bottom: none;
    padding: 0 !important;
  }

  .float-xs-right .dropdown-menu {
    right: 0;
    left: auto;
  }

  /* calculate scrollbar width */
  p.fixed-table-scroll-inner {
    width: 100%;
    height: 200px;
  }

  div.fixed-table-scroll-outer {
    top: 0;
    left: 0;
    visibility: hidden;
    width: 200px;
    height: 150px;
    overflow: hidden;
  }


</style>
