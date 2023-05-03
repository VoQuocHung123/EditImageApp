interface ButtonProps {
  styleBtn: string,
  title: any,
  isSlected : boolean,
  onClick: (e:any)=> void,
}

function Button({styleBtn, onClick, title ,isSlected} : ButtonProps) {

  return (
    <>
    <button className={styleBtn + `${isSlected ? ' bg-blue-500 text-white': ''}`} onClick={onClick}>{title}</button>
    </>
  )
}

export default Button