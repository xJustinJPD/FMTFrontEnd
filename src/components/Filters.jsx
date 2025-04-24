import { useState } from "react";

    const FiltersDropdown = ({ onChange }) => {
        const [filters, setFilters] = useState({});

        const handleChange = (e) => {
            const { name, value } = e.target;

            // Check if filter exists
            const updatedFilters = { ...filters };
            if (value === "") {
            delete updatedFilters[name];
            } else {
            updatedFilters[name] = value;
            }

            setFilters(updatedFilters);
            onChange(updatedFilters);
        };

        return (
            <div className="p-4 bg-white rounded shadow mb-6 w-full max-w-xl">
            <h2 className="text-lg font-semibold mb-4">Set Filters: {JSON.stringify(filters)}</h2>
            <div className="flex flex-col gap-4">
                <select name="role" onChange={handleChange} className="p-2 border rounded">
                <option value="">Select Role</option>
                <option value="Controller">Controller</option>
                <option value="Duelist">Duelist</option>
                <option value="Initiator">Initiator</option>
                <option value="Sentinel">Sentinel</option>
                </select>

                <select name="role" onChange={handleChange} className="p-2 border rounded">
                <option value="">Select Rank</option>
                <option value="IRON">Iron</option>
                <option value="BRONZE">Bronze</option>
                <option value="SILVER">Silver</option>
                <option value="GOLD">Gold</option>
                <option value="PLATINUM">Platinum</option>
                <option value="EMERALD">Emerald</option>
                <option value="DIAMOND">Diamond</option>
                <option value="MASTER">Master</option>
                <option value="GRANDMASTER">Grandmaster</option>
                <option value="CHALLENGER">Challenger</option>
                </select>
            </div>
            </div>
        );
    };

export default FiltersDropdown;