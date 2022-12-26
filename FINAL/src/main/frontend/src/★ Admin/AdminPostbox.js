import React, { useState, useEffect } from 'react';
import Moment from "react-moment";
import AdminNavigation from './AdminNavigation';
import AdminAPI from '../0. API/AdminAPI';
import Loading from '../other/Loading';
import 조혜경 from '../images/조혜경.png'

function AdminPostbox() {
  
  const [isAdd, isSetAdd] = useState(false);
  const addActive = () => { isSetAdd(isAdd => !isAdd); }

  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);



  /* 
  최초 통신(useEffect) */
  useEffect(() => {

    const postData = async () => {
      setLoading(true);

      try {
        const response = await AdminAPI.postbox();
        if (response.status == 200) {
          setPostList(response.data);
        }
      } catch (e) { console.log(e); }

      setLoading(false);
      // setGoPagination(true);
    };
    postData();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
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

          <div className="User">
            <img src={조혜경} alt="user"/>
          </div>
        </div>







        {/* Details */}
        <div className="Details">
          <div className="RecentOrders">
            <div className="CardHeader">
              <h2>전체 쪽지 조회</h2>
              <a href="#" className="Btn">View All</a>
            </div>
            <table className='PostboxTable'>
              <thead>
                <tr>
                  <td>번호</td>
                  <td>보낸 사람</td>
                  <td>받는 사람</td>
                  <td>내용</td>
                  <td>시간</td>
                </tr>
              </thead>
              <tbody>
                {postList.map(e =>
                <tr>
                  <td>{e.postNum}</td>
                  <td>{e.postSender}</td>
                  <td>{e.postReceiver}</td>
                  <td>{e.content}</td>
                  <td><Moment format='YY-MM-DD(ddd) HH:mm:ss'>{e.postTime}</Moment></td>
                </tr>
                // <tr>
                //   <td>Denim Shirts</td>
                //   <td>$110</td>
                //   <td>Due</td>
                //   <td><span className="Status inprogress">In Progress</span></td>
                // </tr>
                )}
              </tbody>
            </table>
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



      </div> {/* Main의 끝 */}
    </div>
  );
}
export default AdminPostbox;