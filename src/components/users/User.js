import React from 'react';

// function User(props) {
function User({ data, remove }) {
    const handleRemove = () => {
        remove(data.uuid);
    }
    return (
        <div className='card mb-2'>
            <div className='row'>
                <div className='col-2'>
                    <img src={data.image} alt='' width={80} height={80} />
                </div>
                <div className='col-5 mt-3'>
                    <strong>Phone: {data.phone}</strong><br></br>
                    <strong>Cell: {data.cell}</strong>
                </div >
                <div className='col-3 mt-4'>
                    <h5>{data.name}</h5>
                </div>
                <div className='col-2'>
                    <button className='btn btn-danger btn-sm mt-4' onClick={handleRemove}><i className='fa fa-trash'></i></button>
                </div>
            </div>
        </div>
    );
}

export default User;