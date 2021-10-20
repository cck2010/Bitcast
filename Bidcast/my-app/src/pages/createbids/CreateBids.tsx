import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { RootState, RootThunkDispatch } from "../../store"
import DatePicker from "react-datepicker";
import { v4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateBids.scss"
import { fetchCategories } from "../../redux/products/actions";
import axios from "axios";
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



export function CreateBids() {
  // const [productsList, setProductsList] = useState<any>([]);
  const categories = useSelector((state: RootState) => Object.values(state.products.categories))
  // const [startDate, setStartDate] = useState(new Date());
  const { register,watch, handleSubmit, control } = useForm<Inputs>();
  


  const dispatch = useDispatch();

  useEffect(() => {
    // fetch ser 拎 categories data
    dispatch(fetchCategories());
  }, [dispatch])


  //
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const live = data.liveInput
    // console.log("liveData", live);


    // ** live Inputs FormData Field **
    // ** live Inputs FormData Field **
    // FormData Append
    let liveFormData = new FormData();
    liveFormData.append('liveTitle', data.liveInput.liveTitle)
    liveFormData.append('liveImage', data.liveInput.liveImage[0])
    if (data.liveInput.description) {
      liveFormData.append('description', data.liveInput.description)

    }
    if (data.liveInput.startDate) {
      liveFormData.append('startDate', data.liveInput.startDate.toString())
    }

    console.log("data.liveInput.description", data.liveInput.description);
    console.log("data.liveInput.startDate", data.liveInput.startDate);
    console.log("liveInput.liveImage[0]", data.liveInput.liveImage[0]);

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
      // console.log("productFormData >>>", productFormData);
      productFormData.append('liveId', liveId)
      productFormData.append('productIndex',index)
      console.log("productIndex", index);

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



    // ajax/fetch here
  }

  let handleColor = (time: any) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productInput"
  });
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e:any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };


  // const liveInputPicture = watch("liveInput.liveImage")
  return (
    <div className={"create_bids_container"}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>直播設置</h1>
        <div className={'input_box'}><label>直播標題: <input className={"input_default"}  {...register('liveInput.liveTitle')} /></label></div>
        <div className={'input_box'}><label>直播圖片: <input className={"input_default"} type="file" {...register('liveInput.liveImage')} onChange={imageChange} /></label></div>
        {selectedImage && <img className={"resize_upload_photo"} src={URL.createObjectURL(selectedImage)} />}

        <div><label>開始時間:
          <Controller
            control={control}
            name="liveInput.startDate"
            render={({ field }) => (
              <DatePicker
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                showTimeSelect
                timeClassName={handleColor}
                placeholderText="Select date"
                dateFormat="MM/dd/yyyy hh:mm a"
              />
            )}
          />
        </label></div>
        <div className={'input_box'}><label>直播簡介: <textarea className={"input_textarea"}   {...register('liveInput.description')} /></label></div>

        <h1>拍賣物品</h1>
        {/*  Append Dynamic Form */}
        <button className={"button_default"} type="button" onClick={() => append({})}>
          + 增加拍賣品
        </button>
        {/*  Dynamic Form */}
        {fields.map(({ id, name }, index) => {

          const productsPicture = watch(`productInput.${index}.productImage`)

          return (
            <div className="item_input_container" key={id}>
              <p className={'input_box'}><label>物品名稱:
                <input className={"input_default"}
                  {...register(`productInput.${index}.name`)}
                  defaultValue={name}
                /></label></p>
              <p className={'input_box'}><label>物品圖片:
                <input className={"input_default"}
                  type="file"
                  {...register(`productInput.${index}.productImage`)}
                />
              </label></p>
              {productsPicture != null && <img className={"resize_upload_photo"} src={URL.createObjectURL(productsPicture[0] as any)} />}
              
              <p className={'input_box'}><label>底價:
                <input className={"input_default"} type="number"
                  {...register(`productInput.${index}.minimumBid`)}
                /></label></p>
              <p className={'input_box'}><label>每口價:
                <input className={"input_default"} type="number"
                  {...register(`productInput.${index}.eachBidAmount`)}
                /></label></p>
              <p className={'input_box'}><label>即買價:
                <input className={"input_default"} type="number"
                  {...register(`productInput.${index}.buyPrice`)}
                /></label></p>
              <p className={'input_box'}><label>分類: <select {...register(`productInput.${index}.categoryId`)} >
                {categories.map(category => (
                  <option key={category.id}
                    value={category.id}
                  >{category.category}</option>
                ))}
              </select></label></p>
              <p className={'input_box'}><label>拍賣品簡介:
                <textarea className={"input_textarea"}
                  {...register(`productInput.${index}.description`)}
                /></label></p>
            </div>
          )
        })}

        <input className={"button_default"} type="submit" />
      </form>
    </div>
  )
}