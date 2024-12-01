import React from "react";

export function TableCell({children}: { children: React.ReactNode }) {
    return (<td className='table-cell border-2 p-2'>{children}</td>)
}

export function TableHeaderCell({children}: { children: React.ReactNode }) {
    return (<th className='table-cell border-2 p-2'>{children}</th>)
}

export function TableHead({children}: { children: React.ReactNode }) {
    return (<thead className='table-header-group'>{children}</thead>)
}

export function TableBody({children}: { children: React.ReactNode }) {
    return (<tbody>{children}</tbody>)
}

export function TableRow({children}: { children: React.ReactNode }) {
    return (<tr className='table-row'>{children}</tr>)
}

export function Table({children}: { children: React.ReactNode }) {
    return (<table className='table-auto border-2'>{children}</table>)
}