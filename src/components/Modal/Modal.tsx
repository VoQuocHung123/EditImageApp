import Button from "../Button/Button";

interface ModalProps {
    title : string,
    onCancel: ()=> void,
    onAccept: ()=> void,
    onOpen : boolean,
}

function Modal({title, onCancel ,onAccept,onOpen}:ModalProps) {
  return (
    <>
      <div className= {`${onOpen ? 'block' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 bg-black z-50 bg-opacity-[0.5] flex justify-center items-center `}>
        <div className=" w-[300px] lg:w-[40%] lg:h-[35%] bg-white rounded-md p-5 animate-dropDown">
          <div className="flex justify-center my-3">
            <i className="bx bx-error-circle text-red-500 text-[50px]"></i>
          </div>
          <h3 className="text-center">
            {title}
          </h3>
          <div className="flex justify-center gap-4 items-center my-5">
            <Button
              title="No, Cancel"
              styleBtn="bg-red-500 text-white text-xs text-red-500 w-full md:w-[130px] py-3 rounded-md"
              onClick={onCancel}
              isSlected={false}
            />
            <Button
              title="Yes, I'm sure"
              styleBtn="bg-blue-500 text-white text-xs text-red-500 w-full md:w-[130px] py-3 rounded-md"
              onClick={onAccept}
              isSlected={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
