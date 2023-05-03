import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { BeatLoader } from "react-spinners";

function HomePage() {
 
  const [activeBtnFilter, setActiveBtnFilter] = useState(0);
  const [filterSelected, setFilterSelected] = useState("Brightness");
  const [previewImage, setPreviewImage] = useState("");
  const [disableControlEdit, setDisableControlEdit] = useState(false);
  const [valueSlider, setValueSlider]: any = useState(100);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [openResetFilter, setOpenResetFilter] = useState(false);
  const [optionApplyFilter, setOptionApplyFilter]: any = useState({
    Brightness: 100,
    Saturation: 100,
    Inversion: 0,
    Grayscale: 0,
  });
  const [optionRotate, setOptionRotate] = useState({
    rotate: 0,
    flipVertical: 1,
    flipHorizontal: 1,
  });
  const handleClickFilters = (index: number, item: any) => {
    setActiveBtnFilter(index);
    setFilterSelected(item);
    ["Brightness", "Saturation", "Inversion", "Grayscale"].forEach(
      (itemArr) => {
        if (item === itemArr) {
          setValueSlider(optionApplyFilter[item]);
        }
      }
    );
  };
  const handleClickRotate = (index: number) => {
    if (index === 0) {
      setOptionRotate({
        ...optionRotate,
        rotate: (optionRotate.rotate += -90),
      });
    } else if (index === 1) {
      setOptionRotate({ ...optionRotate, rotate: (optionRotate.rotate += 90) });
    } else if (index === 2) {
      setOptionRotate({
        ...optionRotate,
        flipHorizontal: optionRotate.flipHorizontal === 1 ? -1 : 1,
      });
    } else {
      setOptionRotate({
        ...optionRotate,
        flipVertical: optionRotate.flipVertical === 1 ? -1 : 1,
      });
    }
    setOpenResetFilter(true)
  };
  const handleClickResetFilters = () => {
    setOptionApplyFilter({
      Brightness: 100,
      Saturation: 100,
      Inversion: 0,
      Grayscale: 0,
    });
    setOptionRotate({ rotate: 0, flipVertical: 1, flipHorizontal: 1 });
    setFilterSelected("Brightness");
    setActiveBtnFilter(0);
    setValueSlider(100);
    setOpenModal(false);
    setOpenResetFilter(false)
  };
  const handleChooseImage = () => {
    const inputChooseImage = document.querySelector(
      ".inputChooseImage"
    ) as HTMLElement;
    inputChooseImage.click();
    setOptionApplyFilter({
      Brightness: 100,
      Saturation: 100,
      Inversion: 0,
      Grayscale: 0,
    });
    setOptionRotate({ rotate: 0, flipVertical: 1, flipHorizontal: 1 });
    setFilterSelected("Brightness");
    setActiveBtnFilter(0);
    setValueSlider(100);
  };
  const handleChangeDataSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSlider(e.target.value);
    const newValueSlider = {
      ...optionApplyFilter,
      [filterSelected]: e.target.value,
    };
    setOptionApplyFilter(newValueSlider);
    setOpenResetFilter(true)
  };
  const handleClickSaveImage = () => {
    const canvas = document.createElement("canvas");
    const previewImage: any = document.querySelector(".preview-img");
    const ctx: any = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    ctx.filter = `brightness(${optionApplyFilter.Brightness}%) saturate(${optionApplyFilter.Saturation}%) invert(${optionApplyFilter.Inversion}%) grayscale(${optionApplyFilter.Grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(optionRotate.flipHorizontal, optionRotate.flipVertical);
    if (optionRotate.rotate !== 0) {
      ctx.rotate((optionRotate.rotate * Math.PI) / 180);
    }
    ctx.drawImage(
      previewImage,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };


  useEffect(() => {
    if (!previewImage) {
      setDisableControlEdit(true);
    } else {
      setDisableControlEdit(false);
    }
  }, [previewImage]);
  return (
    <div className="bg-blue-100 w-full min-h-[100vh] max-w-screen-2xl flex justify-center items-center ">
      <section className=" w-[95%] lg:w-[65%] bg-white rounded-md shadow-lg shadow-indigo-500/40 p-5 my-2 ">
        <h3 className="text-sm font-semibold ">EZ Image Editor</h3>
        <div className="flex flex-col-reverse lg:flex-row gap-3 w-[100%] my-3">
          <div
            className={` ${
              disableControlEdit ? "opacity-[0.4] pointer-events-none" : ""
            } editor-panel h-[300px] lg:w-[300px] lg:h-[300px] border border-gray-300 rounded-md py-3 px-5`}
          >
            <div>
              <label htmlFor="" className="text-sm font-normal">
                Filters
              </label>
              <div className="flex flex-wrap gap-2 mt-2 justify-center ">
                {["Brightness", "Saturation", "Inversion", "Grayscale"].map(
                  (item, index) => {
                    return (
                      <Button
                        title={item}
                        styleBtn="ct-hover-btn border border-gray-300 text-xs text-gray-500 w-[45%] lg:w-[125px] py-2 rounded-sm"
                        onClick={(e) => handleClickFilters(e, index)}
                        isSlected={activeBtnFilter === index ? true : false}
                        key={index}
                      />
                    );
                  }
                )}
              </div>
              <div className="mt-4">
                <div className="slider-info flex justify-between items-center">
                  <label htmlFor="" className="text-xs text-gray-700">
                    {filterSelected}
                  </label>
                  <span className="text-xs text-gray-700">{valueSlider}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  className="h-[5px] w-full"
                  onChange={handleChangeDataSlider}
                  value={valueSlider}
                />
              </div>
            </div>
            <div className="mt-2">
              <label htmlFor="" className="text-sm font-normal">
                Rotate & Flip
              </label>
              <div className="flex gap-1 mt-2 justify-center items-center">
                {[
                  <i className="bx bx-rotate-left"></i>,
                  <i className="bx bx-rotate-right"></i>,
                  <i className="bx bx-reflect-vertical"></i>,
                  <i className="bx bx-reflect-horizontal "></i>,
                ].map((item, index) => {
                  return (
                    <Button
                      title={item}
                      styleBtn="ct-hover-btn border border-gray-300 text-xs text-gray-500 w-[150px] text-lg lg:w-[100px] lg:text-sm py-2 rounded-sm"
                      onClick={(e) => handleClickRotate(e)}
                      isSlected={false}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h-[300px] lg:w-[65%] lg:h-[300px] flex justify-center items-center border border-gray-300 rounded-md overflow-hidden">
            {loading ? (
              <BeatLoader color="#3B82F6" loading={loading} />
            ) : messageError ? (
              <>
                {" "}
                <i className="bx bxs-error text-lg text-red-500 mx-2"></i>{" "}
                <p className="text-sm"> {messageError}</p>{" "}
              </>
            ) : (
              <img
                src={previewImage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt=""
                className="preview-img w-full h-full object-contain"
                style={{
                  filter: `brightness(${optionApplyFilter.Brightness}%) saturate(${optionApplyFilter.Saturation}%) invert(${optionApplyFilter.Inversion}%) grayscale(${optionApplyFilter.Grayscale}%)`,
                  transform: `rotate(${optionRotate.rotate}deg) scale(${optionRotate.flipHorizontal},${optionRotate.flipVertical})`,
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Button
            title="Reset Filters"
            styleBtn={`${
              openResetFilter ? ""  : "opacity-[0.4] pointer-events-none"
            } border border-red-500 hover:bg-red-500 hover:text-white text-xs text-red-500 w-full md:w-[130px] py-3 rounded-sm transition ease-in-out delay-100`}
            onClick={() => setOpenModal(true)}
            isSlected={false}
          />
          <div className="w-full md:w-[270px]">
            <input
              type="file"
              name=""
              id=""
              className="inputChooseImage hidden"
              onChange={(e: any) => {
                const image = e.target.files[0];
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
                if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                  setMessageError("Please choose a valid image");
                  setDisableControlEdit(true);
                  return;
                }
                setMessageError("");
                setPreviewImage(URL.createObjectURL(image));
                setDisableControlEdit(false);
              }}
            />
            <Button
              title="Choose Image"
              styleBtn="border mr-2 border-gray-500 bg-gray-500 text-xs text-white w-full md:w-[130px] py-3 rounded-sm my-2 "
              onClick={handleChooseImage}
              isSlected={false}
            />
            <Button
              title="Save Image"
              styleBtn={`  ${
                disableControlEdit ? "opacity-[0.4] pointer-events-none" : ""
              } border border-blue-500 bg-blue-500  text-xs text-white w-full md:w-[130px] py-3 rounded-sm `}
              onClick={handleClickSaveImage}
              isSlected={false}
            />
          </div>
        </div>
      </section>
      <Modal
        onOpen={openModal}
        title=" Are you sure you want to reset everything?"
        onCancel={() => {
          setOpenModal(false);
        }}
        onAccept={() => {
          handleClickResetFilters();
        }}
      />
    </div>
  );
}

export default HomePage;
