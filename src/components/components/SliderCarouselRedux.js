import React, { Component, memo, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { settings } from './constants';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import { fetchNftShowcase } from "../../store/actions/thunks";
import { useNavigate } from 'react-router-dom';
import api from "../../core/api";

class CustomSlide extends Component {
    render() {
        const { index, ...props } = this.props;
        return (
            <div {...props}></div>
        );

    }
}

const SliderCarouselRedux = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nftsState = useSelector(selectors.nftShowcaseState);
    const nfts = nftsState.data ? nftsState.data : [];

    useEffect(() => {
        dispatch(fetchNftShowcase());
    }, [dispatch]);

    const navigateTo = (link) => {
        navigate(link);
    }

    return (
        <div className='nft-big'>
            {
                nfts.length > 0 ? (
                    <Slider {...settings}>
                        {nfts && nfts.map((nft, index) => (
                            <CustomSlide key={index} className='itm' index={index}>
                                <div className="nft_pic">
                                    <span>
                                        <Link to="/ItemDetail">
                                            <span className="nft_pic_info">
                                                <span className="nft_pic_title">{nft.title}</span>
                                                <span className="nft_pic_by">{nft.author.username}</span>
                                            </span>
                                        </Link>
                                    </span>
                                    <div className="nft_pic_wrap">
                                        <img src={api.baseUrl + nft.preview_image.url} className="lazy img-fluid" alt="" />
                                    </div>
                                </div>
                            </CustomSlide>

                        ))}

                    </Slider>
                ) : <></>
            }
        </div>
    );
}

export default memo(SliderCarouselRedux);
