import React from 'react';
import SliderCarouselSingleRedux from '../components/SliderCarouselSingleRedux';
import SliderCarouselRedux from '../components/SliderCarouselRedux';
import FeatureBox from '../components/FeatureBox';
import CarouselCollectionRedux from '../components/CarouselCollectionRedux';
import ColumnNewRedux from '../components/ColumnNewRedux';
import AuthorListRedux from '../components/AuthorListRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar .search #quick_search{
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
  }
  .author_list_pp{
    margin-left:0;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
`;

const homethree = () => (
  <div>
    <GlobalStyles />
    <section className="jumbotron no-bg">
      {/* <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className="spacer-single"></div>
            <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
              <h6 className=""><span className="text-uppercase color">WELCOME</span></h6>
            </Reveal>
            <div className="spacer-10"></div>
            <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
              <h1 className="">Trade, sell or collect digital art</h1>
            </Reveal>
            <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
              <p className=" lead">
                Art Collect is a new NFT marketlplace on the Tezos network that helps artists and collectors connect thruogh value.
              </p>
            </Reveal>
            <div className="spacer-10"></div>
            <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
              <span onClick={() => window.open("/#", "_self")} className="btn-main lead">Explore Drops</span>
              <div className="mb-sm-30"></div>
            </Reveal>
            <Reveal className='onStep d-inline' keyframes={inline} delay={900} duration={1200} triggerOnce>
              <div className="row">
                <div className="spacer-single"></div>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                    <div className="de_count text-left">
                      <h3><span>94215</span></h3>
                      <h5 className="id-color">Drops</h5>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                    <div className="de_count text-left">
                      <h3><span>27</span>k</h3>
                      <h5 className="id-color">Drops sold</h5>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                    <div className="de_count text-left">
                      <h3><span>4</span>k</h3>
                      <h5 className="id-color">Artists</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="spacer-double"></div>
          </div>
          <div className='col-lg-6 px-0'>
            <SliderCarouselSingleRedux />
          </div>
        </div>
      </div> */}
      <SliderCarouselRedux/>
    </section>

    <section className='container no-top'>
      <div className='container px-0'>
        <FeatureBox />
      </div>
    </section>

    <section className='container'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='style-2'>Trending Drops</h2>
          </div>
        </div>
        <ColumnNewRedux />
      </div>
    </section>

    <section className='container no-top'>
      <div className='row'>
        <div className='col-lg-12'>
          <h2 className='style-2'>New Drops</h2>
        </div>
      </div>
      <div className='container no-top'>
        <div className='row'>
          <div className='col-lg-12 px-0'>
            <CarouselCollectionRedux />
          </div>
        </div>
      </div>
    </section>

    <section className='container no-top'>
      <div className='row'>
        <div className='col-lg-12'>
          <h2 className='style-2'>Most Valuable</h2>
        </div>
        <div className='col-lg-12'>
          <AuthorListRedux />
        </div>
      </div>
    </section>

    <section className='container no-top'>
      <div className='row'>
        <div className='col-lg-12 text-center'>
          <h2 className='style-2'>Drops</h2>
          <div className="small-border"></div>
        </div>
      </div>
      <div className='container px-0'>
        <div className="row">
          <div className="col-lg-3 col-sm-4 col-6 mb30">
            <span className="box-url">
              <i className="fa drops-icons">
                <svg viewBox="0 0 24 24">
                  <path d="M13.5,6C12.7,6,12,6.7,12,7.5S12.7,9,13.5,9S15,8.3,15,7.5S14.3,6,13.5,6z M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14 c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M20,13.9L18.1,12c-1.2-1.1-3.1-1.1-4.2,0L13,12.9L10.1,10c-1.2-1.1-3.1-1.1-4.2,0L4,11.9V5 c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V13.9z" />
                </svg>
              </i>
              <h4>Image</h4>
            </span>
          </div>

          <div className="col-lg-3 col-sm-4 col-6 mb30">
            <span className="box-url">
              <i className="fa drops-icons">
                <svg viewBox="0 0 24 24">
                  <g data-name="Layer 2">
                    <path d="M21 7.15a1.7 1.7 0 0 0-1.85.3l-2.15 2V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.45l2.16 2a1.74 1.74 0 0 0 1.16.45 1.68 1.68 0 0 0 .69-.15 1.6 1.6 0 0 0 1-1.48V8.63A1.6 1.6 0 0 0 21 7.15z" data-name="video" />
                  </g>
                </svg>
              </i>
              <h4>Video</h4>
            </span>
          </div>

          <div className="col-lg-3 col-sm-4 col-6 mb30">
            <span className="box-url">
              <i className="fa drops-icons">
                <svg viewBox="0 0 64 64">
                  <defs>
                    <clipPath id="a">
                      <rect width="64" height="64" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)">
                    <path d=" M 6.667 44.207 L 16.434 44.207 C 17.108 44.207 18.042 44.594 18.518 45.07 L 29.715 56.268 C 31.145 57.697 32.305 57.216 32.305 55.195 L 32.305 8.801 C 32.305 6.78 31.145 6.299 29.715 7.729 L 18.518 18.926 C 18.042 19.403 17.108 19.789 16.434 19.789 L 6.667 19.789 C 4.645 19.789 3.004 21.431 3.004 23.452 L 3.004 40.544 C 3.004 42.566 4.645 44.207 6.667 44.207 Z " />
                    <path fillRule="evenodd" d=" M 56.112 32 L 56.112 32 L 56.112 32 C 56.112 32 56.112 32 56.112 32 C 56.112 26.482 54.366 21.098 51.119 16.629 C 47.932 12.234 43.476 8.901 38.361 7.082 L 37.204 6.672 C 36.569 6.447 36.237 5.748 36.462 5.114 L 37.28 2.812 C 37.506 2.177 38.205 1.845 38.839 2.071 L 39.985 2.479 C 46.04 4.628 51.302 8.559 55.075 13.76 C 58.92 19.059 60.996 25.444 60.996 32 C 60.996 32 60.996 32 60.996 32 C 60.996 32 60.996 32 60.996 32 C 60.996 38.544 58.92 44.929 55.075 50.228 C 51.302 55.429 46.04 59.372 39.985 61.521 L 38.839 61.929 C 38.205 62.155 37.506 61.823 37.28 61.188 L 36.462 58.886 C 36.237 58.252 36.569 57.553 37.204 57.328 L 38.361 56.918 C 43.476 55.099 47.932 51.766 51.119 47.371 C 54.366 42.902 56.112 37.518 56.112 32 Z  M 60.996 32 C 60.996 32 60.996 32 60.996 32 L 60.996 32 Z  M 60.996 32" />
                    <path d=" M 38.08 19.486 L 36.985 18.936 C 36.383 18.633 36.14 17.898 36.443 17.296 L 37.544 15.107 C 37.846 14.505 38.58 14.263 39.182 14.567 L 40.265 15.115 C 43.452 16.715 46.162 19.095 48.164 22.038 C 50.142 24.98 51.217 28.447 51.229 32 C 51.217 35.553 50.142 39.008 48.164 41.95 C 46.162 44.892 43.452 47.273 40.265 48.873 L 39.182 49.42 C 38.58 49.724 37.846 49.483 37.543 48.881 L 36.444 46.703 C 36.141 46.101 36.383 45.367 36.985 45.064 L 38.08 44.514 C 40.51 43.293 42.585 41.462 44.123 39.215 C 45.552 37.079 46.333 34.576 46.345 32 C 46.333 29.424 45.552 26.909 44.123 24.785 C 42.585 22.526 40.51 20.707 38.08 19.486 Z " />
                  </g>
                </svg>
              </i>
              <h4>Audio</h4>
            </span>
          </div>

          <div className="col-lg-3 col-sm-4 col-6 mb30">
            <span className="box-url">
              <i className="fa drops-icons">
                <svg viewBox="0 0 64 64">
                  <path d="m37.729 22.25-9.016-5.2a1 1 0 0 0-1.5.866v10.406a1 1 0 0 0 1.5.866l9.016-5.206a1 1 0 0 0 0-1.732Z" />
                  <path d="M54 43.67V17.376l-.293-.293-14.29-14.29-.293-.293H14a4 4 0 0 0-4 4v33.742a1.991 1.991 0 0 0-1 1.722V56.5a5.006 5.006 0 0 0 5 5h36a5.006 5.006 0 0 0 5-5V45.393a1.991 1.991 0 0 0-1-1.723ZM41.71 18.79h.938a11.544 11.544 0 1 1-4.938-5.642v1.642a4 4 0 0 0 4 4ZM30.488 57.44h-1.476v-.692a2.735 2.735 0 0 1-.96.633 3.335 3.335 0 0 1-1.14.179 3.469 3.469 0 0 1-1.656-.366 3.179 3.179 0 0 1-1.116-.978 4.153 4.153 0 0 1-.63-1.41 6.877 6.877 0 0 1-.2-1.662 8.011 8.011 0 0 1 .2-1.806 4.367 4.367 0 0 1 .644-1.512 3.244 3.244 0 0 1 1.183-1.044 3.815 3.815 0 0 1 1.8-.39 3.616 3.616 0 0 1 1.884.521 2.64 2.64 0 0 1 .768.721 4.369 4.369 0 0 1 .564 1.17l-1.776.468a2.757 2.757 0 0 0-.63-.93 1.526 1.526 0 0 0-1.05-.318 1.211 1.211 0 0 0-.882.321 2.165 2.165 0 0 0-.51.792 3.918 3.918 0 0 0-.234 1 9.2 9.2 0 0 0-.054.926 7.049 7.049 0 0 0 .066.913 3.592 3.592 0 0 0 .254.938 1.935 1.935 0 0 0 .532.726 1.326 1.326 0 0 0 .888.29 1.586 1.586 0 0 0 1.2-.475 1.613 1.613 0 0 0 .456-1h-1.641V52.82h3.516Zm3.228 0h-1.908v-8.928h1.908Zm7.116-7.3h-3.876v1.824h2.892l.012 1.636-2.9.012v3.828h-1.912v-8.928h5.784ZM52 43.393H30.086l-2.4-2.746a2 2 0 0 0-1.505-.683H12V6.5a2 2 0 0 1 2-2h23.71v6.4a13.538 13.538 0 1 0 7.066 7.889H52Z" />
                </svg>
              </i>
              <h4>Gif</h4>
            </span>
          </div>
        </div>
      </div>
    </section>

    <Footer />

  </div>
);
export default homethree;