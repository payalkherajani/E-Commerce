import React from 'react'

const Message = ({ variant, children }) => {
    return (
        <>
            {
                variant === 'danger' ? (<div class="alert alert-danger"> { children} </div>) :
                    variant === 'success' ? (<div class="alert alert-success">{children}</div>) :
                        (<div class="alert alert-info">{children}</div>)
            }
        </>
    )
}

export default Message;
