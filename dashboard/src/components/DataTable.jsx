import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Download, Table as TableIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export const DataTable = ({ records, theme = 'dark', t, isRTL }) => {
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('Date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  if (!records || records.length === 0) {
    return (
      <div className={`${isDark ? 'bg-fintech-card border-zinc-800/80 text-zinc-400' : 'bg-white border-slate-200 text-slate-500'} rounded-xl border p-6 mb-8 shadow-xl text-center text-sm`}>
        {t.table.noRecords}
      </div>
    );
  }

  // 1. Search Filtering
  const searchedRecords = useMemo(() => {
    if (!searchTerm.trim()) return records;
    const term = searchTerm.toLowerCase();
    return records.filter(r =>
      (r.Date && String(r.Date).toLowerCase().includes(term)) ||
      (r.Category && String(r.Category).toLowerCase().includes(term)) ||
      (r.Country && String(r.Country).toLowerCase().includes(term)) ||
      (r.Region && String(r.Region).toLowerCase().includes(term)) ||
      (r.CustomerSegment && String(r.CustomerSegment).toLowerCase().includes(term)) ||
      (r.SalesChannel && String(r.SalesChannel).toLowerCase().includes(term))
    );
  }, [records, searchTerm]);

  // 2. Column Sorting
  const sortedRecords = useMemo(() => {
    return [...searchedRecords].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      if (sortField === 'Date') {
        return sortDirection === 'asc'
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }

      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchedRecords, sortField, sortDirection]);

  // 3. Pagination
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // 4. Summary Totals Row
  const summaryTotals = useMemo(() => {
    const totalRev = searchedRecords.reduce((s, r) => s + (r.Revenue || 0), 0);
    const totalExp = searchedRecords.reduce((s, r) => s + (r.Expenses || 0), 0);
    const totalProf = searchedRecords.reduce((s, r) => s + (r.Profit || 0), 0);
    const totalUnits = searchedRecords.reduce((s, r) => s + (r.UnitsSold || 0), 0);
    const avgMargin = totalRev > 0 ? (totalProf / totalRev) * 100 : 0;
    return { totalRev, totalExp, totalProf, totalUnits, avgMargin };
  }, [searchedRecords]);

  // 5. CSV Export Handler
  const exportToCSV = () => {
    if (searchedRecords.length === 0) return;
    const headers = ['Date', 'Category', 'Country', 'Region', 'CustomerSegment', 'SalesChannel', 'Revenue', 'Expenses', 'Profit', 'ProfitMargin', 'UnitsSold'];
    const csvLines = [headers.join(',')];

    searchedRecords.forEach(r => {
      const line = [
        `"${r.Date || ''}"`,
        `"${r.Category || ''}"`,
        `"${r.Country || ''}"`,
        `"${r.Region || ''}"`,
        `"${r.CustomerSegment || ''}"`,
        `"${r.SalesChannel || ''}"`,
        r.Revenue || 0,
        r.Expenses || 0,
        r.Profit || 0,
        (r.ProfitMargin || 0).toFixed(2),
        r.UnitsSold || 0
      ].join(',');
      csvLines.push(line);
    });

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `financial_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={12} className={isDark ? "text-zinc-600" : "text-slate-400"} />;
    return sortDirection === 'asc'
      ? <ArrowUp size={12} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
      : <ArrowDown size={12} className={isDark ? "text-fintech-primary" : "text-sky-600"} />;
  };

  return (
    <div className={`${isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'} rounded-xl border p-6 mb-8 shadow-xl transition-colors duration-300`}>
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2 font-semibold text-base">
          <TableIcon size={20} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
          <h3 className={isDark ? "text-white" : "text-slate-900"}>{t.table.title}</h3>
          <span className={`text-xs font-normal border px-2.5 py-0.5 rounded-full ${isDark ? 'text-zinc-400 bg-zinc-900 border-zinc-800' : 'text-slate-600 bg-slate-100 border-slate-200'}`}>
            {searchedRecords.length} {t.table.records}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder={t.table.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className={`border rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none w-64 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-1 focus:ring-fintech-primary'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-1 focus:ring-sky-500'
              }`}
            />
          </div>

          {/* Export CSV Button */}
          <button
            onClick={exportToCSV}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <Download size={14} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
            <span>{t.table.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className={`overflow-x-auto rounded-lg border ${isDark ? 'border-zinc-800/60' : 'border-slate-200'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`text-xs uppercase tracking-wider border-b ${
              isDark ? 'bg-zinc-900/90 text-zinc-400 border-zinc-800' : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              <th className="p-3.5 cursor-pointer hover:opacity-80" onClick={() => handleSort('Date')}>
                <div className="flex items-center gap-1">
                  <span>{t.table.date}</span>
                  {renderSortIcon('Date')}
                </div>
              </th>
              <th className="p-3.5 cursor-pointer hover:opacity-80" onClick={() => handleSort('Category')}>
                <div className="flex items-center gap-1">
                  <span>{t.table.category}</span>
                  {renderSortIcon('Category')}
                </div>
              </th>
              <th className="p-3.5 cursor-pointer hover:opacity-80" onClick={() => handleSort('Country')}>
                <div className="flex items-center gap-1">
                  <span>{t.filters.country || 'Country'}</span>
                  {renderSortIcon('Country')}
                </div>
              </th>
              <th className="p-3.5 cursor-pointer hover:opacity-80" onClick={() => handleSort('Region')}>
                <div className="flex items-center gap-1">
                  <span>{t.table.region}</span>
                  {renderSortIcon('Region')}
                </div>
              </th>
              <th className="p-3.5 cursor-pointer hover:opacity-80" onClick={() => handleSort('CustomerSegment')}>
                <div className="flex items-center gap-1">
                  <span>{t.table.segment}</span>
                  {renderSortIcon('CustomerSegment')}
                </div>
              </th>
              <th className="p-3.5 cursor-pointer hover:opacity-80" onClick={() => handleSort('SalesChannel')}>
                <div className="flex items-center gap-1">
                  <span>{t.table.channel}</span>
                  {renderSortIcon('SalesChannel')}
                </div>
              </th>
              <th className="p-3.5 text-right cursor-pointer hover:opacity-80" onClick={() => handleSort('Revenue')}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.table.revenue}</span>
                  {renderSortIcon('Revenue')}
                </div>
              </th>
              <th className="p-3.5 text-right cursor-pointer hover:opacity-80" onClick={() => handleSort('Expenses')}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.table.expenses}</span>
                  {renderSortIcon('Expenses')}
                </div>
              </th>
              <th className="p-3.5 text-right cursor-pointer hover:opacity-80" onClick={() => handleSort('Profit')}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.table.profit}</span>
                  {renderSortIcon('Profit')}
                </div>
              </th>
              <th className="p-3.5 text-right cursor-pointer hover:opacity-80" onClick={() => handleSort('ProfitMargin')}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.table.margin}</span>
                  {renderSortIcon('ProfitMargin')}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className={`divide-y text-xs ${
            isDark ? 'divide-zinc-900 text-zinc-300' : 'divide-slate-100 text-slate-700'
          }`}>
            {paginatedRecords.map((row, idx) => (
              <tr key={idx} className={isDark ? "hover:bg-zinc-800/40 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                <td className={`p-3.5 font-medium whitespace-nowrap ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{row.Date}</td>
                <td className="p-3.5 whitespace-nowrap">
                  <span className="bg-sky-500/10 text-sky-500 border border-sky-500/20 px-2 py-0.5 rounded text-[11px] font-medium">
                    {row.Category}
                  </span>
                </td>
                <td className="p-3.5 whitespace-nowrap font-medium">{row.Country || row.Region}</td>
                <td className="p-3.5 whitespace-nowrap">{row.Region}</td>
                <td className={`p-3.5 whitespace-nowrap ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{row.CustomerSegment}</td>
                <td className={`p-3.5 whitespace-nowrap ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{row.SalesChannel}</td>
                <td className={`p-3.5 text-right font-medium whitespace-nowrap ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>${row.Revenue?.toLocaleString()}</td>
                <td className="p-3.5 text-right text-rose-500 whitespace-nowrap">${row.Expenses?.toLocaleString()}</td>
                <td className="p-3.5 text-right font-semibold text-emerald-500 whitespace-nowrap">${row.Profit?.toLocaleString()}</td>
                <td className="p-3.5 text-right whitespace-nowrap font-medium">
                  <span className={row.ProfitMargin >= 35 ? 'text-emerald-500' : row.ProfitMargin >= 25 ? 'text-amber-500' : 'text-rose-500'}>
                    {(row.ProfitMargin || 0).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Table Summary Footer */}
          <tfoot>
            <tr className={`font-bold text-xs border-t-2 ${
              isDark ? 'bg-zinc-900/95 text-white border-zinc-800' : 'bg-slate-100 text-slate-900 border-slate-300'
            }`}>
              <td colSpan={6} className="p-3.5">{t.table.summaryRow}</td>
              <td className="p-3.5 text-right text-sky-500">${summaryTotals.totalRev.toLocaleString()}</td>
              <td className="p-3.5 text-right text-rose-500">${summaryTotals.totalExp.toLocaleString()}</td>
              <td className="p-3.5 text-right text-emerald-500">${summaryTotals.totalProf.toLocaleString()}</td>
              <td className="p-3.5 text-right text-emerald-500">{summaryTotals.avgMargin.toFixed(1)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-3 border-t text-xs ${
        isDark ? 'border-zinc-800/60 text-zinc-400' : 'border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2">
          <span>{t.table.rowsPerPage}:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className={`border rounded px-2 py-1 outline-none cursor-pointer ${
              isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">
            {t.table.showing} {startIndex + 1} - {Math.min(startIndex + pageSize, sortedRecords.length)} {t.table.of} {sortedRecords.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className={`p-1.5 border rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${
              isDark ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className={`p-1.5 border rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${
              isDark ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
