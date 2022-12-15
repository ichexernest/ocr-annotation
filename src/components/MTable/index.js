import { React, useState, useMemo } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import InputGroup from 'react-bootstrap/InputGroup';

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleRight, faAngleLeft, faAngleDoubleRight, faAngleDoubleLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Wrapper, Nodata } from './MTable.styles'
import { Link } from "react-router-dom";

const DetailLink = ({ ProcID, dateRange }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <Link to={`/${ProcID}/${dateRange}`}>
      <Button className="mx-1 btn-dark" size="sm">
        查看<FontAwesomeIcon className="icon" icon={faArrowRight} />
      </Button>
    </Link>
  );
};
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <InputGroup className="mb-3 px-2">
      <InputGroup.Text className='bg-light text-dark'><FontAwesomeIcon className="icon" icon={faSearch} /></InputGroup.Text>
      <Form.Control
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
      />
    </InputGroup>
  )
}

const MainTable = ({ columns, data }) => {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    //rows, // rows for the table based on the data passed
    prepareRow,
    page,// Prepare the row (this function needs to be called for each row before getting the row props)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable({
    columns,
    data
  },
    useFilters,
    useGlobalFilter,
    usePagination,
  );
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className='p-2' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr style={{ padding: "1rem" }} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      {page.length === 0 && <Nodata className='d-flex justify-content-center p-5 bg-light text-center'><span>Search no data.</span></Nodata>
      }
      <div className='d-flex justify-content-end align-items-center m-2'>
        <Button className="mx-1 btn-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FontAwesomeIcon className="icon" icon={faAngleDoubleLeft} />
        </Button>
        <Button className="mx-1 btn-dark" onClick={() => previousPage()} disabled={!canPreviousPage}>
          <FontAwesomeIcon className="icon" icon={faAngleLeft} />
        </Button>
        <span className='m-2 '>
          {pageIndex + 1} of {pageOptions.length}
        </span>
        <Button className="mx-1 btn-dark" onClick={() => nextPage()} disabled={!canNextPage}>
          <FontAwesomeIcon className="icon" icon={faAngleRight} />
        </Button>
        <Button className="mx-1 btn-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <FontAwesomeIcon className="icon" icon={faAngleDoubleRight} />
        </Button>

        <InputGroup className='w-25'>
          <InputGroup.Text className='bg-light text-dark'><FontAwesomeIcon className="icon" icon={faArrowRight} /></InputGroup.Text>
          <Form.Control
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </InputGroup>
      </div>
    </>
  );
}

const MTable = ({ data ,dateRange}) => {
  const columns = useMemo(
    () => [
      {
        Header: '案號',
        accessor: 'ProcID',
      },
      {
        Header: '規格ID',
        accessor: 'SpecID',
      },
      {
        Header: '規格名稱',
        accessor: 'SpecName',
      },
      {
        Header: 'RpaAPID',
        accessor: 'RpaAPID',
      },
      {
        Header: '時間',
        accessor: 'InsertDTime',
      },
      {
        Header: '來源',
        accessor: 'ProcSource',
      },
      {
        Header: '來源資料',
        accessor: 'ProcSourceDetail',
      },
      {
        Header: 'AttachFName',
        accessor: 'AttachFName',
      },
      {
        Header: '辨識狀態',
        accessor: 'ProcStatus',
      },
      {
        Header: '比對結果查詢',
        Cell: ({ cell }) => <DetailLink ProcID={cell.row.values.ProcID} dateRange={dateRange} />,
      },
    ],
    []
  )

  const mainData = useMemo(() => data, [data])
  return (
    <Wrapper>
      <MainTable columns={columns} data={mainData} />
    </Wrapper>
  )
}

export default MTable;
