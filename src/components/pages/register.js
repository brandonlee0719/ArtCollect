import React, { useEffect } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { apiKey, registerUrl, postAuthorUrl, authorUrl } from '../../core/auth';
import request from '../../core/auth/request';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAuthorListWallet } from "../../store/actions/thunks";
import * as selectors from '../../store/selectors';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #FAF6F1;
    border-bottom: solid 1px #ccc !important;
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.lazy(() =>
    Yup.string()
      .required('Email is required')
  ),
  username: Yup.lazy(() =>
    Yup.string()
      .required('Username is required')
  ),
  password: Yup.lazy(() =>
    Yup.string()
      .required('Password is required')
  ),
  password_confirmation: Yup.lazy(() =>
    Yup.string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      })
  ),
});

const initialValues = {
  email: '',
  username: '',
  password: '',
  password_confirmation: ''
};

const wallet = localStorage.getItem("wallet");

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorState = useSelector(selectors.authorUserState);
  const author = authorState.data;

  const redirectUser = (path) => {
    navigate(path);
  }

  const handleSubmitForm = async (data) => {
    const requestURL = registerUrl;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + apiKey
      }
    }
    await request(requestURL, { method: 'POST', body: data, config })
      .then(async (response) => {
        auth.setToken(response.jwt, true);
        auth.setUserInfo(response.user, true);
        let authorData = {
          "data": {
            "username": response.user.username,
            "wallet": wallet
          }
        }
        updateAuthor(authorData, config);
      }).catch((err) => {
        console.log(err);
      });
  }

  const updateAuthor = async(authorData, config) => {
    await request(authorUrl(author.id), { method: 'PUT', body: authorData, config })
      .then((response) => {
        console.log(response)
        redirectUser('/Profile/' + author.id);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (wallet)
      dispatch(fetchAuthorListWallet(wallet));
  }, []);

  return (
    <div style={{ height: '100%', display: "flex", flexDirection: 'column' }}>
      <GlobalStyles />


      <section className='container' style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="row">
          <div className='spacer-double'></div>
          <div className="col-md-8 offset-md-2">
            <h3>Don't have an account? Register now.</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <div className="spacer-10"></div>
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialValues}
              validateOnMount={validationSchema.isValidSync(initialValues)}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // const submitData = pick(values, [...requiredFields]);
                setSubmitting(true);
                await handleSubmitForm(values);
                setSubmitting(false);
                resetForm();
              }}
            >
              {
                ({ values, isSubmitting, isValid }) => {
                  // const isAllValid = isValid;
                  // const submitValidationMessage = 'Please fill in all required fields';

                  return (
                    <Form className="form-border">
                      <div className="row">

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Email Address:</label>
                            <Field className="form-control" type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Choose a Username:</label>
                            <Field className="form-control" type="text" name="username" />
                            <ErrorMessage name="username" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Password:</label>
                            <Field className="form-control" type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Re-enter Password:</label>
                            <Field className="form-control" type="password" name="password_confirmation" />
                            <ErrorMessage name="password_confirmation" component="div" />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div id='submit' className="pull-left">
                            <input type='submit' id='send_message' value='Register Now' className="btn btn-main color-2" />
                          </div>

                          <div className="clearfix"></div>
                        </div>
                      </div>
                    </Form>
                  )
                }
              }
            </Formik>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
};
export default Register;