import React, { useState } from 'react';
import toast from 'react-hot-toast';

const InputForm = () => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const company = form.company.value
        const role = form.role.value
        const painPoint = form.painPoint.value
        const outreachGoal = form.outreachGoal.value
        const data = {
            name: name,
            email: email,
            company: company,
            role: role,
            painPoint: painPoint,
            outreachGoal: outreachGoal,

        }
        if (!data || !data.name || !data.email || !data.company || !data.role || !data.painPoint || !data.outreachGoal) {
            setLoading(false)
            toast.error("Input fields can not be empty")
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_baseURL}/store-data`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            setLoading(false)
          if (res.status === 201) {
                form.reset()
                toast.success("Data stored successfully")
            }
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }


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
                <textarea
                    name='painPoint'
                    className="textarea w-full"
                    placeholder="e.g. struggling with lead generation, high churn rate"
                    rows={3}
                />

                <label className="label">Outreach Goal</label>
                <select name='outreachGoal' className="select w-full">
                    <option disabled={true} selected>Select Goal</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sales">Sales</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Networking">Networking</option>
                </select>

                <button disabled={loading} type='submit' className="btn btn-neutral mt-4">{loading ? "The agent is working" : "Start Agent"}</button>
            </form>
        </div>
    );
};

export default InputForm;
