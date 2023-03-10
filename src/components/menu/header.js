import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import {
  Link,
  useNavigate,
  useMatch,
  useResolvedPath
} from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  Tezos,
  TEZOS_COLLECT_NETWORK,
  TEZOS_COLLECT_WALLET,
} from "../../utils/constants";
import auth from '../../core/auth';
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorListWallet } from "../../store/actions/thunks";
import * as selectors from '../../store/selectors';
import api from "../../core/api";

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      {...props}
      className={match ? 'active' : 'non-active'}
    />
  )
};

const Header = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorState = useSelector(selectors.authorUserState);
  const author = authorState.data;
  console.log("author==========>", author)

  const [openMenu, setOpenMenu] = useState(false);
  const [activeAddress, setActiveAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  const handleLogout = () => {
    auth.clearAppStorage();
    navigate('/')
  }

  const onConnectWallet = async () => {
    try {
      Tezos.setWalletProvider(TEZOS_COLLECT_WALLET);
      await TEZOS_COLLECT_WALLET.requestPermissions({
        network: TEZOS_COLLECT_NETWORK,
      });
      const _activeAddress = await TEZOS_COLLECT_WALLET.getPKH();
      setActiveAddress(_activeAddress);
      localStorage.setItem("wallet", _activeAddress);
      await getWalletBalance(_activeAddress);
      dispatch(fetchAuthorListWallet(_activeAddress));
    } catch (error) {
      console.error(error);
    }
  };

  const getWalletBalance = async (address) => {
    try {
      const balance = await Tezos.tz.getBalance(address);
      console.log(`Wallet balance: ${balance.toNumber() / 1000000} ꜩ`);
      setBalance(balance.toNumber() / 1000000);
    } catch (error) {
      console.error(error);
    }
  };

  const onDisconnectWallet = async () => {
    setActiveAddress("");
    handleLogout();
    await TEZOS_COLLECT_WALLET.clearActiveAccount();
  };

  useEffect(() => {
    const headers = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = headers.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        headers.classList.add("sticky");
        totop.classList.add("show");

      } else {
        headers.classList.remove("sticky");
        totop.classList.remove("show");
      } if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  useEffect(() => {
    const activeAccount = localStorage.getItem("beacon:active-account");

    if (activeAccount !== null && activeAccount !== "undefined") {
      const walletAccounts = JSON.parse(localStorage.getItem("beacon:accounts"));
      const activeWallet = walletAccounts.find(({ accountIdentifier }) => accountIdentifier === activeAccount);
      const activeAddress = activeWallet.address;
      setActiveAddress(activeAddress);
      getWalletBalance(activeAddress);
    }
  }, [activeAddress]);

  useEffect(() => {
    if (localStorage.getItem('wallet'))
      dispatch(fetchAuthorListWallet(localStorage.getItem('wallet')));
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     if (!author && localStorage.getItem('wallet')) {
  //       console.log("author------------>", author);
  //       let config = {
  //         headers: {
  //           'Authorization': 'Bearer ' + apiKey
  //         }
  //       }
  //       let authorData = {
  //         "data": {
  //           "username": "ArtCollector",
  //           "wallet": localStorage.getItem('wallet')
  //         }
  //       }
  //       await request(postAuthorUrl, { method: 'POST', body: authorData, config })
  //     }
  //   }
  //   fetchData();
  // }, [author])

  return (
    <header id="myHeader" className='navbar white'>
      <div className='container'>
        <div className='row w-100-nav'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                <div className="d-flex align-items-center">
                  <img
                    src="../../img/logo.png"
                    className="img-fluid logo-image"
                    alt="#"
                  />
                  <div className="ms-3 fs-4">Art Collect</div>
                </div>
              </NavLink>
            </div>
          </div>

          <div className='search'>
            <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu &&
                <div className='menu'>
                  <div className='navbar-item'>
                    <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                      Home
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <div ref={ref}>
                      <div className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick}
                      >
                        Drops
                      </div>
                      {openMenu && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>Categories</NavLink>
                            <NavLink to="/explore2" onClick={() => btn_icon(!showmenu)}>Image</NavLink>
                            <NavLink to="/rangking" onClick={() => btn_icon(!showmenu)}>Video</NavLink>
                            <NavLink to="/colection" onClick={() => btn_icon(!showmenu)}>Audio</NavLink>
                            <NavLink to="/ItemDetail" onClick={() => btn_icon(!showmenu)}>Gif</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/activity" onClick={() => btn_icon(!showmenu)}>
                      Activity
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/rangking" onClick={() => btn_icon(!showmenu)}>
                      Leaderboard
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <a onClick={() => {
                      btn_icon(!showmenu);
                      window.open("https://medium.com/@teamartcollect", "_blank");
                    }}>
                      Blog
                    </a>
                  </div>
                </div>
              }
            </Breakpoint>

            <Breakpoint xl>
              <div className='menu'>
                <div className='navbar-item'>
                  <NavLink to="/">
                    Home
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <div ref={ref}>
                    <div className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick} onMouseLeave={closeMenu}>
                      Drops
                      <span className='lines'></span>
                      {openMenu && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink to="/explore">Categories</NavLink>
                            <NavLink to="/explore">Image</NavLink>
                            <NavLink to="/explore">Video</NavLink>
                            <NavLink to="/explore">Audio</NavLink>
                            <NavLink to="/explore">Gif</NavLink>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/activity">
                    Activity
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/rangking">
                    Leaderboard
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <a onClick={() => window.open("https://medium.com/@teamartcollect", "_blank")}>
                    Blog
                    <span className='lines'></span>
                  </a>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className='mainside'>
            {activeAddress !== ""
              // ? <div className="btn-main" onClick={handleActiveWallet}>
              //   <i className="icon_wallet_alt"></i>
              //   <span>{activeAddress.slice(0, 5)}...{activeAddress.slice(activeAddress.length - 5, activeAddress.length)}</span>
              //   {openAddress && (
              //     <div className='item-dropdown'>
              //       <div className="dropdown" onClick={closeMenu}>
              //         <NavLink to="/Author">Profile</NavLink>
              //         <NavLink to="/create">Create NFT</NavLink>
              //         <div className="wallet-btn" onClick={onDisconnectWallet}>Disconnect</div>
              //       </div>
              //     </div>
              //   )}
              // </div>
              ? <div className="logout">
                <NavLink to="/create">Create</NavLink>
                <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                  <div className="d-count">8</div>
                  <i className="fa fa-bell"></i>
                  {shownot &&
                    <div className="popshow">
                      <div className="de-flex">
                        <h4>Notifications</h4>
                        <span className="viewaall">Show all</span>
                      </div>
                      <ul>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                              <span className="d-time">1 hour ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                              <span className="d-time">2 hours ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Lori Hart</b> started following you</span>
                              <span className="d-time">18 hours ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                              <span className="d-time">1 day ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Karla Sharp</b> started following you</span>
                              <span className="d-time">3 days ago</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
                <div id="de-click-menu-profile" className="de-menu-profile" onClick={() => btn_icon_pop(!showpop)} ref={refpop}>
                  <img src={(author && author.avatar && author.avatar.url) ? (api.baseUrl + author.avatar.url) : "../../img/misc/avatar-2.jpg"} alt="" />
                  {showpop &&
                    <div className="popshow">
                      <div className="d-name">
                        <h4>{author && author.username ? author.username : "ArtCollecter"}</h4>
                        <span className="name" onClick={() => window.open(`https://artcollect.io/profile/${author && author.id ? author.id : '0'}`, "_self")}>Set display name</span>
                      </div>
                      <div className="d-balance">
                        <h4>Balance</h4>
                        {balance} XTZ
                      </div>
                      <div className="d-wallet">
                        <h4>My Wallet</h4>
                        <span id="wallet" className="d-wallet-address">{activeAddress}</span>
                        <button id="btn_copy" title="Copy Text" onClick={() => navigator.clipboard.writeText(activeAddress)}>Copy</button>
                      </div>
                      <div className="d-line"></div>
                      <ul className="de-submenu-profile">
                        <li>
                          <span>
                            <i className="fa fa-user"></i><NavLink to={`/profile/${author && author.id ? author.id : '0'}`}>My Profile</NavLink>
                          </span>
                        </li>
                        {/* <li>
                          <span>
                            <i className="fa fa-pencil"></i><NavLink to="/profile/1">Edit profile</NavLink>
                          </span>
                        </li> */}
                        <li>
                          <span>
                            <i className="fa fa-sign-out"></i><a onClick={onDisconnectWallet}>Sign out</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
              : <div className="btn-main" onClick={onConnectWallet}>
                <i className="icon_wallet_alt"></i>
                <span>Connect Wallet</span>
              </div>
            }
          </div>

        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>
    </header>
  );
}
export default Header;