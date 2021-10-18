import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import DatePicker from "react-datepicker";
import {v4} from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateBids.scss"

interface liveInput {
  liveTitle: string,
  liveImage: string,
  startDate: number,
  startTime: number,
}
interface productInput {
  name: string,
  image: string,
  minimumBid: string,
  eachBidAmount: string,
  buyPrice: string,
}


type Inputs = {
  liveInput: liveInput,
  productInput: productInput

};





function ProductsInfoInput(): any {
  const categories = useSelector((state: RootState) => Object.values(state.products.categories))
  const { register, handleSubmit} = useForm<Inputs>();

  // const [num, setNum] = useState();
  // function numFilter(e: any) {
  //   setNum(e.target.value);
  // }
  return (
    <div className="item_input_container" key={v4()}>
      <p><label>物品名稱: <input className={"input_default"} {...register("productInput.name")} /></label></p>
      <p><label>物品圖片: <input className={"input_default"} type="file" {...register('productInput.image')} /></label></p>
      <p><label>底價: <input className={"input_default"} type="number"{...register('productInput.minimumBid')} /></label></p>
      <p><label>每口價: <input className={"input_default"} type="number" {...register('productInput.eachBidAmount')} /></label></p>
      <p><label>即買價: <input className={"input_default"} type="number" {...register('productInput.buyPrice')} /></label></p>
      <p><label>分類: <select>
        {categories.map(category => (
          <option value={category.id} key={category.id}>{category.name}</option>
        ))}
      </select></label></p>
    </div>
  )
}


export function CreateBids() {
  const categories = useSelector((state: RootState) => Object.values(state.products.categories))
  const [startDate, setStartDate] = useState(new Date());
  // const [startTime, setStartTime] = useState<any>();
  const [productsList, setProductsList] = useState<any>([]);
  const { register, handleSubmit} = useForm<Inputs>();


  const dispatch = useDispatch();

  useEffect(() => {
    // fetch ser 拎 categories data
    // dispatch(fetchCategories());
  },[dispatch])



  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
    // ajax/fetch here
  }

  const onAddBtnClick = () => {
    setProductsList(productsList.concat(<ProductsInfoInput />))
  }

  
  let handleColor = (time:any) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (

    <div className={"create_bids_container"}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>直播設置</h1>
        <p><label>直播標題: <input className={"input_default"}  {...register('liveInput.liveTitle')} /></label></p>
        <p><label>直播圖片: <input className={"input_default"} type="file" {...register('liveInput.liveImage')} /></label></p>
        {/* <p><label>開始時間: <input {...register('liveInput.startTime')} /></label></p> */}
        <p><label>開始時間: <DatePicker className={"input_default"} {...register('liveInput.startDate')} showTimeSelect timeClassName={handleColor} selected={startDate} onChange={(date: Date) => setStartDate(date)} dateFormat="MM/dd/yyyy   hh:mm a" /></label></p>

        <h1>拍賣物品</h1>
        <div className={"button_default"} onClick={onAddBtnClick} > + 增加拍賣品</div>
        {productsList}

        <input className={"button_default"} type="submit" />
      </form>
    </div>
  )
}