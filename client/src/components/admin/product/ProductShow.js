import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../spinner";

import { setCurrentOrder, loadOrders } from "../../../actions/orders";
import { deleteProduct, setCurrentProduct } from "../../../actions/appActions";
import { Link, useHistory, useParams } from "react-router-dom";
import editIcon from '../../../assets/images/home/icons/edit.svg';
import trashIcon from '../../../assets/images/home/icons/trash.svg';
import { API } from "../../../constants/constants";
const ProductShow = ({ currentProduct, setCurrentProduct ,deleteProduct}) => {
  let params = useParams();
  let history = useHistory();
  useEffect(() => {
    setCurrentProduct(params.id);
  }, []);

  if (currentProduct == null) return <Loader />;
  const {
    name,
    dressColor,
    images,
    inStock,
    price,
    dressSize,
    dressType,
    _id,
  } = currentProduct;

  return (
    <div>
      {" "}
      <div
        className="w-100 d-flex 
              justify-content-between 
              align-items-center border-top 
              border-bottom py-1 mb-2"
      >
        <h3 className="mb-0 font-weight-bold text-info">Product</h3>
        <div className="d-flex justify-content-center">

        <Link to={`/admin/products/${_id}/edit`}>
          <span className='badge badge-info badge-pill shadow-sm p-2'>
            Edit <img src={editIcon} alt="" className='ml-1' style={{ height: '16px', width: '16px' }} />
          </span>
        </Link>

        <div to={`/admin/products/${_id}/edit`} style={{cursor: 'pointer'}} className='ml-1' onClick={async ()=>{
         let result =  await deleteProduct(_id);
         if (result) {
           history.push('/admin/products');
         }
        }}>
          <span className='badge badge-danger badge-pill shadow-sm p-2'>
            Delete <img src={trashIcon} alt="" className='ml-1' style={{ height: '16px', width: '16px' }} />
          </span>
        </div>
        </div>
      </div>
      <div
        className="d-flex list-group-item py-3 
justify-content-between  
shadow-sm  mb-2"
      // key={_id}
      >
        <div class="col-md-8 row-wrap mb-3">
          {/* <h3 class="d-flex flex-column ">
            <span>Product Details</span>
          </h3> */}

          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Name</div>
            <div class="col-md-7">{currentProduct.name}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Images</div>
            <div class="col-md-7"><div>
              {images.map((image, idx) => (
                <img
                  key={idx}
                  class="sm-category rounded-lg mr-2"
                  src={`${API}/uploads/${image}`}
                  alt={image}
                />
              ))}
            </div></div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Dress Size</div>
            <div class="col-md-7">{currentProduct.dressSize.map((s, i) => {
              let comma = i != currentProduct.dressSize.length - 1 ? ', ' : ''
              return (s + comma)
            })}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Body Type</div>
            <div class="col-md-7">{currentProduct.bodyType.map((s, i) => {
              let comma = i != currentProduct.dressSize.length - 1 ? ', ' : ''
              return (s + comma)
            })}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Color</div>
            <div class="col-md-7">
              <div className="row">
                {dressColor.map((clr, idx) => (
                  <div
                    key={idx}
                    className="mr-2  custom-rounded shadow-sm col-2"
                    style={{
                      backgroundColor: `${clr}`,
                      width: '10px !important'
                    }}
                  ></div>
                ))}
              </div>



            </div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Model Height And Size</div>
            <div class="col-md-7">{currentProduct.modelHeightSize}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Details</div>
            <div class="col-md-7">{currentProduct.details}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">WaistLine</div>
            <div class="col-md-7">{currentProduct.waistLine}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">NeckLine</div>
            <div class="col-md-7">{currentProduct.neckLine}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Length</div>
            <div class="col-md-7">{currentProduct.length}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Fabric</div>
            <div class="col-md-7">{currentProduct.fabric}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Closure</div>
            <div class="col-md-7">{currentProduct.closure}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Dress Type</div>
            <div class="col-md-7">{currentProduct.dressType}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Price</div>
            <div class="col-md-7">{currentProduct.price}</div>
          </div>
          <div class="row py-2 text-muted border-bottom">
            <div class="col-md-5">Rating</div>
            <div class="col-md-7">{currentProduct.rating}</div>
          </div>
        </div>
      </div>
      {/* <Products products={currentProduct.products} /> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentProduct: state.adminOrder.currentProduct,
});
export default connect(mapStateToProps, { setCurrentProduct ,deleteProduct})(
  ProductShow
);
