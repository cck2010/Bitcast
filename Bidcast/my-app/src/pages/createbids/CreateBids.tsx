import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { RootState, RootThunkDispatch } from "../../store"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateBids.scss"
import { fetchCategories } from "../../redux/products/actions";
import { push } from "connected-react-router";
import { DatePickerIcon } from "./components/Fontawsome";
import { AnySet } from "immer/dist/internal";
import { v4 } from "uuid";
// import axios from "axios";
// import moment from "moment";

interface liveInput {
  liveTitle: string,
  liveImage: string,
  startDate: Date,
  description?: string | undefined,
}
interface productInput {
  name: string,
  productImage: string,
  minimumBid: string,
  eachBidAmount: string,
  buyPrice: string,
  categoryId: string,
  description?: string | undefined,
}


type Inputs = {
  liveInput: liveInput,
  productInput: productInput[]

};

  //fontAwesome component



export function CreateBids() {
  //config
  const dispatch = useDispatch();

  // get current
  const user = useSelector((state: RootState) => state.authState.user);
  console.log("user", user);
  const userInfo = JSON.parse(JSON.stringify(user));
  // console.log("userInfo", userInfo);

  //get category
  const categories = useSelector((state: RootState) => Object.values(state.products.categories))
  const { register,watch, handleSubmit, control } = useForm<Inputs>();
  useEffect(() => {
    // fetch ser 拎 categories data
    dispatch(fetchCategories());
  }, [dispatch])




  // onsubmit
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const live = data.liveInput
    // console.log("liveData", live);


    // ** live Inputs FormData Field **
    // ** live Inputs FormData Field **
    // FormData Append
    let liveFormData = new FormData();
    // let sellerLink = v4().substring(0,13);
    // let buyerLink = v4().substring(0,13);

    liveFormData.append('liveTitle', data.liveInput.liveTitle)
    console.log("data.liveInput.liveTitle", data.liveInput.liveTitle);
    liveFormData.append('liveImage', data.liveInput.liveImage[0])
    if (data.liveInput.description) {
      liveFormData.append('description', data.liveInput.description)

    }
    if (data.liveInput.startDate) {
      liveFormData.append('startDate', data.liveInput.startDate.toString())
    }
    if (userInfo!=null){
      liveFormData.append('userId', userInfo.id);
    }
  
    // liveFormData.append('sellerLink',sellerLink)
    // liveFormData.append('buyerLink', buyerLink)

    // console.log("data.liveInput.description", data.liveInput.description);
    // console.log("data.liveInput.startDate", data.liveInput.startDate);
    // console.log("liveInput.liveImage[0]", data.liveInput.liveImage[0]);

    //fetch live Input liveFormData 
    const liveRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createBids/submitBid/submitLive`, {
      method: "POST",
      body: liveFormData,
    })
    const liveJson = await liveRes.json();
    // console.log("liveJson.data.res", liveJson.data.res[0]);
    const liveId = liveJson.data.res[0].id;

    // ** live Inputs FormData Field **
    // ** live Inputs FormData Field **

    //! **************************************************

    // ** Products Inputs FormData Field **
    // ** Products Inputs FormData Field **

    const products = data.productInput
    // console.log("productData", products);

    for (let [index,product] of products.entries() as any) {
    // for (let product of products) {
      // console.log("product", product);
      let productFormData = new FormData();
      productFormData.append('name', product.name);
      productFormData.append('productImage', product.productImage[0]);
      productFormData.append('minimumBid', product.minimumBid);
      productFormData.append('eachBidAmount', product.eachBidAmount);
      productFormData.append('buyPrice', product.buyPrice);
      productFormData.append('categoryId', product.categoryId);
      if (product.description) {
        productFormData.append('description', product.description);
      }
      productFormData.append('liveId', liveId)
      productFormData.append('productIndex',index)
      if (userInfo!=null){
        productFormData.append('username', userInfo.username);
        productFormData.append('userId', userInfo.id);
      }

      const proRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createBids/submitBid/submitProduct`, {
        method: "POST",
        body: productFormData,
      })
      const proJson = await proRes.json();
      console.log("proJson.data.res", proJson.data.res);

    }
    // ** Products Inputs FormData Field **
    // ** Products Inputs FormData Field **


    // dispatch to reducer
    dispatch(push("/"))


    // ajax/fetch here
  }



  const { fields, append, remove } = useFieldArray({
    control,
    name: "productInput"
  });


  // live streaming photo shown setup
  const [selectedImage, setSelectedImage] = useState<any>();
  const imageChange = (e:any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // DatePicker filter
  const filterPassedTime = (time:any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  // DatePicker className switch 
  let handleColor = (time: any) => {
    return time.getHours() > 12 ? "" : "text-error";
  };

  // products index
  const [proNum,setProNum]=useState<number>(1)
  const accProNum = () =>{
    // console.log("test");
    append({})
    setProNum(proNum+1)
  }


  return (
    
    <div className={"create_bids_container form_shown"}>
      <div className={"outline"}>
      <div className={"header_border"}></div>
      {/* <header className={"test_user"}>For Dev ref Username:{userInfo.username}</header> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>拍賣登記</h1>
        <div className={'input_box'}><label>直播標題:</label> <input className={"input_default"} {...register('liveInput.liveTitle')} required/></div>
        <div className={'input_box'}><label>直播圖片:</label> <div className={"files"}><input  type="file" {...register('liveInput.liveImage')} onChange={imageChange} required/></div></div>
        {/* {selectedImage && <img className={"resize_upload_photo photo_shown"} src={URL.createObjectURL(selectedImage)} />} */}
        {selectedImage && 
              <div className={"img_container"}>
                <img className={"resize_upload_photo photo_shown"} src={URL.createObjectURL(selectedImage as any)} />
                <div className={"file_Info_container"}>
                  <div>{selectedImage.name as any}</div>
                  <div>{selectedImage.type as any}</div>
                  <div>{`${(((selectedImage.size as any)/1000000).toString().match(/^\d+(?:\.\d{0,2})?/))+" MB"}`}</div>
                </div>
              </div>
              }
        <div className={'input_box'}><label>開始時間:</label>
          <Controller
            control={control}
            name="liveInput.startDate"
            render={({ field }) => (
              <div>
              <DatePicker
                className={"Datepicker"}
                onChange={(e) => field.onChange(e) }
                selected={field.value}
                showTimeSelect
                // timeClassName={handleColor}
                placeholderText="選擇時間"
                dateFormat="MM/dd/yyyy hh:mm a"
                filterTime={filterPassedTime}
                required
                // customInput={<DatePickerIcon />}
                />
                {/* <DatePickerIcon /> */}
                
                </div>
                )}
          />
          
          {/* <DatePickerIcon /> */}
        </div>
        <div className={'input_box'}><label>直播簡介:</label> <textarea className={"input_textarea"}   {...register('liveInput.description')} /></div>

        {/* <h1>拍賣物品</h1> */}
        {/*  Append Dynamic Form */}
        <button className={"button_default"} type="button" onClick={accProNum}>
          + 增加拍賣品
        </button >
        {/*  Dynamic Form */}
        {fields.map(({ id, name }, index) => {

          // const watchAllFields = watch();
      
          let productsPicture:any = watch(`productInput.${index}.productImage`)
          return (
            <div className="item_input_container form_shown" key={id}  >
              <div className={"products_index"}>商品 {index+1}</div>
              
              <p className={'input_box'}><label>物品名稱:</label>
                <input className={"input_default"}
                  {...register(`productInput.${index}.name`)}
                  defaultValue={name}
                  required/></p>

              <div className={'input_box'}><label>物品圖片:</label>
                <div className={"files"}>
                <input 
                  type="file"
                  {...register(`productInput.${index}.productImage`)}
                  required />
                  </div>
              </div>

              {productsPicture?.[0] != null && 
              <div className={"img_container"}>
                {console.log(productsPicture[0])}
                <img className={"resize_upload_photo photo_shown"} src={URL.createObjectURL(productsPicture[0] as any)} />
                <div className={"file_Info_container"}>
                  <div>{productsPicture[0].name as any}</div>
                  <div>{productsPicture[0].type as any}</div>
                  <div>{`${(((productsPicture[0].size as any)/1000000).toString().match(/^\d+(?:\.\d{0,2})?/))+" MB"}`}</div>
                </div>
              </div>
              }
              
              <p className={'input_box'}><label>底價:</label>
                <input className={"input_default"} type="number"
                  {...register(`productInput.${index}.minimumBid`)}
                  required/></p>

              <p className={'input_box'}><label>每口價:</label>
                <input className={"input_default"} type="number"
                  {...register(`productInput.${index}.eachBidAmount`)}
                  required/></p>

              <p className={'input_box'}><label>即買價:</label>
                <input className={"input_default"} type="number"
                  {...register(`productInput.${index}.buyPrice`)}
                  required/></p>
                  
              <p className={'input_box'}><label>分類:</label> <select className={"category_container"} {...register(`productInput.${index}.categoryId`)} >
                {categories.map(category => (
                  <option key={category.id}
                    value={category.id}
                  >{category.category}</option>
                ))}
              </select></p>
              <p className={'input_box'}><label>拍賣品簡介:</label>
                <textarea className={"input_textarea"}
                  {...register(`productInput.${index}.description`)}
                /></p>
                
            </div>
          )
          
          
        })}
        
        

        <input className={"button_default"} type="submit" />
      </form>
      </div>
    </div>
  )
}