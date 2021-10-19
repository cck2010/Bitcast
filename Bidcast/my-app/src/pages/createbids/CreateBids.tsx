import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm, Controller,useFieldArray, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { RootState, RootThunkDispatch } from "../../store"
import DatePicker from "react-datepicker";
import {v4} from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateBids.scss"
import { fetchCategories } from "../../redux/products/actions";
import axios from "axios";
// import moment from "moment";

interface liveInput {
  liveTitle: string,
  liveImage: string,
  liveIntro?: string,
  startDate: Date,
}
interface productInput {
  name: string,
  image: string,
  minimumBid: string,
  eachBidAmount: string,
  buyPrice: string,
  categoryId: number,
}


type Inputs = {
  liveInput: liveInput,
  productInput: productInput[]

};



export function CreateBids() {
  // const [productsList, setProductsList] = useState<any>([]);
  const categories = useSelector((state: RootState) => Object.values(state.products.categories))
  // const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit,control} = useForm<Inputs>();


  const dispatch = useDispatch();

  useEffect(() => {
    // fetch ser 拎 categories data
    dispatch(fetchCategories());
  },[dispatch])


  //
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const liveData = data.liveInput
    console.log("liveData", liveData);
    const productData = data.productInput
    console.log("productData", productData);
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createBids/submitBid`,data)
    
    // ajax/fetch here
  }
  
  let handleColor = (time:any) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productInput"
    });


  return (
    <div className={"create_bids_container"}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>直播設置</h1>
        <div className={'input_box'}><label>直播標題: <input className={"input_default"}  {...register('liveInput.liveTitle')} /></label></div>
        <div className={'input_box'}><label>直播圖片: <input className={"input_default"} type="file" {...register('liveInput.liveImage')} /></label></div>
        {/* <div ><label>開始時間: <DatePicker className={"input_default"} {...register('liveInput.startDate')} showTimeSelect timeClassName={handleColor} selected={startDate} onChange={(date:any) => setStartDate(date)} dateFormat="MM/dd/yyyy hh:mm a" /></label></div> */}
        <div><label>開始時間:  
        <Controller
            control={control}
            name="liveInput.startDate"
            render={({field}) => (
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
        <div className={'input_box'}><label>直播簡介: <textarea className={"input_textarea"}   {...register('liveInput.liveIntro')} /></label></div>

        <h1>拍賣物品</h1>
        <button className={"button_default"} type="button" onClick={() => append({})}>
        + 增加拍賣品
      </button>
        {fields.map(({ id, name }, index) => { 
          return (
            <div className="item_input_container" key={id}>
              <p className={'input_box'}><label>物品名稱: 
                <input className={"input_default"}  
                  {...register(`productInput.${index}.name`) }
                  defaultValue={name}
                /></label></p>

              <p className={'input_box'}><label>物品圖片: 
                <input className={"input_default"} 
                  type="file" 
                  {...register(`productInput.${index}.image`)} 
                    /></label></p>
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
              </div>
        )})}

        <input className={"button_default"} type="submit" />
      </form>
    </div>
  )
}