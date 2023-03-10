import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { apiKey, authorUrl } from '../../../core/auth';
import request from '../../../core/auth/request';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../../core/api";
import { fetchAuthorListWallet } from "../../../store/actions/thunks";
import * as selectors from '../../../store/selectors';
import axios from "axios";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const validationSchema = Yup.object().shape({
    username: Yup.lazy(() =>
        Yup.string()
            .required('Username is required')
    ),
    wallet: Yup.lazy(() =>
        Yup.string()
            .required('Wallet is required')
    ),
});

const Profile = () => {
    const { authorId } = useParams();
    const navigate = useNavigate();
    const jwt = auth.getToken();

    const authorState = useSelector(selectors.authorUserState);
    const author = authorState.data;
    const wallet = localStorage.getItem('wallet');

    const [updateProfile, setUpdateProfile] = useState(false);
    const [updateProfileImage, setUpdateProfileImage] = useState(false);
    const [updateProfileBanner, setUpdateProfileBanner] = useState(false);

    const initialValues = {
        username: author ? author.username : '',
        about: author ? author.about : '',
        social: author ? author.social : '',
        wallet: author ? author.wallet : ''
    };

    const initialProfilePicture = {
        profile_image: ''
    }

    const initialProfileBanner = {
        profile_banner: ''
    }

    const dispatch = useDispatch();

    const redirectUser = (path) => {
        navigate(path);
    }

    const handleSubmitForm = async (data) => {
        const requestURL = authorUrl(author.id);
        let responseData = {
            "data": data
        }
        console.log(data)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + apiKey
            }
        }
        await request(requestURL, { method: 'PUT', body: responseData, config })
            .then((response) => {
                console.log(response)
                setUpdateProfile(true);
                // redirectUser(`/Author/${authorId}`);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleSubmitProfilePicture = async (file, field) => {

        var formData = new FormData()

        formData.append('files', file)
        formData.append('ref', 'api::author.author') // link the image to a content type
        formData.append('refId', author.id) // link the image to a specific entry
        formData.append('field', field) // link the image to a specific field
        console.log(field)
        await axios({
            method: 'post',
            url: `${api.baseUrl}/api/upload`,
            data: formData,
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4NDc5MTQzLCJleHAiOjE2ODEwNzExNDN9.wEJYN1v3hk1sclVNy0HFPGiTEY6lvHEYUMVs5fFKUKE`,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            // redirectUser(`/Author/${authorId}`);
            field === 'avatar' ? setUpdateProfileImage(true) : setUpdateProfileBanner(true);
        }).catch(err => {
            console.log(err)
        });
    }

    const [profileImage, setProfileImage] = useState();
    const [profileImageTemp, setProfileImageTemp] = useState();
    const [profileBanner, setProfileBanner] = useState();
    const [profileBannerTemp, setProfileBannerTemp] = useState();

    const handleProfilePicture = (event) => {
        let file = event.target.files[0];
        setProfileImage(file)
        let reader = new FileReader();
        reader.onloadend = () => {
            setProfileImageTemp(reader.result)
        };
        reader.readAsDataURL(file);
    }

    const handleProfileBanner = (event) => {
        let file = event.target.files[0];
        setProfileBanner(file)
        let reader = new FileReader();
        reader.onloadend = () => {
            setProfileBannerTemp(reader.result)
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (wallet)
            dispatch(fetchAuthorListWallet(wallet));
    }, []);

    return (
        <div style={{height: '100%', display: "flex", flexDirection: 'column'}}>
            <GlobalStyles />
            <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{ backgroundImage: profileBannerTemp ? `url(${profileBannerTemp})` : author && author.banner && author.banner.url ? `url(${api.baseUrl + author.banner.url})` : 'url(../../img/author_single/author_banner.jpg)' }}>
                <div className='mainbreadcumb'>
                </div>
            </section>

            <section id="section-main" aria-label="section" style={{flex: 1}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex">
                            <Formik
                                enableReinitialize
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                validateOnMount={validationSchema.isValidSync(initialValues)}
                                onSubmit={async (values, { setSubmitting, resetForm }) => {
                                    setSubmitting(true);
                                    await handleSubmitForm(values);
                                    setSubmitting(false);
                                    resetForm();
                                }}
                            >
                                {
                                    ({ values, isSubmitting, isValid }) => {

                                        return (
                                            <Form className="form-border w-100">
                                                <div className="de_tab tab_simple">

                                                    <ul className="de_nav text-left m-0 mb-3">
                                                        <li className="active" style={{ opacity: 1 }}><span><i className="fa fa-user"></i>Profile</span></li>
                                                    </ul>

                                                    <div className="de_tab_content">
                                                        <div className="tab-1">
                                                            <div className="row wow fadeIn animated" style={{ backgroundSize: 'cover', visibility: 'visible', animationName: 'fadeIn' }}>
                                                                <div className="col-lg-8 mb-sm-20">
                                                                    <div className="field-set">
                                                                        <h5>Username</h5>
                                                                        <Field type="text" name="username" id="username" className="form-control" placeholder="Enter username" />
                                                                        <ErrorMessage name="username" component="div" />
                                                                        <div className="spacer-20"></div>

                                                                        <h5>About</h5>
                                                                        <Field component="textarea" name="about" id="about" className="form-control" placeholder="Tell the world who you are!" />
                                                                        <ErrorMessage name="about" component="div" />
                                                                        <div className="spacer-20"></div>

                                                                        <h5>Social</h5>
                                                                        <Field type="text" name="social" id="social" className="form-control" placeholder="Enter Social URLs like Instagram or Twitter" />
                                                                        <ErrorMessage name="social" component="div" />
                                                                        <div className="spacer-20"></div>

                                                                        <h5>Wallet</h5>
                                                                        <Field type="text" name="wallet" id="wallet" className="form-control" placeholder="Enter your Wallet Address" />
                                                                        <ErrorMessage name="wallet" component="div" />
                                                                        <div className="spacer-20"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5>{updateProfile ? 'Successfully Updated!' : ""}</h5>
                                                <input type="submit" id="submit" className="btn-main" value="Update profile" />
                                            </Form>
                                        )
                                    }
                                }
                            </Formik>
                            {/* different form for image and banner */}
                            <div id="sidebar" className="col-lg-4">
                                <Formik
                                    initialValues={initialProfilePicture}
                                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                                        setSubmitting(true);
                                        await handleSubmitProfilePicture(profileImage, 'avatar');
                                        setSubmitting(false);
                                        resetForm();
                                    }}
                                >
                                    {
                                        ({ values, isSubmitting, isValid }) => {

                                            return (
                                                <Form>
                                                    <h5>Profile image <i className="fa fa-info-circle id-color-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Recommend 400 x 400. Max size: 50MB. Click the image to upload." aria-label="Recommend 400 x 400. Max size: 50MB. Click the image to upload."></i></h5>
                                                    <img
                                                        // src={(author && author.avatar && author.avatar.url) ? profileImageTemp ? profileImageTemp : (api.baseUrl + author.avatar.url) : '../../img/misc/avatar-2.jpg'}
                                                        src={profileImageTemp ? profileImageTemp : (author && author.avatar && author.avatar.url) ? (api.baseUrl + author.avatar.url) : '../../img/misc/avatar-2.jpg'}
                                                        id="click_profile_img"
                                                        className="d-profile-img-edit img-fluid"
                                                        alt=""
                                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                    />
                                                    <input name="profile_image" type="file" id="upload_profile_img" onChange={(event) => {
                                                        handleProfilePicture(event)
                                                    }} />
                                                    <h5>{updateProfileImage ? 'Successfully Updated!' : ""}</h5>
                                                    <input type="submit" className="btn-main mt-3" value="Save Profile Image" />
                                                </Form>
                                            )
                                        }}
                                </Formik>
                                <div className="spacer-30"></div>
                                <Formik
                                    initialValues={initialProfileBanner}
                                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                                        setSubmitting(true);
                                        await handleSubmitProfilePicture(profileBanner, 'banner');
                                        setSubmitting(false);
                                        resetForm();
                                    }}
                                >
                                    {
                                        ({ values, isSubmitting, isValid }) => {

                                            return (
                                                <Form>
                                                    <h5>Profile banner <i className="fa fa-info-circle id-color-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Recommend 1500 x 500. Max size: 50MB. Click the image to upload." aria-label="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."></i></h5>
                                                    <img
                                                        src={profileBannerTemp ? profileBannerTemp : (author && author.banner && author.banner.url) ? (api.baseUrl + author.banner.url) : "../../img/author_single/author_banner.jpg"}
                                                        id="click_banner_img"
                                                        className="d-banner-img-edit img-fluid"
                                                        alt=""
                                                    />
                                                    <input name="profile_banner" type="file" id="upload_banner_img" onChange={(event) => {
                                                        handleProfileBanner(event)
                                                    }} />
                                                    <ErrorMessage name="profile_banner" component="div" />
                                                    <h5>{updateProfileBanner ? 'Successfully Updated!' : ""}</h5>
                                                    <input type="submit" className="btn-main mt-3" value="Save Profile Banner" />
                                                </Form>
                                            )
                                        }}
                                </Formik>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default memo(Profile);