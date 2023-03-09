import React, { memo } from 'react';
import api from '../../core/api';

//react functional component
const UserTopSeller = ({ user }) => {
    return (
        <>
            <div className="author_list_pp">
              <span onClick={()=> window.open("", "_self")}>
                  {user.avatar && <img className="lazy" src={api.baseUrl + user.avatar.url} alt=""/>}
                  <i className="fa fa-check"></i>
              </span>
            </div>                                    
            <div className="author_list_info">
                <span onClick={()=> window.open("", "_self")}>{user.username}</span>
                {user.author_sale && <span className="bot">{user.author_sale.sales} XTZ</span>}
            </div>   
        </>     
    );
};

export default memo(UserTopSeller);