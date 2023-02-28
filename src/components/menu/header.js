import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { Link } from '@reach/router';
import useOnclickOutside from "react-cool-onclickoutside";
import {
  Tezos,
  TEZOS_COLLECT_NETWORK,
  TEZOS_COLLECT_WALLET,
} from "../../utils/constants";

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);



const Header = function () {

  const [openMenu, setOpenMenu] = React.useState(false);
  // const [openMenu1, setOpenMenu1] = React.useState(false);
  // const [openMenu2, setOpenMenu2] = React.useState(false);
  // const [openMenu3, setOpenMenu3] = React.useState(false);
  const [openAddress, setOpenAddress] = React.useState(false);
  const [activeAddress, setActiveAddress] = React.useState("");
  const [balance, setBalance] = useState(0);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
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
  // const onConnectWallet = async () => {
  //   await TEZOS_COLLECT_WALLET.requestPermissions({
  //     network: TEZOS_COLLECT_NETWORK,
  //   });
  //   const _activeAddress = await TEZOS_COLLECT_WALLET.getPKH();
  //   setActiveAddress(_activeAddress);

  //   let account = await TEZOS_COLLECT_WALLET.client.getActiveAccount();
  //   console.log(account)
  //   // try {
  //   //   let res = await fetchProfile(_activeAddress);
  //   //   console.log("res", res);
  //   //   if (res?.wallet) {
  //   //     if (res?.artist) {
  //   //       navigate(`/profile/${_activeAddress}/created`);
  //   //     } else {
  //   //       navigate(`/profile/${_activeAddress}/owned`);
  //   //     }
  //   //   } else {
  //   //     navigate("/signup");
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  const onConnectWallet = async () => {
    try {
      await TEZOS_COLLECT_WALLET.requestPermissions({
        network: TEZOS_COLLECT_NETWORK,
      });
      const _activeAddress = await TEZOS_COLLECT_WALLET.getPKH();
      setActiveAddress(_activeAddress);
      await getWalletBalance(_activeAddress);
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
    await TEZOS_COLLECT_WALLET.clearActiveAccount();
  };

  const handleActiveWallet = () => {
    setOpenAddress(!openAddress)
  }
  const closeAddress = () => {
    setOpenAddress(false);
  }
  const walletRef = useOnclickOutside(() => {
    closeAddress();
  });

  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      } if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className='navbar white'>
      <div className='container'>
        <div className='row w-100-nav'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                <div className="d-flex align-items-center">
                  <img
                    src="./img/logo.png"
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
                      window.open("https://art-collecting.com/blogs.htm", "_blank");
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
                  <a onClick={() => window.open("https://art-collecting.com/blogs.htm", "_blank")}>
                    Blog
                    <span className='lines'></span>
                  </a>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div ref={walletRef} className='mainside'>
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
                  <img src="../../img/author_single/author_thumbnail.jpg" alt="" />
                  {showpop &&
                    <div className="popshow">
                      <div className="d-name">
                        <h4>Monica Lucas</h4>
                        <span className="name" onClick={() => window.open("", "_self")}>Set display name</span>
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
                            <i className="fa fa-user"></i><NavLink to="/Author">My Profile</NavLink>
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa fa-pencil"></i><NavLink to="/Author">Edit profile</NavLink>
                          </span>
                        </li>
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
              </div>}
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