import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const ReadText = ({label, text}) => {
    return( 
        <div className="row mb-3">
            <label htmlFor="planName" className="form-label">{label}</label>
            <input 
                readOnly
                className="form-control" 
                value={text}
            />
        </div>
    )
};

const EditTask = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [info, setInfo] = React.useState();
    const [options, setOptions] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [plan, setPlan] = React.useState('');

    const backLink = `/dashboard/${params.app}`;
    React.useEffect(() => {
        const fetchingData  = () => {
            const link1 = `../../task/getAppTask/${params.id}`;
            const link2 = `../../task/getAppPlans/${params.app}`;
            //console.log(link1,'\n',link2)
            Promise.all([
                fetch(link1).then(response => response.json()),
                fetch(link2).then(response => response.json())
            ]).then(([data1, data2]) => {
                setInfo(data1);
                setOptions(data2);
            }).catch(e => {
                alert('Unable to fetch some data');
                console.log(e);
            });
        };
        fetchingData();
    },[]);

    return(
        <div className='container'>
            <div className="row mt-3">
            <div className="col"></div>
            <form className="col-4">
                {/* header */}
                <div className="row mb-2">
                    <h5 className='col'>Edit Task: {params.id}</h5>
                    <div className="col-auto">
                        <button className='btn btn-outline-primary mb-2 fw-bold' onClick={() => navigate(backLink)}>
                            &lt; back
                        </button>
                    </div>
                    <hr />
                </div> 
                {/* Task Description */}
                <div className="row mb-3">
                    <label htmlFor="planName" className="form-label">Task Description</label>
                    <input 
                        className="form-control" 
                        type="text" 
                    />
                </div>
                {/* Task Plan */}
                <div className="row mb-5">
                    <label htmlFor="planName" className="form-label">Task Plan</label>
                    <input 
                        className="form-control" 
                        type="text" 
                    />
                </div>
                <div className='row mb-3'>
                    <div><button type="submit" className='btn btn-primary float-end'>Update Task</button></div>
                </div>
                {/* Task Owner */}
                <div className="row mb-3">
                    <label htmlFor="planName" className="form-label">Task Owner</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={'etestetetsetset'}
                        disabled
                    />
                </div>
                {/* Task creator */}
                <div className="row mb-3">
                    <label htmlFor="planName" className="form-label">Task Creator</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        disabled
                    />
                </div>
                {/* Task created */}
                { }
                <ReadText label="Created Date" text={info.Task_owner} />
            </form>
            <div className="col"></div>
            </div>
        </div>
    )

};

export default EditTask;