import React from 'react'
const Modal = () => {
    return (
        <div>

            <div className="container mt-3">
                <h3>Large Modal Example</h3>
                <p>Click on the button to open the modal.</p>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                    Open modal
                </button>
            </div>

            <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Modal Heading</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            Modal body..
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal