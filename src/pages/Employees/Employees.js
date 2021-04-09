import React, { useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons'
import useTable from '../../components/controls/useTable'
import PageHeader from '../../components/PageHeader'
import EmployeeForm from './EmployeeForm'
import * as employeeService from '../../services/employeeService'



const useStyles = makeStyles(theme =>({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
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

  const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting} = useTable(records, headCells);

  return (
    <>
      <PageHeader 
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
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
