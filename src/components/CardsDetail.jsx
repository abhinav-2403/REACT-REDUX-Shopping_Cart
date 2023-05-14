import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DLT } from "../redux/actions/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD } from "../redux/actions/action";
import { REMOVE } from "../redux/actions/action";

const CardsDetail = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();

  const history = useNavigate();

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);


  const dispatch = useDispatch();

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });

    setData(comparedata);
  };

  const send = (e)=>{
    // console.log(e);
    dispatch(ADD(e));
  }

  const dlt = (id) =>{

    dispatch(DLT(id));

    history("/")

  }

const remove = (item) =>{

  dispatch(REMOVE(item));

}


  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="conatainer mt-2">
        <h2 className="text-center">Items Details Page</h2>

        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img
                      src={ele.imgdata}
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong> : {ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : ₹ {ele.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {ele.address}
                          </p>
                          <p>
                            <strong>Total</strong> : ₹ {ele.price * ele.qnty}
                          </p>
                          <div className="mt-5  d-flex justify-content-between align-items-center" style={{width:100,cursor:"pointer",background:'#ddd',color:'#111'}}>
                             <span style={{fontSize:24, padding:8}} onClick={ele.qnty <= 1 ? () => dlt(ele.id) :  ()=>remove(ele)} >-</span>
                             <span style={{fontSize:22}}>{ele.qnty}</span>
                             <span style={{fontSize:24, padding:8}} onClick={()=>send(ele)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating :</strong>{" "}
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating} ★{" "}
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>{" "}
                            <span>{ele.somedata} </span>
                          </p>
                          <p>
                            <strong>Remove :</strong>{" "}
                            <span>
                              <i
                                className="fas fa-trash"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                                onClick={()=>dlt(ele.id)}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetail;
