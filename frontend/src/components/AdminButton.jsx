function AdminButton({name,type,onClick}) {
   
    return (
        <span className="btn pull-right"> 
        <button className={`btn btn-${type} pull-right`} onClick={onClick} name={name}>{name}</button>
        </span>
    );

  }
  export default AdminButton;
  