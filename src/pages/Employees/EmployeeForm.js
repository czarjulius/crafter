import { Grid } from '@material-ui/core'
import React from 'react'
import Controls from '../../components/controls/Controls'
import {useForm, Form} from '../../components/useForm'
import * as employeeService from '../../services/employeeService'

const genderItems = [
  {id: 'male', title: 'Male'},
  {id: 'female', title: 'Female'},
  {id: 'others', title: 'Others'},
]

const initialFValue = {
  id: 0,
  fullname: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
}



export default function EmployeeForm() {

  const {values, setValues, handleInputChange} = useForm(initialFValue)



  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input 
            label="Full Name"
            name='fullname'
            value={values.fullname}
            onChange={handleInputChange}
          />
          <Controls.Input 
            label="Email"
            name='email'
            value={values.email}
            onChange={handleInputChange}
          />
          <Controls.Input 
            label="Mobile"
            name='mobile'
            value={values.mobile}
            onChange={handleInputChange}
          />
          <Controls.Input 
            label="City"
            name='city'
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.RadioGroup
            name='gender'
            value={values.gender}
            onChange={handleInputChange} 
            items={genderItems}
         />
          <Controls.Select
            name='departmentId'
            value={values.departmentId}
            onChange={handleInputChange} 
            options={employeeService.getDepartmentCollection()}
         />
         <Controls.DatePicker
          name="isPermanent"
          label="Permanent Employee"
          value={values.isPermanent}
          onChange={handleInputChange}
         />
         <Controls.Checkbox
          name="hireDate"
          label="Hire Date"
          value={values.hireDate}
          onChange={handleInputChange}
         />
         <div>
           <Controls.Button
            type="submit"
            text="Submit"
           />
           <Controls.Button
            text="Reset"
            color="default"
           />
         </div>
        </Grid>
      </Grid>
      
    </Form>
  )
}
