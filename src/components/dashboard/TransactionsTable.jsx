import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { dashboardData } from '../../data/dashboardData';
import { ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';

export default function TransactionsTable() {
  const data = useMemo(() => dashboardData.transactions, []);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = useMemo(
    () => [
      {
        header: 'Transaction',
        accessorKey: 'title',
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${info.row.original.neg ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {info.row.original.neg ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
            </div>
            <div>
              <div className="font-bold text-[#0A0A0A]">{info.getValue()}</div>
              <div className="text-[12px] text-[#818F9B]">{info.row.original.type}</div>
            </div>
          </div>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: (info) => (
          <span className="px-3 py-1 rounded-full bg-[#ECEEF1] text-[#0A0A0A] text-[12px] font-medium">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: 'Date',
        accessorKey: 'time',
        cell: (info) => <span className="text-[#818F9B] font-medium">{info.getValue()}</span>,
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (info) => (
          <span className={`font-bold ${info.row.original.neg ? 'text-red-600' : 'text-emerald-600'}`}>
            {info.getValue()}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ECEEF1]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#0A0A0A]">Transactions</h2>
          <p className="text-[#818F9B] text-sm">Detailed history of your financial activities</p>
        </div>
        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#818F9B] group-focus-within:text-[#831AE3] transition-colors" size={18} />
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search activities..."
            className="w-full bg-[#F4F7F6] border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#831AE3]/20 transition-all outline-none text-[#0A0A0A] font-medium placeholder:text-[#818F9B]/60"
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[700px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left py-4 px-4 text-[#818F9B] font-bold text-xs uppercase tracking-[0.1em]"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[#ECEEF1]">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-[#F4F7F6]/50 transition-colors group">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-5 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
