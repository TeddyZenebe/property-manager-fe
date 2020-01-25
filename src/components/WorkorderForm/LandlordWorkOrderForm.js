/* eslint-disable react/prop-types */
import React from 'react';
/* eslint-disable-next-line no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import {
  TextField,
  MenuItem,
  Paper,
  Grid,
  Button,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import { MdSend } from 'react-icons/md';

import { addWorkOrder } from '../../store/actions/index';

const useStyles = makeStyles(theme => ({
  formCard: {
    padding: theme.spacing(4)
  },
  formTitle: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    width: '500px',
    maxWidth: '500px',
    margin: theme.spacing(2)
  },
  submitWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: theme.spacing(2)
  },
  submit: {}
}));

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Add a short description for your work order'),
  property: Yup.string().required('Select a property'),
  description: Yup.string().required('Add some details about your work order'),
  orderType: Yup.string().required('Work order type is required'),
  urgency: Yup.string().required('Must select a level of urgency')
});

export default function LandlordWorkOrderForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const propertyList = useSelector(state => state.propReducer.properties);
  console.log(propertyList);
  const currentDate = new Date();

  const submit = values => {
    console.log(values);
    dispatch(addWorkOrder(values));
  };

  return (
    <Paper className={classes.formCard}>
      <h2 className={classes.formTitle}>Create a Work Order</h2>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{
          title: '',
          propertyId: '',
          description: '',
          type: '',
          startDate: currentDate
        }}
        resetForm
        onSubmit={values => {
          return new Promise(resolve => {
            setTimeout(() => {
              submit(values);
              resolve();
            }, 2000);
          });
        }}
      >
        {({ values, errors, isSubmitting }) => {
          // console.log(errors, touched, isSubmitting);
          console.log(values);

          return (
            <Form>
              <Grid container justify="space-evenly">
                <Field
                  className={classes.textField}
                  size="small"
                  margin="normal"
                  variant="outlined"
                  name="title"
                  type="text"
                  label="Title"
                  as={TextField}
                />
                <Field
                  name="property"
                  label="Property"
                  as={TextField}
                  select
                  helperText={
                    errors.property
                      ? errors.property
                      : 'Please select a property'
                  }
                  error={errors.property && true}
                >
                  {propertyList.map(property => (
                    <MenuItem key={property.id} value={property.id}>
                      {property.name}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  className={classes.textField}
                  size="small"
                  margin="normal"
                  variant="outlined"
                  name="description"
                  type="text"
                  label="Description"
                  as={TextField}
                  helperText={
                    errors.description
                      ? errors.description
                      : 'Please enter some details about your work order'
                  }
                  error={errors.description && true}
                />
                <Field
                  name="orderType"
                  label="Order Type"
                  as={TextField}
                  select
                  helperText={
                    errors.orderType
                      ? errors.orderType
                      : 'Please select the type of problem you have'
                  }
                  error={errors.orderType && true}
                >
                  <MenuItem value="Plumbing">Plumbing</MenuItem>
                  <MenuItem value="Electrical">Electrical</MenuItem>
                  <MenuItem value="Pest Control">Pest Control</MenuItem>
                  <MenuItem value="Appliances">Appliances</MenuItem>
                  <MenuItem value="AC">HVAC</MenuItem>
                </Field>
                <div className={classes.submitWrapper}>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className={classes.submit}
                    disabled={isSubmitting}
                    type="submit"
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress
                          style={{
                            height: '22px',
                            width: '22px',
                            marginRight: '4px'
                          }}
                        />
                      ) : (
                        <MdSend />
                      )
                    }
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
}
