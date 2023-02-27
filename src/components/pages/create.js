import React, { Component } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';

export default class Createpage extends Component {

  constructor() {
    super();
    this.state = {
      file: null,
      fileURL: null,
      title: "",
      description: "",
      price: "",
      royalties: ""
    };
  }

  const

  onChangeFile = (e) => {
    var file = e.target.files[0];
    var fileURL = URL.createObjectURL(file);
    document.getElementById("file_name").style.display = "none";
    this.setState({ file: file, fileURL: fileURL });
  }

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  onChangePrice = (e) => {
    const re = /^[0-9]*[.]?[0-9]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ price: e.target.value })
    }
  }

  onChangeRoyalties = (e) => {
    const re = /^[0-9]*[.]?[0-9]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ royalties: e.target.value });
    }
  }

  handleCreate = (e) => {
    console.log("------------>", e);
    e.preventDefault();
  }

  render() {
    const { file, fileURL, title, description, price, royalties } = this.state;
    return (
      <div>

        <section className='jumbotron breadcumb no-bg'>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Create</h1>
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
                      <input id='upload_file' type="file" onChange={this.onChangeFile} />
                    </div>

                  </div>

                  <div className="spacer-single"></div>

                  <h5>Title</h5>
                  <input type="text" name="item_title" id="item_title" className="form-control" placeholder="e.g. 'Crypto Funk" value={title} onChange={this.onChangeTitle} />

                  <div className="spacer-10"></div>

                  <h5>Description</h5>
                  <textarea data-autoresize name="item_desc" id="item_desc" className="form-control" placeholder="e.g. 'This is very limited item'" value={description} onChange={this.onChangeDescription}></textarea>

                  <div className="spacer-10"></div>

                  <h5>Price</h5>
                  <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (ETH)" value={price} onChange={this.onChangePrice} />

                  <div className="spacer-10"></div>

                  <h5>Royalties</h5>
                  <input type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" value={royalties} onChange={this.onChangeRoyalties} />

                  <div className="spacer-10"></div>

                  <input type="button" id="submit" className="btn-main" value="Create Item" onClick={this.handleCreate} />
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
                    <img className="lazy" src="./img/author/author-1.jpg" alt="" />
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
}