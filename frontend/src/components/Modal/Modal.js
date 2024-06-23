import "./Modal.scss";

const Modal = (props) => {
  const findByKey = (name) => {
    return props.children.find((child) => child.key === name);
  };

  const clickHandler = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("modal-close")) {
      props.onClick();
    }
  };
  return (
    <div className="modal-mask modal-close" onClick={clickHandler}>
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-header">{findByKey("header")}</div>
          <div className="modal-body">{findByKey("body")}</div>
          <div className="modal-footer">
            <button className="modal-close" onClick={clickHandler}>
              Close
            </button>
            {findByKey("footer")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
