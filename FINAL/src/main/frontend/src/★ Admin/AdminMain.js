import React, { useState } from 'react';
import AdminNavigation from './AdminNavigation';
import 조혜경 from '../images/조혜경.png'
import './AdminMain.css';

function AdminMain() {
  const [isAdd, isSetAdd] = useState(false);

  const addActive = () => {
    isSetAdd(isAdd => !isAdd);
  }

  return (
    <div className="AdminMain-Container">
      <AdminNavigation isAdd={isAdd}/>

      {/* Main의 시작 - Topbar, Cardbox, Details */}
      <div className={isAdd ? "Main active" : "Main"}>
        {/* Topbar */}
        <div className="Topbar">
          <div className="Toggle" onClick={addActive}>
            <span class="material-symbols-outlined">menu</span>
          </div>

          <div className="Search">
            <label>
              <input type="text" placeholder="Search here" />
              <span class="material-symbols-outlined">search</span>
            </label>
          </div>

          <div className="Admin">
            <img src={조혜경} alt="user"/>
          </div>
        </div>

        {/* CardBox */}
        <div className="CardBox">
          <div className="Card">
            <div>
              <div className="Numbers">1,504</div>
              <div className="CardName">Daily Views</div>
            </div>
            <div className="IconBx">
              <span class="material-symbols-outlined">visibility</span>
            </div>
          </div>
          <div className="Card">
            <div>
              <div className="Numbers">80</div>
              <div className="CardName">Sales</div>
            </div>
            <div className="IconBx">
              <span class="material-symbols-outlined">shopping_cart</span>
            </div>
          </div>
          <div className="Card">
            <div>
              <div className="Numbers">284</div>
              <div className="CardName">Comments</div>
            </div>
            <div className="IconBx">
              <span class="material-symbols-outlined">chat_bubble</span>
            </div>
          </div>
          <div className="Card">
            <div>
              <div className="Numbers">$7,842</div>
              <div className="CardName">Earning</div>
            </div>
            <div className="IconBx">
              <span class="material-symbols-outlined">payments</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="Details">
          <div className="RecentOrders">
            <div className="CardHeader">
              <h2>Recent Orders</h2>
              <a href="#" className="Btn">View All</a>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Star Refrigerator</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td><span className="Status delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td>Window Coolers</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td><span className="Status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Speakers</td>
                  <td>$620</td>
                  <td>Paid</td>
                  <td><span className="Status return">Return</span></td>
                </tr>
                <tr>
                  <td>Hp Laptop</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td><span className="Status inprogress">In Progress</span></td>
                </tr>
                <tr>
                  <td>Apple Watch</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td><span className="Status delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td>Wall Fan</td>
                  <td>$110</td>
                  <td>Paid</td>
                  <td><span className="Status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Adidas Shoes</td>
                  <td>$620</td>
                  <td>Paid</td>
                  <td><span className="Status return">Return</span></td>
                </tr>
                <tr>
                  <td>Denim Shirts</td>
                  <td>$110</td>
                  <td>Paid</td>
                  <td><span className="Status inprogress">In Progress</span></td>
                </tr>
                <tr>
                  <td>Casual Shoes</td>
                  <td>$575</td>
                  <td>Paid</td>
                  <td><span className="Status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Wall Fan</td>
                  <td>$110</td>
                  <td>Paid</td>
                  <td><span className="Status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Denim Shirts</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td><span className="Status inprogress">In Progress</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <!-- New Customer --> */}
          <div className="RecentCustomers">
            <div className="CardHeader">
              <h2>Recent Customers</h2>
            </div>
            <table>
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
              {/* Recent Customer */}
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
              <tr>
                <td width="60px"><div className="ImgBx"><img src={조혜경} alt="no" /></div></td>
                <td><h4>David<br/><span>Italy</span></h4></td>
              </tr>
            </table>
          </div>

        </div>

      </div> {/* Main의 끝 */}
    </div>
  );
}

export default AdminMain;