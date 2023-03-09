import React, { memo, useEffect, useState } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';

import { createGlobalStyle } from 'styled-components';
import auth from '../../core/auth';
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorList } from "../../store/actions/thunks";
import * as selectors from '../../store/selectors';
import api from "../../core/api";

const GlobalStyles = createGlobalStyle`
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
`;

const CreatePage = () => {
  const dispatch = useDispatch();
  const authorsState = useSelector(selectors.authorsState);
  const [author, setAuthor] = useState({});

  const [isActive, setActive] = useState(false);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [royalties, setRoyalties] = useState("");

  const onChangeFile = (e) => {
    var file = e.target.files[0];
    var fileURL = URL.createObjectURL(file);
    document.getElementById("file_name").style.display = "none";
    setFile(file);
    setFileURL(fileURL);
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const onChangePrice = (e) => {
    const re = /^[0-9]*[.]?[0-9]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPrice(e.target.value);
    }
  }

  const onChangeRoyalties = (e) => {
    const re = /^[0-9]*[.]?[0-9]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setRoyalties(e.target.value);
    }
  }

  const handleCreate = (e) => {
    console.log("------------>", e);
    e.preventDefault();
  }

  const handleShow = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
  }
  const handleShow1 = () => {
    // document.getElementById("tab_opt_1").classList.add("hide");
    // document.getElementById("tab_opt_1").classList.remove("show");
    // document.getElementById("tab_opt_2").classList.add("show");
    // document.getElementById("btn1").classList.remove("active");
    // document.getElementById("btn2").classList.add("active");
    // document.getElementById("btn3").classList.remove("active");
  }
  const handleShow2 = () => {
    // document.getElementById("tab_opt_1").classList.add("show");
    // document.getElementById("btn1").classList.remove("active");
    // document.getElementById("btn2").classList.remove("active");
    // document.getElementById("btn3").classList.add("active");
  }

  const unlockClick = () => {
    setActive(true);
  }
  const unlockHide = () => {
    setActive(false);
  };

  useEffect(() => {
    const _userInfo = auth.getUserInfo();
    _userInfo !== null && dispatch(fetchAuthorList(_userInfo.id));
  }, []);

  useEffect(() => {
    if (authorsState.data && authorsState.data.length > 0)
      setAuthor(authorsState.data[0]);
  }, [authorsState.data])

  return (
    <div>
      <GlobalStyles />
      <section className='jumbotron breadcumb no-bg' >
        <div className='mainbreadcumb' >
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Create Single Collectible</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>

        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>

                  {file && <p>{file.name}</p>}

                  <div className='browse'>
                    <input type="button" id="get_file" className="btn-main" value="Browse" />
                    <input id='upload_file' type="file" onChange={onChangeFile} />
                  </div>

                </div>

                <div className="spacer-single"></div>

                <h5>Select method</h5>
                <div className="de_tab tab_methods">
                  <ul className="de_nav text-left mx-0">
                    <li id='btn1' className="active" onClick={handleShow}><span><i className="fa fa-tag"></i>Fixed price</span>
                    </li>
                    <li id='btn2' onClick={handleShow1}><span><i className="fa fa-hourglass-1"></i>Timed auction</span>
                    </li>
                    <li id='btn3' onClick={handleShow2}><span><i className="fa fa-users"></i>Open for bids</span>
                    </li>
                  </ul>

                  <div className="de_tab_content pt-3">

                    {/* <div id="tab_opt_1">
                      <h5>Price</h5>
                      <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (XTZ)" />
                    </div> */}

                    <div id="tab_opt_2" className='hide'>
                      <h5>Minimum bid</h5>
                      <input type="text" name="item_price_bid" id="item_price_bid" className="form-control" placeholder="enter minimum bid" />

                      <div className="spacer-20"></div>

                      <div className="row">
                        <div className="col-md-6">
                          <h5>Starting date</h5>
                          <input type="date" name="bid_starting_date" id="bid_starting_date" className="form-control" min="1997-01-01" />
                        </div>
                        <div className="col-md-6">
                          <h5>Expiration date</h5>
                          <input type="date" name="bid_expiration_date" id="bid_expiration_date" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div id="tab_opt_3">
                    </div>

                  </div>

                </div>

                <div className="spacer-20"></div>

                {/* <div className="switch-with-title">
                  <h5><i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>Unlock once purchased</h5>
                  <div className="de-switch">
                    <input type="checkbox" id="switch-unlock" className="checkbox" />
                    {isActive ? (
                      <label htmlFor="switch-unlock" onClick={unlockHide}></label>
                    ) : (
                      <label htmlFor="switch-unlock" onClick={unlockClick}></label>
                    )}
                  </div>
                  <div className="clearfix"></div>
                  <p className="p-info pb-3">Unlock content after successful transaction.</p>

                  {isActive ?
                    <div id="unlockCtn" className="hide-content">
                      <input type="text" name="item_unlock" id="item_unlock" className="form-control" placeholder="Access key, code to redeem or link to a file..." />
                    </div>
                    : null}
                </div> */}

                <h5>Title</h5>
                <input type="text" name="item_title" id="item_title" className="form-control" placeholder="e.g. 'Crypto Funk" value={title} onChange={onChangeTitle} />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea data-autoresize name="item_desc" id="item_desc" className="form-control" placeholder="e.g. 'This is very limited item'" value={description} onChange={onChangeDescription}></textarea>

                <div className="spacer-10"></div>

                <h5>Price</h5>
                <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (XTZ)" value={price} onChange={onChangePrice} />

                <div className="spacer-10"></div>

                <h5>Royalties</h5>
                <input type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder="suggested: 5%, 10%, 20%. Maximum is 70%" value={royalties} onChange={onChangeRoyalties} />

                <div className="spacer-10"></div>

                <input type="button" id="submit" className="btn-main" value="Create Item" onClick={handleCreate} />
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              {/* <div className="de_countdown">
                  <Clock deadline="December, 30, 2021" />
                </div> */}
              <div className="author_list_pp">
                <span>
                  <img className="lazy" src={(author && author.avatar && author.avatar.url) ? (api.baseUrl + author.avatar.url) : "../../img/misc/avatar-2.jpg"} alt="" />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <span>
                  {fileURL
                    ? <img src={fileURL} id="get_file_2" className="lazy nft__item_preview" alt="" />
                    : <svg viewBox="0 0 24 24">
                      <path d="M13.5,6C12.7,6,12,6.7,12,7.5S12.7,9,13.5,9S15,8.3,15,7.5S14.3,6,13.5,6z M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14 c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M20,13.9L18.1,12c-1.2-1.1-3.1-1.1-4.2,0L13,12.9L10.1,10c-1.2-1.1-3.1-1.1-4.2,0L4,11.9V5 c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V13.9z" />
                    </svg>}
                </span>
              </div>
              <div className="nft__item_info">
                <span >
                  <h4>{title}</h4>
                </span>
                <div className="nft__item_price">
                  {price === "" ? 0 : price} XTZ<span>1/20</span>
                </div>
                <div className="nft__item_action">
                  <span>Place a bid</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i><span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default memo(CreatePage);