import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

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
            <div className="flex justify-items-center p-6 bg-white rounded shadow mb-6 w-full">
            <h3 className="text-xs font-semibold mr-4 pt-1">Searching For:</h3>

            <div className="mb-4 flex flex-col gap-2 w-115 mr-3">
                <Select value={filters.role} onValueChange={(value) => handleChange({ target: {  name: "role", value: value === "any" ? "" : value } })}>
                <SelectTrigger className="p-2 border rounded w-full text-sm">
                    <SelectValue placeholder="Any Role" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="any">Any Role</SelectItem>
                    {["Top", "Jungle", "Mid", "ADC", "Support"].map((role) => (
                    <SelectItem key={role} value={role}>
                        {role}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-4 w-115">
                <Select value={filters.rank} onValueChange={(value) => handleChange({ target: { name: "rank", value: value === "any" ? "" : value } })}>
                <SelectTrigger className="p-2 border rounded w-full text-sm">
                    <SelectValue placeholder="Any Rank" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="any">Any Role</SelectItem>
                    {[
                    "IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD",
                    "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"
                    ].map((rank) => (
                    <SelectItem key={rank} value={rank}>
                        {rank.charAt(0) + rank.slice(1).toLowerCase()}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>
        );
    };

export default FiltersDropdown;