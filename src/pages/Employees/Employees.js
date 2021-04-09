import React, { useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core'
import { PeopleOutlineTwoTone, Search } from '@material-ui/icons'
import useTable from '../../components/controls/useTable'
import PageHeader from '../../components/PageHeader'
import EmployeeForm from './EmployeeForm'
import * as employeeService from '../../services/employeeService'

import Controls from '../../components/controls/Controls'


const useStyles = makeStyles(theme =>({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput:{
    width: '75%'
  }
}))

const headCells = [
  {id: 'fullname', label: 'Employee Name'},
  {id: 'email', label: 'Email Address (Personal)'},
  {id: 'mobile', label: 'Mobile Number'},
  {id: 'department', label: 'Department'},
]

export default function Employees() {
  const classes = useStyles()
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  const [filterFn, setFilterFn] = useState({ fn: items=> {return items;}})

  const {
      TblContainer,
      TblHead,
      TblPagination, 
      recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn);

  const handleSearch = e =>{
    let target = e.target;
    setFilterFn({
      fn: items =>{
        if(target.value == "")
          return items;
        else
          return items.filter(x => x.fullname.toLowerCase().includes(target.value))
      }
    })
  }

  return (
    <>
      <PageHeader 
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
          label="Search Employees"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
              <Search/>
            </InputAdornment>)
          }}
          onChange={handleSearch}
         />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting()?.map(item=>(
                <TableRow key={item.id}>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.department}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>

        </TblContainer> 
        <TblPagination />
      </Paper>
    </>
  )
}
