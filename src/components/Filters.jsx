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
            <div className="flex flex-col gap-4">
                <select name="role" onChange={handleChange} className="p-2 border rounded">
                <option value="">Select Role</option>
                <option value="Controller">Controller</option>
                <option value="Duelist">Duelist</option>
                <option value="Initiator">Initiator</option>
                <option value="Sentinel">Sentinel</option>
                </select>

                <input
                type="number"
                name="min_kills"
                placeholder="Min Kills"
                onChange={handleChange}
                className="p-2 border rounded"
                />
                <input
                type="number"
                name="max_kills"
                placeholder="Max Kills"
                onChange={handleChange}
                className="p-2 border rounded"
                />
                <input
                type="number"
                name="min_level"
                placeholder="Min Level"
                onChange={handleChange}
                className="p-2 border rounded"
                />
                <input
                type="number"
                name="max_level"
                placeholder="Max Level"
                onChange={handleChange}
                className="p-2 border rounded"
                />
            </div>
            </div>
        );
    };

export default FiltersDropdown;