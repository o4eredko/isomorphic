import React from "react";


const ParamsEditor = (props) => {

};


const ParamsDrawer = (props) => {
  
};


const Params = (props) => {
  const { params, readOnly = true } = props;

  return (
    <>
      {
        Object.keys(params).map((paramKey) => {
          return <p>{`${paramKey}: ${params[paramKey]}`}</p>;
        })
      }
    </>
  );
};


export default Params;