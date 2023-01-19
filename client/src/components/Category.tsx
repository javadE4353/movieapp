//module external
import { useRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import { BsX } from "react-icons/bs";

//
import { showAlert } from "../atoms/modalAtom";
import Card from "../subcomponents/Card";
import { useAppSelector, useAppDispatch } from "../app/hooks";

//type
import { Movies, StateTypeAuth } from "../typeing";
import axios from "axios";
import { useEffect, useState } from "react";

//interface
interface Props {
  movie: Movies[] | null;
  gener: number;
}

function Category({ movie, gener }: Props) {
  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const [fatch, setfatch] = useState([]);

  //accessToken
  const accesstoken = useAppSelector((state: StateTypeAuth) => state?.auth);
  useEffect(()=>{


    const re=async()=>{
      try{
        const {data}=await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US&with_genres=99');
        console.log(data)
        setfatch(data?.results)
      }catch(error){
        console.log(error)
  
      }
    }
    re()
  },[])
  return (
    <>
      <div
        className={`fixed top-0 z-[999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
          showalret ? "block" : "hidden"
        }`}
      >
        <strong className="font-bold">اشتراک!</strong>
        <span className="block sm:inline">
          برای تماشای فیلم ها باید اشتراک داشته باشید یا در سایت ثبت نام کنید
        </span>
        <span
          className="absolute top-0 bottom-0 left-0 px-4 py-3"
          onClick={() => setShowAlert(false)}
        >
          <BsX size={20} />
        </span>
      </div>

      <div className="flex flex-wrap justify-center	items-center">
        <>
          {movie ? (
            <>
              {fatch?.map((item:any) => (
                <div className="flex flex-wrap">
                  <img src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}/>
                  <span>{item.title}</span>
                  {/* {gener === 0 ? (
                    <>
                      <Card key={item.id} movie={item} />
                    </>
                  ) : (
                    <>
                      movie?.genre_ids.includes(gener) &&{" "}
                      <Card key={item.id} movie={item} />
                    </>
                  )} */}
                </div>
              ))}
            </>
          ) : (
            <div className="w-[21rem] max-w-[100%] bg-black rounded-xl p-3 text-white m-5 flex flex-col  cursor-pointer text-xl hover:scale-110 h-36 justify-center item-center">
              <div className="h-[100%]">
                <h4>فیلم وجود ندارد</h4>
              </div>
            </div>
          )}
        </>
      </div>
      {accesstoken?.accessToken && <Outlet />}
    </>
  );
}

export default Category;
