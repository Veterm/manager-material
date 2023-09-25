import { Formik } from 'formik';
import React, { Component, useEffect } from 'react';
import actions from 'actions/books/booksListActions';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
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
import BooksList from '../../../../components/FormItems/items/BooksList';

import usersFields from 'pages/CRUD/Users/helpers/usersFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import BooksSelectItem from 'pages/CRUD/Books/helpers/BooksSelectItem';

const UsersForm = (props) => {
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
  const dispatch = useDispatch();
  const rows = useSelector((store) => store.books.list.rows);

  useEffect(() => {
    dispatch(actions.doFetch())
  }, [])

  const iniValues = () => {
    return IniValues(usersFields, record || {});
  };
  const formValidations = () => {
    return FormValidations(usersFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(usersFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    } else if (isShow) {
      return 'View user';
    }

    return isEditing ? 'Edit Users' : 'Add Users';
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
                <InputFormItem
                  name={'firstName'}
                  schema={usersFields}
                  autoFocus={!isShow}
                  isShow={isShow}
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'lastName'} isShow={isShow} schema={usersFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'phoneNumber'} isShow={isShow} schema={usersFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'email'} isShow={isShow} schema={usersFields} />
              </Grid>

              <Grid item>
                <RadioFormItem name={'role'} disabled={isShow} schema={usersFields} />
              </Grid>

              {!isShow && <Grid item>
                <SwitchFormItem name={'disabled'} schema={usersFields} />
              </Grid>}

              <Grid item>
                <ImagesFormItem
                  name={'avatar'}
                  schema={usersFields}
                  path={'users/avatar'}
                  fileProps={{
                    size: undefined,
                    formats: undefined,
                  }}
                  max={undefined}
                  isShow={isShow}
                />
              </Grid>


              {!isShow ? <Grid item>
                <BooksSelectItem
                  name={'books'}
                  schema={usersFields}
                  showCreate={!modal}
                  multiple
                  form={form}
                  isShow={isShow}
                />
              </Grid> : <><Grid item>
                <BooksList
                  tableName='Books'
                  items={form.values.books}
                />
              </Grid>
                <Grid item>
                  <BooksList
                    tableName='Books Author'
                    items={rows.filter(x => x.authorId == form.values.id)}
                  />
                </Grid> </>}

              <Grid item>

                {!isShow && <Grid item>

                  <InputFormItem name={'password'} schema={usersFields} />
                </Grid>}
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
export default UsersForm;
