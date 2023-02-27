import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { Link } from '@reach/router';
import useOnclickOutside from "react-cool-onclickoutside";
import {
  // Tezos,
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
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [openAddress, setOpenAddress] = React.useState(false);
  const [activeAddress, setActiveAddress] = React.useState("");

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const onConnectWallet = async () => {
    await TEZOS_COLLECT_WALLET.requestPermissions({
      network: TEZOS_COLLECT_NETWORK,
    });
    const _activeAddress = await TEZOS_COLLECT_WALLET.getPKH();
    setActiveAddress(_activeAddress);
    // try {
    //   let res = await fetchProfile(_activeAddress);
    //   console.log("res", res);
    //   if (res?.wallet) {
    //     if (res?.artist) {
    //       navigate(`/profile/${_activeAddress}/created`);
    //     } else {
    //       navigate(`/profile/${_activeAddress}/owned`);
    //     }
    //   } else {
    //     navigate("/signup");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
                    <div ref={ref1}>
                      <div className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick1}
                      >
                        Drops
                      </div>
                      {openMenu1 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu1}>
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
                    <a to="/" onClick={() => {
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
                  <div ref={ref1}>
                    <div className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1} onMouseLeave={closeMenu1}>
                      Drops
                      <span className='lines'></span>
                      {openMenu1 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/explore">Categories</NavLink>
                            <NavLink to="/explore2">Image</NavLink>
                            <NavLink to="/rangking">Video</NavLink>
                            <NavLink to="/colection">Audio</NavLink>
                            <NavLink to="/ItemDetail">Gif</NavLink>
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
              ? <div className="btn-main" onClick={handleActiveWallet}>
                <i className="icon_wallet_alt"></i>
                <span>{activeAddress.slice(0, 5)}...{activeAddress.slice(activeAddress.length - 5, activeAddress.length)}</span>
                {openAddress && (
                  <div className='item-dropdown'>
                    <div className="dropdown" onClick={closeMenu3}>
                      <NavLink to="/Author">Profile</NavLink>
                      <div className="wallet-btn" onClick={onDisconnectWallet}>Disconnect</div>
                    </div>
                  </div>
                )}
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