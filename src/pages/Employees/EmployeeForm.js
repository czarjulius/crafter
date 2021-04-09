import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
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



export default function EmployeeForm(props) {

  const {addOrEdit, recordForEdit} = props

  const validate = (fieldValues = values)=>{
    let temp = {...errors}
    if('fullname' in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "This field is required."
    if('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" :  "Email is not valid."
    if('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum of 10 numbers required."
    if('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required."
    setErrors({
      ...temp
    })

    if(fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values, 
    setValues, 
    errors, 
    setErrors, 
    handleInputChange, 
    resetForm} = useForm(initialFValue, true, validate)

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm)
    }
  }

  useEffect(()=>{
    if(recordForEdit !== null)
      setValues({
        ...recordForEdit
      })
  },[recordForEdit])
   

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input 
            label="Full Name"
            name='fullname'
            value={values.fullname}
            onChange={handleInputChange}
            error={errors.fullname}
          />
          <Controls.Input 
            label="Email"
            name='email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}

          />
          <Controls.Input 
            label="Mobile"
            name='mobile'
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}

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
            error={errors.departmentId}
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
            onClick={resetForm}
           />
         </div>
        </Grid>
      </Grid>
      
    </Form>
  )
}
