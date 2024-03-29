import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import booksFields from 'pages/CRUD/Books/helpers/booksFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import UsersSelectItem from 'pages/CRUD/Users/helpers/UsersSelectItem';

const BooksForm = (props) => {
  const {
    isEditing,
    isProfile,
    isShow,
    findLoading,
    saveLoading,
    record,
    onSubmit,
    onCancel,
    modal,
  } = props;

  const iniValues = () => {
    return IniValues(booksFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(booksFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(booksFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    } else if (isShow) {
      return 'View book';
    }

    return isEditing ? 'Edit Books' : 'Add Books';
  };

  const renderForm = () => (
    <Widget title={<h4>{title()}</h4>} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <InputFormItem name={'title'} isShow={isShow} schema={booksFields} autoFocus={!isShow} />
              </Grid>
              <Grid item>
                {!isShow ? <UsersSelectItem
                  name={'author'}
                  schema={booksFields}
                  showCreate={!modal}
                  form={form}
                  isShow={isShow}
                  isBookShowPage={true}
                /> : <> <Typography variant="caption" style={{ marginBottom: 10, }}>Author</Typography>
                  <Typography >{form.values.author.firstName}</Typography> </>}
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
              {!isShow && <><Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={form.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
                <Grid item>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={form.handleReset}
                  >
                    Reset
                  </Button>
                </Grid></>}
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => onCancel()}
                >
                  {isShow ? 'Back' : 'Cancel'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Widget>
  );
  if (findLoading) {
    return <Loader />;
  }
  if (isEditing && !record) {
    return <Loader />;
  }
  return renderForm();
};
export default BooksForm;
