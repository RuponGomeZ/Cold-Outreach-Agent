import React, { useState } from 'react';

const InputForm = () => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const company = form.company.value
        const role = form.role.value
        console.log(name, email, company, role);

        setLoading(false)
    }
    return (
        <div className='min-h-screen flex items-center  container mx-auto w-fit'>
            <form onSubmit={(e) => handleSubmit(e)} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend font-mono text-2xl">Cold Outreach Agent</legend>

                <label className="label">Name</label>
                <input name='name' type="text" className="input" placeholder="Enter Recipient Name" />

                <label className="label">Email</label>
                <input name='email' type="email" className="input" placeholder="Enter Recipient Email" />

                <label className="label">Company</label>
                <input name='company' type="text" className="input" placeholder="Enter Recipient Company" />

                <label className="label">Role</label>
                <input name='role' type="text" className="input" placeholder="Enter Recipient Role" />

                <label className="label">Pain Points</label>
                <input name='painPoint' type="text" className="input" placeholder="Enter Pain Points" />

                <label className="label">Outreach Goal</label>
                <input name='outreachGoal' type="text" className="input" placeholder="Enter Outreach Goal" />

                <button type='submit' className="btn btn-neutral mt-4">{loading ? "loading" : "Start Agent"}</button>
            </form>
        </div>
    );
};

export default InputForm;