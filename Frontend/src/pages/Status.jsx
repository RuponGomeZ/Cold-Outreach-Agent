import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';


const Status = () => {
    const [mailData, setMailData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${import.meta.env.VITE_baseURL}/get-status`);
            const data = await res.json();
            setMailData(data)
        };
        fetchData();
    }, []);

    return (
        <div className='mt-10 w-11/12 mx-auto'>

            <h2 className='font-bold text-center font-mono text-3xl mb-5'>
                <Typewriter
                    words={['Emails sent yet']}
                    loop={5}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </h2>
            <div className='  flex justify-center'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Reply Status</th>
                                <th>Generated Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {mailData.map((mail, i) => (
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{mail?.name}</td>
                                    <td>{mail?.to}</td>
                                    <td className={`${mail?.replied ? "text-green-600" : " text-red-500"}`}>{mail?.replied ? "Replied" : "Not replied"}</td>
                                    <td>{mail?.output.slice(0, 90)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Status;