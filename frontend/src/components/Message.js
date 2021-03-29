import React from 'react'

const Message = ({ variant, children }) => {
    return (
        <div className="message m-1">
            {
                variant === 'danger' ? (<div className="alert alert-danger"> { children} </div>) :
                    variant === 'success' ? (<div className="alert alert-success">{children}</div>) :
                        (<div className="alert alert-info">{children}</div>)
            }
        </div>
    )
}

export default Message;
