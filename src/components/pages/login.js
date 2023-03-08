import React, { useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { loginUrl } from '../../core/auth';
import request from '../../core/auth/request';
import { useNavigate } from 'react-router-dom';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #FAF6F1;
    border-bottom: solid 1px #ccc !important;
  }
  .box-login p{
    color: #727272 !important;
  }
  .box-login{
    padding: 40px 50px;
  }
`;

const validationSchema = Yup.object().shape({
  identifier: Yup.lazy(() =>
    Yup.string()
      .required('Username is required')
  ),
  password: Yup.lazy(() =>
    Yup.string()
      .required('Password is required')
  ),
});

const initialValues = {
  identifier: '',
  password: ''
};

const Logintwo = () => {
  const navigate = useNavigate();
  const redirectUser = (path) => {
    navigate(path);
  }

  const handleSubmitForm = async (data) => {
    const requestURL = loginUrl;

    await request(requestURL, { method: 'POST', body: data })
      .then((response) => {
        auth.setToken(response.jwt, true);
        auth.setUserInfo(response.user, true);
        redirectUser(`/profile/${response.user.id}`);
      }).catch((err) => {
        console.log(err);
      });
  }


  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/10.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row align-items-center px-0'>
              <div className="col-lg-4 offset-lg-4 m-auto px-0">
                <div className="box-login">
                  <h3 className="mb10">Sign In</h3>
                  <p>Login using an existing account or create a new account <span onClick={() => navigate("/register")}>here</span>.</p>
                  <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    validateOnMount={validationSchema.isValidSync(initialValues)}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      // const submitData = pick(values, [...requiredFields]);
                      console.log(values)
                      setSubmitting(true);
                      // await handleSubmitForm(values);
                      resetForm();
                      setSubmitting(false);
                    }}
                  >
                    {
                      ({ values, isSubmitting, isValid }) => {
                        // const isAllValid = isValid;
                        // const submitValidationMessage = 'Please fill in all required fields';

                        return (
                          <Form className="form-border">
                            <div className="field-set">
                              <label>Email Address:</label>
                              <Field className="form-control" type="email" name="identifier" placeholder="Email" />
                              <ErrorMessage name="identifier" component="div" />
                            </div>
                            <div className="field-set">
                              <label>Password:</label>
                              <Field className="form-control" type="password" name="password" placeholder="Password" />
                              <ErrorMessage name="password" component="div" />
                            </div>
                            <div className="field-set">
                              <input type='submit' id='send_message' value='Submit' className="btn btn-main btn-fullwidth color-2"
                                onClick={async () => await handleSubmitForm(values)} />
                            </div>
                            <div className="clearfix"></div>
                            <div className="spacer-single"></div>
                            {/* <ul className="list s3">
                              <li>Login with:</li>
                              <li><span >Facebook</span></li>
                              <li><span >Google</span></li>
                            </ul> */}
                            {/* <div className="spacer-half"></div> */}
                          </Form>
                        )
                      }
                    }
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
};

export default Logintwo;