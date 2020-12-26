import React from'react';

export default ({input, label, meta: {error, touched}}) => {
    
    return (
      <div>
         <label>{label}</label>
         <input {...input}/>
         <div className="red-text" style={{marginBottom:'0.5rem'}}>
             {touched && error}
         </div>
      </div>  
    );
}